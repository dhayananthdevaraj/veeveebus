import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  return (
    <nav className="navbar">
      <h1>VeeVee Holidays</h1>
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/" className="nav-link">Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/viewbus" className="nav-link">View Buses</Link>
        </li>
        <li className="nav-item">
          <Link to="/bus" className="nav-link">Add Bus</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
