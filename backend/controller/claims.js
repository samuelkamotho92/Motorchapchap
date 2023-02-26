const catchAsync = require('../utility/catchAsync');
const claim = require('../models/claimForm');
const AppError = require('../utility/AppError')
exports.getClaims = async(req,resp)=>{
const getAllclaims = await claim.find();
resp.status(200).json({
    data:{
        getAllclaims
    }
})
};

exports.sendClaim = async(req,resp)=>{
    try{
        console.log(req.body);
        const Claim = await claim.create(req.body);
        console.log(Claim);
        resp.status(200).json({
            status:'success',
        Claim
        })
    }catch(err){
resp.status(404).json({
    status:'failure',
    error:err
})
    }

};

exports.getMyclaims = async(req,resp)=>{
    try{
        const {email} = req.body;
const getAllclaims = await claim.find({submittedBy:email});
console.log(getAllclaims);
resp.status(200).json({
    status:'success',
    data:{
        getAllclaims
    }
})
    }catch(err){
resp.status(404).json({
    status:'failure',
    error:err
})
    }
}



exports.getOneClaim = async (req,resp,next)=>{
    try{
        const id = req.params.id;
        const getOneClaim = await claim.findById(id);
        resp.status(200).json({
            status:'success',
            data:{
                getOneClaim
            }
        })
    }catch(err){
        resp.status(404).json({
            status:'failure',
            error:err
        })
    }

}

exports.updateClaim = async (req,resp)=>{
    try{
        const id = req.params.id;
        console.log(id,req.body,'from update claim');
        const updatedClaim = await claim.findByIdAndUpdate(id,req.body,{
            new:true,
            runValidators:true
        });
        console.log(id,updatedClaim);
        resp.status(201).json({
            status:"success",
            data:{
                updatedClaim
            }
        })
    }catch(err){
resp.status(404).json({
    status:'failure',
    error:err
})
    }
}
exports.getApproved = catchAsync(async(req,resp)=>{
    const query = req.query.paid;
    const myApproved = query ? await claim.find({paymentStatus:"paid"}):await claim.find({status:"approved"})
console.log(myApproved)
    try{
    resp.status(200).json({
data:{
    myApproved
}
    })
}catch(err){
    resp.status(404).json({
        status:'failure',
        error:err
    })
}
})




exports.deleteClaim = catchAsync(async (req,resp)=>{
    try
    {
        const id = req.params.id;
        const deletedClaim = await claim.findByIdAndDelete(id);
        resp.status(204).json({
            status:'deleted',
            data:[]
        })
        console.log(deletedClaim);
    }catch(err){

        resp.status(404).json({
            status:'failure',
            error:err
        })
    }
})