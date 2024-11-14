import { useEffect } from 'react';

// eslint-disable-next-line react/prop-types
const VideoPlayer = ({ videoId }) => {
    useEffect(() => {
        const videoElement = document.getElementById('videoPlayer');
        videoElement.src = `/api/video/stream/${videoId}`;  // The backend will handle the video stream
        
        videoElement.load();
    }, [videoId]);

    return <video id="videoPlayer" controls width="100%" />;
};

export default VideoPlayer;
