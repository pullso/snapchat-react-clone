import {Avatar} from "@mui/material";
import StopRoundedIcon from '@mui/icons-material/StopRounded';
import './Chat.sass';
import ReactTimeAgo from 'react-timeago'
import {useDispatch} from "react-redux";
import {selectImage} from "../features/appSlice.js";
import {doc, updateDoc} from 'firebase/firestore';
import {db} from "../firebase.js";
import {useNavigate} from "react-router-dom";

export const Chat = ({id, profilePic, username, timestamp, imageUrl, read}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const open = () => {
    if (!read) {
      dispatch(selectImage(imageUrl))
      updateDoc(doc(db, 'posts', id), {
        read: true
      })
      navigate('/view')
    }
  }

  return (
    <>
      <div className="chat" onClick={open}>
        <Avatar className="chat__avatar" src={profilePic}></Avatar>
        <div className="chat__info">
          <h4>{username}</h4>
          <p>{!read && 'Tap to view - '}<ReactTimeAgo date={new Date(timestamp?.toDate()).toUTCString()}/></p>
        </div>
        {!read && <StopRoundedIcon className="chat__readIcon"/>}
      </div>
    </>
  )
}
