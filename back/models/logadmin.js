import mongoose, { Schema } from 'mongoose';

const sema=mongoose.Schema;

let LogAdmin= new sema({
    korime: 
        {
            type:String
        },
    lozinka:
        {
            type:String
        }
    

});

export default mongoose.model('LogAdmin', LogAdmin,'loginadmin');