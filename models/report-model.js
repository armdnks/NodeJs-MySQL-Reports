const { DataTypes } = require("sequelize");

const db = require("../config/database");
const generateMD5 = require("../utils/generate-md5");
const User = require("./user-model");

const Report = db.define(
  "reports",
  {
    id: {
      type: DataTypes.STRING,
      defaultValue: generateMD5(),
      allowNull: false,
      primaryKey: true,
      validate: { notEmpty: true },
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true },
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: { notEmpty: true },
    },
    userId: {
      type: DataTypes.STRING,
      defaultValue: generateMD5(),
      allowNull: false,
      validate: { notEmpty: true },
    },
  },
  {
    freezeTableName: true,
  }
);

User.hasMany(Report);
Report.belongsTo(User, { foreignKey: "userId" });

module.exports = Report;
