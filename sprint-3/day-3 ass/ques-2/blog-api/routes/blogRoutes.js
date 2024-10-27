// routes/blogRoutes.js
const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

router.post('/blogs', blogController.createPost);
router.get('/blogs', blogController.getPosts);
router.put('/blogs/:id', blogController.updatePost);
router.delete('/blogs/:id', blogController.deletePost);

module.exports = router;
