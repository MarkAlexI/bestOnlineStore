import {Component, EventEmitter, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent {
  @Input() isClickFilter!: boolean;
  @Output() isClickFilterChange = new EventEmitter<boolean>();

  public filters = [
    {
      nameFilter: "Матеріал",
      subFilters: ["Дерево", "Метал", "ДСП", "Пластик"],
      isChecked: false
    }, {
      nameFilter: "Матеріал оббивки",
      subFilters: ["Ткань", "Кожа", "Синтетика"],
      isChecked: false
    },
    {
      nameFilter: "Вид деревини",
      subFilters: ["Дуб", "Сосна", "Бук"],
      isChecked: false
    },
    {
      nameFilter: "Конструктивні особливості",
      subFilters: ["Складне виконання", "Легке виконання", "Модульна"],
      isChecked: false
    }
  ]

  updateIsClickFilter() {
    this.isClickFilter = !this.isClickFilter;
    this.isClickFilterChange.emit(this.isClickFilter);
  }
}
