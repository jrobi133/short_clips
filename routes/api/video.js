require("dotenv").config();
const path = require("path");
const fs = require("fs");
const express = require("express");
const router = express.Router();
const multer = require("multer");
var ffmpeg = require("fluent-ffmpeg");
const Video = require("../../models/video");

const LOCAL_UPLOADS_PATH = path.join(
  process.cwd(),
  process.env.LOCAL_UPLOADS_PATH || "uploads"
);

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".mp4") {
      return cb(res.status(400).end("only jpg, png, mp4 is allowed"), false);
    }
    cb(null, true);
  },
});

const upload = multer({ storage: storage }).single("file");

router.post("/uploadfiles", upload, (req, res) => {
  if (!req.file) {
    return res.send("Please select an image to upload");
  }
  return res.json({
    success: true,
    filePath: req.file.path,
    fileName: req.file.filename,
  });
});

//=================================
//             User
//=================================

router.post("/uploadfiles", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.json({ success: false, err });
    }
    return res.json({
      success: true,
      filePath: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
});

router.post("/thumbnail", (req, res) => {
  let thumbsFilePath = "";
  let fileDuration = "";

  ffmpeg.ffprobe(req.body.filePath, function (err, metadata) {
    console.dir(metadata);
    console.log(metadata.format.duration);

    fileDuration = metadata.format.duration;
  });

  ffmpeg(req.body.filePath)
    .on("filenames", function (filenames) {
      console.log("Will generate " + filenames.join(", "));
      thumbsFilePath = "uploads/thumbnails/" + filenames[0];
    })
    .on("end", function () {
      console.log("Screenshots taken");
      return res.json({
        success: true,
        thumbsFilePath: thumbsFilePath,
        fileDuration: fileDuration,
      });
    })
    .screenshots({
      // Will take screens at 20%, 40%, 60% and 80% of the video
      count: 3,
      folder: "uploads/thumbnails",
      size: "320x240",
      // %b input basename ( filename w/o extension )
      filename: "thumbnail-%b.png",
    });
});

router.get("/getVideos", async (req, res) => {
  try {
    const videos = await Video.findAll();
    res.status(200).json({ success: true, videos });
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

router.post("/uploadVideo", async (req, res) => {
  const videoModel = await new Video(req.body);

  await videoModel.save((err, videoResponse) => {
    if (err) return res.status(400).json({ success: false, err });
  });

  return res.status(200).json({
    success: true,
    ...videoModel?.dataValues,
  });
});

router.post("/getVideo", (req, res) => {
  Video.findOne({ _id: req.body.videoId })
    .populate("writer")
    .exec((err, video) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, video });
    });
});

// Example 1 http://localhost:3001/api/video/uploads/1682003469249_1575546934456_Space - 21542.mp4
router.route("/uploads/:videoFile").get((req, res) => {
  // Access Local File
  // let { videoFile } = { ...req.query, ...req.params, ...req.body };
  let { videoFile } = req.params || {};
  videoFile = path.basename(videoFile);
  const fullFilePath = path.join(LOCAL_UPLOADS_PATH, videoFile);

  // Future Enhancement: S3 Stream File
  // const s3_path = `bucket-name/folder-name/${videoFile}`;
  // const s3FileContents = await getS3Stream({ s3_path, returnType: 'buffer' or 'raw' });
  // return res.send(s3FileContents);

  if (!fs.existsSync(fullFilePath)) {
    return res.status(404).send("File not found");
  }

  return res.sendFile(fullFilePath);
});

// NOTE: PUT THIS IN A SEPARATE FILE CALLED utils/s3.js
// typeof APP_NAME === 'undefined' && require('../globals');
// require('colors');
// const path = require('path');
// const scriptName = path.basename(__filename).split('.').slice(0, -1).join('.');
// const debug = require('debug')(APP_NAME + ':utils/' + scriptName.brightWhite);
// const aws = require('aws-sdk');
// const fs = require('fs');
// const { asyncForEach } = require("./asyncArray");

// const awsCredentials = require("../config/aws_credentials");
// const Bucket = process.env.S3_BUCKET || 'assure-sign-dev';

// aws.config.update(awsCredentials);
// aws.config.setPromisesDependency();
// const s3 = new aws.S3(awsCredentials);

// const archiver = require("archiver");
// const stream = require("stream");
// const request = require("request");

// const getS3Stream = async ({ s3_path, s3_bucket = Bucket, returnType = 'json' }) => {
//   if (!s3_path) {
//     throw new Error("s3_path is required");
//   }
//   const s3Stream = await s3.getObject({ Bucket: s3_bucket, Key: s3_path }).promise();

//   let response;
//   switch (returnType) {
//     case 'buffer':
//       response = s3Stream?.Body;
//     case 'string':
//       response = s3Stream?.Body?.toString('utf-8');
//       break;
//     case 'json':
//       response = JSON.parse(s3Stream?.Body?.toString('utf-8'));
//       break;
//     default: // Raw Response Object from s3 getObject
//       response = s3Stream;
//       break;
//   }

//   return response;
// };

module.exports = router;
