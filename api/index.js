import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
const app = express();
import cookieParser from "cookie-parser";
dotenv.config();

// connect database
const connectDB = async () => {
  await mongoose
    .connect(process.env.mongoConnectId)
    .then(() => {
      console.log("Connected to DB");
    })
    .catch((err) => {
      throw err;
    });
};
mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});

app.get("/", (req, res) => {
  res.send("Hello First Requst");
});
// middlewares
app.use(cookieParser())
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(8800, () => {
  connectDB();
  console.log("connect to backend!");
});
