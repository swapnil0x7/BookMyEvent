import express from "express";
import UserRoutes from "./routes/user.routes.js";
import MovieRoutes from "./routes/movie.routes.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import connectToDatabase from "./config/dbConfig.js";
config();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cookieParser());

// Routes
app.use("/api/user", UserRoutes);
app.use("/api/movie", MovieRoutes);

app.use("*", (req, res) => {
  res.status(400).send("Page not found!");
});

const port = process.env.PORT | 5050;
app.listen(port, async () => {
  await connectToDatabase();
  console.log(`Server is running on port ${port}`);
});
