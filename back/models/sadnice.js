import mongoose from 'mongoose';

const sema= mongoose.Schema;

let Sadnice= new sema({

    korime:{
        type:String
    },
    naziv: {
        type:String
    },
    proizvodjac: {
        type:String
    },
    ime_sadnice: {
        type:String
    },
    progres:{
        type:Number
    },
    s:{
        type:String
    }
});

export default mongoose.model("Sadnice", Sadnice,"sadnice");