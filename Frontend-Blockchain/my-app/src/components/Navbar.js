import React from 'react';
import { NavLink } from 'react-router-dom'
const Navbar = () => {
  return (
    <>
   <nav className="navbar">
      <div className="container">
        <div className="logo">
          
        </div>
        <div className="nav-elements">
          <ul>
            <li>
              <NavLink to="/" style={{color:'white'}}>Home</NavLink>
            </li>
            <li>
              <NavLink to="/" style={{color:'white'}}>Blog</NavLink>
            </li>
            <li>
              <NavLink to="/" style={{color:'white'}}>Projects</NavLink>
            </li>
            <li>
              <NavLink to="/" style={{color:'white'}}>About</NavLink>
            </li>
            <li>
              <NavLink to="/" style={{color:'white'}}>Contact</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    </>
  );
}

export default Navbar;
