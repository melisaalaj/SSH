import React from "react";
import "../assets/styles/footer.css";

function Footer() {
  return (
    <footer className="bottom-navigation">
      <div className="left-side">
        <h3>Subscribe to our site</h3>
        <form className="abonimform">
          <input type="text" placeholder="Email:" />
          <button type="submit">Subscribe</button>
        </form>
        <br></br>
        <div className="footer-adresa">
          <p id="p1"> "Rr. Eqrem Cabej, Prishtine Kosovo"</p>

          <p id="p2">"+383 43 922 244"</p>

          <p id="p3">"info@dishdash.com"</p>

         
        </div>
      </div>
      <div className="right-side">
        <div className="project">
          <h3 className="h33">The project</h3>
          <a href="#">Main</a>
          <a href="#">Order food</a>
          <a href="#">News</a>
          <a href="#">Restaurants</a>
          <a href="#">Login</a>
        </div>
        <div className="legal-note">
          <h3 className="h33">Legal note</h3>
          <a href="#">We Are Hiring!</a>
          <a href="#">Privacy Statement</a>
          <a href="#">Terms & Conditions</a>
          <a href="#">SignUp</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
