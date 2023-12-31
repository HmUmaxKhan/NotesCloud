import React, { useState } from "react";
import NoteContext from "./NoteContext";


const NoteState = (props) => {
  const [note, setNotes] = useState([]);
  //const [refresh,setRefresh] = useState(0);
 

  const showNotes = async () => {
    const url = "http://localhost:5000/api/notes/checkingnotes";
    let notes = await fetch(url, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        "auth-token":localStorage.getItem("token")
      },
    });
    let notesData = await notes.json();
    setNotes(notesData);
   // console.log(note);
  };


  // Adding a new note

  const AddFunc= async(title,description,tag,newNote)=>{
    const url = "http://localhost:5000/api/notes/addnotes"
    let response  = await fetch(url,{
        method: "POST",
        headers:{
            "content-type": "application/json",
            "auth-token":localStorage.getItem("token"),
        },
        body: JSON.stringify({title,description,tag,date:Date.now()})
    })
    let data = response.json();
    console.log(data);
    let newAdd = [...note,newNote]; 
    setNotes(newAdd);
    console.log(note);
    console.log(newAdd);

}

  //Update Note

  const UpdateFunc= async(title,description,tag,id)=>{
    const url = `http://localhost:5000/api/notes/updatenote/${id}`
    let response  = await fetch(url,{
        method: "PUT",
        headers:{
            "content-type": "application/json",
            "auth-token":localStorage.getItem("token")
        },
        body: JSON.stringify({title,description,tag,date:Date.now()})
    })
    let data = response.json();
    console.log(data);

    // Logic  To Change Data in client side


    let newArray = JSON.parse(JSON.stringify(note));
    
    for (let element of newArray) {
      if(element._id ===id){
        element.title = title;
        element.description = description;
        element.tag = tag;
        break;
      }
    }
    console.log(newArray);
    setNotes(newArray);
}


  // Deleting  a Note
  const DeleteFunc= async(id)=>{
    const url = `http://localhost:5000/api/notes/deletenote/${id}`;
    let notes = await fetch(url,{
     method: 'DELETE',
     headers:{
        "content-type": "application/json",
        "auth-token":localStorage.getItem("token")
        },
        
    })
     
     let data = await notes.json();
     console.log(data);
     
     let newArray = note.filter((to)=>{return to._id !== id})
     setNotes(newArray);
     console.log(newArray);
     console.log(note);
}

  return (
    <NoteContext.Provider value={{ UpdateFunc,note, showNotes,DeleteFunc, AddFunc}}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
