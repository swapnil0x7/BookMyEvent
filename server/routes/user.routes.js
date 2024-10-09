import express from "express";
import {
  getProfile,
  login,
  register,
} from "../controllers/user.controllers.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", getProfile);

export default router;
