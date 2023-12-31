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
 try {
      const response = await axios.post(
        "https://canine.hirectjob.in/api/v1/auth/customer",
        { cust_phone: phone }
      );
      console.log(response.data);
      navigate("/otp");
      // Handle response as needed
    } catch (error) {
      console.error(error);
      // Handle error as needed
    }
  };
  const handleChange = (e) => {
    setPhone(e.target.value);
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
                        type="number"
                        placeholder="Enter number"
                        value={phone}
                        onChange={(e) => handleChange(e)}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" id="formGridCheckbox">
                      <Form.Check
                        type="checkbox"
                        label="Get OTP via Whatsapp"
                        className="checkbox-area"
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
