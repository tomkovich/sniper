const passport = require("passport");
const signToken = require("../utils/signToken");

module.exports = (app) => {
  app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      const token = signToken(req.user._id);
      res.cookie("jwt", token, {
        expires: new Date(Date.now() + 360000),
        httpOnly: true,
      });
      res.redirect(`/`);
    }
  );
};
