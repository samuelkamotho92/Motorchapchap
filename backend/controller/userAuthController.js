const User = require('../models/userAuthModel');
exports.userSignUp = async (req,resp)=>{

    console.log(req.body);
    resp.status()
    try{
      const userData = await User.create(req.body);
        resp.status(200).json({
            status:'success',
            data:{
                userData
            }
        })
    }catch(err){
resp.status(404).json({
    status:'error',
    message:err
})
    }
}

exports.userLogin = async (req,resp,next)=>{
        const {email,password} = req.body;
        console.log(email,password);
        const getUser = await User.findOne({email})
        const correct = await getUser.correctPassword(password,getUser.password);
        console.log(correct);
        try
        {

            if(correct){
                resp.status(200).json({
                    status:"success",
                   message:'user logged in'
                })
            }else{
                resp.status(400).json({
                    status:'failure',
                    message:'user does not exist'
                })
            }
        }catch(err){
            resp.status(404).json({
                status:'failure',
               message:'user not regestered'
            })
        }
   
}

