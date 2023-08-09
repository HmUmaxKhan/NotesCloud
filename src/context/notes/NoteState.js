import React from "react";
import NoteContext from "./NoteContext";

const NoteState = (props)=>{
    
    return (<NoteContext.Provider value={{love,update}}>
        {props.children}

        </NoteContext.Provider>
    )
}

export default NoteState;