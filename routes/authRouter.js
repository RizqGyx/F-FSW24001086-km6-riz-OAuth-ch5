const router = require("express").Router();

const Authenticate = require("../middlewares/authenticate");
const Auth = require("../controllers/authController");
const validateRole = require("../middlewares/validateRoleRegister");

router.post("/admin/register", Authenticate, validateRole, Auth.register);
router.post("/member", validateRole, Auth.registerMember);
router.post("/login", Auth.login);
router.get("/me", Authenticate, Auth.authenticate);

module.exports = router;
