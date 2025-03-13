import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../redux/cartSlice";
import receiptImage from "../assets/receipt.png";
import "../styles/pageReceipt.scss";

const PageReceipt = () => {
  const cart = useSelector((state) => state.cart.items);
  const order = useSelector((state) => state.order);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Gruppar varorna och räknar antal
  const groupedCart = cart.reduce((acc, item) => {
    const existingItem = acc.find((i) => i.id === item.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      acc.push({ ...item, quantity: 1 });
    }
    return acc;
  }, []);

  // Beräknar totalbeloppet
  const totalAmount = groupedCart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = (totalAmount * 0.20).toFixed(2);
  const totalWithTax = (totalAmount + parseFloat(tax)).toFixed(2);

  const handleNewOrder = () => {
    dispatch(clearCart());
    navigate("/");
  };

  return (
    <div className="receipt-container">
      
      <img src={receiptImage} alt="Kvitto" className="receipt-image" />

      <h2>Kvitto</h2>

      <p>Ordernummer: #<strong>{order.orderId ? order.orderId : "Ej tillgängligt"}</strong></p>

      <ul className="receipt-list">
        {groupedCart.map((item) => (
          <li key={item.id}>
            <span className="item-name">{item.name} {item.quantity}x</span>
            <span className="item-price">{item.price * item.quantity} SEK</span>
          </li>
        ))}
      </ul>

      <p className="receipt-total"><strong>Total:</strong> {totalWithTax} SEK</p>
      <p className="receipt-tax"><small>(Inkl. moms: {tax} SEK)</small></p>
      
      <button className="new-order-button" onClick={handleNewOrder}>Till Startsidan</button>
    </div>
  );
};

export default PageReceipt;
