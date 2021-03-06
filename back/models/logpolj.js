import mongoose from 'mongoose';


const sema=mongoose.Schema;

let LogPolj= new sema ({
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

export default mongoose.model('LogPolj', LogPolj,'loginpolj');