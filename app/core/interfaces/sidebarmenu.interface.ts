export interface SidebarMenuItems {
  title: string;
  route?: string;
  sections: Array<MenuSection>;
}

export interface MenuSection {
  title: string;
  route?: string;
  items: Array<MenuItem>;
  ignoreSiteIdInRouterLink?: boolean;
}

export interface MenuItem {
  title: string;
  route: string;
}
