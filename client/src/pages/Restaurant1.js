import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/styles/restaurant1.css";

const Restaurant1 = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleAddRestaurant = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      const response = await fetch("http://localhost:3000/api/restaurants/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          name,
          description,
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
    <div className="restaurant-form">
      <h2>Add Restaurant</h2>
      <form>
        <label>
          Name:<br/>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label><br/>
        <label>
          Description:<br/>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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