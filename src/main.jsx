import React from "react";
import ReactDOM from "react-dom/client";
import './picker.less';
import App from "./App";
import "./styles.css";
import { ToastContainer, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AuthProvider } from "react-auth-kit";



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ToastContainer
      position="top-left"
      autoClose={200}
      transition={Flip}
      theme="dark"
      pauseOnHover={false}
    />
    <AuthProvider authType={"localstorage"} authName={"_auth"}>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
