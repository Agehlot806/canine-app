import React, { useState } from "react";
import logo from "../../assets/images/logo.png";
import login from "../../assets/images/img/login.png";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit =  (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    axios
    .post(" https://canine.hirectjob.in/api/v1/auth/wholesaler_login", formData)
    .then((response) => {
      console.log("tarun",response);
      localStorage.setItem("WholesellerId", response.data.data[0].id);
      localStorage.setItem("verifiedId", response.data.data[0].verified);
      if(response.data.message === 'Login Successfull'){
        navigate("/wholeseller-dashboard");
        toast.success("Successfully");
      }
      if(response.data.message === 'User Not Exit'){
        toast.error("User Not Exit");
      }
      // Handle the response as needed
      //
    })
    .catch((error) => {
      console.log(error);
      // Handle errors if any
    });
  };

  return (
    <>
      <div className="users-bg">
        <Container>
          <div className="text-center">
            <img src={logo} alt="Logo" />
          </div>
          <div>
            <Row>
              <Col lg={6}>
                <div className="form-area">
                  <h1 className="main-head">Let’s get started</h1>
                  <p>
                    Enter your credentials to Sign in to your wholesaler account
                  </p>

                  <Form>
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Form.Group>
                    <div className="login-btns">
                      <Button
                        variant="primary"
                        type="submit"
                        onClick={handleSubmit}
                      >
                        Login
                      </Button>
                      <div className="login-btns">
                        <Link to="/wholeseller-signup">SignUp</Link>
                      </div>
                    </div>
                  </Form>
                </div>
              </Col>
              <Col lg={6}>
                <div className="login-img">
                  <img src={login} alt="Login" />
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
}

export default Login;
