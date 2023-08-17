import React, { useState } from "react";
import logo from "../../assets/images/logo.png";
import login from "../../assets/images/img/login.png";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const customerData = new FormData();
    customerData.append("cust_phone", phone);
    try {
      const response = await axios.post(
        "https://canine.hirectjob.in/api/v1/auth/customer",
        customerData
      );
      console.log(response.data);
      if (response.data.status == 200) {
        await localStorage.setItem("phone", phone);
        navigate("/otp");
      }
      // Handle response as needed
    } catch (error) {
      console.error(error);
      // Handle error as needed
    }
  };
  const handleChange = (e) => {
    const inputValue = e.target.value.replace(/\D/g, "");
    if (inputValue.length <= 10) {
      setPhone(inputValue);
    }
  };

  return (
    <>
      <div className="users-bg">
        <Container>
          <div className="text-center">
            <img src={logo} />
          </div>
          <div>
            <Row>
              <Col lg={6}>
                <div className="form-area">
                  <h1 className="main-head">Let’s get started</h1>
                  <p>
                    Enter your mobile number to Sign up/Sign in to your logo
                    account
                  </p>

                  <Form>
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                      <Form.Label>Mobile No</Form.Label>
                      <Form.Control
                        input
                        type="number"
                        placeholder="Enter number"
                        value={phone}
                        maxLength="10"
                        onChange={(e) => handleChange(e)}
                      />
                    </Form.Group>
                    {/* <Form.Group className="mb-3" id="formGridCheckbox">
                      <Form.Check
                        type="checkbox"
                        label="Get OTP via Whatsapp"
                        className="checkbox-area"
                      />
                    </Form.Group> */}
                    <div className="login-btns">
                      <Button
                        variant="primary"
                        type="submit"
                        onClick={handleSubmit}
                      >
                        <Link to="/otp">Login</Link>{" "}
                      </Button>
                      <div className="login-btns">
                        <Link to="/other-login">Other Login</Link>
                      </div>
                    </div>
                  </Form>
                </div>
              </Col>
              <Col lg={6}>
                <div className="login-img">
                  <img src={login} />
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
