const router = require("express").Router();
const Car = require("../controllers/carController");

const upload = require("../middlewares/uploader");
const authenticate = require("../middlewares/authenticate");
const checkRole = require("../middlewares/superAdminCheck");

router.get("/", authenticate, Car.findCars);
router.get("/:id", authenticate, Car.findCarById);

module.exports = router;
