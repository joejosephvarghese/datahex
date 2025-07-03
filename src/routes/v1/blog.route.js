const express = require("express");

const multer = require("multer");
const router = express.Router();

const upload = multer();

const {blogController}=require('../../controllers')

const authMiddleware = require("../../middleware/authMiddleware");

router.use(authMiddleware);

router.post(
  "/",
  upload.fields([{ name: "file" }]),
  blogController.createBlog
);
module.exports = router;
