import React, { useState, useEffect, useContext } from "react";

import axios from "axios";
import { useHistory } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";

import Display from "./Display";
import { UserContext } from "../UserContext";

function Input() {
  const {user,token} = useContext(UserContext);
  const history = useHistory();
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [images, setImages] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [loading, setLoading] = useState(false)
  console.log(user)
  console.log(token)
  

  const Search = async () => {
    const API_URL = "http://127.0.0.1:8000/api/search/";
    console.log(latitude, longitude);
    console.log(pageIndex)
    await axios
      .get(API_URL, {
        params: {latitude:latitude, longitude: longitude, page: pageIndex+1},
        headers : {Authorization : "token "+token}
      },)
      .then(function (response) {
        setImages(response.data.photos.photo);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const onSubmit = async (event) => {
    event.preventDefault(); // Prevent default submission
    setLoading(true)
    try {
      await Search();
      displayImages();
    } catch (e) {
      alert(`Search failed! ${e.message}`);
    }
  };


  const nextPage = () => {
    setPageIndex(pageIndex+1)
    console.log(pageIndex)
  };
  const prevPage = () => {
    setPageIndex(pageIndex-1)
    console.log(pageIndex)
  };

  const handleLatitudeChange = (event) => {
      setLatitude(event.target.value);
  };

  const handleLongitudeChange = (event) => {
      setLongitude(event.target.value);
  };
  
  const displayImages = () => {
    console.log(images);
    return (
      <React.Fragment>
        <div className="">
          {images.length > 0 ? (
            <>
              <Display results={images} />
              <div className="container center">
                <br/>
                {pageIndex != 0 ? (
                  <button
                    className="btn waves-effect waves-light"
                    onClick={prevPage}
                  >
                    Prev
                  </button>
                ) : (
                  <></>
                )}

                {
                  <button
                    className="btn waves-effect waves-light"
                    onClick={nextPage}
                  >
                    Next
                  </button>
                }
              </div>
            </>
          ) : (
            <>
              {loading ? (
                <>
                  {" "}
                  <div className="container center">
                    <CircularProgress loading color="secondary" />
                  </div>
                </>
              ) : (
                <></>
              )}
            </>
          )}
        </div>
      </React.Fragment>
    );
  };
  
  useEffect(() => {
    if (pageIndex) {
    Search()
    displayImages()
  }
  },[pageIndex])
  
  return (
    <div className="container">
      <div>
        <h2 className="center">Picture Search By Geolocation</h2>
        <br />
      </div>
      <form onSubmit={onSubmit} className="col s12">
        <div className="row">
          <div className="input-field col s6">
            <input
              placeholder="Latitude"
              id="latitude"
              value={latitude}
              onChange={handleLatitudeChange}
            />
          </div>
          <div className="input-field col s6">
            <input
              placeholder="Longitude"
              id="longitude"
              value={longitude}
              onChange={handleLongitudeChange}
            />
          </div>
        </div>
        <div className="center">
          <button className="btn waves-effect waves-light" name="action">
            Submit
            <i className="material-icons right">send</i>
          </button>
        </div>
      </form>
      <br></br>
      <div>{displayImages()}</div>
      <br/>
    </div>
  );
}

export default Input;
