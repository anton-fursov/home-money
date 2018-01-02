import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-history-events',
  templateUrl: './history-events.component.html',
  styleUrls: ['./history-events.component.scss']
})
export class HistoryEventsComponent implements OnInit {
  @Input() events;
  @Input() categories;
  searchPlaceholder = 'Сумма';
  searchValue = '';
  searchField = 'amount';

  constructor() { }

  ngOnInit() {
    if (this.categories instanceof Array) {
      this.events.map(event => {
        event.catName = this.categories.find(el => event.category === el._id).name;
      });
    }
    else {
      this.events.catName = this.categories.name;
    }


  }

  changeCriteria(field: string) {
    const placeMap = {
      amount: 'Сумма',
      date: 'Дата',
      category: 'Категория',
      typeName: 'Тип'
    }
    this.searchPlaceholder = placeMap[field];
    this.searchField = field;
  }
}
