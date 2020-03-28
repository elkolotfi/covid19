import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GlobalChartComponent} from './global-chart/global-chart.component';
import {InformationComponent} from './information/information.component';
import {AboutComponent} from './about/about.component';
import {AttestationComponent} from './confinement/attestation/attestation.component';
import {IdeasComponent} from './confinement/ideas/ideas.component';
import {InfoComponent} from './confinement/info/info.component';
import {HomeComponent} from './home/home.component';

const routes: Routes = [
  { path: 'statistiques', component: GlobalChartComponent },
  { path: 'infos', component: InformationComponent },
  { path: 'confinement/informations', component: InfoComponent },
  { path: 'confinement/attestation-sorties', component: AttestationComponent },
  { path: 'confinement/idees-astuces', component: IdeasComponent },
  { path: 'about', component: AboutComponent },
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
