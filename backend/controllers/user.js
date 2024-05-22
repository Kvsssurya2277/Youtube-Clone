import { createError } from "../error.js";
import User from "../models/User.js";
import Video from "../models/Video.js";

export const updateUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        {
          new: true,
        }
      );
      res.status(200).json(updatedUser);
    } catch (error) {
      next(err);
    }
  } else {
    return next(createError(403, "You can only update your own account"));
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted");
    } catch (error) {
      next(err);
    }
  } else {
    return next(createError(403, "You can only delete your own account"));
  }
};

export const getUser = async(req, res, next) => {
    try {

        const getUser=await User.findById(req.params.id);
        res.status(200).json(getUser);
        
    } catch (error) {
        next(error)
    }
};

export const subscribe = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      $push: { subscribedChannels: req.params.id },
    });
    await User.findByIdAndUpdate(req.params.id, {
      $push: { subscribers: req.user.id },
    });
    res.status(200).json("Subscription successfull.")
  } catch (err) {
    next(err);
  }
};

export const unsubscribe = async(req, res, next) => {
    try {
        await User.findByIdAndUpdate(req.user.id,{
            $pull:{subscribedChannels:req.params.id}
        })
        await User.findByIdAndUpdate(req.params.id,{
            $pull:{subscribers: req.user.id},
        });
        res.status(200).json("Unsubscribed successfull")
    } catch (error) {
        next(err)
    }
};

export const like =async (req, res, next) => {
  const id=req.user.id;
  const videoId=req.params.videoId;
    try {
      await Video.findByIdAndUpdate(videoId,{
        $addToSet:{likes:id},
        $pull:{dislikes:id}
      })
      res.status(200).json("The video is liked.")
    } catch (error) {
        next(err)
    }
};

export const dislike = async(req, res, next) => {
  const id=req.user.id;
  const videoId=req.params.videoId;
    try {
      await Video.findByIdAndUpdate(videoId,{
        $addToSet:{dislikes:id},
        $pull:{likes:id}
      })
      res.status(200).json("The video is disliked.")
    } catch (error) {
        next(err)
    }
};
