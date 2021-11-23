import React, { useState, useEffect, useContext } from "react";

import { useHistory } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContext";


function Favourites() {
  const {user, token} = useContext(UserContext)
  const history = useHistory();
  const [favouriteItems, setFavouriteItems] = useState([]);

  const loadFavouries = () => {
    const API_URL = "http://127.0.0.1:8000/api/listfavourites/";
    axios
      .get(API_URL, {
        params : {user : user},
        headers : {Authorization : "token "+token}})
      .then((response) => {
        console.log(response);
        setFavouriteItems(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    loadFavouries();
  }, []);
  
  return (
    <React.Fragment>
      <div className="container center ">
        <h2>Favourites</h2>
      </div>
      <div className="row">
        {favouriteItems.map((image, index) => {
          console.log(image);
          let srcPath =
            "https://farm" +
            image.farm +
            ".staticflickr.com/" +
            image.server +
            "/" +
            image.id +
            "_" +
            image.secret +
            ".jpg";
          return (
            <div className="container center">
              <div className=" center">
                <div className="col s6 m4">
                  <div className="card">
                    <div className="card-image">
                      <img height="300" key={index} src={srcPath}></img>
                    </div>
                    <div className="card-action center">
                      <p>
                        <label>
                          <a
                            className="blue-text "
                            style={{fontSize: "17.5px"}}
                           href = {"/notes/"+image.id}
                          >
                            view notes
                          </a>
                        </label>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        
      </div>
    </React.Fragment>
  );
}

export default Favourites;

// key = f5e3dc5e6886a1e7799eeb85aad99cb5

// secret = 0fabccf50c8da78b

// MAPQuest Api kEy
// 7DC9G42zz50tjuTnKIyjXAPK3aGaJszr
