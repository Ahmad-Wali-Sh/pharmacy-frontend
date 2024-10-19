import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSignIn } from "react-auth-kit";
import { toast } from "react-toastify";
import useServerIP from "./components/services/ServerIP";
import { useUserPermissions } from "./components/States/States";
import "./login.css";
import { Audio, Dna } from "react-loader-spinner";

function Login() {
  const signIn = useSignIn();
  const [formData, setFormDate] = React.useState({
    username: "",
    password: "",
  });

  const { serverIP } = useServerIP();
  const { setUserPermissions } = useUserPermissions();

  const onSubmit = (e) => {
    e.preventDefault();
    toast.warn("در حال ورود. لطفا منتظر بمانید", { autoClose: 3000 });
    if (serverIP) {
      axios
        .post(`${serverIP}auth/token/login/`, formData)
        .then((res1) => {
          axios
            .post(
              `${serverIP}auth/` + "token/logout/",
              {},
              {
                headers: {
                  Authorization: `Token ${res1.data.auth_token}`,
                },
              }
            )
            .finally(() => {
              axios
                .post(`${serverIP}auth/token/login/`, formData)
                .then((res) => {
                  if (res.status === 200) {
                    axios
                      .get(`${serverIP}auth/users/me/`, {
                        headers: {
                          Authorization: `Token ${res.data.auth_token}`,
                        },
                      })
                      .then((me_res) => {
                        signIn({
                          token: res.data.auth_token,
                          expiresIn: 12000000000,
                          tokenType: "Token",
                          authState: me_res.data,
                        });
                        toast.success(`${me_res.data.first_name}: خوش آمدید`);
                      });
                    axios.defaults.headers.common[
                      "Authorization"
                    ] = `Token ${res.data.auth_token}`;
                    axios
                      .get(`${serverIP}api/user/permissions/`)
                      .then((res) => {
                        setUserPermissions(res.data.permissions);
                      });
                  }
                })
                .catch((err) => {
                  toast.error("اطلاعات وارد شده درست نمیباشد");
                });
            });
        })
        .catch((error) => {
          if (error.toString() === "AxiosError: Network Error") {
            toast.error("سرور در دسترس نیست");
          } else {
            serverIP
              ? toast.error("اطلاعات وارد شده درست نمیباشد", {
                  autoClose: 3000,
                })
              : toast.error("خطا! سرور ای.پ.آی در دسترس نیست", {
                  autoClose: 3000,
                });
          }
        });
    }
  };

  const [readOnly, setReadonly] = useState(true);

  if (serverIP) {
    return (
      <div className="container">
        <div className="screen">
          <div className="screen__content">
            <form className="login" autoComplete="new-password">
              <h3 className="title-text">Welcome | Sharif Pharmacy</h3>
              <div className="login__field">
                <i className="login__icon fas fa-user"></i>

                <input
                  type="text"
                  className="login__input"
                  placeholder="User name"
                  autoComplete="new-password"
                  onChange={(e) =>
                    setFormDate({ ...formData, username: e.target.value })
                  }
                />
              </div>
              <div className="login__field">
                <i className="login__icon fas fa-lock"></i>
                <input
                  type="password"
                  className="login__input"
                  autoComplete="new-password"
                  placeholder="Password"
                  readOnly={readOnly}
                  onFocus={() => setReadonly(false)}
                  onBlur={() => setReadonly(true)}
                  onChange={(e) =>
                    setFormDate({ ...formData, password: e.target.value })
                  }
                />
              </div>
              <button className="button login__submit" onClick={onSubmit}>
                <span className="button__text">Log In Now</span>
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
    );
  } else {
    return (
      <div className="loading-page">
        <Dna
          visible={true}
          height="120"
          width="120"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper"
        />
        <h2>لطفا منتظر باشید...</h2>
      </div>
    );
  }
}

export default Login;
