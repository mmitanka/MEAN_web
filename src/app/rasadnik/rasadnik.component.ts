import { Component, OnInit } from '@angular/core';
import { Rasadnik } from '../interfejsi/rasadnik';
import { Router } from '@angular/router';
import { ProjekatService } from '../projekat.service';
import { Sadnica } from '../interfejsi/sadnica';
import { Magacin } from '../interfejsi/magacin';
import { Preparat } from '../interfejsi/preparat';
import { MSadnica } from '../interfejsi/msadnica';
import { Porudzbina } from '../interfejsi/porudzbina';
import { timer, interval, Observable, Subscription } from 'rxjs';



@Component({
  selector: 'app-rasadnik',
  templateUrl: './rasadnik.component.html',
  styleUrls: ['./rasadnik.component.css']
})
export class RasadnikComponent implements OnInit {

  constructor(private ruter:Router,private servis:ProjekatService) {
    this.typeErr=false;

    this.ras=this.servis.ucitajRasadnik();
    this.sadnica.length=this.ras.br_sadnica;
   
    this.slobodna_mesta.length=this.ras.br_slobodnih_mesta;
    this.ucitajSadnice();
    this.ucitajMagacin();
    this.ucitajPorudzbine();
    this.satVrTajmer();
    
  }

  ngOnInit(): void {
    if(this.ras.temp<12 ||this.ras.voda<75){
      this.message=`Rasadnik ${this.ras.naziv} korisnika ${this.ras.korime} zahteva odrzavanje!`

    }else { 
      this.message='';

    }
  }
  ngOnDestroy():void {
    this.subs.unsubscribe();
  }
  ind:boolean=false;

 /*polja*/
  ras:Rasadnik= {
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

  };
 slob:Sadnica={
    ime_sadnice:'slobodno',
    proizvodjac:'/',
    progres:0,
    s:true,
    _id:0
  }

  sadnica:Sadnica[]=[];
  slobodna_mesta: Sadnica[]=[];
 
  matrica:Sadnica[][]=[];

/*polja za filtriranja na frontu*/
  sve:boolean=true;
  typeErr:boolean;
  /*polje za hvatanje vrednosti select-a*/

  selected1:string;
  selected2:string;
  /*za input za filtr*/ 
  name:string;
  /*nizovi za prih filtr pod*/
  filt:boolean=false;
  fsad:MSadnica[]=[];
  fprep:Preparat[]=[];
  /*nizovi za prihvatanje sort pod*/
  sort:boolean=false;
  sprep:Preparat[]=[];
  ssad:MSadnica[]=[];

  magacin:Magacin[]=[];
  msadnice:MSadnica[]=[];
  mpreparati:Preparat[]=[];

  porudzbine:Porudzbina[]=[];
  psadnice:MSadnica[]=[];
  ppreparati:Preparat[]=[];

  /*za interval*/
  subs:Subscription;
  message:string;
  errVoda:boolean=false;
  errTemp:boolean=false;

/*fja za podesavanje flagova na osnovu select vrednosti*/ 
filtriraj() {
  switch(this.selected1){
    case 'sve':
      this.sve=true;
      this.sort=false;
      this.filt=false;
      break;
    case 'ime_sadnice':
      this.sve=false;
      this.fsad=this.msadnice.filter(sad=>
        (this.name==sad.ime_sadnice));
      this.fprep=this.mpreparati.filter(sad=>
        (sad.ime_sadnice==this.name)); 
      this.filt=true;
      if(this.sort){this.sort=false}
      break;
    case 'proizvodjac':
      this.sve=false;
      this.fsad=this.msadnice.filter(sad=>
        (this.name==sad.proizvodjac));
      this.fprep=this.mpreparati.filter(sad=>
        (sad.proizvodjac==this.name));  
      this.filt=true;
      if(this.sort){this.sort=false}
      break;
    case 'kolicina':
      this.sve=false;
      this.fsad=this.msadnice.filter(sad=>
        (parseInt(this.name)==sad.kolicina));
      this.fprep=this.mpreparati.filter(sad=>
        (sad.kolicina==parseInt(this.name)));
      this.filt=true;
      if(this.sort){this.sort=false}
      break;

  }
}
filtrirajPo() {
  
  this.filtriraj();
}
/*sortiranje po parametru iz selected*/
sortiraj() {
  switch(this.selected2) {
    case 'sve':
      this.sve=true;
      this.filt=false;
      this.sort=false;
      break;
    case 'ime_sadnice':
      this.sve=false;
      if(!this.filt){

        this.ssad=this.msadnice.sort((n1,n2)=>{
          if(n1.ime_sadnice>n2.ime_sadnice){
            return 1;
          }
          if(n1.ime_sadnice<n2.ime_sadnice){
            return -1;
          }
          return 0;
        });
      
        this.sprep=this.mpreparati.sort((n1,n2)=>{
          if(n1.ime_sadnice>n2.ime_sadnice){
            return 1;
          }
          if(n1.ime_sadnice<n2.ime_sadnice){
            return -1;
          }
          return 0;
        });
      }else {
        this.filt=false;
        this.ssad=this.fsad.sort((n1,n2)=>{
          if(n1.ime_sadnice>n2.ime_sadnice){
            return 1;
          }
          if(n1.ime_sadnice<n2.ime_sadnice){
            return -1;
          }
          return 0;
        });
      
        this.sprep=this.fprep.sort((n1,n2)=>{
          if(n1.ime_sadnice>n2.ime_sadnice){
            return 1;
          }
          if(n1.ime_sadnice<n2.ime_sadnice){
            return -1;
          }
          return 0;
        });
      }
      this.sort=true;

      break;
    case 'proizvodjac':
      this.sve=false;
      if(!this.filt){

        this.ssad=this.msadnice.sort((n1,n2)=>{
          if(n1.proizvodjac>n2.proizvodjac){
            return 1;
          }
          if(n1.proizvodjac<n2.proizvodjac){
            return -1;
          }
          return 0;
        });
        this.sprep=this.mpreparati.sort((n1,n2)=>{
          if(n1.proizvodjac>n2.proizvodjac){
            return 1;
          }
          if(n1.proizvodjac<n2.proizvodjac){
            return -1;
          }
          return 0;
        });
      }else {
        this.filt=false;
        this.ssad=this.fsad.sort((n1,n2)=>{
          if(n1.proizvodjac>n2.proizvodjac){
            return 1;
          }
          if(n1.proizvodjac<n2.proizvodjac){
            return -1;
          }
          return 0;
        });
        this.sprep=this.fprep.sort((n1,n2)=>{
          if(n1.proizvodjac>n2.proizvodjac){
            return 1;
          }
          if(n1.proizvodjac<n2.proizvodjac){
            return -1;
          }
          return 0;
        });
      }
      this.sort=true;

      break;
    case 'kolicina':
      this.sve=false;
      if(!this.filt){
        this.ssad=this.msadnice.sort((n1,n2)=>{
          if(n1.kolicina>n2.kolicina){
            return 1;
          }
          if(n1.kolicina<n2.kolicina){
            return -1;
          }
          return 0;
        });
        this.sprep=this.mpreparati.sort((n1,n2)=>{
          if(n1.kolicina>n2.kolicina){
            return 1;
          }
          if(n1.kolicina<n2.kolicina){
            return -1;
          }
          return 0;
        });
      }else{
        this.filt=false;
        this.ssad=this.fsad.sort((n1,n2)=>{
          if(n1.kolicina>n2.kolicina){
            return 1;
          }
          if(n1.kolicina<n2.kolicina){
            return -1;
          }
          return 0;
        });
        this.sprep=this.fprep.sort((n1,n2)=>{
          if(n1.kolicina>n2.kolicina){
            return 1;
          }
          if(n1.kolicina<n2.kolicina){
            return -1;
          }
          return 0;
        });
      }
      
      this.sort=true;

      break;
  }
}
sortirajPo() {
  this.sortiraj();

}
/*cuvanje podataka novih u bazi */
sacuvajUBazi() {
  this.servis.sacuvajUBazi(this.ras).subscribe((data)=> {
    if(data){
      this.servis.prikaziRasadnik(data);
      this.ras=this.servis.ucitajRasadnik();
      
      if(this.ras.temp<12 ||this.ras.voda<75){

        this.message=`Rasadnik ${this.ras.naziv} korisnika ${this.ras.korime} zahteva odrzavanje!`;
        this.posaljiEm();

      }else { 
        this.message='';

      }
      console.log(this.ras);
    }
  })
}
posaljiEm() {
  this.servis.posaljiEmail(this.ras).subscribe(data=>{
    alert('Email poslat korisniku!');
  })
}
sacuvajUBaziTimer() {
  this.servis.sacuvajUBaziTimer(this.ras).subscribe((data)=> {
    if(data){
      if(data==`Rasadnik ${this.ras.naziv} korisnika ${this.ras.korime} zahteva odrzavanje`) {
        this.posaljiEm();
        this.message=`Rasadnik ${this.ras.naziv} korisnika ${this.ras.korime} zahteva odrzavanje!`;

      }else {
        this.message='';

      }
      this.ras.temp-=0.5;
      this.ras.voda--;
      this.servis.prikaziRasadnik(this.ras)
 ;     this.ras=this.servis.ucitajRasadnik();
      console.log(this.ras);
    }
  })
}
/*pomocna ovde jer je subscribe za ucitavanje sadnica*/
ucitajSadnice(){
  this.servis.ucitajSadnice(this.ras.korime,this.ras.naziv).subscribe( data=>{
    if(data) {
      this.sadnica=data;
      //this.slobMesta();
      this.popuniPraznimSadnicama();

    }
  })
}
/*pomocna za popounjavanje  niza slob sadnica */
popuniPraznimSadnicama() {
  
  for (let i =0 ; i <this.ras.br_slobodnih_mesta; i++) {
      this.slobodna_mesta[i]=this.slob;
      this.inic(i)
  } 
}
/*inic polje u nizu*/
inic(ind:number){
  
 this.slobodna_mesta[ind].ime_sadnice='slobodno';
 this.slobodna_mesta[ind].progres=0;
 this.slobodna_mesta[ind].proizvodjac='/';
 this.slobodna_mesta[ind].s=true;
 this.slobodna_mesta[ind]._id=0;

}



/*pomocna za ucitavanje mag*/
ucitajMagacin() {
  this.servis.ucitajMagacin(this.ras.korime,this.ras.naziv).subscribe(data=>{
    if(data){
      this.magacin=data;
      this.dodeliVrMagacinu();
    }
  });
}
/*pomocna jer ovamo ne radi foreach u subscribe*/
dodeliVrMagacinu() {
  let is=0,ip=0;
  this.magacin.forEach(m=>{

    if(m.tip=='sadnica'){
      this.msadnice[is++]=m;
    }else if(m.tip){
      this.mpreparati[ip++]=m;
    }
  });
}
/*ucitavanje porudzbina za mag*/
ucitajPorudzbine() {
  this.servis.ucitajPorudzbine(this.ras.korime,this.ras.naziv).subscribe(data=>{
    if(data) {
      this.porudzbine=data;
      this.dodeliVrPorudzbinama();
      this.typeErr=true;
    }
  });
  


}
 /*pomocna za dodelu vrednosti porudzbinama*/
 dodeliVrPorudzbinama() {
  
  let is=0,ip=0;
  this.porudzbine.forEach((por,i)=>{
    this.porudzbine[i].proizv.forEach(p=>{
      if(p.tip=='sadnica'){
        this.psadnice[is]=p;
        this.psadnice[is].id_por=por.id_por;
        is++;

      }else if(p.tip){
        this.ppreparati[ip]=p;
        this.ppreparati[ip].id_por=por.id_por;
        ip++;
      }
    });
  });
} 
/*pomocna dijalog prozor*/
dijalogProzor(i:number) {
  
  if(this.slobodna_mesta[i].s){
  let res=confirm("Da li zelite da dodate novu sadnicu?");
  if(res==true) {
    this.ruter.navigate(['/magacin']);
  }}
}
/*za otkazivanje porudzbine sadnice*/
otkazis(i:number) {
  let sad=this.psadnice[i];

  let pr=this.porudzbine.filter(por=>
    (por.id_por==sad.id_por )
  )[0];
  let p=pr.proizv.filter(proi=>(proi.ime_sadnice==sad.ime_sadnice&& proi.proizvodjac==sad.proizvodjac ))[0];



  this.servis.otkazi(pr,p).subscribe(data=>{
    if(data) {
      alert(data);
      this.ruter.routeReuseStrategy.shouldReuseRoute = () => false;
      this.ruter.onSameUrlNavigation = 'reload';
      this.ruter.navigate(['/rasadnik']);
    }
  });
}
/*za otkazivanje porudzbine preparata*/
otkazip(i:number) {
  let prep=this.ppreparati[i];

  let pr=this.porudzbine.filter(por=>
    (por.id_por==prep.id_por))[0];
  let p=pr.proizv.filter(proi=>(proi.ime_sadnice==prep.ime_sadnice && proi.proizvodjac==prep.proizvodjac))[0]
  this.servis.otkazi(pr,p).subscribe(data=>{
    if(data) {
      alert(data);
      this.ruter.routeReuseStrategy.shouldReuseRoute = () => false;
      this.ruter.onSameUrlNavigation = 'reload';
      this.ruter.navigate(['/rasadnik']);
    }
  });
}
/*povecati progres sadnice*/
povecajProgres(i:number) {
  let sad=this.sadnica[i];

  this.servis.postaviSadZaProgres(sad);
  this.ruter.navigate(['/magacin']);
}

/*presadjivanje spremnih sadnica*/
presadi(sad:Sadnica) {
  this.servis.presadiSad(sad,this.ras.korime, this.ras.naziv).subscribe( data=>{
    if(data) {
      alert(data);
      this.smanjiBrSlobMesta();

    }
  });
}



/*kada presadim*/
smanjiBrSlobMesta() {
 
  this.servis.smanjiBrSlobMestaZaDan(this.ras._id).subscribe(data=>{
    if(data) {
      console.log(data);
      this.postaviTajmer();
      this.ruter.routeReuseStrategy.shouldReuseRoute = () => false;
      this.ruter.onSameUrlNavigation = 'reload';
      this.ruter.navigate(['/rasadnik']);
      

      console.log('proba!')
    }
  });

}
/*fja koju cu ugrdati u interval dad se posle jednog dana opet  oslobodi ovo mesto*/
povecajBrSlobMesta() {
  this.servis.povecajBrSlobMestaZaDan(this.ras._id).subscribe(data=>{
    if(data) {
      console.log(data);
      this.ucitajSadnice()
      this.ruter.routeReuseStrategy.shouldReuseRoute = () => false;
      this.ruter.onSameUrlNavigation = 'reload';
      this.ruter.navigate(['/rasadnik']);
    }
  });
}


/*prebacivanje na online prodavnicu*/
poruci(){
    this.ruter.navigate(['/agroonline']);
}


/*postavi tajmer za sadnicu kad se izvadi pa treba da prodje dan*/
postaviTajmer() {
  let dan=1000*60*60*24;
  let b=timer(dan);
  b.subscribe(x=>{
    this.povecajBrSlobMesta();
  })
}

satVrTajmer() {
  let sat=1000*60*60;
  let bl=interval(sat);
  this.subs=bl.subscribe(x=> {
    console.log('proslo sat vremena')
    this.sacuvajUBaziTimer();
  })
}

  /*izloguj se */
  odjavljivanje() {
    this.ruter.navigate(['/prijava']);
  }


/*natrag*/ 
natrag() {
  this.ruter.navigate(['/poljoprivrednik']);
}
}
