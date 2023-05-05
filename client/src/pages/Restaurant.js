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
      <span style={{ fontSize: 12, marginLeft: 5 }}>Vlerësimet {numStars} </span>
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
          <span style={{ fontSize: 14, margin:10 }}>Lejohet para ne dore</span>
        </div>
      </div>
      <div style={{ flex: 1 , border:"solid #f5f5f5", margin:30, backgroundColor:"#f5f5f5"}} >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", marginRight: 10 }}>
              <span style={{ fontSize: 24,marginRight:20}}><StarRating/></span>
              
            </div>
            <button style={{ padding: "8px 16px", borderRadius: 5, border: "none", marginRight: 10, backgroundColor:"greenyellow" }}>Hapur</button>
            <FavoriteIcon />
          </div>
         
        </div>
        <h2 style={{ color:"black", marginLeft:0}}>{name}</h2>
        <p>{address}</p>
        <p>{`Mëngjesi: ${breakfast}`}</p>
        <p>{`Distanca: ${distance} km`}</p>
        <p>{`Koha e transportit: nuk është në dispozicion`}</p>
        <p>{`Delivery Distance: ${distance} km`}</p>
        <p>{`Pagesa e transportit: €${transportCost}`}</p>
        <p>{`Porosia minimale: €${minOrder}`}</p>
        <button style={{ padding: "8px 16px", borderRadius: 5, backgroundColor: "darkred",color:"white", border: "none" ,marginLeft:0}}>Shiko Mënynë</button>
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
        <h1  style={{ marginTop:100}}>Shfleto Restaurantin</h1>
        <p>
          Zgjidhe restaurantin tënd të preferuar
        </p>
       
    </div>
</div>
    
    <div>
      <RestaurantCard
        name="Bregu i Diellit"
        image={restaurant1}
        address="Prishtinë Bregu i Diellit 10000"
        breakfast="Mëngjesi"
        distance={2.1}
        transportCost={1.5}
        minOrder={5.0}
        image1={icon1}
      />
      <RestaurantCard
        name="Restaurant 2"
        image={restaurant2}
        address="Address 2"
        breakfast="Breakfast 2"
        distance={2.1}
        transportCost={1}
        minOrder={5.0}
        image1={icon2}
        />
         <RestaurantCard
        name="Restaurant 3"
        image={restaurant3}
        address="Address 3"
        breakfast="Breakfast 3"
        distance={7.4}
        transportCost={0.5}
        minOrder={5.0}
        image1={icon3}
        />
        <RestaurantCard
        name="Restaurant 4"
        image={restaurant4}
        address="Address 4"
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