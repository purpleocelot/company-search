import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "src/app/core/services/user/user.service";
import { UICompany } from "src/app/core/models/ui-company.model";
import { environment } from "src/environments/environment";

@Component({
  selector: "loxam-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"]
})
export class FooterComponent implements OnInit {
  public uiCompany: UICompany;
  public date: Date = new Date();
  public isIE11: boolean = environment.isIE11;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.uiCompany = this.userService.userSettings.selectedUICompany;
  }

  goToCopyrightNotice() {
    window.open(this.uiCompany.url, "_blank");
  }
}
