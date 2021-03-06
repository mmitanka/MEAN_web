import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjekatService } from '../projekat.service';
import { Preduzece } from '../interfejsi/preduzece';
import { Porudzbina } from '../interfejsi/porudzbina';
import { Proizvod } from '../interfejsi/priozvod';
import { MSadnica } from '../interfejsi/msadnica';
import { Preparat } from '../interfejsi/preparat';
import { ProizvodPor } from '../interfejsi/proizvodpor';
import { timer } from 'rxjs';




@Component({
  selector: 'app-preduzece',
  templateUrl: './preduzece.component.html',
  styleUrls: ['./preduzece.component.css'],
  template: `
  
`
})
export class PreduzeceComponent implements OnInit {

  constructor(private ruter:Router, private servis:ProjekatService) { 
    this.pred=this.servis.dohvatiLogPred();
    this.sedistePred();
    //proveri
    if(localStorage.getItem('noveporudzbine')==null){
      this.ucitajPorudzbine(); 

    }else {
      this.propor= JSON.parse(localStorage.getItem('noveporudzbine'));
      this.messages= JSON.parse(localStorage.getItem('poruke'))
      this.porudzbine=JSON.parse(localStorage.getItem('samoporudz'))
    }

    this.ucitajProizv();
    //vrv ne treba 
   /* if(this.proZamena) {
      let index= this.propor.indexOf(this.proZamena)
      let zamena=this.propor[0];
      this.propor.splice(0,1,this.proZamena);
      this.propor.splice(index,1,zamena)
      this.rel=false; this.dis=true;
    }*/
  
  }
  

  ngOnInit(): void {
  }
  /*polja*/
  typeErrPo:boolean=false;
  typeErrPr:boolean=false;

  pred:string;

  propor:ProizvodPor[]=[];

  porudzbine:Porudzbina[]=[];
  proizvodi:Proizvod[]=[];
  sadnice:MSadnica[]=[];
  preparati:Preparat[]=[];

  promLoz:boolean;
  slozinka:string;
  nlozinka:string;
  pnlozinka:string;

  mestoPreduzeca;
  geoSirinaP:number;
  geoDuzinaP:number;

  mestoRasadnika="";
  geoSirinaR:number;
  geoDuzinaR:number;
  vremePutovanja:number;

  messages:string[]=[];

  rel:boolean=true;
  dis:boolean=false;

  proZamena:ProizvodPor;

  /*pronalazenje mesta ucitanog preduzeca*/
  sedistePred() {
    this.servis.mestoPreduzeca(this.pred).subscribe(data=>{
      if(data) {
        this.mestoPreduzeca=data;
        console.log(this.mestoPreduzeca);
        this.pronadjiKoordPred();
      }
    });
  }

  /*dohvatiti porudzbine iz baze*/ 
  ucitajPorudzbine() {
    this.servis.ucitajPorudzbineZaPreduzece(this.pred).subscribe(data=> {
      if(data) {
        console.log(this.pred)
        this.porudzbine=data; 

        this.izbaciProizvode();

        this.dodeliVrPom();

        this.typeErrPo=true;
      }
    });
  }
/*pomocna za izbacivanje prozivoda koji nisu od datog pred*/
  izbaciProizvode() {
    let b=0;
    this.porudzbine.forEach((por,i)=>{
      let br=0,index=0;
      this.porudzbine[i].proizv.forEach((proiz,ind)=>{
          if(this.porudzbine[i].proizv[ind].proizvodjac!=this.pred) {
             br++; if(br==1)  {index=ind;}
          }
      });
      this.porudzbine[i].proizv.splice(index,br);
    });
    this.izbaciPor()

  }

  izbaciPor() {

    this.porudzbine.forEach((el,i)=>{
      if(el.proizv.length==0){
        this.porudzbine.splice(i,1);
      }
    });
  }

/*ovo zbog prikaza na frontu*/ 
  dodeliVrPom(){
    let b=0;
    this.porudzbine.forEach((el,i)=>{
      this.porudzbine[i].proizv.forEach(p=>{
        this.propor[b]=p;
        this.propor[b].korime=el.korime;
        this.propor[b].rasadnik=el.rasadnik;
        this.propor[b].datum=el.datum;
        this.propor[b++].id_por=el.id_por;
        this.messages.push("");


      });
    });
  }

 /*ucitati proizv ovog preduzeca*/
 ucitajProizv() {
  this.servis.ucitajProizvode(this.pred).subscribe(data=>{
    if(data) {
      this.proizvodi=data;
      this.dodeliVr();
      this.typeErrPr=true;
    }
  });
 }
  /*pomocna da popunimo nizove za sadnice i preparate*/ 
  dodeliVr() {
    let is=0, ip=0;
    this.proizvodi.forEach(m=>{

      if(m.tip=='sadnica'){
        this.sadnice[is++]=m;
      }else {
        this.preparati[ip++]=m;
      }
    });
  }
  
  /*vodi na web str sadnice*/
  sadnica(sad:MSadnica) {
   this.servis.postaviSadZaWeb(sad);
   this.ruter.navigate(['/webstranasad']);

  }

  /*vodi na web str preparata*/
  preparat(prep:Preparat){
    this.servis.postaviPrepZaWeb(prep);

   this.ruter.navigate(['/webstranaprep']);

  }


  /*obijanje porudzbine mora da brise iz baze*/ 
  odbij(p:ProizvodPor){
    let por = this.porudzbine.filter(el=>(p.id_por==el.id_por))[0];
    this.servis.odbijPor(por,p).subscribe(data=>{
      if(data) {
        console.log(data);
        this.ruter.routeReuseStrategy.shouldReuseRoute = () => false;
        this.ruter.onSameUrlNavigation = 'reload';
        this.ruter.navigate(['/preduzece']);

      }
    })
  }

  /*povuci proizvod iz prodaje-prod*/
  povuciSadnicu(sad:MSadnica) {
    this.servis.povuciIzProdaje(sad._id).subscribe(data=>{
      if(data) {
        console.log(data);
        this.ruter.routeReuseStrategy.shouldReuseRoute = () => false;
        this.ruter.onSameUrlNavigation = 'reload';
        this.ruter.navigate(['/preduzece']);
      }
    })
  }
  /*povuci preparat */
  povuciPreparat(prep:Preparat) {
    this.servis.povuciIzProdaje(prep._id).subscribe(data=>{
      if(data) {
        console.log(data);
        this.ruter.routeReuseStrategy.shouldReuseRoute = () => false;
        this.ruter.onSameUrlNavigation = 'reload';
        this.ruter.navigate(['/preduzece']);
      }
    });
  }

  /*pre prihvatanja proveri broj :NIJE PROVERENO ZA OVO MENJANJE */
  proveraBrojKurira(p:ProizvodPor) {
    let index= this.propor.indexOf(p)
    let por = this.porudzbine.filter(el=>(p.id_por==el.id_por))[0];
    this.servis.proveriBrojKurira(this.pred).subscribe(data=>{
      if(data ==='NA CEKANJU') {
        console.log(data)
        this.messages[index]="NA CEKANJU";
        let stara_prva=this.messages[0];
        this.messages[0]=this.messages[index];
        this.messages[index]=stara_prva;
        let zamena=this.propor[0];
        this.propor.splice(0,1,p);
        this.propor.splice(index,1,zamena)

        localStorage.setItem('poruke', JSON.stringify(this.messages))
        localStorage.setItem('samoporudz', JSON.stringify(this.porudzbine))
        localStorage.setItem('noveporudzbine', JSON.stringify(this.propor))
        this.ruter.routeReuseStrategy.shouldReuseRoute = () => false;
        this.ruter.onSameUrlNavigation = 'reload';
        this.ruter.navigate(['/preduzece']);

      }else if(data=='MOZE'){
        console.log(data);
        if(this.messages[0]=="NA CEKANJU"){
          localStorage.removeItem('noveporudzbine')
          localStorage.removeItem('poruke');
        }
        this.prihvatiPorudzbinu(por,p);
      }
    });
  }
  /*zove stvarno prihvatanje porudzbine*/
  prihvatiPorudzbinu(por:Porudzbina,p:ProizvodPor) {
    this.servis.prihvatiPorudzbinu(por,p,this.pred).subscribe(data=>{
      if(data) {
        this.mestoRas(por.korime,por.rasadnik);
      }
    });
  }

 /*dobijanje mesta rasadnika*/
 mestoRas(korime:string, naziv:string) {
   this.servis.vratiMestoRasadnika(korime, naziv).subscribe(data=>{
    if(data) {
      this.mestoRasadnika=data;
      this.pronadjiKoordRas();
    }
   });
 }
  /*gs i gd za odr grad*/
  pronadjiKoordRas() {
    
    this.servis.pronadjiKoordGrada(this.mestoRasadnika).subscribe(data=>{
      if(data) {
        this.geoSirinaR=data.Response.View[0].Result[0].Location.NavigationPosition[0].Latitude;
        this.geoDuzinaR=data.Response.View[0].Result[0].Location.NavigationPosition[0].Longitude;
        this.trajanjeDostave();

      }
    });
  }

  /*za preduzece gs i gd*/
  pronadjiKoordPred() {
    this.servis.pronadjiKoordGrada(this.mestoPreduzeca).subscribe(data=>{
      if(data) {
        this.geoSirinaP=data.Response.View[0].Result[0].Location.NavigationPosition[0].Latitude;
        this.geoDuzinaP=data.Response.View[0].Result[0].Location.NavigationPosition[0].Longitude;
      }
    });
  }

  /*da izracunamo koliko vremenski treba kuriru da ode i da se vrati*/
  trajanjeDostave() {
    this.servis.izracunajPotrebnoVreme(this.geoSirinaP,this.geoDuzinaP,this.geoSirinaR, this.geoDuzinaR).subscribe(data=>{
      if(data) {
        this.vremePutovanja=data.response.route[0].summary.travelTime;
        console.log(this.vremePutovanja);

        this.postaviTajmer();
        this.ruter.routeReuseStrategy.shouldReuseRoute = () => false;
        this.ruter.onSameUrlNavigation = 'reload';
        this.ruter.navigate(['/preduzece']);

      }
    });
  }

  /*vrati kurira sa dostave*/
  vratiKurira(){
    this.servis.vratiKurira(this.pred).subscribe(data=>{
      if(data) {
        console.log(data);
        alert(`broj kurira je sada ${data}`)
      }
    });
  }
  /*za vracanje kurira*/
postaviTajmer() {
  let bl=timer(1000*60);
  bl.subscribe(x=>{
    this.vratiKurira();
  });

}
steps() {
  this.ruter.navigate(['/stepper']);
}

barChart() {
  this.ruter.navigate(['/bar-chart']);
}

  /*izloguj se DODAJ DA SE BRISE IZ LOCALSTORAGE logovani */
  odjavljivanje() {
    localStorage.removeItem('noveporudzbine');
    localStorage.removeItem('poruke')
    localStorage.removeItem('samoporudz')
    localStorage.removeItem('loggedPred');
    this.ruter.navigate(['/prijava']);
  }
/*prom lozinka forma*/
pLoz() {
  this.typeErrPo=false;
  this.typeErrPr=false;
  this.rel=false;
  this.dis=false;
  this.promLoz=true;

}
  /*promeni lozinku */
  promeniLozinku() {
    if(this.pnlozinka!=this.nlozinka) {
      alert('lozinke se ne poklapaju');
    }else{
      this.servis.promeniLozPred(this.pred,this.slozinka,this.nlozinka).subscribe(data=>{
        if(data) {
          alert(data);
          this.promLoz=false;
          this.slozinka='';
          this.nlozinka='';
          this.pnlozinka='';
     
          localStorage.removeItem('noveporudzbine');
         
          localStorage.removeItem('loggedPred');

          this.ruter.navigate(['/prijava']);
        }
      });
    }
  }


  /*sortiranje po datumu */ 
  sortiraj() {
    let pomocni=this.propor;
    this.propor=pomocni.sort((n1,n2)=>{
      if(n1.datum>n2.datum) {
        return 1;
      }
      if(n1.datum<n2.datum) {
        return -1;
      }
      return 0;
    })
    if(this.dis) {
      this.dis=false; this.rel=true;

    }else {
      this.dis=true; this.rel=false;

    }
  }
}
