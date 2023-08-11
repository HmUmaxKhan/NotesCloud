import React, { useState, useContext } from "react";
import NoteContext from "../context/notes/NoteContext";

function UpdateNote(props) {
  const initialState = {
    title: props.etitle,
    description: props.edescription,
    tag: props.etag,
  };

  let context = useContext(NoteContext);
  let { refOpen, } = context;

  const [AddNote, setAddNote] = useState(initialState);
  let width = {
    marginTop: "1rem",
    marginLeft: "2rem",
    marginRight: "2rem",
  };

  const handleChange = (event) => {
    setAddNote({[event.target.name]: event.target.value });
    console.log(AddNote);
  }

  return (
    <div>
      <button
        ref={refOpen}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Update Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="form-floating mb-3" style={width}>
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
              <div className="form-floating" style={width}>
                <input
                  type="text"
                  style={{ height: "7rem" }}
                  className="form-control"
                  id="Description"
                  name="description"
                  placeholder="Description"
                  value={AddNote.description}
                  onChange={handleChange}
                />
                <label htmlFor="Description">Description</label>
              </div>
              <div className="form-floating" style={width}>
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
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateNote;
