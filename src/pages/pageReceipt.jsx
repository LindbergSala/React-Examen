import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../redux/cartSlice"; 

const PageReceipt = () => {
  const cart = useSelector((state) => state.cart.items);
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const tax = (total * 0.20).toFixed(2);
  const totalWithTax = (total + parseFloat(tax)).toFixed(2);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNewOrder = () => {
    dispatch(clearCart()); // ✅ Rensar Redux och Local Storage
    navigate("/");
  };

  return (
    <div className="receipt-container">
      <h2>Kvitto</h2>
      <ul>
        {cart.map((item) => (
          <li key={item.id}>
            {item.name} - {item.price} SEK
          </li>
        ))}
      </ul>
      <p><strong>Total:</strong> {totalWithTax} SEK</p>
      <p><small>(Inkl. moms: {tax} SEK)</small></p>

      <button onClick={handleNewOrder}>Ny beställning</button>
    </div>
  );
};

export default PageReceipt;
