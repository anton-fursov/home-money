import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { Subscription } from 'rxjs/Subscription';
import { ApiService } from '../../shared/sevices/api.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-history-detail',
  templateUrl: './history-detail.component.html',
  styleUrls: ['./history-detail.component.scss']
})
export class HistoryDetailComponent implements OnInit, OnDestroy {
  sub1: Subscription;
  id;
  event;
  catName;
  isLoaded = false;
  classType;
  type;

  constructor(private route: ActivatedRoute,
              private apiService: ApiService) {
  }

  ngOnInit() {
    this.sub1 = Observable.combineLatest(this.route.params, this.apiService.getEvents(), this.apiService.getCategories())
      .subscribe((data: any) => {
        this.id = data[0].id;
        const events = data[1];
        this.event = events.find(el => el._id === this.id);
        if (this.event.typeName === 'income') {
          this.classType = 'success';

          this.type = 'Доход';
        }
        else {
          this.classType = 'danger';
          this.type = 'Расход';
        }
        const categories = data[2];
        const category = categories.find(el => el._id === this.event.category);
        this.catName = category.name;
        this.isLoaded = true;

      });
  }

  ngOnDestroy() {
    if (this.sub1) this.sub1.unsubscribe();
  }

}
