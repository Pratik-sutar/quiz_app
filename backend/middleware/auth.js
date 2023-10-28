const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const authConfig = require("../authConfiig/auth.config");

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  var token = req.headers["access_token"];

  if (!token) {
    // return next(new ErrorHander("Please Login to access this resource", 401));
    res.status(401).send({ message: "Please Login to access this resource" });
  } else {
    const decodedData = jwt.verify(token, authConfig.tokenConfig.secret);

    req.decode = decodedData;

    next();
  }
});
