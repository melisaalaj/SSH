import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/sidebar.css'; 

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <h2>Admin</h2>
      <ul>
      <li>
          <Link to="/">Order</Link>
        </li>
        <li>
          <Link to="/contacts">Contacts</Link>
        </li>
        <li>
          <Link to="/staff">Staff</Link>
        </li>
        <li>
          <Link to="/invoices">Invoices</Link>
        </li>
        <li>
          <Link to="/restaurant1">Restaurant</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
