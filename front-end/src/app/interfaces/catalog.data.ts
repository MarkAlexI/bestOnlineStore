import { Category } from '@interfaces/catalog.interface';

export const mainCategories: Category[] = [
  {
    name: 'Меблі',
    routerLink: 'furniture',
    showSubcategories: false,
    srcImg: './assets/pics/png/catalog-menu/furniture.jpg',
    subcategories: [
      {
        name: 'Столи',
        routerLink: 'tables',
        srcImg: './assets/pics/png/catalog-menu/tables.jpg',
      },
      {
        name: 'Пуфи',
        routerLink: 'ottomans',
        srcImg: './assets/pics/png/catalog-menu/ottomans.jpg',
      },
      {
        name: 'Стільці',
        routerLink: 'chairs',
        srcImg: './assets/pics/png/catalog-menu/chairs.jpg',
      },
      {
        name: 'Крісла',
        routerLink: 'armchairs',
        srcImg: './assets/pics/png/catalog-menu/armchairs.jpg',
      },
      {
        name: 'Ліжка',
        routerLink: 'beds',
        srcImg: './assets/pics/png/catalog-menu/beds.jpg',
      },
      {
        name: 'Дивани',
        routerLink: 'sofas',
        srcImg: './assets/pics/png/catalog-menu/sofas.jpg',
      },
      {
        name: 'Стелажі',
        routerLink: 'racks',
        srcImg: './assets/pics/png/catalog-menu/racks.jpg',
      },
      {
        name: 'Тумби',
        routerLink: 'nightstands',
        srcImg: './assets/pics/png/catalog-menu/nightstands.jpg',
      },
    ],
  },
  {
    name: 'Сантехніка',
    routerLink: 'plumbing',
    showSubcategories: false,
    srcImg: './assets/pics/png/catalog-menu/plumbing.jpg',
    subcategories: [
      {
        name: 'Ванни',
        routerLink: 'bathtubs',
        srcImg: './assets/pics/png/catalog-menu/bathtubs.jpg',
      },
      {
        name: 'Біде',
        routerLink: 'bide',
        srcImg: './assets/pics/png/catalog-menu/bide.jpg',
      },
      {
        name: 'Умивальники',
        routerLink: 'washbasins',
        srcImg: './assets/pics/png/catalog-menu/washbasins.jpg',
      },
    ],
  },
  {
    name: 'Освітлення',
    routerLink: 'lighting',
    showSubcategories: false,
    srcImg: './assets/pics/png/catalog-menu/lighting.jpg',
    subcategories: [
      {
        name: 'Торшери',
        routerLink: 'floorlamps',
        srcImg: './assets/pics/png/catalog-menu/floorlamps.jpg',
      },
      {
        name: 'Настільні лампи',
        routerLink: 'tablelamps',
        srcImg: './assets/pics/png/catalog-menu/tablelamps.jpg',
      },
      {
        name: 'Люстри',
        routerLink: 'chandeliers',
        srcImg: './assets/pics/png/catalog-menu/chandeliers.jpg',
      },
    ],
  },
  {
    name: 'Аксесуари',
    routerLink: 'accessories',
    showSubcategories: false,
    srcImg: './assets/pics/png/catalog-menu/accessories.jpg',
    subcategories: [
      {
        name: 'Дзеркала',
        routerLink: 'mirrors',
        srcImg: './assets/pics/png/catalog-menu/mirrors.jpg',
      },
      {
        name: 'Вішаки',
        routerLink: 'hangers',
        srcImg: './assets/pics/png/catalog-menu/hangers.jpg',
      },
      {
        name: 'Полички',
        routerLink: 'shelves',
        srcImg: './assets/pics/png/catalog-menu/shelves.jpg',
      },
    ],
  },
  {
    name: 'Інше',
    routerLink: 'other',
    showSubcategories: false,
    srcImg: './assets/pics/png/catalog-menu/other.jpg',
    subcategories: [
      {
        name: 'Подушки',
        routerLink: 'pillows',
        srcImg: './assets/pics/png/catalog-menu/blankets.jpg',
      },
      {
        name: 'Ковдри',
        routerLink: 'blankets',
        srcImg: './assets/pics/png/catalog-menu/pillows.jpg',
      },
    ],
  },
];
