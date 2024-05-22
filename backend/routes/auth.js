import express from "express";
import { signin, signup,googleAuth, signout } from "../controllers/auth.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

//creating a user
router.post("/signup", signup);

//signing in
router.post("/signin", signin);

//signout
router.post("/signout",verifyToken,signout)

//google auth
router.post("/google", googleAuth);

export default router;
