import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="bg-gray-800 text-white p-4">
    <ul className="flex justify-around">
      <li><Link to="/">Dashboard</Link></li>
      <li><Link to="/purchases">Purchases</Link></li>
      <li><Link to="/transfers">Transfers</Link></li>
      <li><Link to="/assignments">Assignments</Link></li>
    </ul>
  </nav>
);

export default Navbar;
