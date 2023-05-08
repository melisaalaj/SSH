import React from "react";
import Navbar from "../component/Navbar";
import SearchBar from "../component/SearchBar";

export default function Restaurantet(){
   return (
    <>
        <Navbar className="navbar" />
        <div className="searchbar--">
            <SearchBar />
        </div>
        
        <div className="container">
            <h1>Restaurantet</h1>
        </div>
    </>
   )
}