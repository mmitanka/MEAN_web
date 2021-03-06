import express, { json } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import nodemailer from 'nodemailer'
import bodyParser from 'body-parser';
import LogPolj from'./models/logpolj';
import LogPred from './models/logpred';
import LogAdmin from './models/logadmin';
import RegPolj from './models/regpolj';
import RegPred from './models/regpred';
import Rasadnik from './models/rasadnik';
import Sadnice from './models/sadnice';
import Magacin from './models/magacin';
import Porudzbina from './models/porudzbine';
import Proizvodi from './models/proizvodi';
import Komentari from './models/komentari';
import Poslovanje from './models/poslovanje';

const app=express();
const ruter=express.Router();


app.use(cors());
app.use(bodyParser());

mongoose.connect('mongodb+srv://MilenaM:kafetinkold.1809@milenam-jhbox.azure.mongodb.net/test?retryWrites=true&w=majority',
{useNewUrlParser: true, dbName:'projekat', useUnifiedTopology: true,useFindAndModify:false });
const db=mongoose.connection;

db.on('error', console.error.bind(console, 'greska u konekciji'));
db.once('open', ()=> {
    console.log('Veza sa bazom uspostavljena!');
}); //samo jednom prilikom prvog povezivanja sa bazom 

/*login */
ruter.route('/login').post((req,res) =>{
       
        
        
        LogPolj.findOne({korime:req.body.korime, lozinka:req.body.lozinka} ,(err)=>{
            if(err) console.error(err); 
        }).then(polj=>{
            if(polj) {
                res.json("polj");
                console.log(polj);   
            }else{
                LogPred.findOne({skr:req.body.skr, lozinka:req.body.lozinka}, (err)=>{
                    if(err) console.error(err);
                }).then(pred=>{
                    if(pred) {
                        res.json("pred");
                        console.log(pred);
                    }else{
                        LogAdmin.findOne({korime:req.body.korime, lozinka:req.body.lozinka}, (err)=>{
                            if(err) console.error(err);
                
                            
                        }).then(admin=>{
                            if(admin) {
                                res.json("admin"); 
                                console.log(admin);
                            } else if(!res.headersSent) {
                                res.json("pogresni kredencijali");
                               
                                console.log('pogresni kredencijali!');
                            }
                        });
                    }
                });
            }
        });
  
});
/*registracja polj*/
ruter.route('/regpolj').post((req,res)=> {
    
    RegPolj.findOne({korime:req.body.korime}, (err)=>{
        if(err){
            console.log(err);
        }
    }).then(data=>{
        if(data){
            res.json("korime zauzeto");
            console.log("korime zauzeto!");
        } else{
            LogPolj.findOne({korime:req.body.korime}, (err)=>{
                if(err){
                    console.log(err);
                }
            }).then(data=>{
                if(data) {
                    res.json("korime zauzeto");
                    console.log("korime zauzeto!");
                }else {
                    RegPolj.findOne({email:req.body.email}, err=>{
                        if(err){
                            console.log(err);
                        }
                    }).then(data=>{
                        if(data) {
                            res.json("email zauzet");
                            console.log("email zauzet!");
                        } else {
                            LogPolj.findOne({email:req.body.email}, (err)=>{
                                if(err){
                                    console.log(err);
                                }
                            }).then(data=>{
                                if(data) {
                                    res.json("email zauzet");
                                    console.log("email zauzet!");
                                }else {
                                    if(res.headersSent){ return;}

                                    let polj= new RegPolj(req.body);
                                    polj.save().then(polj=>{
                                    console.log('uspesno dodat zahtev polj');
                                    res.status(200).json(`uspesno dodat zahtev korisnika ${polj.ime} ${polj.prezime}`);
                                    }).catch(err=>{
                                        console.log('greska!');
                                        res.status(400).send('neuspesno dodavanje!');
                                    });
                                }
                            });

                        }
                    });
                }
            });
        }
    });
       
});
/*registracija preduzeca*/
ruter.route('/regpred').post((req,res)=> {
    
    RegPred.findOne({skr:req.body.skr}, (err)=>{
        if(err){
            console.log(err);
        }
    }).then(data=>{
        if(data){
            res.json("akronim zauzet");
            console.log("akronim zauzet!");
        } else{
            LogPred.findOne({skr:req.body.skr}, (err)=>{
                if(err){
                    console.log(err);
                }
            }).then(data=>{
                if(data) {
                    res.json("akronim zauzet");
                    console.log("akronim zauzet!");
                }else {
                    RegPred.findOne({email:req.body.email}, err=>{
                        if(err){
                            console.log(err);
                        }
                    }).then(data=>{
                        if(data) {
                            res.json("email zauzet");
                            console.log("email zauzet!");
                        } else {
                            LogPred.findOne({email:req.body.email}, (err)=>{
                                if(err){
                                    console.log(err);
                                }
                            }).then(data=>{
                                if(data) {
                                    res.json("email zauzet");
                                    console.log("email zauzet!");
                                }else {
                                    if(res.headersSent){ return;}

                                    let pred= new RegPred(req.body);
                                    pred.kurir=5;
                                    pred.save().then(pred=>{
                                    console.log('uspesno dodat zahtev preduzeca');
                                    res.status(200).json(`uspesno dodat zahtev preduzeca ${pred.naziv} ${pred.skr}`);
                                    }).catch(err=>{
                                        console.log('greska!');
                                        res.status(400).send('neuspesno dodavanje!');
                                    });
                                }
                            });

                        }
                    });
                }
            });
        }
    });
       
});

/*ucitavanje podataka na admin strani*/ 
ruter.route('/ucitajkorisnike/:pod').get((req,res)=>{
        if(req.params.pod=='zpolj'){
            RegPolj.find((err,data)=>{
                if(err){
                    console.error(err);
                }
                if(data) {
                    if(res.headersSent)return;
                    res.json(data);
                    console.log(data);

                }
            });
        }else if(req.params.pod=='zpred'){
                RegPred.find((err,data)=>{
                    if(err){
                        console.error(err);
                    }
                    if(data) {
                        if(res.headersSent)return;
                        res.json(data);
                        console.log(data);
                    }
                });
        }else if(req.params.pod=='lpolj'){
            LogPolj.find((err,data)=>{
                if(err) {
                    console.error(err);
                }
                if(data){
                    if(res.headersSent) return;
                    res.json(data);
                    console.log(data);
                }
            });
        }else if(req.params.pod=='lpred') {
            LogPred.find((err,data)=>{
                if(err) {
                    console.error(err);
                }
                if(data){
                    if(res.headersSent) return;
                    res.json(data);
                    console.log(data);
                }
            });
        }
});

/*prihvatanje zahteva polj*/
ruter.route('/prihvatipolj').post((req,res)=>{
    let polj;
    RegPolj.findOne({korime:req.body.korime}, (err)=>{
        if(err) {
            console.error(err);
        }
        
    }).then(data=>{
        if(data) {
            const d= {
                ime:data.ime,
                prezime:data.prezime,
                korime:data.korime,
                lozinka:data.lozinka,
                dat_rodj:data.dat_rodj,
                mesto_rodj:data.mesto_rodj,
                telefon:data.telefon,
                email:data.email
            }
            polj= new LogPolj(d);
            data.remove((err)=>{
                if(err) {
                    console.log(err);
                }else {
                    console.log('uspesno izbrisano!');
                }
            });
            polj.save().then(p=>{
                res.json(`Prihvacen zahtev korisnika ${p.ime} ${p.prezime}`);
                console.log(p);
            }).catch(err=>{
                console.log('greska!');
                res.status(400).json('Doslo je do greske!');
            });
        }else{
            console.log("ovde staje")
        }
    });
   
    
});

/*prihvatanje zahteva pred*/
ruter.route('/prihvatipred').post((req,res)=>{
    let pred;
    RegPred.findOne({skr:req.body.skr}, (err)=>{
        if(err) {
            console.error(err);
        }
        
    }).then(data=>{
        if(data) {
            
            const d= {
                naziv:data.naziv,
                skr:data.skr,
                lozinka:data.lozinka,
                datum_osn:data.datum_osn,
                mesto:data.mesto,
                email:data.email
            }
            pred= new LogPred(d);
            data.remove((err)=>{
                if(err) {
                    console.log(err);
                }else {
                    console.log('uspesno izbrisano!');
                }
            });
            pred.save().then(p=>{
                res.json(`Prihvacen zahtev preduzeca ${p.naziv} `);
                console.log(p);
            }).catch(err=>{
                console.log('greska!');
                res.status(400).send('Doslo je do greske!');
            });
        }
    });
});
/*odbijanje zahteva polj*/
ruter.route('/odbijpolj').post((req,res)=>{
    
    RegPolj.findOneAndDelete({korime:req.body.korime}, (err,data)=>{
        if(err) {
            console.error(err);
        }
        if(data){
            res.json(`Odbijen zahtev korisnika ${data.ime} ${data.prezime}`);
            console.log('uspesno izbrisano!'); 
        }
    });
})
/*odbijanje zahteva pred*/
ruter.route('/odbijpred').post((req,res)=>{ 
    RegPred.findOneAndDelete({skr:req.body.skr}, (err,data)=>{
        if(err) {
            console.error(err);
        }
        if(data) {
            res.json(`Obijen zahtev preduzeca ${data.naziv}`);
            console.log('uspesno izbrisano!');
        }
    })
});
/*brisanje polj*/
ruter.route('/izbrisipolj').post((req,res)=>{
    LogPolj.findOneAndDelete({korime:req.body.korime}, (err,data)=>{
        if(err) {
            console.error(err);
        }
        if(data){
            res.json(`izbrisan  korisnik ${data.ime} ${data.prezime}`);
            console.log('uspesno izbrisano!'); 
        }
    })
});
/*brisanje pred*/
ruter.route('/izbrisipred').post((req,res)=>{
    LogPred.findOneAndDelete({skr:req.body.skr}, (err,data)=>{
        if(err) {
            console.error(err);
        }
        if(data){
            res.json(`izbrisano preduzece ${data.naziv}`);
            console.log('uspesno izbrisano!'); 
        }
    })
});
/*azuriranje polj*/
ruter.route('/azuriranjepolj').post((req,res)=>{
    LogPolj.findOne({korime:req.body.korime}, err=>{
        if(err) {
            console.error(err);
        }
    }).then(data=>{
        if(data) {
            data.korime=req.body.korime;
            data.ime=req.body.ime;
            data.prezime=req.body.prezime;
            data.lozinka=req.body.lozinka;
            data.mesto_rodj=req.body.mesto_rodj;
            data.telefon=req.body.telefon;
            data.dat_rodj=req.body.dat_rodj;
            data.email=req.body.email;

            data.save().then(d=>{
                res.json(`uspesno azuriran korisnik ${data.ime} ${data.prezime}`);
                console.log(`uspesno azuriran korisnik ${data.ime} ${data.prezime}`);
            }).catch(err=>{
                res.json('greska!!')
            })
        }
    });
});
/*azuriranje pred*/
ruter.route('/azuriranjepred').post((req,res)=>{
    LogPred.findOne({skr:req.body.skr}, err=>{
        if(err) {
            console.error(err);
        }
    }).then(data=>{
        if(data) {
            data.skr=req.body.skr;
            data.naziv=req.body.naziv;
            data.lozinka=req.body.lozinka;
            data.mesto=req.body.mesto;
            data.datum_osn=req.body.datum_osn;
            data.email=req.body.email;

            data.save().then(d=>{
                res.json(`uspesno azuriran korisnik ${data.naziv} `);
                console.log(`uspesno azuriran korisnik ${data.skr}`);
            }).catch(err=>{
                res.json('greska!!')
            })
        }
    });
});
/*dodaj polj*/
ruter.route('/dodajpolj').post((req,res)=>{
    RegPolj.findOne({korime:req.body.korime}, (err)=>{
        if(err){
            console.log(err);
        }
    }).then(data=>{
        if(data){
            res.json("korime zauzeto");
            console.log("korime zauzeto!");
        } else{
            LogPolj.findOne({korime:req.body.korime}, (err)=>{
                if(err){
                    console.log(err);
                }
            }).then(data=>{
                if(data) {
                    res.json("korime zauzeto");
                    console.log("korime zauzeto!");
                }else {
                    RegPolj.findOne({email:req.body.email}, err=>{
                        if(err){
                            console.log(err);
                        }
                    }).then(data=>{
                        if(data) {
                            res.json("email zauzet");
                            console.log("email zauzet!");
                        } else {
                            LogPolj.findOne({email:req.body.email}, (err)=>{
                                if(err){
                                    console.log(err);
                                }
                            }).then(data=>{
                                if(data) {
                                    res.json("email zauzet");
                                    console.log("email zauzet!");
                                }else {
                                    if(res.headersSent){ return;}

                                    let polj= new LogPolj(req.body);
                                    polj.save().then(polj=>{
                                    console.log('uspesno dodat polj');
                                    res.status(200).json(`uspesno dodat korisnika ${polj.ime} ${polj.prezime}`);
                                    }).catch(err=>{
                                        console.log('greska!');
                                        res.status(400).send('neuspesno dodavanje!');
                                    });
                                }
                            });

                        }
                    });
                }
            });
        }
    });
});
/*dodaj pred*/
ruter.route('/dodajpred').post((req,res)=>{
    RegPred.findOne({skr:req.body.skr}, (err)=>{
        if(err){
            console.log(err);
        }
    }).then(data=>{
        if(data){
            res.json("akronim zauzet");
            console.log("akronim zauzet!");
        } else{
            LogPred.findOne({skr:req.body.skr}, (err)=>{
                if(err){
                    console.log(err);
                }
            }).then(data=>{
                if(data) {
                    res.json("akronim zauzet");
                    console.log("akronim zauzet!");
                }else {
                    RegPred.findOne({email:req.body.email}, err=>{
                        if(err){
                            console.log(err);
                        }
                    }).then(data=>{
                        if(data) {
                            res.json("email zauzet");
                            console.log("email zauzet!");
                        } else {
                            LogPred.findOne({email:req.body.email}, (err)=>{
                                if(err){
                                    console.log(err);
                                }
                            }).then(data=>{
                                if(data) {
                                    res.json("email zauzet");
                                    console.log("email zauzet!");
                                }else {
                                    if(res.headersSent){ return;}

                                    let pred= new LogPred(req.body);
                                    pred.save().then(pred=>{
                                    console.log('uspesno dodato preduzece');
                                    res.status(200).json(`uspesno dodato preduzece ${pred.naziv} ${pred.skr}`);
                                    }).catch(err=>{
                                        console.log('greska!');
                                        res.status(400).send('neuspesno dodavanje!');
                                    });
                                }
                            });

                        }
                    });
                }
            });
        }
    });
});

/*komp polj*/
/*ucitavanje svih rasadnika*/
ruter.route('/ucitajrasadnike').post((req,res)=>{
    Rasadnik.find({korime:req.body.korime},(err,data)=>{
        if(err){
            console.error(err);
        }
        if(data ) {
            if(res.headersSent)return;
            res.json(data);
            console.log(data);

        }
    });
});

/*brisanje rasadnika: */
ruter.route('/izbrisirasadnik').post((req,res)=>{
   Rasadnik.findOneAndDelete({korime:req.body.korime,naziv:req.body.naziv}, (err,data)=>{
    if(err) {
        console.error(err);  
    }
    if(data) {
        res.json(`izbrisan rasadnik ${data.naziv} korisnika ${data.korime}`)
        console.log("uspesno izbrisano iz rasadnika");
    }
   });
   Sadnice.findOneAndDelete({korime:req.body.korime,naziv:req.body.naziv}, (err,data)=>{
    if(err) {
        console.error(err);  
    }
    if(data) {
        
        console.log("uspesno izbrisani podaci o sadnicama");
    }
   });
   Magacin.findOneAndDelete({korime:req.body.korime,rasadnik:req.body.naziv}, (err,data)=>{
    if(err) {
        console.error(err);  
    }
    if(data) {
        
        console.log("uspesno izbrisani podaci o magacinu");
    }
   });

    
});

/*promena lozinke*/
ruter.route('/promenilozpolj').post((req,res)=>{
    LogPolj.findOne({korime:req.body.korime}, (err, data)=>{
        if(err) {
            res.json(err);
        }
        if(data){
            if(data.lozinka==req.body.slozinka) {
                data.lozinka=req.body.nlozinka;
                data.save().then(d=>{
                    if(d){
                        res.json(`uspesna promena lozinke korisnika ${d.korime}`);
                    }
                }).catch(e=>{
                    res.json(err);
                });
            }else {
                res.json('neispravna stara lozinka!');
            }
        }
    });
})

/*dodavanje novog rasadnika, komp polj*/
ruter.route('/dodajrasadnik').post((req,res)=>{
    Rasadnik.findOne({naziv:req.body.ras.naziv,korime:req.body.ras.korime}, (err,data)=>{
        if(err){
            console.log(err);
        } 
    
        if(data){
            res.json('rasadnik sa datim imenom vec postoji!!');
        }else {
            if(res.headersSent){ return;}
            
            let rass=new Rasadnik();
            rass.naziv=req.body.ras.naziv;
            rass.korime=req.body.ras.korime;
            rass.duzina=req.body.ras.duzina;
            rass.sirina=req.body.ras.sirina;
            rass.temp=req.body.ras.temp;
            rass.voda=req.body.ras.voda;
            rass.br_sadnica=req.body.ras.br_sadnica;
            rass.br_slobodnih_mesta=req.body.ras.br_slobodnih_mesta;
            rass.mesto=req.body.ras.mesto;


            rass.save().then(d=>{
                if(d){
                    res.json(`uspesno dodat rasadnik: ${d.naziv} korisnika ${d.korime}`);
                    console.log(`uspesno dodat rasadnik: ${d.naziv} korisnika ${d.korime}`);
                }
            }).catch(ee=>{
                if(ee) {
                    res.json('greska');
                }
            })
        }
    })    
    
});

/*komp ras*/ 
/*cuvanje izmenjenih pod u bazi o rasadniku*/
ruter.route('/sacuvajrasadnik').post((req,res)=>{
    Rasadnik.findOne({korime:req.body.korime, naziv:req.body.naziv},err =>{
        if(err) {
            console.error(err);  
        }
    }).then(data=>{
        if(data) {
            data.temp=req.body.temp;
            data.voda=req.body.voda;
        }
        data.save().then(d=>{
            res.json(d);
            console.log(`uspesno azuriran rasadnik: ${d.naziv} korisnika ${d.korime}`); 
        }).catch(err=>{
            res.json('greska!!');
        });
    });
});
/*TIMER TIMER TIMER ZA SMANJIVANJE */
ruter.route('/sacuvajrasadniktime').post((req,res)=>{
    Rasadnik.findOne({korime:req.body.korime, naziv:req.body.naziv},err =>{
        if(err) {
            console.error(err);  
        }
    }).then(data=>{
        if(data) {
            data.temp-=0.5;
            data.voda--;
        }
        data.save().then(d=>{
            if(d.temp<12 || d.voda<75) {
                res.json(`Rasadnik ${d.naziv} korisnika ${d.korime} zahteva odrzavanje`);
            }else {
            res.json(d);
            console.log(`smanjena temp i voda u rasadniku: ${d.naziv} korisnika ${d.korime}`); 
            }
        }).catch(err=>{
            res.json('greska!!');
        });
    });
});
/*ucitavanje sadnica iz odr rasadnika*/
ruter.route('/ucitajsadnice').post((req,res)=>{
    Sadnice.find({korime:req.body.korime,naziv:req.body.naziv}, (err, data)=>{
        if(err){
            console.log(err);
        }
        if(data){
            res.json(data);
            console.log('pronasao sam sadnice');
        }
    });
});
/*ucitavanje magacina koji ide uz rasadnik*/
ruter.route('/ucitajmagacin').post((req,res)=>{
    Magacin.find({korime:req.body.korime,rasadnik:req.body.rasadnik}, (err,data)=>{
        if(err){
            console.log(err);
        }
        if(data){
            res.json(data);
            console.log('vracam magacin');
        }
    });
});

/*ucitavanje porudzbina*/
ruter.route('/ucitajporudzbine').post((req,res)=>{
    Porudzbina.find({korime:req.body.korime,rasadnik:req.body.rasadnik}, (err,data)=>{
        if(err){
            console.log(err);
        }
        if(data){
            res.json(data);
            console.log('vracam porudzbine za magacin');
        }
    });
});
/*otkazivanje porudzbina*/
ruter.route('/otkazi').post((req,res)=>{
    Porudzbina.findOne({id_por:req.body.id_por},
    (err,data)=>{
            if(err){
                console.log(err);
            }
            if(data){
                let br=0, ind=0;
                data.proizv.forEach(((el,i)=>{
                    if(el.ime_sadnice==req.body.proizvodZaBrisanje.ime_sadnice &&
                        el.tip==req.body.proizvodZaBrisanje.tip) {
                            br++; if(br==1) {ind=i}
                    }
                }));
                if(br>0){
                    data.proizv.splice(ind,1);
    
                }
                if(data.proizv.length==0) {
                    data.remove().then(izb=>{
                        console.log('izbrisana porudzbina iz cele baze jer nema vise elem')
                    });
                }else{
                    data.save().then(usp=>{
                        res.json(`uspesno otkazana porudbina ${req.body.proizvodZaBrisanje.ime_sadnice} !`);
                        console.log('uspesno izbrisano!');
                    });
                }


                Proizvodi.findOne({proizvodjac:req.body.proizvodZaBrisanje.proizvodjac, ime_sadnice:req.body.proizvodZaBrisanje.ime_sadnice,
                    tip:req.body.proizvodZaBrisanje.tip}, (err, pr)=>{
                        if(err) {
                            console.log(err);
                        }
                        if(pr) {
                            pr.kolicina+=req.body.proizvodZaBrisanje.kolicina;
                            pr.save().then(kon=>{
                                if(kon) {
                                    console.log(`vratila sam stanje u online prod za proizvod ${kon.ime_sadnice} ${kon.proizvodjac}`);
                                }
                            });
                        }
                    });
            }

    });
});
/*povecanje progresa*/
ruter.route('/povecajprogres').post((req,res)=>{
    //trazimo u mag da smanjimo kol
    Magacin.findById(req.body.id_prep,(err,data)=>{
        if(err) {
            console.log(err);
        }
        if(data) {
            
            data.kolicina--;
            data.save().then(d=>{
                console.log('smanjila sam iz magacina');
            }).catch(err=>{
                if(err){
                    console.log(err);
                }
            });
        }
    });
    Sadnice.findById(req.body.id_sadnice,(err,data)=>{
        if(err) {
            console.log(err);
        }
        if(data){

            if(data.progres+req.body.ubr<=100){
             data.progres+=req.body.ubr;
            }else {
                data.progres=100;
            }
            data.save().then(d=>{
                res.json(`progres je sada ${d.progres}`);
                console.log('podesila sam progres');
            }).catch(err=>{
                if(err){
                    console.log(err);
                }
            });
        }
    });
});
/*presadjivanje  */ 
ruter.route('/presadi').post((req,res)=>{
    Sadnice.findByIdAndDelete(req.body.id, (err,data)=>{
        if(err) {
            console.log(err);
        }
        if(data) {
            console.log('izbrisano iz sadnica');
            res.json('Uspesno presadjena sadnica');
        }
    });
    Rasadnik.findOne({korime:req.body.korime, naziv:req.body.naziv}, (err, data) =>{
        if(err) {
            console.log(err);
        }
        if(data) {
            data.br_sadnica--;
            data.br_slobodnih_mesta++
            
            data.save().then(data=>{
                console.log('azurirala sam stanje u rasadniku');
            }).catch(err=>{
                console.log(err);
            })
        }
    });
});

/*slanje emaila korisniku za odrzavanjes!!*/
ruter.route('/email').post((req,res)=>{
     LogPolj.findOne({korime:req.body.korime}, (err,data)=>{
        let transport = nodemailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "da41440632c0e6", 
              pass: "1193eb2f7f60cb" 
            }
          });
          let em=data.email;
          let mailOptions = {
            from: '"Admin Team" <admin@admin.com>',
            to: `${em}`,
            subject: 'Odrzavanje',
            text: `Postovani/a ${data.korime},
            
            
            Vas rasadnik ${req.body.naziv} zahteva odrzavanje!`, 
            html: `<b>Postovani/a ${data.korime}</b><br>Vas rasadnik ${req.body.naziv} zahteva odrzavanje! `
        }
        transport.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            res.json('poslato!')
    });

     });

});
/*smanjiti broj slobodnih mesta */
ruter.route('/smanjibrojslobmesta/:id').get((req,res)=>{
    Rasadnik.findById(req.params.id, (err,data)=>{
        if(err) {
            console.log(err);
        }
        if(data) {
            data.br_slobodnih_mesta--;
            data.save().then(d=>{
                res.json(`smanjen broj slob mesta u rasadniku ${d.naziv}`);
                console.log('gotovo');
            }).catch(err=>{
                res.json('greska');

            })
        }
    });
});

/*povecati broj slob mesta posle dana odmora*/
ruter.route('/povecajbrojslobmesta/:id').get((req,res)=>{
    Rasadnik.findById(req.params.id, (err,data)=>{
        if(err) {
            console.log(err);
        }
        if(data) {
            data.br_slobodnih_mesta++;
            data.save().then(d=>{
                res.json(` bovecan broj slob mesta u rasadniku ${d.naziv}`);
                console.log('gotovo');
            }).catch(err=>{
                res.json('greska');

            })
        }
    });
});

/*magacin komp OVDE RADI*/
ruter.route('/zasadi').post((req,res)=>{
    Magacin.findOne({korime:req.body.korime,proizvodjac:req.body.proizvodjac,tip:req.body.tip,
    rasadnik:req.body.rasadnik,ime_sadnice:req.body.ime_sadnice}, (err,data)=>{
        if(err){
            console.log(err);
        }
        if(data){
            data.kolicina--;
            data.save().then(d=>{
                //res.json(d);
                console.log('dobro je');
            }).catch(err=>{
                console.log(err);
            });
            const nova={
                korime:data.korime,
                naziv:data.rasadnik,
                progres:0,
                proizvodjac:data.proizvodjac,
                ime_sadnice:data.ime_sadnice,
                s:false //dodato
            }
            let sad= new Sadnice(nova);
            sad.save().then(d=>{
                res.json(d);
                console.log('dodala sm novu sadnicu u rasadnik');
            }).catch(err=>{
                console.log(err);
            });
            
        } 
        Magacin.findOneAndDelete({kolicina:0},(err,data)=>{
            if(data){
                console.log("izbrisao sam");
            }else {
                console.log('nema u magacinu sa 0 kolicinom');
            }
        });
    });
    Rasadnik.findOne({korime:req.body.korime,naziv:req.body.rasadnik},(err,data)=>{
        if(err){
            console.log(err);
        }
        if(data){
            data.br_sadnica++;
            data.br_slobodnih_mesta--;
            data.save().then(d=>{
                //res.json(d);
                console.log('promenila sam br sad i br slob mesta u rasarniku');
            }).catch(err=>{
                console.log(err);
            });
        }

    });
});

/*komp online prod*/
/*prikazati sva preduzeca:svi ovi koji mogu da se loguju*/
ruter.route('/svapreduzeca').post((req,res)=>{
    LogPred.find((err,data)=>{
        if(err) {
            console.log(err);
        }
        if(data) {
            res.json(data);
            console.log('uspesno!');
        }
    });
});

/*ucitati sve proizvode svih preduzeca*/
ruter.route('/ucitajsveproizvode').get((req,res)=>{
    Proizvodi.find((err, data)=>{
        
            if(err) {
                console.log(err);
            }
            if(data) {
                res.json(data);
                console.log(`ucitao sam proizvode svih preduzeca preduzeca`)
            }else{
                res.json('greska!!')
            }  
    })
});

/*ucitati sve proizvode odredjenog preduzeca*/
ruter.route('/ucitajproizvode').post((req,res)=>{
    Proizvodi.find({proizvodjac:req.body.proizvodjac}, (err,data)=>{
        if(err) {
            console.log(err);
        }
        if(data) {
            res.json(data);
            console.log(`ucitao sam proizvode preduzeca ${data[0].proizvodjac} `)
        }else{
            res.json('niste izabrali preduzece!')
        }
    });
});

/*ucitati detaljan prikaz odredjenog proizvoda*/
ruter.route('/detaljanprikaz').post((req,res)=>{
    Komentari.find({id_sadnice:req.body.id_sadnice}, (err,data)=>{
        if(err) {
            console.log(err);
        }
        if(data) {
            res.json(data);
        }
    });
});

/*narucivanje prozvoda :DODAJ NOVU BAZU */ 
ruter.route('/naruci').post((req,res)=>{
    let br=0;
    Porudzbina.find((err,data)=>{
        if(err) {
            console.log(err);
        }
        if(data) {
            
            br=data[0].id_por
            data.forEach(d=>{
                if(d.id_por>br) {
                    br=d.id_por;
                }
            });
            br++;
            console.log(br);
            req.body.proizv.forEach(el=>{
                let posl= new Poslovanje(el);
                posl.datum=new Date();
                posl.id_por=br;
                posl.save().then(e=>{
                    console.log(`sadnica ${e.ime_sadnice} uspesno sacuvana u poslovanju`);
                }).catch(err=>{
                    console.log(err);
                });
            });

            let por=new Porudzbina(req.body.proizv);
            por.id_por=br;
            por.korime=req.body.korime;
            por.rasadnik=req.body.rasadnik;
            por.datum=new Date();
            let i=0;
            req.body.proizv.forEach(e=>{
                por.proizv[i++]=e;
            })

                por.save().then(dd=>{
                    if(dd) {
                        console.log(dd);
                    }
                }).catch(err=>{
                    if(err) {
                        res.json('greska');
                    }
                });
                req.body.proizv.forEach(el => {
                    Proizvodi.findOne({ime_sadnice:el.ime_sadnice,proizvodjac:el.proizvodjac}, (err,pr)=>{
                        if(err) {
                            console.log(err);
                        }
                        if(pr){
                            pr.kolicina-=el.kolicina;
                            pr.kolicina>0?pr.kolicina:0;

                            pr.save().then(dd=>{
                                console.log(`smanjena kolicina proizvoda ${dd.ime_sadnice} na stanju`);
                            }).catch(err=>{
                                console.log(err);
                            });
                        }
                    });
                });
        
            res.json(`porudzbina ${br} je obradjena`);
        }
    });
    
});

/*ostavljanje komentara:*/
ruter.route('/ostavikom').post((req,res)=>{ 
    //prvo ispitujem da li je vec komentarisao posto ima pravo samo jednom
    Komentari.findOne({korime:req.body.korime,id_sadnice:req.body.id_sadnice},(err,data)=>{
        if(err) {
            console.log(err);
        }
        if(data) {
            res.json(`korisnik ${data.korime} je vec ostavio komentar za ovaj proizvod`);
            console.log('ne moze dva puta jedan korisnik daa ostavi kom');
        }else{
            //krece pretraga da vidimo da li je uopste porucivao dati pr
          
            Magacin.findOne({korime:req.body.korime,proizvodjac:req.body.proizvodjac,tip:req.body.tip,
                ime_sadnice:req.body.ime_sadnice},(err,d1)=>{
                    if(err) {
                        console.log(err);
                    }
                    if(d1) {
                        //ima proizvod moze da ostavi kom
                        let kom=new Komentari();
                        kom.komentar=req.body.komentar;
                        kom.korime=req.body.korime;
                        kom.id_sadnice=req.body.id_sadnice;
                        kom.pocena=req.body.pocena;

                        kom.save().then(dd1=>{
                            console.log(`komentar korisnika ${dd1.korime} uspesno dodat`);
                            Komentari.find({id_sadnice:req.body.id_sadnice},(err,dd3)=>{
                                if(err) {
                                    console.log(err);
                                }
                                if(dd3) {
                                    let o=0;
                                    dd3.forEach(k=>{
                                        o+=k.pocena;
                                    });
                                    o=o/dd3.length;
                                    Proizvodi.findById(req.body.id_sadnice,(err,dd4)=>{
                                        if(err) {
                                            console.log(err);
                                        }
                                        if(dd4) {
                                            dd4.ocena=o;
                                            dd4.save().then(dd5=>{
                                                res.json(`komentar korisnika ${req.body.korime} uspesno dodat i izr pros ocena`);
                                            }).catch(err=>{
                                                res.json(`greska`);
                                            });
                                        }
                                    });
                                }
                            });
                        }).catch(err=>{
                            res.json(`greska`);
                        });


                    }else {
                        
                        Sadnice.findOne({korime:req.body.korime,proizvodjac:req.body.proizvodjac,ime_sadnice:req.body.ime_sadnice}, (err,d2)=>{
                                if(err) {
                                    console.log(err);
                                }
                                if(d2) {
                                //ima proizvod moze da ostavi kom
                                    let kom=new Komentari();
                                    kom.komentar=req.body.komentar;
                                    kom.korime=req.body.korime;
                                    kom.id_sadnice=req.body.id_sadnice;
                                    kom.pocena=req.body.pocena;

                                    kom.save().then(dd2=>{
                                        console.log(`komentar korisnika ${dd2.korime} uspesno dodat`);
                                        Komentari.find({id_sadnice:req.body.id_sadnice},(err,dd7)=>{
                                            if(err) {
                                                console.log(err);
                                            }
                                            if(dd7) {
                                                let o=0;
                                                dd7.forEach(k=>{
                                                    o+=k.pocena;
                                                });
                                                o=o/dd7.length;
                                                Proizvodi.findById(req.body.id_sadnice,(err,dd6)=>{
                                                    if(err) {
                                                        console.log(err);
                                                    }
                                                    if(dd6) {
                                                        dd6.ocena=o;
                                                        dd6.save().then(dd8=>{
                                                            res.json(`komentar korisnika ${req.body.korime} uspesno dodat i izr pros ocena`);
                                                        }).catch(err=>{
                                                            res.json(`greska`);
                                                        });
                                                    }
                                                });
                                            }
                                        });
                                    }).catch(err=>{
                                        res.json(`greska`);
                                    });

                                }else{
                                    if(!res.headersSent) {
                                        res.json(`korisnik ${req.body.korime} ne poseduje pravo na komentarisanje datog proizvoda!`);
                                    }
                                }
                            });
                    }
            });
        }
    });
});

/*komponenta preduzece*/
/*promena loznke preduzeca*/
ruter.route('/promenilozpred').post((req,res)=>{
    LogPred.findOne({skr:req.body.skr},(err,data) =>{
        if(err) {
            res.json(err);
        }
        if(data) {
            if(data.lozinka==req.body.slozinka) {
                data.lozinka=req.body.nlozinka;
                data.save().then(d=>{
                    if(d) {
                        res.json(`uspesna promena lozinke preduzeca ${d.skr}`)
                    }
                }).catch(e=>{
                    if(e) {
                        res.json(e);
                    }
                });
            }else {
                res.json(`stara lozinka nije ispravna ${data.skr}`)

            }
        }
    });
});
/*ucitavamo sve porudzbine i na frontu razvrstavamo*/
ruter.route('/ucitajporudzbinepreduzeca').post((req,res)=>{
    Porudzbina.find( (err,data)=>{
        if(err) {
            console.log(err);
        }
        if(data){

            res.json(data);
            console.log('pronasla porudzbine!');
        }else {
            if(!res.headersSent) {
                res.json(`za preduzece ${req.body.skr} ne postoje porudzbine`);
            }
        }
    });
});

/*odbijanje porudzbine */
ruter.route('/odbijporudzbinu').post((req,res)=>{
    Porudzbina.findById(req.body._id, (err,data)=>{
        if(err) {
            console.log(err);
        }
        if(data) {
            let ind=0,br=0;
            data.proizv.forEach((el,i)=>{
                if(el.ime_sadnice==req.body.proizvodZaBrisanje.ime_sadnice &&
                    el.tip==req.body.proizvodZaBrisanje.tip) {
                        br++; if(br==1) {ind=i}
                }
            });
            if(br>0){
                data.proizv.splice(ind,1);

            }
            if(data.proizv.length==0) {
                data.remove().then(izb=>{
                    console.log('izbrisana porudzbina iz cele baze jer nema vise elem');
                    res.json('uspesno obijena porudzbina');
                });
            }else{
                data.save().then(d=>{
                    if(d){
                        res.json('uspesno obijena porudzbina');
                    }
                }).catch(err=>{
                    res.json(err);
                });
            }
            Poslovanje.findOneAndDelete({id_por:req.body.id_por, ime_sadnice:req.body.proizvodZaBrisanje.ime_sadnice,
                proizvodjac:req.body.proizvodZaBrisanje.proizvodjac, datum:req.body.datum,tip:req.body.proizvodZaBrisanje.tip},(err, data)=>{
                    if(err) {
                        console.log(err);
                    }
                    if(data) {
                        console.log(`uspesno izbrisano iz poslovanja ${data.ime_sadnice} sa porudzbine ${data.id_por}`);
        
                    }
                });


            Proizvodi.findOne({proizvodjac:req.body.proizvodZaBrisanje.proizvodjac, ime_sadnice:req.body.proizvodZaBrisanje.ime_sadnice,
            tip:req.body.proizvodZaBrisanje.tip}, (err, pr)=>{
                if(err) {
                    console.log(err);
                }
                if(pr) {
                    pr.kolicina+=req.body.proizvodZaBrisanje.kolicina;
                    pr.save().then(kon=>{
                        if(kon) {
                            console.log(`vratila sam stanje u online prod za proizvod ${kon.ime_sadnice} ${kon.proizvodjac}`);
                        }
                    });
                }
            });
        }
    });
});

/*povlacenje odr proizvoda iz prodaje*/ 
ruter.route('/povuciprodaju').post((req,res)=>{
    Proizvodi.findByIdAndDelete(req.body._id, (err, data)=>{
        if(err) {
            res.json(err);
        }
        if(data) {
            res.json(`uspesno izbrisan proizvod ${data.ime_sadnice}`);
        }
    })
});

/*provera broja kurira*/
ruter.route('/proverakurira').post((req,res)=>{
    LogPred.findOne({skr:req.body.skr}, (err,data)=>{
        if(err) {
            console.log(err);
        }
        if(data){
            if(data.kurir<=0) {
                
                res.json('NA CEKANJU');
            }else {
                //sada deo koji mi smanjuje broj kurira
                data.kurir--;
                data.save().then(dd=>{
                    if(dd){
                        res.json('MOZE');
                    }
                }).catch(err=>{
                    res.json(err);
                })
            }
        }
    });
});

/*prihvatanje porudzbine */
ruter.route('/prihvatipor').post((req,res)=>{

        //da  izbrisemo dadti proizv iz porudzbine 
        //prvo nadji porudzbinu

        Porudzbina.findById(req.body._id, (err,por)=>{
            if(err) {
                console.log(err);
            }
            if(por) {
                                
                let ind=0,br=0;
                por.proizv.forEach((el,i)=>{
                    if(el.ime_sadnice==req.body.proizvodZaSlanje.ime_sadnice &&
                        el.tip==req.body.proizvodZaSlanje.tip &&el.proizvodjac==req.body.skr) {
                            br++; if(br==1) {ind=i}
                    }
                });
                if(br>0){
                    por.proizv.splice(ind,1);
                    
                } 
                if(por.proizv.length==0) {
                        por.remove().then(izb=>{
                            console.log('izbrisana porudzbina iz cele baze jer nema vise elem')
                            res.json('uspesno prihvacena porudzbina');
                        });
                }else {
                        por.save().then(d=>{
                            if(d){
                                console.log('uspesno privacena porudzbina');
                                res.json('uspesno prihvacena porudzbina');
                            }
                        }).catch(err=>{
                                res.json(err);
                        });
                }

            }
        });
        Magacin.findOne({korime:req.body.korime, rasadnik:req.body.rasadnik, proizvodjac:req.body.skr, ime_sadnice:req.body.proizvodZaSlanje.ime_sadnice
        ,tip:req.body.proizvodZaSlanje.tip}, (err,data)=>{
            if(err) res.send(err);
            if(data) {
                data.kolicina+=req.body.proizvodZaSlanje.kolicina;
                data.save().then(d=>{
                    if(d) {
                        console.log(`nova kolicina je ${d.kolicina}`)

                    }
                }).catch(err=>{
                    if(err) console.log(err);
                })
            }else {
                let novo=new Magacin();
                novo.korime=req.body.korime;
                novo.rasadnik=req.body.rasadnik;
                novo.proizvodjac=req.body.skr;
                novo.ubrzanje=req.body.proizvodZaSlanje.ubrzanje;
                novo.ime_sadnice=req.body.proizvodZaSlanje.ime_sadnice;
                novo.tip=req.body.proizvodZaSlanje.tip;
                novo.kolicina=req.body.proizvodZaSlanje.kolicina;
    
                novo.save().then(d=>{
                    console.log(`prebacio sam proizvod u magacin korisnika ${d.korime} za rasadnik ${d.rasadnik}`)
                }).catch(er=>{
                    console.log(er);
                });
            }
        });
  
});


/*kurir zavrsio isporuku I */
ruter.route('/vratikurira').post((req,res)=>{
    LogPred.findOne({skr:req.body.skr}, (err, data)=>{
        if(err) {
            res.json('greska');
        }
        if(data) {
            data.kurir++;
            data.save().then(dd=>{
                if(dd){
                    res.json(dd.kurir)
                    console.log('kurir se vratio');
                }
            }).catch(err=>{
                res.json(err);
            });
        }
    });

});
/*pronalazenje mesta gde se nalazi preduzece */
ruter.route('/sedistepreduzeca').post((req,res)=>{
    LogPred.findOne({skr:req.body.skr},(err,data)=>{
        if(err) {
            console.log(err);
        }
        if(data) {
            res.json(data.mesto);
        }
    });
});

/*pronalazenje mesta rasadnika*/
ruter.route('/pronadjimrasadnika').post((req,res)=>{
    Rasadnik.findOne({korime:req.body.korime,naziv:req.body.naziv}, (err, data)=>{
        if(err) {
            res.json(err);
        }
        if(data) {
            res.json(data.mesto);
        }
    });
});
/*radi za komponentu stepper  */
ruter.route('/dodajproizvod').post((req,res)=>{
    Proizvodi.find({proizvodjac:req.body.proizvodjac},(err,data)=>{
        if(err) {
            console.log(err);
        }
        if(data) {
            let flag=0;
            data.forEach(el=>{
                if(el.ime_sadnice==req.body.ime_sadnice && el.tip==req.body.tip) {
                    flag=1;
                } 
            })
            if(flag) {
                res.json("vec postoji proizvod ovog proizvodjaca sa datim imenom");
            }else {
                let pro=new Proizvodi(req.body);
                pro.save().then(d=>{
                    res.json('uspesno!');
                });
            }

        }
    });
});

/*izracunaj porudzbine po danu za odr poreduzece*/
ruter.route('/porpodanu').post((req,res)=>{
    const days=31; const hours=24; const mins=60; const sek=60; const milisek=1000;
    let milis_time= new Date().getTime() -days*hours*mins*sek*milisek;
 
    Poslovanje.aggregate([
        {$match:{datum: {$gte: new Date(new Date(milis_time)-new Date(milis_time).getTimezoneOffset()*60000)}}},
        {$match: {proizvodjac:{$eq:req.body.proizvodjac}}},
        {$group: {
            _id: { godina:{ $year: '$datum'}, mesec: {$month:'$datum'}, dan:{$dayOfMonth:'$datum'}},
            count: {$sum:1}
        }},
        {$sort: {_id:1}}
    ], (err, data)=>{
        if(err) { res.json(err);}
        if(data) {
            console.log(data)
            res.json(data)
        }
    })

    
});



app.use('/',ruter);

app.listen(4000, ()=> console.log('express server radi!'));