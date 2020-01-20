//cloudinary set up
const multer = require("multer");
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

const storage = cloudinaryStorage({
  cloudinary,
  folder: "profile-pictures",
  allowedFormats: ["jpg", "png"],
  filename: function(req, file, cb) {
    cb(undefined, "profilePhoto_" + Date.now());
  }
});

const uploader = multer({ storage });

module.exports = uploader;
