import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjekatService } from '../projekat.service';
import { Proizvod } from '../interfejsi/priozvod';
import { Rasadnik } from '../interfejsi/rasadnik';

@Component({
  selector: 'app-korpa',
  templateUrl: './korpa.component.html',
  styleUrls: ['./korpa.component.css']
})
export class KorpaComponent implements OnInit {

  constructor(private ruter:Router, private servis:ProjekatService) {
    this.porudzbine=this.servis.uzmiIzKorpe();
    if(this.porudzbine.length==0)
     {this.prazno=true;
    }else {this.prazno=false;}
    this.ras=this.servis.ucitajRasadnik();
   }

  ngOnInit(): void {
  }
  porudzbine:Proizvod[]=[];
  ras:Rasadnik;
  prazno:boolean;
/*na backu potvrdjujemo porudzbinu i sve potrebno*/
  potvrdiPorudzbinu() {
    this.servis.naruciProizvode(this.porudzbine,this.ras).subscribe(data=>{
      if(data) {
        console.log(data);
        this.servis.isprazniKorpu();
        this.ruter.navigate(['/agroonline']);
      }
    });
  }

    /*ukloni proizvod iz korpe HM?*/
    ukloniProizvod(i:number) {
      
      let p=this.porudzbine.splice(i,1);
      console.log(`izbrisala sam ${p[0].ime_sadnice} iz niza`);
      if(this.porudzbine.length==0){
        this.prazno=true;
        this.servis.isprazniKorpu();
        this.ruter.routeReuseStrategy.shouldReuseRoute = () => false;
        this.ruter.onSameUrlNavigation = 'reload';
        this.ruter.navigate(['/korpa']);
      } 
      this.servis.postaviUKorpu(this.porudzbine);
    }

      /*izloguj se */
  odjavljivanje() {
    this.ruter.navigate(['/prijava']);
  }

  natrag () {
    this.ruter.navigate(['/agroonline']);
  }
}
