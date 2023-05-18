import React, { useState } from "react";
import Navbar from "../component/Navbar";
import SearchBar from "../component/SearchBar";
import "./MenuPage.css";
import { useParams } from "react-router-dom";

const MenuPage = () => {
  let { menuId } = useParams();
  const [currentItem, setCurrentItem] = useState(null);

  const menuItems = [
    {
      value: 0,
      name: "Sandwich",
    },
    {
      value: 1,
      name: "Rizotto",
    },
    {
      value: 2,
      name: "Pizza",
    },
    {
      value: 3,
      name: "Sallata",
    },
  ];
  const menuSections = [];

  const toggleScroll = (item) => {
    setCurrentItem(item);
  };

  console.log(currentItem);

  return (
    <>
      <Navbar className="navbar" />
      <div className="searchbar--">
        <SearchBar />
      </div>

      <div className="menuPage">
        <div className="container">
          <h2 className="pageTitle">
            Menu e <span>{menuId}</span>
          </h2>
          <div className="menu-wrapper">
            <div className="aside">
              <ul className="menu">
                {menuItems.map((item) => (
                  <li
                    className={`menu-item ${
                      currentItem === item.value ? "active" : ""
                    }`}
                    onClick={() => toggleScroll(item.value)}>
                    <p>{item.name}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="menu-container">
              <div className="menu-section">
                <div className="header-wrapper">
                  <h3>Sandwich</h3>
                </div>
                <div className="section-menu-items">
                  <div className="section-menu-item">
                    <div className="item-image">
                      {/* <img src="" alt="sample-sandwich-pic" /> */}
                    </div>
                    <div className="item-desc">
                      <h5>Pule</h5>
                      <p>Lorem Ipsum dolor sit amet</p>
                    </div>
                    <div className="item-price">
                      <p>€2.30</p>
                    </div>
                  </div>
                  <div className="section-menu-item">
                    <div className="item-image">
                      {/* <img src="" alt="sample-sandwich-pic" /> */}
                    </div>
                    <div className="item-desc">
                      <h5>Tuna</h5>
                      <p>Lorem Ipsum dolor sit amet</p>
                    </div>
                    <div className="item-price">
                      <p>€2.30</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="menu-section">
                <div className="header-wrapper">
                  <h3>Rizotto</h3>
                </div>
                <div className="section-menu-items">
                  <div className="section-menu-item">
                    <div className="item-image">
                      {/* <img src="" alt="sample-sandwich-pic" /> */}
                    </div>
                    <div className="item-desc">
                      <h5>Pule</h5>
                      <p>Lorem Ipsum dolor sit amet</p>
                    </div>
                    <div className="item-price">
                      <p>€4.30</p>
                    </div>
                  </div>
                  <div className="section-menu-item">
                    <div className="item-image">
                      {/* <img src="" alt="sample-sandwich-pic" /> */}
                    </div>
                    <div className="item-desc">
                      <h5>Beef</h5>
                      <p>Lorem Ipsum dolor sit amet</p>
                    </div>
                    <div className="item-price">
                      <p>€6.50</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="menu-section">
                <div className="header-wrapper">
                  <h3>Pizza</h3>
                </div>
                <div className="section-menu-items">
                  <div className="section-menu-item">
                    <div className="item-image">
                      {/* <img src="" alt="sample-sandwich-pic" /> */}
                    </div>
                    <div className="item-desc">
                      <h5>Margarita</h5>
                      <p>Lorem Ipsum dolor sit amet</p>
                    </div>
                    <div className="item-price">
                      <p>€4.00</p>
                    </div>
                  </div>
                  <div className="section-menu-item">
                    <div className="item-image">
                      {/* <img src="" alt="sample-sandwich-pic" /> */}
                    </div>
                    <div className="item-desc">
                      <h5>Capricciosa</h5>
                      <p>Lorem Ipsum dolor sit amet</p>
                    </div>
                    <div className="item-price">
                      <p>€5.50</p>
                    </div>
                  </div>
                  <div className="section-menu-item">
                    <div className="item-image">
                      {/* <img src="" alt="sample-sandwich-pic" /> */}
                    </div>
                    <div className="item-desc">
                      <h5>Pepperoni</h5>
                      <p>Lorem Ipsum dolor sit amet</p>
                    </div>
                    <div className="item-price">
                      <p>€5.00</p>
                    </div>
                  </div>
                  <div className="section-menu-item">
                    <div className="item-image">
                      {/* <img src="" alt="sample-sandwich-pic" /> */}
                    </div>
                    <div className="item-desc">
                      <h5>Funghi</h5>
                      <p>Lorem Ipsum dolor sit amet</p>
                    </div>
                    <div className="item-price">
                      <p>€5.00</p>
                    </div>
                  </div>
                  <div className="section-menu-item">
                    <div className="item-image">
                      {/* <img src="" alt="sample-sandwich-pic" /> */}
                    </div>
                    <div className="item-desc">
                      <h5>{menuId}</h5>
                      <p>Lorem Ipsum dolor sit amet</p>
                    </div>
                    <div className="item-price">
                      <p>€5.00</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="menu-section">
                <div className="header-wrapper">
                  <h3>Sallata</h3>
                </div>
                <div className="section-menu-items">
                  <div className="section-menu-item">
                    <div className="item-image">
                      {/* <img src="" alt="sample-sandwich-pic" /> */}
                    </div>
                    <div className="item-desc">
                      <h5>Pule</h5>
                      <p>Lorem Ipsum dolor sit amet</p>
                    </div>
                    <div className="item-price">
                      <p>€4.50</p>
                    </div>
                  </div>
                  <div className="section-menu-item">
                    <div className="item-image">
                      {/* <img src="" alt="sample-sandwich-pic" /> */}
                    </div>
                    <div className="item-desc">
                      <h5>Cezar</h5>
                      <p>Lorem Ipsum dolor sit amet</p>
                    </div>
                    <div className="item-price">
                      <p>€5.50</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="info"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuPage;
