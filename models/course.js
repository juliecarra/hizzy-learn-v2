const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = new Schema({
  course_name: { type: String, required: true },
  course_difficulty: { type: String, required: true },
  course_description: String,
  course_videos: [{ type: Schema.Types.ObjectId, ref: "Videos" }],
  course_cursus: String
});

const courseModel = mongoose.model("Courses", courseSchema);

module.exports = courseModel;
