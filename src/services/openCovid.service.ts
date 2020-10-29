import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {OpenCovidModel} from '../models/sources/openCovid.model';
import {Subject} from 'rxjs';
import {GlobalModel} from '../models/global.model';
import {CountryModel} from '../models/country.model';
import {PointModel} from '../models/point.model';
import {ChartResponseInterface} from '../interfaces/ChartResponseInterface';


@Injectable({
  providedIn: 'root'
})
export class OpenCovidService {
  private url = 'https://raw.githubusercontent.com/opencovid19-fr/data/master/dist/chiffres-cles.json';

  private data = new GlobalModel([]);
  private points: OpenCovidModel[] =  [];
  private lastUpdate: Date;

  private newCases: number;
  private lastCases = 0;
  private beforeLastCases: number;

  dataSubject = new Subject<GlobalModel>();
  ocSubject = new Subject<OpenCovidModel[]>();
  luSubject = new Subject<Date>();
  ncSubject = new Subject<number>();

  constructor(private client: HttpClient) {
  }

  fetch() {
    this.client.get(this.url).subscribe(
      // tslint:disable-next-line:max-line-length
      (responses: ChartResponseInterface[]) => {
        const franceCases = new CountryModel(1, 'France (Cas confirmé)');

        this.data.countries.push(franceCases);
        response.forEach(d => {
          const label = d.date.toString();
          const casesNumber = isNaN(d.casConfirmes) ? 0 : d.casConfirmes;
          if (casesNumber > 0 && d.code === 'FRA' && (d.sourceType === 'sante-publique-france' || d.sourceType === 'ministere-sante')) {
            let casePoint: PointModel = franceCases.cases.points.find(p => p.label === label);
            if (casePoint === undefined) {
              casePoint = new PointModel(label, 0, 'cases');
              franceCases.cases.points.push(casePoint);
              casePoint.value = casesNumber;

              const oldValue = this.data.casesNumber;
              this.data.casesNumber = casePoint.value;
              this.data.newCases = casePoint.value - oldValue;
            }
          }

          const deathsNumber = isNaN(d.deces) ? 0 : d.deces;
          if (deathsNumber > 0 && d.code === 'FRA' && (d.sourceType === 'sante-publique-france' || d.sourceType === 'ministere-sante')) {
            let deathPoint: PointModel = franceCases.deaths.points.find(p => p.label === label);
            if (deathPoint === undefined) {
              deathPoint = new PointModel(label, 0, 'cases');
              franceCases.deaths.points.push(deathPoint);

              deathPoint.value = deathsNumber;

              const oldValue = this.data.deathsNumber;
              this.data.deathsNumber = deathPoint.value;
              this.data.newDeaths = deathPoint.value - oldValue;
            }
          }

          if (this.data.lastUpdate === undefined || this.data.lastUpdate < d.date) {
            this.data.lastUpdate = d.date;
          }
          this.emitSubject();
        });
      });
  }

  emitSubject() {
    this.dataSubject.next(this.data);
    this.ocSubject.next(this.points.slice());
    this.luSubject.next(this.lastUpdate);
    this.ncSubject.next(this.lastCases - this.beforeLastCases);
  }
}
