import { Component, OnInit } from '@angular/core';
import { Proizvod } from '../interfejsi/priozvod';
import { Router } from '@angular/router';
import { ProjekatService } from '../projekat.service';


@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css']
})
export class StepperComponent implements OnInit {


  constructor(private ruter:Router, private servis:ProjekatService) { }



  ngOnInit(): void {

  }
  proizvod:Proizvod={
    ime_sadnice:'',
    proizvodjac:'',
    ocena:0,
    kolicina:0,
    tip:'',
    ubrzanje:0,
    _id:0
  }
  cena:number;
  ime:boolean=true;
  pr:boolean=false;
  kol:boolean=false;
  tipp:boolean=false;
  ccena:boolean=false;

  proizv() {
    this.ime=false;;
    this.pr=true;
    this.kol=false;
    this.tipp=false;
    this.ccena=false;
  }
  kolic() {
    this.ccena=false;
    this.ime=false;;
    this.pr=false;
    this.kol=true;
    this.tipp=false;
  }
  ttip() {
    this.ime=false;;
    this.pr=false;
    this.kol=false;
    this.tipp=true;
    this.ccena=false;

  }
  cenaa() {
    this.ime=false;;
    this.pr=false;
    this.kol=false;
    this.tipp=false;
    this.ccena=true;
  }


  potvrdi() {
    console.log(this.cena);
    console.log(this.proizvod)
    this.servis.dodajProizvod(this.proizvod).subscribe(data=>{
      if(data) {
        console.log(data)
        this.ruter.navigate(['/preduzece'])
      }
    });
  }
 natrag() {
   this.ruter.navigate(['/preduzece']);
 }

}
