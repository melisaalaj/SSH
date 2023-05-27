import React from "react";
import Carousel from "react-multi-carousel";
import "../assets/styles/carousel.css";
import { productData, responsive } from "../data/datacard";
import Cards from "../component/Cards";
import "react-multi-carousel/lib/styles.css";
export default function Carousel1() {
  const card = productData.map((item) => (
    <Cards
      name={item.name}
      url={item.imageurl}
      number={item.number}
      description={item.description}
    />
  ));

  return (
    <> 
    <div className='App'>
    <Carousel  showDots={true} responsive={responsive}>
    {card}
    </Carousel>
 
    </div>
    </>
  );
}
