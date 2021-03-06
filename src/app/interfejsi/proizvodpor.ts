import { Proizvod } from './priozvod';

export interface ProizvodPor extends Proizvod{
    id_por?:number;
    korime?:string;
    rasadnik?:string;
    datum?:Date;

}