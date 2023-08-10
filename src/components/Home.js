import React, { useState,useContext } from 'react'
import Notes from './Notes'
import NoteContext from '../context/notes/NoteContext'


function Home() {

    let context = useContext(NoteContext);
    let {AddFunc} = context;

    const [AddNote, setAddNote] = useState({
        title:"",
        description:"",
        tag:""
    });

    let width=
    {   
        marginTop: "1rem",
        marginLeft:"8rem",
        marginRight:"8rem",
    }

    const handleChange = (event) => {
       setAddNote({...AddNote,[event.target.name]:event.target.value})
    };

    const handleClick = ()=>{
     AddFunc(AddNote.title,AddNote.description,AddNote.tag);
    }

  return (
    <div>
    <div className='container my-3'>
    <h2 className='text-center'>Add a Note</h2>
    <div className="form-floating mb-3" style={width}>
    <input type="text" className="form-control" name="title" id="title" placeholder="Title" onChange={handleChange} />
    <label htmlFor="Title">Title</label>
  </div>
  <div className="form-floating" style={width}>
    <input type="text" className="form-control" id="Description" name="description" placeholder="Description" onChange={handleChange}/>
    <label htmlFor="Description">Description</label>
  </div>
  <div className="form-floating" style={width}>
    <input type="text" className="form-control" id="Tag" name="tag" placeholder="Tag" onChange={handleChange} />
    <label htmlFor="Tag">Tag</label>
    <div className='d-flex justify-content-center my-2'>
     <button type='submit' className="btn btn-primary" onClick={handleClick}>Add</button>
    </div>
  </div>
  <Notes />
    </div>
    </div>
  )

 
}

export default Home
