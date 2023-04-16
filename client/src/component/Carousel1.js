import React from 'react';
import Carousel from 'react-multi-carousel';
import '../assets/styles/carousel.css';
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
    <div className='App'>
    <Carousel  showDots={true} responsive={responsive}>
    {card}
    </Carousel>
    <div className='photosess'>
    <img className="--image" src={"https://plus.unsplash.com/premium_photo-1661591165863-98c2d4f0743f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Zm9vZCUyMGRlbGl2ZXJpbmclMjBwb3N0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"} alt="product image" />
    <img className="--image" src={"https://plus.unsplash.com/premium_photo-1663045910051-021e32bc2678?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjB8fGZvb2QlMjBkZWxpdmVyaW5nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"} alt="product image" />
    {/* <img className="--image" src={""} alt="product image" /> */}
    <img className="--image" src={"https://plus.unsplash.com/premium_photo-1661581851334-6e40166880c9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8Zm9vZCUyMGRlbGl2ZXJpbmclMjBwb3N0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"} alt="product image" />
    </div>
    
    </div>
    
  );
}

