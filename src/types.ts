export interface MenuItem {
  name: string;
  price: number;
}

export interface MenuData {
  [key: string]: MenuItem[];
}
