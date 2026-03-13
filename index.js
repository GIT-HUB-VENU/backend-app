import express from "express";
import session from "express-session";
import cors from "cors";
import dotenv from "dotenv";
import dbConnect from "./config/db.js";
import orderRouter from "./routes/orderRoute.js";
import authRouter from "./routes/authRoute.js";

dotenv.config();
const app = express();

// ----------------- CORS -----------------
// Only allow your frontend origin
app.use(
  cors({
    origin: "http://localhost:5173", // React frontend
    credentials: true, // allow cookies to be sent
  })
);

// ----------------- Middleware -----------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ----------------- Session -----------------
app.use(
  session({
    secret: "secretkey",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // true only if using HTTPS
      httpOnly: true,
      sameSite: "lax", // allows frontend to send cookie
    },
  })
);

// ----------------- Routes -----------------
app.use("/auth", authRouter);
app.use("/orders", orderRouter); // <-- user orders route, no admin auth

// ----------------- Start Server -----------------
const startServer = async () => {
  await dbConnect();
  app.listen(5000, () => console.log("Server started on port 5000"));
};
startServer();