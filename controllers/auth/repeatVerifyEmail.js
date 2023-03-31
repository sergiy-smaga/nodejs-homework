const { User } = require("../../models/user");

const { RequestError, createVerifyEmail, sendEmail } = require("../../helpers");

const repeatVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw RequestError(404, "User not found");
  }

  if (user.verify) {
    throw RequestError(400, "Verification has already been passed");
  }

  const mail = createVerifyEmail(email, user.verificationToken);
  await sendEmail(mail);

  res.status(200).json({
    message: "Verification email sent",
  });
};

module.exports = repeatVerifyEmail;
