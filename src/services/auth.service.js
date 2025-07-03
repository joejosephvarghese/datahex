const { User } = require("../models");
const bcrypt = require("bcryptjs");
const ApiError = require("../utils/apiError");
const { StatusCodes } = require("http-status-codes");

const registerUser = async ({ email, username, password, role }) => {
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 8);

  const newUser = new User({
    email,
    username,
    password: hashedPassword,
    role,
  });

  await newUser.save();

  const userObj = newUser.toObject();
  delete userObj.password;

  return userObj;
};

const findByEmail = async (email) => {
  return await User.findOne({ email }).select('+password');
};


module.exports = {
  registerUser,
  findByEmail
};