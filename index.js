const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const passport = require("passport");
const bodyParser = require("body-parser");
const { mongodbURI } = require("./config/keys");
const globalErrorHandler = require("./controllers/errorController");
const AppError = require("./utils/AppError");
const cookieParser = require("cookie-parser");

require("dotenv").config();

require("./models/User");
require("./services/passport");

const app = express();

app.use(cookieParser());
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes.js")(app);
require("./routes/userRoutes.js")(app);
require("./routes/recipesRoutes.js")(app);
require("./routes/billingRoutes.js")(app);

app.use(globalErrorHandler);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
mongoose
  .connect(mongodbURI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log(`Server is running at ${PORT} port`);
    return app.listen(PORT);
  })
  .catch((err) => {
    console.error(err);
  });
