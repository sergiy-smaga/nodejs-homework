const { BASE_URL } = process.env;

const createVerifyEmail = (email, verifyToken) => {
  return {
    to: email,
    subject: "Please verify your email",
    html: `<a  target="_blank" href="${BASE_URL}/api/users/verify/${verifyToken}">Verify your email</a>`,
  };
};

module.exports = createVerifyEmail;
