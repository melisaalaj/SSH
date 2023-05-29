import React, { useEffect, useState } from "react";
import axios from "axios";
import "../assets/styles/rescard.css";
import foto1 from "../assets/images/res1.jpg";
import foto2 from "../assets/images/res2.jpg";
import foto3 from "../assets/images/res3.jpg";
import { Link } from "react-router-dom";

const restaurants = [
  {
    name: "The Joint",
    id: 1,
    location: "123  Street",
    photo: foto1,
    type: "French",
    openingHours: "Mon-Sun 11am-10pm",
  },
  {
    name: "Pasta Palace",
    id: 2,
    location: "456  Street",
    photo: foto2,
    type: "Italian",
    openingHours: "Mon-Sat 5pm-9pm",
  },
  {
    name: "Pizza Express",
    id: 3,
    location: "789  Street",
    photo: foto3,
    type: "Japanese",
    openingHours: "Mon-Sun 12pm-10pm",
  },
];

const RestaurantCards = () => {
  return restaurants.map((restaurant) => (
    <Link to={`/restaurant/${restaurant.id}`} className="restaurant-card">
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
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    // Fetch data from the database using Axios
    axios
      .get("/api/restaurants")
      .then((response) => {
        setRestaurants(response.data);
      })
      .catch((error) => {
        console.error("Error fetching restaurants:", error);
      });
  }, []);
  return (
    <div>
      <div class="container">
        {/* {restaurants.map(restaurant => (
          <div className="" key={restaurant.id}>
            <RestaurantCard restaurant={restaurant} />
          </div>
        ))} */}
        {RestaurantCards()}
      </div>
    </div>
  );
}

export default RestaurantList;
