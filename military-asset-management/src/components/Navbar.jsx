import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">Military Assets</Link>
      <div className="navbar-links">
        <Link to="/">Dashboard</Link>
        <Link to="/purchases">Purchases</Link>
        <Link to="/transfers">Transfers</Link>
        <Link to="/assignment">Assignments</Link>
        <Link to="/profile">👤 Profile</Link>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
