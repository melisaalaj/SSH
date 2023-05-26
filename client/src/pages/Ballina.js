import React from "react";
import Navbar from "../component/Navbar";
import SearchBar from "../component/SearchBar";
import Footer from "../component/Footer";
import Carousel1 from "../component/Carousel1";
import ResList from "../component/RestaurantList";

import "../assets/styles/App.css";

import { ScreenClassProvider } from "react-grid-system";

export default function Ballina() {
  return (
    <>
      <Navbar />
      <div className="searchbar--">
        <SearchBar />
      </div>
      <Carousel1 />
      <h1 className="h11">Choose the restaurant:</h1>
      <ResList />
      <Footer />
    </>
  );
}
