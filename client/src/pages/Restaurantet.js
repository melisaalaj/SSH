import "../assets/styles/restaurantet.css"; // Importimi i CSS fajllit të jashtëm
import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import backgroundImage2 from '../assets/images/perime.jpg';
import Footer from '../component/Footer';

function Restaurantet() {
  return (
 
  <><div class="layer">

      <div id="parallax-wrap" class="parallax-search" data-parallax="scroll" data-position="top" data-bleed="10" style={{
        backgroundImage: `url(${backgroundImage2})`,
      }}>
        <div class="search-wraps">
          <h1>We need your location!</h1>
          <p>
          Please let us know your location
          </p>

        </div>
      </div>
      <div class="search-bar">
        <div class="search-content">
          <h1>Order Food Online </h1>
          <p>Order for delivery, take away or reservation</p>
          <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }} className="forma">

            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Address:"
              inputProps={{ 'aria-label': 'search' }} />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
        </div>
      </div>
    </div><Footer /></>
      );
  }

  


export default Restaurantet;