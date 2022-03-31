import { useContext, useEffect } from "react";
import styled from "styled-components";
import Product from "./Product";
import { basic } from "../apiCall";
import { ProductContext } from "../context/ProductContext";

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const Products = () => {

  const {products, setProducts} = useContext(ProductContext);

  useEffect(()=> {
    const getAllProducts = () => {
      basic
        .get("/api/products")
        .then((res) => {
          setProducts(res.data);
        })
        .catch((err) => console.log(err));
    };
  
    getAllProducts();

  })
  
  return (
    <Container>
      {products.map((item) => (
        <Product item={item} key={item.id} />
      ))}
    </Container>
  );
};

export default Products;
