import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import logo from "../../assets/images/logo.png";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import OtpInput from "react-otp-input";
import { BASE_URL } from "../../Constant/Index";
import { useCartWithoutLogin } from "../context/AddToCardWithoutLogin";

function Otp() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(1234);
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(30);
  const { cart, dispatch } = useCartWithoutLogin();

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const phone = await localStorage.getItem("phone");
    console.log("phone: ", phone);
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

      if (response.data.status == 200) {
        try {
          await localStorage.setItem(
            "userInfo",
            // response.data.data
            JSON.stringify(response.data.data[0].id)
            // || "userInfo",
            // response.data.data
            // JSON.stringify(response.data.data.id)
          );
        } catch (e) {
          await localStorage.setItem(
            "userInfo",
            // response.data.data
            JSON.stringify(response.data.data.id)
            // || "userInfo",
            // response.data.data
            // JSON.stringify(response.data.data.id)
          );
        }
        console.log("response.data.data: ", response.data.data);
        navigate("/", { replace: true });
        handleAddToCart(response.data.data[0].id);
      }
    } catch (error) {
      console.error(error);
      // Handle error as needed
    }
  };

  const resendOTP = (e) => {
    e.preventDefault();
    setMinutes(1);
    setSeconds(30);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds]);

  const handleAddToCart = async (id) => {
    try {
      const response = cart.forEach((element) => {
        const res = axios.post(`${BASE_URL}/customer/wish-list/add_product`, {
          item_name: element?.name,
          variant: element.variant, // You may need to update this based on your data
          image: element?.image,
          quantity: element.quantity,
          price: element.price,
          user_id: id,
          item_id: element?.item_id,
          total_quantity: element?.total_quantity,
          return_order: element?.return_order,
        });
        return res;
      });

      if (response.data.success) {
        toast.success("Added to cart!");
        // Navigate("/addcart")
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <>
      <div className="otp-bg">
        <section className="section-padding otp-section food">
          <Container>
            <Row className="justify-content-center">
              <Col lg={6}>
                <div className="otp-area">
                  <Link to="/">
                    <img src={logo} />
                  </Link>
                  <h4>Verify your mobile number</h4>
                  <p>An OTP has been sent to your mobile number</p>

                  <Form>
                    {/* <Form.Group className="mb-3" controlId="formGroupEmail">
                      <Form.Control
                        input
                        type="tel"
                        placeholder="Enter number"
                        value={phone}
                        maxLength="4"
                        onChange={(e) => setphone(e.target.value)}
                      />
                    </Form.Group> */}
                    <OtpInput
                      value={phone}
                      className="justify-content-center"
                      containerStyle={{ justifyContent: "center" }}
                      otpType="number"
                      onChange={(e) => {
                        const numericValue = e.replace(/\D/g, "");
                        setPhone(numericValue);
                      }}
                      OTPLength={4}
                      autoFocus
                      // renderSeparator={<span>-</span>}
                      renderInput={(props) => <input {...props} />}
                    />

                    <div className="countdown-text">
                      <Row>
                        <Col lg={6}>
                          <div>
                            {seconds > 0 || minutes > 0 ? (
                              <h6>
                                Time Remaining:{" "}
                                {minutes < 10 ? `0${minutes}` : minutes}:
                                {seconds < 10 ? `0${seconds}` : seconds}
                              </h6>
                            ) : (
                              <h6>Didn't recieve code?</h6>
                            )}
                          </div>
                        </Col>
                        <Col lg={6}>
                          <button
                            disabled={seconds > 0 || minutes > 0}
                            style={{
                              color:
                                seconds > 0 || minutes > 0 ? "#000" : "red",
                            }}
                            onClick={(e) => resendOTP(e)}
                          >
                            Resend OTP
                          </button>
                        </Col>
                      </Row>
                    </div>
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
