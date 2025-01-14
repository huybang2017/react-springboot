import React from 'react'
import Webcam from 'react-webcam'
const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: 'user',
}

const WebcamComponent = ({ webcamRef }) => {
  return (
    <>
      <Webcam
        audio={false}
        height={720}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={1280}
        videoConstraints={videoConstraints}
      />
    </>
  )
}
export default WebcamComponent
