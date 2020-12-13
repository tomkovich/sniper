const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const { jwtSecret } = require("../config/keys");
const User = require("../models/User");
const AppError = require("./AppError");

exports.protect = async (req, res, next) => {
  try {
    let token;
    let cookie = req.cookies?.jwt;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (cookie === "loggedout") {
      return next(new AppError("You are not logged in", 401));
    } else if (cookie) {
      token = cookie;
    } else {
      return next(new AppError("You are not logged in", 401));
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
