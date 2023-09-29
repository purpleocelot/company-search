export interface HelpSection {
  languageCode: string;
  title: string;
  items: HelpItem[];
}

export interface HelpItem {
  key: string;
  title: string;
  image: string;
  htmlContent: string;
}
