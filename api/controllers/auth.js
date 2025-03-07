import bcrypt from "bcrypt";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import createError from "../utils/error.js" 
import dotenv from "dotenv";
dotenv.config();

export const register = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
    
        const newUser = new User({
          ...req.body,
          password: hash,
        });
    
        await newUser.save();
        res.status(200).send("User has been created.");
      } catch (err) {
        if (err.code === 11000) {
          return next(
            createError(400, "Username or email already exists. Please use unique values.")
          );
        }
        next(err);
      }
}

//login
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "User not found!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or username!"));

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    );

    const { password, isAdmin, ...otherDetails } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ details: { ...otherDetails }, isAdmin });
  } catch (err) {
    next(err);
  }
};