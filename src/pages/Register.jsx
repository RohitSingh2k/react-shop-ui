import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { basic } from "../apiCall";
import { REGISTER_BACKGROUND_IMAGE_URL } from "../config";
import { mobile } from "../responsive";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url(${REGISTER_BACKGROUND_IMAGE_URL}) center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;
const Alert = styled.span`
  color: red;
  font-weight: bold;
`;

const RedBorder = {
  border: "2px solid red",
};

const Register = () => {

  const navigate = useNavigate();

  const [values, setValues] = useState({
    name: "",
    phone: "",
    username: "",
    email: "",
    password: "",
    confPass: "",
  });

  const [err, setErr] = useState({ name: "", message: "" });

  const handleOnchange = (e) => {
    clearError();
    const value = e.target.value;
    const name = e.target.name;

    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (values.password !== values.confPass) {
      setErr({
        name: "confPass",
        message: "confirm password and password does not match.",
      });
      return;
    }

    if (values.name === "") {
      setErr({ name: "name", message: "name should not be empty" });
      return;
    }

    if (values.phone === "") {
      setErr({ name: "phone", message: "phone should not be empty" });
      return;
    }

    if (values.email === "") {
      setErr({ name: "email", message: "email should not be empty" });
      return;
    }

    if (values.username === "") {
      setErr({ name: "username", message: "username should not be empty" });
      return;
    }

    if (values.password === "") {
      setErr({ name: "password", message: "password should not be empty" });
      return;
    }

    const body = values;

    basic
      .post("/api/auth/register", body)
      .then((res) => {
        if(res.status  < 250) {
          navigate("/");
          setValues({
            name: "",
            phone: "",
            username: "",
            email: "",
            password: "",
            confPass: "",
          });
        }
      })
      .catch((err) => setErr({name : 'Bad cred', message : 'Invalid data is being provided.'}));
  };

  const clearError = () => {
    setErr({ name: "", message: "" });
  }

  return (
    <>
      <Container>
        <Wrapper>
          <Title>CREATE AN ACCOUNT</Title>
          {err.name !== "" && <Alert>{err.message}</Alert>}
          <Form>
            <Input
              placeholder="name"
              required
              type="text"
              name="name"
              value={values.name}
              onChange={handleOnchange}
              style={err.name === "name" ? RedBorder : {}}
            />
            <Input
              placeholder="phone number"
              required
              type="phone"
              name="phone"
              value={values.phone}
              onChange={handleOnchange}
              style={err.name === "phone" ? RedBorder : {}}
            />
            <Input
              placeholder="username"
              required
              name="username"
              value={values.username}
              onChange={handleOnchange}
              style={err.name === "username" ? RedBorder : {}}
            />
            <Input
              placeholder="email"
              required
              type="email"
              name="email"
              value={values.email}
              onChange={handleOnchange}
              style={err.name === "email" ? RedBorder : {}}
            />
            <Input
              placeholder="password"
              required
              type="passowrd"
              name="password"
              value={values.password}
              onChange={handleOnchange}
              style={err.name === "password" ? RedBorder : {}}
            />
            <Input
              placeholder="confirm password"
              required
              type="password"
              name="confPass"
              value={values.confPass}
              onChange={handleOnchange}
              style={err.name === "confPass" ? RedBorder : {}}
            />
            <Agreement>
              By creating an account, I consent to the processing of my personal
              data in accordance with the <b>PRIVACY POLICY</b>
            </Agreement>
            <Button onClick={handleSubmit}>CREATE</Button>
          </Form>
        </Wrapper>
      </Container>
    </>
  );
};

export default Register;
