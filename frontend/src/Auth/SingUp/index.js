import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";

function SignUp() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const history = useHistory();

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };
  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };
  const password2ChangeHandler = (event) => {
    setPassword2(event.target.value);
  };
  const userNameChangeHandler = (event) => {
    setUserName(event.target.value);
  };
  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const API_URL = "http://127.0.0.1:8000/api/signup/";
      const formdata = new FormData();
      formdata.append("username", userName);
      formdata.append("password", password);
      formdata.append("password2", password2)
      formdata.append("email", email)

      axios
        .post(API_URL, formdata)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      const result = {userName};
      window.M.toast({ html: `Welcome ${result}`, classes: "green" });
      history.push("/");
    } catch (error) {
      window.M.toast({ html: error.message, classes: "red" });
    }
  };
  return (
    <div className="center container">
      <h1>SignUp</h1>
      <form onSubmit={submitHandler}>
        <div className="input-field col s6">
          <input
            placeholder="joe"
            type="text"
            value={userName}
            onChange={userNameChangeHandler}
          />
          <input
            placeholder="joe@gmail.com"
            type="email"
            value={email}
            onChange={emailChangeHandler}
          />
          <input
            placeholder="password"
            type="password"
            value={password}
            onChange={passwordChangeHandler}
          />
          <input
            placeholder="Confirm Password"
            type="password"
            value={password2}
            onChange={password2ChangeHandler}
          />
          <button type="submit" className="btn blue">
            SignUp
          </button>
          <p>
            have an account? <Link to="/login">login</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
