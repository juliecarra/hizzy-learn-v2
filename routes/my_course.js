const express = require("express");
const router = express.Router();
const userModel = require("../models/user");
const videoModel = require("../models/video");
const courseModel = require("../models/course");
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");

router.patch("/my_course", (req, res) => {
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

router.get("/my-course", ensureLoggedIn("/"), (req, res) => {
  if (!req.user.course) {
    const msg = { txt: "You have no course selected." };
    res.render("my_course", { msg });
  } else {
    const userViewedVideos = findUserVideos(req.user.viewed_videos);
    const courseFound = findCourse(req);
    Promise.all([userViewedVideos, courseFound])
      .then(values => {
        const viewed = values[0];

        const course = values[1];

        if (course[0].course_videos.length === 0) {
          const msg = { txt: "No video left in this course" };
          res.render("my_course", { msg });
          return;
        }
        const courseVideos = course[0].course_videos;
        for (let i = 0; i < viewed.length; i++) {
          for (let j = courseVideos.length - 1; j >= 0; j--) {
            if (courseVideos[j]._id.equals(viewed[i]._id)) {
              courseVideos.splice(j, 1);
            }
          }
        }
        if (!courseVideos.length) {
          const msg = { txt: "You have finished your course." };
          res.render("my_course", { msg });
        }
        res.render("my_course", {
          // viewedVideos: viewed,
          courseVideos: courseVideos
        });
      })
      .catch(err => console.log(err));
  }
});

module.exports = router;
