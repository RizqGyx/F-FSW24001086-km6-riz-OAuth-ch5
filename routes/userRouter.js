const router = require("express").Router();
const { User } = require("../models");

const Users = require("../controllers/userController");
const upload = require("../middlewares/uploader");
const autentikasi = require("../middlewares/authenticate");
const checkRole = require("../middlewares/checkRole");

router.get(
  "/",
  autentikasi,
  checkRole("Manager", "Admin", "Staff"),
  Users.findUsers
);
router.get(
  "/:search",
  autentikasi,
  checkRole("Manager", "Admin", "Staff"),
  Users.findUsersByFilter
);
router.get(
  "/user/:id",
  autentikasi,
  checkRole("Manager", "Admin", "Staff"),
  Users.findUserById
);
router.patch("/edit/:id", autentikasi, Users.updateUser);
router.delete(
  "/delete/:id",
  autentikasi,
  checkRole("Manager", "Admin", "Staff"),
  Users.deleteUser
);

module.exports = router;
