import { User } from "../models/user-model.js";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    const userExist = await User.findOne({ email });

    const number = await User.findOne({ phone });

    if (userExist) {
      return res.status(400).json({ messgae: "Email already exist" });
    } else if (number) {
      return res.status(401).json({ message: "Phone number already exist" });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      const newUser = await User.create({ name, phone, email, password: hash });

      res.status(200).json({
        message: newUser,
        token: await newUser.generateToken(),
        userId: newUser._id.toString(),
      });
    }
  } catch (error) {
    console.log(
      "This error is from ./controllers/auth-controller.js   ",
      error
    );
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      const pass = await bcrypt.compare(password, user.password);
      if (pass) {
        res.status(200).json({
          message: "Login Successful",
          token: await user.generateToken(),
          userId: user._id.toString(),
        });
      }
    }
  } catch (error) {
    console.log(
      "This error is from /controllers/auth-controller.js    ",
      error
    );
  }
};

export const user = async (req, res) => {
  try {
    const userData = req.user;
    console.log(userData);
    res.status(200).json({ message: userData });
  } catch (error) {
    console.log(error);
  }
};

