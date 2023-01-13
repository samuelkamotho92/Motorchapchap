const catchAsync = require('../utility/catchAsync');
const claim = require('../models/claimForm');
const AppError = require('../utility/AppError')
exports.getClaims = catchAsync(async(req,resp,next)=>{
const getAllclaims = await claim.find();
resp.statu(200).json({
    status:'success',
    data:{
        getAllclaims
    }
})
});

exports.sendClaim = catchAsync(async(req,resp,next)=>{
const addClaim = await claim.create(req.body);
    if(!addClaim){
        return next(new AppError('claim not submitted try again',400))
    }
resp.status(200).json({
    status:'success',
    data:{
        addClaim
    }
})
});

exports.getOneClaim =  catchAsync(async (req,resp,next)=>{
    const id = req.params.id;
    const getOneClaim = await claim.findById(id);
    if(!getOneClaim){
        return next(new AppError('no document found',404));
    }
    resp.status(200).json({
        status:'success',
        data:{
            getOneClaim
        }
    })
})

exports.updateClaim = catchAsync(async (req,resp)=>{
    const id = req.params.id;
    const updatedClaim = await claim.findByIdAndUpdate(id,req.body,{
        new:true,
        runValidators:true
    });
    if(!updatedClaim){
        return next(new AppError('no document found',404));
    }
resp.status(201).json({
        status:"success",
        data:{
            updatedClaim
        }
    })
})

exports.deleteClaim = catchAsync(async (req,resp)=>{
    const id = req.params.id;
    const deletedClaim = await claim.findByIdAndDelete(id);
    if(!deletedClaim){
        return next(new AppError('no document found',404));
    }
    console.log(deletedClaim);
    resp.status(204).json({
        status:'deleted',
        data:[]
    })
})