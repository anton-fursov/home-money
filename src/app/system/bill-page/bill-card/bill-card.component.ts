import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-bill-card',
  templateUrl: './bill-card.component.html',
  styleUrls: ['./bill-card.component.scss']
})
export class BillCardComponent implements OnInit {
  @Input() bill;
  @Input() currency;
  usd: number;
  eur: number;

  constructor() {
  }

  ngOnInit() {
    this.usd = this.bill / this.currency[0].rate;
    this.eur = this.bill / this.currency[1].rate;
  }

}
