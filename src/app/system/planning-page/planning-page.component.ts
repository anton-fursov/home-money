import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { ApiService } from '../shared/sevices/api.service';

@Component({
  selector: 'app-planning-page',
  templateUrl: './planning-page.component.html',
  styleUrls: ['./planning-page.component.scss']
})
export class PlanningPageComponent implements OnInit {
  categories;
  bill;
  class;

  constructor(private apiService: ApiService) {
  }


  ngOnInit() {
    this.apiService.getCategories()
      .subscribe(res => {
        this.categories = res;
      });
    this.apiService.getBill().subscribe((res: any) => {
      this.bill = res;
    });
  }

  width(a, b) {
    const percent = (a / b) * 100;
    if (percent <= 60) {
      this.class = 'success';
    }
    if (percent > 60 && percent <= 90) {
      this.class = 'warning';
    }
    if (percent > 90) {
      this.class = 'danger';
    }
    return percent + '%';
  }

}
