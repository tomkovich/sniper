const { stripeSecretKey } = require("../config/keys");
const { protect } = require("../utils/protect");
const User = require("../models/User");
const AppError = require("../utils/AppError");

const stripe = require("stripe")(stripeSecretKey);

module.exports = (app) => {
  app.post("/api/stripe", protect, async (req, res, next) => {
    try {
      const customer = await stripe.customers.create({
        email: req.body.email,
      });

      await stripe.invoiceItems.create({
        customer: customer.id, // set the customer id
        amount: req.body.amount, // 25
        currency: "usd",
        description: "One-time setup fee",
      });

      const user = await User.findByIdAndUpdate(
        req.user._id,
        { ...req.body, credits: req.user.credits + req.body.amount / 100 },
        {
          new: true,
          runValidators: true,
        }
      );

      if (!user) return next(new AppError("Not found user with that ID!", 404));

      res.status(200).json({
        status: "success",
        data: user,
      });
    } catch (err) {
      console.log(err);
    }
  });
};
