import React, { useContext, useEffect } from "react";
import NoteContext from "../context/notes/NoteContext";
import NoteItems from "./NoteItems";

function Notes() {
  let context = useContext(NoteContext);
  const  {note,showNotes} = context
  useEffect(() => {
    showNotes();
    // eslint-disable-next-line
  },[] )
  
  return (
    <div>
      <div className="text-center my-3">
        <h3>Your Notes</h3>
      </div>
      <div className="container d-flex justify-contnet-evenly my-2">
    
          <div className="row" style={{marginLeft:"5rem"}}>
            {note&&note.map((note) => {
              return (
                <div className="col-md-4 my-3" key={note._id}>
                  <NoteItems
                    title={note.title}
                    description={note.description}
                    tag={note.tag}
                    id = {note._id}
                    date = {note.date}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      );
}

export default Notes;
