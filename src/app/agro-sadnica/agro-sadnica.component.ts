import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjekatService } from '../projekat.service';
import { Komentar } from '../interfejsi/komentar';
import { MSadnica } from '../interfejsi/msadnica';
import { Proizvod } from '../interfejsi/priozvod';
import { Rasadnik } from '../interfejsi/rasadnik';

@Component({
  selector: 'app-agro-sadnica',
  templateUrl: './agro-sadnica.component.html',
  styleUrls: ['./agro-sadnica.component.css']
})
export class AgroSadnicaComponent implements OnInit {

  constructor(private ruter:Router,private servis:ProjekatService) {
    this.komentari=this.servis.uzmiKomentareDetPrikaz();
    this.ras=this.servis.ucitajRasadnik()
    this.sad=this.servis.uzmiSadnicuZaDetPrikaz();
    this.proizvodi=this.servis.uzmiIzKorpe();
    if(this.proizvodi==null) {
      this.proizvodi=[];
    }
    this.mozeKom=false;
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
  kol:number;
  proizvodi:Proizvod[]=[];
  ras:Rasadnik;
  mozeKom:boolean;
  komentar:string;
  pocena:number;


  natrag() {
    this.ruter.navigate(['/agroonline']);
  }

  /*prikazuje formu za komentar*/
  formaKom() {
    this.mozeKom=true;
  }

  /*zove servis */
  ostaviKom() {
    let d={
      korime:this.ras.korime,
      id_sadnice:this.sad._id.toString(),
      ime_sadnice:this.sad.ime_sadnice,
      proizvodjac:this.sad.proizvodjac,
      tip:'sadnica',
      pocena:this.pocena,
      komentar:this.komentar
    }
    this.servis.postaviKomentar(d).subscribe(data=>{
      if(data) {
        console.log(data);
        this.mozeKom=false;
        this.pocena=null;
        alert(data);
        this.ucitajKomentare();
        
      }
    });
  }

  ucitajKomentare() {
    this.servis.detaljanPrikaz(this.sad._id.toString()).subscribe(data=>{
      if(data) {
        this.servis.postaviKomentareDetPrikaz(data);
        this.ruter.routeReuseStrategy.shouldReuseRoute = () => false;
        this.ruter.onSameUrlNavigation = 'reload';
        this.ruter.navigate(['/agropreparat']);
      }
    });
  }
  /*za dodavanje prozivoda u korpu ls metoda*/
  dodajUKorpu() {
    if(this.kol>this.sad.kolicina){ alert('smanjite kolicinu!!!')}
    else {
      let p:Proizvod ={
        _id:this.sad._id,
        ime_sadnice:this.sad.ime_sadnice,
        proizvodjac:this.sad.proizvodjac,
        kolicina:this.kol,
        ocena:this.sad.ocena,
        tip:'sadnica',
        ubrzanje:0

      }
      this.proizvodi.push(p);
      console.log(this.proizvodi);
      this.servis.postaviUKorpu(this.proizvodi);
      this.ruter.navigate(['/agroonline']);
    }
  } 
    /*izloguj se */
    odjavljivanje() {
      this.ruter.navigate(['/prijava']);
    }
}
