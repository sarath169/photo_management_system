import React, { useContext, useState } from "react";

import axios from "axios";
import Modal from '../Components/Modal';
import { UserContext } from "../UserContext";

function AddNotes(props) {
  const {user, token} = useContext(UserContext)
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  console.log(props.id)
  const addNote = (event) => {
    event.preventDefault();
    const API_URL = "http://127.0.0.1:8000/api/addnote/";
    console.log("enytered")
    axios
      .post(API_URL, {
        user : user,
        image: props.id,
        text: text,
        
      },{headers : {Authorization : "token "+token}})
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
      props.onSubmitClose()
      
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  return (
    <div className="container">
      <div className="row">
        <form className="col s12">
          <div className="row">
            <div className="input-field col s12">
              <textarea
                id="textarea1"
                className="materialize-textarea"
                value={text}
                onChange={handleTextChange}
              ></textarea>
              <label for="textarea1">Notes</label>
            </div>
            <div className="center">
            <a className="waves-effect waves-light btn" onClick={addNote} >
              Submit
            </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddNotes;
