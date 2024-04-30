const { User } = require("../models");
const imagekit = require("../lib/imagekit");
const ApiError = require("../utils/apiError");

const findUsers = async (req, res, next) => {
  try {
    const { name, age, city, address, phone, role, page, limit } = req.query;

    const pageNum = parseInt(page) || 1;
    const limitData = parseInt(limit) || 10;
    const offset = (pageNum - 1) * limitData;

    const whereClause = {};
    if (name) whereClause.name = name;
    if (age) whereClause.age = age;
    if (city) whereClause.city = city;
    if (address) whereClause.address = address;
    if (phone) whereClause.phone = phone;
    if (role) whereClause.role = role;

    if (req.query.search) {
      whereClause[Op.or] = {
        name: { [Op.like]: `%${req.query.search}%` },
        age: { [Op.like]: `%${req.query.search}%` },
        city: { [Op.like]: `%${req.query.search}%` },
        address: { [Op.like]: `%${req.query.search}%` },
        phone: { [Op.like]: `%${req.query.search}%` },
        role: { [Op.like]: `%${req.query.search}%` },
      };
    }

    const { count, rows: users } = await User.findAndCountAll({
      where: whereClause,
      offset,
      limit: limitData,
    });

    const totalPages = Math.ceil(count / limitData);

    res.status(200).json({
      status: "Success",
      data: {
        users,
        pagination: {
          totalData: count,
          totalPages,
          pageNum,
          limitData,
        },
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

const findUserById = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return next(
        new ApiError(`User with ID: ${req.params.id} not found`, 404)
      );
    }

    res.status(200).json({
      status: "Success",
      data: {
        user,
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

const updateUser = async (req, res, next) => {
  const { name, age, city, address, phone, role, profileImage } = req.body;
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return next(new ApiError(`User with ID ${req.params.id} not found`, 404));
    }

    await User.update(
      {
        name,
        age,
        city,
        address,
        phone,
        role,
        profileImage,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    const updatedUser = await User.findByPk(req.params.id);

    res.status(200).json({
      status: "Success",
      message: "User updated successful",
      updatedUser,
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      next(new ApiError(`User with ID ${req.params.id} not found`, 404));
    }

    await User.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json({
      status: "Success",
      message: "Successfully deleted user",
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

module.exports = {
  findUsers,
  findUserById,
  updateUser,
  deleteUser,
};
