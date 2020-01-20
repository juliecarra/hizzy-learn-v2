const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VideoSchema = new Schema({
  name: String,
  url: { type: String, required: true },
  difficulty_tag: String,
  description: String,
  front_end: Boolean,
  back_end: Boolean
});

const videoModel = mongoose.model("Videos", VideoSchema);

module.exports = videoModel;
