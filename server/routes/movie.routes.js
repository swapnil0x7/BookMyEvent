import express from "express";
import { createMovie, getMovies } from "../controllers/movie.controllers.js";
import { isLoggedIn } from "../middlewares/authentication.js";
import authorizedRoles from "../middlewares/authorization.js";

const router = express.Router();

router.post(
  "/",
  isLoggedIn,
  authorizedRoles("ADMIN", "SUPERADMIN"),
  createMovie
);
router.get("/list", getMovies);

export default router;
