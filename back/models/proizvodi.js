import mongoose from 'mongoose';

const sema=mongoose.Schema;

let Proizvodi= new sema({
    proizvodjac:{
        type:String
    },
    ocena:
    {
        type:Number
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
    }
});

export default mongoose.model('Proizvodi',Proizvodi,'proizvodi');