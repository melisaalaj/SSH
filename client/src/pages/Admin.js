import React from 'react';
import { BrowserRouter as Router, Switch, Route, Routes } from 'react-router-dom';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import Contacts from './Contacts';
import Staff from './Staff';
import Invoices from './Invoices';
import Restaurant1 from './Restaurant1';

const Admin = () => {
  return (
    <Router>
      <div className="container">
        <div className="sidebar">
          <Sidebar />
        </div>
        <div className="content">
          <Routes>
            <Route exact path="/" element={<Dashboard />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/staff" element={<Staff />} />
            <Route path="/invoices" element={<Invoices />} />
            <Route path="/restaurant1" element={<Restaurant1 />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default Admin;
