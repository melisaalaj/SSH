import React from "react";
import "../assets/styles/sbar.css";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
// import DirectionsIcon from "@mui/icons-material/Directions";

export default function SearchBar() {
  return (
    <div className="firstpart">
      <div className="text--">
        <b>Porosi për delivery</b> në Prishtinë
        <br />
        <span className="span">Porosit ushqim online tani!</span>
      </div>

      <Paper
        className="searchbar"
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: 400,
        }}>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Address: "
          inputProps={{ "aria-label": "search google maps" }}
        />
        <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      </Paper>
    </div>
  );
}
