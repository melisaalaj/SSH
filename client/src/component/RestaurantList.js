import React, { useEffect, useState } from "react";
import axios from "axios";
import '../assets/styles/rescard.css';
import foto1 from '../assets/images/res1.jpg';
import foto2 from '../assets/images/res2.jpg';
import foto3 from '../assets/images/res3.jpg';
import { Link } from "react-router-dom";

const restaurants = [
  {
    name: "The Joint",
    location: "123  Street",
    photo: foto1,
    type: "French",
    openingHours: "Mon-Sun 11am-10pm",
  },
  { 
    name: "Pasta Palace",
    location: "456  Street",
    photo: foto2,
    type: "Italian",
    openingHours: "Mon-Sat 5pm-9pm",
  },
  {
    name: "Pizza Express",
    location: "789  Street",
    photo:foto3,
    type: "Japanese",
    openingHours: "Mon-Sun 12pm-10pm",
  },
 
];


const RestaurantCards = () => {
  return restaurants.map(restaurant => (
    <Link to="/restaurant/:menuId" className="restaurant-card">
    <div className="restaurant-card" key={restaurant.id}>
      <img src={restaurant.photo} alt={restaurant.name} />
      <div className="restaurant-info">
        <h5 className="restaurant-name">{restaurant.name}</h5>
        <p className="restaurant-location">{restaurant.location}</p>
        <p className="restaurant-type">{restaurant.type}</p>
        <p className="crestaurant-opening">{restaurant.openingHours}</p>
      </div>
    </div>
    </Link>
  ));
};

function RestaurantList() {

  return (
    <div>
      <div class="container">
        {RestaurantCards()}
      </div>
    </div>
  );
}

export default RestaurantList;