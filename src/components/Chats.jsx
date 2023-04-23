import './Chats.sass'
import {Avatar} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import {useEffect, useState} from "react";
import {db} from "../firebase.js";
import {collection, onSnapshot, orderBy, query} from "firebase/firestore";
import {Chat} from "./Chat.jsx";

export const Chats = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    onSnapshot(query(collection(db, "posts"), orderBy("timestamp", "desc")), (querySnapshot) => {
      setPosts(querySnapshot.docs.map((doc) => ({
        id: doc.id, data: doc.data(),
      })));
    });
  }, []);

  return (
    <>
      <div className="chats">
        <div className="chats__header">
          <Avatar className="chats__avatar"/>
          <div className="chats__search">
            <SearchIcon/>
            <input type="text" placeholder="Friends"/>
          </div>
          <ChatBubbleIcon className="chats__chatIcon"/>
        </div>
        <div className="chats__posts">
          {
            posts.map(({id, data: {profilePic, username, timestamp, read}}) => (
              <Chat
                key={id}
                id={id}
                read={read}
                profilePic={profilePic}
                username={username}
                timestamp={timestamp}
              />)
            )
          }
        </div>
      </div>
    </>
  )
}
