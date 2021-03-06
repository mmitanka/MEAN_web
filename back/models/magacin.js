import mongoose from 'mongoose';

const sema=mongoose.Schema;

let Magacin= new sema({
    korime:{
        type:String
    },
    rasadnik:
    {
        type:String
    },
    tip:{
        type:String
    },
    ime_sadnice:{
        type:String
    },
    proizvodjac:{
        type:String
    },
    kolicina:{
        type:Number
    },
    ubrzanje:{
        type:Number
    }
});

export default mongoose.model('Magacin',Magacin,'magacini');