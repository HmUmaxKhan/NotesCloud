import React, { useState,useRef } from "react";
import NoteContext from "./NoteContext";


const NoteState = (props) => {
  const [note, setNotes] = useState([]);
  //const [refresh,setRefresh] = useState(0);
 
  let refOpen = useRef(null);
  let edit = ()=>{
    refOpen.current.click();
  }

  const showNotes = async () => {
    const url = "http://localhost:5000/api/notes/checkingnotes";
    let notes = await fetch(url, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRkMWQ5NTVhNDA4YmJkYTE3NTg5M2Y0In0sImlhdCI6MTY5MTQ3NDk3NH0.GjJLrWVNGJxvySrYMOIu2Uku6jTFLSnOKF6T_r_2rbk",
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
            "auth-token":
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRkMWQ5NTVhNDA4YmJkYTE3NTg5M2Y0In0sImlhdCI6MTY5MTQ3NDk3NH0.GjJLrWVNGJxvySrYMOIu2Uku6jTFLSnOKF6T_r_2rbk",
        },
        body: JSON.stringify({title,description,tag})
    })
    let data = response.json();
    console.log(data);
    let newAdd = [...note,newNote]; 
    setNotes(newAdd);
    console.log(note);
    console.log(newAdd);

}

  //Update Note

  const UpdateFunc= async(id,title,description,tag)=>{
    const url = `http://localhost:5000/api/notes/updatenote${id}`
    let response  = await fetch(url,{
        method: "POST",
        headers:{
            "content-type": "application/json",
            "auth-token":
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRkMWQ5NTVhNDA4YmJkYTE3NTg5M2Y0In0sImlhdCI6MTY5MTQ3NDk3NH0.GjJLrWVNGJxvySrYMOIu2Uku6jTFLSnOKF6T_r_2rbk",
        },
        body: JSON.stringify({title,description,tag})
    })
    let data = response.json();
    console.log(data);
}


  // Deleting  a Note
  const DeleteFunc= async(id)=>{
    const url = `http://localhost:5000/api/notes/deletenote/${id}`;
    let notes = await fetch(url,{
     method: 'DELETE',
     headers:{
        "content-type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRkMWQ5NTVhNDA4YmJkYTE3NTg5M2Y0In0sImlhdCI6MTY5MTQ3NDk3NH0.GjJLrWVNGJxvySrYMOIu2Uku6jTFLSnOKF6T_r_2rbk",
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
    <NoteContext.Provider value={{ edit,refOpen,note, showNotes,DeleteFunc, AddFunc}}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
