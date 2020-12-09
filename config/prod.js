module.exports = {
  googleClientID: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  mongodbURI: process.env.MONGODB_URI,
  cookieKey: process.env.COOKIE_KEY,
  googleRedirectURI: "https://peaceful-beach-87434.herokuapp.com",
  stripePublicKey: process.env.STRIPE_PUBLIC_KEY,
  stripeSecretKey: process.env.STRIPE_SECRET_KEY,
  sendInBlueKey: process.env.SEND_IN_BLUE_KEY,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN,
};
