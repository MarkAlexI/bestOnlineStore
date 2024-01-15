export type DepData = {
  city?: string;
  novaPoshtaAddress?: string;
  deliveryMethod?: string;
  street?: string;
  house?: string;
  floor?: string;
  apartment?: string;
  time?: string;
  isValid: boolean;
  paymentMethod?: string;
};

export type Order = {
  items?: [
    {
      _id: string;
      quantity?: number;
      price?: number;
      totalPrice?: number;
      name?: string;
      img?: string;
    }
  ];
  completePrice?: number;
};
