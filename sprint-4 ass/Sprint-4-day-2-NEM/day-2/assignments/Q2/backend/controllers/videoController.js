const fs = require('fs');
const path = require('path');

let chunks = {};

const uploadChunk = (req, res) => {
    const { part, totalParts } = req.body;
    const chunk = req.files.chunk;
    const videoId = req.body.videoId;

    if (!chunks[videoId]) {
        chunks[videoId] = [];
    }

    chunks[videoId][part] = chunk.data;
    
    if (chunks[videoId].length === parseInt(totalParts)) {
        mergeChunks(videoId);
        res.send('Upload Complete');
    } else {
        res.send('Chunk Uploaded');
    }
};

// Merge video chunks after upload is complete
const mergeChunks = (videoId) => {
    const videoPath = path.resolve(__dirname, '..', 'uploads', `${videoId}.mp4`);
    const writeStream = fs.createWriteStream(videoPath);

    chunks[videoId].forEach((chunk, index) => {
        writeStream.write(chunk);
    });
    writeStream.end();
    delete chunks[videoId];
};

// Streaming video with Range support
const streamVideo = (req, res) => {
    const videoPath = path.resolve(__dirname, '..', 'uploads', `${req.params.videoId}.mp4`);
    const stat = fs.statSync(videoPath);
    const totalSize = stat.size;
    const range = req.headers.range;

    if (!range) {
        res.status(400).send("Requires Range header");
        return;
    }

    const [start, end] = range.replace(/bytes=/, "").split("-").map(Number);
    const chunkSize = (end || totalSize - 1) - start + 1;

    res.status(206).header({
        "Content-Range": `bytes ${start}-${end || totalSize - 1}/${totalSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunkSize,
        "Content-Type": "video/mp4",
    });

    const videoStream = fs.createReadStream(videoPath, { start, end: end || totalSize - 1 });
    videoStream.pipe(res);
};

module.exports = { uploadChunk, mergeChunks, streamVideo };
