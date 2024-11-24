import React, { useState } from 'react'
import './Searchbar.css'

const Searchbar = ({searching}) => {
 
 
  return (
    <>
  <div className="searchbar">
<input type="text" placeholder='search' onChange={searching} className='inputsearchbar' />

  </div>
  </>
  )
}

export default Searchbar