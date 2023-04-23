import {createBrowserRouter} from "react-router-dom";
import App from "../App.jsx";
import {Preview} from "../components/Preview.jsx";
import {Chats} from "../components/Chats.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <App/>
    ),
  },
  {
    path: "/preview",
    element: <Preview/>
  },
  {
    path: "/chats",
    element: <Chats/>
  }
]);
