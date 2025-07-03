const catchAsync = require("../utils/catchAsync");
const { blogServices } = require("../services");
const ApiError = require("../utils/apiError");
const bcrypt = require("bcryptjs");
const { StatusCodes } = require("http-status-codes");
const { uploadImage, deleteImage } = require("../services/cloudinary.service");

const createBlog = catchAsync(async (req, res) => {
  const { title, content } = req.body;

  // Multer adds files to req.files
  const file = req.files?.file?.[0];

  let imageUrl = null;

  if (file) {
    const filename = Date.now().toString(); // or custom naming logic
    imageUrl = await uploadImage(file.buffer, filename);
  }

  const blogData = {
    title,
    content,
    imageUrl,
    user: req.user._id, // if you're attaching user in authMiddleware
  };

  const blog = await blogServices.createBlog(blogData);

  res.status(201).json({
    status: "success",
    message: "Blog created successfully",
    data: blog,
  });
});

module.exports = {
  createBlog,
};
