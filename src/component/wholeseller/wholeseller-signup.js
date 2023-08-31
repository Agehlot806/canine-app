import React, { useEffect, useState } from "react";
import logo from "../../assets/images/logo.png";
import login from "../../assets/images/img/login.png";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../Constant/Index";
import axios from "axios";

function WholesellerSignUp() {
  const { state } = useLocation();
console.log('state in sellarw,hole', state)
  const handleFirstNameChange = (e) => {
    const inputValue = e.target.value;
    if (/^[a-zA-Z ]*$/.test(inputValue)) {
      setFirstName(inputValue);
    }
  };

  const handleLastNameChange = (e) => {
    const inputValue = e.target.value;
    if (/^[a-zA-Z ]*$/.test(inputValue)) {
      setLastName(inputValue);
    }
  };
  const [isEmailValid, setIsEmailValid] = useState(true); // Add this line
  const isEmailFormatValid = (email) => {
    const hasCapitalLetter = /[A-Z]/.test(email);
    return /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i.test(email) && !hasCapitalLetter;
  };

  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [aadharNumber, setAadharNumber] = useState("");
  const [gstNumber, setGstNumber] = useState("");
  const [pincode, setPincode] = useState("");
  const [password, setPassword] = useState("");
  const [upload1, setUpload1] = useState(null);
  const [upload2, setUpload2] = useState(null);
  const [stateall, setStateall] = useState([]);
  const [stateData, setstateData] = useState("");
  const [stateallCity, setStateallCity] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(true); // State to track password validity
  const [hasSpecialCharacter, setHasSpecialCharacter] = useState(true); // State to track presence of a special character

  const [city, setcity] = useState("");
  const [error, seterror] = useState(false);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (password.length < 8) {
      setIsPasswordValid(false);
      return;
    }
    const WholesellerData = new FormData();
    WholesellerData.append("WholesellerEmail", email);
    WholesellerData.append("WholesellerPassword", email);

    const formData = new FormData();
    formData.append("seller_id", state.salesmanId ? state.salesmanId : '');
    formData.append("f_name", firstName);
    formData.append("l_name", lastName);
    formData.append("dateofbirth", dateOfBirth);
    formData.append("email", email);
    formData.append("phone", mobileNumber);
    formData.append("state", stateData);
    formData.append("city", selectedCity);
    formData.append("business_name", businessName);
    formData.append("aadhar_number", aadharNumber);
    formData.append("gst_number", gstNumber);
    formData.append("pincode", pincode);
    formData.append("password", password);
    formData.append("role", 1);
    formData.append("upload1", upload1);
    formData.append("upload2", upload2);

    // Append multiple files to the formData for upload1 and upload2
    // for (const file of upload1) {
    //   formData.append("upload1", file);
    // }

    // for (const file of upload2) {
    //   formData.append("upload2", file);
    // }

    axios
      .post(`${BASE_URL}/auth/wholesaler_register`, formData)
      .then((response) => {
        console.log("Registration successful:", response.data);
        // Handle successful registration, redirect, etc.
        if (response.data.status == "200") {
          console.log("response.data.status: ", response.data.status);
          localStorage.setItem("WholesellerEmail", email);
          localStorage.setItem("WholesellerPassword", password);
          if(state.type == 'salesman'){
            navigate("/salesman-dashboad");
          }else {
          navigate("/wholeseller-login");
          }
        }
      })
      .catch((error) => {
        console.error("Error during registration:", error);
        // Handle error, show error message, etc.
      });
  };
  useEffect(() => {
    GetdataAll();
  }, []);

  const GetdataAll = async (e) => {
    var headers = {
      Accept: "application/json",
      "Content-Data": "application/json",
    };
    await fetch(`${BASE_URL}/auth/state`, {
      method: "GET",
      headers: headers,
    })
      .then((Response) => Response.json())
      .then((Response) => {
        setStateall(Response?.data ? Response?.data : []);
        console.log("99999999999999999999", Response);
      })
      .catch((error) => {
        console.error("ERROR FOUND---->>>>" + error);
      });
  };

  const Getdatacity = (state) => {
    axios
      .get(`${BASE_URL}/auth/city?state=${state}`, {
        headers: { "Content-Data": "multipart/form-data" },
      })
      .then((response) => {
        console.log("responseresponse", response);
        setStateallCity(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const Subscription = (event) => {
    if (event.target.value) {
      setstateData(event.target.value);

      Getdatacity(event.target.value);
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
              <Col lg={7}>
                <div className="form-area">
                  <h1 className="main-head">Lorem Ipsum is simply</h1>
                  <p>
                    Enter your mobile number to Sign up/Sign in to your logo
                    account
                  </p>
                  <Form onSubmit={handleFormSubmit}>
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                      <Form.Control
                        type="text"
                        name="f_name"
                        placeholder="First Name"
                        value={firstName}
                        onChange={handleFirstNameChange}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                      <Form.Control
                        type="text"
                        name="l_name"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={handleLastNameChange}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                      <Form.Control
                        type="date"
                        name="dateofbirth"
                        placeholder="Date of Birth"
                        value={dateOfBirth}
                        onChange={(e) => setDateOfBirth(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                      <Form.Control
                        type="email"
                        name="email"
                        placeholder="Email ID"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setIsEmailValid(isEmailFormatValid(e.target.value));
                        }}
                        isInvalid={!isEmailValid}
                      />
                      {!isEmailValid && (
                        <Form.Control.Feedback type="invalid">
                          {/[A-Z]/.test(email) && !email.includes('@')
                            ? "Email should not contain capital letters and must include '@'."
                            : "Please enter a valid email address."}
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                      <Form.Control
                        type="tel"
                        name="phone"
                        placeholder="Mobile Number"
                        value={mobileNumber}
                        onChange={(e) => {
                          const numericValue = e.target.value.replace(/[^0-9+]/g, ""); // Remove non-numeric characters
                          if (numericValue.length <= 10) {
                            setMobileNumber(numericValue);
                          }
                        }}
                      />
                    </Form.Group>
                    <div className="row mb-3">
                      <div className="col">
                        <div className="form-group">
                          <select
                            className="form-control"
                            onChange={Subscription}
                            value={stateData}
                          >
                            <option>State Choose...</option>
                            {stateall.map((items) => (
                              <option value={items.id} key={items.id}>
                                {items.state_name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-group">
                          <select
                            className="form-control"
                            onChange={(e) => setSelectedCity(e.target.value)}
                            value={selectedCity}
                          >
                            <option value="">City Choose...</option>
                            {stateallCity.map((items) => (
                              <option value={items.id} key={items.id}>
                                {items.city_name}
                              </option>
                            ))}
                          </select>
                          {/* {formValid.cityname && (
                        <span style={{ color: "red" }}>City is required</span>
                      )} */}
                        </div>
                      </div>
                    </div>
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                      <Form.Control
                        type="text"
                        name="business_name"
                        placeholder="Business Name"
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                      <Form.Control
                        type="tel"
                        name="aadhar_number"
                        placeholder="Aadhar Number"
                        value={aadharNumber}
                        onChange={(e) => {
                          const numericValue = e.target.value.replace(/[^0-9+]/g, ""); // Remove non-numeric characters

                          if (numericValue.length <= 12) {
                            setAadharNumber(numericValue);
                          }
                        }}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                      <Form.Control
                        type="tel"
                        name="gst_number"
                        placeholder="GST Number"
                        value={gstNumber}
                        onChange={(e) => {
                          const numericValue = e.target.value.replace(/[^a-zA-Z0-9]/g, ""); // Remove non-numeric characters

                          if (numericValue.length <= 15) {
                            setGstNumber(numericValue);
                          }
                        }}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                      <Form.Control
                        type="number"
                        name="pincode"
                        placeholder="Pincode"
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                      <Form.Control
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value)
                          setIsPasswordValid(e.target.value.length >= 8);
                          setHasSpecialCharacter(/[^A-Za-z0-9]/.test(e.target.value));
                        }}
                        isInvalid={!isPasswordValid || !hasSpecialCharacter}
                      />
                      {(!isPasswordValid || !hasSpecialCharacter) && (
                        <Form.Control.Feedback type="invalid">
                          Your password should be at least 8 characters and contain at least one special character.
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>
                    <Row className="mb-3">
                      <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Upload 1</Form.Label>
                        <Form.Control
                          type="file"
                          multiple
                          onChange={(e) => setUpload1(e.target.files)}
                        />
                      </Form.Group>
                      <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label>Upload 2</Form.Label>
                        <Form.Control
                          type="file"
                          multiple
                          onChange={(e) => setUpload2(e.target.files)}
                        />
                      </Form.Group>
                    </Row>
                    <div className="login-btns">
                      <Button variant="primary" type="submit">
                        Login
                      </Button>
                    </div>
                  </Form>
                </div>
              </Col>
              <Col lg={5}>
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

export default WholesellerSignUp;