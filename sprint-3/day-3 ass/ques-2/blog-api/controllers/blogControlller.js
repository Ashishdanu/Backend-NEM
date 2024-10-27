// controllers/blogController.js
const Blog = require('../models/Blog');

// Create a blog post
exports.createPost = async (req, res) => {
  try {
    const blog = new Blog(req.body);
    await blog.save();
    res.status(201).json(blog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all posts with sorting, pagination, and filtering
exports.getPosts = async (req, res) => {
  const { author, tags, sortBy, page = 1, limit = 10 } = req.query;
  const query = {};
  if (author) query.author = author;
  if (tags) query.tags = { $in: tags.split(',') };

  try {
    const posts = await Blog.find(query)
      .sort(sortBy)
      .skip((page - 1) * limit)
      .limit(Number(limit));
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a blog post
exports.updatePost = async (req, res) => {
  try {
    const post = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(post);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a blog post
exports.deletePost = async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: 'Blog post deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
