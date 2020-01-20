const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  profilePhoto: {
    type: String,
    default: "/images/profile.png"
  },
  isAdmin: { type: Boolean, default: false },
  level: String,
  course: String,
  viewed_videos: [{ type: Schema.Types.ObjectId, ref: "Videos" }]
});

const User = mongoose.model("Users", UserSchema);

module.exports = User;
