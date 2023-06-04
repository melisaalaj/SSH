import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './component/Navbar';
import Ballina from './pages/Ballina';
import Restaurantet from './pages/Restaurantet';
import Restaurant from './pages/Restaurant';
import MenuPage from './pages/MenuPage';
import Kontakti from './pages/Kontakti';
import LoginSignUp from './pages/LoginSignUp';
import ShopCard from './pages/ShopCard';
import { SelectedItemsProvider } from './services/SelectedItemsContext';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Admin from './pages/Admin';

const stripePromise = loadStripe('pk_test_51N3dURKQk7qhCl2R1hIgUXl0yG3mdGVyo5iTh66kUlQiCZOr2UJwsNN3QwqwI9myhvTyYl16DUI8rg2bt8FXCR6900tg8kJn4T');

function App() {
  return (
    <Router>
      <Navbar className="navbar" />
      <SelectedItemsProvider>
        <Routes>
          <Route path="/" element={<Ballina />} />
          <Route path="/restaurantet" element={<Restaurantet />} />
          <Route path="/restaurant/city/:city" element={<Restaurant />} />
          <Route path="/restaurant/:menuId" element={<MenuPage />} />
          <Route path="/kontakti" element={<Kontakti />} />
          <Route path="/login" element={<LoginSignUp />} />
          <Route
            path="/shop-card"
            element={
              <Elements stripe={stripePromise}>
                <ShopCard />
              </Elements>
            }
          />
          <Route path="/admin/*" element={<Admin />} />
        </Routes>
      </SelectedItemsProvider>
    </Router>
  );
}

export default App