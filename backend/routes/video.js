import express from "express";
import {tagVideo, addVideo, deleteVideo, updateVideo,getVideo, addView, trendVideo, randomVideo,subVideo, searchVideo } from "../controllers/video.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

//create
router.post("/",verifyToken,addVideo);
router.put("/:id",verifyToken,updateVideo);
router.delete("/:id",verifyToken,deleteVideo);
router.get("/find/:id",getVideo);
router.put("/view/:id",addView);
router.get("/trending",trendVideo);
router.get("/random",randomVideo);
router.get("/tags",tagVideo);
router.get("/search",searchVideo);
router.get("/subscriptions",verifyToken,subVideo);

export default router;
