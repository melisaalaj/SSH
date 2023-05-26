import "./assets/styles/App.css";
import Navbar from "./component/Navbar";
import Ballina from "./pages/Ballina";
import Restaurantet from "./pages/Restaurantet";
import Restaurant from "./pages/Restaurant";
import MenuPage from "./pages/MenuPage";
import Kontakti from "./pages/Kontakti";
import LoginSignUp from "./pages/LoginSignUp";
import ShopCard from "./pages/ShopCard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SelectedItemsProvider } from './services/SelectedItemsContext';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51N8NsNJfPtLrc5k00vcYa3vSsCQSGtXz0CDPqnFhusQZnio6fVWHhhq6Oi1FjGO2XvSjsesFphe8stsb8fQqoSYk00GmypY5Hv');

function App() {
  return (
   
      <Router>
              <Navbar className='navbar' />
      <SelectedItemsProvider>
        <Routes>
          <Route path="/" element={<Ballina />} />
          <Route path="/restaurantet" element={<Restaurantet />} />
          <Route path="/restaurant" element={<Restaurant />} />
          <Route path="/restaurant/:menuId" element={<MenuPage />} />
          <Route path="/kontakti" element={<Kontakti />} />
          <Route path="/login" element={<LoginSignUp />} />
          <Route path="/shop-card" element={<Elements stripe={stripePromise}><ShopCard /></Elements>}/> 
        </Routes>
        </SelectedItemsProvider>
      </Router>
    
  );
}

export default App;
