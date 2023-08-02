import React, { useEffect, useState } from 'react'
import logo from '../../assets/images/logo.png'
import login from '../../assets/images/img/login.png'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { BASE_URL } from "../../Constant/Index";
import axios from 'axios'

function Salesman() {
    const [step, setStep] = useState(1);

    const nextStep = () => {
        // if (f_name && l_name && email && password && confirmpassword && phone) {
        setStep((prevStep) => prevStep + 1);
        // } else {
        //     toast.error("Please Enter All Fields");
        //     // alert("fill all fields");
        // }
    };

    // Function to move to the previous step
    const prevStep = () => {
        setStep((prevStep) => prevStep - 1);
    };
    return (
        <>
            <div className='users-bg'>
                <Container>
                    <div className="text-center">
                        <img src={logo} />
                    </div>
                    <section className='section-padding'>
                        <div>
                            <Row>
                                <Col lg={7}>
                                    <div className='form-area'>
                                        <h1 className="main-head">Salesman Application</h1>
                                        <p>Enter your mobile number to Sign up/Sign in to your logo account</p>
                                        <Form>
                                            {step === 1 && (
                                                <div className='multi-form'>
                                                    <h4><i className="fa fa-home" />  Sales Man Information</h4>
                                                    <Row className="mb-3">
                                                        <Form.Group as={Col}>
                                                            <Form.Label>First Name</Form.Label>
                                                            <Form.Control type="text" placeholder="First Name" />
                                                        </Form.Group>
                                                        <Form.Group as={Col}>
                                                            <Form.Label>Last Name</Form.Label>
                                                            <Form.Control type="text" placeholder="Last Name" />
                                                        </Form.Group>
                                                    </Row>
                                                    <Form.Group className="mb-3" controlId="formGroupEmail">
                                                        <Form.Label>Email</Form.Label>
                                                        <Form.Control type="email" placeholder="Email" />
                                                    </Form.Group>
                                                    <Row className="mb-3">
                                                        <Form.Group as={Col}>
                                                            <Form.Label>Sales Man Type</Form.Label>
                                                            <Form.Select defaultValue="Choose...">
                                                                <option>Choose...</option>
                                                                <option>Freelancer</option>
                                                                <option>Salary based</option>
                                                            </Form.Select>
                                                        </Form.Group>
                                                        <Form.Group as={Col}>
                                                            <Form.Label>Zone</Form.Label>
                                                            <Form.Select defaultValue="Select Zone">
                                                                <option>Select Zone</option>
                                                                <option>test</option>
                                                                <option>Faizan Kazi</option>
                                                            </Form.Select>
                                                        </Form.Group>
                                                    </Row>
                                                    <Row className="mb-3">
                                                        <Form.Group as={Col}>
                                                            <Form.Label>Identity Type</Form.Label>
                                                            <Form.Select defaultValue="Choose...">
                                                                <option>Choose...</option>
                                                                <option>Passport</option>
                                                                <option>Driving License</option>
                                                                <option>NID</option>
                                                                <option>Partners ID</option>
                                                            </Form.Select>
                                                        </Form.Group>
                                                        <Form.Group as={Col}>
                                                            <Form.Label>Identity Number</Form.Label>
                                                            <Form.Control type="number" placeholder="Identity Number" />
                                                        </Form.Group>
                                                    </Row>
                                                    <Form.Group className="mb-3" controlId="formGroupEmail">
                                                        <Form.Label>Identity Image</Form.Label>
                                                        <Form.Control type="file" />
                                                    </Form.Group>
                                                    <div className="mainForm-btn">
                                                        <Button onClick={nextStep}>Next</Button>
                                                    </div>
                                                </div>
                                            )}
                                            {step === 2 && (
                                                <div className='multi-form'>
                                                    <h4><i className="fa fa-user" />  Login Information</h4>
                                                    <Form.Group className="mb-3" controlId="formGroupEmail">
                                                        <Form.Label>Phone</Form.Label>
                                                        <Form.Control type="number" placeholder="Phone" />
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" controlId="formGroupEmail">
                                                        <Form.Label>Password</Form.Label>
                                                        <Form.Control type="password" placeholder="Password" />
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" controlId="formGroupEmail">
                                                        <Form.Label>Sales Man Image</Form.Label>
                                                        <Form.Control type="file" />
                                                    </Form.Group>
                                                    <div className="mainForm-btn">
                                                        <Button
                                                            style={{ width: "180px", margin: "4px" }}
                                                            onClick={prevStep}
                                                        >
                                                            Previous
                                                        </Button>
                                                        <Button type="submit">Submit</Button>
                                                    </div>
                                                </div>
                                            )}
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
                    </section>
                </Container>
            </div>
        </>
    )
}

export default Salesman