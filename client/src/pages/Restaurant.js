import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import FavoriteIcon from "@mui/icons-material/Favorite";
import backgroundImage2 from "../assets/images/perime.jpg";
import Footer from "../component/Footer";

function RestaurantCard({ name, description, email, location, image, image1 }) {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        marginBottom: 20,
        border: "solid #f5f5f5",
        marginLeft: 80,
        marginRight: 40,
        marginTop: 100,
      }}
    >

      <div style={{ marginRight: 50, marginTop: 25 }}>
      <img
          src={`http://localhost:3000/server/uploads/${image1}`}
          alt={name}
          style={{ width: 150, height: 150, objectFit: "cover", margin: 10 }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <LocalShippingIcon />
          <span style={{ fontSize: 14, margin: 10 }}>
            Cash is allowed in hand
          </span>
        </div>
      </div>
      <div
        style={{
          flex: 1,
          border: "solid #f5f5f5",
          margin: 30,
          backgroundColor: "#f5f5f5",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <button
              style={{
                padding: "8px 16px",
                borderRadius: 5,
                border: "none",
                marginRight: 10,
                backgroundColor: "greenyellow",
              }}
            >
              Open
            </button>
            <FavoriteIcon />
          </div>
        </div>
        <h2 style={{ color: "black", marginLeft: 0 }}>{name}</h2>
        <p>{description}</p>
        <p>{`Email: ${email}`}</p>
        {location && (
          <p>{`Location: ${location.city}, ${location.street}, ${location.postalCode}`}</p>
        )}
        <button
          onClick={() => navigate(`/restaurant/${name}`)}
          style={{
            padding: "8px 16px",
            borderRadius: 5,
            backgroundColor: "darkred",
            color: "white",
            border: "none",
            marginLeft: 0,
          }}
        >
          Menu
        </button>
      </div>
      <div style={{ marginRight: 240 }}>
        <img
          src={`http://localhost:3000/server/uploads/${image}`}
          alt={name}
          style={{
            width: 350,
            height: 450,
            objectFit: "cover",
            alignItems: "center",
            marginBottom: 0,
          }}
        />
      </div>
    </div>
  );
}

function Restaurant() {
  const [restaurantsData, setRestaurantsData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem("accessToken");
        const restaurantIds = [4,5]; // Array of restaurant IDs

        const restaurantDataPromises = restaurantIds.map(async (restaurantId) => {
          const response = await fetch(`http://localhost:3000/api/restaurants/${restaurantId}`, {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Include the bearer token in the Authorization header
            },
          });
          const data = await response.json();
          return data;
        });

        const restaurantData = await Promise.all(restaurantDataPromises);
        console.log("Restaurant Data:", restaurantData);
        setRestaurantsData(restaurantData);
      } catch (error) {
        console.error("Error fetching restaurant data:", error);
      }
    }

    fetchData();
  }, []);

  if (restaurantsData.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="layer">
        <div
          id="parallax-wrap"
          className="parallax-search"
          data-parallax="scroll"
          data-position="top"
          data-bleed="10"
          style={{
            backgroundImage: `url(${backgroundImage2})`,
          }}
        >
          <div className="search-wraps">
            <h1 style={{ marginTop: 100 }}>Order Food Online</h1>
            <p>Choose your favorite restaurant</p>
          </div>
        </div>

        <div>
          {restaurantsData.map((restaurantData) => (
            <RestaurantCard
              key={restaurantData.id}
              name={restaurantData.name}
              description={restaurantData.description}
              email={restaurantData.email}
              location={restaurantData.locations[0] || null}
              image={restaurantData.image}
              image1={restaurantData.image1}
            />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Restaurant;
