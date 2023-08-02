import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import logo from "../../assets/images/logo.png";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Otp() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("1234");

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handleSubmit called"); // Add this
    const formData = new FormData();
    formData.append("phone", phone);
    formData.append("otp", otp);

    try {
      const response = await axios.post(
        "https://canine.hirectjob.in/api/v1/auth/otp_verify",
        formData
      );
      console.log(response.data);
      navigate("/");
    } catch (error) {
      console.error(error);
      // Handle error as needed
    }
  };

  return (
    <>
      <div className="otp-bg">
        <section className="section-padding food">
          <Container>
            <Row className="justify-content-center">
              <Col lg={6}>
                <div className="otp-area">
                  <img src={logo} />
                  <h4>Verify your mobile number</h4>
                  <p>An OTP has been sent to your mobile number</p>

                  <Form>
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                      <Form.Control
                        input
                        type="tel"
                        placeholder="Enter number"
                        value={phone}
                        maxLength="4"
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </Form.Group>

                    <div>
                      <input className="otp" type="text" maxLength={1} />
                      <input className="otp" type="text" maxLength={1} />
                      <input className="otp" type="text" maxLength={1} />
                      <input className="otp" type="text" maxLength={1} />
                    </div>
                    <h6>
                      Resent OTP <span>01.24</span>
                    </h6>
                    <div className="login-btns">
                      <Button
                        variant="primary"
                        type="submit"
                        onClick={(e) => handleSubmit(e)}
                      >
                        Login
                      </Button>
                    </div>
                  </Form>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </div>
    </>
  );
}

export default Otp;
