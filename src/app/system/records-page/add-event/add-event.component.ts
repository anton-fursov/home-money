import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EventModel } from '../../shared/models/event.model';
import * as moment from 'moment';
import { Http } from '@angular/http';
import { ApiService } from '../../shared/sevices/api.service';
import { Messege } from '../../../shared/models/messege.model';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit, OnDestroy {
  @Input() categories;
  messege: Messege;
  sub1: Subscription;
  sub2: Subscription;
  sub3: Subscription;

  constructor(private apiService: ApiService) {
  }

  ngOnInit() {
    this.messege = new Messege('danger', '');
  }

  showMessege(text: string) {
    this.messege.text = text;
    window.setTimeout(() => this.messege.text = '', 5000);
  }

  onsubmit(form: NgForm) {
    let {type, amount, category, description} = form.value;
    if (amount < 1) amount *= -1;
    const event = new EventModel(type, +amount, category, moment().format('DD.MM.YYYY HH:mm:ss'), description);
    this.sub1 = this.apiService.getBill().subscribe((bill: any) => {
      let value = 0;
      if (type === 'outcome') {
        this.sub2 = this.apiService.getCategories().subscribe((res: any) => {
          const {limit, costs} = res.filter(el => el._id === category)[0];
          if (amount > bill || amount > (limit - costs)) {
            this.showMessege('Не достаточно средств!');
            return;
          }
          else {
            value = bill - amount;
            this.addEvent(form, event, value);
          }
        });

      }
      else {
        value = bill + amount;
        this.addEvent(form, event, value);
      }
    });
  }

  addEvent(form, event, value) {
    this.sub2 = this.apiService.editBill({value})
      .subscribe(() => {
        return this.apiService.addEvents(event)
          .subscribe(() => {
            form.setValue({
              amount: 1,
              category: 1,
              description: ' ',
              type: 'income'
            });
          });
      });
    this.sub3 = this.apiService.updateCosts(form.value.amount, form.value.category, form.value.type);
  }

  ngOnDestroy() {
    if (this.sub1) this.sub1.unsubscribe();
    if (this.sub2) this.sub2.unsubscribe();
    if (this.sub3) this.sub3.unsubscribe();
  }
}
