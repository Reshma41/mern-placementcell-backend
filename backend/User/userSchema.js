const mongoose= require("mongoose");
const bcrypt = require('bcrypt');
const userSchema=mongoose.Schema({
    
    name:{
        type:String,
        required:true
    },
    
    contact:{
        type:Number,
        required:true
    },
  
    email:{
        type:String,
        unique:true,
        required:true,
       
        dropDups: true
    },
    password:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    stream:{
        type:String,
        required:true
    },
    Role:{
        type:String,
        enum:['student','placementofficer'],
        default:'student'
    }
    
});
userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }

    next();
});

userSchema.methods.comparePassword = async function (password) {
    const result = await bcrypt.compare(password, this.password);
    return result;
};
module.exports=mongoose.model('users',userSchema)

