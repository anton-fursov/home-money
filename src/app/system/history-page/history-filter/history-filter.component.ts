import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: ['./history-filter.component.scss']
})
export class HistoryFilterComponent implements OnInit {
  @Output() onFilterClose = new EventEmitter();
  @Output() onFilterApply = new EventEmitter();
  @Output() onFilterReset = new EventEmitter();
  @Input() categories;
  periodSelected = 'd';
  typesSelected = [];
  categoriesSelected = [];
  periods = [
    {type: 'd', label: 'День'},
    {type: 'w', label: 'Неделя'},
    {type: 'M', label: 'Месяц'}
  ];
  types = [
    {type: 'income', label: 'Доход'},
    {type: 'outcome', label: 'Расход'}
  ];


  constructor() {
  }

  ngOnInit() {
  }

  closeFilter() {
    this.onFilterClose.emit();
  }
  resetFilter() {
    this.onFilterReset.emit();
  }

  applyFilter() {
    this.onFilterApply.emit(
      {
        period: this.periodSelected,
        types: this.typesSelected,
        categories: this.categoriesSelected
      }
    )
  }

  handleChangeType({checked, value}) {
    if (checked) {
      this.typesSelected.indexOf(value) === -1 ? this.typesSelected.push(value) : null;
    }
    else {
      this.typesSelected = this.typesSelected.filter(el => el !== value);

    }

  }

  handleChangeCategories({checked, value}) {
    if (checked) {
      this.categoriesSelected.indexOf(value) === -1 ? this.categoriesSelected.push(value) : null;
    }
    else {
      this.categoriesSelected = this.categoriesSelected.filter(el => el !== value);

    }
  }
}
