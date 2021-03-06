import mongoose from 'mongoose';


const sema=mongoose.Schema;

let RegPolj= new sema ({
    ime: {
        type:String
    },
    prezime: {
        type:String
    },
    korime: {
        type: String
    },
    lozinka: {
        type: String
    },
    plozinka: {
        type: String
    },
    dat_rodj: {
        type:String
    },
    mesto_rodj: {
        type:String
    },
    telefon: {
        type:String
    },
    email: {
        type:String
    },

});

export default mongoose.model('RegPolj', RegPolj,'zahtevipolj');