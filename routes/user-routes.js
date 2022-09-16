const express = require("express");
const router = express.Router();

const { getAllUsers, getSingleUser, createUser, updateUser, deleteUser } = require("../controllers/user-controllers");

router.route("/").get(getAllUsers).post(createUser);
router.route("/:id").get(getSingleUser).put(updateUser).delete(deleteUser);

module.exports = router;
