import {Product} from "@interfaces/product.interfaces";
export interface SubCategory {
  name: string,
  routerLink: string
  srcImg: string
}
export interface Category {
  name: string,
  routerLink: string,
  srcImg: string,
  showSubcategories: boolean,
  subcategories?: SubCategory[];
}
