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
        <Router>
          {!user ? <Login/> :
            <div className="app__body">
              <Routes>
                <Route path="/" element={<WebcamCapture/>}/>
                <Route path="/preview" element={<Preview/>}/>
                <Route path="/chats" element={<Chats/>}/>
                <Route path="/view" element={<ChatView/>}/>
              </Routes>
            </div>
          }

        </Router>
      </div>

    </>
  )
}

export default App
