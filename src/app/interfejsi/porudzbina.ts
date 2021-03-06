import { Proizvod } from './priozvod';

export interface Porudzbina {
    _id:number;
    id_por:number;
    korime:string;
    rasadnik:string;
    datum:Date;
    proizv:Proizvod[];
}