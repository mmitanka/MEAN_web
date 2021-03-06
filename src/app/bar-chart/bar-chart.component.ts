import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { ProjekatService } from '../projekat.service';
import {Chart} from 'chart.js'


@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {


  constructor(private ruter:Router, private servis:ProjekatService) { 
    this.pred=this.servis.dohvatiLogPred();

  }

  ngOnInit(): void {
    this.BarChart = new Chart('barChart', {
      type: 'bar',
    data: {
 
     datasets: [{
         label: 'Po danu',
     }]
    }, 
    options: {
     title:{
         text:"Poslovanje u prethodnih mesec dana",
         display:true
     },
     scales: {
         yAxes: [{
             ticks: {
                 beginAtZero:true
             }
         }]
     }
    }
    });

    this.popuniPodatke()
  }

  pred:string;
  BarChart:Chart;


  popuniPodatke() {

    this.servis.porudzbinePoDanu(this.pred).subscribe(data=>{
      if(data) {

        let poDanu=data;
        let broj:number[]=[];
        poDanu.forEach((el,ind) => {
          let lab= {mesec:JSON.stringify(el._id.mesec), dan:JSON.stringify(el._id.dan) };
          this.BarChart.data.labels.push(`${lab.dan}.${lab.mesec}.`);

          broj.push(el.count)
          this.BarChart.data.datasets[0].backgroundColor="lightgreen"

        });

        this.BarChart.data.datasets[0].data=broj;
        this.BarChart.update()
      }
    });
  }

  /*izloguj se */
  odjavljivanje() {
    this.ruter.navigate(['/prijava']);
  }

  natrag() {
    this.ruter.navigate(['/preduzece']);
  }

}
