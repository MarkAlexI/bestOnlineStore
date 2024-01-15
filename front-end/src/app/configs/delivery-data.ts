export interface DeliveryData {
  name: string;
  logoUrl?: string;
  price?: number;
  isChecked: boolean;
  isClosed: boolean;
  department: string;
}

export const deliveryData: DeliveryData[] = [
  {
    name: 'Самовивіз з Нової Пошти',
    logoUrl: './assets/pics/png/delivery/logochat.png',
    isChecked: false,
    isClosed: true,
    department: 'NovaPoshta',
  },
  // {
  //   name: 'Самовивіз з УКРПОШТИ',
  //   logoUrl: './assets/pics/png/delivery/logoposhta.png',
  //   isChecked: false,
  //   isClosed: true,
  //   department: 'UkrPoshta',
  // },
  {
    name: 'Кур’єрська доставка від магазину (тільки по м.Київ)',
    price: 700,
    isChecked: false,
    isClosed: true,
    department: 'Courier',
  },
  {
    name: 'Самовивіз з магазину ( м. Київ, вул. Саксаганського, 121 )',
    isChecked: false,
    isClosed: true,
    department: 'SelfPickUp',
  },
];

export interface PaymentMethod {
  title: string;
  isChecked: boolean;
}

export const paymentMethod: PaymentMethod[] = [
  {
    title: 'Під час отримання товару',
    isChecked: false,
  },
  {
    title: 'Оплата картою через EasyPay',
    isChecked: false,
  },
];
