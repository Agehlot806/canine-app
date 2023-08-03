import React, { useEffect, useState } from 'react'
import Header from '../../directives/header'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import service from '../../assets/images/banner/service.png'
import Footer from '../../directives/footer'
import { BASE_URL } from "../../Constant/Index";
import axios from 'axios'


function Veterinaryservice() {
    const [categories, setcategories] = useState([]);
    const [stateall, setStateall] = useState([]);
    const [stateallCity, setStateallCity] = useState([]);
    const [state, setstate] = useState("");
    const [city, setcity] = useState("");
    const [error, seterror] = useState(false);
    const [user_name, setuser_name] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setphone] = useState("");
    const [address, setaddress] = useState("");
    const [pet_problem, setpet_problem] = useState("");
    const [responseMessage, setResponseMessage] = useState("");

    useEffect(() => {
        GetStateAll();
        categoriesProduct();
    }, []);

    const categoriesProduct = async () => {
        try {
            const response = await fetch(`${BASE_URL}/auth/get_pet${id}`);
            const jsonData = await response.json();
            setcategories(jsonData.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const GetStateAll = async (e) => {
        var headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
        };
        await fetch(`${BASE_URL}/auth/state`, {
            method: "GET",
            headers: headers,
        })
            .then((Response) => Response.json())
            .then((Response) => {
                setStateall(Response.state);
                // console.log("99999999999999999999", Response);
            })
            .catch((error) => {
                console.error("ERROR FOUND---->>>>" + error);
            });
    };

    const GetdCityAll = (state) => {

        axios
            .get(`${BASE_URL}/auth/city?state=${state}`, {
                headers: { "Content-Type": "multipart/form-data" },
            })
            .then((response) => {
                console.log("responseresponse", response);
                setStateallCity(response.data.state);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const Subscription = (event) => {
        if (event.target.value) {
            setstate(event.target.value);

            GetdCityAll(event.target.value);
        }
    };

    const handleVeterinary = (event) => {
        event.preventDefault();
        const data = {
            user_name: user_name,
            email: email,
            phone: phone,
            address: address,
            pet_problem: pet_problem,

        };
        axios.post(`${BASE_URL}/banners/veterinary_booking`, data)
            .then((response) => {
                setResponseMessage(response.data.message);
                toast.success("Subscription Successfully");
                console.log("veterinary", data);
            })
            .catch((error) => {
                console.error("field is required", error);
            });
    };


    return (
        <>
            <Header />
            <Container fluid className='p-0'>
                <div className='all-bg'>
                    <img src={service} />
                </div>
            </Container>
            <section className="section-padding">
                <Container>
                    <Row>
                        <Col lg={6}>
                            <div className='veter-area'>
                                <div className='veter-timing'>
                                    <div> <i className="fa fa-clock-o" /></div>
                                    <div>
                                        <h3>Open Hours</h3>
                                        <p>Mon-Fri:7am-6pm</p>
                                        <p>Sat-Sun:9ap-4pm</p>
                                    </div>
                                </div>
                                <div className='veter-timing'>
                                    <div><i className="fa fa-phone " /></div>
                                    <div>
                                        <h3>Phone</h3>
                                        <p>(+91)0000000000</p>
                                        <p>(+91)0000000000</p>
                                    </div>
                                </div>
                                <div className='veter-timing'>
                                    <div> <i className="fa fa-map-marker" /></div>
                                    <div>
                                        <h3>Address</h3>
                                        <p>Canine Products Borvali (Mumbai)</p>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col lg={6}>
                            <div className='contact-form'>
                                <h1>Pet Grooming Service</h1>
                                <Form>
                                    <Form.Group className="mb-3" controlId="formGridAddress1">
                                        <Form.Label>Name<span style={{ color: "#008efd" }}>*</span></Form.Label>
                                        <Form.Control placeholder="Enter name" type='text' value={user_name} onChange={(e) => setuser_name(e.target.value)} />
                                        {error && user_name.length <= 0 ? (
                                            <span className="validationErr">
                                                Username is required.
                                            </span>
                                        ) : (
                                            ""
                                        )}
                                    </Form.Group>

                                    <Row className="mb-3">
                                        <Col>
                                            <Form.Label>Email<span style={{ color: "#008efd" }}>*</span></Form.Label>
                                            <Form.Control placeholder="Enter email" type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                                            {error && email.length <= 0 ? (
                                                <span className="validationErr">
                                                    Email is required.
                                                </span>
                                            ) : (
                                                ""
                                            )}
                                        </Col>
                                        <Col>
                                            <Form.Label>Phone no<span style={{ color: "#008efd" }}>*</span></Form.Label>
                                            <Form.Control input placeholder="Enter phone" maxLength={10} type='tel' value={phone} onChange={(e) => setphone(e.target.value)} />
                                            {error && phone.length <= 0 ? (
                                                <span className="validationErr">
                                                    Phone is required.
                                                </span>
                                            ) : (
                                                ""
                                            )}
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
                                            >
                                                <option>Choose...</option>
                                                {stateall.map((items) => (
                                                    <option value={items.id} key={items.id}>
                                                        {items.state_name}
                                                    </option>
                                                ))}
                                            </Form.Select>
                                            {error && state.length <= 0 ? (
                                                <span className="validationErr">
                                                    State is required.
                                                </span>
                                            ) : (
                                                ""
                                            )}
                                        </Form.Group>
                                        <Form.Group as={Col}>
                                            <Form.Label>
                                                City<span style={{ color: "#008efd" }}>*</span>
                                            </Form.Label>
                                            <Form.Select
                                                aria-label="Default select example"

                                            >
                                                <option>Choose...</option>
                                                {stateallCity.map((items) => (
                                                    <option>{items.city_name}</option>
                                                ))}
                                            </Form.Select>
                                            {error && city.length <= 0 ? (
                                                <span className="validationErr">
                                                    City is required.
                                                </span>
                                            ) : (
                                                ""
                                            )}
                                        </Form.Group>
                                    </Row>
                                    <Form.Group className="mb-3" controlId="formGridAddress1">
                                        <Form.Label>Address<span style={{ color: "#008efd" }}>*</span></Form.Label>
                                        <Form.Control placeholder="Enter address" type='text' value={address} onChange={(e) => setaddress(e.target.value)} />
                                        {error && address.length <= 0 ? (
                                            <span className="validationErr">
                                                Address is required.
                                            </span>
                                        ) : (
                                            ""
                                        )}
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formGridAddress1">
                                        <Form.Label>Select Pet<span style={{ color: "#008efd" }}>*</span></Form.Label>

                                        <select className="form-control">
                                             <option>Choose....</option>
                                            {categories &&
                                                categories.map((item) => (
                                                    <option key={item.id}>{item.pet_name}</option>
                                                ))}
                                        </select>
                                        {/* {error && address.length <= 0 ? (
                                                <span className="validationErr">
                                                    Phone is required.
                                                </span>
                                            ) : (
                                                ""
                                            )} */}

                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formGridAddress1">
                                        <Form.Label>Pet Problems<span style={{ color: "#008efd" }}>*</span></Form.Label>
                                        <Form.Control placeholder="Leave a comment here" as="textarea" type='text' value={pet_problem} onChange={(e) => setpet_problem(e.target.value)} />
                                        {error && pet_problem.length <= 0 ? (
                                            <span className="validationErr">
                                                Pet problem is required.
                                            </span>
                                        ) : (
                                            ""
                                        )}
                                    </Form.Group>
                                    <Button className='mt-4' onClick={handleVeterinary}>Submit</Button>
                                </Form>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            <Footer />
        </>
    )
}

export default Veterinaryservice