import { createError } from "../error.js";
import User from "../models/User.js";
import Video from "../models/Video.js";

export const addVideo = async (req, res, next) => {
  const newVideo = new Video({ userId: req.user.id, ...req.body });
  try {
    const savedVideo = await newVideo.save();
    res.status(200).json(savedVideo);
  } catch (error) {
    next(error);
  }
};

export const updateVideo = async (req, res, next) => {
  try {
    const video = Video.findById(req.params.id);
    if (!video) return next(createError(404, "Video not found !"));
    if (req.params.id === video.userId) {
      const updatedVideo = await Video.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );

      res.status(200).json(updatedVideo);
    } else {
      return next(createError(404, "you can update only your video"));
    }
  } catch (error) {
    next(error);
  }
};

export const deleteVideo = async (req, res, next) => {
  try {
    const video = Video.findById(req.params.id);
    if (!video) return next(createError(404, "Video not found !"));
    if (req.params.id === video.userId) {
      await Video.findByIdAndDelete(req.params.id);
      res.status(200).json("Video deleted successfully");
    } else {
      return next(createError(404, "you can delete only your video"));
    }
  } catch (error) {
    next(error);
  }
};
export const getVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    res.status(200).json(video);
  } catch (error) {
    next(error);
  }
};

export const addView = async (req, res, next) => {
  try {
    await Video.findByIdAndUpdate(
      req.params.id,
      {
        $inc: { views: 1 },
      },
      { new: true }
    );
    res.status(200).json("Views has increased");
  } catch (error) {
    next(error);
  }
};

export const randomVideos = async (req, res, next) => {
  try {
    const videos = await Video.aggregate([{ $sample: { size: 20 } }]);
    res.status(200).json(videos);
  } catch (error) {
    next(error);
  }
};

export const trendVideos = async (req, res, next) => {
  try {
    const videos = await Video.find().sort({ view: -1 });
    res.status(200).json(videos);
  } catch (error) {
    next(error);
  }
};

export const subscribedVideos = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const subscribedChennels = user.subscribedUsers;
    const list = await Promise.all(
      subscribedChennels.map((channelId) => {
        return Video.find({ userId: channelId });
      })
    );
    res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt));
  } catch (error) {
    console.log("error", error);
    console.log(next(error));
  }
};

export const tagsVideos = async (req, res, next) => {
  const tags = req.query.tags.split(",");
  try {
    const videos = await Video.find({ tags: { $in: tags } }).limit(20);
    res.status(200).json(videos);
  } catch (error) {
    next(error);
  }
};
export const searchVideos = async (req, res, next) => {
  const search = req.query.search;
  try {
    const videos = await Video.find({
      title: { $regex: search, $options: "i" },
    }).limit(40);
    res.status(200).json(videos);
  } catch (error) {
    next(error);
  }
};
