import React, { useRef, useEffect } from 'react';

const CustomWebcam = ({ onCapture }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const constraints = {
      video: {
        facingMode: 'environment', // Access back camera
      },
    };

    const getVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing the camera", error);
      }
    };

    getVideo();

    // Cleanup on unmount
    return () => {
      if (videoRef.current) {
        const stream = videoRef.current.srcObject;
        if (stream) {
          const tracks = stream.getTracks();
          tracks.forEach(track => track.stop());
        }
      }
    };
  }, []);

  const handleCaptureClick = () => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const video = videoRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0);

    const imageData = canvas.toDataURL('image/jpeg');
    onCapture(imageData); // Send captured image back to parent
  };

  return (
    <div>
      <video ref={videoRef} autoPlay className="w-full rounded-lg" />
      <button onClick={handleCaptureClick} className="mt-4 p-2 bg-pink-800 text-white rounded-lg hover:bg-pink-600">
        Capture
      </button>
    </div>
  );
};

export default CustomWebcam;
