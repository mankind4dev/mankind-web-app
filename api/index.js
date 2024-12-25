import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import postRoutes from "./routes/post.route.js";
import cookieParser from "cookie-parser";
dotenv.config();

mongoose
  .connect(process.env.MONGODB)
  .then(() => {
    console.log("MongoDB is Connected Successfully");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
//To be able receive data from server
app.use(express.json());
app.use(cookieParser());

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT} Perfectly `);
});

//req are d data we send to the api data base
//res are the data we receive from the database api
//app.get("/test", (req, res) =>{
// res.json({message: "Api is working"})  
// }) to check it on server http:8000/test
// app.use.("/api/user", userRoute)
app.use("/api/user/", userRoutes);
app.use("/api/auth/", authRoutes);
app.use("/api/post", postRoutes)

//middeware error handling
//err that come from the input
//next means when to move to middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internet Server Errorr";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
}); // create error in ultility to handle the error
