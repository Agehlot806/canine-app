import React, { useEffect, useState } from "react";
import logo from "../../assets/images/logo.png";
import login from "../../assets/images/img/login.png";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../Constant/Index";
import axios from "axios";

function WholesellerSignUp() {
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
  const [state, setstate] = useState("");
  const [stateallCity, setStateallCity] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  console.log("selectedCity: ", selectedCity);

  const [city, setcity] = useState("");
  const [error, seterror] = useState(false);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const WholesellerData = new FormData();
    WholesellerData.append("WholesellerEmail", email);
    WholesellerData.append("WholesellerPassword", email);

    const formData = new FormData();
    formData.append("f_name", firstName);
    formData.append("l_name", lastName);
    formData.append("dateofbirth", dateOfBirth);
    formData.append("email", email);
    formData.append("phone", mobileNumber);
    formData.append("state", state);
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
          navigate("/wholeseller-login");
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
      setstate(event.target.value);

      Getdatacity(event.target.value);
    }
  };
  const imageuploadhandler = (e) =>{
    setUpload1(e.target.files[0])
      }
      const imageuploadhandlersecond = (e) =>{
        setUpload2(e.target.files[0])
          }

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
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                      <Form.Control
                        type="text"
                        name="l_name"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
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
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                      <Form.Control
                        type="number"
                        name="phone"
                        placeholder="Mobile Number"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                      />
                    </Form.Group>
                    <div className="row">
                      <div className="col">
                        <div className="form-group">
                          <select
                            className="form-control"
                            onChange={Subscription}
                            value={state}
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
                        type="number"
                        name="aadhar_number"
                        placeholder="Aadhar Number"
                        value={aadharNumber}
                        onChange={(e) => setAadharNumber(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                      <Form.Control
                        type="number"
                        name="gst_number"
                        placeholder="GST Number"
                        value={gstNumber}
                        onChange={(e) => setGstNumber(e.target.value)}
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
                        type="text"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Form.Group>
                    <Row className="mb-3">
                      <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Upload 1</Form.Label>
                        <Form.Control
                          type="file"
                          multiple
                          onChange={imageuploadhandler}
                        />
                      </Form.Group>
                      <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label>Upload 2</Form.Label>
                        <Form.Control
                          type="file"
                          multiple
                          onChange={imageuploadhandlersecond}
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
