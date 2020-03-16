import { Component, OnInit } from '@angular/core';
import q from './questions.json';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  questions: {id: number, question: string, answer: string}[] = q;
  constructor() { }

  ngOnInit() {
  }

}
