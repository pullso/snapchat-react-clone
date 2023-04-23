import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {Provider} from "react-redux";
import {store} from "./store/store.js";
import {RouterProvider} from "react-router-dom";
import {router} from "./router/router.jsx";


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <div className="app">
        <RouterProvider router={router}/>
      </div>
    </Provider>
  </React.StrictMode>,
)
