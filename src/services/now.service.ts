import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {formatDate} from '@angular/common';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NowService {
  private url = 'https://worldtimeapi.org/api/timezone/Europe/Paris';
  private apiDate: Date;
  private formats = {
    datetime: 'dd/MM/yyyy \'a\' HH\'h\'mm',
    datetimeHat: 'dd/MM/yyyy à HH\'h\'mm',
    date: 'dd/MM/yyyy',
    hour: 'HH',
    minute: 'mm',
    seconds: 'SS'
  };

  nowSubject = new Subject<Date>();

  constructor(private http: HttpClient) {
  }

  fetch() {
    // In milliseconds (5 minutes)
    const timeTolerance = 1000 * 60 * 5;

    return new Promise(resolve => {
      if (!this.apiDate || Math.abs(this.apiDate.getTime() - (new Date()).getTime()) > timeTolerance) {
        this.http.get(this.url).subscribe((response) => {
          // @ts-ignore
          if (response.datetime && !isNaN(Date.parse(response.datetime))) {
            // @ts-ignore
            this.apiDate = new Date(response.datetime); // TODO: Add Datetime model
            resolve(this.apiDate);
            this.emit();
          }
        });
      } else {
        resolve(this.apiDate);
      }
    });
  }

  format(now: Date, format: string): string {
    if (this.formats[format]) {
        return formatDate(now, this.formats[format], 'fr_FR');
    }
    return;
  }

  emit() {
    this.nowSubject.next(this.apiDate);
  }
}
