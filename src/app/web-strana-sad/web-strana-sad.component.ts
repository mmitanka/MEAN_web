import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjekatService } from '../projekat.service';
import { MSadnica } from '../interfejsi/msadnica';
import { Preparat } from '../interfejsi/preparat';
import { Komentar } from '../interfejsi/komentar';
import { Rasadnik } from '../interfejsi/rasadnik';

@Component({
  selector: 'app-web-strana-sad',
  templateUrl: './web-strana-sad.component.html',
  styleUrls: ['./web-strana-sad.component.css']
})
export class WebStranaSadComponent implements OnInit {

  constructor(private ruter:Router, private servis:ProjekatService) {
    this.ras=this.servis.ucitajRasadnik()
    this.sad=this.servis.uzmiSadZaWeb();
    this.ucitajKom()

    this.typeErr=true;
   }

  ngOnInit(): void {
  }


  komentari:Komentar[]=[];
  sad:MSadnica={
    ime_sadnice:'',
    _id:0,
    proizvodjac:'',
    kolicina:0
  }
  ras:Rasadnik;

  typeErr:boolean=false;

  /*natrag na preduzece*/ 
  natrag() {
    this.ruter.navigate(['/preduzece']);
  }
  /*ucitavanje komentara*/
  ucitajKom(){
    this.servis.detaljanPrikaz(this.sad._id.toString()).subscribe(data=>{
      if(data) {
        this.komentari=data;
      }
    })
  }
  
  /*izloguj se */
    odjavljivanje() {
      this.ruter.navigate(['/prijava']);
    }
}
