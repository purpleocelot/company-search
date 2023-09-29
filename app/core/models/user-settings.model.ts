import { Language } from "./language.model";
import { UICompany } from "./ui-company.model";
import { SiteSummary } from "./site-summary.model";

export class UserSettings {
  selectedLanguage: Language;
  selectedSite?: SiteSummary;
  selectedUICompany: UICompany;
  isAdmin: boolean;
}
