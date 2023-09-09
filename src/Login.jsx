import axios from "axios";
import React from "react";
import { useSignIn } from "react-auth-kit";

function Login() {
  const signIn = useSignIn();
  const [formData, setFormDate] = React.useState({
    username: "",
    password: "",
  });

  const LOGIN_URL = import.meta.env.VITE_LOGIN;
  const ME_URL = import.meta.env.VITE_ME;

  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .post(LOGIN_URL, formData)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          axios
            .get(ME_URL, {
              headers: {
                Authorization: `Token ${res.data.auth_token}`,
              },
            })
            .then((me_res) => {
              signIn({
                token: res.data.auth_token,
                expiresIn: 1200,
                tokenType: "Token",
                authState: me_res.data,
              });
            });
          axios.defaults.headers.common[
            "Authorization"
          ] = `Token ${res.data.auth_token}`;
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="container">
      <div className="screen">
        <div className="screen__content">
          <form className="login">
            <h3 className="title-text">Welcome | Sharif Pharmacy</h3>
            <div className="login__field">
              <i className="login__icon fas fa-user"></i>
              <input
                type="text"
                className="login__input"
                placeholder="User name"
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
                placeholder="Password"
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
}

export default Login;
