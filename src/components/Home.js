import React from 'react'
import Notes from './Notes'
import AddNote from './AddNote'


function Home() {

  let width=
  {   
      marginTop: "1rem",
      marginLeft:"8rem",
      marginRight:"8rem",
  }

  
  return(
    <div>
      <AddNote istyle={width}/>
      <Notes istyle={width}/>
    </div>
  )
}

export default Home
