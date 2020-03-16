import {BrowserModule} from '@angular/platform-browser';
import {registerLocaleData} from '@angular/common';
import {LOCALE_ID, NgModule} from '@angular/core';
import localeFr from '@angular/common/locales/fr';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {OpenCovidService} from '../services/openCovid.service';
import {ChartsModule} from 'ng2-charts';
import {GlobalChartComponent} from './global-chart/global-chart.component';
import {HeadComponent} from './sections/head/head.component';
import {AppRoutingModule} from './app-routing.module';
import {InformationComponent} from './information/information.component';
import {AboutComponent} from './about/about.component';
import {FooterComponent} from './sections/footer/footer.component';
import {AttestationComponent} from './confinement/attestation/attestation.component';
import {IdeasComponent} from './confinement/ideas/ideas.component';
import {InfoComponent} from './confinement/info/info.component';
import {PdfJsViewerModule} from 'ng2-pdfjs-viewer';
import { FormPersoComponent } from './confinement/attestation/form-perso/form-perso.component';
import { FormProComponent } from './confinement/attestation/form-pro/form-pro.component';
import {PdfService} from '../services/pdf.service';
import {ReactiveFormsModule} from '@angular/forms';
import {PdfDataModel} from '../models/attestation/pdfData.model';
import {OWL_DATE_TIME_LOCALE, OwlDateTimeModule, OwlNativeDateTimeModule} from 'ng-pick-datetime';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent,
    GlobalChartComponent,
    HeadComponent,
    InformationComponent,
    AboutComponent,
    FooterComponent,
    AttestationComponent,
    IdeasComponent,
    InfoComponent,
    FormPersoComponent,
    FormProComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ChartsModule,
    AppRoutingModule,
    PdfJsViewerModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
  ],
  providers: [
    OpenCovidService,
    PdfService,
    PdfDataModel,
    {provide: LOCALE_ID, useValue: 'fr-FR' },
    {provide: OWL_DATE_TIME_LOCALE, useValue: 'fr'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
