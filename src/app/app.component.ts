import {Component} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
// tslint:disable-next-line:ban-types
declare let gtag: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        gtag('config', 'UA-92509401-4', { page_path: event.urlAfterRedirects });
      }
    });
  }
}
