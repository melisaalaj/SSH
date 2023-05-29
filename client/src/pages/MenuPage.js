import React, { useEffect, useState, useRef,useContext } from "react";
import "../assets/styles/MenuPage.css";
import { menuData } from "../data/datacard";
import { useParams } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import {Button, Tooltip} from "@mui/material";
import Footer from "../component/Footer";
import { SelectedItemsContext } from "../services/SelectedItemsContext";

const MenuPage = () => {
  let { menuId } = useParams();

  console.log(menuId);
  const [currentItem, setCurrentItem] = useState(null);
  // const [menuData, setMenuData] = useState([]);
  const itemsRef = useRef([]);

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

  const toggleScroll = (item) => {
    setCurrentItem(item);
  };

  useEffect(() => {
    // Replace api call below with backend endpoint api, to fetch data
    fetch(`https://localhost:3000/api/restaurants/${menuId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        
      });
  }, []);
  const { addToSelectedItems } = useContext(SelectedItemsContext);

  const handleAddToCart = (item) => {
    addToSelectedItems({ name: item.name, price: item.price ,restaurantId: menuId });
  };
  return (
    <>
    
      <div className="menuPage">
        <div className="container">
          <h2 className="pageTitle">
            Menu e Restaurantit #<span>{menuId}</span>
          </h2>
          <div className="menu-wrapper">
            <div className="aside">
              <ul className="menu">
                {menuItems.map((item, idx) => (
                  <li
                    className={`menu-item ${
                      currentItem === item.value ? "active" : ""
                    }`}
                    key={`key-${idx}`}
                    onClick={() => toggleScroll(item.value)}>
                    <p>{item.name}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="menu-container">
              {Object.keys(menuData).map((category, cid) => (
                <div className="menu-section" key={`categoryKey-${cid}`}>
                  <div className="header-wrapper">
                    <h3>{category}</h3>
                  </div>
                  <div className="section-menu-items">
                    {menuData[category].map((item, iid) => (
                      <div className="section-menu-item" key={`itemKey-${iid}`}>
                        <div className="item-image">
                          <img src={item.image} alt="sample-sandwich-pic" />
                        </div>
                        <div className="item-desc">
                          <h5>{item.name}</h5>
                          <p>{item.desc}</p>
                        </div>
                        <div className="item-price">
                          <p>{item.price}</p>
                          <Tooltip title="Shto ne shporte">
                            <Button variant="contained"   onClick={() => handleAddToCart(item)}>
                              <AddIcon />
                              Shto
                            </Button>
                          </Tooltip>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="info"></div>
          </div>
        </div>
      </div>
      <Footer /> 
    </>
  );
};

export default MenuPage;
