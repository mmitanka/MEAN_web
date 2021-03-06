import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Preparat } from '../interfejsi/preparat';
import { ProjekatService } from '../projekat.service';
import { Komentar } from '../interfejsi/komentar';
import { Proizvod } from '../interfejsi/priozvod';
import { Rasadnik } from '../interfejsi/rasadnik';

@Component({
  selector: 'app-agro-preparat',
  templateUrl: './agro-preparat.component.html',
  styleUrls: ['./agro-preparat.component.css']
})
export class AgroPreparatComponent implements OnInit {

  constructor(private ruter:Router, private servis:ProjekatService) {
    this.komentari=this.servis.uzmiKomentareDetPrikaz();
    this.ras=this.servis.ucitajRasadnik();
    this.prep=this.servis.uzmiPreparatZaDetPrikaz();
    this.proizvodi=this.servis.uzmiIzKorpe();
    if(this.proizvodi==null) {
      this.proizvodi=[];
    }
    this.mozeKom=false;
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

  ras:Rasadnik;
  pocena:number;
  komentar:string;

  natrag() {
    this.ruter.navigate(['/agroonline']);
  }
/*forma za kom*/
formaKom() {
  this.mozeKom=true;
}

/*zove servis i ostavlja komentar*/
  ostaviKom() {
    let d={
      korime:this.ras.korime,
      id_sadnice:this.prep._id.toString(),
      ime_sadnice:this.prep.ime_sadnice,
      proizvodjac:this.prep.proizvodjac,
      tip:'preparat',
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
    this.servis.detaljanPrikaz(this.prep._id.toString()).subscribe(data=>{
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
    if(this.kol>this.prep.kolicina){ alert('smanjite kolicinu!!!')}
    else {
      let p:Proizvod ={
        _id:this.prep._id,
        ime_sadnice:this.prep.ime_sadnice,
        proizvodjac:this.prep.proizvodjac,
        kolicina:this.kol,
        ocena:this.prep.ocena,
        tip:'preparat',
        ubrzanje:this.prep.ubrzanje

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
