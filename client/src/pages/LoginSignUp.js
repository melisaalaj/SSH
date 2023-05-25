import React, { useState } from "react";

import "../assets/styles/LoginSignUp.css";

const LoginSignUp = () => {
  const [signIn, setSignIn] = useState(false);

  const [successState, setSuccessState] = useState("");

  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });

  const [signUpFormData, setSignUpFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    phone: "043-123-456",
    role: 2,
  });

  const handleSignUpChange = (e) => {
    console.log(e);
    const { name, value } = e.target;
    setSignUpFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const toggleSignIn = (value) => setSignIn(value);

  const handleSignUpSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("http://localhost:3000/api/auth/signup", {
      method: "POST",
      body: signUpFormData
    }).then((data) => data.json())

    if (response) {
      setSuccessState("signup-success");
    }

    console.log(response);
    
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    console.log(loginFormData);

    const response = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      body: signUpFormData
    }).then((data) => data.json())

    if (response.access_token) {
      setSuccessState("login-success");
    }
    console.log(response);
  };

  const stateRenderer = (val) => {
    switch (val) {
      case "login-success":
        return <h1>Login was successfull</h1>;
      case "signup-success":
        return <h1>Signup was successfull</h1>;
      default:
        return (
          <>
            {signIn ? (
              <form className="card-form" onSubmit={handleLoginSubmit}>
                <div className="input">
                  <input
                    type="text"
                    className="input-field"
                    value={loginFormData.email}
                    name="email"
                    onChange={handleLoginChange}
                    required
                  />
                  <label className="input-label">Email</label>
                </div>
                <div className="input">
                  <input
                    type="password"
                    className="input-field"
                    name="password"
                    value={loginFormData.password}
                    onChange={handleLoginChange}
                    required
                  />
                  <label className="input-label">Password</label>
                </div>
                <div className="action">
                  <button className="action-button">Sign In</button>
                </div>
              </form>
            ) : (
              <form className="card-form" onSubmit={handleSignUpSubmit}>
                <div className="input">
                  <input
                    type="text"
                    className="input-field"
                    value={signUpFormData.firstName}
                    name="firstName"
                    onChange={(e) => handleSignUpChange(e)}
                    required
                  />
                  <label className="input-label">First name</label>
                </div>
                <div className="input">
                  <input
                    type="text"
                    className="input-field"
                    value={signUpFormData.lastName}
                    name="lastName"
                    onChange={(e) => handleSignUpChange(e)}
                    required
                  />
                  <label className="input-label">Last name</label>
                </div>
                <div className="input">
                  <input
                    type="email"
                    className="input-field"
                    value={signUpFormData.email}
                    name="email"
                    onChange={(e) => handleSignUpChange(e)}
                    required
                  />
                  <label className="input-label">Email</label>
                </div>
                <div className="input">
                  <input
                    type="text"
                    className="input-field"
                    value={signUpFormData.username}
                    name="username"
                    onChange={(e) => handleSignUpChange(e)}
                    required
                  />
                  <label className="input-label">Username</label>
                </div>
                <div className="input">
                  <input
                    type="password"
                    className="input-field"
                    value={signUpFormData.password}
                    name="password"
                    onChange={(e) => handleSignUpChange(e)}
                    required
                  />
                  <label className="input-label">Password</label>
                </div>
                <div className="action">
                  <button className="action-button">Sign Up</button>
                </div>
              </form>
            )}

            <p className="toggler">
              {signIn ? (
                <>
                  Don't have an account?{" "}
                  <span role="button" onClick={() => toggleSignIn(false)}>
                    Sign Up
                  </span>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <span role="button" onClick={() => toggleSignIn(true)}>
                    Sign In
                  </span>
                </>
              )}
            </p>
          </>
        );
    }
  };

  return (
    <div className="main-wrapper">
      <div className="card-image">
        <h2 className="card-heading">
          Get started
          <small>Let us create your account</small>
        </h2>
      </div>
      <div className="form-wrapper">
        {stateRenderer(successState)}
      </div>
    </div>
  );
};

export default LoginSignUp;
