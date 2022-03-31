import React, { useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { Link } from "react-router-dom"; 
import {
  DEFAULT_PRODUCT_IMAGE_URL,
  LOGIN_BACKGROUND_IMAGE_URL,
} from "../config";

import { basic } from "../apiCall";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url(${LOGIN_BACKGROUND_IMAGE_URL}) center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
  margin: auto;
  display: inline-block;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
`;

const Linked = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;
// eslint-disable-next-line
const Alert = styled.span`
  color: red;
  font-weight: bold;
`;
// eslint-disable-next-line
const RedBorder = {
  border: "2px solid red",
};

const Image = styled.img`
  width: 100%;
  height: 20vh;
  margin-bottom: 30px;
`;

const Upload = () => {
    // eslint-disable-next-line
  const [body, setBody] = useState({
    title: "",
    desc: "",
    img: DEFAULT_PRODUCT_IMAGE_URL,
    categories: "",
    size: "",
    color: "",
    price: "",
  });

  const handleUpload = (e) => {
    e.preventDefault();
    const form = new FormData();
    const file = document.getElementsByName("photo");
    form.append("image", file.files[0]);

    basic
      .post("/api/upload", form, {
        headers: {
          "Content-Type": file.type,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container>
      <Wrapper>
        <Title>Add new product</Title>
        <Form action="" method="post">
          <Input placeholder="Product image" name="photo" type="file" />
          <Button onClick={handleUpload} type="submit">
            UPLOAD IMAGE
          </Button>
        </Form>
        {/* {err.name !== "" && <Alert>{err.message}</Alert>} */}
        <Form method="post">
          <Input placeholder="Product title" name="title" />
          <Input placeholder="Product description" name="desc" />
          <Input
            placeholder="Enter product catagories , separated"
            name="categories"
          />
          <Input placeholder="Product size" name="size" />
          <Input placeholder="Product color" name="color" />
          <Input placeholder="Product price" name="price" />
          <div>
            <Image src={body.img} />
          </div>
          <Button>ADD</Button>
          <Link to="/home">
            <Linked>RETURN TO HOME</Linked>
          </Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Upload;
