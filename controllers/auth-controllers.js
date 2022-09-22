const ErrorResponse = require("../utils/error-response");
const User = require("../models/user-model");

/**
 * @desc    REGISTER USER
 * @route   POST /api/v1/auth/register
 * @access  public
 */
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  // if (password !== confirmPassword) {
  //   throw new ErrorResponse("Password does not match", 400);
  // }

  const user = await User.create({ name, email, password });

  sendTokenResponse(user, 200, res);
};

/**
 * @desc    LOGIN USER
 * @route   POST /api/v1/auth/login
 * @access  public
 */
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ErrorResponse("Please provide an email and password", 400);
  }

  const user = await User.findOne({ where: { email } });
  if (!user) throw new ErrorResponse("User not found", 404);

  const isPasswordMatch = await user.matchPassword(password);
  if (!isPasswordMatch) throw new ErrorResponse("Invalid email and password", 401);

  sendTokenResponse(user, 200, res);
};

/**
 * @desc    LOGOUT USER
 * @route   GET /api/v1/auth/logout
 * @access  private
 */
exports.logoutUser = async (req, res) => {
  res.cookie("token", "logout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({ success: true, message: "logout success" });
};

/**
 * @desc    GET ME
 * @route   GET /api/v1/auth/me
 * @access  private
 */
exports.getMe = async (req, res) => {
  const user = await User.findOne({ where: { id: req.user.id } });

  res.status(200).json({ success: true, data: user });
};

/**
 * @desc Get token from model, create cookie and send response
 */
const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getJwtToken(); // Create token

  const options = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") options.secure = true;

  res.status(statusCode).cookie("token", token, options).json({ success: true, token });
};
