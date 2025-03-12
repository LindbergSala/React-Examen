import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";

const Header = () => {
  const cartItems = useSelector((state) => state.cart.items.length);
  const navigate = useNavigate();

  return (
    <header className="header">
      <img src={logo} alt="Logo" className="logo" />
      <h1>Yum-Yum-Gimme-sum</h1>
      <div className="order-button" onClick={() => navigate("/order")}>
        🛒 {cartItems > 0 && <span className="order-count">{cartItems}</span>}
      </div>
    </header>
  );
};

export default Header;
