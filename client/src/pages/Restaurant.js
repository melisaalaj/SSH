import React from "react";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import restaurant1 from '../assets/images/res1.jpg';
import restaurant2 from '../assets/images/res2.jpg';
import restaurant3 from '../assets/images/res3.jpg';
import restaurant4 from '../assets/images/res4.jpg';
import icon1 from '../assets/images/icon1.jpg';
import icon2 from '../assets/images/icon2.jpg';
import icon3 from '../assets/images/icon3.jpg';
import icon4 from '../assets/images/icon4.jpg';
import StarIcon from '@mui/icons-material/Star';
import FavoriteIcon from '@mui/icons-material/Favorite';
import backgroundImage2 from '../assets/images/perime.jpg';
import Footer from '../component/Footer';
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';


function StarRating() {
  const [stars, setStars] = useState(0);
  const [starColor, setStarColor] = useState('white');

  function handleClick(index) {
    if (stars < 5) {
      setStars(stars + 1);
    }
    setStarColor(index <= stars ? 'yellow' : 'white');
  }

  function handleToggleColor() {
    setStarColor(starColor === 'white' ? 'yellow' : 'white');
  }

  const numStars = Array.from({ length: 5 }).filter((_, index) => index <= stars).length;

  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <IconButton onClick={handleClick.bind(null, index)} key={index}>
          <StarIcon style={{ color: index <= stars ? starColor : 'white' }} onClick={handleToggleColor} />
        </IconButton>
      ))}
      <span style={{ fontSize: 12, marginLeft: 5 }}>Ratings {numStars} </span>
    </>
  );
}






function RestaurantCard({ name, image, image1, address, breakfast, distance, transportCost, minOrder }) {
  return (
    <div style={{ display: "flex", marginBottom: 20, border:"solid #f5f5f5" , marginLeft:80, marginRight:40, marginTop:100}}>
      <div style={{ marginRight: 50, marginTop:25 }}>
        <img src={image1} alt={name} style={{ width: 150, height: 150, objectFit: "cover" ,margin:10}} />
        <div style={{ display: "flex", alignItems: "center", marginTop: 10 }}>
         <LocalShippingIcon/>
          <span style={{ fontSize: 14, margin:10 }}>Cash is allowed in hand</span>
        </div>
      </div>
      <div style={{ flex: 1 , border:"solid #f5f5f5", margin:30, backgroundColor:"#f5f5f5"}} >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", marginRight: 10 }}>
              <span style={{ fontSize: 24,marginRight:20}}><StarRating/></span>
              
            </div>
            <button style={{ padding: "8px 16px", borderRadius: 5, border: "none", marginRight: 10, backgroundColor:"greenyellow" }}>Open</button>
            <FavoriteIcon />
          </div>
         
        </div>
        <h2 style={{ color:"black", marginLeft:0}}>{name}</h2>
        <p>{address}</p>
        <p>{`Breakfast: ${breakfast}`}</p>
        <p>{`Distance: ${distance} km`}</p>
        <p>{`Shipping time: not available`}</p>
        <p>{`Delivery Distance: ${distance} km`}</p>
        <p>{`Shipping payment: €${transportCost}`}</p>
        <p>{`Minimum order: €${minOrder}`}</p>
        <button style={{ padding: "8px 16px", borderRadius: 5, backgroundColor: "darkred",color:"white", border: "none" ,marginLeft:0}}>Menu</button>
      </div>
      <div style={{ marginRight: 240 }} >
        <img src={image} alt={name} style={{ width: 350, height: 450, objectFit: "cover", alignItems: "center", marginBottom:0}} />
      </div>
    </div>
    
  );
}

function Restaurant() {
  return (
    <><div class="layer">

<div id="parallax-wrap" class="parallax-search" data-parallax="scroll"data-position="top"data-bleed="10"style={{
    backgroundImage: `url(${backgroundImage2})`,}} >
    <div class="search-wraps">
        <h1  style={{ marginTop:100}}>Order Food Online</h1>
        <p>
        Choose your favorite restaurant
        </p>
       
    </div>
</div>
    
    <div>
      <RestaurantCard
        name="The Joint"
        image={restaurant1}
        address="123 Street French"
        breakfast="Breakfast"
        distance={2.1}
        transportCost={1.5}
        minOrder={5.0}
        image1={icon1}
      />
      <RestaurantCard
        name="Pasta Palace"
        image={restaurant2}
        address="456 Street Italian"
        breakfast="Breakfast 2"
        distance={2.1}
        transportCost={1}
        minOrder={5.0}
        image1={icon2}
        />
         <RestaurantCard
        name="Pizza Express"
        image={restaurant3}
        address="789 Street Japanese"
        breakfast="Breakfast 3"
        distance={7.4}
        transportCost={0.5}
        minOrder={5.0}
        image1={icon3}
        />
        <RestaurantCard
        name="Luxury Restaurant"
        image={restaurant4}
        address="101"
        breakfast="Breakfast 4"
        distance={1.54}
        transportCost={2.0}
        minOrder={5.0}
        image1={icon4}
        />
        </div>
        </div>
       <Footer /></>
        );}
export default Restaurant;