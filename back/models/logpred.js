import mongoose from 'mongoose';

const sema=mongoose.Schema;

let LogPred= new sema({
    naziv:
        {
            type:String
        },
    skr: 
        {
        type:String
        },
    lozinka:
        {
        type:String
        },
    datum_osn:
        {
            type:String
        },
    mesto:
        {
            type:String
        },
    email:
        {
            type:String
        },
    kurir:{
        type:Number
    }
});


export default mongoose.model('LogPred',LogPred,'loginpred');