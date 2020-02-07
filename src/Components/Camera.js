import React, { useState, useRef, useEffect } from "react";
import { useUserMedia } from "../Hooks/useUserMedia";
import { useOffsets } from "../Hooks/useOffsets";

const CAPTURE_OPTIONS = {
  audio: false,
  video: { facingMode: "environment" }
};

function Camera({ onCapture, onClear, setDimensions, isCameraOpen, captureCall }) {
  const canvasRef = useRef();
  const videoRef = useRef();

  const [container, setContainer] = useState({ width: 0, height: 0 });
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isFlashing, setIsFlashing] = useState('');

  const mediaStream = useUserMedia(CAPTURE_OPTIONS);

  useEffect(() => {
    if(isCameraOpen && mediaStream) handleCanPlay();
  }, [isCameraOpen, mediaStream]);

  const offsets = useOffsets(
    videoRef.current && videoRef.current.videoWidth,
    videoRef.current && videoRef.current.videoHeight,
    container.width,
    container.height
  );

  function handleCanPlay() {
    setIsVideoPlaying(true);

    setContainer({
      width: videoRef.current.videoWidth,
      height: videoRef.current.videoHeight
    });
  }

  if (mediaStream && videoRef.current && !videoRef.current.srcObject) {
    videoRef.current.srcObject = mediaStream;
  }

  function handleCapture() {

    const context = canvasRef.current.getContext("2d");

    context.drawImage(
      videoRef.current,
      offsets.x,
      offsets.y,
      container.width,
      container.height,
      0,
      0,
      container.width,
      container.height,
    );

    canvasRef.current.toBlob(blob => onCapture(blob), "image/jpeg", 1);
    setDimensions(container.width,container.height);
    setIsFlashing('flash');

    handleClear();

  }

  function handleClear() {
    const context = canvasRef.current.getContext("2d");
    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    onClear();
  }

  useEffect(()=>{
    if(captureCall) handleCapture();
  }, [captureCall])

  if (!mediaStream) {
    return null;
  }

  return (
    <>
      <video
        ref={videoRef}
        hidden={!isVideoPlaying}
        onCanPlay={handleCanPlay}
        autoPlay
        playsInline
        muted
        style={{
          top: `-${offsets.y}px`,
          left: `-${offsets.x}px`
        }}
      ></video>

      <canvas
        ref={canvasRef}
        width={container.width}
        height={container.height}
      ></canvas>

      <div id="flash"
        className={isFlashing}
        onAnimationEnd={() => setIsFlashing('')}
      />
    </>
  );
}

export default Camera;
