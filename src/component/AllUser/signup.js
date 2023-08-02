import React, { useEffect, useState } from 'react'
import logo from '../../assets/images/logo.png'
import login from '../../assets/images/img/login.png'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { BASE_URL } from "../../Constant/Index";
import axios from 'axios'

function Signup() {
    const [stateall, setStateall] = useState([]);
    const [stateallCity, setStateallCity] = useState([]);
    const [state, setstate] = useState("");

    const [city, setcity] = useState("");
    const [error, seterror] = useState(false);

    useEffect(() => {
        GetdataAll();
    }, []);

    const GetdataAll = async (e) => {
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
                console.log("99999999999999999999", Response);



            })
            .catch((error) => {
                console.error("ERROR FOUND---->>>>" + error);
            });
    };
    console.log(state);

    const Getdatacity = (state) => {

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

            Getdatacity(event.target.value);
        }
    };

    return (
        <>
            <div className='users-bg'>
                <Container>
                    <div className="text-center">
                        <img src={logo} />
                    </div>
                    <div>
                        <Row>
                            <Col lg={7}>
                                <div className='form-area'>
                                    <h1 className="main-head">Lorem Ipsum is simply</h1>
                                    <p>Enter your mobile number to Sign up/Sign in to your logo account</p>
                                    <Form>
                                        <Form.Group className="mb-3" controlId="formGroupEmail">
                                            <Form.Control type="text" placeholder="Full Name" />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formGroupEmail">
                                            <Form.Control type="date" placeholder="Date of Birth" />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formGroupEmail">
                                            <Form.Control type="email" placeholder="Email ID" />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formGroupEmail">
                                            <Form.Control type="text" placeholder="Business Name" />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formGroupEmail">
                                            <Form.Label>Country</Form.Label>
                                            <Form.Select defaultValue="Choose...">
                                                <option>Choose...</option>
                                                <option>...</option>
                                            </Form.Select>
                                        </Form.Group>
                                        <Row className="mb-3">
                                            <Form.Group as={Col}>
                                                <Form.Label>
                                                    State<span style={{ color: "red" }}>*</span>
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
                                                    City<span style={{ color: "red" }}>*</span>
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
                                        <Form.Group className="mb-3" controlId="formGroupEmail">
                                            <Form.Control type="number" placeholder="GST Number" />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formGroupEmail">
                                            <Form.Control type="number" placeholder="Pincode" />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formGroupEmail">
                                            <Form.Label>Currency</Form.Label>
                                            <Form.Select defaultValue="Choose...">
                                                <option>Choose...</option>
                                                <option>...</option>
                                            </Form.Select>
                                        </Form.Group>
                                        <Row className="mb-3">
                                            <Form.Group as={Col} controlId="formGridState">
                                                <Form.Label>Upload 1</Form.Label>
                                                <Form.Control type="file" />
                                            </Form.Group>
                                            <Form.Group as={Col} controlId="formGridCity">
                                                <Form.Label>Upload 2</Form.Label>
                                                <Form.Control type="file" />
                                            </Form.Group>
                                        </Row>
                                        <div className='login-btns'>
                                            <Button variant="primary" type="submit">
                                                Signup
                                            </Button>
                                            <p>
                                                Already a member? <Link to="/login">Login here</Link>
                                            </p>
                                        </div>
                                    </Form>
                                </div>
                            </Col>
                            <Col lg={5}>
                                <div className='login-img'>
                                    <img src={login} />
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </div>
        </>
    )
}

export default Signup