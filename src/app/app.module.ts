import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { AgroOnlineComponent } from './agro-online/agro-online.component';
import { AgroPreparatComponent } from './agro-preparat/agro-preparat.component';
import { AgroSadnicaComponent } from './agro-sadnica/agro-sadnica.component';
import { KorpaComponent } from './korpa/korpa.component';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { PoljoprivrednikComponent } from './poljoprivrednik/poljoprivrednik.component';
import { PreduzeceComponent } from './preduzece/preduzece.component';
import { PrijavaComponent } from './prijava/prijava.component';
import { RasadnikComponent } from './rasadnik/rasadnik.component';
import { WebStranaSadComponent } from './web-strana-sad/web-strana-sad.component';
import { WebStranaPrepComponent } from './web-strana-prep/web-strana-prep.component';
import { MagacinComponent } from './magacin/magacin.component';
import { RegistracijaComponent } from './registracija/registracija.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { ProjekatService } from './projekat.service';
import { ChartsModule } from 'ng2-charts';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { StepperComponent } from './stepper/stepper.component';
import {RecaptchaModule} from 'ng-recaptcha';


@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    AgroOnlineComponent,
    AgroPreparatComponent,
    AgroSadnicaComponent,
    KorpaComponent,
    PocetnaComponent,
    PoljoprivrednikComponent,
    PreduzeceComponent,
    PrijavaComponent,
    RasadnikComponent,
    WebStranaSadComponent,
    WebStranaPrepComponent,
    MagacinComponent,
    RegistracijaComponent,
    BarChartComponent,
    StepperComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ChartsModule,
    RecaptchaModule,
  ],
  providers: [ProjekatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
