import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/sevices/api.service';

@Component({
  selector: 'app-records-page',
  templateUrl: './records-page.component.html',
  styleUrls: ['./records-page.component.scss']
})
export class RecordsPageComponent implements OnInit {

  categories;
  isLoaded = false;

  constructor(private apiService: ApiService) {
  }


  ngOnInit() {
    this.apiService.getCategories()
      .subscribe(res => {
        this.categories = res;
        this.isLoaded = true;
      });
  }


  addCategory(event) {
    this.categories.push(event)
  }

}
