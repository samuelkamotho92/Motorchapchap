const catchAsync = require('../utility/catchAsync');
const compensate = require('../models/compensation');
const AppError = require('../utility/AppError')
exports.getClaims = catchAsync(async(req,resp,next)=>{
const getAllclaims = await compensate.find();
resp.statu(200).json({
    status:'success',
    data:{
        getAllclaims
    }
})
});

exports.sendCompensate = catchAsync(async(req,resp,next)=>{
const addCompensate = await compensate.create(req.body);
    if(!addCompensate){
        return next(new AppError('claim not submitted try again',400))
    }
resp.status(200).json({
    status:'success',
    data:{
        addCompensate
    }
})
});

exports.getOneCompensate =  catchAsync(async (req,resp,next)=>{
    const id = req.params.id;
    const getOneComp = await compensate.findById(id);
    if(!getOneComp){
        return next(new AppError('no document found',404));
    }
    resp.status(200).json({
        status:'success',
        data:{
            getOneComp
        }
    })
})

exports.updateCompensate = catchAsync(async (req,resp)=>{
    const id = req.params.id;
    const updateComp = await compensate.findByIdAndUpdate(id,req.body,{
        new:true,
        runValidators:true
    });
    if(!updateComp){
        return next(new AppError('no document found',404));
    }
resp.status(201).json({
        status:"success",
        data:{
            updateComp
        }
    })
})

exports.deleteCompensate = catchAsync(async (req,resp)=>{
    const id = req.params.id;
    const deletedComp = await compensate.findByIdAndDelete(id);
    if(!deletedComp){
        return next(new AppError('no document found',404));
    }
    console.log(deletedComp);
    resp.status(204).json({
        status:'deleted',
        data:[]
    })
})