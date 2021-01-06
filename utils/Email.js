const nodemailer = require("nodemailer");

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(" ")[0];
    this.url = url;
    this.from = "Yana Tomkovich";
  }

  async send() {
    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: "macey.jacobs@ethereal.email",
        pass: "RZyJwR5crsGfFjdbZK",
      },
    });

    await transporter.sendMail({
      from: `"Fred Foo 👻" <yanaooppss@gmail.com>`, // sender address
      to: this.to, // list of receivers
      subject: "You forgot something", // Subject line
      text: "Your new password", // plain text body
      html: `Hello my friend, you forgot password? it's not a problem, take a new - ${this.url}`, // html body
    });
  }

  async sendPasswordReset() {
    await this.send("passwordReset", "Your password reset token");
  }
};
