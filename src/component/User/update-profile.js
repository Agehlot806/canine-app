import React, { useEffect, useState } from "react";
import Newheader from "../../directives/newheader";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Footer from "../../directives/footer";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import loadinggif from "../../assets/images/video/loading.gif";
import { BASE_URL } from "../../Constant/Index";

function Updateprofile() {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);


  const customer_id = localStorage.getItem("userInfo");
  let storedUserId = JSON.parse(customer_id);
 

  const [name, setname] = useState("");
  const [namel, setnamel] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [imgage, setimgage] = useState("");

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    Promise.all([GetProfileData()])
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const GetProfileData = () =>{
    // Fetch profile data from the API
    axios
      .get(`${BASE_URL}/auth/my_profile/${storedUserId}`)
      .then((response) => {
        console.log("response.data:????? ", response.data);
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
  }
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
      url: `${BASE_URL}/auth/update-profile`,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((response) => {
        console.log(" New password updatesuccessfully");
        toast.success("Successfully updated!");
        console.log("respo", response);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Newheader />
      {loading ? (
        <section className="section-padding mt-3 mb-3">
        <div className="loaderimg text-center text-black mb-4">
        <img src={loadinggif} alt=""/>
        <h5>Please Wait.......</h5>
      </div>
      </section>
      ) : (
        <>
        <section className="section-padding">
        <Container>
          <Row className="justify-content-center mt-3">
            <Col lg={10}>
              <h1 className="main-head text-center">Profile</h1>
              <div className="contact-form">
                <Form>
                  <Row>
                    <Col lg={6} sm={6} xs={12}>
                      <Form.Group className="mb-3" controlId="formGridEmail">
                        <Form.Label>
                          First Name<span style={{ color: "#008efd" }}>*</span>
                        </Form.Label>
                        <Form.Control
                          placeholder="Enter first name"
                          type="text"
                          name="f_name"
                          value={name}
                          onChange={(e) => setname(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                    <Col lg={6} sm={6} xs={12}>
                      <Form.Group className="mb-3" controlId="formGridEmail">
                        <Form.Label>
                          Last Name<span style={{ color: "#008efd" }}>*</span>
                        </Form.Label>
                        <Form.Control
                          name="l_name"
                          placeholder="Enter last name"
                          type="text"
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
                      value={phone}
                      onChange={(e) => setphone(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formGridPhone">
                    <Form.Label>
                      Upload Image<span style={{ color: "#008efd" }}>*</span>
                    </Form.Label>
                    <Form.Control type="file" onChange={halderimage} />
                    {/* {selectedImage && (
                      <img src={selectedImage} alt="Selected Image" style={{ width: '100px', height: '100px' }} />
                    )} */}
                    {/* <img src={"https://canine.hirectjob.in//storage/app/public/profile/" + imgage} alt='' /> */}
                    <img
                      src={
                        selectedImage
                          ? selectedImage
                          : `https://canine.hirectjob.in//storage/app/public/profile/${imgage}`
                      }
                      alt={selectedImage ? "Image" : "Image not available"}
                      style={{ width: "100px", height: "100px" }}
                    />
                  </Form.Group>
                  {/* {imagePhoto ?
                                                            <img src={filePhoto} alt="file"></img> : ""} */}
                  <Button
                    type="submit"
                    className="mt-4"
                    onClick={UpdateProfile}
                  >
                    Update Profile
                  </Button>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
        </>
      )}
      <Footer />
    </>
  );
}

export default Updateprofile;
