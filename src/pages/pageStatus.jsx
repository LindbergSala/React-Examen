import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../redux/cartSlice";
import delivery from "../assets/delivery.png";
import "../styles/pageStatus.scss";

const PageStatus = () => {
  const order = useSelector((state) => state.order);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNewOrder = () => {
    dispatch(clearCart());
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="status-container">
      <h2>Din beställning är på väg!</h2>
      
      <p>Ordernummer: <strong>{order.orderId ? order.orderId : "Ej tillgängligt"}</strong></p>
      <p>Beräknad leveranstid: <strong>{order.eta ? `${order.eta} minuter` : "Ej tillgängligt"}</strong></p>

      <img src={delivery} alt="Orderstatus" className="status-image" />
      
      <div className="status-buttons">
        <button onClick={handleNewOrder}>Till Startsidan</button>
        <button onClick={() => navigate("/receipt")}>Visa Kvitto</button>
      </div>
    </div>
  );
};

export default PageStatus;
