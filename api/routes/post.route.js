import express from "express"  
import { verifyToken } from "../ultils/verifyUser.js "
import { create, getPost } from "../controllers/post.controller.js"

const router = express.Router()

router.post("/create", verifyToken, create)
router.get("/getposts", getPost)

export default router
