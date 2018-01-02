import { Component, OnDestroy, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Subscription } from 'rxjs/Subscription';
import * as moment from 'moment';
import { ApiService } from '../shared/sevices/api.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit, OnDestroy {
  data = [];
  sub1: Subscription;
  isLoaded = false;
  categories;
  events;
  filteredEvents;
  isFilterVisible = false;

  constructor(private apiService: ApiService) {
  }

  ngOnInit() {
    this.sub1 = Observable.combineLatest(this.apiService.getCategories(), this.apiService.getEvents())
      .subscribe((data) => {
        this.categories = data[0];
        this.categories.forEach(el => {
          this.data.push({
            name: el.name,
            value: el.costs
          });
        });
        this.events = data[1];
        this.filterEvents();
        this.isLoaded = true;
      });
  }

  private filterEvents() {
    this.filteredEvents = this.events.slice();
  }

  toggleFilter() {
    this.isFilterVisible = !this.isFilterVisible;
  }

  resetFilter() {
    this.isFilterVisible = !this.isFilterVisible;
    this.filterEvents();
  }

  pressFilter(event) {
    this.toggleFilter();
    this.filteredEvents = this.filteredEvents
      .filter(el => event.types.indexOf(el.typeName) !== -1)
      .filter(el => event.categories.indexOf(el.category.toString()) !== -1)
      .filter(el => {
        const dateStart = moment().startOf(event.period).startOf('d');
        const dateEnd = moment().endOf(event.period).endOf('d');
        const momentDate = moment(el.date, 'DD.MM.YYYY HH:mm:ss');
        return momentDate.isBetween(dateStart, dateEnd);
      });
  }

  ngOnDestroy() {
    if (this.sub1) this.sub1.unsubscribe();
  }

}
