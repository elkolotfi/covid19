import { Component, OnInit } from '@angular/core';
import q from './questions.json';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {
  questions: {id: number, question: string, answer: string}[] = q;
  constructor() { }

  ngOnInit() {
  }

}
