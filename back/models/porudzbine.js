import mongoose, { Schema } from 'mongoose';



const sema=mongoose.Schema;

let Porudzbina= new sema({
    //tip subsema da bude
    proizv:[new Schema({
        proizvodjac:String,
        tip:String,
        ime_sadnice:String,
        kolicina:Number,
        ubrzanje:Number

    },{_id: false})],
    datum: {type:Date},
    rasadnik: {type:String},
    korime:{type:String},
    id_por:{type:Number}
});

export default mongoose.model('Porudzbina',Porudzbina,'porudzbine');