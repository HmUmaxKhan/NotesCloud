import React, { useState, useContext } from "react";
import NoteContext from "../context/notes/NoteContext";

function AddNote(props) {
  let context = useContext(NoteContext);
  let { AddFunc } = context;

  const initialState = {
    title: "",
    description: "",
    tag: "",
  };

  const [AddNote, setAddNote] = useState(initialState);

  const handleChange = (event) => {
    setAddNote({ ...AddNote, [event.target.name]: event.target.value });
  };

  const handleClick = (e) => {
    e.preventDefault();
    AddFunc(AddNote.title, AddNote.description, AddNote.tag, AddNote);
    props.showAlert("Note has been added", "success");
    setAddNote(initialState);
  };

  return (
    <div>
      <div className="container mt-4 my-3" style={{height: "75vh"}}>
        <div
          className="text-bg-light"
          style={{
            marginLeft: "27rem",
            marginRight: "27rem",
            borderRadius: "20px",
            border: "solid 5px green",
    
          }}
        >
          <h2 className="text-center">ADD a Note</h2>
        </div>
        <div
          className="container pt-3 my-3 bg-light"
          style={{
            border: "solid black 1px",
            borderRadius: "25px",
            height: "20srem",
            boxShadow: "5px 10px green",
          }}
        >
          <div className="form-floating mb-2 mt-3" style={props.istyle}>
            <input
              type="text"
              className="form-control"
              name="title"
              id="title"
              placeholder="Title"
              onChange={handleChange}
              value={AddNote.title}
            />
            <label htmlFor="Title">Title</label>
          </div>
          <div className="form-floating" style={props.istyle}>
            <input
              type="text"
              className="form-control"
              id="Description"
              name="description"
              placeholder="Description"
              value={AddNote.description}
              onChange={handleChange}
            />
            <label htmlFor="Description">Description</label>
          </div>
          <div className="form-floating" style={props.istyle}>
            <input
              type="text"
              className="form-control"
              id="Tag"
              name="tag"
              placeholder="Tag"
              value={AddNote.tag}
              onChange={handleChange}
            />
            <label htmlFor="Tag">Tag</label>
            <div className="d-flex justify-content-center my-2">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={handleClick}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddNote;
