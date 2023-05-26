import "./assets/styles/App.css";
import Navbar from "./component/Navbar";
import Ballina from "./pages/Ballina";
import Restaurantet from "./pages/Restaurantet";
import MenuPage from "./pages/MenuPage";
import Kontakti from "./pages/Kontakti";
import LoginSignUp from "./pages/LoginSignUp";
import ShopCard from "./pages/ShopCard";
import Restaurant from "./pages/Restaurant";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { ScreenClassProvider } from "react-grid-system";

function App() {
  return (
    <ScreenClassProvider className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Ballina />} />
          <Route path="/restaurantet" element={<Restaurantet />} />
          <Route path="/restaurantet/:menuId" element={<MenuPage />} />
          
          <Route path="/kontakti" element={<Kontakti />} />
          <Route path="/login" element={<LoginSignUp />} />
          <Route path="/shop-card" element={<ShopCard />} />
          <Route path="/restaurant" element={<Restaurant />} />
        </Routes>
      </Router>

      {/* <Footer/> */}
    </ScreenClassProvider>
  );
}

export default App;
