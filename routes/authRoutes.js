const passport = require("passport");
const createSendToken = require("../utils/createSendToken");

module.exports = (app) => {
  app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      createSendToken(req.user, 200, res);
      res.redirect(`/posts`);
    }
  );
};
