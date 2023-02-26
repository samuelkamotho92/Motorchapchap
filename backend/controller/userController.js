const { findByIdAndUpdate } = require('../models/userAuthModel');
const User = require('../models/userAuthModel');
const catchAsync = require('../utility/catchAsync');
const AppError = require('../utility/AppError')
exports.getAll = catchAsync(async (req,resp,next)=>{
try{
    const query = req.query.new;
     const users = query ? await User.find().sort({ _id: -1 }).limit(5):await User.find();
        resp.status(200).json(users)
}catch(err){
    resp.status(404).json({
        status:'failure',
        error:err
    }
)
}
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
    console.log(req.body);
    try{
        const id = req.params.id;
        const updatedUser = await User.findByIdAndUpdate(id,req.body,{
            new:true,
            runValidators:true
        });
        console.log(updatedUser);
        resp.status(201).json({
            status:"success",
            user:{
                updatedUser
            }
        })
    }catch(err){
        resp.status(404).json({
            status:'failure',
            error:err
        })
    }   

})

exports.deleteUser = async (req,resp)=>{
    try
    {
        const id = req.params.id;
        console.log(id);
        const deletedUser = await User.findByIdAndDelete(id);
        console.log(deletedUser);
        resp.status(204).json({
            status:'deleted',
            data:[]
        })
    }catch(err){
        resp.status(404).json(err)

    }
}
exports.createUser = async(req,resp)=>{
    try
    {
        console.log(req.body)
const user = await User.create(req.body);
console.log(user);
// resp.status(200).json(user)
    }catch(err){
// resp.status(404).json(err)
    }
}