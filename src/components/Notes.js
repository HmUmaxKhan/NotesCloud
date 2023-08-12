import React, { useContext, useEffect, useRef, useState } from "react";
import NoteContext from "../context/notes/NoteContext";
import NoteItems from "./NoteItems";
import { useNavigate } from "react-router-dom";

function Notes(props) {
  let context = useContext(NoteContext);
  const { note, showNotes, UpdateFunc } = context;
  let refOpen = useRef(null);
  let refClose = useRef(null);
  let navigate = useNavigate();

  useEffect(() => {
  
    if(localStorage.getItem("token")){
    showNotes();
    }else{
      navigate("/login")
    }
    
    // eslint-disable-next-line
  }, []);

  const [updateNote, setUpdate] = useState({
    title: "",
    description: "",
    tag: "",
    id: "",
  });

  const handleChange = (event) => {
    setUpdate({ ...updateNote, [event.target.name]: event.target.value });
  };

  const handleClick = () => {
    // Handle your logic here
    UpdateFunc(
      updateNote.title,
      updateNote.description,
      updateNote.tag,
      updateNote._id
    );
    refClose.current.click();
    props.showAlert("Note has been updated","success");
  };

  const update = (current) => {
    refOpen.current.click();
    console.log(current);
    setUpdate(current);
  };

  return (
    <div>
      <div>
        <button
          ref={refOpen}
          type="button"
          className="btn btn-primary d-none"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        ></button>

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
                <div className="form-floating mb-3" style={props.istyle}>
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    id="title"
                    placeholder="Title"
                    onChange={handleChange}
                    value={updateNote.title}
                  />
                  <label htmlFor="Title">Title</label>
                </div>
                <div className="form-floating" style={props.istyle}>
                  <input
                    type="text"
                    style={{ height: "7rem" }}
                    className="form-control"
                    id="Description"
                    name="description"
                    placeholder="Description"
                    value={updateNote.description}
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
                    value={updateNote.tag}
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
                  ref={refClose}
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={handleClick}
                  className="btn btn-primary"
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="text-center mt-5 my-3">
        <h2>
          {note.length === 0 ? "No Notes are Here to show" : "Your Notes"}
        </h2>
      </div>

      <div className="containe my-2">
        <div
          className="row d-flex justify-content-around"
          style={{ marginLeft: "2rem", marginRight: "2rem" }}
        >
          {note &&
            note.map((note, index) => {
              return (
                <div className="col-md-4 my-3" key={index}>
                  <div
                    style={{
                      border: "solid black 1px",
                      borderRadius: "10px",
                      boxShadow: "5px 10px #888888",
                    }}
                  >
                    <NoteItems note={note} update={update} showAlert={props.showAlert} />
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Notes;
