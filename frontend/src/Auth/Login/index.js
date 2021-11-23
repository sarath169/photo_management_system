import React, { useState, useContext, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../UserContext";

function Login() {
  const { user, setUser, token, setToken } = useContext(UserContext);
  const [username, setUserName] = useState("");
  const [users, setUsers] = useState([]);
  const [password, setPassword] = useState("");
  const history = useHistory();

  const userNameChangeHandler = (event) => {
    setUserName(event.target.value);
  };
  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };
  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const API_URL = "http://127.0.0.1:8000/api/login/";
      const formdata = new FormData();
      formdata.append("username", username);
      formdata.append("password", password);

      axios
        .post(API_URL, formdata)
        .then(function (response) {
          console.log(response);
          setToken(response.data.token);
          window.M.toast({ html: `Welcome ${username}`, classes: "green" });
          getUserId();
          history.push("/search");
        })
        .catch(function (error) {
          window.M.toast({ html: error.message, classes: "red" });
          console.log(error);
        });
    } catch (error) {
      window.M.toast({ html: error.message, classes: "red" });
    }
  };
  const getUserId = () => {
    console.log(users)
    users.map((item) => {
      console.log(item.id);
      item.username == username ? setUser(item.id) : <></>;
    });
  };

  useEffect(() => {
    const url = "http://127.0.0.1:8000/api/userslist/";
    axios
      .get(url)
      .then(function (response) {
        console.log(response);
        setUsers(response.data.results);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  return (
    <div className="center container">
      <h1>Login</h1>
      <form onSubmit={submitHandler}>
        <div className="input-field col s6">
          <input
            placeholder="joe"
            type="text"
            value={username}
            onChange={userNameChangeHandler}
          />
          <input
            placeholder="password"
            type="password"
            value={password}
            onChange={passwordChangeHandler}
          />
          <button type="submit" className="btn blue">
            Login
          </button>

          <p>
            Don't have an account <Link to="/signup">signup</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
