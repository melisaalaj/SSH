import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Sidebar from '../component/Sidebar';
import OrderList from './OrderList';
import Contacts from './Contacts';
import Staff from './Staff';
import Invoices from './Invoices';
import Restaurant1 from './Restaurant1';

const Admin = () => {
  return (
    <div className="container">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="content">
        <Routes>
          <Route path="/" element={<OrderList />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/staff" element={<Staff />} />
          <Route path="/invoices" element={<Invoices />} />
          <Route path="/restaurant1" element={<Restaurant1 />} />
        </Routes>
      </div>
    </div>
  );
};
export default Admin;