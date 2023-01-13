const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const InsuranceCover = new Schema ({
name:{
    type:String,
    required:[true,'please enter type of insurance cover']
},
price:{
    type:Number,
    required:[true,'please enter price'],
    default:10000
},
duration:{
    type:String,
    required:[true,'please enter the duration of isuurance cover'],
    default:'2'
},
startDate:{
    type:Date,
    default:Date.now()
},
active:{
    type:Boolean,
    default:false
}
});

const Insurancemodel = mongoose.model('Insurance',InsuranceCover);
module.exports = Insurancemodel;