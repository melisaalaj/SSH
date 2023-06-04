import React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Footer from "../component/Footer";
import { Link } from "react-router-dom";
import "../assets/styles/restaurantet.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
function Restaurantet() {
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
    <>
      <div className="layer">
        <div
          id="parallax-wrap"
          className="parallax-search"
          data-parallax="scroll"
          data-position="top"
          data-bleed="10"
        >
          <div className="search-wraps">
            <h1>We need your location!</h1>
            <p>Please let us know your location</p>
          </div>
          <div className="search-bar">
            <div className="search-content">
              <h1>Order Food Online</h1>
              <p>Order for delivery, take away or reservation</p>
              <Paper
                component="form"
                sx={{
                  p: "2px 4px",
                  display: "flex",
                  alignItems: "center",
                  width: 400,
                }}
                className="forma"
                onSubmit={handleSearch}
              >
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Address:"
                  inputProps={{ "aria-label": "search" }}
                  onChange={handleChange}
                />
                <IconButton
                  type="button"
                  sx={{ p: "10px" }}
                  aria-label="search"
            
                >
                  <SearchIcon />
                </IconButton>
              </Paper>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Restaurantet;
