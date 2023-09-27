export interface ProductCharacteristics {
  material: string;
  filling: string;
  sizes: string;
  color: string;
  ergonomics: string;
  load: string;
  functions: string;
  additional: string;
  care: string;
}

export interface Product {
  characteristics: ProductCharacteristics;
  _id: string;
  name: string;
  descr: string;
  shortDescr: string;
  price: number;
  discount: number;
  baseImage: string;
  allImages: string[];
  brand: string;
  category: string;
  subcategory: string;
  instock: boolean;
  countInStock: number;
  raiting: number;
  numReviews: number;
  reviews: Review[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Review {
  _id: string;
  user: string;
  product: string;
  rating: number;
  comment: string;
  likes: number;
  dislikes: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
