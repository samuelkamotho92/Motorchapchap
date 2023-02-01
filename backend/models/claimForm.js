const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const claimForm = new Schema({
    carOwner:{
        type:String,
        required:[true,'please enter the car owner']
    },
    registrationNo:{
        type:String,
        required:[true,'please enter registration number']
    },
    vehicleType:{
        type:String,
        required:[true,'what is the type of car']
    },
    vehiclePurpose:{
        type:String,
        enum:['personal','psv'],
        default:'personal',
        required:[true,'please enter the purpose of vehicle']
    },
    dateSubmitted:{
        type:Date,
        default:Date.now()
    },
    status:{
        type:String,
        enum:['approved','rejected','returned','pending'],
        default:'pending'
    },
    submittedBy:{
        type:String
    }
})

const claimModel = mongoose.model('Claim',claimForm);
module.exports = claimModel;