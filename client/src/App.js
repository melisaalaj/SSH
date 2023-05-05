
import './assets/styles/App.css';
import Navbar from "./component/Navbar";
import Ballina from "./pages/Ballina";
import Restaurantet from "./pages/Restaurantet";
import Kontakti from "./pages/Kontakti";
import LoginSignUp from "./pages/LoginSignUp";
import ShopCard from "./pages/ShopCard";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return ( 
    
    <Router>
    <Navbar className='navbar'/>
     <Routes>
    
              <Route exact path="/"  element={<Ballina />}/> 
                
              <Route path="/restaurantet" element={<Restaurantet />}/>
              
              <Route path="/kontakti"element={<Kontakti />}/>
             
              <Route path="/login" element={<LoginSignUp />}/>
    
              <Route path="/shop-card" element={<ShopCard />}/>
    
            </Routes>
    
            </Router>

  );
}

export default App;





