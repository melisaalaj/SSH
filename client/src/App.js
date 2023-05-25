import "./assets/styles/App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Ballina from "./pages/Ballina";
import Restaurantet from "./pages/Restaurantet";
import MenuPage from "./pages/MenuPage";
import Kontakti from "./pages/Kontakti";
import LoginSignUp from "./pages/LoginSignUp";
import ShopCard from "./pages/ShopCard";
import Restaurant from "./pages/Restaurant";


function App() {
  return (
    
      <Router>
        <Routes>
          <Route path="/" element={<Ballina />} />
          <Route path="/restaurantet" element={<Restaurantet />} />
          <Route path="/restaurant/:menuId" element={<MenuPage />} />
          <Route path="/restaurant" element={<Restaurant />} />
          <Route path="/kontakti" element={<Kontakti />} />
          <Route path="/login" element={<LoginSignUp />} />
          <Route path="/shop-card" element={<ShopCard />} />
        </Routes>
      </Router>
  );
}

export default App;
