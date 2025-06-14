import mongoose from 'mongoose';

const companySchema = new mongoose.Schema({
    companyName:{
        type:String,
        required:true,
        unique:true,
    },
    description:{
        type:String,
    },
    website:{
        type:String,
    },
    location:{
        type:String,
    },
    logo:{
        type:String,
        //required:true,
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
},{timestamp:true});
const Company=mongoose.model('Company',companySchema);
export default Company;