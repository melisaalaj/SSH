import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Restaurant1 = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [breakfast, setBreakfast] = useState("");
  const [distance, setDistance] = useState("");
  const [transportCost, setTransportCost] = useState("");
  const [minOrder, setMinOrder] = useState("");

  const handleAddRestaurant = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/restaurants/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          address,
          breakfast,
          distance,
          transportCost,
          minOrder,
        }),
      });
      
      if (response.ok) {
        // Restaurant added successfully, navigate back to the RestaurantPage
        navigate("/Restaurant");
      } else {
        // Handle error case if the API call fails
        // You can display an error message or take appropriate action
      }
    } catch (error) {
      // Handle error case if there is an exception during the API call
      // You can display an error message or take appropriate action
    }
  };

  return (
    <div>
      <h2>Add Restaurant</h2>
      <form>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label><br/>
        <label>
          Address:
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </label><br/>
        <label>
          Breakfast:
          <input
            type="text"
            value={breakfast}
            onChange={(e) => setBreakfast(e.target.value)}
          />
        </label><br/>
        <label>
          Distance:
          <input
            type="text"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
          />
        </label><br/>
        <label>
          Transport Cost:
          <input
            type="text"
            value={transportCost}
            onChange={(e) => setTransportCost(e.target.value)}
          />
        </label><br/>
        <label>
          Minimum Order:
          <input
            type="text"
            value={minOrder}
            onChange={(e) => setMinOrder(e.target.value)}
          />
        </label><br/>
        <button type="button" onClick={handleAddRestaurant}>
          Add Restaurant
        </button>
      </form>
    </div>
  );
};

export default Restaurant1;
