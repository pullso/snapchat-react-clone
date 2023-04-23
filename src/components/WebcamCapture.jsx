import Webcam from "react-webcam";
import {useCallback, useRef} from "react";
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import {useDispatch} from "react-redux";
import {setCameraImage} from "../features/cameraSlice.js";
import {useNavigate} from "react-router-dom";
import './WebcamCapture.sass'

const videoConstrains = {
  width: 250,
  height: 400,
  faicingMode: "user",
}

export const WebcamCapture = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const webcamRef = useRef(null);
  const capture = useCallback(
    () => {
      const imageSrc = webcamRef?.current?.getScreenshot()
      dispatch(setCameraImage(imageSrc))
      navigate('/preview')
    },
    [webcamRef],
  );

  return (
    <>
      <div className="webcamCapture">
        <Webcam
          audio={false}
          height={videoConstrains.height}
          ref={webcamRef}
          screenshotFormat={"image/jpeg"}
          width={videoConstrains.width}
          videoConstraints={videoConstrains}
        />
        <RadioButtonUncheckedIcon
          className="webcamCapture__button"
          onClick={capture}
          fontSize="large"
        />
      </div>
    </>
  )
}
