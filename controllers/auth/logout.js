const { User } = require("../../models/user");

const { RequestError } = require("../../helpers");

const logout = async (req, res) => {
  const { _id: id } = req.user;

  const user = await User.findById(id);
  if (!user) {
    throw RequestError(401);
  }

  await User.findByIdAndUpdate(id, { token: "" });

  res.status(204).json({ message: "No content" });
};

module.exports = logout;
