import './Login.sass'
import {useDispatch} from "react-redux";
import {Button} from "@mui/material";
import {login} from "../features/appSlice.js";
import {auth, provider} from "../firebase.js";
import {signInWithPopup} from 'firebase/auth'

export const Login = () => {
  const dispatch = useDispatch()
  const SignInToApp = (e) => {
    e.preventDefault()
    signInWithPopup(auth, provider)
      .then(result => {
        dispatch(login({
          username: result.user.displayName,
          profilePic: result.user.photoURL,
          id: result.user.uid
        }))

      })
      .catch(e => alert(e.message))
  }
  return (
    <>
      <div className="login">
        <img
          src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fsguru.org%2Fwp-content%2Fuploads%2F2018%2F02%2Fsnapchat-logo-transparent.png&f=1&nofb=1&ipt=f8f367f772d8be78682a537289394395ee77bbd52af063042b09544608c583bd&ipo=images"
          alt=""/>
        <Button variant="outlined" onClick={SignInToApp}>Sign In</Button>
      </div>
    </>
  )
}
