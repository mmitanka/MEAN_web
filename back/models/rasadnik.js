import mongoose from 'mongoose';


const sema=mongoose.Schema;

let Rasadnik=new sema ({
    korime: {
        type:String
    },
    naziv: { /*ovo aj necu jos da menja*/
        type:String
    },
    br_sadnica: {
        type:Number
    },
    mesto:{
        type:String
    },
    br_slobodnih_mesta:{
        type:Number
    },
    voda:{
        type:Number
    },
    temp:{
        type:Number
    },
    duzina:{
        type:Number
    },
    sirina:{
        type:Number
    }
});

export default mongoose.model('Rasadnik', Rasadnik,'rasadnik');