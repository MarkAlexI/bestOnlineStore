type Material = { title: string; names: string[]; isChecked: boolean };

const material: Material = {
  title: 'Матеріал',
  names: ['Дерево', 'Метал', 'ДСП', 'Пластик'],
  isChecked: false,
};
const woodType: Material = {
  title: 'Тип деревини',
  names: ['Дуб', 'Горіх', 'Липа', 'Клен'],
  isChecked: false,
};
const designFeatures: Material = {
  title: 'Конструктивні особливості',
  names: ['Розкладні', 'Нерозкладні'],
  isChecked: false,
};
const upholsteryMaterial: Material = {
  title: 'Матеріал оббивки',
  names: ['Тканина', 'Єко-шкіра', 'Замша'],
  isChecked: false,
};
const category: Material = {
  title: 'Категорія',
  names: ['Обідні набори', 'Кавові столики'],
  isChecked: false,
};
const size: Material = {
  title: 'Розмір',
  names: ['160см/200см', '160см/220см'],
  isChecked: false,
};
const sizeBath: Material = {
  title: 'Розмір',
  names: ['160см/80см', '130см/80см'],
  isChecked: false,
};
const materialBath: Material = {
  title: 'Матеріал',
  names: ['Акрил', 'Кераміка', 'Пластик'],
  isChecked: false,
};
const sizeShelves: Material = {
  title: 'Розмір',
  names: ['60см', '80см'],
  isChecked: false,
};

export interface FilterCategory {
  categories: string[];
  subcategory: Material[];
}

export interface Filter {
  chairs: FilterCategory;
  tables: FilterCategory;
  beds: FilterCategory;
  bathtubs: FilterCategory;
  shelves: FilterCategory;
}

export const filters: Filter = {
  chairs: {
    categories: [
      'Матеріал',
      'Матеріал оббивки',
      'Тип деревини',
      'Конструктивні особливості',
    ],
    subcategory: [material, upholsteryMaterial, woodType, designFeatures],
  },
  tables: {
    categories: [
      'Матеріал',
      'Тип деревини',
      'Конструктивні особливості',
      'Категорія',
    ],
    subcategory: [category, material, woodType, designFeatures],
  },
  beds: {
    categories: [
      'Матеріал',
      'Тип деревини',
      'Конструктивні особливості',
      'Розмір',
    ],
    subcategory: [size, material, woodType, designFeatures],
  },
  bathtubs: {
    categories: ['Матеріал', 'Розмір'],
    subcategory: [sizeBath, materialBath],
  },
  shelves: {
    categories: ['Матеріал', 'Тип деревини', 'Розмір'],
    subcategory: [sizeShelves, material, woodType],
  },
};
