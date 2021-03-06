import mongoose from 'mongoose'

const sema= mongoose.Schema;

let Poslovanje= new sema({
    proizvodjac:{
        type:String
    },
    tip:{
        type:String
    },
    ime_sadnice:{
        type:String
    },
    kolicina:{
        type:Number
    },
    ubrzanje:{
        type:Number
    },
    datum: {
        type:Date
    },
    id_por: {
        type:Number
    }
});

export default mongoose.model("Poslovanje", Poslovanje, "poslovanje");