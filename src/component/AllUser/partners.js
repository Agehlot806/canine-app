import React, { useEffect, useState } from 'react'
import logo from '../../assets/images/logo.png'
import login from '../../assets/images/img/login.png'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { BASE_URL } from "../../Constant/Index";
import axios from 'axios'

function Partners() {
    const [step, setStep] = useState(1);
    const navigate = useNavigate();
    const [partnerData, setpartnerData] = useState({});
    const [zoneList, setZoneList] = useState([]);
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

    useEffect(() => {
        getZoneList();
    }, []);

    const getZoneList = async () => {
        await axios
            .get(`${BASE_URL}/zone/list`)
            .then((res) => {
                setZoneList(res.data.data);
            })
            .catch((error) => {
                console.log("error in zone list", error);
            });
    };

    const handleOnChange = (e) => {
        setpartnerData({
            ...partnerData,
            [e.target.name]: e.target.value,
        });
    };

    // post data
    const handleSubmit = async (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append("f_name", partnerData.f_name);
        formData.append("l_name", partnerData.l_name);
        formData.append("email", partnerData.email);
        formData.append("s_name", partnerData.s_name);
        formData.append("zone_id", partnerData.zone_id);
        formData.append("address", partnerData.address);
        formData.append("latitude", partnerData.latitude);
        formData.append("longitude", partnerData.longitude);
        formData.append("cover_photo", partnerData.cover_photo);
        formData.append("phone", partnerData.phone);
        formData.append("password", partnerData.password);
        formData.append("logo", partnerData.logo);
        formData.append("zone_id", partnerData.zone_id);
        formData.append("gst", partnerData.gst);

        await axios
            .post(`${BASE_URL}/auth/register`, formData)
            .then((res) => {
                // toast.success("Application placed successfully");
                navigate("/partner-dashboad");
            })
            .catch((error) => {
                console.log("error in submit", error);
            });
    };

    const imageuploadhandler = (e) => {
        setpartnerData({
            ...partnerData,
            [e.target.name]: e.target.files[0],
        });
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
                                                        <Form.Label>Shop Name</Form.Label>
                                                        <Form.Control type="text" placeholder="Shop Name" name="s_name" onChange={(e) => handleOnChange(e)} />
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" controlId="formGroupEmail">
                                                        <Form.Label>GST Number</Form.Label>
                                                        <Form.Control type="number" placeholder="GST number" name="gst" onChange={(e) => handleOnChange(e)} />
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" controlId="formGroupEmail">
                                                        <Form.Label>Shop Address</Form.Label>
                                                        <Form.Control type="text" placeholder="Shop Address" name="address" onChange={(e) => handleOnChange(e)} />
                                                    </Form.Group>
                                                    <Row className="mb-3">
                                                        <Form.Group as={Col}>
                                                            <Form.Label>Upload Cover Photo (Ratio 2:1)</Form.Label>
                                                            <Form.Control type="file" name="cover_photo"
                                                                onChange={(e) => imageuploadhandler(e)} />
                                                        </Form.Group>
                                                        <Form.Group as={Col}>
                                                            <Form.Label>Partners Logo ( Ratio 1:1 )</Form.Label>
                                                            <Form.Control type="file" name="logo"
                                                                onChange={(e) => imageuploadhandler(e)}/>
                                                        </Form.Group>
                                                    </Row>
                                                    <Row className="mb-3">
                                                        <Form.Group as={Col}>
                                                            <Form.Label>Zone</Form.Label>
                                                            <Form.Select
                                                                defaultValue="Select Zone"
                                                                name="zone_id"
                                                                onChange={(e) => handleOnChange(e)}
                                                            >
                                                                <option value={""}>Select Zone</option>
                                                                {zoneList.map((zonedata) => (
                                                                    <option value={zonedata.id}>{zonedata.name}</option>
                                                                ))}
                                                            </Form.Select>
                                                        </Form.Group>
                                                    </Row>
                                                    <Row className="mb-3">
                                                        <Form.Group as={Col} controlId="formGridState">
                                                            <Form.Label>Latitude</Form.Label>
                                                            <Form.Control type="number" placeholder="Ex: -94.22213" name="latitude" onChange={(e) => handleOnChange(e)}/>
                                                        </Form.Group>
                                                        <Form.Group as={Col} controlId="formGridCity">
                                                            <Form.Label>Longitude </Form.Label>
                                                            <Form.Control type="number" placeholder="Ex: 103.344322" name="longitude" onChange={(e) => handleOnChange(e)}/>
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
                                                        <Form.Control type="text" placeholder="First Name" name="f_name" onChange={(e) => handleOnChange(e)}/>
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" controlId="formGroupEmail">
                                                        <Form.Label>Last Name</Form.Label>
                                                        <Form.Control type="text" placeholder="Last Name"name="l_name" onChange={(e) => handleOnChange(e)} />
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" controlId="formGroupEmail">
                                                        <Form.Label>Phone</Form.Label>
                                                        <Form.Control type="number" placeholder="Ex:007*****" name="phone" onChange={(e) => handleOnChange(e)}/>
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
                                                        <Form.Control type="email" placeholder="email" name="email" onChange={(e) => handleOnChange(e)}/>
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" controlId="formGroupEmail">
                                                        <Form.Label>Password</Form.Label>
                                                        <Form.Control type="password" placeholder="password" name="password" onChange={(e) => handleOnChange(e)}/>
                                                    </Form.Group>
                                                    <div className="mainForm-btn">
                                                        <Button
                                                            style={{ width: "180px", margin: "4px" }}
                                                            onClick={prevStep}
                                                        >
                                                            Previous
                                                        </Button>
                                                        <Button type="submit" onClick={(e) => handleSubmit(e)}>Submit</Button>
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