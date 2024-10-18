import { useEffect, useState } from "react";
import useServerIP from "../../shared/hooks/useServerIP";
import LoadingPage from "../../shared/components/pages/LoadingPage";
import applySavedTheme from "../../shared/services/applySavedTheme";
import useLogin from "../hook/useLogin";
import "../styles/login.scss";
import ErrorPage from "../../shared/components/pages/ErrorPage";

function Login() {
  const [formData, setFormDate] = useState({
    username: "",
    password: "",
  });
  const { username, password } = formData;
  const { serverIP, error, loading } = useServerIP();
  const performLogin = useLogin();

  useEffect(() => {
    applySavedTheme();
  }, []);

  useEffect(() => {
    console.log(error);
    console.log(serverIP);
    console.log(loading);
  }, [error, serverIP, loading]);

  const errorDetails = {
    message: "سرور در دسترس نیست",
    code: "404",
    name: "خطای سرور",
  };

  if (serverIP) {
    return (
      <div id="login">
        <div className="container">
          <div className="screen">
            <div className="screen__content">
              <form className="login" autoComplete="off">
                <h3 className="title-text">!خوش آمدید</h3>
                <div className="login__field">
                  <i className="login__icon fas fa-user"></i>

                  <input
                    type="text"
                    className="login__input"
                    placeholder="نام کاربری"
                    autoComplete="off"
                    onChange={(e) =>
                      setFormDate({ ...formData, username: e.target.value })
                    }
                  />
                </div>
                <div className="login__field">
                  <i className="login__icon fas fa-lock"></i>
                  <input
                    type="text"
                    className="login__input password"
                    autoComplete="new"
                    placeholder="رمز عبور"
                    onChange={(e) =>
                      setFormDate({ ...formData, password: e.target.value })
                    }
                  />
                </div>
                <button
                  className="login__submit"
                  onClick={(e) => performLogin(e, { username, password })}
                >
                  <span className="">ورود</span>
                  <i className="button__icon fas fa-chevron-right"></i>
                </button>
              </form>
            </div>
            <div className="screen__background">
              <span className="screen__background__shape screen__background__shape4"></span>
              <span className="screen__background__shape screen__background__shape3"></span>
              <span className="screen__background__shape screen__background__shape2"></span>
              <span className="screen__background__shape screen__background__shape1"></span>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (!loading) {
    return <ErrorPage error={errorDetails} />;
  } else {
    return <LoadingPage />;
  }
}

export default Login;
