const mongoose = require('mongoose');
const {isEmail} = require('validator');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const  Authschema = new Schema({
email:{
type:String,
validate:[isEmail,'please enter correct email'],
required:[true,'please enter your email'],
unique:[true,'email already in use'],
    },
firstname:{
type:String,
required:[true,'please enter your firstname']
},
lastname:{
    type:String,
    required:[true,'please enter your lastname']
},
nationalID:{
    type:Number,
    required:[true,'please enter your national id'],
    minlength:[8,'please enter 8 or more  characters'],
    unique:[true,'national id already in use']
},
password:{
    type:String,
    required:[true,'please enter a password'],
    minlength:[8,'please enter 8 or more characters']
},
passwordConfirm:{
    type:String,
    required:[true,'please enter a password'],
    minlength:[8,'please enter 8 or more characters'],
    validate:{
        validator:function (pass) {
            return pass == this.password
        },
        message:'please enter the correct password confirmation'
    }
},
role:{
    type:String,
    default:'user'
}
})

Authschema.pre('save', async function (next){
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password,10);
    this.passwordConfirm = undefined;
    next();
})

Authschema.methods.correctPassword = async function 
(pass,userpassword) {
  return  await bcrypt.compare(pass,userpassword)
}

const Authmodel = mongoose.model('User',Authschema);
module.exports = Authmodel