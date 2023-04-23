import './App.sass'
import {WebcamCapture} from "./components/WebcamCapture.jsx";
import {Outlet} from 'react-router-dom'

function App() {

  return (
    <>
      <div className="app__body">
        <WebcamCapture/>
        <Outlet/>
      </div>
    </>
  )
}

export default App
