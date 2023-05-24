import React from "react";

import "../assets/styles/LoginSignUp.css";

const LoginSignUp = () => {
  return (
    <div class="main-wrapper">
      <div class="card-image">
        <h2 class="card-heading">
          Get started
          <small>Let us create your account</small>
        </h2>
      </div>
      <div className="form-wrapper">
        <form class="card-form">
          <div class="input">
            <input type="text" class="input-field" required />
            <label class="input-label">Full name</label>
          </div>
          <div class="input">
            <input type="text" class="input-field" required />
            <label class="input-label">Email</label>
          </div>
          <div class="input">
            <input type="password" class="input-field" required />
            <label class="input-label">Password</label>
          </div>
          <div class="action">
            <button class="action-button">Get started</button>
          </div>
        </form>
      </div>
      {/* <div class="card-info">
        <p>
          Already have an account? <a href="#">Sign In</a>
        </p>
      </div> */}
    </div>
  );
};

export default LoginSignUp;
