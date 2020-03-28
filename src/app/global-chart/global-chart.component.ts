import {Component, Inject, LOCALE_ID, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {OpenCovidService} from '../../services/openCovid.service';
import {ChartDataSets, ChartOptions} from 'chart.js';
import {BaseChartDirective, Color, Label} from 'ng2-charts';
import {GlobalModel} from '../../models/global.model';
import {CountryModel} from '../../models/country.model';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-global-chart',
  templateUrl: './global-chart.component.html',
  styleUrls: ['./global-chart.component.css']
})
export class GlobalChartComponent implements OnInit, OnDestroy {
  private dataSubscription: Subscription;
  data: GlobalModel = new GlobalModel();

  private franceCases = [];
  private franceDeaths = [];

  lineChartData: ChartDataSets[] = [
      {data: this.franceCases, label: 'Cas confirmés'},
      {data: this.franceDeaths, label: 'Morts'}
      ];
  lineChartLabels: Label[] = [];
  lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: { xAxes: [{}], yAxes: [{id: 'y-axis-0', position: 'left'} ]},
    annotation: {annotations: []},
  };
  lineChartColors: Color[] = [
    { // blue
     backgroundColor: 'rgba(0,0,0,0)',
      borderColor: 'blue',
      pointBackgroundColor: 'blue',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // red
      backgroundColor: 'rgba(0,0,0,0)',
      borderColor: 'red',
      pointBackgroundColor: 'red',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  lineChartLegend = true;
  lineChartType = 'line';
  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;
  constructor(private openCovid: OpenCovidService, @Inject(LOCALE_ID) private locale: string) { }

  ngOnInit() {
    this.openCovid.fetch();
    this.dataSubscription = this.openCovid.dataSubject.subscribe(
      (data: GlobalModel) => {
           this.data = data;
           this.loadCharts();
      });
    this.openCovid.emitSubject();
  }

  loadCharts() {
    const country: CountryModel = this.data.countries.find(c => c.id === 1);
    if (country !== undefined) {
      country.cases.points.forEach(p => {
          const label = formatDate(p.label, 'dd MMM', this.locale);
          let ind = this.lineChartLabels.indexOf(label);
          if (ind === -1) {
            ind = this.lineChartLabels.length;
            this.lineChartLabels.push(label);
          }
          this.franceCases[ind] = p.value;
      });
      country.deaths.points.forEach(p => {
        const label = formatDate(p.label, 'dd MMM', this.locale);
        let ind = this.lineChartLabels.indexOf(label);
        if (ind === -1) {
          ind = this.lineChartLabels.length;
          this.lineChartLabels.push(label);
        }
        this.franceDeaths[ind] = p.value;
      });
    }
  }

  // events
  chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
  }
}
