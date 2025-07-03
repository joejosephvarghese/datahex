const { User } = require("../models");

const findById = async (userId) => {
  return await User.findById(userId);
};

module.exports = {
  findById,
};
