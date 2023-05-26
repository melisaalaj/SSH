import "./assets/styles/App.css";
// import Navbar from "./component/Navbar";
import Ballina from "./pages/Ballina";
import Restaurantet from "./pages/Restaurantet";
import Restaurant from "./pages/Restaurant";
import MenuPage from "./pages/MenuPage";
import Kontakti from "./pages/Kontakti";
import LoginSignUp from "./pages/LoginSignUp";
import ShopCard from "./pages/ShopCard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ScreenClassProvider } from "react-grid-system";


function App() {
  return (
    <ScreenClassProvider class="">
      <Router>
        <Routes>
          <Route path="/" element={<Ballina />} />
          <Route path="/restaurantet" element={<Restaurantet />} />
          <Route path="/restaurant" element={<Restaurant />} />
          <Route path="/restaurant/:menuId" element={<MenuPage />} />
          <Route path="/kontakti" element={<Kontakti />} />
          <Route path="/login" element={<LoginSignUp />} />
          <Route path="/shop-card" element={<ShopCard />} />
        </Routes>
      </Router>
    </ScreenClassProvider>
  );
}

export default App;
