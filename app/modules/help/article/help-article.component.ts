import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { HelpService } from "src/app/core/services/help/help.service";
import { HelpItem } from "src/app/core/models/help.model";

@Component({
  selector: "loxam-help-article",
  templateUrl: "./help-article.component.html",
  styleUrls: ["./help-article.component.scss"]
})
export class HelpArticleComponent {
  public article: HelpItem;
  private key: string;

  constructor(
    private helpService: HelpService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {
    this.activeRoute.paramMap.subscribe(params => {
      this.key = params.get("key");
      if (!this.key) this.getFirstArticleKey();

      this.article = this.helpService.getArticle(this.key);

      if (!this.article || !this.article.title) {
        this.router.navigate(["/not-found"]);
        return;
      }
    });
  }

  private getFirstArticleKey(): void {
    this.key = this.helpService.getFirstKey();
    if (!this.key) {
      this.router.navigate(["/not-found"]);
      return;
    }
  }
}
