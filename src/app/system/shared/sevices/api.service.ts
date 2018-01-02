import { Injectable } from '@angular/core';
import { hostname } from '../../../shared/config';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) {
  }
  user = window.localStorage.getItem('user');
  id = JSON.parse(this.user).id;
  getBill() {
    return this.http.get(`${hostname}/bill?id=${this.id}`);

  }

  editBill(data) {
    return this.http.post(`${hostname}/bill?id=${this.id}`, data);
  }

  updateCosts(value, id, type) {
    return this.getCategories()
      .subscribe((res: any) => {
        const cat = res.filter(el => el._id === id);
        let cost = cat[0].costs;
        type === 'income' ? cost -= value : cost += value;
        this.http.put(`${hostname}/categories_uc`, {costs: cost, id}).subscribe();
      });
  }

  getCurrency() {
    return this.http.get('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json');
  }
  getCategories(){
    return this.http.get(`${hostname}/categories?id=${this.id}`);
  }
  addCategories(data){
    return this.http.post(`${hostname}/categories?id=${this.id}`, data);
  }
  editCategory(data){
    return this.http.put(`${hostname}/categories?id=${this.id}`, data);
  }
  getEvents(){
    return this.http.get(`${hostname}/event?id=${this.id}`);
  }
  addEvents(event){
    return this.http.post(`${hostname}/event?id=${this.id}`, event);
  }
}
