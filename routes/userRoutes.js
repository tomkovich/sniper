const User = require("../models/User");
const AppError = require("../utils/AppError");
const createSendToken = require("../utils/createSendToken");
const { protect } = require("../utils/protect");
const { uploadImages, resizeImages } = require("../utils/upload");
const Email = require("../utils/Email");
const crypto = require("crypto");

module.exports = (app) => {
  app.post("/api/signup", async (req, res, next) => {
    try {
      if (await User.findOne({ email: req.body.email }))
        return next(new AppError("User already exists"));

      if (req.body.password !== req.body.confirmPassword) {
        return next(new AppError("Password are not the same"));
      }

      const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
      });

      createSendToken(newUser, 201, res);
    } catch (err) {
      if (err.name == "ValidationError") {
        next(new AppError(err.errors.password.message, 402));
      } else {
        console.error(err);
        res.status(500).json(err);
      }
    }
  });

  app.post("/api/login", async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email || !password)
        return next(new AppError("Please provide email or password!", 400));

      const user = await User.findOne({ email }).select("+password");
      console.log(password);
      console.log(user.password);
      if (!user || !(await user.correctPassword(password, user.password)))
        return next(new AppError("Incorrect email or password", 401));

      createSendToken(user, 200, res);
    } catch (err) {
      console.log(err);
    }
  });

  app.get("/api/me", protect, async (req, res, next) => {
    try {
      if (req.user) {
        return res.status(200).json({
          status: "success",
          data: req.user,
        });
      }
      return next(new AppError("Invalid token", 404));
    } catch (err) {
      console.log(err);
    }
  });

  app.get("/api/logout", (req, res) => {
    res.cookie("jwt", "loggedout", {
      httpOnly: true,
      expires: new Date(Date.now() + 10 * 1000),
    });

    res.status(200).json({ status: "success" });
  });

  app.get("/api/user/:id", async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id);

      if (!user)
        return next(new AppError("Not found document with that ID!", 404));

      res.status(200).json({
        status: "success",
        data: {
          data: user,
        },
      });
    } catch (err) {
      console.log(err);
    }
  });

  app.patch(
    "/api/user/:id",
    uploadImages,
    resizeImages,
    async (req, res, next) => {
      try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
          runValidators: true,
        }).select("+password");

        if (!user)
          return next(new AppError("Not found document with that ID!", 404));

        res.status(200).json({
          status: "success",
          data: {
            data: user,
          },
        });
      } catch (err) {
        console.log(err);
      }
    }
  );

  app.patch("/api/user/updatePassword/:id", async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id).select("+password");

      if (
        !(await user.correctPassword(req.body.currentPassword, user.password))
      ) {
        return next(new AppError("Current password is wrong"), 401);
      }

      user.password = req.body.password;
      user.confirmPassword = req.body.confirmPassword;
      await user.save();

      createSendToken(user, 201, res);

      next();
    } catch (err) {
      console.log(err);
    }
  });

  app.patch(`/forgotPassword`, async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return next(new AppError("There is not user email", 404));
    }

    const newPassword = await user.createPassword();
    await user.save({ validateBeforeSave: false });

    try {
      await new Email(user, newPassword).sendPasswordReset();

      res.status(200).json({
        status: "success",
        message: "New password has created",
      });
    } catch (err) {
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;

      await user.save({ validateBeforeSave: false });
      console.log(err);
      return next(
        new AppError(
          "There was an error sending the email. Please try again",
          500
        )
      );
    }
  });
};
