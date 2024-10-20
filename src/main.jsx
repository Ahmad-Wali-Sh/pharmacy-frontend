import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "react-auth-kit";
import { QueryClientProvider } from 'react-query'
import { queryClient } from './components/services/API'
import './i18n';



ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <AuthProvider authType={"localstorage"} authName={"_auth"}>
      <QueryClientProvider client={queryClient}>
      <App />
      </QueryClientProvider>
    </AuthProvider>
  </>
);
