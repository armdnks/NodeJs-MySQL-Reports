const ErrorResponse = require("../utils/error-response");
const User = require("../models/user-model");

/**
 * @desc    GET ALL USERS
 * @route   GET /api/v1/users
 * @access  private admin
 */
exports.getAllUsers = async (req, res) => {
  const users = await User.findAll();
  res.status(200).json({ success: true, count: users.length, data: users });
};

/**
 * @desc    GET SINGLE USER
 * @route   GET /api/v1/users/:id
 * @access  private admin
 */
exports.getSingleUser = async (req, res) => {
  const user = await User.findOne({
    where: { id: req.params.id },
  });

  if (!user) throw new ErrorResponse("User not found", 404);

  res.status(200).json({ success: true, data: user });
};

/**
 * @desc    CREATE USER
 * @route   POST /api/v1/users
 * @access  private admin
 */
exports.createUser = async (req, res) => {
  const { name, email, password, confirmPassword, role } = req.body;

  if (password !== confirmPassword) {
    throw new ErrorResponse("Password does not match", 400);
  }

  const user = await User.create({ name, email, password, role });

  res.status(201).json({ success: true, data: user });
};

/**
 * @desc    UPDATE USER
 * @route   PUT /api/v1/users/:id
 * @access  private admin
 */
exports.updateUser = async (req, res) => {
  let user = await User.findOne({
    where: { id: req.params.id },
  });

  if (!user) throw new ErrorResponse("User not found", 404);

  const { name, email, password, confirmPassword, role } = req.body;
  if (password !== confirmPassword) {
    throw new ErrorResponse("Password does not match", 400);
  }

  user = await User.update(
    {
      name: name || user.name,
      email: email || user.email,
      password: password || user.password,
      role: role || user.role,
    },
    {
      where: { id: user.id },
    }
  );

  res.status(200).json({ success: true, data: user });
};

/**
 * @desc    DELETE USER
 * @route   DELETE /api/v1/users/:id
 * @access  private admin
 */
exports.deleteUser = async (req, res) => {
  const user = await User.findOne({
    where: { id: req.params.id },
  });

  if (!user) throw new ErrorResponse("User not found", 404);

  await User.destroy({
    where: { id: user.id },
  });

  res.status(200).json({ success: true, data: {} });
};
