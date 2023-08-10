import React, { useEffect, useState } from "react";
import Header from "../../directives/header";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Footer from "../../directives/footer";
import axios from "axios";

function Updateprofile() {
  const [profileData, setProfileData] = useState({
    email: "", // Initialize with default value
    phone: "", // Initialize with default value
    // Add more fields here as needed
  });
  console.log("profileData: ", profileData);

  useEffect(() => {
    // Fetch profile data from the API
    axios
      .get("https://canine.hirectjob.in/api/v1/auth/my_profile/1")
      .then((response) => {
        if (response.data.status === "200") {
          setProfileData({
            email: response.data.email, // Set email from response
            phone: response.data.phone, // Set phone from response
            // Set other fields as needed
          });
          // Update the profileData state
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://canine.hirectjob.in/api/v1/auth/update-profile",
        profileData // Send the profileData object in the request
      );
      if (response.data.message === "Successfully updated!") {
        console.log("Profile updated successfully!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Header />
      <section className="section-padding">
        <Container>
          <Row className="justify-content-center mt-3">
            <Col lg={10}>
              <h1 className="main-head text-center">Profile</h1>
              <div className="contact-form">
                <Form onSubmit={handleFormSubmit}>
                  <Form.Group className="mb-3" controlId="formGridEmail">
                    <Form.Label>
                      Email<span style={{ color: "#008efd" }}>*</span>
                    </Form.Label>
                    <Form.Control
                      name="email"
                      placeholder="Enter email"
                      type="text"
                      value={profileData.email || ""}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          email: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formGridPhone">
                    <Form.Label>
                      Phone<span style={{ color: "#008efd" }}>*</span>
                    </Form.Label>

                    <Form.Control
                      name="phone"
                      placeholder="Enter phone"
                      type="text"
                      maxLength={10}
                      value={profileData.phone || ""}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          phone: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                  <Button type="submit" className="mt-4">
                    Update Profile
                  </Button>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <Footer />
    </>
  );
}

export default Updateprofile;
