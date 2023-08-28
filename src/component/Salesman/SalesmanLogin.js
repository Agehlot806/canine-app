import React, { useState } from "react";
import logo from "../../assets/images/logo.png";
import login from "../../assets/images/img/login.png";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../Constant/Index";

const SalesmanLogin = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handlePhoneNumberChange = (event) => {
    const input = event.target.value;
    const numericValue = input.replace(/\D/g, ""); // Remove non-digit characters

    // Restrict to 10 digits
    const formattedNumber = numericValue.slice(0, 10);

    setPhone(formattedNumber);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("phone", phone);
    formData.append("password", password);
    axios
      .post(`${BASE_URL}/auth/delivery-man/login`, formData)
      .then((response) => {
        console.log("tarun", response);
        if (response.data.status === 200) {
          localStorage.setItem("salesmanId", response.data.data.id);
          navigate("/salesman-dashboad");
          toast.success("Successfully");
        }
        if (response.data.message === "User Not Exit") {
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
                  Enter your credentials to Sign in to your salesman account
                </p>

                <Form>
                  <Form.Group className="mb-3" controlId="formGroupPhone">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                      type="number"
                      name="phone"
                      placeholder="Enter phone"
                      value={phone}
                      onChange={(e) => handlePhoneNumberChange(e)}
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
                      <Link to="/salesman-signup">SignUp</Link>
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
  );
};

export default SalesmanLogin;
