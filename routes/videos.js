import express from "express";
import {
  addVideo,
  addView,
  deleteVideo,
  getVideo,
  randomVideos,
  searchVideos,
  subscribedVideos,
  tagsVideos,
  trendVideos,
  updateVideo,
} from "../controllers/videos.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, addVideo);
router.put("/:id", verifyToken, updateVideo);
router.delete("/:id", verifyToken, deleteVideo);
router.get("/find/:id", getVideo);
router.put("/view/:id", addView);
router.get("/random", randomVideos);
router.get("/trend", trendVideos);
router.get("/sub", verifyToken, subscribedVideos);
router.get("/tags", tagsVideos);
router.get("/search", searchVideos);

export default router;
