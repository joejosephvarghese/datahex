const Blog = require("../models/blog.model");
const { uploadImage, deleteImage } = require("../services/cloudinary.service");
const ApiError = require("../utils/apiError");
const { StatusCodes } = require("http-status-codes");

// Create blog
const createBlog = async (data) => {
  return await Blog.create(data);
};

// Get all blogs
const getAllBlogs = async (filter, options) => {
  return await Blog.paginate(filter, options);
};

const getAllUserBlogs = async (filter, options) => {
  return await Blog.paginate(filter, options);
};

// Get blog by ID
const getBlogById = async (id) => {
  return await Blog.findById(id).populate("user");
};

// Update blog
const updateBlog = async (id, updateData, file, userId) => {
  const blog = await Blog.findById(id);
  if (!blog) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Blog not found");
  }

  if (blog.user.toString() !== userId) {
    throw new ApiError(
      StatusCodes.FORBIDDEN,
      "You are not allowed to update this blog"
    );
  }

  if (updateData.title) blog.title = updateData.title;
  if (updateData.content) blog.content = updateData.content;

  return await blog.save();
};

// Delete blog
const deleteBlog = async (id, userId) => {
  const blog = await Blog.findById(id);
  if (!blog) throw new Error("Blog not found");

  if (blog.user.toString() !== userId) {
    throw new ApiError(
      StatusCodes.FORBIDDEN,
      "You are not allowed to update this blog"
    );
  }

  // Optional: delete image from Cloudinary
  const publicId = blog.imageUrl?.split("/")?.pop()?.split(".")[0];
  if (publicId) {
    await deleteImage("products/" + publicId);
  }

  return await Blog.findByIdAndDelete(id);
};

module.exports = {
  createBlog,
  getAllBlogs,
  getAllUserBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
};
