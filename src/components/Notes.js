import React, { useContext, useEffect, useRef } from "react";
import NoteContext from "../context/notes/NoteContext";
import NoteItems from "./NoteItems";
import UpdateNote from "./UpdateNote";

function Notes() {
  let context = useContext(NoteContext);
  const  {note,showNotes} = context;


  
  useEffect(() => {
    showNotes();
    // eslint-disable-next-line
  },[] )
  
  return (
    <div>
    <div className='container'>
    </div>
      <div className="text-center my-3">
        <h3>Your Notes</h3>
      </div>
      <div className="container d-flex justify-contnet-evenly my-2">
    
          <div className="row" style={{marginLeft:"5rem"}}>
            {note&&note.map((note,index) => {
              return (
                <div className="col-md-4 my-3" key={index}>
                  <NoteItems
                    title={note.title}
                    description={note.description}
                    tag={note.tag}
                    id = {note._id}
                    date = {note.date}
                  />
                  <UpdateNote 
                  etitle={note.title}
                  edescription={note.description}
                  etag={note.tag}
                  eid = {note._id}
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
