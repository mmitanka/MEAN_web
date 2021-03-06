import { Component, OnInit } from '@angular/core';
import { ProjekatService } from '../projekat.service';
import { Router } from '@angular/router';
import { Rasadnik } from '../interfejsi/rasadnik';
import { Proizvod } from '../interfejsi/priozvod';
import { Komentar } from '../interfejsi/komentar';
import { Preparat } from '../interfejsi/preparat';

@Component({
  selector: 'app-web-strana-prep',
  templateUrl: './web-strana-prep.component.html',
  styleUrls: ['./web-strana-prep.component.css']
})
export class WebStranaPrepComponent implements OnInit {

  constructor(private ruter:Router,private servis:ProjekatService) {
    
    this.ras=this.servis.ucitajRasadnik();
    this.prep=this.servis.uzmiPrepZaWeb();
    this.ucitajKom();
    this.typeErr=true;
   }

  ngOnInit(): void {
  }
   /*polja*/
   prep:Preparat={
    ime_sadnice:'',
    ubrzanje:0,
    kolicina:0,
    proizvodjac:'',
    _id:0
  }
  komentari:Komentar[]=[];
  proizvodi:Proizvod[]=[];
  mozeKom:boolean;
  kol:number;
  typeErr:boolean=false;

  ras:Rasadnik;


  /*ucitavanje komentara*/
  ucitajKom(){
    this.servis.detaljanPrikaz(this.prep._id.toString()).subscribe(data=>{
      if(data) {
        this.komentari=data;
      }
    })
  }

  natrag() {
    this.ruter.navigate(['/preduzece']);
  }

    /*izloguj se */
    odjavljivanje() {
      this.ruter.navigate(['/prijava']);
    }
}
