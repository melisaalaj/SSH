import React from "react";
import "../assets/styles/nav.css";
import ShoppingCartTwoToneIcon from "@mui/icons-material/ShoppingCartTwoTone";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="navbar">
        <h1 className="h1--"> DishDash</h1>
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
              <Link to="/login" className="nav-a">
                Login/SignUp
              </Link>
            </li>

            <li className="shop-icon">
              <Link to="/shopcard">
                <ShoppingCartTwoToneIcon />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
  );
}
