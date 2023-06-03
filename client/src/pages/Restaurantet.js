import React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Footer from "../component/Footer";
import { Link } from "react-router-dom";
import "../assets/styles/restaurantet.css";

function Restaurantet() {
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
              >
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Address:"
                  inputProps={{ "aria-label": "search" }}
                />
                <IconButton
                  type="button"
                  sx={{ p: "10px" }}
                  aria-label="search"
                  component={Link}
                  to="/Restaurant"
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
