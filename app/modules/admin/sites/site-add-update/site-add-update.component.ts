import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  ViewChild
} from "@angular/core";
import { MatDialog } from "@angular/material";
import {
  Site,
  ISiteDefinition,
  newSiteDefinition,
  IMatchedMachine
} from "src/app/core/models/sites.model";
import { MatSnackBar, MatTable, MatTableDataSource } from "@angular/material";
import { UICompany, companies } from "src/app/core/models/ui-company.model";
import { LoaderService } from "src/app/core/services/loader/loader.service";
import { AdminSiteService } from "src/app/core/services/site-admin/admin-site.service";
import { LocationItem } from "src/app/core/models/locations.model";
import {
  timezones,
  Timezone,
  defaultWorkHours,
  WorkingHours,
  IWorkingHours
} from "src/app/core/models/time.model";
import { clone } from "src/app/shared/functions/clone.function";
import { MachineModalComponent } from "./machine-modal/machine-modal.component";

@Component({
  selector: "loxam-site-add-update",
  templateUrl: "./site-add-update.component.html",
  styleUrls: ["./site-add-update.component.scss"]
})
export class SiteAddUpdateComponent implements OnInit {
  @Input() selectedSite: Site;

  @Output() stopSiteAddEdit: EventEmitter<Site> = new EventEmitter<Site>();

  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild("definitionTable") definitionTable: MatTable<any>;

  public hoursDataSource: MatTableDataSource<WorkingHours>;
  public definitionDataSource: MatTableDataSource<ISiteDefinition>;
  public hoursColumnsToDisplay = [
    "isActive",
    "day",
    "operatingStartDayTime",
    "operatingEndDayTime",
    "control"
  ];
  public definitionColumnsToDisplay = [
    "countryCode",
    "projectCode",
    "accountNumber",
    "postCode",
    "accountGroup",
    "projectGroup",
    "control"
  ];

  public newSite: boolean;
  public locations: Array<LocationItem> = new Array<LocationItem>();
  public selectedCompany: UICompany;
  public companies: Array<UICompany> = companies;
  public defaultMapCenterLat: any;
  public defaultMapCenterLong: any;
  public showLocationSelectPanel: boolean = false;
  public timezones: Array<Timezone> = timezones;
  public siteDefinitions: Array<ISiteDefinition>;
  public matchingMachines: Array<IMatchedMachine>;

  constructor(
    private adminSiteService: AdminSiteService,
    private matSnackBar: MatSnackBar,
    private loaderService: LoaderService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.newSite = this.selectedSite.siteId == null;
    this.showLocationSelectPanel = this.newSite;
    if (this.newSite) {
      this.getDefaultTimezone();
      this.selectedSite.siteOperatingHours = clone(defaultWorkHours);
      this.hoursDataSource = new MatTableDataSource<WorkingHours>(
        this.selectedSite.siteOperatingHours
      );

      this.siteDefinitions = new Array<ISiteDefinition>();
      this.siteDefinitions.push(clone(newSiteDefinition));
      this.definitionDataSource = new MatTableDataSource<ISiteDefinition>(
        this.siteDefinitions
      );
    } else {
      this.adminSiteService
        .getSiteWorkingHours(this.selectedSite.siteId)
        .subscribe(workingHours => {
          this.selectedSite.siteOperatingHours = new Array<WorkingHours>();
          workingHours.forEach(day => {
            this.selectedSite.siteOperatingHours.push(new WorkingHours(day));
          });
          this.hoursDataSource = new MatTableDataSource<WorkingHours>(
            this.selectedSite.siteOperatingHours
          );
        });
      this.adminSiteService
        .getSiteDefinitions(this.selectedSite.siteId)
        .subscribe(siteDefinitions => {
          this.siteDefinitions = siteDefinitions;
          this.definitionDataSource = new MatTableDataSource<ISiteDefinition>(
            this.siteDefinitions
          );
        });

      if (this.selectedSite.associatedURL) {
        this.selectedCompany = companies.find(company => {
          return company.url
            .toLowerCase()
            .includes(this.selectedSite.associatedURL.substr(17));
        });
      }
    }
  }

  public cancelAddUpdate() {
    this.selectedSite = undefined;
    this.stopSiteAddEdit.emit(this.selectedSite);
  }

  public setLocation(location: Coordinates): void {
    this.selectedSite.siteDefaultLatitude = location.latitude;
    this.selectedSite.siteDefaultLongitude = location.longitude;
    this.locations = new Array<LocationItem>();
    this.locations.push(
      new LocationItem(
        null,
        "Default Site Location",
        null,
        location.latitude,
        location.longitude
      )
    );
    this.defaultMapCenterLat = location.latitude;
    this.defaultMapCenterLong = location.longitude;
  }

  public addSiteDefinition() {
    let newItem = clone(newSiteDefinition);

    this.siteDefinitions.push(newItem);
    this.definitionTable.renderRows();
  }

  public removeSiteDefinition(index: number) {
    this.siteDefinitions.splice(index, 1);
    this.definitionDataSource.data = this.siteDefinitions;
    this.definitionTable.renderRows();
  }

  public viewSiteDefinition(definition: ISiteDefinition) {
    this.adminSiteService
      .getMatchingMachines(definition)
      .subscribe(machines => {
        this.matchingMachines = machines;
        const dlg = this.dialog.open(MachineModalComponent, {
          data: {
            title: "Machines Definition",
            message:
              "The following machines are a machine for the definition that you have entered. ",
            primaryButton: "Close",
            machines: this.matchingMachines
          }
        });
        dlg.afterClosed().subscribe((result: boolean) => {
          console.log(result);
        });
      });
  }

  public saveSite() {
    this.loaderService.startLoading("site-save");

    this.selectedSite.associatedURL = this.selectedCompany.url;

    this.adminSiteService.saveSite(this.selectedSite).subscribe(
      (returnedSite: Site) => {
        if (this.newSite) {
          this.selectedSite.siteId = returnedSite.siteId;
          this.selectedSite.siteKey = returnedSite.siteId;
        }
        this.completeSiteSave();
      },
      error => {
        let errorString = this.newSite
          ? "Could not add new site"
          : "Could not save site";
        this.error(errorString, error);
        this.loaderService.stopLoading("site-save");
      }
    );
  }

  completeSiteSave(): any {
    this.loaderService.startLoading("site-definitions-save");
    this.adminSiteService
      .saveSiteDefinitions(this.selectedSite.siteKey, this.siteDefinitions)
      .subscribe(
        returned => {
          this.loaderService.stopLoading("site-definitions-save");
          this.stopSiteAddEdit.emit(this.selectedSite);
        },
        error => {
          this.error(
            "The site definitions couldn't be saved. Please try again before leaving the page.",
            error
          );
          this.loaderService.stopLoading("site-save");
        }
      );
    this.loaderService.stopLoading("site-save");
  }

  copyUp(index: number) {
    this.copyHours(-1, index);
  }

  copyDown(index: number) {
    this.copyHours(1, index);
  }

  private copyHours(amountToMove: number, index: number) {
    let source = this.selectedSite.siteOperatingHours[index];
    let destination = this.selectedSite.siteOperatingHours[
      index + amountToMove
    ];
    destination.isActive = source.isActive;
    destination.operatingStartDayTime = source.operatingStartDayTime;
    destination.operatingEndDayTime = source.operatingEndDayTime;
    this.hoursDataSource.data = this.selectedSite.siteOperatingHours;
  }

  private error(errorString: string, returnedError: any) {
    if (
      returnedError &&
      returnedError.error &&
      returnedError.error.exceptionMessage
    ) {
      errorString += `(${returnedError.error.exceptionMessage})`;
    } else if (
      returnedError &&
      returnedError.error &&
      returnedError.error.message
    ) {
      errorString += `(${returnedError.error.message})`;
    } else {
      errorString += "(Unknown error)";
    }

    this.matSnackBar.open(`ERROR: ${errorString}`, "dismiss", {
      duration: 10000
    });
  }

  private getDefaultTimezone() {
    this.selectedSite.siteTimeZone = this.timezones.find(timezone =>
      timezone.value.toLowerCase().includes("GMT Standard Time".toLowerCase())
    ).value;
  }
}
