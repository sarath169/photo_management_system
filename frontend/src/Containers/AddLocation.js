import React, { useContext, useState } from "react";

import axios from "axios";
import { UserContext } from "../UserContext";

function AddLocation() {
  const {user,token} = useContext(UserContext)
  const [values, setValues] = useState({
    latitude: "",
    longitude: "",
    location_name: "",
    user: user,
  });
  console.log(user)

  console.log(token)


  const set = (name) => {
    return ({ target: { value } }) => {
      setValues((oldValues) => ({ ...oldValues, [name]: value }));
    };
  };

  const AddNewLocation = () => {
    const url = "http://127.0.0.1:8000/api/addlocation/";
    console.log(values)
    axios
      .post(url, values, {headers : {
        Authorization: "token "+token,
      },})
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const onSubmit = async (event) => {
    event.preventDefault(); // Prevent default submission
    try {
      await AddNewLocation();
      // setValues({
      //   latitude: '', longitude: '', location_name : ''
      // });
    } catch (e) {
      alert(`Registration failed! ${e.message}`);
    }
  };

  return (
    <div className="container">
      <div>
        <h2 className="center">Add Location</h2>
      </div>
      <form onSubmit={onSubmit} className="col s12">
        <div className="row">
          <div className="input-field col s12">
            <input
              placeholder="Location"
              id="name"
              value={values.location_name}
              onChange={set("location_name")}
            />
          </div>
        </div>
        <div className="row">
          <div className="input-field col s6">
            <input
              placeholder="Latitude"
              id="latitude"
              value={values.latitude}
              onChange={set("latitude")}
            />
          </div>
          <div className="input-field col s6">
            <input
              placeholder="Longitude"
              id="longitude"
              value={values.longitude}
              onChange={set("longitude")}
            />
          </div>
        </div>
        <div className="center">
          <button className="btn waves-effect waves-light" type="submit">
            ADD
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddLocation;
