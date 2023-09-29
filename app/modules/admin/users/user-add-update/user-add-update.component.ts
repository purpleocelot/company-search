import { COMMA, ENTER } from "@angular/cdk/keycodes";
import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  ViewChild,
  ElementRef
} from "@angular/core";
import { User, UserDto } from "src/app/core/models/user.model";
import { Site } from "src/app/core/models/sites.model";
import { FormControl } from "@angular/forms";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import {
  MatAutocomplete,
  MatAutocompleteSelectedEvent,
  MatChipInputEvent,
  MatAutocompleteTrigger,
  MatSnackBar
} from "@angular/material";
import { clone } from "src/app/shared/functions/clone.function";
import { predicateBy } from "src/app/shared/functions/sorting.function";
import { AdminUserService } from "src/app/core/services/user-admin/admin-user.service";
import { UICompany, companies } from "src/app/core/models/ui-company.model";
import { LoaderService } from "src/app/core/services/loader/loader.service";
import { Language } from "src/app/core/models/language.model";

@Component({
  selector: "loxam-user-add-update",
  templateUrl: "./user-add-update.component.html",
  styleUrls: ["./user-add-update.component.scss"]
})
export class UserAddUpdateComponent implements OnInit {
  @Input() selectedUser: User;
  @Input() allSitesList: Array<Site>;

  @Output() stopUserAddEdit: EventEmitter<User> = new EventEmitter<User>();

  @ViewChild("siteSelectionInput") siteSelectionInput: ElementRef<
    HTMLInputElement
  >;
  @ViewChild("auto") matAutocomplete: MatAutocomplete;
  @ViewChild("autoTrigger")
  matAutocompleteTrigger: MatAutocompleteTrigger;

  public remainingSites: Array<Site>;
  public selectedSites: Array<Site> = new Array<Site>();
  public filteredSites: Observable<Array<Site>>;
  public separatorKeysCodes: Array<number> = [ENTER, COMMA];
  public allSitesToggle: boolean;
  public newUser: boolean;
  public siteSelectionFormControl: FormControl = new FormControl();
  public selectedCompany: UICompany;
  public companies: Array<UICompany> = companies;
  public showSelectedSitesError: boolean = false;
  public languages: Array<Language> = [
    { code: "de", name: "Deutsch", orientation: "ltr" },
    { code: "en", name: "English", orientation: "ltr" },
    { code: "es", name: "Español", orientation: "ltr" },
    { code: "fr", name: "Francais", orientation: "ltr" },
    { code: "nl", name: "Nederlands", orientation: "ltr" },
    { code: "pl", name: "Polskie", orientation: "ltr" },
    { code: "it", name: "Italiano", orientation: "ltr" }
  ].sort(predicateBy("name"));

  private readonly NONE: number[] = [-1];
  private readonly NONE_STRING: string = "[-1]";

  constructor(
    private adminUserService: AdminUserService,
    private matSnackBar: MatSnackBar,
    private loaderService: LoaderService
  ) {}

  ngOnInit() {
    this.filteredSites = this.siteSelectionFormControl.valueChanges.pipe(
      startWith(null),
      map((site: string | null) =>
        site ? this.filter(site) : this.remainingSites.slice()
      )
    );

    this.newUser = this.selectedUser.id == null;
    this.allSitesToggle = this.selectedUser.sites === this.NONE_STRING;
    this.remainingSites = clone(this.allSitesList);
    this.setInitialSelectedSites();
    this.selectedUser.sendEmail = true;
    if (this.newUser) this.selectedUser.language = "en";
    this.setCompany();
  }

  private setCompany(): void {
    if (!this.selectedUser.company) return;

    this.selectedCompany = this.companies.find(x => x.companyName === this.selectedUser.company);
  }

  public cancelAddUpdate() {
    this.selectedUser = undefined;
    this.stopUserAddEdit.emit(this.selectedUser);
  }

  public saveUser() {
    this.loaderService.startLoading("user-save");

    if (!this.isFormSitesValid) {
      this.showSelectedSitesError = true;
      return;
    }

    let user: UserDto = {
      email: this.selectedUser.userName,
      id: null,
      isAdmin: this.selectedUser.isAdmin,
      sitePermissions: !this.selectedUser.isAdmin && !this.allSitesToggle ? this.getSitePermissions() : this.NONE,
      sendEmail: this.selectedUser.sendEmail,
      language: this.selectedUser.language,
      company: this.selectedCompany && this.selectedCompany.companyName ? this.selectedCompany.companyName : null
    };

    if (user.sitePermissions === this.NONE) {
      this.selectedUser.sites = this.NONE_STRING;
    } else {
      this.refreshUserPermissions();
    }

    if (this.newUser) {
      this.saveNewUser(user);
      return;
    }

    this.updateExistingUser(user);
  }

  public removeSiteFromSelectedSites(removingSite: Site): void {
    this.remainingSites.push(removingSite);
    this.removeSiteFromCollection(removingSite, this.selectedSites);
    this.remainingSites = this.remainingSites.sort(predicateBy("siteName"));
    this.matAutocompleteTrigger.closePanel();
    this.siteSelectionFormControl.reset();
  }

  public selectSiteFromAutocomplete(event: MatAutocompleteSelectedEvent): void {
    this.selectedSites.push(event.option.value);
    this.removeSiteFromCollection(event.option.value, this.remainingSites);
    this.siteSelectionInput.nativeElement.value = "";
    this.siteSelectionFormControl.setValue(null);
    this.matAutocompleteTrigger.closePanel();
    this.siteSelectionFormControl.reset();
    this.showSelectedSitesError = false;
  }

  private saveNewUser(user: UserDto): void {
    this.adminUserService.registerUser(user, this.selectedCompany).subscribe(
      returnedUser => {
        this.selectedUser.id = returnedUser.id;
        this.stopUserAddEdit.emit(this.selectedUser);
        this.loaderService.stopLoading("user-save");
      },
      error => {
        this.error("Could not add new user", error);
        this.loaderService.stopLoading("user-save");
      }
    );
  }

  private updateExistingUser(user: UserDto): void {
    this.adminUserService.saveUserPermissions(user).subscribe(
      returnedUser => {
        this.stopUserAddEdit.emit(this.selectedUser);
        this.loaderService.stopLoading("user-save");
      },
      error => {
        this.error("Could not save user", error);
        this.loaderService.stopLoading("user-save");
      }
    );
  }

  private isFormSitesValid(): boolean {
    return this.selectedUser.isAdmin
      || this.allSitesToggle
      || this.selectedSites.length > 0;
  }

  private getSitePermissions(): Array<number> {
    return this.selectedSites.map(selectedSite => selectedSite.siteId);
  }

  private removeSiteFromCollection(
    removingItem: Site,
    removingCollection: Array<Site>
  ) {
    let removingItemFromOriginatingCollection = removingCollection.find(
      site => site.siteId === removingItem.siteId
    );
    const index = removingCollection.indexOf(
      removingItemFromOriginatingCollection
    );

    if (index >= 0) {
      removingCollection.splice(index, 1);
    }
  }

  private setInitialSelectedSites(): void {
    if (!this.selectedUser.sites || this.selectedUser.sites === this.NONE_STRING) return;
    var sites = JSON.parse(this.selectedUser.sites);
    sites.forEach(element => {
      let siteId: number = Number(element);

      let processingSite = this.remainingSites.find(
        site => siteId === site.siteId
      );

      this.removeSiteFromCollection(processingSite, this.remainingSites);
      this.selectedSites.push(processingSite);
    });
  }

  private filter(value: string | Site): Array<Site> {
    if (typeof value === "string") {
      const filterValue = value.toLowerCase();
      let x = this.remainingSites.filter(
        site => site.siteName.toLowerCase().indexOf(filterValue) === 0
      );
      return x;
    } else {
      const filterValue = value.siteName.toLowerCase();
      let x = this.remainingSites.filter(
        site => site.siteName.toLowerCase().indexOf(filterValue) === 0
      );
      return x;
    }
  }

  private refreshUserPermissions(): void {
    this.selectedUser.sites = JSON.stringify(
      this.selectedSites.map(site => site.siteId)
    );
  }

  private error(errorString: string, returnedError: any) {
    if (returnedError && returnedError.error) {
      if (returnedError.error.exceptionMessage) {
        errorString += `(${returnedError.error.exceptionMessage})`;
      } else if (returnedError.error.message) {
        errorString += `(${returnedError.error.message})`;
      } else {
        errorString += "(Unknown error)";
      }
    } else {
      errorString += "(Unknown error)";
    }

    this.matSnackBar.open(`ERROR: ${errorString}`, "dismiss", {
      duration: 10000
    });
  }
}
