import './Preview.sass'
import {useDispatch, useSelector} from "react-redux";
import {resetCameraImage, selectCameraImage} from "../features/cameraSlice.js";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import NoteIcon from '@mui/icons-material/Note';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CropIcon from '@mui/icons-material/Crop';
import SendIcon from '@mui/icons-material/Send';
import TimerIcon from '@mui/icons-material/Timer';
import {getDownloadURL, ref, uploadString} from 'firebase/storage'
import {db, storage} from "../firebase.js";
import {v4 as uuid} from 'uuid';
import {addDoc, collection, serverTimestamp} from "firebase/firestore";


export const Preview = () => {
  const cameraImage = useSelector(selectCameraImage)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (!cameraImage) {
      navigate('/')
    }
  }, [cameraImage, navigate]);
  const closePreview = () => {
    dispatch(resetCameraImage())
  }

  const sendPost = async () => {
    const id = uuid()
    const storageRef = ref(storage, `posts/${id}`)
    const data = await uploadString(storageRef, cameraImage, 'data_url')
    const url = await getDownloadURL(data.ref)
    await addDoc(collection(db, 'posts'), {
      imageUrl: url,
      username: 'Pavel',
      read: false,
      // profilePic:
      timestamp: serverTimestamp()
    })
    navigate('/chats')
  }

  return (
    <>
      <div className="preview">
        <CloseIcon className="preview__close" onClick={closePreview}/>
        <div className="preview__toolbarRight">
          <TextFieldsIcon/>
          <NoteIcon/>
          <MusicNoteIcon/>
          <AttachFileIcon/>
          <CropIcon/>
          <TimerIcon/>
        </div>
        <img src={cameraImage} alt=""/>
        <div className="preview__footer" onClick={sendPost}>
          <h2>Send Now</h2>
          <SendIcon className="preview__sendIcon" fontSize="small"/>
        </div>
      </div>
    </>
  )
}
