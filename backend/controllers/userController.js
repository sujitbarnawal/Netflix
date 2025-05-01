import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    if (!fullname || !email || !password) {
      return res
        .status(401)
        .json({ message: "Please FIll all the fields", success: false });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(401)
        .json({ message: "Email already exists", success: false });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      fullname,
      email,
      password: hashedPassword,
    });
    await user.save();
    return res.status(201).json({
      message: "User registered successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: "Error in creating user", success: false });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(401)
        .json({ message: "Please fill all the fields", success: false });
    }
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res
        .status(401)
        .json({ message: "User not found", success: false });
    }

    const isMatched = await bcrypt.compare(password, existingUser.password);
    if (!isMatched) {
      return res
        .status(401)
        .json({ message: "Password doesnot match", success: false });
    }

    const token = jwt.sign(
      { userId: existingUser._id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1d",
      }
    );

    let user = {
      fullname: existingUser.fullname,
      email: existingUser.email,
    };

    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      })
      .json({
        message: `Welcome! ${user.fullname}`,
        user,
        success: true,
      });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", success: false });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res
      .status(200)
      .json({ message: "User logged out successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: "Error logging out", success: false });
  }
};
