import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./login.css";
import "./styles.css";
import { ToastContainer, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "react-auth-kit";
import { QueryClientProvider } from 'react-query'
import { queryClient } from './components/services/API'



ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <ToastContainer
      position="top-left"
      autoClose={700}
      transition={Flip}
      theme="dark"
      pauseOnHover={false}
      />
    <AuthProvider authType={"localstorage"} authName={"_auth"}>
      <QueryClientProvider client={queryClient}>
      <App />
      </QueryClientProvider>
    </AuthProvider>
  </>
);
