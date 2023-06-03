import React, { useEffect, useState } from "react";
import "../assets/styles/nav.css";
import ShoppingCartTwoToneIcon from "@mui/icons-material/ShoppingCartTwoTone";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const [accessToken, setAccessToken] = useState(null);
  const signOut = () => {
    localStorage.removeItem("accessToken");
    setAccessToken(null);
  };

  useEffect(() => {
    setAccessToken(localStorage.getItem("accessToken"));
  }, []);

  const hideNavbarPaths = ["/admin", "/admin/staff", "/admin/invoices","/admin/contacts", "/admin/restaurant1"];

  if (hideNavbarPaths.includes(location.pathname)) {
    return null; // Return null to hide the navbar on specific routes
  }

  return (
    <div className="navbar">
      <h1 className="h1--">DishDash</h1>
      <nav>
        <ul className="navbar--items">
          <li>
            <Link to="/" className="nav-a">
              Main
            </Link>
          </li>
          <li>
            <Link to="/restaurantet" className="nav-a">
              Restaurants
            </Link>
          </li>
          <li>
            <Link to="/kontakti" className="nav-a">
              Contact
            </Link>
          </li>
          <li>
            {!accessToken ? (
              <Link to="/login" className="nav-a">
                Login/SignUp
              </Link>
            ) : (
              <button className="signOutButton" onClick={() => signOut()}>
                Sign Out
              </button>
            )}
          </li>
          <li className="shop-icon">
            <Link to="/shop-card">
              <ShoppingCartTwoToneIcon />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

