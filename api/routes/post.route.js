import express from "express";
import { create, deletePost, getPost } from "../controllers/post.controller.js";
import { verifyToken } from "../ultils/verifyUser.js";

const router = express.Router();

router.post("/create", verifyToken, create);
router.get("/getposts", getPost);
router.delete("/deletepost/:postId/:userId", verifyToken, deletePost);

export default router;
