import { useEffect, useState } from "react";
import useServerIP from "../../shared/hooks/useServerIP";
import LoadingPage from "../../shared/components/pages/LoadingPage";
import applySavedTheme from "../../shared/services/applySavedTheme";
import useLogin from "../hook/useLogin";
import "../styles/login.scss";
import ErrorPage from "../../shared/components/pages/ErrorPage";
import { useTranslation } from "react-i18next";

function Login() {
  const { t } = useTranslation()
  const [formData, setFormDate] = useState({
    username: "",
    password: "",
  });
  const { username, password } = formData;
  const { serverIP, loading } = useServerIP();
  const performLogin = useLogin();

  useEffect(() => {
    applySavedTheme();
  }, []);

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
                <h3 className="title-text">{t('welcome')}</h3>
                <div className="login__field">
                  <i className="login__icon fas fa-user"></i>

                  <input
                    type="text"
                    name='username'
                    className="login__input"
                    placeholder={t('login.user-input-placeholder')}
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
                    name='password'
                    placeholder={t('login.password-input-placeholder')}
                    onChange={(e) =>
                      setFormDate({ ...formData, password: e.target.value })
                    }
                  />
                </div>
                <button
                  className="login__submit"
                  onClick={(e) => performLogin(e, { username, password })}
                >
                  <span className="">{t('login.login-button-text')}</span>
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
