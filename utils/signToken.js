const { jwtSecret, jwtExpiresIn } = require("../config/keys");
const jwt = require("jsonwebtoken");

const signToken = (id) => {
  return jwt.sign({ id }, jwtSecret, {
    expiresIn: jwtExpiresIn,
  });
};

module.exports = signToken;
