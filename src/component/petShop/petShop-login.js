import React, { useState } from "react";
import logo from "../../assets/images/logo.png";
import login from "../../assets/images/img/login.png";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { BASE_URL } from "../../Constant/Index";
function PetshopLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(true); // State to track password validity
  const [hasSpecialCharacter, setHasSpecialCharacter] = useState(true); // State to track presence of a special character
  const [isEmailValid, setIsEmailValid] = useState(true); // State to track email validity
  const isEmailFormatValid = (email) => {
    const hasCapitalLetter = /[A-Z]/.test(email); // Check for capital letters
    return (
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i.test(email) &&
      !hasCapitalLetter
    );
  };
  const togglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isEmailFormatValid(email)) {
      setIsEmailValid(false);
      return; // Don't proceed if email is invalid
    }
    // if (password.length < 8 || !hasSpecialCharacter) {
    //   setIsPasswordValid(false);
    //   return;
    // }
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    axios
      .post(
        `${BASE_URL}/auth/wholesaler_login`,
        formData
      )
      .then((response) => {
        console.log("tarunnnnn", response);

        if (response.data.message === "Login Successfull") {
          localStorage.setItem("UserWholesellerId", response.data.data[0].id);
          localStorage.setItem("verifiedId", response.data.data[0].verified);
          localStorage.setItem(
            "wallet_balance",
            response.data.data[0].wallet_balance
          );
          localStorage.setItem("loginType", "wholeseller");
          navigate("/petshop-dashboard",{replace:true});
          toast.success("Successfully");
        } else if (response.data.message === "User Not Exit") {
          toast.error("User Not Exit");
        } else if (response.data.message === "Your Password Not Match") {
          toast.error("Your Password Not Match");
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
      <Toaster />
      <div className="users-bg">
        <Container>
          <div className="text-center">
          <Link to="/"><img src={logo} /></Link>
          </div>
          <div>
            <Row>
              <Col lg={6}>
                <div className="form-area">
                  <h1 className="main-head">Let’s get started</h1>
                  <p>
                    Enter your credentials to Sign in to your pet shop account
                  </p>
                  <Form>
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setIsEmailValid(isEmailFormatValid(e.target.value)); // Update email validity state
                        }}
                        isInvalid={!isEmailValid} // Apply Bootstrap's isInvalid class if email is invalid
                      />
                      {!isEmailValid && (
                        <Form.Control.Feedback type="invalid">
                          {/[A-Z]/.test(email)
                            ? "Email should not contain capital letters."
                            : "Please enter a valid email address."}
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                      <Form.Label>Password</Form.Label>
                      <div className="form-area eyeicon">
                        <Form.Control
                          type={showPassword ? "text" : "password"}
                          name="password"
                          placeholder="Enter password"
                          value={password}
                          onChange={(e) => {
                            setPassword(e.target.value);
                            // setIsPasswordValid(e.target.value.length >= 6);
                            // setHasSpecialCharacter(
                            //   /[^A-Za-z0-9]/.test(e.target.value)
                            // );
                          }}
                          isInvalid={!isPasswordValid || !hasSpecialCharacter}
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
                      {(!isPasswordValid || !hasSpecialCharacter) && (
                        <Form.Control.Feedback type="invalid">
                          Your password should be at least 8 characters and
                          contain at least one special character.
                        </Form.Control.Feedback>
                      )}
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
                        <Link to="/petshop-signup">SignUp</Link>
                      </div>
                    </div>
                  </Form>
                </div>
              </Col>
              <Col lg={6}>
                <div className="login-img">
                  <img src={login} alt="Login" className="bounce-in" />
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
}
export default PetshopLogin;
