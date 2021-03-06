import { Component, OnInit } from '@angular/core';
import { ProjekatService } from '../projekat.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prijava',
  templateUrl: './prijava.component.html',
  styleUrls: ['./prijava.component.css']
})
export class PrijavaComponent implements OnInit {

  constructor(private servis:ProjekatService, private ruter:Router) { 

  }

  ngOnInit(): void {
    
  }

  lozinka: string;
  korime:string;
  
  prijava() {
    this.servis.prijavljivanje(this.korime,this.lozinka).subscribe((doc:any) => {
      if(doc=="polj") {
        this.servis.ucitajLogPolj(this.korime);
        console.log(doc);
        this.ruter.navigate(['/poljoprivrednik']);
      }else if(doc=="pred") {
        console.log(doc);
        this.servis.ucitajLogPred(this.korime);
        this.ruter.navigate(['/preduzece']);
      } else if(doc=="admin") {
        console.log(doc);
        this.ruter.navigate(['/admin']);
      }else if(doc=='pogresni kredencijali'){
        alert('pogresni kredencijali!');
        console.log('pogr kred');
        this.ruter.navigate(['/prijava']);
      }
    });
  }
}
