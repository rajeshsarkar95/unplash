import React from 'react'
import "./Navbar.css"

function Navber({setQuery }) {
  return (
    <div>
     <nav>
      <div className="navbar_input">
        <input 
         type="text"
         placeholder="Search for images..."
         onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <div className="navbarsearch">
        <button>Search</button>
      </div>
     </nav>
    </div>
  )
}
export default Navber
