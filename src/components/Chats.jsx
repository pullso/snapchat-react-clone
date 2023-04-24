import './Chats.sass'
import {Avatar} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import {useEffect, useState} from "react";
import {auth, db} from "../firebase.js";
import {collection, onSnapshot, orderBy, query} from "firebase/firestore";
import {Chat} from "./Chat.jsx";
import {useSelector} from "react-redux";
import {selectUser} from "../features/appSlice.js";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import {useNavigate} from "react-router-dom";

export const Chats = () => {
  const [posts, setPosts] = useState([]);
  const user = useSelector(selectUser)
  const navigate = useNavigate()

  useEffect(() => {
    onSnapshot(query(collection(db, "posts"), orderBy("timestamp", "desc")), (querySnapshot) => {
      setPosts(querySnapshot.docs.map((doc) => ({
        id: doc.id, data: doc.data(),
      })));
    });
  }, []);

  const takeSnap = () => {
    navigate('/')
  }

  return (
    <>
      <div className="chats">
        <div className="chats__header">
          <Avatar src={user?.profilePic} onClick={() => auth.signOut()} className="chats__avatar"/>
          <div className="chats__search">
            <SearchIcon className="chats__searchIcon"/>
            <input type="text" placeholder="Friends"/>
          </div>
          <ChatBubbleIcon className="chats__chatIcon"/>
        </div>
        <div className="chats__posts">
          {
            posts.map(({id, data: {profilePic, username, imageUrl, timestamp, read}}) => (
              <Chat
                key={id}
                id={id}
                read={read}
                profilePic={profilePic}
                username={username}
                timestamp={timestamp}
                imageUrl={imageUrl}
              />)
            )
          }
          <RadioButtonUncheckedIcon
            className="chats__takePicIcon"
            onClick={takeSnap}
            fontsize="large"

          />
        </div>
      </div>
    </>
  )
}
