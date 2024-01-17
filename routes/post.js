import express from "express"
import { getPost, addPost, getCommunityPost, getUserPost } from "../controllers/post.js"

const router = express.Router()

router.get("/userPost", getUserPost)
router.get("/community", getCommunityPost)
router.get("/", getPost)
router.post("/addpost", addPost)

export default router
