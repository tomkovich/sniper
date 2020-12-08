const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const { jwtSecret } = require("../config/keys");
const User = require("../models/User");

exports.protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    if (!token) {
      return next(new AppError("You are not logged in", 401));
    }

    const decodedToken = await promisify(jwt.verify)(token, jwtSecret);

    const freshUser = await User.findById(decodedToken.id);
    if (!freshUser) {
      return next(
        new AppError("This user belonging to this token does no longer exist"),
        401
      );
    }

    req.user = freshUser;
    res.locals.user = freshUser;
    next();
  } catch (err) {
    console.log(err);
  }
};
