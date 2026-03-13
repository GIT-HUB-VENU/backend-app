import express from "express";
import expressLayouts from "express-ejs-layouts";
import session from "express-session";
import cors from "cors";
import dotenv from "dotenv";
import { authenticateAdmin } from "./middleware/auth.js";
import dbConnect from "./config/db.js";
import productRouter from "./routes/productRoute.js";
import storeRouter from "./routes/storeRoute.js";
import homeRouter from "./routes/homeRoute.js";
import authRouter from "./routes/authRoute.js";
import userRouter from "./routes/userRoute.js";
import orderRouter from "./routes/orderRoute.js";

dotenv.config();

const app = express();

// ----------------- CORS -----------------
const allowedOrigins = ["http://localhost:5173"]; // your React frontend
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true, // allow cookies to be sent
  })
);

// ----------------- Middleware -----------------
app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("views", "views");
app.set("layout", "layout");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.use(
  session({
    secret: "secretkey",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true }, // adjust if using HTTPS
  })
);

// Make logged-in user available in EJS templates
app.use((req, res, next) => {
  res.locals.user = req.session.user;
  next();
});

// ----------------- Routes -----------------
app.use("/auth", authRouter);
app.use("/store", storeRouter);

// ----------------- User Orders Routes -----------------
// Allow normal users to place/view their own orders
import { authenticateUser } from "./middleware/auth.js"; // create this middleware
app.use("/orders", authenticateUser, orderRouter);

// ----------------- Admin Routes -----------------
app.use("/", authenticateAdmin, homeRouter);
app.use("/products", authenticateAdmin, productRouter);
app.use("/users", authenticateAdmin, userRouter);

// ----------------- Start Server -----------------
const startServer = async () => {
  await dbConnect();
  app.listen(5000, () => {
    console.log("Mongo DB Server Started on port 5000");
  });
};

startServer();