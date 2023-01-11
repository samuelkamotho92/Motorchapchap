const AppError = require('../utility/AppError');

const handleErrors = (err)=>{
    const message = `Invalid ${err.path} : ${err.value}`
    return new AppError(message,400)
    }
    const handDuplicateError = (err)=>{
        const myvalue = Object.keys(err.keyValue);
        let name = myvalue.toString()
        name = myvalue;
        console.log(name)
        const message = `Duplicate values for ${name} , enter unique one`;
        console.log(message)
        return new AppError(message,400)
    }
    const handleInvalidinput = (err)=>{
        const errors = Object.values(err.errors).map(el => el.message)
        const message =  `Invalid input value ${errors.join('. ')}`;
        return new AppError(message,400);
    }
    
    const handleInvalidToken = (err)=>{
      return new AppError('invalid token ,login again',401)
    }
    
    const handleExpiredToken = ()=>{
        return new AppError("Expired Token,login again",401)
    }
    
    const sendErrorProd = (err,resp)=>{
        if(err.isOperational){
            resp.status(err.statuscode).json({
                status:err.status,
                message:err.message,
            })
        }else{
            console.error(err)
            resp.status(500).json({
                status:'error',
                message:'something is very wrong',
            })
        }
    
    }
const sendErrorDev = (err,resp)=>{
    resp.status(err.statuscode).json({
        status:err.status,
        message:err.message,
        error:err
    })
}
module.exports = (err,req,resp,next)=>{
    err.statuscode = err.statuscode || 500;
    err.status = err.status || "error";
if(process.env.NODE_ENV === 'development'){
sendErrorDev(err,resp)
}else if(process.env.NODE_ENV === 'production')
{
    let error = {...err}
    if(err.name === 'CastError') error = handleErrors(error)
    if(err.code === 11000) error = handDuplicateError(error)
    if(err.name === "ValidationError") error = handleInvalidinput(error)
    if(err.name === "JsonWebTokenError") error = handleInvalidToken(error)
    if(err.name === 'TokenExpiredError') error = handleExpiredToken(error)
sendErrorProd(error,resp)
}
}