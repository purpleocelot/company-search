import {
  Component,
  OnInit,
  ViewChild,
  Input,
  OnChanges,
  AfterViewInit,
  Output,
  EventEmitter
} from "@angular/core";
import {
  MatTableDataSource,
  MatPaginator,
  MatTable,
  MatSort,
  MatDialog,
  MatSnackBar,
  MatSlideToggleChange
} from "@angular/material";
import { sorting } from "src/app/shared/functions/sorting.function";
import { User } from "src/app/core/models/user.model";
import { ActivatedRoute } from "@angular/router";
import { LoaderService } from "src/app/core/services/loader/loader.service";
import { Observable } from "rxjs";
import { DialogComponent } from "src/app/shared/components/dialog/dialog.component";
import { HttpService } from "src/app/core/services/http/http.service";
import { UserService } from "src/app/core/services/user/user.service";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "loxam-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.scss"]
})
export class UserListComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() users: Array<User>;
  @Input() selectedUser: User;

  @Output() editingUser: EventEmitter<User> = new EventEmitter<User>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatTable) table: MatTable<any>;

  public dataSource: MatTableDataSource<User>;
  public columnsToDisplay = [
    "userName",
    "isAdmin",
    "enabled",
    "sendPW",
    "control"
  ];

  constructor(
    private route: ActivatedRoute,
    private loaderService: LoaderService,
    private dialog: MatDialog,
    private httpService: HttpService,
    private matSnackBar: MatSnackBar,
    private userService: UserService,
    private translationService: TranslateService
  ) {}

  public ngOnInit(): void {
    this.route.data.subscribe(resolved => {
      this.users = resolved.users;
      this.loaderService.stopLoading("get-users");
    });

    this.instantiateDataTable();
  }

  public ngOnChanges(): void {
    this.instantiateDataTable();
    this.registerMaterialSortAndPagination();
  }

  public ngAfterViewInit(): void {
    this.registerMaterialSortAndPagination();
  }

  public toggleAccount(changeEvent: MatSlideToggleChange): void {
    const userName = changeEvent.source.id;
    const state = changeEvent.checked;
    const url = `Account/ToggleAccount?email=${userName}&state=${state}`;
    const actionText = state ? "enabled" : "disabled";

    this.loaderService.startLoading("toggle-account");
    this.httpService.put<any>(url, null).subscribe(
      (response: any) => {
        this.loaderService.stopLoading("toggle-account");
        this.showSnackBar(
          this.translationService.instant(`Success: Account ${actionText}.`)
        );

        // Update view
        this.users.find(x => x.userName === userName).enabled = state;
      },
      (errorResponse: any) => {
        this.loaderService.stopLoading("toggle-account");
        this.showErrorDialog(
          this.translationService.instant(`Account ${actionText}`)
        );
      }
    );
  }

  public sendPassword(user: User): void {
    console.log(user);
    const email = user.userName;
    this.showEmailConfirmDialog(email).subscribe((confirmation: Boolean) => {
      if (confirmation) this.sendPasswordReset(email);
    });
  }

  public editUser(user: User): void {
    this.selectedUser = user;
    this.editingUser.emit(user);
  }

  public applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public addUser(): void {
    this.editUser(new User());
  }

  public isSelf(userName: string): boolean {
    return (
      userName.toLowerCase() ===
      this.userService.token.userName.toLocaleLowerCase()
    );
  }

  private registerMaterialSortAndPagination(): void {
    this.dataSource.sortingDataAccessor = sorting;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  private instantiateDataTable(): void {
    this.dataSource = new MatTableDataSource<User>(this.users);
  }

  private showEmailConfirmDialog(email: string): Observable<boolean> {
    const dlg = this.dialog.open(DialogComponent, {
      data: {
        title: this.translationService.instant("Reset Password"),
        message: this.translationService.instant(
          "Do you want to email the user a reset password link?"
        ),
        primaryButton: this.translationService.instant("Send"),
        secondaryButton: this.translationService.instant("Cancel"),
        icon: "warning"
      }
    });

    return dlg.afterClosed();
  }

  private sendPasswordReset(email: string) {
    this.loaderService.startLoading("forgot-password");

    const resetUrl = `${window.location.origin}/reset-password`;

    // TODO: Get company and email from address, from user's record in DB
    const company = { email: "NO_REPLY@loxam.com", companyName: "Loxam Group" };

    // NOTE: String concat & multiline for clarity and to prevent Prettier from mangling it
    const url: string =
      `Account/ForgotPassword` +
      `?url=${resetUrl}` +
      `&email=${email}` +
      `&from=${company.email}` +
      `&company=${company.companyName}`;

    this.httpService.post(url, null).subscribe(
      (response: any) => {
        this.loaderService.stopLoading("forgot-password");
        this.showSnackBar(
          this.translationService.instant("Success: Email sent.")
        );
      },
      (errorResponse: any) => {
        this.loaderService.stopLoading("forgot-password");
        this.showErrorDialog(
          this.translationService.instant("Reset Password Email")
        );
      }
    );
  }

  private showSnackBar(message: string): void {
    this.matSnackBar.open(message, "dismiss", {
      duration: 3000
    });
  }

  private showErrorDialog(titleText: string): void {
    const dlg = this.dialog.open(DialogComponent, {
      data: {
        title: titleText,
        message: "Server error, please try again shortly.",
        icon: "error"
      }
    });
  }
}
