import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { placeOrder } from "../redux/orderSlice";
import { removeFromCart } from "../redux/cartSlice";  // ✅ Se till att detta nu fungerar
import { useNavigate } from "react-router-dom";
import "../styles/pageOrder.scss";

const PageOrder = () => {
  const cart = useSelector((state) => state.cart.items);
  const orderStatus = useSelector((state) => state.order.status);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ Gruppar varorna och räknar antal
  const groupedCart = cart.reduce((acc, item) => {
    const existingItem = acc.find((i) => i.id === item.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      acc.push({ ...item, quantity: 1 });
    }
    return acc;
  }, []);

  // ✅ Beräknar totalbeloppet
  const totalAmount = groupedCart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // ✅ Hantera beställning och navigera
  const handleOrder = async () => {
    const result = await dispatch(placeOrder());
    if (result.meta.requestStatus === "fulfilled") {
      navigate("/status");
    }
  };

  return (
    <div className="order-container">
      <h1>Din beställning</h1>
      <ul>
        {groupedCart.map((item) => (
          <li key={item.id}>
            <strong>{item.name}</strong>
            <span> {item.quantity}x</span> 
            <span> - {item.price * item.quantity} kr</span>
            {/* 🗑️ Knapp för att ta bort en vara */}
            <button className="undo-button" onClick={() => dispatch(removeFromCart(item.id))}>❌</button>
          </li>
        ))}
      </ul>

      <h2>Total: {totalAmount} kr</h2>

      <button className="buy-button" onClick={handleOrder} disabled={orderStatus === "loading"}>
        {orderStatus === "loading" ? "Lägger beställning..." : "Lägg Beställning"}
      </button>
    </div>
  );
};

export default PageOrder;
