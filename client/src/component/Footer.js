import React from "react";
import "../assets/styles/footer.css";

function Footer() {
  return (
    <footer className="bottom-navigation">
      <div className="left-side">
        <h3>Abonohu në faqen tonë</h3>
        <form>
          <input type="text" placeholder="Email abonimi" />
          <button type="submit">Abonohu</button>
        </form>
        <br></br>
        <div class="footer-adresa">
          <p id="p1"> "Rr. Eqrem Cabej, Prishtine Kosovo"</p>

          <p id="p2">"+383 43 922 244"</p>

          <p id="p3">"info@dishdash.com"</p>
        </div>

        <p class="gjuha">Zgjidh gjuhën</p>
        <select id="gjuha" name="gjuha">
          <option value="al">al</option>
          <option value="en">en</option>
        </select>
      </div>
      <div className="right-side">
        <div className="project">
          <h3>The project</h3>
          <a href="#">Ballina</a>
          <a href="#">Porosit ushqim</a>
          <a href="#">Me të rejat</a>
          <a href="#">Shfleto restaurantet</a>
          <a href="#">Kyqu</a>
        </div>
        <div className="legal-note">
          <h3>Legal note</h3>
          <a href="#">We Are Hiring!</a>
          <a href="#">Deklarata e Privatësisë</a>
          <a href="#">Termat & Kushtet</a>
          <a href="#">Regjistrohu</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
