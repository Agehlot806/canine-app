import React, { useEffect, useState } from "react";
import Newheader from "../../directives/newheader";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Footer from "../../directives/footer";
import axios from "axios";

function Updateprofile() {
  const [profileData, setProfileData] = useState({
    firstname: "",
    lastname: "",
    email: "", // Initialize with default value
    phone: "", // Initialize with default value
    image: "",
    // Add more fields here as needed
  });
  console.log("profileData: ", profileData);

  useEffect(() => {
    // Fetch profile data from the API
    axios
      .get("https://canine.hirectjob.in/api/v1/auth/my_profile/244")
      .then((response) => {
        if (response.data.status === "200") {
          console.log("response.data: ", response.data);
          setProfileData({
            f_name: response.data.data[0].f_name,
            l_name: response.data.data[0].l_name,
            email: response.data.data[0].email, // Set email from response
            phone: response.data.data[0].phone, // Set phone from response
            image: response.data.data[0].image,
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
      <Newheader />
      <section className="section-padding">
        <Container>
          <Row className="justify-content-center mt-3">
            <Col lg={10}>
              <h1 className="main-head text-center">Profile</h1>
              <div className="contact-form">
                <Form onSubmit={handleFormSubmit}>
                  <Row>
                    <Col>
                      <Form.Group className="mb-3" controlId="formGridEmail">
                        <Form.Label>
                          First Name<span style={{ color: "#008efd" }}>*</span>
                        </Form.Label>
                        <Form.Control
                          placeholder="Enter first name"
                          type="text"
                          name="f_name"
                          value={profileData.f_name || ""}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              f_name: e.target.value,
                            })
                          }
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className="mb-3" controlId="formGridEmail">
                        <Form.Label>
                          Last Name<span style={{ color: "#008efd" }}>*</span>
                        </Form.Label>
                        <Form.Control
                          name="l_name"
                          placeholder="Enter last name"
                          type="text"
                          value={profileData.l_name || ""}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              l_name: e.target.value,
                            })
                          }
                        />
                      </Form.Group>
                    </Col>
                  </Row>
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
                  <Form.Group className="mb-3" controlId="formGridPhone">
                    <Form.Label>
                      Upload Image<span style={{ color: "#008efd" }}>*</span>
                    </Form.Label>

                    <Form.Control type="file" />
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
