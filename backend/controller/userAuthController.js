const User = require('../models/userAuthModel');
const catchAsync = require('../utility/catchAsync');
const AppError = require("../utility/AppError");
exports.userSignUp = catchAsync(async (req,resp)=>{

    console.log(req.body);
    resp.status()
      const userData = await User.create(req.body);
      if(!userData){
        return next(new AppError(`enter the details`,400))
      }
        resp.status(200).json({
            status:'success',
            data:{
                userData
            }
        })
})

exports.userLogin = catchAsync(async (req,resp,next)=>{
        const {email,password} = req.body;
        console.log(email,password);
        if(!email || !password){
            return next(new AppError("provide email and password",400));
         }
        const getUser = await User.findOne({email})
        const correct = await getUser.correctPassword(password,getUser.password);
        console.log(correct);
        if(!getUser || !correct){
            return next(new AppError("incorrect email or password",401));
            }
                resp.status(200).json({
                    status:"success",
                   message:'user logged in'
                })
})

