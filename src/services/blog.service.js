const { Blog } = require("../models");

const createBlog = async (blogData) => {
  return await Blog.create(blogData);
};

module.exports = {
  createBlog,
};
