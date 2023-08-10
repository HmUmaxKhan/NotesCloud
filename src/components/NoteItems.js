import React from "react";
import NewsSvg from "./NewsSvg";
import NoteState from "../context/notes/NoteState";


function NoteItems(props) {
    
  return (
      <div>
      <div className="card text-center">
        <div className="card-body">
          <h5 className="card-title">
              {props.title}
              <NoteState>
              
              <NewsSvg id = {props.id} />
        
              </NoteState>

          </h5>
          <p className="card-text">
            {props.description}
          </p>
          <p className="card-text"><small className="text-body-secondary">{props.tag}</small>
          </p>
          <p className="card-text"><small className="text-body-secondary">{props.date}</small></p>
          </div>
        </div>
      </div>
  );
}

export default NoteItems;
