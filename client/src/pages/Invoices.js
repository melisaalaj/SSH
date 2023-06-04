import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "../assets/styles/invoices.css";
const Invoices = () => {
  const navigate = useNavigate();
  const [menuId, setMenuId] = useState("");
  const [foodName, setFoodName] = useState("");
  const [foodDescription, setFoodDescription] = useState("");
  const [foodPrice, setFoodPrice] = useState("");
  const [foodImage, setFoodImage] = useState(null);

  const handleAddFood = async () => {
    const accessToken = localStorage.getItem("accessToken");

    const price = parseFloat(foodPrice);

    if (isNaN(price)) {
      console.log("Invalid price value");
      return;
    }

    const formData = new FormData();
    formData.append("foodImage", foodImage);
    formData.append("menuId", menuId);
    formData.append("name", foodName);
    formData.append("description", foodDescription);
    formData.append("price", price);

    try {
      const response = await fetch("http://localhost:3000/api/food/create", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("New food item added:", data);
        
        navigate("/MenuPage");
      } else {
        const errorData = await response.json();
        console.log("API call failed:", errorData);

        const errorMessages = errorData.message;
        console.log("Error messages:", errorMessages);
      }
    } catch (error) {
      console.log("API call error:", error);
    }
  };

  const handleCancel = () => {
    navigate("/MenuPage");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFoodImage(file);
  };

  return (
    <div className="mainpart">
      <h2>Add Food Item</h2>
      <TextField className="textfield"
        label="Menu ID"
        value={menuId}
        onChange={(e) => setMenuId(e.target.value)}
      /><br/>
      <TextField
        label="Food Name" className="textfield"
        value={foodName}
        onChange={(e) => setFoodName(e.target.value)}
      /><br/>
      <TextField className="textfield"
        label="Description"
        value={foodDescription}
        onChange={(e) => setFoodDescription(e.target.value)}
      /><br/>
      <TextField className="textfield"
        label="Price"
        value={foodPrice}
        onChange={(e) => setFoodPrice(e.target.value)}
      /><br/>
      <input type="file" accept="image/*" onChange={handleImageChange} /><br/>
      <div className="buttons">
      <Button variant="contained" onClick={handleAddFood} className="b1">
        Add Food
      </Button>
      <Button variant="contained" onClick={handleCancel}className="b1">
        Cancel
      </Button>
      </div>
    </div>
  );
};

export default Invoices;
