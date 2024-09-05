import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'


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
app.use(express.json())

const PORT = 3200;

app.listen(PORT, () => {
  console.log("Server is running on Port 3200 Perfectly ");
});


app.use('/api/user/', userRoutes)
app.use('/api/auth/', authRoutes)