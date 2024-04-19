const { User } = require("../models");
const imagekit = require("../lib/imagekit");
const ApiError = require("../utils/apiError");

const findUsers = async (req, res, next) => {
  try {
    // const users = await User.findAll();
    let filters = {};

    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const users = await User.findAndCountAll({
      where: filters,
      offset,
      limit,
    });

    res.status(200).json({
      status: "Success",
      data: {
        totalItems: users.count,
        totalPages: Math.ceil(users.count / limit),
        currentPage: page,
        users: users.rows,
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

const findUsersByFilter = async (req, res, next) => {
  try {
    let filters = {};
    const { city, address, name, role } = req.query;

    if (city) {
      filters.city = city;
    }
    if (address) {
      filters.address = address;
    }
    if (name) {
      filters.name = name;
    }
    if (role) {
      filters.role = role;
    }

    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const users = await User.findAndCountAll({
      where: filters,
      offset,
      limit,
    });

    res.status(200).json({
      status: "Success",
      data: {
        users: users.rows,
        totalItems: users.count,
        totalPages: Math.ceil(users.count / limit),
        currentPage: page,
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
  const { name, city, address, phone, role, profileImage, libraryId } =
    req.body;
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return next(new ApiError(`User with ID ${req.params.id} not found`, 404));
    }

    await User.update(
      {
        name,
        city,
        address,
        phone,
        role,
        profileImage,
        libraryId,
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
      message: "successfully deleted user",
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

module.exports = {
  findUsers,
  findUserById,
  findUsersByFilter,
  updateUser,
  deleteUser,
};
