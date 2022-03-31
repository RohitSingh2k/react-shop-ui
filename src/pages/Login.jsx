import styled from "styled-components";
import { mobile } from "../responsive";
import { Link, useNavigate } from "react-router-dom";
import { LOGIN_BACKGROUND_IMAGE_URL } from "../config";
import { useState } from "react";
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

const Alert = styled.span`
  color: red;
  font-weight: bold;
`;

const RedBorder = {
  border: "2px solid red",
};

const Login = () => {

  const navigate = useNavigate();

  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const [err, setErr] = useState({ name: "", message: "" });

  const handleChange = (e) => {
    setErr({name : '', message : ''})
    const name = e.target.name;
    const value = e.target.value;

    setValues({ ...values, [name]: value });
  };

  const handleLogin = (e) => {
    e.preventDefault()

    if (values.username === "" || values.password === "") {
      setErr({
        name: values.username === "" ? "username" : "passowrd",
        message: `${values.username === "" ? "username" : "passowrd"} should not be left empty.`,
      });
      return;
    }

    const body = values;
    basic
      .post("/api/auth/login", body)
      .then((res) => {
        if (res.status < 250) {
          const val = JSON.stringify(res.data);
          localStorage.setItem('user', val);
          localStorage.setItem('login', true);
          navigate("/home");
        }
      })
      .catch((err) => setErr({name : 'Bad cred', message : 'Bad user Credentials.'}));
  };


  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        {err.name !== "" && <Alert>{err.message}</Alert>}
        <Form method="post">
          <Input
            placeholder="username"
            name="username"
            value={values.username}
            onChange={handleChange}
            style={err.name === "username" ? RedBorder : {}}
          />
          <Input
            placeholder="password"
            name="password"
            value={values.password}
            type="password"
            onChange={handleChange}
            style={err.name === "passowrd" ? RedBorder : {}}
          />
          <Button onClick={handleLogin}>LOGIN</Button>
          <Link to="/register">
            <Linked>CREATE A NEW ACCOUNT</Linked>
          </Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
