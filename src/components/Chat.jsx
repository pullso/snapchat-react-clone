import {Avatar} from "@mui/material";
import StopRoundedIcon from '@mui/icons-material/StopRounded';
import './Chat.sass';

export const Chat = ({id, profilePic, username, timestamp, read}) => {
  return (
    <>
      <div className="chat">
        <Avatar className="chat__avatar" src={profilePic}></Avatar>
        <div className="chat__info">
          <h4>{username}</h4>
          <p>Tap to view - {new Date(timestamp?.toDate()).toUTCString()}</p>
        </div>
        {!read && <StopRoundedIcon className="chat__readIcon"/>}
      </div>
    </>
  )
}
