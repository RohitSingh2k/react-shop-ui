import { Badge } from "@material-ui/core";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { BASE_URL_SERVER, BRAND_NAME, NoStyle } from "../config";
import { mobile } from "../responsive";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../context/CartContext.js";

const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;
// Our component starts from here ================================
const Navbar = () => {
  const { cart, setCart } = useContext(CartContext);
  const userData = JSON.parse(localStorage.getItem("user"));
  const loggedIn = JSON.parse(localStorage.getItem("login"));
  // eslint-disable-next-line
  const navigate = useNavigate();
  const token = userData.accessToken;

  const getCarts = () => {

    console.log('USER-DATA', userData);
    axios.create({
      baseURL : BASE_URL_SERVER,
      headers : {
        token : `Bearer ${token}`
      }
    })
      .post(`/api/carts/find/${userData._id}`)
      .then((res) => {
        setCart(res.data);
        console.log('CART data : ', res.data)
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (loggedIn) getCarts();
    // eslint-disable-next-line
  });

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  // return JSX elements goes here ================================
  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder="Search" />
            <Search style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer>
        </Left>
        <Center>
          <Logo>{BRAND_NAME}</Logo>
        </Center>
        <Right>
          {" "}
          {loggedIn ? (
            <>
              <MenuItem>Hello {userData?.name}!</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
              <MenuItem>
                <Badge badgeContent={cart?.length} color="primary">
                  <Link to="/cart">
                    <ShoppingCartOutlined />
                  </Link>
                </Badge>
              </MenuItem>
            </>
          ) : (
            <>
              <MenuItem>
                <Link to="/register" style={NoStyle}>
                  REGISTER
                </Link>
              </MenuItem>
              <MenuItem>
                <Link to="/" style={NoStyle}>
                  SIGN IN
                </Link>
              </MenuItem>
            </>
          )}
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
