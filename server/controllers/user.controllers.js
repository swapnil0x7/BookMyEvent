import jwt from "jsonwebtoken";
import User from "../models/user.models.js";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  try {
    const userData = req.body;
    userData.password = await bcrypt.hash(userData.password, 10);
    const user = await User.create(userData);
    return res
      .status(201)
      .send({ status: true, message: "User successfully registered!" });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Fetch user data including password
    const userData = await User.findOne({ email: email.toLowerCase() }).select(
      "+password"
    );

    // Check if user exists
    if (!userData) {
      return res
        .status(401)
        .send({ status: false, message: "Invalid credentials!" });
    }

    // Compare the plain text password with the hashed password
    const isMatch = await bcrypt.compare(password, userData.password);

    if (!isMatch) {
      return res
        .status(401)
        .send({ status: false, message: "Invalid credentials!" });
    }

    // generate a JWT token
    const token = await userData.generateJwtToken();

    // put this JWT token in cookies
    res.cookie("token", token, {
      maxAge: 2 * 24 * 60 * 60 * 1000,
    });

    // If everything is okay, send a success response
    return res.status(200).send({ status: true, message: "Login successful!" });
  } catch (error) {
    console.log(error);
  }
};

export const getProfile = async (req, res) => {
  const { token } = req.cookies;
  const tokenDetails = await jwt.verify(token, process.env.JWT_SECRET_KEY);
  const {id} = tokenDetails;
  const userDetails = await User.findById(id);
  return res.status(200).send(userDetails); 
};
