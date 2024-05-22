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
    const videoToBeUpdated = await Video.findById(req.params.id);
    if (!videoToBeUpdated) return next(createError(404, "Video Not Found"));
    if (req.user.id === videoToBeUpdated.userId) {
      const updatedVideo = await Video.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedVideo);
    } else {
      res.status(403, "You can only update your video");
    }
  } catch (error) {
    next(error);
  }
};

export const deleteVideo = async (req, res, next) => {
  try {
    const videoToBeDeleted = await Video.findById(req.params.id);
    if (!videoToBeDeleted) return next(createError(404, "Video Not Found"));
    if (req.user.id === videoToBeDeleted.userId) {
      await Video.findByIdAndDelete(req.params.id);
      res.status(200).json("The video has been deleted");
    } else {
      res.status(403, "You can only delete your video");
    }
  } catch (error) {
    next(error);
  }
};

export const getVideo = async (req, res, next) => {
    try {
        const videoToBeSearched = await Video.findById(req.params.id);
        if (!videoToBeSearched) return next(createError(404, "Video Not Found"));
        else {
          res.status(200).json(videoToBeSearched)
        }
      } catch (error) {
        next(error);
      }
};

export const addView = async (req, res, next) => {
    try {
        const videoToBeSearched = await Video.findByIdAndUpdate(req.params.id,{
          $inc:{views:1}
        })
          res.status(200).json("View has been increased")
      } catch (error) {
        next(error);
      }
};


export const randomVideo = async (req, res, next) => {
    try {
        const randomVideos = await Video.aggregate([{$sample:{size:40}}]);
        res.status(200).json(randomVideos)
        
      } catch (error) {
        next(error);
      }
};

export const trendVideo = async (req, res, next) => {
    try {
        const trendVideos = await Video.find().sort({views:-1});
          res.status(200).json(trendVideos)
      } catch (error) {
        next(error);
      }
};

export const subVideo = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        const subscribtions=user.subscribedChannels;
        const list=await Promise.all(
          subscribtions.map((id)=>{
            return Video.find({userId:id});
          })
        );
        res.status(200).json(list.flat().sort((a,b)=> b.createdAt-a.createdAt));
      } catch (error) {
        next(error);
      }
};

export const tagVideo = async (req, res, next) => {
  const tags=req.query.tags.split(",");
  try {
    const tagVideos = await Video.find({tags:{$in:tags}}).limit(20);
      res.status(200).json(tagVideos)
  } catch (error) {
    next(error);
  }
};

export const searchVideo = async (req, res, next) => {
  const searchTerm=req.query.q
  try {
    const searchedVideos = await Video.find({title:{$regex:searchTerm,$options:"i"}}).sort({views:-1});
      res.status(200).json(searchedVideos)
  } catch (error) {
    next(error);
  }
};
