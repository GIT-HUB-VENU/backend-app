import express from "express";
import expressLayouts from "express-ejs-layouts";
import session from "express-session";
import dotenv from "dotenv";

import { storeRouter } from "./routes/storeRoute.js";
import connectDB from "./config/db.js";

const app = express();

dotenv.config();

app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(
  session({
    secret: "secretkey",
    resave: false,
    saveUninitialized: false,
  })
);

app.use("/", storeRouter);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log("Server Started on port " + PORT);
  });
};

startServer();