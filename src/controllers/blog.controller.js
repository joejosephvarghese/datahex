const catchAsync = require("../utils/catchAsync");
const { blogServices } = require("../services");
const ApiError = require("../utils/apiError");
const { StatusCodes } = require("http-status-codes");
const { uploadImage, deleteImage } = require("../services/cloudinary.service");

// CREATE blog
const createBlog = catchAsync(async (req, res) => {
  const { title, content } = req.body;
  const file = req.files?.file?.[0];
  let imageUrl = null;

  if (file) {
    const filename = Date.now().toString();
    imageUrl = await uploadImage(file.buffer, filename);
  }

  const blogData = {
    title,
    content,
    imageUrl,
    user: req.user._id,
  };

  const blog = await blogServices.createBlog(blogData);
  res.status(StatusCodes.CREATED).json(blog);
});

// GET all blogs (paginated)
const getAllBlogs = catchAsync(async (req, res) => {
  const { page, limit, sortBy, title } = req.query;

  const options = {
    page: parseInt(page, 10),
    limit: parseInt(limit, 10),
    sortBy: sortBy || "-createdAt",
  };

  const filter = {};
  if (title) {
    filter.title = { $regex: title, $options: "i" }; // correct place for search
  }

  const blogs = await blogServices.getAllBlogs(filter, options);
  res.status(StatusCodes.OK).json(blogs);
});

// GET all blogs by logged-in user
const getAllUserBlogs = catchAsync(async (req, res) => {
  const { page, limit, sortBy } = req.query;

  const options = {
    page: parseInt(page, 10),
    limit: parseInt(limit, 10),
    sortBy: sortBy || "-createdAt",
  };

  const filter = {
    user: req.user.id,
  };

  const blogs = await blogServices.getAllUserBlogs(filter, options);
  res.status(StatusCodes.OK).json(blogs);
});

// GET blog by ID
const getBlogById = catchAsync(async (req, res) => {
  const blog = await blogServices.getBlogById(req.params.id);
  res.status(StatusCodes.OK).json(blog);
});

// UPDATE blog
const updateBlog = catchAsync(async (req, res) => {
  const file = req.files?.file?.[0];
  const userId = req.user.id; // Logged-in user

  const blog = await blogServices.updateBlog(
    req.params.id,
    req.body,
    file,
    userId
  );

  res.status(StatusCodes.OK).json(blog);
});

// DELETE blog
const deleteBlog = catchAsync(async (req, res) => {
  await blogServices.deleteBlog(req.params.id, req.user.id);
  res.status(StatusCodes.OK).json({ deleted: true });
});

module.exports = {
  createBlog,
  getAllBlogs,
  getAllUserBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
};
