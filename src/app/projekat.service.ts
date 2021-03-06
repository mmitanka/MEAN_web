import { Injectable } from '@angular/core';
import { Poljoprivrednik } from './interfejsi/poljoprivrednik';
import { Router } from '@angular/router';
import { Preduzece } from './interfejsi/preduzece';
import {HttpClient, HttpResponse, HttpHeaders,HttpParams} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Rasadnik } from './interfejsi/rasadnik';
import { MSadnica } from './interfejsi/msadnica';
import { Magacin } from './interfejsi/magacin';
import { Sadnica } from './interfejsi/sadnica';
import { Preparat } from './interfejsi/preparat';
import { Komentar } from './interfejsi/komentar';
import { Proizvod } from './interfejsi/priozvod';
import { Porudzbina } from './interfejsi/porudzbina';
import { ProizvodPor } from './interfejsi/proizvodpor';


@Injectable({
  providedIn: 'root'
})
export class ProjekatService {

  constructor(private ruter:Router, private http:HttpClient) { }
  
  uri='http://localhost:4000';
  API="HpSkFbKUFoqPTNHHZZII8CjkNZ1IoY3wWnvHcRkM_Hg";

  /*pocinje deo za prijava komp*/
  ucitajLogPolj (korime) {
    if(localStorage.getItem('loggedUser')==null) {
      localStorage.setItem('loggedUser',
      JSON.stringify(korime));
    }else {
      localStorage.setItem('loggedUser',
      JSON.stringify(korime)); 
    }

  }
  /*treba mi Local storage metoda koja mi pamti koje se pred ulogovalo*/
  ucitajLogPred (preduzece:string) {
    if(localStorage.getItem('loggedPred')==null) {
      localStorage.setItem('loggedPred',JSON.stringify(preduzece));
    }else {
      localStorage.setItem('loggedPred',JSON.stringify(preduzece));
      
    }
  }

  dohvatiLogPred () :string {
    return JSON.parse(localStorage.getItem('loggedPred'));
  }
  dohvatiLogPolj (): Poljoprivrednik {
    return JSON.parse(localStorage.getItem('loggedUser'));
  }


   prijavljivanje (korime, lozinka): Observable<any>{

    const logg= {
      korime:korime,
      lozinka:lozinka,
      skr:korime//mora da ime da se zove isto!!
    };

    return this.http.post(`${this.uri}/login`,logg,);

    /*dovde deo za prijavu komp*/
    
  }
   /*pocinje deo za registracija komp*/ 
  registacijaPolj(polj:Poljoprivrednik, plozinka): Observable<any> {
      const data= {
        ime:polj.ime,
        prezime:polj.prezime,
        korime:polj.korime,
        lozinka:polj.lozinka,
        plozinka:plozinka,
        dat_rodj:polj.dat_rodj,
        mesto_rodj:polj.mesto_rodj,
        telefon:polj.telefon,
        email:polj.email
      }
      return this.http.post(`${this.uri}/regpolj`,data);
  }

  registracijaPred(pred:Preduzece,plozinka): Observable<any> {
    const data= {
      naziv:pred.naziv,
      skr:pred.skr,
      lozinka:pred.lozinka,
      plozinka:plozinka,
      datum_osn:pred.datum_osn,
      mesto:pred.mesto,
      email:pred.email
    }
    return this.http.post(`${this.uri}/regpred`,data);
  }
  /*admin komp deo*/
  ucitajBazu(pod):Observable<any> {
    return this.http.get(`${this.uri}/ucitajkorisnike/${pod}`);
    
    
  }
  prihvatanjeZahtevaPolj(korime:String):Observable<any> {
    const data={
      korime:korime
    }
    return this.http.post(`${this.uri}/prihvatipolj`,data);
  }

  prihvatanjeZahtevaPred(skr:String):Observable<any> {
    const data={
      skr:skr
    }
    return this.http.post(`${this.uri}/prihvatipred`,data);
  }

  odbijanjeZahtevaPolj(korime:String):Observable<any> {
    const data={
      korime:korime
    }
    return this.http.post(`${this.uri}/odbijpolj`,data);
  }
  
  odbijanjeZahtevaPred(skr:String):Observable<any> {
    const data={
      skr:skr
    }
    return this.http.post(`${this.uri}/odbijpred`,data);
  }

  azuriranjePolj(polj:Poljoprivrednik):Observable<any> { 
    const data={
      ime:polj.ime,
      prezime:polj.prezime,
      korime:polj.korime,
      lozinka:polj.lozinka,
      dat_rodj:polj.dat_rodj,
      mesto_rodj:polj.mesto_rodj,
      telefon:polj.telefon,
      email:polj.email
    }
    return this.http.post(`${this.uri}/azuriranjepolj`,data);
  }

  azuriranjePred(pred:Preduzece):Observable<any> {
    const data={
      naziv:pred.naziv,
      skr:pred.skr,
      lozinka:pred.lozinka,
      datum_osn:pred.datum_osn,
      mesto:pred.mesto,
      email:pred.email
    }
    return this.http.post(`${this.uri}/azuriranjepred`,data);
  }
  izbrisiPolj(korime:String):Observable<any> {
    const data={
      korime:korime
    }
    return this.http.post(`${this.uri}/izbrisipolj`,data);
  }
  izbrisiPred(skr:String):Observable<any> {
    const data={
      skr:skr
    }
    return this.http.post(`${this.uri}/izbrisipred`,data);
  }
  dodajPred(pred:Preduzece):Observable<any>{ 
    const data={
      naziv:pred.naziv,
      skr:pred.skr,
      lozinka:pred.lozinka,
      datum_osn:pred.datum_osn,
      mesto:pred.mesto,
      email:pred.email
    }
    return this.http.post(`${this.uri}/dodajpred`,data);
  }
  dodajPolj(polj:Poljoprivrednik):Observable<any>{ 
    const data={
      ime:polj.ime,
      prezime:polj.prezime,
      korime:polj.korime,
      lozinka:polj.lozinka,
      dat_rodj:polj.dat_rodj,
      mesto_rodj:polj.mesto_rodj,
      telefon:polj.telefon,
      email:polj.email
    }
    return this.http.post(`${this.uri}/dodajpolj`,data);
  }

  /*poljoprivrednik komp deo*/
  ucitajRasadnike(korime):Observable<any>{
    const data={
      korime:korime
    }
    return this.http.post(`${this.uri}/ucitajrasadnike`,data);
  }
  /*promena lozinke*/ 
  promeniLozinkuPolj(korime: string, slozinka:string, nlozinka:string) :Observable<any>{
    const data={
      korime:korime,
      slozinka:slozinka,
      nlozinka:nlozinka
    }
    return this.http.post(`${this.uri}/promenilozpolj`,data);
  }
/*izbrisi rasadnik*/ 
obrisiRasadnik(ras:Rasadnik):Observable<any>{
   
  return this.http.post(`${this.uri}/izbrisirasadnik`,ras);
}

/*dodavanje rasdnika*/
  dodajRasadnik(ras:Rasadnik):Observable<any> {
    const data={
      ras:ras
    }
    return this.http.post(`${this.uri}/dodajrasadnik`,data);
  }

  /*local storage metoda za rasadnik u polju*/
  prikaziRasadnik(ras:Rasadnik) {
    if(localStorage.getItem('rasadnik')==null) {
      localStorage.setItem('rasadnik', JSON.stringify(ras));
    }else{
      localStorage.setItem('rasadnik', JSON.stringify(ras));
    }

  }
  
  /*local storage ucitavanje odn prikazivanje  odredjenog rasadnika na rasadnik komponenti*/
  ucitajRasadnik():Rasadnik {
    return JSON.parse(localStorage.getItem('rasadnik'));
  }

  /*local storage metoda za  sadnica kojoj povecavamo progr*/
 postaviSadZaProgres(i:Sadnica) {
  if(localStorage.getItem('sadnicazaprogres')==null) {
    localStorage.setItem('sadnicazaprogres', JSON.stringify(i));
  }else{
    localStorage.setItem('sadnicazaprogres', JSON.stringify(i));
  }
  }

  
  /*local storage kad uzimamo natrag sadnicu kojjo povec progres*/
  uzmiSadZaProgres():Sadnica {
    return JSON.parse(localStorage.getItem('sadnicazaprogres'));
  }


  /*cuvanje izmenjenih podataka o rasadniku  dashboard u bazi:komp ras*/
  sacuvajUBazi(ras:Rasadnik):Observable<any> {
    return this.http.post(`${this.uri}/sacuvajrasadnik`,ras);
  }
    /*cuvanje izmenjenih podataka o rasadniku  dashboard u bazi:komp ras::*/
    sacuvajUBaziTimer(ras:Rasadnik):Observable<any> {
      return this.http.post(`${this.uri}/sacuvajrasadniktime`,ras);
    }
  /*ucitavanje sadnica za  odr rasadnik i korisnika*/
  ucitajSadnice(korime:string, rasadnik:string):Observable<any> {
    const data={
      korime:korime,
      naziv:rasadnik
    }
    return this.http.post(`${this.uri}/ucitajsadnice`,data);
  }
  /*ucitavanje sadrzaja magacina*/
  ucitajMagacin(korime:string, rasadnik:string):Observable<any>{
    const data={
      korime:korime,
      rasadnik:rasadnik
    }
    return this.http.post(`${this.uri}/ucitajmagacin`,data);

  }
  /*ucitavanje porudzbina iz magacina*/
  ucitajPorudzbine(korime:string, rasadnik:string):Observable<any>{
    const data={
      korime:korime,
      rasadnik:rasadnik
    }
    return this.http.post(`${this.uri}/ucitajporudzbine`,data);
  }

  /*magacin komponenta sadjenje*/
  sadi(mag:Magacin):Observable<any> {
   
    return this.http.post(`${this.uri}/zasadi`,mag);
  }
  /*otkazivanje porudzbine*/
  otkazi(por:Porudzbina,pro:Proizvod):Observable<any> {
   const data ={
     korime:por.korime,
     _id:por._id,
     id_por:por.id_por,
     rasadnik:por.rasadnik,
     proizvodZaBrisanje:pro
    
   }
    return this.http.post(`${this.uri}/otkazi`,data);
  }
  /*povecavanje progresa*/
  povecajProgres(sad:Sadnica, prep:Preparat):Observable<any> {
    const data={
      id_sadnice:sad._id, //ovov ispod mi ni ne treba vise
      id_prep:prep._id,
      ubr:prep.ubrzanje
    }
    return this.http.post(`${this.uri}/povecajprogres`,data);
  }
  /*presadjivanje sadnice*/
  presadiSad(sad:Sadnica, korime:string, rasadnik:string) :Observable<any> {
    const data ={
      id:sad._id,
      korime:korime,
      naziv:rasadnik
    }
    return this.http.post(`${this.uri}/presadi`,data);
  }
  /*smanjivanje broja slob mesta dok ne prodje jedan dan pa da se oslobodi opet*/
  smanjiBrSlobMestaZaDan(id:number):Observable<any>{

    return this.http.get(`${this.uri}/smanjibrojslobmesta/${id}`)
  }
  /*povecavanje broja slob mesta jer je prosao jedan dan*/
  povecajBrSlobMestaZaDan(id:number):Observable<any>{

    return this.http.get(`${this.uri}/povecajbrojslobmesta/${id}`)
  }

/*slanje emaila za odrzavanje*/
  posaljiEmail (ras:Rasadnik):Observable<any> {
    const data= {
      korime:ras.korime,
      naziv:ras.naziv,
      _id:ras._id
    }
    return this.http.post(`${this.uri}/email`,data);
  }
  /*agro online komp*/
  ucitajPreduzeca(id:number) :Observable<any> {

    return this.http.post(`${this.uri}/svapreduzeca`,id);
  }
  /*ucitaj prozivode svih preduzeca*/
  ucitajSveProizvode():Observable<any>{
    return this.http.get(`${this.uri}/ucitajsveproizvode`);
  }

  /*ucitaj proizvode za dato pred*/
  ucitajProizvode(proizvodjac:string):Observable<any> {
    const data={
      proizvodjac:proizvodjac
    }
    return this.http.post(`${this.uri}/ucitajproizvode`,data);
  }

  /*local storage postavi sadnicu*/
  postaviSadnicuZaDetPrikaz(sad:MSadnica) {
    if(localStorage.getItem('sadnicazadetprikaz')==null){
      localStorage.setItem('sadnicazadetprikaz',JSON.stringify(sad));
    }else {
      localStorage.setItem('sadnicazadetprikaz',JSON.stringify(sad));
    }
  }
  /*local storage uzmi sadnicu za det prikaz*/
  uzmiSadnicuZaDetPrikaz():MSadnica {
    return JSON.parse(localStorage.getItem('sadnicazadetprikaz'));
  }
  /*local storage postavi preparat*/
  postaviPreparatZaDetPrikaz(prep:Preparat) {
    if(localStorage.getItem('preparatzadetprikaz')==null){
      localStorage.setItem('preparatzadetprikaz',JSON.stringify(prep));
    }else {
      localStorage.setItem('preparatzadetprikaz',JSON.stringify(prep));
    }
  }
  /*local storage uzmi preparat za det prikaz*/
  uzmiPreparatZaDetPrikaz():Preparat {
    return JSON.parse(localStorage.getItem('preparatzadetprikaz'));
  }
    /*local storage postavi komentare*/
    postaviKomentareDetPrikaz(kom:Komentar[]) {
      if(localStorage.getItem('komentari')==null){
        localStorage.setItem('komentari',JSON.stringify(kom));
      }else {
        localStorage.setItem('komentari',JSON.stringify(kom));
      }
    }
    /*local storage uzmi komentare za det prikaz*/
    uzmiKomentareDetPrikaz():Komentar[] {
      return JSON.parse(localStorage.getItem('komentari'));
    }

    
    /*detaljan prikaz odr proizvoda*/
    detaljanPrikaz(id:string):Observable<any> {
      const data={
        id_sadnice:id
      }
      return this.http.post(`${this.uri}/detaljanprikaz`,data);
    }
    
    /*NARUCIVANJE IZ ONLINE PROD*/ 
    naruciProizvode(proiz:Proizvod[],ras:Rasadnik):Observable<any> {
      const data={
        proizv:proiz,
        rasadnik:ras.naziv,
        korime:ras.korime
      }
      return this.http.post(`${this.uri}/naruci`,data);
    }

    /*dodavanje proizvoda u korpu LOCAL STORAGE*/
    postaviUKorpu(p:Proizvod[]) {
      if(localStorage.getItem('korpa')==null) {
        localStorage.setItem('korpa',JSON.stringify(p));
      }else {
        localStorage.setItem('korpa',JSON.stringify(p));
      }
    }
    /*uzmi proizvode iz korpe*/
    uzmiIzKorpe():Proizvod[] {
      return JSON.parse(localStorage.getItem('korpa'));
    }
    /*izbrisi ls korpa*/
    isprazniKorpu() {
      localStorage.removeItem('korpa');
    }

    /*postavi komentar*/
    postaviKomentar(d):Observable<any> {
      return this.http.post(`${this.uri}/ostavikom`,d);
    }


    /*KOMP PREDUZECE*/ 
    /*ucitaj porudzbine za dato preduzrce */ 
    ucitajPorudzbineZaPreduzece(skr:string):Observable<any> {
      const data ={
        skr:skr
      }
      return this.http.post(`${this.uri}/ucitajporudzbinepreduzeca`,data);
    }

    /*odbij porudzbinu*/
    odbijPor(por:Porudzbina, proizvod:Proizvod) :Observable<any> {
      const data={
        proizv:por.proizv,
        _id:por._id,
        proizvodZaBrisanje:proizvod,
        rasadnik:por.rasadnik,
        korime:por.korime,
        id_por:por.id_por,
        datum:por.datum

      }
      return this.http.post(`${this.uri}/odbijporudzbinu`,data)
    }

/*povuci iz prodaje*/ 
    povuciIzProdaje(id:number) :Observable<any>{
      const data={
        _id:id
      }
      return this.http.post(`${this.uri}/povuciprodaju`,data);
    }


/*izracunaj razdaljinu i vreme koje treba za rasadnik za korisnika da se nadje u kom je mestu rasadnik*/  
prihvatiPorudzbinu(por:Porudzbina,p:ProizvodPor, skr:string) :Observable<any> {
  const data={
    skr:skr,
    korime:por.korime,
    rasadnik:por.rasadnik,
    _id:por._id,
    proizvodZaSlanje:p
  }
  
  
  return this.http.post(`${this.uri}/prihvatipor`,data);

}

/*provera da li im slobodnog kurira*/
proveriBrojKurira(skr:string) :Observable<any> {
  const data={skr:skr}
  return this.http.post(`${this.uri}/proverakurira`,data);
} 
/*za pronazazenje g sirine g duzine odredjenog grada*/
pronadjiKoordGrada(grad):Observable<any> {

 return this.http.get('https://geocoder.ls.hereapi.com/6.2/geocode.json?apiKey=5wXhj6l0prD2mFgvuHxnxQbLWTZtZ0ezBadsPD1DU_M&searchtext='+grad);
}

izracunajPotrebnoVreme(gs1,gd1,gs2,gd2):Observable<any>{
  return this.http.get(
  'https://route.ls.hereapi.com/routing/7.2/calculateroute.json?apiKey=5wXhj6l0prD2mFgvuHxnxQbLWTZtZ0ezBadsPD1DU_M&waypoint0=geo!'
  +gs1+','+gd1+
  '&waypoint1=geo!'+gs2+','+gd2+'&mode=fastest;car;traffic:disabled&return=summary');
}

/*promena lozinke pred*/
promeniLozPred(skr:string, slozinka:string, nlozinka:string):Observable<any> {
  const data={
    skr:skr,
    slozinka:slozinka,
    nlozinka:nlozinka
  }
  return this.http.post(`${this.uri}/promenilozpred`,data);
}
/*pri ucitavanju preduzeca da se pozove i ovo */ 
mestoPreduzeca(skr:string) :Observable<any> {
  const data= {
    skr:skr
  }
  return this.http.post(`${this.uri}/sedistepreduzeca`,data);
}
/*pronadji mesto u kome se nalazi rasadnik*/ 
vratiMestoRasadnika(korime:string, naziv:string) :Observable<any> {
  const data={
    korime:korime,
    naziv:naziv
  }
  return this.http.post(`${this.uri}/pronadjimrasadnika`,data)
}

/*vrati kurira sa dostave*/
vratiKurira(skr:string):Observable<any> {
const data={
  skr:skr
}
return this.http.post(`${this.uri}/vratikurira`,data)


}



/*stepper, dodavanje proizvoda*/ 
dodajProizvod(p:Proizvod):Observable<any> {
  const data={
    tip:p.tip,
    ubrzanje:p.ubrzanje,
    ocena:p.ocena,
    proizvodjac:p.proizvodjac,
    ime_sadnice:p.ime_sadnice,
    kolicina:p.kolicina
  }
  return this.http.post(`${this.uri}/dodajproizvod`,data)
}

/*bar chart*/ 
porudzbinePoDanu(skr:string):Observable<any> {
  const data ={
    proizvodjac:skr
  }
  return this.http.post(`${this.uri}/porpodanu`,data);
}
/*web stranica preparata*/
postaviPrepZaWeb(p:Preparat) {
  if(localStorage.getItem('prepwebstr')==null) {
    localStorage.setItem('prepwebstr',JSON.stringify(p))
  }else {
    localStorage.setItem('prepwebstr',JSON.stringify(p))

  }
}
uzmiPrepZaWeb():Preparat {
  return JSON.parse(localStorage.getItem('prepwebstr'));
}

/*web stranica sadnice*/
postaviSadZaWeb(sad:MSadnica) {
  if(localStorage.getItem('sadwebstr')==null) {
    localStorage.setItem('sadwebstr',JSON.stringify(sad))
  }else {
    localStorage.setItem('sadwebstr',JSON.stringify(sad))

  }
}
uzmiSadZaWeb():MSadnica {
  return JSON.parse(localStorage.getItem('sadwebstr'));
}


} 
