export interface User {
  firstName?: string | null | undefined;
  lastName?: string | null | undefined;
  password?: string | null;
  email?: string | null | undefined;
  isAdmin?: boolean;
  isAnonymous?: boolean;
  token?: string;
  _id?: string;
}

export interface UserInfo extends User {
  shippingAddress?: {
    name: string;
    address: string;
    paymentMethod: string;
    deliveryMethod: string | null;
    novaPoshtaAddress?: string | null;
  };
  phone?: string | null;
  delivery?: string | null;
  department?: string | null;
  wishList?: string[];
}

export interface Orders {
  _id: string;
  name: string;
  image: string;
  description: string;
  price: number;
  status?: string;
  discount?: number | undefined;
  quantity: number;
  summa?: number;
  product: string;
  isPaid: boolean;
  itemsPrice?: number;
}

export interface Review {
  title: string;
  date: string;
  rate: number;
  images: string[];
  text: string;
  advantage?: string;
  disadvantage?: string;
  likes: number;
  dislikes: number;
}
