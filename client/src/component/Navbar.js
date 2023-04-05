import React from "react";
import '../assets/styles/nav.css';
import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import Ballina from "../pages/Ballina";
import Restaurantet from "../pages/Restaurantet";
import Kontakti from "../pages/Kontakti";
import LoginSignUp from "../pages/LoginSignUp";
import ShopCard from "../pages/ShopCard";

export default function Navbar(){
    return(
      <Router>
        <div className="navbar">
           <h1 className="h1--"> DishDash</h1>
           <nav>
         <ul className="navbar--items">
            <li><Link to="/ballina" className="nav-a"> Ballina</Link> </li>
            <li><Link to="/restaurantet" className="nav-a"> Shfleto restaurantet</Link></li>
            <li><Link to="/kontakti" className="nav-a"> Kontakti</Link></li>
            <li><Link to="/login" className="nav-a"> Kyqu dhe regjistrohu</Link></li>
             
           <li className="shop-icon"><Link to="/shopcard"> <ShoppingCartTwoToneIcon /></Link></li> 
         </ul>
         </nav>

         <Routes>
          <Route path="/ballina" element={<Ballina />}/> 
            
          <Route path="/restaurantet" element={<Restaurantet />}/>
          
          <Route path="/kontakti"element={<Kontakti />}/>
         
          <Route path="/login" element={<LoginSignUp />}/>

          <Route path="/shop-card" element={<ShopCard />}/>

          
        </Routes>
        </div>
       </Router>
    )
}