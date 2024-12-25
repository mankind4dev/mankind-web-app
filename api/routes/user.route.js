import express from "express";
import {
  deleteUser,
  test,
  updateUser,
} from "../controllers/user.controller.js";
import { verifyToken } from "../ultils/verifyUser.js";

const router = express.Router();

//router.get("/test", (req, res) =>{
  // res.json({message: "API is working"})
// }) to check it on server http:8000/api/user/test
router.get("/test", test);
router.put("/update/:userId", verifyToken, updateUser);
router.delete("/delete/:userId", verifyToken, deleteUser);

export default router;
