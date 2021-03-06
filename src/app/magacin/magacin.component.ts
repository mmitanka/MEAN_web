import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjekatService } from '../projekat.service';
import { MSadnica } from '../interfejsi/msadnica';
import { Magacin } from '../interfejsi/magacin';
import { Rasadnik } from '../interfejsi/rasadnik';
import { Preparat } from '../interfejsi/preparat';

@Component({
  selector: 'app-magacin',
  templateUrl: './magacin.component.html',
  styleUrls: ['./magacin.component.css']
})
export class MagacinComponent implements OnInit {

  constructor(private ruter:Router, private servis:ProjekatService) {
    this.ras=servis.ucitajRasadnik();
    this.ucitajMagacin();
  }

  ngOnInit(): void {
  }
/*polja*/
  magacin:Magacin[]=[];
  msadnice:MSadnica[]=[];
  mpreparati:Preparat[]=[];
  ras:Rasadnik={
    _id:0,
    korime:'',
    naziv:'',
    br_sadnica:0,
    br_slobodnih_mesta:0,
    mesto:'',
    voda:0,
    temp:0,
    duzina:0,
    sirina:0
  }


  /*ucitavanje magacina */
  ucitajMagacin() {
    this.servis.ucitajMagacin(this.ras.korime,this.ras.naziv).subscribe(data=>{
      if(data){
        this.magacin=data;
        this.dodeliVrMagacinu();
      }
    });
  }
/*pomocna */
dodeliVrMagacinu() {
  let is=0, ip=0;
  this.magacin.forEach(m=>{

    if(m.tip=='sadnica'){
      this.msadnice[is++]=m;
    }else {
      this.mpreparati[ip++]=m;
    }
  });
}

/*sadjenje */
zasadi(i:number) {

  this.servis.sadi(this.magacin[i]).subscribe(data=>{
   
    if(data){
      this.ruter.navigate(['/rasadnik']);
    }
  });
}
/*povecavanje progresa:*/
povecajProgr(i:number){
  let sad=this.servis.uzmiSadZaProgres();
  let prep=this.mpreparati[i];
  let p=this.magacin.filter(m=> (m.ime_sadnice==prep.ime_sadnice && m.proizvodjac==prep.proizvodjac))[0];
  this.servis.povecajProgres(sad,prep).subscribe(data=>{
          if(data) {
            console.log(data);
            this.ruter.navigate(['/rasadnik'])
          }
  });
}


  /*izloguj se */
  odjavljivanje() {
    this.ruter.navigate(['/prijava']);
  }

  natrag(){
    this.ruter.navigate(['/rasadnik'])
  }
}
