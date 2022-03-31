import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EntryPoint from "./components/EntryPoint";
import Home from "./pages/Home";
import { useState } from "react";
import { CartContext } from "./context/CartContext";
import { ProductContext } from "./context/ProductContext";
import Upload from "./pages/Upload";

const App = () => {
  const [cart, setCart] = useState({});
  const [products, setProducts] = useState([]);

  return (
    <>
      <ProductContext.Provider value={{ products, setProducts }}>
        <CartContext.Provider value={{ cart, setCart }}>
          <Router>
            <Routes>
              <Route exact path="/" element={<EntryPoint />} />

              <Route exact path="/products" element={<ProductList />} />

              <Route exact path="/products/:cat" element={<ProductList />} />

              <Route exact path="/home" element={<Home />} />

              <Route exact path="/register" element={<Register />} />

              <Route exact path="/cart" element={<Cart />} />

              <Route exact path="/product/:id" element={<Product />} />

              <Route exact path="/upload" element={<Upload />} />
            </Routes>
          </Router>
        </CartContext.Provider>
      </ProductContext.Provider>
    </>
  );
};

export default App;
