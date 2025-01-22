export interface SubCategory {
  name: string;
  routerLink: string;
  srcImg: string;
}
export interface Category extends SubCategory {
  showSubcategories: boolean;
  subcategories?: SubCategory[];
}
