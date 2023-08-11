import React from "react";
import NewsSvg from "./NewsSvg";



function NoteItems(props) {
    
  return (
      <div>
      <div className="card text-center">
        <div className="card-body">
          <h5 className="card-title">
              {props.title}
              
              <NewsSvg id = {props.id} />
    

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
