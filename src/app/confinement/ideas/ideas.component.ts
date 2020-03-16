import { Component, OnInit } from '@angular/core';
import i from './ideas.json';

@Component({
  selector: 'app-ideas',
  templateUrl: './ideas.component.html',
  styleUrls: ['./ideas.component.css']
})
export class IdeasComponent implements OnInit {
  ideas: {id: number, title: string, content: {link: string, title: string}[]}[] = i;
  constructor() { }

  ngOnInit() {
  }

}
