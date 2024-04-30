const router = require("express").Router();
const Car = require("../controllers/carController");

const upload = require("../middlewares/uploader");
const authenticate = require("../middlewares/authenticate");
const checkRole = require("../middlewares/checkRole");

router.get("/", authenticate, Car.findCars);
router.post("/", authenticate, upload.array("images"), Car.createCar);
router.get("/:id", authenticate, Car.findCarById);
router.patch("/:id", authenticate, upload.array("images"), Car.updateCar);
router.delete("/:id", authenticate, Car.deleteCar);

module.exports = router;
