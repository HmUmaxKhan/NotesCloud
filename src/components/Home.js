import React from 'react'
import Notes from './Notes'
import AddNote from './AddNote'


function Home(props) {

  let width=
  {   
      marginTop: "1rem",
      marginLeft:"8rem",
      marginRight:"8rem",
  }

  
  return(
    <div>
      <AddNote showAlert={props.showAlert} istyle={width} style={{style:"none"}}/>
      <Notes showAlert={props.showAlert} istyle={width}/>
    </div>
  )
}

export default Home
