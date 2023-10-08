import express from "express";
import {
  addcomments,
  deletecomments,
  getcomments,
} from "../controllers/comments.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, addcomments);
router.delete("/:id", verifyToken, deletecomments);
router.get("/:videoId", getcomments);

export default router;
