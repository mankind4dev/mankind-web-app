import bcryptjs from "bcryptjs";
import { errorHandler } from "../ultils/error.js";
import User from "../models/user.model.js";

//req are d data we send to the api data base
//res are the receive from the database
export const test = (req, res) => {
  res.json({ message: "My test API is working good" });
};

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(
      errorHandler(403, "You are not allow to update this user. Thank You!")
    );
  }
  if (req.body.password) {
    if (req.body.password.length < 6) {
      return next(
        errorHandler(400, "Password must be at least 6 characters. Please!!!")
      );
    }
    req.body.password = bcryptjs.hashSync(req.body.password, 10);
  }

  if (req.body.username) {
    if (req.body.username.length < 7 || req.body.username.length > 20) {
      return next(
        errorHandler(
          400,
          "Username must be between 7 and 20 characters. Thank You!"
        )
      );
    }
    if (req.body.username.includes(" ")) {
      return next(
        errorHandler(400, "Username connot contain space. Thank You!")
      );
    }
    if (req.body.username !== req.body.username.toLowerCase()) {
      return next(errorHandler(400, "Username must be lowercase. Thank You!"));
    }
    if (!req.body.username.match(/^[a-zA-Z0-9]*$/)) {
      return next(
        errorHandler(
          400,
          "Username can only contain letters and numbers. Thank You!"
        )
      );
    }
  }
  try {
    const updateUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          profilePicture: req.body.profilePicture,
          password: req.body.password,
        },
      },
      { new: true }
    );
    if (!updateUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const { password, ...rest } = updateUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => { 
  if (req.user.id !== req.params.userId) {
    return next(
      errorHandler(403, "You are not allowed to delete this account!")
    );
  }
  const user = await User.findById(req.params.userId);
  if (!user) {
    return next(errorHandler(404, "User not found!"));
  }
  try {
    await User.findByIdAndDelete(req.params.userId);
    res.clearCookie("access_token")
    // res.status(200).json("User has been deleted");
    res.status(200).json("User has been deleted successfully"); 
  } catch (error) {
    next(error);
  }
};
