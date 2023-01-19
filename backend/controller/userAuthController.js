const User = require("../models/userAuthModel");
const catchAsync = require("../utility/catchAsync");
const AppError = require("../utility/AppError");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utility/Email");
const crypto = require("crypto");
let maxAge = 30 * 24 * 60 * 60;
const createJWT = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

//error handling
const handleError = (err) => {
  console.log(err.message, err.code);
  //object to be updated
  let errors = {
    email: "",
    password: "",
    passwordConfirm: "",
    nationalID: "",
    firstname: "",
    lastname: "",
  };
  if (err.message === "incorrect email") {
    errors.email = "email not regesterd";
  }
  if (err.message === "incorrect password") {
    errors.password = "password not regesterd";
  }
  if (err.code === 11000) {
    const getKey = Object.keys(err.keyValue);
    console.log(getKey);
    const myValue = getKey[0];
    console.log(myValue);
    if (myValue) {
      errors[myValue] = `Duplicate value for ${myValue} enter unique one`;
    }
    return errors;
  }
  if (err.message.includes("User validation failed")) {
    Object.values(err.errors).forEach((errAuth) => {
      console.log(errAuth);
      errors[errAuth.properties.path] = errAuth.properties.message;
    });
  }
  return errors;
};
exports.userSignUp = catchAsync(async (req, resp) => {
  try {
    const data = req.body;
    console.log(data);
    const {
      firstname,
      lastname,
      email,
      password,
      passwordConfirm,
      nationalID,
    } = data;
    const userData = await User.create({
      firstname,
      lastname,
      email,
      password,
      passwordConfirm,
      nationalID,
    });
    console.log(userData);
    const id = userData._id;
    const tk = createJWT(id);
    resp.cookie("motorchapchap", tk, { httpOnly: true, maxAge: maxAge * 1000 });
    resp.status(200).json({
      status: "success",
      mesage: "data sent succefully",
      data: {
        userData,
      },
      token: tk,
    });
  } catch (err) {
    const errMess = handleError(err);
    resp.status(404).json({
      status: "failure",
      error: errMess,
    });
    console.log(errMess, "my error is this");
  }
});

exports.userLogin = catchAsync(async (req, resp, next) => {
    try{
        const { email, password } = req.body;
        console.log(email, password);
        const getUser = await User.findOne({ email });
        const id = getUser._id;
        const tk = createJWT(id);
        resp.cookie("motorchapchap", tk, { httpOnly: true, maxAge: maxAge * 1000 });
        const correct = await getUser.correctPassword(password, getUser.password);
        if(correct){
            resp.status(200).json({
                status: "success",
                message: "user logged in",
                user:getUser,
                token: tk,
              });
        }
    }catch(err){
        const errorMess = handleError(err);
resp.status(404).json({
    status:'failure',
error:errorMess
})
    }

//   if (!email || !password) {
//     return next(new AppError("provide email and password", 400));
//   }

  console.log(correct);
//   if (!getUser || !correct) {
//     return next(new AppError("incorrect email or password", 401));
//   }

});

//user protection

exports.protectRoutes = catchAsync(async (req, resp, next) => {
  let token;
  console.log(req.headers.authorization);
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    console.log(req.headers.authorization.split(" "));
    token = req.headers.authorization.split(" ")[1];
    console.log(token);
  }
  if (!token) {
    return next(new AppError("please login , you are not authorised", 401));
  }
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  console.log(decoded);
  let currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(new AppError("User does not exist", 401));
  }
  console.log(currentUser);
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError("User recently changed password! Please log in again.", 401)
    );
  }
  req.user = currentUser;
  console.log(req.user.role, "user details");
  next();
});

exports.restrict = (...roles) => {
  return (req, resp, next) => {
    console.log(req.user.role);
    if (!roles.includes(req.user.role)) {
      return next(new AppError("User action restricted", 403));
    }
    next();
  };
};

//password reset
exports.resetTokensend = catchAsync(async (req, resp, next) => {
  //email to send the token
  const { email } = req.body;
  const getUser = await User.findOne({ email });
  console.log(getUser);
  if (!getUser) {
    return next(new AppError("user does not exist , enter another email", 404));
  }
  //generate reset
  //send to email
  const resetToken = await getUser.createdResetToken();
  console.log(resetToken);
  await getUser.save({ validateBeforeSave: false });
  const resetUrl = `${req.protocol}://localhost:3000/resetPassword`;
  console.log(resetUrl);
  const message = `sorry,we heard you lost your password, don't worry click link below`;
  try {
    await sendEmail({
      email: getUser.email,
      subject: "RESET YOUR PASSWORD",
      message,
      url: resetUrl,
    });
    resp.status(200).json({
      status: "success",
      message: "email sent successfully",
      resetToken,
    });
  } catch (err) {
    getUser.passwordResetToken = undefined;
    getUser.resetTokenExpires = undefined;
    await getUser.save({ validateBeforeSave: false });
    return next(new AppError("Oops Ooops email not sent try again", 500));
  }
  next();
});

exports.resetPassword = catchAsync(async (req, resp, next) => {
  const token = req.params.token;
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  //get the user by the token and  ensure time token has not expired
  const getUser = await User.findOne({
    passwordResetToken: hashedToken,
    resetTokenExpires: { $gt: Date.now() },
  });
  if (!getUser) {
    return next(new AppError("user is not found", 404));
  }
  if (getUser) {
    getUser.password = req.body.password;
    getUser.passwordConfirm = req.body.passwordConfirm;
    getUser.resetTokenSetAt = Date.now();
    getUser.passwordResetToken = undefined;
    getUser.resetTokenExpires = undefined;
    //validate our data
    await getUser.save({ validateBeforeSave: true });
    const token = createJWT(getUser._id);
    resp.status(200).json({
      status: "success",
      message: "password updated succesfully",
      token,
    });
  }
  next();
});

//update already logged in user password
exports.updatePassword = catchAsync(async (req, resp, next) => {
  console.log(req.user);
  const currentUser = await User.findById(req.user.id);
  if (
    !currentUser.correctPassword(req.body.currentPassword, currentUser.password)
  ) {
    return next("user does not exist", 404);
  }
  currentUser.password = req.body.password;
  currentUser.passwordConfirm = req.body.passwordConfirm;
  await currentUser.save({ validateBeforeSave: true });
  const tk = createJWT(currentUser._id);
  resp.cookie("motorchapchap", { httpOnly: true, tk, maxAge: maxAge * 1000 });
  resp.status(200).json({
    status: "success",
    data: {
      currentUser,
    },
    token: tk,
  });
});
