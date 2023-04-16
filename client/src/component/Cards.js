import React from "react";

export default function Cards(props) {
  return (
    <div className="card">
      <img className="product--image" src={props.url} alt="product image" />
      <h2>{props.name}</h2>
      <p className="number">{props.number}</p>
      <p>{props.description}</p>
     
    </div>
  );
}