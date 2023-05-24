import React, {useEffect} from "react";

import "./LoginSignUp.css";

const LoginSignUp = () => {

  useEffect(() => {
    const request = {
      firstName: 'Jeta',
      lastName: 'Kajtazi',
      email: 'jetakajtazi@gmail.com',
      username: 'jetakajtazi',
      role: 2,
      phone: '043-123-456',
    }
    fetch('http://localhost:3000/api/user', {
      method: 'POST',
      body: request
    })
  }, [])
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
