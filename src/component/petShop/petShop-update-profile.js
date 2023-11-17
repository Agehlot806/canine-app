import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import axios from "axios";
import { BASE_URL } from "../../Constant/Index";
import { useNavigate } from "react-router-dom";
import PetShopHeader from "../../directives/petShopHeader";
import Petshopfooter from "../../directives/petShop-Footer";
import toast, { Toaster } from "react-hot-toast";

function PetshopUpdateprofile() {
  const navigator = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const customer_id = localStorage.getItem("userInfo");
  let storedUserId = JSON.parse(customer_id);

  const [name, setname] = useState("");
  const [namel, setnamel] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [imgage, setimgage] = useState("");
 
  const getWholesellerProfile = () => {
    axios
      .get(`${BASE_URL}/auth/my_profile/${storedWholesellerId}`)
      .then((response) => {
        console.log("===========>>>>>>>>> ", response.data);
        setname(response.data.data[0].f_name);
        setnamel(response.data.data[0].l_name);
        setemail(response.data.data[0].email);
        setphone(response.data.data[0].phone);
        setimgage(response.data.data[0].image);
        // Update the profileData state
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const halderimage = (e) => {
    // setimgage(e.target.files[0])
    const file = e.target.files[0];
    setimgage(file); // Store the file directly

    // Create a preview URL for the selected image
    setSelectedImage(URL.createObjectURL(file));
  };

  const UpdateProfile = (e) => {
    e.preventDefault();
    var formData = new FormData();
    // formData.append('username', username);
    formData.append("f_name", name);
    formData.append("l_name", namel);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("image", imgage);

    axios({
      method: "post",
      url: `https://canine.hirectjob.in/api/v1/auth/update-profile`,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((response) => {
        console.log(" New password updatesuccessfully");
        toast.success("Successfully updated!");
        console.log("respo", response);
        navigator("/petshop-home");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const loginType = localStorage.getItem("loginType");
  const salesmanId = localStorage.getItem("salesmanId");
  // storedWholesellerId
  const storedWholesellerId = Number(localStorage.getItem("UserWholesellerId"));
  // ----------------------------------------
  useEffect(() => {
    if (loginType == "salesman") {
      getSalesmanProfile();
    } else {
      getWholesellerProfile();
    }
  }, []);
  const onclickdata = () => {
    toast.success("Successfully updated!");
  };

 

  const getSalesmanProfile = async () => {
    
    axios
      .get(`${BASE_URL}/auth/delivery-man/deliveryman_profile/${salesmanId}`)
      .then((response) => {
        console.log("salesmannnnnnnnnnnnnnn ", response.data);
        setname(response.data.data[0].f_name);
        setnamel(response.data.data[0].l_name);
        setemail(response.data.data[0].email);
        setphone(response.data.data[0].phone);
        setimgage(response.data.data[0].image);
        // Update the profileData state
      })
      .catch((error) => {
        console.error(error);
      });
  };

 

  const handleSalesmanUpdate = async (e) => {
   
    e.preventDefault();
    var formData = new FormData();
    // formData.append('username', username);
    formData.append("f_name", name);
    formData.append("l_name", namel);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("image", imgage);

    axios({
      method: "post",
      url: `${BASE_URL}/auth/delivery-man/deliveryman_update`,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((response) => {
        console.log(" New password updatesuccessfully");
        toast.success("Successfully updated!");
        console.log("respo", response);
        navigator("/salesman-dashboad");
      })
      .catch((error) => {
        console.log(error);
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
                      UpdateProfile(e);
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
                          // value={profileData.f_name || ""}
                          value={name}
                          // onChange={(e) =>
                          //   setProfileData({
                          //     ...profileData,
                          //     f_name: e.target.value.replace(/[^A-Za-z]/, ""),
                          //   })
                          // }
                          onChange={(e) => setname(e.target.value)}
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
                          // value={profileData.l_name || ""}
                          // onChange={(e) =>
                          //   setProfileData({
                          //     ...profileData,
                          //     l_name: e.target.value.replace(/[^A-Za-z]/, ""),
                          //   })
                          // }
                          value={namel}
                          onChange={(e) => setnamel(e.target.value)}
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
                      // value={profileData.email || ""}
                      // onChange={(e) =>
                      //   setProfileData({
                      //     ...profileData,
                      //     email: e.target.value,
                      //   })
                      // }
                      value={email}
                      onChange={(e) => setemail(e.target.value)}
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
                      
                      value={phone}
                      onChange={(e) => setphone(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formGridPhone">
                    <Form.Label>
                      Upload Image<span style={{ color: "#008efd" }}>*</span>
                    </Form.Label>
                   
                    <Form.Control type="file" onChange={halderimage} />
                    {selectedImage ? (
                      <img
                        src={selectedImage}
                        alt="Selected Image"
                        style={{ width: "100px", height: "100px" }}
                      />
                    ) : (
                      <img
                        src={
                          loginType === "salesman"
                            ? ` /public/delivery-man/${imgage}`
                            : `https://canine.hirectjob.in//storage/app/public/profile/${imgage}`
                        }
                        alt={selectedImage ? "Image" : "Image not available"}
                        style={{ width: "100px", height: "100px" }}
                      />
                    )}
                  </Form.Group>

                  <Button
                    type="submit"
                    className="mt-4"
                    onClick={(e) => {
                      if (loginType == "salesman") {
                        handleSalesmanUpdate(e);
                      } else {
                        UpdateProfile(e);
                      }
                    }}
                  >
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
