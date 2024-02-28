const mongoose=require("mongoose");
const questionSchema=mongoose.Schema({

    sid:{
        type:mongoose.Schema.Types.ObjectId,
        //required:true,
        ref:'Users'
    },
    hyrd:{
        type:String,
        required:true
    },
    Pid:{
        type:String
    },
    Atin:{
        type:String
    },
    Aofin:{
        type:String,
        required:true
    },
    offer:{
        type:String,
        required:true
    },
    offeri:{
        type:String
    }

});
module.exports=mongoose.model('questions',questionSchema)
    



