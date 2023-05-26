import React from "react";

import "../assets/styles/kontakti.css";
import backgroundImage from "../assets/images/bottom-image-contact.jpg";
import backgroundImage1 from "../assets/images/map.png";
import { useState } from "react";
import Footer from "../component/Footer";

export default function Kontakti() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    tel: "",
    message: "",
  });
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    fetch("http://localhost:3000/api/contact/create", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setSuccessMessage("Data posted successfully!");
     
      })
      .catch((error) => {
        console.error(error);
        alert("Error submitting data. Please try again."); 
     
      });
  };
  return (
    <>
     
      <div class="layer">
        <div
          id="parallax-wrap"
          class="parallax-search"
          data-parallax="scroll"
          data-position="top"
          data-bleed="10"
          style={{
            backgroundImage: `url(${backgroundImage})`,
          }}>
          <div class="search-wraps">
            <h1>Contact</h1>
            <p>" Bill Clinton, Prishtinë, Kosovë"</p>
            <p>" +383 43 922 224 "</p>
            <p> " info@dishdash.com"</p>
          </div>
        </div>
        <div
          class="contact-map"
          style={{
            backgroundImage: `url(${backgroundImage1})`,
          }}>
          <div class="container-map">
            <div class="inner">
              <div class="row">
                <div class="col-md-7 dim">
                  <h2>DishDash Contact</h2>
                  <p>
                    We are always ready to contact our customers and visitors.{" "}
                  </p>

                  <p></p>
                </div>
                <div class="col-md-5 black">
                  <form
                    onSubmit={handleSubmit}
                    class="uk-form uk-form-horizontal forms has-validation-callback"
                    id="forms">
                    <div className="row top10">
                      <div className="col-md-12">
                        <input
                          type="text"
                          className="grey-fields full-width"
                          placeholder="Name"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="row top10">
                      <div className="col-md-12">
                        <input
                          type="email"
                          className="grey-fields full-width"
                          placeholder="Email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="row top10">
                      <div className="col-md-12">
                        <input
                          type="text"
                          className="grey-fields full-width"
                          placeholder="Tel"
                          id="phone"
                          name="tel"
                          value={formData.tel}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="row top10">
                      <div className="col-md-12">
                        <textarea
                          id="message"
                          className="grey-fields full-width"
                          placeholder="Message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="row top10">
                      <div className="col-md-12">
                        <button
                          type="submit"
                          class="orange-button medium inline rounded"
                          onChange={handleSubmit}>
                          Submit
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
