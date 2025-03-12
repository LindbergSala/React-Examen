import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Header from "./components/Header";
import PageMenu from "./pages/pageMenu";
import PageOrder from "./pages/pageOrder";
import PageStatus from "./pages/pageStatus";
import PageReceipt from "./pages/pageReceipt";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<PageMenu />} />
          <Route path="/order" element={<PageOrder />} />
          <Route path="/status" element={<PageStatus />} />
          <Route path="/receipt" element={<PageReceipt />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
