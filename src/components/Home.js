import React from 'react'
import Notes from './Notes'
import AddNote from './AddNote'
import UpdateNote from './UpdateNote'


function Home() {
  
  return(
    <div>
      <AddNote />
      <Notes />
    </div>
  )
}

export default Home
