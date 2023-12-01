import React, { useEffect, useState } from "react";
import Newheader from "../../directives/newheader";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import service from "../../assets/images/banner/service.png";
import Footer from "../../directives/footer";
import { BASE_URL } from "../../Constant/Index";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import loadinggif from "../../assets/images/video/loading.gif";

function Veterinaryservice() {
  const [stateall, setStateall] = useState([]);
  const [stateallCity, setStateallCity] = useState([]);
  const [state, setstate] = useState("");
  const [city, setcity] = useState("");
  const [user_name, setuser_name] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setphone] = useState("");
  const [address, setaddress] = useState("");
  const [dates, setdates] = useState("");
  const [pet_problem, setpet_problem] = useState("");
  const [pet_id, setpet_id] = useState({});
  const [responseMessage, setResponseMessage] = useState("");
  const [selectgetpet, setselectgetpet] = useState([]);

  const customer_id = localStorage.getItem("userInfo");
  let storedUserId = JSON.parse(customer_id);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    Promise.all([GetdataAll(), selectPet()])
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const selectPet = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/auth/get_pet/${storedUserId}`
      );
      console.log(response);
      setselectgetpet(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const [stateData, setstateData] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
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
      .post(`${BASE_URL}/auth/city?state=${state}`, {
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

  const handleVeterinary = (event) => {
    event.preventDefault();
    const data = {
      user_id: storedUserId,
      name: user_name,
      email: email,
      phone: phone,
      state: state,
      city: city,
      address: address,
      pet: pet_id,
      pet_problem: pet_problem,
      dates: dates,
    };
    axios
      .post(`${BASE_URL}/banners/veterinary_booking`, data)
      .then((response) => {
        setResponseMessage(response.data.message);
        toast.success("Successfully");
      })
      .catch((error) => {
        toast.error("Field is required");
      });
  };

  return (
    <>
      <Toaster />
      <Newheader />
      {loading ? (
        <section className="section-padding mt-3 mb-3">
          <div className="loaderimg text-center text-black mb-4">
            <img src={loadinggif} alt="" />
            <h5>Please Wait.......</h5>
          </div>
        </section>
      ) : (
        <>
          <Container fluid className="p-0">
            <div className="all-bg">
              <img src={service} />
            </div>
          </Container>
          <section className="section-padding">
            <Container>
              <Row>
             
                <Col lg={12}>
                  <div className="contact-form">
                    <h4>Pet Health & Wellness Service</h4>
                    <Form>
                      <Form.Group className="mb-3" controlId="formGridAddress1">
                        <Form.Label>
                          Name<span style={{ color: "#008efd" }}>*</span>
                        </Form.Label>
                        <Form.Control
                          placeholder="Enter name"
                          type="text"
                          value={user_name}
                          onChange={(e) => setuser_name(e.target.value)}
                        />
                      </Form.Group>
                      <Row className="mb-3">
                        <Col>
                          <Form.Label>
                            Email<span style={{ color: "#008efd" }}>*</span>
                          </Form.Label>
                          <Form.Control
                            placeholder="Enter email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </Col>
                        <Col>
                          <Form.Label>
                            Phone no<span style={{ color: "#008efd" }}>*</span>
                          </Form.Label>
                          <Form.Control
                            input
                            placeholder="Enter phone"
                            maxLength={10}
                            type="tel"
                            value={phone}
                            onChange={(e) => setphone(e.target.value)}
                          />
                        </Col>
                      </Row>
                      <Row className="mb-3">
                        <Form.Group as={Col}>
                          <Form.Label>
                            State<span style={{ color: "#008efd" }}>*</span>
                          </Form.Label>
                          <Form.Select
                            aria-label="Default select example"
                            onChange={Subscription}
                            value={state}
                            onInput={(e) => setstate(e.target.value)}
                          >
                            <option>Choose...</option>
                            {stateall &&
                              stateall.map((items) => (
                                <option value={items.id} key={items.id}>
                                  {items.state_name}
                                </option>
                              ))}
                          </Form.Select>
                        </Form.Group>
                        <Form.Group as={Col}>
                          <Form.Label>
                            City<span style={{ color: "#008efd" }}>*</span>
                          </Form.Label>
                          <Form.Select
                            aria-label="Default select example"
                            value={city}
                            onChange={(e) => setcity(e.target.value)}
                          >
                            <option>Choose...</option>
                            {stateallCity.map((items) => (
                              <option>{items.city_name}</option>
                            ))}
                          </Form.Select>
                        </Form.Group>
                      </Row>

                      
                      <Form.Group className="mb-3" controlId="formGridAddress1">
                        <Form.Label>
                          Address<span style={{ color: "#008efd" }}>*</span>
                        </Form.Label>
                        <Form.Control
                          placeholder="Enter address"
                          type="text"
                          value={address}
                          onChange={(e) => setaddress(e.target.value)}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formGridAddress1">
                        <Form.Label>
                          Booking Date
                          <span style={{ color: "#008efd" }}>*</span>
                        </Form.Label>
                        <Form.Control
                          value={dates}
                          onChange={(e) => setdates(e.target.value)}
                          type="date"
                        />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formGridAddress1">
                        <Form.Label>
                          Select Pet<span style={{ color: "#008efd" }}>*</span>
                        </Form.Label>
                        <select
                          className="form-control"
                          value={pet_id}
                          onChange={(e) => setpet_id(e.target.value)}
                        >
                          <option>Choose....</option>
                          {selectgetpet &&
                            selectgetpet.map((item) => (
                              // <a onClick={(e) => setpet_id(item)}>
                              <option value={item.id}>{item.pet_name}</option>
                            ))}
                        </select>
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formGridAddress1">
                        <Form.Label>
                          Pet Problems
                          <span style={{ color: "#008efd" }}>*</span>
                        </Form.Label>
                        <Form.Control
                          placeholder="Leave a comment here"
                          as="textarea"
                          type="text"
                          value={pet_problem}
                          onChange={(e) => setpet_problem(e.target.value)}
                        />
                      </Form.Group>

                      <Button className="mt-4" onClick={handleVeterinary}>
                        Submit
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

export default Veterinaryservice;
