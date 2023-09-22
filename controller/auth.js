const { User } = require("../service/schemas/user");
const HttpError = require("../Helpers/HttpError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { SECRET_KEY } = process.env;

const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      const error = new Error("Email in use");
      error.status = 409;
      throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      ...req.body,
      password: hashedPassword,
    });

    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      throw new HttpError(401, "Email or password is wrong");
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      throw new HttpError(401, "Email or password is wrong");
    }
    const payload = { id: user._id };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
    await User.findByIdAndUpdate(user._id, { token });

    res.status(200).json({
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getCurrent = async (req, res, next) => {
  try {
    const { email, subscription } = req.user;
    res.status(200).json({
      email,
      subscription,
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const user = await User.findByIdAndUpdate(_id, { token: "" });
    if (!user) {
      throw new HttpError(401, "Not authorized");
    }

    res.status(204).json({
      message: "No Content",
    });
  } catch (error) {
    next(error);
  }
};

const subscription = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { subscription } = req.body;
    const contact = await User.findByIdAndUpdate(
      _id,
      { subscription },
      { new: true }
    );

    if (!contact) {
      throw new HttpError(400, "Not found user");
    }

    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login, getCurrent, logout, subscription };
