import React from 'react';
import { NavLink } from 'react-router-dom';
import '../assets/styles/sidebar.css'; 

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <h1 className='h1-'>Admin</h1>
      <ul>
        <li>
          <NavLink to="/admin" activeClassName="active" >
            Order
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/contacts" activeClassName="active">
            Contacts
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/staff" activeClassName="active">
            Staff
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/invoices" activeClassName="active">
            Invoices
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/restaurant1" activeClassName="active">
            Restaurant
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;