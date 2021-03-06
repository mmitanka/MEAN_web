import mongoose, { Schema } from 'mongoose';

const sema=mongoose.Schema;

let Komentari= new sema({
    korime:{
        type:String
    },
    pocena:{
        type:Number
    },
    id_sadnice:{
        type:String
    },
    komentar:{
        type:String
    }
});

export default mongoose.model('Komentari', Komentari,'komentari');