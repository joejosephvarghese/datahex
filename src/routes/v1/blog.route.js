const express = require("express");
const multer = require("multer");
const router = express.Router();

const upload = multer(); // for file handling
const { blogController } = require("../../controllers");
const authMiddleware = require("../../middleware/authMiddleware");

router.use(authMiddleware); // all routes protected

// Create Blog
router.post("/", upload.fields([{ name: "file" }]), blogController.createBlog);

// Get all blogs
router.get("/", blogController.getAllBlogs);

// Get user blogs
router.get("/user", blogController.getAllUserBlogs);

// Get blog by ID
router.get("/:id", blogController.getBlogById);

// Update blog
router.put(
  "/:id",
  upload.fields([{ name: "file" }]),
  blogController.updateBlog
);

// Delete blog
router.delete("/:id", blogController.deleteBlog);

module.exports = router;
