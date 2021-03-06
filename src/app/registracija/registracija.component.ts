import { Component, OnInit } from '@angular/core';
import { ProjekatService } from '../projekat.service';
import { Poljoprivrednik } from '../interfejsi/poljoprivrednik';
import { Preduzece } from '../interfejsi/preduzece';
import { Router } from '@angular/router';
import { PoljoprivrednikComponent } from '../poljoprivrednik/poljoprivrednik.component';

@Component({
  selector: 'app-registracija',
  templateUrl: './registracija.component.html',
  styleUrls: ['./registracija.component.css']
})
export class RegistracijaComponent implements OnInit {

  constructor(private servis: ProjekatService, private ruter:Router) { }

  ngOnInit(): void {
    this.polj={
     ime:"", 
    prezime:"",
    korime: "",
    lozinka: "",
    dat_rodj: "",
    mesto_rodj: "",
    telefon: "",
    email: "",
    };
    this.pred={
      naziv:"",
      skr: "",
      lozinka:"",
      datum_osn:"",
      mesto:"",
      email:"",
      kurir:0
    };
    this.plozinka='';
  }
  
  poljoprivrednik: string;
  preduzece: string;
  message: string[]=[];
  polj: Poljoprivrednik;
  plozinka:string;
  pred: Preduzece;
  email_validate=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  password_validate=/^(.{0,6}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*)$/;
  date_validate=/^\d{1,2}\.\d{1,2}\.\d{4}\.$/;
  number_validate=/^$/;
  

  regPolj() {
    
       this.poljoprivrednik='da';
       this.preduzece=null;
       this.message=[];
  }
  regPred() {
    this.poljoprivrednik=null;
    this.preduzece='da';
    this.message=[];
  }

    

  registracijaPolj() { /*treba jos izmena*/
    if(this.polj.ime==''){
      for(let i=0;i<9;i++){
        if(i!=0)
          this.message[i]='';
      }
      this.message[0]='polje je obavezno!';
    }else if(this.polj.prezime==''){
      for(let i=0;i<9;i++){
        if(i!=1)
          this.message[i]='';
      }
        this.message[1]='polje je obavezno!';
    }else if(this.polj.korime=='' ){
      for(let i=0;i<9;i++){
        if(i!=2)
          this.message[i]='';
      }
      this.message[2]='polje je obavezno!';
    }else if(this.polj.lozinka=='' ){
      for(let i=0;i<9;i++){
        if(i!=3)
          this.message[i]='';
      }
      this.message[3]='polje je obavezno!';
    }else if(this.plozinka!=this.polj.lozinka ){
      for(let i=0;i<9;i++){
        if(i!=4)
          this.message[i]='';
      }
      this.message[4]='lozinke se moraju poklapati!';
    }else if(this.polj.dat_rodj==''){
      for(let i=0;i<9;i++){
        if(i!=5)
          this.message[i]='';
      }
      this.message[5]='polje je obavezno!';
    }else if(this.polj.mesto_rodj==''){
      for(let i=0;i<9;i++){
        if(i!=6)
          this.message[i]='';
      }
      this.message[6]='polje je obavezno!';
    }else if(this.polj.telefon==''){
      for(let i=0;i<9;i++){
        if(i!=7)
          this.message[i]='';
      }
      this.message[7]='polje je obavezno!';
    }else if( this.polj.email==''){
      for(let i=0;i<9;i++){
        if(i!=8)
          this.message[i]='';
      }
      this.message[8]='polje je obavezno!';
    }else if(!this.email_validate.test(this.polj.email)){
        this.message[8]='email ne odgovara standardu!';

    }else if(this.password_validate.test(this.polj.lozinka)){
      this.message[3]='lozinka ne odgovara standardu!';
    }else{
      this.servis.registacijaPolj(this.polj, this.plozinka).subscribe((doc:any)=> {
        if(doc=='korime zauzeto'|| doc=='email zauzet') {
            alert(doc);
            this.ruter.navigate(['/registracija']);
        }else {
          alert('Uspesno poslat zahtev za registraciju!');
          this.ruter.routeReuseStrategy.shouldReuseRoute = () => false;
          this.ruter.onSameUrlNavigation = 'reload';
          this.ruter.navigate(['/registracija']);
        }
      });
    }
  }
  

  registracijaPred() { /*treba jos izmena*/
    if(this.pred.naziv==''){
      for(let i=0;i<7;i++){
        if(i!=0)
          this.message[i]='';
      }
      this.message[0]='polje je obavezno!';
    }else if(this.pred.skr==''){
        for(let i=0;i<7;i++){
          if(i!=2)
            this.message[i]='';
        }
        this.message[2]='polje je obavezno!';
    }else if(this.pred.lozinka==''){
      for(let i=0;i<7;i++){
        if(i!=3)
          this.message[i]='';
      }
      this.message[3]='polje je obavezno!';
    }else if(this.plozinka!=this.pred.lozinka ){
      for(let i=0;i<7;i++){
        if(i!=4)
          this.message[i]='';
      }
      this.message[4]='lozinke se moraju poklapati!';
      
    }else if(this.pred.datum_osn==''){
      for(let i=0;i<7;i++){
        if(i!=5)
          this.message[i]='';
      }
      this.message[5]='polje je obavezno!';
    }else if(this.pred.mesto==''){
      for(let i=0;i<7;i++){
        if(i!=6)
          this.message[i]='';
      }
      this.message[6]='polje je obavezno!';
    }else if(this.pred.email=='') {
      for(let i=0;i<7;i++){
        if(i!=8)
          this.message[i]='';
      }
      this.message[8]='polje je obavezno!';
    }else if(!this.email_validate.test(this.pred.email)){
      this.message[8]='email ne odgovara standardu!';

    }else if(this.password_validate.test(this.pred.lozinka)){
      this.message[3]='lozinka ne odgovara standardu!';
    }else {
      this.servis.registracijaPred(this.pred,this.plozinka).subscribe((doc:any)=> {
        if(doc=='akronim zauzet'|| doc=='email zauzet') {
          alert(doc);
          this.ruter.navigate(['/registracija']);
      }else {
        alert('Uspesno poslat zahtev za registraciju!');
        this.ruter.routeReuseStrategy.shouldReuseRoute = () => false;
        this.ruter.onSameUrlNavigation = 'reload';
        this.ruter.navigate(['/registracija']);
      }
    
      });
    }
  }
  recaptcha:any[];
  /*RECAPTCHA*/
  resolved (captchaRes :any[]) {
    this.recaptcha=captchaRes;
    
  }
  
}
