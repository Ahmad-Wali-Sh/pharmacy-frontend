import React from "react";
import Routes from "@/features/routes/components/Routes";
import useApplyDirection from "./features/shared/hooks/applyDirections";
import useSignout from "./features/shared/hooks/useSignout";
import useApplySavedTheme from "./features/shared/services/useApplySavedTheme";
import { ToastContainer, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  useSignout();
  useApplyDirection();
  useApplySavedTheme();

  return (
    <div className="app">
      <ToastContainer
        position="top-left"
        autoClose={700}
        transition={Flip}
        theme="dark"
        pauseOnHover={true}
      />
      <Routes />
    </div>
  );
}

export default App;
