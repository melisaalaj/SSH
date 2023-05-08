import React from "react";
import Navbar from "../component/Navbar";
import SearchBar from "../component/SearchBar";
import Carousel1 from "../component/Carousel1";
import Footer from "../component/Footer";

export default function Ballina() {
  return (
    <>
      <Navbar className="navbar" />
      <div className="searchbar--">
        <SearchBar />
      </div>
      <Carousel1 />
    </>
  );
}