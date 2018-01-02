import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ApiService } from '../shared/sevices/api.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-bill-page',
  templateUrl: './bill-page.component.html',
  styleUrls: ['./bill-page.component.scss']
})
export class BillPageComponent implements OnInit, OnDestroy {
  sub1: Subscription;
  currency;
  bill;
  isLoaded = false;

  constructor(private apiService: ApiService) {
  }

  private getData() {
    this.sub1 = Observable.combineLatest(
      this.apiService.getBill(),
      this.apiService.getCurrency()
    ).subscribe((data: any) => {
      this.bill = data[0];
      this.currency = data[1].filter(el => el.cc === 'USD' || el.cc === 'EUR');
      this.isLoaded = true;
    });
  }

  ngOnInit() {
    this.getData();
  }

  reloadBill() {
    this.isLoaded = false;
    this.getData();
  }

  ngOnDestroy() {
    this.sub1.unsubscribe();
  }
}
