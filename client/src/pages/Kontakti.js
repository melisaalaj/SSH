import React from "react";
import "../assets/styles/kontakti.css";
import backgroundImage from '../assets/images/bottom-image-contact.jpg';
import backgroundImage1 from '../assets/images/map.png';
import { useState } from "react";


export default function Kontakti(){
  const [formData, setFormData] = useState({name: "",email: "",tel:"",message: ""});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Name: ${formData.name}, Email: ${formData.email},Tel: ${formData.tel}, Message: ${formData.message}`
    );
};
 return(

    <div class="layer">

    <div id="parallax-wrap" class="parallax-search" data-parallax="scroll"data-position="top"data-bleed="10" style={{
        backgroundImage: `url(${backgroundImage})`,}}>

        <div class="search-wraps">
            <h1>Kontakti</h1>
            <p>
               " Rr. Zejnel Salihu, Prishtinë Kosovo"
            </p>
            <p>
                " +383 43 922 224 "
            </p>
            <p> " info@dishdash.com"</p>
        </div>
    </div>
    <div class="contact-map"  style={{
        backgroundImage: `url(${backgroundImage1})`,}}>

    <div class="container-map">
        <div class="inner">
           <div class="row">
              <div class="col-md-7 dim">
                <h2>Kontakti DishDash </h2>
                <p>
                Ne jemi gjithmonë të gatshëm të kontaktojmë me klientët dhe vizitorët tanë.             </p>
                
                <p></p>
                             
              </div>
              <div class="col-md-5 black">
              
              <form onSubmit={handleSubmit} class="uk-form uk-form-horizontal forms has-validation-callback"id="forms">
      
      <div className="row top10">
        <div className="col-md-12">
      <input type="text" className="grey-fields full-width"placeholder="Emri" id="name" name="name" value={formData.name} onChange={handleChange}/>
</div></div>

<div className="row top10">
        <div className="col-md-12">
      <input type="email" className="grey-fields full-width"placeholder="Email"id="email" name="email" value={formData.email} onChange={handleChange}/>
      </div></div>
      <div className="row top10">
        <div className="col-md-12">
      <input type="text" className="grey-fields full-width"placeholder="Tel"id="phone" name="tel" value={formData.email} onChange={handleChange}/>
      </div></div>

      <div className="row top10">
        <div className="col-md-12">
      <textarea id="message"className="grey-fields full-width"placeholder="Mesazhi" name="message" value={formData.message} onChange={handleChange}/>
      </div></div>
      <div className="row top10">
        <div className="col-md-12">
      <button type="submit"class="orange-button medium inline rounded">Submit</button>
      </div></div>
    </form>
    </div>
              </div>
             </div>
        </div> 
     </div>
       </div>
   

   );

}

