import { Component, OnInit } from '@angular/core';
import { Poljoprivrednik } from '../interfejsi/poljoprivrednik';
import { Preduzece } from '../interfejsi/preduzece';
import { ProjekatService } from '../projekat.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private servis:ProjekatService, private ruter:Router) {
    for(let i=0;i<8;i++) {
      this.message.push()
    }
   }

  ngOnInit(): void {
     
  }
  /*polja*/
  poljoprivrednik:Poljoprivrednik[]=[];
  preduzece: Preduzece[]=[]; 
  polj:Poljoprivrednik={
    ime:"", 
    prezime:"",
    korime: "",
    lozinka: "",
    dat_rodj: "",
    mesto_rodj: "",
    telefon: "",
    email: ""
  };

  pred:Preduzece={
    naziv:"",
    skr: "",
    lozinka:"",
    datum_osn:"",
    mesto:"",
    email:"",
    kurir:0
  };

  message:string[]=[];


  prikaziPolj:boolean=false;
  prikaziPred:boolean=false;
  prikaziKorPr:boolean=false;
  prikaziKorPo:boolean=false;
  azPo: boolean=false;
  azPr:boolean=false;
  dodKor:boolean=false;
  dodPo:boolean=false;
  dodPr:boolean=false;
  password_validate=/^(.{0,6}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*)$/;


/*proste metode za dugmice*/
  prikaziZahtevePolj(){
    this.prikaziPolj=true;
    this.prikaziPred=false;
    this.prikaziKorPr=false;
    this.prikaziKorPo=false;
    this.azPr=false;
    this.azPo=false;
    this.dodPo=false;
    this.dodPr=false;
    this.dodKor=false;
    this.ucitajPodatke();

  }
  prikaziZahtevePred(){
    this.prikaziPred=true;
    this.prikaziPolj=false;
    this.prikaziKorPr=false;
    this.prikaziKorPo=false;
    this.azPr=false;
    this.azPo=false;
    this.dodPo=false;
    this.dodPr=false;
    this.dodKor=false;
    this.ucitajPodatke();

  }
  prikaziKorisnikePr() {
    this.prikaziKorPr=true;
    this.prikaziKorPo=false;
    this.prikaziPred=false;
    this.prikaziPolj=false;
    this.azPr=false;
    this.azPo=false;
    this.dodPo=false;
    this.dodPr=false;
    this.dodKor=false;
    this.ucitajPodatke();

  }
  prikaziKorisnikePo() {
    this.prikaziKorPr=false;
    this.prikaziKorPo=true;
    this.prikaziPred=false;
    this.prikaziPolj=false;
    this.azPr=false;
    this.azPo=false;
    this.dodPo=false;
    this.dodPr=false;
    this.dodKor=false;
    this.ucitajPodatke();

  }
  dodajKor(){
    this.dodKor=true;
    this.prikaziKorPr=false;
    this.prikaziKorPo=false;
    this.prikaziPred=false;
    this.prikaziPolj=false;
    this.azPr=false;
    this.azPo=false;
    this.dodPo=false;
    this.dodPr=false;
    
  }
  azPolj(polj:Poljoprivrednik){
    this.polj.ime=polj.ime;
    this.polj.prezime=polj.prezime;
    this.polj.korime=polj.korime;
    this.polj.lozinka=polj.lozinka;
    this.polj.dat_rodj=polj.dat_rodj;
    this.polj.mesto_rodj=polj.mesto_rodj;
    this.polj.telefon=polj.telefon;
    this.polj.email=polj.email;
    this.azPo=true;
    this.azPr=false;
    this.dodPo=false;
    this.dodPr=false;
    this.dodKor=false;
    this.prikaziPolj=false;
    this.prikaziPred=false;
    this.prikaziKorPr=false;
    this.prikaziKorPo=false;
  }
  azPred(pred:Preduzece){
    this.pred.skr=pred.skr;
    this.pred.datum_osn=pred.datum_osn;
    this.pred.email=pred.email;
    this.pred.lozinka=pred.lozinka;
    this.pred.naziv=pred.naziv;
    this.pred.mesto=pred.mesto;
    this.azPr=true;
    this.azPo=false;
    this.dodPo=false;
    this.dodPr=false;
    this.dodKor=false;
    this.prikaziPolj=false;
    this.prikaziPred=false;
    this.prikaziKorPr=false;
    this.prikaziKorPo=false;
    
  }
  formaPolj(){
    this.polj.lozinka='';this.polj.korime='';
    this.polj.ime='';this.polj.dat_rodj='';
    this.polj.email=''; this.polj.mesto_rodj='';
    this.polj.telefon='';this.polj.prezime='';
    this.dodKor=false;
    this.dodPo=true;
    this.dodPr=false;
    this.azPr=false;
    this.azPo=false;
    this.prikaziPolj=false;
    this.prikaziPred=false;
    this.prikaziKorPr=false;
    this.prikaziKorPo=false;
    
  }
  formaPred(){ 
    this.pred.email=''; this.pred.kurir=0;
    this.pred.lozinka=''; this.pred.datum_osn='';
    this.pred.naziv=''; this.pred.skr='';
    this.pred.mesto='';
    this.dodKor=false;
    this.dodPo=false;
    this.dodPr=true;
    this.azPr=false;
    this.azPo=false;
    this.prikaziPolj=false;
    this.prikaziPred=false;
    this.prikaziKorPr=false;
    this.prikaziKorPo=false;
 
  }
/*metode koje zovu servis*/
  ucitajPodatke() {
    if(this.prikaziPolj) {
      this.servis.ucitajBazu('zpolj').subscribe(data=>{
        this.poljoprivrednik=data; 
        console.log('ucitano');   
      });
    }else if(this.prikaziPred){
      this.servis.ucitajBazu('zpred').subscribe(data=>{
        this.preduzece=data;
        console.log('ucitano');
      });
    }else if(this.prikaziKorPr){
      this.servis.ucitajBazu('lpred').subscribe(data=>{
        this.preduzece=data;
        console.log('ucitano');
      });
    }else if(this.prikaziKorPo){
      this.servis.ucitajBazu('lpolj').subscribe(data=>{
        this.poljoprivrednik=data;
        console.log('ucitano');
      });
    }
  }

/*prihvatanje zahteva polj*/
  prihvatiZahtevPolj(korime:string) {
    //alert(korime);
    this.servis.prihvatanjeZahtevaPolj(korime).subscribe(data=>{
      console.log(data);
      alert('zahtev prihvacen!');
      this.prikaziZahtevePolj();
      
    });
    
  }
/*prihvatanje zahteva pred*/

  prihvatiZahtevPred(skr:string) {
    this.servis.prihvatanjeZahtevaPred(skr).subscribe(data=>{
      console.log(data);
      alert('zahtev prihvacen!');
      this.prikaziZahtevePred();
      
    });

  }

/*odbijanje zahteva polj*/

  odbijZahtevPolj(korime:string) {
    this.servis.odbijanjeZahtevaPolj(korime).subscribe(data=>{
      console.log(data);
      alert('zahtev odbijen!');
      this.prikaziZahtevePolj();
    });
  }
/*odbijanje zahteva pred*/

  odbijZahtevPred(skr:string) {
    this.servis.odbijanjeZahtevaPred(skr).subscribe(data=>{
      console.log(data);
      alert('zahtev odbijen!');
   
      this.prikaziZahtevePred();

    });
  }

/*azuriranje polj*/
  azurirajPolj() {
    
      if(this.password_validate.test(this.polj.lozinka)) {
        alert('lozinka ne odgovara standardu!!')
      }else {
        this.servis.azuriranjePolj(this.polj).subscribe(data=>{
          alert(data);
          console.log(data);
          this.prikaziKorisnikePo();
  
        });
      }

    
  } 
  
 /*azuriranje pred*/
  azurirajPred() {
    if(this.password_validate.test(this.polj.lozinka)) {
    alert('lozinka ne odgovara standardu!!')
    }else {
    this.servis.azuriranjePred(this.pred).subscribe(data=>{
      alert(data);
      console.log(data);
      this.prikaziKorisnikePr();

    });}
  } 
/*brisanje polj*/
  izbrisiPolj(korime:string) {
    this.servis.izbrisiPolj(korime).subscribe(data=>{
      alert('izbrisano');
      console.log(data);
      this.prikaziKorisnikePo();

    });
  }  
/*brisanje pred*/
  izbrisiPred(skr:string) {
    this.servis.izbrisiPred(skr).subscribe(data=>{
      alert('izbrisano');
      console.log(data);
      this.prikaziKorisnikePr();

    });
  } 
/*dodavanje pred*/
  dodajPreduzece() {
    if(this.pred.naziv==''){
      for(let i=0;i<8;i++){
        if(i!=0) this.message[i]='';
      }
        this.message[0]='polje je obavezno!';}

        else  if(this.pred.skr==''){
          for(let i=0;i<8;i++){
            if(i!=2) this.message[i]='';
          }
          this.message[2]='polje je obavezno!';
        }
        else if(this.pred.lozinka==''){
          for(let i=0;i<8;i++){
            if(i!=3) this.message[i]='';
          }
          this.message[3]='polje je obavezno!';
        }
        else if(this.pred.datum_osn==''){
          for(let i=0;i<8;i++){
             if(i!=4) this.message[i]='';
          }
        this.message[4]='polje je obavezno!';
    }else if(this.pred.mesto==''){
      for(let i=0;i<8;i++){
        if(i!=5) this.message[i]='';
      }
      this.message[5]='polje je obavezno!';
    }
    else if(this.pred.email==''){
      for(let i=0;i<8;i++){
        if(i!=7) this.message[i]='';
      }
      this.message[7]='polje je obavezno!';
    }else {
      this.servis.dodajPred(this.pred).subscribe(data=>{
        alert(data);
        console.log(data);
      });
    }
  } 
 /*dodavanje polj*/ 
  dodajPolj() {
    
    if(this.polj.ime==''){
      for(let i=0;i<8;i++){
        if(i!=0) this.message[i]='';
      }
        this.message[0]='polje je obavezno!';
    }else if(this.polj.prezime==''){
      for(let i=0;i<8;i++){
        if(i!=1) this.message[i]='';
      }
      this.message[1]='polje je obavezno!';
    }else if(this.polj.korime==''){
      for(let i=0;i<8;i++){
        if(i!=2) this.message[i]='';
      }
      this.message[2]='polje je obavezno!';
    }
    else if(this.polj.lozinka==''){
      for(let i=0;i<8;i++){
        if(i!=3) this.message[i]='';
      }
      this.message[3]='polje je obavezno!';
    }
   else if(this.polj.dat_rodj==''){
      for(let i=0;i<8;i++){
        if(i!=4) this.message[i]='';
      }
      this.message[4]='polje je obavezno!';
    }else if(this.polj.mesto_rodj==''){
      for(let i=0;i<8;i++){
        if(i!=5) this.message[i]='';
      }
      this.message[5]='polje je obavezno!';
    }
    else if(this.polj.telefon==''){
      for(let i=0;i<8;i++){
        if(i!=6) this.message[i]='';
      }
      this.message[6]='polje je obavezno!';
    }else if(this.polj.email==''){
      for(let i=0;i<8;i++){
        if(i!=7) this.message[i]='';
      }
      this.message[7]='polje je obavezno!';
    }else {
      this.servis.dodajPolj(this.polj).subscribe(data=>{
        for(let i =0;i<8;i++) {
          this.message[i]="";
        }
        alert(data);
          console.log(data);
      });
    }
  }  
  
  

  /*izloguj se */
  odjavljivanje() {
    this.ruter.navigate(['/prijava']);
  }
}
