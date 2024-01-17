import express from "express"
import { getCurrentUser, getProfileUser, getUser, updateUser } from "../controllers/user.js"

const router = express.Router()

router.get("/find/:userId", getUser)
router.put("/", updateUser)
router.get("/currentUser/:userId", getCurrentUser)
router.get("/ProfileUser/:userId" , getProfileUser )

export default router