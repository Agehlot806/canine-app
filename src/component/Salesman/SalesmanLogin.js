import React, { useState } from "react";
import logo from "../../assets/images/logo.png";
import login from "../../assets/images/img/login.png";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../Constant/Index";
import toast, { Toaster } from "react-hot-toast";

const SalesmanLogin = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handlePhoneNumberChange = (event) => {
    const input = event.target.value;
    const numericValue = input.replace(/\D/g, ""); // Remove non-digit characters

    // Restrict to 10 digits
    const formattedNumber = numericValue.slice(0, 10);

    setPhone(formattedNumber);
  };
  const togglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (phone == "" && password == "") {
      toast.error("Please enter both phone number and password.");
    } else {
      const formData = new FormData();
      formData.append("phone", phone);
      formData.append("password", password);
      axios
      .post(`${BASE_URL}/auth/delivery-man/login`, formData)
      .then((response) => {
        console.log("tarun????????", response);
        if (response.data.message === "Login Successfull") {
            localStorage.setItem("salesmanId", response.data.data[0].id);
            localStorage.setItem("salesmanPhone", response.data.data[0].phone);
            localStorage.setItem("loginType", "salesman"); 
            localStorage.setItem("zoneId", response.data.data[0].zone_id);
            localStorage.setItem("verifiedId", response.data.data[0].status);

            navigate("/salesman-dashboad");
            toast.success("Successfully");
          }

           if (response.data.message === "User Not Exit") {
            toast.error("User Not Exit");
            // alert("nvnhg")
          }else if(response.data.message ==="Your Password Not Match"){
            toast.error("Your Password Not Match")
          }
         
        })
        .catch((error) => {
          console.log(error);
          
        });
    }
  };
  return (
    
    <div className="users-bg">
      <Toaster/>
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
                    <div className="form-area eyeicon">
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        // className="btn btn-secondary"
                        style={{
                          border: "none",
                          borderRadius: "37.75px",
                          height: "55px",
                        }}
                        onClick={togglePassword}
                      >
                        <i
                          className={`fa ${
                            showPassword ? "fa-eye" : "fa-eye-slash"
                          }`}
                          aria-hidden="true"
                        />
                      </button>
                    </div>
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
                <img src={login} alt="Login" className="bounce-in"/>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default SalesmanLogin;
