import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HelpSection, HelpItem } from "../../models/help.model";
import { HttpService } from "../http/http.service";
import { CoreModule } from "../../core.module";
import {
  SidebarMenuItems,
  MenuSection,
  MenuItem
} from "../../interfaces/sidebarmenu.interface";
import { Observable } from "rxjs";

@Injectable({
  providedIn: CoreModule
})
export class HelpService {
  public content: HelpSection[];

  constructor(private httpService: HttpService, private router: Router) {
    console.log("Initialising Help Service");
  }

  public getContent(): void {
    if (this.content) return; // Already got it

    // Try from local storage
    this.content = JSON.parse(localStorage.getItem("help"));
  }

  public getHelpContent(): void {
    if (!this.content) {
      this.getDataFromAPI().subscribe(data => {
        this.setContent(data);
      });
    }
  }

  public getFirstKey(): string {
    this.getContent();
    if (this.content.length === 0 || this.content[0].items.length === 0)
      return null; // No help content.

    let result: string = this.content[0].items[0].key;

    return result;
  }

  public getArticle(key: string): HelpItem {
    this.getContent();

    if (!JSON.stringify(this.content).includes(`"${key}"`)) return null; // Not found.

    for (const section of this.content) {
      const foundArticle = section.items.filter(x => x.key === key);
      if (foundArticle.length > 0) return foundArticle[0]; // Help article found, return it!
    }

    return null; // Still not found.
  }

  public getMenu(): SidebarMenuItems {
    this.getContent();
    const menuSections = [];
    const menu: SidebarMenuItems = {
      title: "Help",
      route: "/help",
      sections: menuSections
    };

    if (!this.content) return menu;

    this.content.forEach(helpSectionItem => {
      const menuSection: MenuSection = {
        title: helpSectionItem.title,
        items: this.getMenuSectionArticles(helpSectionItem.items)
      };
      menuSections.push(menuSection);
    });

    return menu;
  }

  private getDataFromAPI(): Observable<any> {
    return this.httpService.get("help");
  }

  private getMenuSectionArticles(helpSectionItems: HelpItem[]): MenuItem[] {
    let result: MenuItem[] = [];
    if (!helpSectionItems || helpSectionItems.length === 0) return result;

    result = helpSectionItems.map(helpArticle => {
      return {
        title: helpArticle.title,
        route: helpArticle.key
      };
    });
    return result;
  }

  public setContent(responseContent: HelpSection[]): void {
    this.content = responseContent;

    localStorage.setItem("help", JSON.stringify(this.content));
  }
}
