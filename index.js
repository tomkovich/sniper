const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session')
const passport = require('passport')
const { mongodbURI, cookieKey } = require('./config/keys')

require('./models/User')
require('./services/passport')

const app = express()

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [cookieKey]
  })
)

app.use(passport.initialize())
app.use(passport.session())

require('./routes/authRoutes.js')(app)
const PORT = process.env.PORT || 5000

mongoose.connect(mongodbURI,   
  {
    useUnifiedTopology: true,
    useNewUrlParser: true
  }
)
.then(() => {
    console.log(`Server is running at ${PORT} port`) 
    return app.listen(PORT);
})
.catch((err) => {
  console.error(err);
});