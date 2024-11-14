import  { useState } from 'react';
import VideoPlayer from './components/videoPlayer';
import UploadProgress from './components/uploadProgress';

const App = () => {
    const [videoId, setVideoId] = useState(null);
    
    const handleFileUpload = (file) => {
        const formData = new FormData();
        formData.append('video', file);
        
        // Trigger chunked upload (backend will handle this)
        fetch('/api/video/upload', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => setVideoId(data.videoId)) // Assuming backend returns videoId
        .catch(error => console.error('Upload failed:', error));
    };

    return (
        <div>
            <h1>Video Uploader & Streamer</h1>
            
            {/* File Upload Section */}
            <input 
                type="file" 
                accept="video/*"
                onChange={(e) => handleFileUpload(e.target.files[0])}
            />
            
            {/* Progress Bar */}
            <UploadProgress />
            
            {/* Video Player */}
            {videoId && <VideoPlayer videoId={videoId} />}
        </div>
    );
};

export default App;
