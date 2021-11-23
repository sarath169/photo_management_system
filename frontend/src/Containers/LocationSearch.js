import React, { useContext, useEffect, useState } from "react";

import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { CircularProgress } from "@material-ui/core";

import Display from "./Display";
import { UserContext } from "../UserContext";


function LocationSearch() {
  const {user, token} = useContext(UserContext)
  const [selectedLocation, setSelectedLocation] = useState("");

  const [locations, setLocations] = useState([]);
  const [images, setImages] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);

  const [loading, setLoading] = useState(false);

  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 520,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    alignment: {
      alignItems: "center",
    },
  }));

  const classes = useStyles();

  const Search = async () => {
    const API_URL = "http://127.0.0.1:8000/api/locationsearch/";
    await axios
      .get(API_URL, {
        params: {
          location: selectedLocation,
          page: pageIndex + 1,
          user: user
        },
        headers : {Authorization : "token "+token}
      })
      .then(function (response) {
        console.log(response);
        setImages(response.data.photos.photo);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleChange = (event) => {
    console.log(event.target.value);
    setSelectedLocation(event.target.value);
  };

  const nextPage = () => {
    setPageIndex(pageIndex + 1);
    console.log(pageIndex);
  };
  const prevPage = () => {
    setPageIndex(pageIndex - 1);
    console.log(pageIndex);
  };

  const displayImages = () => {
    console.log(images);
    return (
      <React.Fragment>
        <div className="container">
          {images.length > 0 ? (
            <>
              <Display results={images} />
              <div className="container center">
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
    // Update the document title using the browser API
    const API_URL = "http://localhost:8000/api/populate/"
    axios
      .get(API_URL, {headers : {Authorization : "token "+token}})
      .then((response) => {
        console.log(response.data);
        setLocations(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (pageIndex || selectedLocation) {
      Search();
      setLoading(true);
      displayImages();
    }
  }, [pageIndex, selectedLocation]);

  return (
    <div>
      <h2 className="center">Search from saved locations</h2>
      <br />
      <div className="container center ">
        <form onSubmit>
          <FormControl className={classes.formControl}>
            <InputLabel
              id="demo-simple-select-label"
              style={{ fontSize: "20px" }}
            >
              Location
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              onChange={handleChange}
            >
              {locations.map((item, index) => {
                return (
                  <MenuItem value={item.location_name} key={index}>
                    {item.location_name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </form>
      </div>
      <div>{displayImages()}</div>
    </div>
  );
}

export default LocationSearch;
