const express = require("express");
const router = express.Router();
const videoModel = require("../models/video");
const courseModel = require("../models/course");
const userModel = require("../models/user");
const uploader = require("./../config/cloudinary");

router.post("/profile", uploader.single("profilePhoto"), (req, res) => {
  console.log("file ??? ->");
  //   console.log(req.file.secure_url);
  //   console.log(req.session.passport.user);
  const avatar = req.file.secure_url;
  const userId = req.session.passport.user;
  userModel
    .findByIdAndUpdate(userId, { profilePhoto: avatar })
    .then(dbRes => {
      console.log(dbRes);
      res.redirect("/profile");
    })
    .catch(dbErr => {
      console.log(dbErr);
      res.send("server crashed while uploading photo...");
    });
});

router.post("/course-list", (req, res) => {
  // console.log(req.data);
  // console.log(req.body);
  courseModel
    .find(req.body)
    .then(dbRes => {
      // console.log(dbRes);
      res.send(dbRes);
    })
    .catch(err => console.log(err));
});

router.post("/profile-course-update", (req, res) => {
  console.log(req.body);
  // console.log(req.user);
  userModel
    .findOneAndUpdate({ _id: req.user._id }, req.body)
    .then(dbRes => {
      console.log("dbRES ::::", dbRes);
      console.log("req body", req.body);
      const msg = { msg: "Course selected" };
      res.send(req.body);
    })
    .catch(err => console.log(err));
});

router.patch("/profile", (req, res) => {
  console.log(req.body);
  console.log(req.user);
  userModel
    .findOneAndUpdate(
      { _id: req.user._id },
      { $push: { viewed_videos: req.body.videoId } }
    )
    .then(dbRes => dbRes)
    .catch(err => console.log(err));
});

function findUserVideos(array) {
  return videoModel.find({ _id: array });
  // .then(dbRes => dbRes)
  // .catch(err => console.log(err));
}
function findCourse(req) {
  console.log("User level :", req.user.level);
  console.log("User cursus :", req.user.course);
  return courseModel
    .find({ course_name: req.user.course })
    .populate("course_videos");
  // .then(dbRes => {
  //   dbRes;
  //   console.log("DBRES ::::::", dbRes);
  // })
  // .catch(err => console.log(err));
}

module.exports = router;
