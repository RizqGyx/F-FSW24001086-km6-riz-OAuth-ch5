const { Car, User } = require("../models");
const ApiError = require("../utils/apiError");
const imagekit = require("../services/imagekit");
const { Op } = require("sequelize");

const findCars = async (req, res, next) => {
  try {
    const {
      manufacture,
      model,
      capacity,
      transmission,
      available,
      type,
      year,
      createdBy,
      lastUpdatedBy,
      page,
      limit,
    } = req.query;

    const pageNum = parseInt(page) || 1;
    const pageSize = parseInt(limit) || 10;
    const offset = (pageNum - 1) * pageSize;

    const whereClause = {};
    if (manufacture) whereClause.manufacture = manufacture;
    if (model) whereClause.model = model;
    if (capacity) whereClause.capacity = capacity;
    if (transmission) whereClause.transmission = transmission;
    if (available) whereClause.available = available;
    if (type) whereClause.type = type;
    if (year) whereClause.year = year;
    if (createdBy) whereClause.createdBy = createdBy;
    if (lastUpdatedBy) whereClause.lastUpdatedBy = lastUpdatedBy;

    if (req.query.search) {
      whereClause[Op.or] = {
        manufacture: { [Op.like]: `%${req.query.search}%` },
        model: { [Op.like]: `%${req.query.search}%` },
        capacity: { [Op.like]: `%${req.query.search}%` },
        transmission: { [Op.like]: `%${req.query.search}%` },
        available: { [Op.like]: `%${req.query.search}%` },
        type: { [Op.like]: `%${req.query.search}%` },
        year: { [Op.like]: `%${req.query.search}%` },
        createdBy: { [Op.like]: `%${req.query.search}%` },
        lastUpdatedBy: { [Op.like]: `%${req.query.search}%` },
      };
    }

    const { count, rows: cars } = await Car.findAndCountAll({
      where: whereClause,
      offset,
      limit: pageSize,
    });

    const totalPages = Math.ceil(count / pageSize);

    res.status(200).json({
      status: "Success",
      data: {
        totalData: count,
        transactions,
        pagination: {
          totalPages,
          pageNum,
          pageSize,
        },
      },
    });
  } catch (err) {
    return next(new ApiError(err.message, 400));
  }
};

const findCarById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const car = await Car.findByPk(id);
    if (!car) {
      throw new ApiError("Car not found", 404);
    }
    res.status(200).json({
      status: "Success",
      data: {
        car,
      },
    });
  } catch (err) {
    next(new ApiError(err.message, err.statusCode || 400));
  }
};

module.exports = {
  findCars,
  findCarById,
};
