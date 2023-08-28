import React, { useEffect, useState } from "react";
import logo from "../../assets/images/logo.png";
import login from "../../assets/images/img/login.png";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../Constant/Index";
import axios from "axios";
import toast from "react-hot-toast";

function Salesman() {
  const navigate = useNavigate();
  const [salesmanData, setsalesmanData] = useState({});
  console.log("salesmanData", salesmanData);
  const [zoneList, setZoneList] = useState([]);

  useEffect(() => {
    getZoneList();
  }, []);

  const getZoneList = async () => {
    await axios
      .get(`${BASE_URL}/zone/list`)
      .then((res) => {
        setZoneList(res.data.data);
      })
      .catch((error) => {
        console.log("error in zone list", error);
      });
  };

  const handleOnChange = (e) => {
    setsalesmanData({
      ...salesmanData,
      [e.target.name]: e.target.value,
    });
  };
  const imageuploadhandler = (e) => {
    setsalesmanData({
      ...salesmanData,
      [e.target.name]: e.target.files[0],
    });
  };

  const handlePhoneNumberChange = (event) => {
    const input = event.target.value;
    const numericValue = input.replace(/\D/g, ""); // Remove non-digit characters

    // Restrict to 10 digits
    const formattedNumber = numericValue.slice(0, 10);

    setsalesmanData({
      ...salesmanData,
      phone: formattedNumber,
    });
  };

  // post data
  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("f_name", salesmanData.f_name);
    formData.append("l_name", salesmanData.l_name);
    formData.append("email", salesmanData.email);
    formData.append("earning", salesmanData.earning);
    formData.append("zone_id", salesmanData.zone_id);
    formData.append("identity_type", salesmanData.identity_type);
    formData.append("identity_number", salesmanData.identity_number);
    formData.append("identity_image", salesmanData.identity_image);
    formData.append("phone", salesmanData.phone);
    formData.append("password", salesmanData.password);
    formData.append("image", salesmanData.image);
    await axios
      .post(`${BASE_URL}/auth/delivery-man/store`, formData)
      .then((res) => {
        toast.success(res.data.message);
        navigate("/salesman-login");
      })
      .catch((error) => {
        console.log("error in submit", error);
      });
  };

  return (
    <>
      <div className="users-bg">
        <Container>
          <div className="text-center">
            <img src={logo} />
          </div>
          <section className="section-padding">
            <div>
              <Row>
                <Col lg={7}>
                  <div className="form-area">
                    <h1 className="main-head">Salesman Application</h1>
                    <p>
                      Enter your mobile number to Sign up/Sign in to your logo
                      account
                    </p>
                    <Form>
                      <div className="multi-form">
                        <h4>
                          <i className="fa fa-home" /> Sales Man Information
                        </h4>
                        <Row className="mb-3">
                          <Form.Group as={Col}>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="First Name"
                              name="f_name"
                              onChange={(e) => handleOnChange(e)}
                            />
                          </Form.Group>
                          <Form.Group as={Col}>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Last Name"
                              name="l_name"
                              onChange={(e) => handleOnChange(e)}
                            />
                          </Form.Group>
                        </Row>
                        <Form.Group className="mb-3" controlId="formGroupEmail">
                          <Form.Label>Email</Form.Label>
                          <Form.Control
                            type="email"
                            placeholder="Email"
                            name="email"
                            onChange={(e) => handleOnChange(e)}
                          />
                        </Form.Group>
                        <Row className="mb-3">
                          <Form.Group as={Col}>
                            <Form.Label>Sales Man Type</Form.Label>
                            <Form.Select
                              defaultValue="Choose..."
                              name="earning"
                              onChange={(e) => handleOnChange(e)}
                            >
                              <option value={''}>Choose...</option>
                              <option value={0}>Freelancer</option>
                              <option value={1}>Salary based</option>
                            </Form.Select>
                          </Form.Group>
                          <Form.Group as={Col}>
                            <Form.Label>Zone</Form.Label>
                            <Form.Select
                              defaultValue="Select Zone"
                              name="zone_id"
                              onChange={(e) => handleOnChange(e)}
                            >
                              <option value={""}>Select Zone</option>
                              {zoneList.map((el) => (
                                <option value={el.id}>{el.name}</option>
                              ))}
                            </Form.Select>
                          </Form.Group>
                        </Row>
                        <Row className="mb-3">
                          <Form.Group as={Col}>
                            <Form.Label>Identity Type</Form.Label>
                            <Form.Select
                              defaultValue="Choose..."
                              name="identity_type"
                              onChange={(e) => handleOnChange(e)}
                            >
                              <option>Choose...</option>
                              <option>Passport</option>
                              <option>Driving License</option>
                              <option>NID</option>
                              <option>Partners ID</option>
                            </Form.Select>
                          </Form.Group>
                          <Form.Group as={Col}>
                            <Form.Label>Identity Number</Form.Label>
                            <Form.Control
                              type="number"
                              placeholder="Identity Number"
                              name="identity_number"
                              onChange={(e) => handleOnChange(e)}
                            />
                          </Form.Group>
                        </Row>
                        <Form.Group
                          className="mb-3"
                          controlId="formGroupIDImage"
                        >
                          <Form.Label>Identity Image</Form.Label>
                          <Form.Control
                            type="file"
                            name="identity_image"
                            onChange={(e) => imageuploadhandler(e)}
                          />
                        </Form.Group>
                      </div>
                      <div className="multi-form">
                        <h4>
                          <i className="fa fa-user" /> Login Information
                        </h4>
                        <Form.Group className="mb-3" controlId="formGroupPhone">
                          <Form.Label>Phone</Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="Phone"
                            name="phone"
                            value={salesmanData.phone}
                            onChange={(e) => handlePhoneNumberChange(e)}
                          />
                        </Form.Group>
                        <Form.Group
                          className="mb-3"
                          controlId="formGroupPassword"
                        >
                          <Form.Label>Password</Form.Label>
                          <Form.Control
                            type="password"
                            placeholder="Password"
                            name="password"
                            onChange={(e) => handleOnChange(e)}
                          />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupImage">
                          <Form.Label>Sales Man Image</Form.Label>
                          <Form.Control
                            type="file"
                            name="image"
                            onChange={(e) => imageuploadhandler(e)}
                          />
                        </Form.Group>
                        <div className="mainForm-btn">
                          <Button onClick={(e) => handleSubmit(e)} type="submit">
                            Submit
                          </Button>
                        </div>
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
          </section>
        </Container>
      </div>
    </>
  );
}

export default Salesman;
