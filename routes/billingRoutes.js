const { stripeSecretKey } = require("../config/keys");
const { protect } = require("../utils/protect");

const stripe = require("stripe")(stripeSecretKey);

module.exports = (app) => {
  app.post("/api/stripe", protect, async (req, res) => {
    try {
      const customer = await stripe.customers.create({
        email: req.body.email,
      });

      await stripe.invoiceItems.create({
        customer: customer.id, // set the customer id
        amount: 500, // 25
        currency: "usd",
        description: "One-time setup fee",
      });

      req.user.credits += 5;
      const user = await req.user.save();
      res.send(user);
    } catch (err) {
      console.log(err);
    }
  });
};
