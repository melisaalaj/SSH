import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "../assets/styles/carousel.css";
import { productData, responsive } from "../data/datacard";
import Cards from "../component/Cards";

export default function Carousel1() {
  const renderCards = () => {
    return productData.map((item) => (
      <div className="carousel-item" key={item.id}>
        <img className="product--image" src={item.imageurl} alt={item.name} />
        <div className="card">
          <h3>{item.name}</h3>
          <p className="number">{item.number}</p>
          <p>{item.description}</p>
        </div>
      </div>
    ));
  };

  return (
    <div className="carousel-container">
      <div style={{ maxWidth: "100%" }}>
        <Carousel
          responsive={responsive}
          showDots={true}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={3000}
          renderButtonGroupOutside={true}
          renderDotsOutside={true}
          customTransition="transform 500ms ease-in-out" 
          containerClass="carousel"
          dotListClass="carousel-dots"
        >
          {renderCards()}
        </Carousel>
      </div>
    </div>
  );

  
}
