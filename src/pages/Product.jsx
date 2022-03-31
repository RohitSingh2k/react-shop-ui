import { Add, Remove } from "@material-ui/icons";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { basic } from "../apiCall";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import { mobile } from "../responsive";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import axios from "axios";
import { BASE_URL_SERVER } from "../config";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection: "column" })}
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
  ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: #f8f4f4;
  }
`;

const Product = () => {
  const [productData, setProductData] = useState({});
  const [qunatity, setQunatity] = useState(1);
  const id = window.location.pathname.split("/").pop();

  useEffect(() => {
    const findProd = async () => {
      basic
        .get(`/api/products/find/${id}`)
        .then((res) => {
          setProductData(res.data);
        })
        .catch((err) => console.log(err));
    };

    findProd();
  }, [id]);

  const decreaseQuan = () => {
    if (qunatity > 1) setQunatity(qunatity - 1);
  };

  const increaseQuan = () => {
    setQunatity(qunatity + 1);
  };

  const { cart, setCart } = useContext(CartContext);
  const userData = JSON.parse(localStorage.getItem("user"));
  const token = userData.accessToken;
  const header = { token : `Bearer ${token}`} 

  const getCarts = () => {
    axios.create({
      baseURL : BASE_URL_SERVER,
      headers : header
    })
      .post("/api/carts/find/" + userData._id)
      .then((res) => {
        setCart(res.data);
      })
      .catch((err) => {});
  };

  useEffect(()=> {
    getCarts();
  },[])

  const createCart = () => {
    const body = {
      userId: userData._id,
      products: [
        {
          productId: id,
          quantity: qunatity,
        },
      ],
    };

    axios.create({
      baseURL : BASE_URL_SERVER,
      headers : header
    })
      .post("/api/carts", body)
      .then((res) => {
        setCart(res.data);
        alert("cart created");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClick = () => {
    if (!cart) createCart();
    else {
      const body = cart;
      const product = {
        productId: id,
        quantity: qunatity,
      };
      console.log(cart, body)
      body.products.push(product);

      axios.create({
        baseURL : BASE_URL_SERVER,
        headers : header
      })
        .post("/api/carts" + cart._id, body)
        .then((res) => {
          setCart(res.data);
          alert("CART modified");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <Container>
      <Navbar />
      <Announcement />
      {productData && (
        <Wrapper>
          <ImgContainer>
            <Image src={productData.img} />
          </ImgContainer>
          <InfoContainer>
            <Title>{productData.title}</Title>
            <Desc>{productData.desc}</Desc>
            <Price>₹ {productData.price}</Price>
            <FilterContainer>
              <Filter>
                <FilterTitle>Color</FilterTitle>
                <FilterColor color={productData.color} />
              </Filter>
              <Filter>
                <FilterTitle>Size</FilterTitle>
                <FilterSize>
                  <FilterSizeOption>{productData.size}</FilterSizeOption>
                </FilterSize>
              </Filter>
            </FilterContainer>
            <AddContainer>
              <AmountContainer>
                <Remove onClick={decreaseQuan} />
                <Amount>{qunatity}</Amount>
                <Add onClick={increaseQuan} />
              </AmountContainer>
              <Button onClick={handleClick}>ADD TO CART</Button>
            </AddContainer>
          </InfoContainer>
        </Wrapper>
      )}
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Product;
