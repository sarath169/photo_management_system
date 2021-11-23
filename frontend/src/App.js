import React, { useMemo, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import NavBar from "./Components/NavBar";
import Input from "./Containers/Input";
import Favourites from "./Containers/Favourites";
import AddLocation from "./Containers/AddLocation";
import Display from "./Containers/Display";
import LocationSearch from "./Containers/LocationSearch";
import ViewNotes from "./Containers/ViewNotes";
import AddNotes from "./Containers/AddNotes";
import Login from "./Auth/Login";
import "./App.css";
import SignUp from "./Auth/SingUp";
import { UserProvider } from "./UserContext";

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const providerValue = useMemo(
    () => ({ user, setUser, token, setToken }),
    [user, setUser, token, setToken]
  );
  return (
    <BrowserRouter>
      <UserProvider value={providerValue}>
        <NavBar />
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route exact path="/signup">
            <SignUp />
          </Route>
          <Route exact path="/search">
            <Input />
          </Route>
          <Route path="/favourites">
            <Favourites />
          </Route>
          <Route path="/addlocation">
            <AddLocation />
          </Route>
          <Route path="/searchlocation">
            <LocationSearch />
          </Route>
          <Route path="/result">
            <Display />
          </Route>
        </Switch>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
