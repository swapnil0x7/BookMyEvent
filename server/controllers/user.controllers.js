import User from "../models/user.models.js";

export const register = async (req, res) => {
  const userData = req.body;
  const data = await User.create(userData);
  res
    .status(201)
    .send({ status: true, message: "User successfully registered!" });
};
export const login = (req, res) => {};
export const getProfile = (req, res) => {};
