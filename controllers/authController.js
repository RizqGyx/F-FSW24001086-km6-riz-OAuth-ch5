const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const imagekit = require("../lib/imagekit");
const { Auth, User, Car } = require("../models");
const ApiError = require("../utils/apiError");

const register = async (req, res, next) => {
  try {
    let { name, email, password, city, address, phone, role } = req.body;
    email = email.toLowerCase();

    if (role != undefined || role != null) {
      role = role.toLowerCase().charAt(0).toUpperCase() + role.slice(1);
    }

    const user = await Auth.findOne({
      where: {
        email,
      },
    });

    if (user) {
      return next(new ApiError("User email already taken", 400));
    }

    const passwordLength = password <= 8;
    if (passwordLength) {
      next(new ApiError("Minimum password must be 8 character", 400));
    }

    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);

    if (role == "Admin") {
      if (req.user.role !== "SuperAdmin")
        return next(
          new ApiError(
            "Forbidden, you must have Super Admin role to make Admin account",
            403
          )
        );
    }

    const newUser = await User.create({
      name,
      address,
      city,
      phone,
      libraryId,
      role,
    });

    await Auth.create({
      email,
      password: hashedPassword,
      userId: newUser.id,
    });

    res.status(201).json({
      status: "Success",
      data: {
        email,
        newUser,
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

const registerMember = async (req, res, next) => {
  try {
    let { name, email, password, city, address, phone } = req.body;
    email = email.toLowerCase();

    const user = await Auth.findOne({
      where: {
        email,
      },
    });

    if (user) {
      return next(new ApiError("User email already taken", 400));
    }

    const passwordLength = password <= 8;
    if (passwordLength) {
      next(new ApiError("Minimum password must be 8 character", 400));
    }

    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);

    const newUser = await User.create({
      name,
      address,
      city,
      phone,
      libraryId,
    });

    await Auth.create({
      email,
      password: hashedPassword,
      userId: newUser.id,
    });

    res.status(201).json({
      status: "Success",
      data: {
        email,
        newUser,
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await Auth.findOne({
      where: {
        email,
      },
      include: ["User"],
    });
    console.log(password);
    console.log(user.password);
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign(
        {
          id: user.userId,
          username: user.User.name,
          role: user.User.role,
          email: user.email,
          shopId: user.shopId,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: process.env.JWT_EXPIRED,
        }
      );

      res.status(200).json({
        status: "Success",
        message: "Success login",
        data: token,
      });
    } else {
      next(new ApiError("wrong password or user doesn't exist", 400));
    }
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

const authenticate = async (req, res) => {
  try {
    res.status(200).json({
      status: "Success",
      data: {
        user: req.user,
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

module.exports = {
  register,
  login,
  authenticate,
  registerMember,
};
