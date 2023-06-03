import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/styles/restaurant1.css";

const Restaurant1 = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [photo, setPhoto] = useState(null);

  const handleAddRestaurant = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("email", email);
      formData.append("city", city);
      formData.append("street", street);
      formData.append("postalCode", postalCode);
      formData.append("image", photo);

      const response = await fetch("http://localhost:3000/api/restaurants/create", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      });

      if (response.ok) {
        const responseData = await response.json();
        const { restaurantId } = responseData;
        navigate(`/restaurant/${restaurantId}`);
      } else {
        const errorData = await response.json();
        console.log("Error data:", errorData);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    setPhoto(file);
  };

  return (
    <div className="restaurant-form">
      <h2>Add Restaurant</h2>
      <form className="form2">
        <label className="label2">
          Name:<br/>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)} className="form1"
          />
        </label><br/>
        <label className="label2">
          Description:<br/>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}className="form1"
          />
        </label><br/>
        <label className="label2" >
          Email:<br/>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}className="form1"
          />
        </label><br/>
        <label className="label2">
          City:<br/>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}className="form1"
          />
        </label><br/>
        <label className="label2">
          Street:<br/>
          <input
            type="text"
            value={street}
            onChange={(e) => setStreet(e.target.value)}className="form1"
          />
        </label><br/>
        <label className="label2">
          Postal Code:<br/>
          <input
            type="text"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}className="form1"
          />
        </label><br/>
        <label className="label2">
          Photo:<br/>
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
          />
        </label><br/>
        <button type="button" onClick={handleAddRestaurant}className="b2">
          Add Restaurant
        </button>
      </form>
    </div>
  );
};

export default Restaurant1;
