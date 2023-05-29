import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/styles/sbar.css";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBar() {
  const navigate = useNavigate();
  const [location, setLocation] = useState("");

  const handleSearch = async (event) => {
    event.preventDefault();
    if (location.trim() !== "") {
      try {
        const locationParts = location.trim().split(","); 
        const city = locationParts[0].trim();
        const street = locationParts[1].trim(); 

        // Make an API request to fetch the restaurant location
        const response = await fetch(
          `http://localhost:3000/api/location?city=${encodeURIComponent(city)}&street=${encodeURIComponent(street)}`
        );
        const data = await response.json();
        if (data.restaurants.length > 0) {
          // Get the ID of the first restaurant in the list
          const restaurantId = data.restaurants[0].id;
  
          // Navigate to the restaurant page using the retrieved ID
          // navigate(`/restaurants/:${restaurantId}`);
          navigate(`/restaurants/:menuid`);
        } else {
          console.log("No restaurants found for the given location.");
        }
      } catch (error) {
        console.error("Error fetching location data:", error);
      }
    }
  };

  const handleChange = (event) => {
    setLocation(event.target.value);
  };

  return (
    <div className="firstpart">
      <div className="text--">
        <b>Order for delivery</b> in Prishtinë
        <br />
        <span className="span">Order food online now!</span>
      </div>

      <Paper  className="searchbar" component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: 400,
        }}   onSubmit={handleSearch} >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Address: "
          value={location}
          onChange={handleChange}
        />
        <IconButton type="submit" sx={{ p: "10px" }} aria-label="search" onChange={handleSearch}>
          <SearchIcon  />
        </IconButton>
       
      </Paper>
    </div>
  );
}
