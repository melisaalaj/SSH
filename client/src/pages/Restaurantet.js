import "../assets/styles/restaurantet.css"; // Importimi i CSS fajllit të jashtëm
import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import backgroundImage2 from '../assets/images/perime.jpg';

function Restaurantet() {
  return (
 
  <div class="layer">

    <div id="parallax-wrap" class="parallax-search" data-parallax="scroll"data-position="top"data-bleed="10"style={{
        backgroundImage: `url(${backgroundImage2})`,}} >
        <div class="search-wraps">
            <h1>Na duhet lokacioni juaj!</h1>
            <p>
               Të lutem na shëno lokacionin tënd
            </p>
           
        </div>
    </div>
<div class="search-bar">
  <div class="search-content">
    <h1>Porosit Ushqim Online </h1>
    <p>Porosi për delivery, merr me vete ose rezervim</p>
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
    >
      <IconButton sx={{ p: '10px' }} aria-label="menu">
        <MenuIcon />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search Google Maps"
        inputProps={{ 'aria-label': 'search google maps' }}
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
        <DirectionsIcon />
      </IconButton>
    </Paper>

  </div>
</div>
    </div>
  
      );
  }

  

export default Restaurantet;
