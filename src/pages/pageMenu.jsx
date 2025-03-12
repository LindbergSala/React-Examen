import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import bladImage from "../assets/blad.png";
import "../styles/pageMenu.scss";

const PageMenu = () => {
  const [menu, setMenu] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch("https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/menu", {
      method: "GET",
      headers: { "x-zocom": "<yum-tBCC15CdlDcqTJ4b>" },
    })
      .then((res) => res.json())
      .then((data) => {
        setMenu(data.items || []);
      })
      .catch((error) => {
        console.error("API Fetch Error:", error);
        setMenu([]);
      });
  }, []);

  return (
    <div className="menu-container">
      <div className="menu-row">
        {/* 🥤 Dryck */}
        <div className="drink-container">
          <h2>Dryck <span className="price">({menu.find(item => item.type === "drink")?.price} SEK)</span></h2>
          {menu
            .filter((item) => item.type === "drink")
            .map((item) => (
              <div
                key={item.id}
                className="menu-item"
                onClick={() => dispatch(addToCart(item))}
              >
                <h3>{item.name}</h3>
              </div>
            ))}
        </div>

        {/* 🍽 Mat */}
        <div
          className="wonton-container"
          style={{ backgroundImage: `url(${bladImage})` }}
        >
          {menu
            .filter((item) => item.type === "wonton")
            .map((item) => (
              <div
                key={item.id}
                className="menu-item"
                onClick={() => dispatch(addToCart(item))}
              >
                <h3>{item.name}</h3>
                <p className="description">{item.description}</p>
                <p className="ingredients">
                  {item.ingredients?.join(", ") || "Inga ingredienser listade"}
                </p>
                <p>{item.price} SEK</p>
              </div>
            ))}
        </div>

        {/* 🍶 Dippar */}
        <div className="dip-container">
          <h2>Dippar <span className="price">({menu.find(item => item.type === "dip")?.price} SEK)</span></h2>
          {menu
            .filter((item) => item.type === "dip")
            .map((item) => (
              <div
                key={item.id}
                className="menu-item"
                onClick={() => dispatch(addToCart(item))}
              >
                <h3>{item.name}</h3>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default PageMenu;
