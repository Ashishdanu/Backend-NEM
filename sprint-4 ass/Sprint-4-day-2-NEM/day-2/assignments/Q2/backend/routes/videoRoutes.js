const express = require('express');
const router = express.Router();
const { uploadChunk, mergeChunks, streamVideo } = require('../controllers/videoController');

router.post('/upload', uploadChunk);
router.post('/merge', mergeChunks);
router.get('/stream/:videoId', streamVideo);

module.exports = router;
