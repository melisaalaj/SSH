import "./assets/styles/App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Ballina from "./pages/Ballina";
import Restaurantet from "./pages/Restaurantet";
import Kontakti from "./pages/Kontakti";
import LoginSignUp from "./pages/LoginSignUp";
import ShopCard from "./pages/ShopCard";

import { ScreenClassProvider } from "react-grid-system";

function App() {
  return (
    <ScreenClassProvider className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Ballina />} />

          <Route path="/restaurantet" element={<Restaurantet />} />

          <Route path="/kontakti" element={<Kontakti />} />

          <Route path="/login" element={<LoginSignUp />} />

          <Route path="/shop-card" element={<ShopCard />} />
        </Routes>
      </Router>

      {/* <Footer/> */}
    </ScreenClassProvider>
  );
}

export default App;
