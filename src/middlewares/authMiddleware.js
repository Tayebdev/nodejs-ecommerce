const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const ErrorAPI = require("../utils/ErrorAPI");
const userModel = require("../models/user_model");

exports.verifyToken = asyncHandler(async (req, res, next) => {
  //1) check if token is exist if exist get it
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(
      new ErrorAPI(
        "You are not login, Please login to get access this route",
        401
      )
    );
  }

  //2)verify token (no happens ,no expire)
  const decoded = jwt.decode(token, process.env.ACCESS_TOKEN_SECRET);

  //3) verify user exist
  const currentUser = await userModel.findById({ _id: decoded._id });
  if (!currentUser) {
    return next(
      new ErrorAPI(
        "The user that belong to this token does no longer exist",
        401
      )
    );
  }

  //4)check user change hir password after token created
    if (currentUser.passwordChangedAt) {
    const passChangedTimestamp = parseInt(
      currentUser.passwordChangedAt.getTime() / 1000,
      10
    );
    // Password changed after token created (Error)
    if (passChangedTimestamp > decoded.iat) {
      return next(
        new ErrorAPI(
          'User recently changed his password. please login again..',
          401
        )
      );
    }
  }

  req.user = currentUser;
  next();
});

exports.allowedTo =(...roles)=>asyncHandler((req,res,next)=>{
    // 1) access roles
    // 2) access registered user (req.user.role)
    if(!roles.includes(req.user.role)){
      return next(new ErrorAPI("You are not allowed to access this route",403))
    }
    next();
})
