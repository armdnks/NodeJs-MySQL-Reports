const ErrorResponse = require("../utils/error-response");
const Report = require("../models/report-model");
const User = require("../models/user-model");

/**
 * @desc    GET ALL REPORTS
 * @route   GET /api/v1/reports
 * @access  private user || admin
 */
exports.getAllReports = async (req, res) => {
  const isAdmin = req.user.role === "admin" ? null : { userId: req.user.id };

  const reports = await Report.findAll({
    where: isAdmin,
    include: [{ model: User, attributes: ["name", "email"] }],
  });

  res.status(201).json({ success: true, cout: reports.length, data: reports });
};

/**
 * @desc    GET SINGLE REPORT
 * @route   GET /api/v1/reports/:id
 * @access  private user || admin
 */
exports.getSingleReport = async (req, res) => {
  const isAdmin = req.user.role === "admin" ? { id: req.params.id } : { id: req.params.id, userId: req.user.id };

  const report = await Report.findOne({
    where: isAdmin,
    include: [{ model: User, attributes: ["name", "email"] }],
  });

  if (!report) throw new ErrorResponse("Report not found", 404);

  res.status(200).json({ success: true, data: report });
};

/**
 * @desc    CREATE NEW REPORT
 * @route   POST /api/v1/reports
 * @access  private user || admin
 */
exports.createReport = async (req, res) => {
  const isAdminID = req.user.role === "admin" ? req.body.userId : req.user.id;
  req.body.userId = isAdminID;

  const report = await Report.create(req.body);
  res.status(201).json({ success: true, data: report });
};

/**
 * @desc    UPDATE REPORT
 * @route   PUT /api/v1/reports/:id
 * @access  private user || admin
 */
exports.updateReport = async (req, res) => {
  const isAdmin = req.user.role === "admin" ? { id: req.params.id } : { id: req.params.id, userId: req.user.id };

  let report = await Report.findOne({ where: isAdmin });
  if (!report) throw new ErrorResponse("Report not found", 404);

  const isAdminID = req.user.role === "admin" ? req.body.userId : req.user.id;
  req.body.userId = isAdminID;

  report = await Report.update(req.body, {
    where: isAdmin,
  });

  res.status(200).json({ success: true, data: report });
};

/**
 * @desc    DELETE REPORT
 * @route   DELETE /api/v1/reports/:id
 * @access  private user || admin
 */
exports.deleteReport = async (req, res) => {
  const isAdmin = req.user.role === "admin" ? { id: req.params.id } : { id: req.params.id, userId: req.user.id };

  let report = await Report.findOne({ where: isAdmin });
  if (!report) throw new ErrorResponse("Report not found", 404);

  await Report.destroy({
    where: isAdmin,
  });

  res.status(200).json({ success: true, data: {} });
};
