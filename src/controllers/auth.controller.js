const catchAsync = require("../utils/catchAsync");
const { authServices, tokenServices} = require("../services");
const { StatusCodes } = require("http-status-codes");

const register = catchAsync(async (req, res) => {
  const { name, email, password } = req.body;
  const role = "user";
  const newUser = await authServices.registerUser({
    name,
    email,
    password,
    role,
  });
  const token = tokenServices.generateToken(newUser.id);

  return res.status(StatusCodes.CREATED).json({
    message: "User registered successfully",
    result: { ...newUser, token },
  });
});

module.exports = {
  register,
};
