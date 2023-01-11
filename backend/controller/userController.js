const { findByIdAndUpdate } = require('../models/userAuthModel');
const User = require('../models/userAuthModel');
const catchAsync = require('../utility/catchAsync');
const AppError = require('../utility/AppError')
exports.getAll = catchAsync(async (req,resp,next)=>{
        const getAllUser = await  User.find();
        resp.status(200).json({
            status:'success',
            data:{
                getAllUser
            }
        })

})

exports.getOne =  catchAsync(async (req,resp,next)=>{
        const id = req.params.id;
        const getOneUser = await User.findById(id);
        if(!getOneUser){
            return next(new AppError('no document found',404));
        }
        resp.status(200).json({
            status:'success',
            data:{
                getOneUser
            }
        })
})

exports.updateUser = catchAsync(async (req,resp)=>{
        const id = req.params.id;
        const updatedUser = await User.findByIdAndUpdate(id,req.body,{
            new:true,
            runValidators:true
        });
        if(!updatedUser){
            return next(new AppError('no document found',404));
        }
resp.status(201).json({
            status:"success",
            data:{
                updatedUser
            }
        })
})

exports.deleteUser = catchAsync(async (req,resp)=>{
        const id = req.params.id;
        const deletedUser = await User.findByIdAndDelete(id);
        if(!deletedUser){
            return next(new AppError('no document found',404));
        }
        console.log(deletedUser);
        resp.status(204).json({
            status:'deleted',
            data:[]
        })
})