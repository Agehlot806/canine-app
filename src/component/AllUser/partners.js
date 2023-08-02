import React, { useEffect, useState } from 'react'
import logo from '../../assets/images/logo.png'
import login from '../../assets/images/img/login.png'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { BASE_URL } from "../../Constant/Index";
import axios from 'axios'

function Partners() {
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
                                        <h1 className="main-head">Partners Application</h1>
                                        <p>Enter your mobile number to Sign up/Sign in to your logo account</p>
                                        <Form>
                                            {step === 1 && (
                                                <div className='multi-form'>
                                                    <h4><i className="fa fa-home" />  Partners Information</h4>
                                                    <Form.Group className="mb-3" controlId="formGroupEmail">
                                                        <Form.Label>Partners Name</Form.Label>
                                                        <Form.Control type="text" placeholder="Full Name" />
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" controlId="formGroupEmail">
                                                        <Form.Label>VAT/TAX (%)</Form.Label>
                                                        <Form.Control type="number" placeholder="VAT/TAX" />
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" controlId="formGroupEmail">
                                                        <Form.Label>Partners Address</Form.Label>
                                                        <Form.Control type="text" placeholder="Partners Address" />
                                                    </Form.Group>
                                                    <Row className="mb-3">
                                                    <Form.Group as={Col}>
                                                        <Form.Label>Upload Cover Photo (Ratio 2:1)</Form.Label>
                                                        <Form.Control type="file" />
                                                    </Form.Group>
                                                    <Form.Group as={Col}>
                                                        <Form.Label>Partners Logo ( Ratio 1:1 )</Form.Label>
                                                        <Form.Control type="file" />
                                                    </Form.Group>
                                                    </Row>
                                                    <Row className="mb-3">
                                                        <Form.Group as={Col}>
                                                            <Form.Label>Zone</Form.Label>
                                                            <Form.Select defaultValue="Choose...">
                                                                <option>Choose...</option>
                                                                <option>Test</option>
                                                                <option>Faizan</option>
                                                            </Form.Select>
                                                        </Form.Group>
                                                        <Form.Group as={Col}>
                                                            <Form.Label>System Module</Form.Label>
                                                            <Form.Select defaultValue="Choose...">
                                                                <option>Select System Module</option>
                                                                <option>Pets Module</option>
                                                                <option>dogs module</option>
                                                            </Form.Select>
                                                        </Form.Group>
                                                    </Row>
                                                    <Row className="mb-3">
                                                        <Form.Group as={Col} controlId="formGridState">
                                                            <Form.Label>Latitude</Form.Label>
                                                            <Form.Control type="number" placeholder="Ex: -94.22213" />
                                                        </Form.Group>
                                                        <Form.Group as={Col} controlId="formGridCity">
                                                            <Form.Label>Longitude </Form.Label>
                                                            <Form.Control type="number" placeholder="Ex: 103.344322" />
                                                        </Form.Group>
                                                    </Row>
                                                    <div className="mainForm-btn">
                                                        <Button onClick={nextStep}>Next</Button>
                                                    </div>
                                                </div>
                                            )}
                                            {step === 2 && (
                                                <div className='multi-form'>
                                                    <h4><i className="fa fa-user" />  Owner Information</h4>
                                                    <Form.Group className="mb-3" controlId="formGroupEmail">
                                                        <Form.Label>First Name</Form.Label>
                                                        <Form.Control type="text" placeholder="First Name" />
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" controlId="formGroupEmail">
                                                        <Form.Label>Last Name</Form.Label>
                                                        <Form.Control type="text" placeholder="Last Name" />
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" controlId="formGroupEmail">
                                                        <Form.Label>Phone</Form.Label>
                                                        <Form.Control type="number" placeholder="Ex:007*****" />
                                                    </Form.Group>
                                                    <div className="mainForm-btn">
                                                        <Button
                                                            style={{ width: "180px", margin: "4px" }}
                                                            onClick={prevStep}
                                                        >
                                                            Previous
                                                        </Button>
                                                        <Button onClick={nextStep}>Next</Button>
                                                    </div>
                                                </div>
                                            )}
                                            {step === 3 && (
                                                <div className='multi-form'>
                                                    <h4><i className="fa fa-user-circle" />  Login Information</h4>
                                                    <Form.Group className="mb-3" controlId="formGroupEmail">
                                                        <Form.Label>Email</Form.Label>
                                                        <Form.Control type="email" placeholder="email" />
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" controlId="formGroupEmail">
                                                        <Form.Label>Password</Form.Label>
                                                        <Form.Control type="password" placeholder="password" />
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" controlId="formGroupEmail">
                                                        <Form.Label>Confirm Password</Form.Label>
                                                        <Form.Control type="password" placeholder="Confirm Password" />
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

export default Partners