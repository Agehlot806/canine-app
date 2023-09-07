import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import axios from "axios";
import { BASE_URL } from "../../Constant/Index";
import { useNavigate } from "react-router-dom";
import PetShopHeader from "../../directives/petShopHeader";
import Petshopfooter from "../../directives/petShop-Footer";

function PetshopUpdateprofile() {
  // const [uploadField, setUploadField] = useState([{image:""}])
  const navigator = useNavigate();
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState({ image: "" } || null);
  console.log(imageUrl);

  const [profileData, setProfileData] = useState({
    f_name: "",
    l_name: "",
    email: "", // Initialize with default value
    phone: "", // Initialize with default value
    image: "",
    // Add more fields here as needed
  });
  console.log("profileData: ", profileData);

  const loginType = localStorage.getItem("loginType");
  const salesmanId = localStorage.getItem("salesmanId");
  // storedWholesellerId
  const storedWholesellerId = Number(localStorage.getItem("UserWholesellerId"));
  console.log("storedWholesellerId: ", storedWholesellerId);
  // ----------------------------------------
  useEffect(() => {
    if (loginType == "salesman") {
      getSalesmanProfile();
    } else {
      getWholesellerProfile();
    }
  }, []);

  const getWholesellerProfile = async () => {
    // Fetch profile data from the API
    await axios
      .get(`${BASE_URL}/auth/my_profile/${storedWholesellerId}`)
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
          if (profile.image) {
            setImageUrl(profile.image);
          }
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getSalesmanProfile = async () => {
    await axios
      .get(`${BASE_URL}/auth/delivery-man/deliveryman_profile/${salesmanId}`)
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
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setProfileData({
      ...profileData,
      image: e.target.files[0],
    });
    if (file) {
      setImageFile(file);

      // Create a preview URL for the selected image
      const previewUrl = URL.createObjectURL(file);
      setImageUrl(previewUrl);
    }
  };

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

  const handleSalesmanUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("f_name", profileData.f_name);
    formData.append("l_name", profileData.l_name);
    formData.append("email", profileData.email);
    formData.append("image", profileData.image);
    formData.append("phone", profileData.phone);
    await axios
      .post(`${BASE_URL}/auth/delivery-man/deliveryman_update`, formData)
      .then((res) => {
        console.log("res in profile", res);
        navigator("/salesman-dashboad");
      })
      .catch((error) => {
        console.log("error in profile", error);
      });
  };

  return (
    <>
      <PetShopHeader />
      <section className="section-padding">
        <Container>
          <Row className="justify-content-center mt-3">
            <Col lg={10}>
              <h1 className="main-head text-center">Profile</h1>
              <div className="contact-form">
                <Form
                  onSubmit={(e) => {
                    if (loginType == "salesman") {
                      handleSalesmanUpdate(e);
                    } else {
                      handleFormSubmit(e);
                    }
                  }}
                >
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
                              f_name: e.target.value.replace(/[^A-Za-z]/, ""),
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
                              l_name: e.target.value.replace(/[^A-Za-z]/, ""),
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
                      type="email"
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
                      type="tel"
                      maxLength={10}
                      disabled={loginType == "salesman" ? true : false}
                      value={profileData.phone || ""}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          phone: e.target.value
                            .replace(/\D/g, "")
                            .substring(0, 10),
                        })
                      }
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formGridPhone">
                    <Form.Label>
                      Upload Image<span style={{ color: "#008efd" }}>*</span>
                    </Form.Label>
                    <Form.Control type="file" onChange={handleImageUpload} />
                    {imageUrl.image !== null && imageUrl.image !== "" ? (
                      <div className="image-preview">
                        <img src={imageUrl} alt="Uploaded" />
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => {
                            setImageFile(null);
                            setImageUrl("");
                          }}
                        >
                          Remove
                        </Button>
                      </div>
                    ) : (
                      <div className="image-preview">
                        <img
                          src={
                            "https://canine.hirectjob.in/storage/app/public/delivery-man/" +
                            profileData.image
                          }
                          alt="profile"
                        />
                      </div>
                    )}
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
      <Petshopfooter />
    </>
  );
}

export default PetshopUpdateprofile;
