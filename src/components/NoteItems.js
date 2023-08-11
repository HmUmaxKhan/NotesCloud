import React from "react";
import NewsSvg from "./NewsSvg";



function NoteItems(props) {
  const {note,update} = props;
    
  return (
      <div>
      <div className="card text-center">
        <div className="card-body">
          <h5 className="card-title">
              {note.title}
              
              <NewsSvg id = {note._id} update={update} note={note} />
    

          </h5>
          <p className="card-text">
            {note.description}
          </p>
          <p className="card-text"><small className="text-body-secondary">{note.tag}</small>
          </p>
          <p className="card-text"><small className="text-body-secondary">{note.date}</small></p>
          </div>
        </div>
      </div>
  );
}

export default NoteItems;
