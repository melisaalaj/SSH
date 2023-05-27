import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
const Invoices = () => {
    const navigate = useNavigate();
  const [foodName, setFoodName] = useState("");
  const [foodDescription, setFoodDescription] = useState("");
  const [foodPrice, setFoodPrice] = useState("");
  

  const handleAddFood = () => {
    const newFoodItem = {
      name: foodName,
      description: foodDescription,
      price: foodPrice
    };
  
    // Make an API call to add the new food item
    // Replace `API_ENDPOINT` with your actual API endpoint for adding food items
    fetch(`http://localhost:3000/api/food/create/1`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newFoodItem),
    })
      .then(response => response.json())
      .then(data => {
        console.log('New food item added:', data);
        // Handle the response data or update the state in the parent component
        // For example, you can add the new food item to the menuData state in the parent component
        // setMenuData([...menuData, data]);
  
        // Navigate back to the MenuPage
        navigate("/MenuPage");
      })
      .catch(error => {
        console.error('Error adding food item:', error);
        // Handle the error if necessary
      });
  };
  
  const handleCancel = () => {
    // Navigate back to the MenuPage without adding a new food item
    navigate("/MenuPage");
  };

  return (
    <div>
      <h2>Add Food Item</h2>
      <TextField
        label="Food Name"
        value={foodName}
        onChange={(e) => setFoodName(e.target.value)}
      />
      <TextField
        label="Description"
        value={foodDescription}
        onChange={(e) => setFoodDescription(e.target.value)}
      />
      <TextField
        label="Price"
        value={foodPrice}
        onChange={(e) => setFoodPrice(e.target.value)}
      />
      <Button variant="contained" onClick={handleAddFood}>
        Add Food
      </Button>
      <Button variant="contained" onClick={handleCancel}>
        Cancel
      </Button>
    </div>
  );
};

export default Invoices;
