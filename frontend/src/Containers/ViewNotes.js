import React, { useState, useEffect, useContext } from "react";

import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { UserContext } from "../UserContext";

function ViewNotes(props) {
  const { user, token } = useContext(UserContext);
  const [text, setText] = useState("");
  const [notes, setNotes] = useState([]);
  const [newnote, setNewNote] = useState(false);

  const useStyles = makeStyles((theme) => ({
    paper: {
      position: "absolute",
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

  const classes = useStyles();

  const listNotes = () => {
    const API_URL = "http://127.0.0.1:8000/api/listnotes/";
    console.log(props.id);
    axios
      .get(API_URL, {
        params: { id: props.id, user: 2 },

        headers: { Authorization: "token " + token },
      })
      .then((response) => {
        console.log(response);
        setNotes(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addNote = (event) => {
    event.preventDefault();
    const API_URL = "http://127.0.0.1:8000/api/addnote/";

    axios
      .post(
        API_URL,
        {
          image: props.id,
          text: text,
          user: 2,
        },
        {
          headers: { Authorization: "token " + token },
        }
      )
      .then(function (response) {
        console.log(response);
        setNewNote(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  useEffect(() => {
    listNotes();
    setNewNote(false);
  }, [newnote]);

  return (
    <div className="container center">
      <h2>Notes</h2>
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
            <a className="waves-effect waves-light btn" onClick={addNote}>
              Add
            </a>
          </div>
        </div>
      </form>
      <ol>
        {notes.length > 0 ? (
          notes.map((note, index) => {
            return (
              <div className="">
                <li key={index}>{note.text}</li>
              </div>
            );
          })
        ) : (
          <h3>Please add some notes</h3>
        )}
      </ol>
    </div>
  );
}

export default ViewNotes;
