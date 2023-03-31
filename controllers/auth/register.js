const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { randomUUID } = require("crypto");

const { User } = require("../../models/user");

const { RequestError, sendEmail, createVerifyEmail } = require("../../helpers");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw RequestError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email, { d: "identicon" });

  const verificationToken = randomUUID();

  const result = await User.create({
    email,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  const mail = createVerifyEmail(email, verificationToken);
  await sendEmail(mail);

  res.status(201).json({
    email: result.email,
    subscription: result.subscription,
  });
};

module.exports = register;
