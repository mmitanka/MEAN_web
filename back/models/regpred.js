import mongoose from 'mongoose';


const sema=mongoose.Schema;

let RegPred= new sema ({
    naziv: {
        type:String
    },
    skr: {
        type: String
    },
    lozinka: {
        type: String
    },
    plozinka: {
        type: String
    },
    datum_osn: {
        type:String
    },
    mesto:{
        type:String
    },
    email: {
        type:String
    },
    kurir:{
        type:Number
    }

});

export default mongoose.model('RegPred', RegPred,'zahtevipred');