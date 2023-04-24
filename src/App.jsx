import './App.sass'
import {WebcamCapture} from "./components/WebcamCapture.jsx";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import {Preview} from "./components/Preview.jsx";
import {Chats} from "./components/Chats.jsx";
import {ChatView} from "./components/ChatView.jsx";
import {useDispatch, useSelector} from "react-redux";
import {login, logout, selectUser} from "./features/appSlice.js";
import {Login} from "./components/Login.jsx";
import {useEffect} from "react";
import {auth} from "./firebase.js";

function App() {
  const user = useSelector(selectUser)
  const dispatch = useDispatch()
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(login({
          username: user.displayName,
          profilePic: user.photoURL,
          id: user.uid
        }))
      } else {
        dispatch(logout())
      }
    })
  }, []);
  return (
    <>
      <div className="app">
        <div className="app__logo">
          <img
            src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpngimg.com%2Fuploads%2Fsnapchat%2Fsnapchat_PNG42.png&f=1&nofb=1&ipt=645ec5c6d780a41d0ee47b8a43fc083c711b1d6e0e170763ad2bc19816383d79&ipo=images"
            alt="logo"/>
        </div>
        <Router>
          {!user ? <Login/> :
            <div className="app__body">

              <div className="app__bodyBackground">
                <Routes>
                  <Route path="/" element={<WebcamCapture/>}/>
                  <Route path="/preview" element={<Preview/>}/>
                  <Route path="/chats" element={<Chats/>}/>
                  <Route path="/view" element={<ChatView/>}/>
                </Routes>
              </div>
            </div>
          }

        </Router>
      </div>

    </>
  )
}

export default App
