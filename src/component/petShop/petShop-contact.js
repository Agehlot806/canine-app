import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import contact from "../../assets/images/banner/contact.png";
import strings from "../language";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../Constant/Index";
import { toast } from "react-hot-toast";
import PetShopHeader from "../../directives/petShopHeader";
import Petshopfooter from "../../directives/petShop-Footer";

function PetshopContact() {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    try {
      // Create form data
      const formDataToSend = {
        name: formData.name,
        address: formData.address,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
      };

      const response = await fetch(`${BASE_URL}/auth/contact_us`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set appropriate content type
        },
        body: JSON.stringify(formDataToSend),
      });

      if (response.ok) {
        // Successful response
        const responseData = await response.json();
        console.log("API response:", responseData);
        toast.success("Submit Successfull");
      } else {
        // Handle error response
        console.error("API error:", response.status, response.statusText);
      }
    } catch (error) {
      toast.error("Please Enter All Fields");
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    // setFormData({
    //   ...formData,
    //   [name]: value,
    // });
    if (name === "name") {
      // Only allow characters in the name field
      const regex = /^[a-zA-Z\s]*$/;
      if (value === "" || regex.test(value)) {
        setFormData({
          ...formData,
          [name]: value,
        });
      }
    } else if (name === "phone") {
      // Only allow numbers and limit to ten digits
      const regex = /^[0-9]*$/;
      if (value === "" || (regex.test(value) && value.length <= 10)) {
        setFormData({
          ...formData,
          [name]: value,
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  // storedWholesellerId
  const storedWholesellerId = Number(localStorage.getItem("UserWholesellerId"));
  // ----------------------------------------
  return (
    <>
      <PetShopHeader />
      <Container fluid className="p-0">
        <div className="all-bg">
          <img src={contact} />
        </div>
      </Container>
      <section className="section-padding">
        <Container>
          <Row className="justify-content-center">
            <Col lg={4} sm={6} xs={6} className="mb-4">
              <div className="contact-card">
                <Link to="tel:7700019949">
                  <i className="fa fa-phone " />
                  <h3>Phone</h3>
                  <p>(+91)7700019949</p>
                </Link>
              </div>
            </Col>
            <Col lg={4} sm={6} xs={6} className="mb-4">
              <div className="contact-card">
                <i className="fa fa-envelope-o " />
                <Link to="mailto:info@canineproducts.in">
                  <h3>Email</h3>
                  <p>info@canineproducts.in</p>
                </Link>
              </div>
            </Col>
            <Col lg={4} sm={6} xs={6} className="mb-4">
              <div className="contact-card">
                <i className="fa fa-clock-o" />
                <h3>Open Hours</h3>
                <p>Mon-Sat:10am-9pm</p>
                {/* <p>Sat-Sun:9ap-4pm</p> */}
              </div>
            </Col>
            <Col lg={12} sm={6} xs={6} className="mb-4">
              <div className="contact-card">
                <i className="fa fa-map-marker " />
                <h3>Address</h3>
                <h4>Kandivali Retail Shop</h4>
                  <p>
                    Canine Products Mazi Villa Bunglow # 8 Dattani park road
                    Thakur village Kandivali East Mumbai-400101
                  </p>
                  <h4>CRAWFORD MARKET Warehouse</h4>
                  <p>
                    Shop No. 559, Crawford Market , OPP . Sadanand Hotel ,
                    Mumbai-400001.{" "}
                  </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="section-padding">
        <Container>
          <div className="text-left">
            <h1 className="main-head">Contact Us</h1>
          </div>
          <div className="needplace">
            <Row>
              <Col lg={12}>
                <div className="contact-form">
                  <Form onSubmit={handleFormSubmit}>
                    <Form.Group className="mb-3" controlId="formGridAddress1">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        name="name"
                        placeholder="Enter name"
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGridAddress1">
                      <Form.Label>Address</Form.Label>
                      <Form.Control
                        name="address"
                        placeholder="Enter address"
                        value={formData.address}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                    <Row className="mb-3">
                      <Col lg={6} sm={6} xs={12}>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          name="email"
                          placeholder="Enter email"
                          value={formData.email}
                          onChange={handleInputChange}
                        />
                      </Col>
                      <Col lg={6} sm={6} xs={12}>
                        <Form.Label>Phone no</Form.Label>
                        <Form.Control
                          name="phone"
                          placeholder="Enter phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                        />
                      </Col>
                    </Row>
                    <Form.Group className="mb-3" controlId="formGridAddress1">
                      <Form.Label>Message</Form.Label>
                      <Form.Control
                        name="message"
                        placeholder="Leave a comment here"
                        as="textarea"
                        value={formData.message}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                    <Button type="submit" className="mt-4">
                      Submit
                    </Button>
                  </Form>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </section>

      <Petshopfooter />
    </>
  );
}

export default PetshopContact;
