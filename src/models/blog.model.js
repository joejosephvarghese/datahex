const mongoose = require("mongoose");
const { toJSON, paginate } = require('./plugins');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  imageUrl: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


blogSchema.plugin(toJSON);
blogSchema.plugin(paginate);

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
