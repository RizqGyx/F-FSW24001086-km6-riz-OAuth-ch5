const router = require("express").Router();
const { User } = require("../models");

const Users = require("../controllers/userController");
const upload = require("../middlewares/uploader");
const autentikasi = require("../middlewares/authenticate");
const checkRole = require("../middlewares/checkRole");
const validateRole = require("../middlewares/validateRoleRegister");

router.get(
  "/",
  autentikasi,
  checkRole("Manager", "Admin", "Staff", "Owner", "Superadmin"),
  Users.findUsers
);
router.get(
  "/:id",
  autentikasi,
  checkRole("Manager", "Admin", "Staff", "Owner", "Superadmin"),
  Users.findUserById
);
router.patch(
  "/:id",
  autentikasi,
  validateRole,
  upload.array("images"),
  Users.updateUser
);
router.delete(
  "/:id",
  autentikasi,
  checkRole("Manager", "Admin", "Staff", "Owner", "Superadmin"),
  Users.deleteUser
);

module.exports = router;
