import React from "react";
import { useSelector, useDispatch } from "react-redux"; // ✅ Lagt till dispatch
import { useNavigate } from "react-router-dom";
import { clearCart } from "../redux/cartSlice"; // ✅ Importera Redux-funktionen för att rensa varukorgen

const PageStatus = () => {
  const order = useSelector((state) => state.order);
  const dispatch = useDispatch(); // ✅ Använd Redux Dispatch
  const navigate = useNavigate();

  const handleNewOrder = () => {
    dispatch(clearCart()); // ✅ Töm Redux
    localStorage.clear(); // ✅ Töm Local Storage
    navigate("/"); // ✅ Tillbaka till menyn
  };

  return (
    <div className="status-container">
      <h2>Din beställning är på väg!</h2>
      
      <p>Ordernummer: <strong>{order.orderId ? order.orderId : "Ej tillgängligt"}</strong></p>
      <p>Beräknad leveranstid: <strong>{order.eta ? `${order.eta} minuter` : "Ej tillgängligt"}</strong></p>

      <img src="/assets/delivery.png" alt="Orderstatus" className="status-image" />
      
      <div className="status-buttons">
        <button onClick={handleNewOrder}>
          Ny beställning
        </button>
        <button onClick={() => navigate("/receipt")}>Visa kvitto</button>
      </div>
    </div>
  );
};

export default PageStatus;
