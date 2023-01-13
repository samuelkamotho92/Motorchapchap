const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CompensationForm = new Schema({
    insuranceCoverType:{
        type:String,
        enum:['third party only','third party fire and theft','comprehensive cover'],
        required:[true,'please enter the car owner']
    },
    natureOfAccident:{
        type:String,
        required:[true,'please enter nature of accident']
    },
    stateDriver:{
        type:String,
        required:[true,'what was the state of the driver']
    },
    damageCaused:{
        type:String,
        required:[true,'please enter the purpose of vehicle']
    },
    imageWreck:{
        type:String,
        required:[true,'upload image of the wrecked vehicle']
    }
})

const compModel = mongoose.model('Compensation',CompensationForm);
module.exports = compModel;