import React from "react";
import '../assets/styles/rescard.css';
import foto1 from '../assets/images/res1.jpg';
import foto2 from '../assets/images/res2.jpg';
import foto3 from '../assets/images/res3.jpg';


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


function RestaurantCard({ restaurant }) {
  return (
    <div className="restaurant-card">
      <img src={restaurant.photo} alt={restaurant.name} />
      <div className="restaurant-info">
        <h5 className="restaurant-name">{restaurant.name}</h5>
        <p className="restaurant-location">{restaurant.location}</p>
        <p className="restaurant-type">{restaurant.type}</p>
        <p className="crestaurant-opening">{restaurant.opening_hours}</p>
      </div>
    </div>
  );
}


function RestaurantList() {

  return (
    <div>
      <div className="container">
        {restaurants.map(restaurant => (
          <div className="" key={restaurant.id}>
            <RestaurantCard restaurant={restaurant} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default RestaurantList;