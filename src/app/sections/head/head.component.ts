import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import {Router} from '@angular/router';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css']
})
export class HeadComponent implements OnInit {
  confinementDays: number;
  constructor(public router: Router) { }

  ngOnInit() {
    const confinementBegin = moment('2020-03-17 00:00:00'); // new Date();
    this.confinementDays = Math.abs(confinementBegin.diff(moment(), 'days')) + 1;
  }

  doNothing() {
    return;
  }
}
