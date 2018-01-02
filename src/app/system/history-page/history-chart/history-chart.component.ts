import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-history-chart',
  templateUrl: './history-chart.component.html',
  styleUrls: ['./history-chart.component.scss']
})
export class HistoryChartComponent implements OnInit {
  @Input() data;
  view: any[] = [500, 400];
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#ffffff', '#2451A4', '#A4380B']
  };

  constructor() {
  }

  ngOnInit() {
  }

}
