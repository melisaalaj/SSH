import React from 'react';
import { BrowserRouter as Router, Switch, Route , Routes} from 'react-router-dom';
import Sidebar from './component/Sidebar';
import OrderList from './pages/OrderList';
import Contacts from './pages/Contacts';
import Staff from './pages/Staff';
import Invoices from './pages/Invoices';
import Restaurant1 from './pages/Restaurant1';



const Admin = () => {
  return (
    <Router>
      <div className="container">
        <div className="sidebar">
          <Sidebar />
        </div>
        <div className="content">
          <Routes>
            <Route exact path="/" element={<OrderList />} />
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