/* eslint-disable react/prop-types */
import  { useState } from 'react';

// eslint-disable-next-line no-unused-vars
const UploadProgress = ({ onProgress }) => {
    const [progress, setProgress] = useState(0);

    const handleProgress = (event) => {
        if (event.lengthComputable) {
            const percent = Math.round((event.loaded / event.total) * 100);
            setProgress(percent);
        }
    };

     setTimeout(() => handleProgress({ loaded: 500, total: 1000 }), 1000);

    return (
        <div>
            <progress value={progress} max="100" />
            <span>{progress}%</span>
        </div>
    );
};

export default UploadProgress;
