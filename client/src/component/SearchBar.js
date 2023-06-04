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
  const [restaurants, setRestaurants] = useState([]);

  const handleSearch = async (event) => {
    event.preventDefault();
    if (location.trim() !== "") {
      try {
        const city = location.trim();
        const token = localStorage.getItem("accessToken");
        const response = await fetch(`http://localhost:3000/api/restaurants/getByCity`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ city }),
        });
        const data = await response.json();
        console.log(data);
        if (data.length > 0) {
          navigate(`/restaurant/city/${city}`);
        } else {
          console.log("No restaurants found for the given city.");
        }
      } catch (error) {
        console.error("Error fetching restaurants data:", error);
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

      <Paper
        className="searchbar"
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: 400,
        }}
        onSubmit={handleSearch}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="City: "
          value={location}
          onChange={handleChange}
        />
        <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
    </div>
  );
}
