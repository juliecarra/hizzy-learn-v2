const express = require("express");
const router = express.Router();
const courseModel = require("../models/course");
const videoModel = require("../models/video");
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");

// ADD COURSE
router.post("/course-add", ensureLoggedIn("/"), (req, res) => {
  const {
    course_name,
    course_difficulty,
    course_videos,
    course_cursus
  } = req.body;
  const newCourse = {
    course_name,
    course_difficulty,
    course_videos,
    course_cursus
  };
  function createNewCourse(course) {
    return courseModel
      .create(course)
      .then(dbRes => dbRes)
      .catch(err => err);
  }
  courseModel
    .find({ course_name: newCourse.course_name })
    .then(dbRes => {
      if (dbRes.length) {
        const msg = "Sorry, course already exists";
        res.render("course_add", { msg });
      } else {
        const course = createNewCourse(newCourse);
        res.redirect("/manage-all");
      }
    })
    .catch(err => console.log(err));
});

// DELETE COURSE
router.delete("/course-delete/:id", (req, res) => {
  console.log("YAY");
  console.log(req.params.id);
  courseModel
    .findByIdAndRemove(req.params.id)
    .then(dbRes => res.send(dbRes))
    .catch(err => console.log(err));
});

// GET COURSE DETAIL
function findCourseById(id) {
  return courseModel.findById(id).populate("course_videos");
}
function findAllVideos() {
  return videoModel.find();
}

router.get("/course-edit/:id", (req, res) => {
  const course = findCourseById(req.params.id);
  const videos = findAllVideos();
  Promise.all([course, videos])
    .then(values => {
      console.log("Course :", values[0]);
      console.log("Videos :", values[1]);
      res.render("course_edit", {
        course: values[0],
        videos: values[1]
      });
    })
    .catch(err => console.log(err));
});

// SUBMIT EDITED COURSE
router.post("/course-edit/:id", (req, res) => {
  console.log("req body : ", req.body);
  courseModel
    .findByIdAndUpdate(req.params.id, req.body)
    .then(dbRes => res.redirect("/manage-all"))
    .catch(err => console.log(err));
});

module.exports = router;
