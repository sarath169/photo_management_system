import React, { useContext } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../UserContext";

function NavBar() {
  const {user,setUser, token, setToken } = useContext(UserContext)
  const history = useHistory()
  const handleLogout = () => {
    const API_URL = "http://127.0.0.1:8000/api/logout/"
    axios
      .get(API_URL,{headers : {
        Authorization: "token "+token,
      },})
      .then(function (response) {
        console.log(response);
        history.push("/");
        setToken(null)
        setUser(null)
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  return (
    <div>
      <nav className="blue">
        <div className="nav-wrapper container">
          <Link to="#" className="brand-logo">
            Logo
          </Link>
          <a href="#" data-target="mobile-demo" className="sidenav-trigger">
            <i className="material-icons">menu</i>
          </a>
          <ul className="right hide-on-med-and-down">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/searchlocation">LocationSearch</Link>
            </li>
            <li>
              <Link to="/favourites">Favourites</Link>
            </li>
            <li>
              <Link to="/addlocation">AddLocation</Link>
            </li>
            {token ? <li><button onClick={handleLogout}>Logout</button></li> : <li><Link to="/"></Link></li>}
          </ul>
        </div>
      </nav>

      <ul className="sidenav" id="mobile-demo">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/searchlocation">LocationSearch</Link>
        </li>
        <li>
          <Link to="/favourites">Favourites</Link>
        </li>
        <li>
          <Link to="/addlocation">AddLocation</Link>
        </li>
      </ul>
    </div>
  );
}

export default NavBar;
