import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjekatService } from '../projekat.service';
import { Rasadnik } from '../interfejsi/rasadnik';

@Component({
  selector: 'app-poljoprivrednik',
  templateUrl: './poljoprivrednik.component.html',
  styleUrls: ['./poljoprivrednik.component.css']
})
export class PoljoprivrednikComponent implements OnInit {

  constructor(private ruter:Router,private servis:ProjekatService) { 
    this.korime= JSON.parse(localStorage.getItem('loggedUser'));
    this.servis.ucitajRasadnike(this.korime).subscribe(doc=>{
        if(doc) {
          this.rasadnici=doc;
        }else {
          console.log('nema rasadnika!');
        }
    })
    this.promLoz=false;
  }

  ngOnInit(): void {
  }
  /*polja*/
  formaRas:boolean=false;
  korime:string;

  promLoz:boolean;
  slozinka:string;
  nlozinka:string;
  pnlozinka:string;

  rasadnik:Rasadnik= {
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

  rasadnici:Rasadnik[]=[]

  /*izabran rasadnik*/
  izaberiRasadnik(ras:Rasadnik) {
    this.servis.prikaziRasadnik(ras)
    this.ruter.navigate(['/rasadnik']);
  }
/*brisanje rasadnika*/
izbrisiRasadnik(ras:Rasadnik){
  this.servis.obrisiRasadnik(ras).subscribe(data=>{
    if(data){
      console.log(data);
      alert('izbrisano!');
      this.ruter.routeReuseStrategy.shouldReuseRoute = () => false;
      this.ruter.onSameUrlNavigation = 'reload';
      this.ruter.navigate(['/poljoprivrednik']);

    }
  })
}

  /*dodavanje rasadnika*/
  formaR() {
    this.formaRas=true;
    this.promLoz=false;
  }
  /*dodavanje rasadnika*/
  dodajRasadnik() {
    this.rasadnik.korime=this.korime;
    this.rasadnik.br_slobodnih_mesta=this.rasadnik.duzina*this.rasadnik.sirina;
    this.rasadnik.br_sadnica=0;
    this.servis.dodajRasadnik(this.rasadnik).subscribe(data=>{
      if(data){
        this.formaRas=false;
        console.log(data);
        this.ruter.routeReuseStrategy.shouldReuseRoute = () => false;
        this.ruter.onSameUrlNavigation = 'reload';
        this.ruter.navigate(['/poljoprivrednik']);
      }
    });
  }
    /*izloguj se */
    odjavljivanje() {
      this.ruter.navigate(['/prijava']);
    }
    /*za formu loz*/
    pLoz() {
      this.formaRas=false;
      this.promLoz=true; 

    }
    /*natrag*/

    natrag() {
      this.formaRas=false; this.promLoz=false;
    }
    /*promena lozinke*/ 
    promeniLozinku() {
      if(this.pnlozinka!=this.nlozinka) {
        alert('lozinke se ne poklapaju');
      }else{
        this.servis.promeniLozinkuPolj(this.korime,this.slozinka,this.nlozinka).subscribe(data=>{
          if(data) {
            alert(data);
            this.promLoz=false;
            this.slozinka='';
            this.nlozinka='';
            this.pnlozinka='';
          }
        });
      }
    }
}
