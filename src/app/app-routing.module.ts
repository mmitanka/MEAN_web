import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { PoljoprivrednikComponent } from './poljoprivrednik/poljoprivrednik.component';
import { PreduzeceComponent } from './preduzece/preduzece.component';
import { RegistracijaComponent } from './registracija/registracija.component';
import { PrijavaComponent } from './prijava/prijava.component';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { RasadnikComponent } from './rasadnik/rasadnik.component';
import { MagacinComponent } from './magacin/magacin.component';
import { AgroOnlineComponent } from './agro-online/agro-online.component';
import { AgroSadnicaComponent } from './agro-sadnica/agro-sadnica.component';
import { AgroPreparatComponent } from './agro-preparat/agro-preparat.component';
import { KorpaComponent } from './korpa/korpa.component';
import { WebStranaPrepComponent } from './web-strana-prep/web-strana-prep.component';

import { WebStranaSadComponent } from './web-strana-sad/web-strana-sad.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { StepperComponent } from './stepper/stepper.component';



const routes: Routes = [
  {path:'', component:PocetnaComponent},
  {path:'admin',component:AdminComponent},
  {path:'poljoprivrednik',component:PoljoprivrednikComponent},
  {path:'preduzece',component:PreduzeceComponent},
  {path:'registracija',component:RegistracijaComponent},
  {path:'prijava', component:PrijavaComponent},
  {path:'rasadnik', component:RasadnikComponent},
  {path:'magacin', component:MagacinComponent},
  {path:'agroonline', component:AgroOnlineComponent},
  {path:'agrosadnica', component:AgroSadnicaComponent},
  {path:'agropreparat', component:AgroPreparatComponent},
  {path:'korpa', component:KorpaComponent},
  {path:'webstranasad', component:WebStranaSadComponent},
  {path:'webstranaprep', component:WebStranaPrepComponent},
  {path:'bar-chart', component:BarChartComponent},
  {path:'stepper', component:StepperComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
