import { Component, OnInit } from '@angular/core';
import { Rasadnik } from '../interfejsi/rasadnik';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjekatService } from '../projekat.service';
import { Preduzece } from '../interfejsi/preduzece';
import { Preparat } from '../interfejsi/preparat';
import { MSadnica } from '../interfejsi/msadnica';
import { Proizvod } from '../interfejsi/priozvod';
import { Komentar } from '../interfejsi/komentar';

@Component({
  selector: 'app-agro-online',
  templateUrl: './agro-online.component.html',
  styleUrls: ['./agro-online.component.css']
})
export class AgroOnlineComponent implements OnInit {

  constructor(private ruter:Router, private servis:ProjekatService) {
    this.ras=servis.ucitajRasadnik();
    this.ucitajPreduzeca();
    this.ucitajSveProiz();
   }

  ngOnInit(): void {


  }
  /*polja*/
  ras:Rasadnik;
  pred:Preduzece[]=[];
  selected:string;

  proizvodi:Proizvod[]=[];
  preparati:Preparat[]=[];
  sadnice:MSadnica[]=[];

  komentari:Komentar[]=[];

  p:Preparat ={
    ime_sadnice:'',
    ubrzanje:0,
    kolicina:0,
    proizvodjac:'',
    _id:0
  }
  typeErr:boolean=false;
  typeErrSvi:boolean=false;


  /*ucitavanje svih preduzeca*/
  ucitajPreduzeca() {
    this.servis.ucitajPreduzeca(this.ras._id).subscribe(data=>{
      if(data) {
        this.pred=data;
      }
    });
  }
/*ucitavanje proizvoda svih preduzeca*/
ucitajSveProiz(){
  this.servis.ucitajSveProizvode().subscribe(data=>{
    if(data) {
      this.proizvodi=data;
      this.dodeliVr();
      this.typeErrSvi=true;
      this.typeErr=false;

    }
  });
}
  
/*ucitaj proizvode odr preduzeca*/
ucitajProizvode() {
    this.servis.ucitajProizvode(this.selected).subscribe(data=>{
      if(data) {
        this.proizvodi=data;
        this.dodeliVr();
        this.typeErr=true;
        this.typeErrSvi=false;
      }
    });
  }
/*pomocna da punim nizove*/
dodeliVr() {
  this.sadnice=[];
  this.preparati=[];
  let ip=0, is=0;
    this.proizvodi.forEach(p=>{
      if(p.tip=='sadnica') {
        this.sadnice[ip++]=p;
      }else{
        this.preparati[is++]=p;
      }
    })

    
  
}

/*provera da li artikla ima na stanju*/
naStanjuS(i:number):boolean {
  return this.sadnice[i].kolicina>0?true:false;
}
naStanjuP(i:number):boolean {
  return this.preparati[i].kolicina>0?true:false;
}

/*detaljan prikaz sadnice*/ 
sadnica(i:number) {
  this.servis.postaviSadnicuZaDetPrikaz(this.sadnice[i]);
  this.servis.detaljanPrikaz(this.sadnice[i]._id.toString()).subscribe(data=>{
    if(data) {
      this.komentari=data;
      this.servis.postaviKomentareDetPrikaz(this.komentari);
      this.ruter.navigate(['/agrosadnica']);

    }
  });
}
/*detaljan prikaz preparata*/
preparat(i:number) {
  this.servis.postaviPreparatZaDetPrikaz(this.preparati[i]);

  this.servis.detaljanPrikaz(this.preparati[i]._id.toString()).subscribe(data=>{
    if(data) {
      this.komentari=data;
      this.servis.postaviKomentareDetPrikaz(this.komentari);
      this.ruter.navigate(['/agropreparat']);

    }
  });
}
prebaciNaKorpu() {
  this.ruter.navigate(['/korpa']);
}


  /*izloguj se */
  odjavljivanje() {
    this.ruter.navigate(['/prijava']);
  }

  natrag () {
    this.ruter.navigate(['/rasadnik']);
  }

}
