import { createError } from "../error.js";
import Comment from "../models/Comment.js";
import Video from "../models/Video.js";

export const addcomments = async (req, res, next) => {
  const newComments = new Comment({ ...req.body, userId: req.user.id });
  try {
    const savedComments = await newComments.save();
    res.status(200).send(savedComments);
  } catch (error) {
    next(error);
  }
};

export const deletecomments = async (req, res, next) => {
  const comment = await Comment.findById(req.params.id);
  const video = await Video.findById(req.params.id);
  if (comment.userId === req.user.id || video.userId === req.user.id) {
    await Comment.findByIdAndDelete(req.params.id);
    res.status(200).json("The comment has been deleted!");
  } else {
    next(createError(403, "you can delete only your comments"));
  }
  try {
  } catch (error) {
    next(error);
  }
};

export const getcomments = async (req, res, next) => {
  const comments = await Comment.find({ videoId: req.params.videoId });
  try {
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};
