import { Component, HostBinding, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { fadeStateTrigger } from '../shared/animations/animations';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  animations: [fadeStateTrigger]
})
export class AuthComponent implements OnInit {
  @HostBinding('@fade') fade = true;
  constructor(private route: Router) { }

  ngOnInit() {
    this.route.navigate(['/login']);
  }

}
