import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-bill-currency',
  templateUrl: './bill-currency.component.html',
  styleUrls: ['./bill-currency.component.scss']
})
export class BillCurrencyComponent implements OnInit {
  @Input() currency;
  currencies = ['USD', 'EUR'];
  constructor() { }

  ngOnInit() {
  }

}
