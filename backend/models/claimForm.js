const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const claimForm = new Schema({
    carOwner:{
        type:String,
        required:[true,'please enter the car owner']
    },
    phoneNumber:{
        type:String,
        required:[true,'please enter car owner phone number'],
        default:'07xx xxx xxx'
    
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
    amount:{
        type:String,
        enum:['5000','7500','10000','not yet paid'],
        default:'not yet paid'
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
    paymentStatus:{
        type:String,
        enum:['paid','pending','expired'],
        default:'pending'
    },
    submittedBy:{
        type:String
    },
    insuranceCover:{
        type:String,
        enum:['third party only','third party fire and theft','comprehensive'],
        default:'third party only'
    }
})

const claimModel = mongoose.model('Claim',claimForm);
module.exports = claimModel;