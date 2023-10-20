import React, { useEffect, useState } from 'react'
import logo from '../../assets/images/logo.png'
import login from '../../assets/images/img/login.png'
import { Container, Row, Col, Form, Button, Feedback, FormControl } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { BASE_URL } from "../../Constant/Index";
import axios from 'axios'

function Partners() {
    
    const [step, setStep] = useState(1);
    const navigate = useNavigate();
    const [partnerData, setpartnerData] = useState({});
    const [zoneList, setZoneList] = useState([]);
    const [errors, setErrors] = useState({
        s_name: '',
        gst: '',
        address: '',
        cover_photo: '',
        logo: '',
        zone_id: '',
        latitude: '',
    });

    const shopNameRegex = /^[a-zA-Z ]*$/; // Allows only letters and spaces /^[A-Za-z\s]+$/
    const gstRegex = /^\d{15}$/ // GST format (15 digits)   /^\d{15}$/
    const addressRegex = /^[A-Za-z0-9\s,.#-]+$/; // Allows letters, numbers, spaces, and common address characters

    const validateStep = () => {
        const newErrors = {
            s_name: '',
            gst: '',
            address: '',
            cover_photo: '',  // Add error field for cover photo
            logo: '',         // Add error field for partners logo
            zone_id: '',      // Add error field for zone
            latitude: '',     // Add error field for latitude
        };

        let isValid = true;
       
        if (step === 1) {
            // if (!partnerData.s_name) {
            //     newErrors.s_name = 'Shop Name is required';
            //     isValid = false;
            // }
            if (!partnerData.s_name) {
                newErrors.s_name = 'Shop Name is required';
                isValid = false;
            } 
            /*else if (!shopNameRegex.test(partnerData.s_name)) {
                newErrors.s_name = 'Invalid Shop Name';
                isValid = false;
            }*/
            // if (!partnerData.gst) {
            //     newErrors.gst = 'GST Number is required';
            //     isValid = false;
            // }
            if (!partnerData.gst) {
                newErrors.gst = 'GST Number is required';
                isValid = false;
            } /*else if (!gstRegex.test(partnerData.gst)) {
                newErrors.gst = 'Invalid GST Number';
                isValid = false;
            }*/
            // if (!partnerData.address) {
            //     newErrors.address = 'Shop Address is required';
            //     isValid = false;
            // }
            if (!partnerData.address) {
                newErrors.address = 'Shop Address is required';
                isValid = false;
            } /*else if (!addressRegex.test(partnerData.address)) {
                newErrors.address = 'Invalid Shop Address';
                isValid = false;
            }*/
            if (!partnerData.cover_photo) {
                newErrors.cover_photo = 'Cover Photo is required';
                isValid = false;
            }
            if (!partnerData.logo) {
                newErrors.logo = 'Partners Logo is required';
                isValid = false;
            }
            if (!partnerData.zone_id) {
                newErrors.zone_id = 'Zone is required';
                isValid = false;
            }
            if (!partnerData.latitude) {
                newErrors.latitude = 'Latitude is required';
                isValid = false;
            }
        }
        else if (step === 2) {

        }
        else if (step === 3) {

        }

        setErrors(newErrors);
        return isValid;
    };

    const handleNext = () => {
        if (validateStep()) {
            setStep(step + 1);
            // Clear the error message for the current step
            const newErrors = { ...errors };
            if (step === 1) {
                newErrors['s_name'] = '';
            }
            setErrors(newErrors);
        }
    };


    const nextStep = () => {
        if (validateStep()) {
            setStep((prevStep) => prevStep + 1);
            // Clear the error message for the current step
            const newErrors = { ...errors };
            if (step === 1) {
                newErrors['s_name'] = '';
            }
            setErrors(newErrors);
        }
    };

    const prevStep = () => {
        setStep((prevStep) => prevStep - 1);
        // Clear the error message for the current step
        const newErrors = { ...errors };
        if (step === 1) {
            newErrors['s_name'] = '';
        }
        setErrors(newErrors);
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
                console.log('error in zone list', error);
            });
    };

    const handleOnChange = (e) => {
        
        setpartnerData({
            ...partnerData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append("s_name", partnerData.s_name);
        formData.append("gst", partnerData.gst);
        formData.append("address", partnerData.address);
        formData.append("cover_photo", partnerData.cover_photo);
        formData.append("logo", partnerData.logo);
        formData.append("zone_id", partnerData.zone_id);
        formData.append("latitude", partnerData.latitude);
        formData.append("longitude", partnerData.longitude);
        formData.append("f_name", partnerData.f_name);
        formData.append("l_name", partnerData.l_name);
        formData.append("phone", partnerData.phone);
        formData.append("email", partnerData.email);
        formData.append("password", partnerData.password);

        try {
            const response = await axios.post(`${BASE_URL}/auth/register`, formData);
            // Check if the response is successful and navigate to the dashboard
            if (response.status === 200) {
                navigate("/partner-dashboard");
            } else {
                console.log("Registration failed.");
            }
        } catch (error) {
            console.error("Error in form submission", error);
        }
    };


    const imageUploadHandler = (e) => {
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
                                                        <Form.Control
                                                         type="text" 
                                                         placeholder="Shop Name" 
                                                         name="s_name" 
                                                        //  onChange={
                                                        //     (e) => {handleOnChange(e)
                                                        //         const newErrors={...errors}
                                                        //         const isValid = true;
                                                        //     if (!shopNameRegex.test(partnerData.s_name)) {
                                                        //         newErrors.s_name = 'Invalid Shop Name';
                                                        //         isValid = false;
                                                        //     }}
                                                        // } 
                                                        onChange={(e) => {
                                                            handleOnChange(e);
                                                            const newErrors = { ...errors };
                                                            let isValid = true;
                                                    
                                                            if (!e.target.value) {
                                                                // If the input field is empty, clear the error message
                                                                newErrors.s_name = '';
                                                            } else if (!shopNameRegex.test(e.target.value)) {
                                                                newErrors.s_name = 'Invalid Shop Name';
                                                                isValid = false;
                                                            }
                                                            
                                                            setErrors(newErrors); // Update errors state within the onChange function
                                                        }} 
                                                         isInvalid={!!errors.s_name} />
                                                        {/* {errors.s_name && <p>{errors.s_name}</p>} */}
                                                        <FormControl.Feedback type="invalid">
                                                            {errors.s_name}
                                                        </FormControl.Feedback>
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" controlId="formGroupEmail">
                                                        <Form.Label>GST Number</Form.Label>
                                                        <Form.Control 
                                                        type="tel" 
                                                        placeholder="GST number" 
                                                        name="gst" 
                                                        onChange={(e) => {
                                                            handleOnChange(e);
                                                            const newErrors = { ...errors };
                                                            let isValid = true;
                                                    
                                                            if (!e.target.value) {
                                                                // If the input field is empty, clear the error message
                                                                newErrors.gst = '';
                                                            } else if (!gstRegex.test(e.target.value)) {
                                                                newErrors.gst = 'Invalid GST Number';
                                                                isValid = false;
                                                            }
                                                            
                                                            setErrors(newErrors); // Update errors state within the onChange function
                                                        }} 
                                                        isInvalid={!!errors.gst} />
                                                        <FormControl.Feedback type="invalid">
                                                            {errors.gst}
                                                        </FormControl.Feedback>
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" controlId="formGroupEmail">
                                                        <Form.Label>Shop Address</Form.Label>
                                                        <Form.Control 
                                                        type="text" 
                                                        placeholder="Shop Address" 
                                                        name="address" 
                                                        onChange={(e) => {
                                                            handleOnChange(e);
                                                            const newErrors = { ...errors };
                                                            let isValid = true;
                                                    
                                                            if (!e.target.value) {
                                                                // If the input field is empty, clear the error message
                                                                newErrors.address = '';
                                                            } else if (!addressRegex.test(e.target.value)) {
                                                                newErrors.address = 'Invalid Shop Name';
                                                                isValid = false;
                                                            }
                                                            
                                                            setErrors(newErrors); // Update errors state within the onChange function
                                                        }}
                                                        isInvalid={!!errors.address} />
                                                        {/* {errors.address && <p>{errors.address}</p>} */}
                                                        <FormControl.Feedback type="invalid">
                                                            {errors.address}
                                                        </FormControl.Feedback>
                                                    </Form.Group>
                                                    <Row className="mb-3">
                                                        <Form.Group as={Col}>
                                                            <Form.Label>Upload Cover Photo (Ratio 2:1)</Form.Label>
                                                            <Form.Control type="file" name="cover_photo"
                                                                onChange={(e) => imageUploadHandler(e)} isInvalid={!!errors.cover_photo} />
                                                        </Form.Group>
                                                        {/* {errors.cover_photo && <p className="error-message">{errors.cover_photo}</p>} */}
                                                        <FormControl.Feedback type="invalid">
                                                            {errors.cover_photo}
                                                        </FormControl.Feedback>
                                                        <Form.Group as={Col}>
                                                            <Form.Label>Partners Logo ( Ratio 1:1 )</Form.Label>
                                                            <Form.Control type="file" name="logo"
                                                                onChange={(e) => imageUploadHandler(e)} isInvalid={!!errors.logo} />
                                                        </Form.Group>
                                                        {/* {errors.logo && <p className="error-message">{errors.logo}</p>} */}
                                                        <FormControl.Feedback type="invalid">
                                                            {errors.logo}
                                                        </FormControl.Feedback>
                                                    </Row>
                                                    <Row className="mb-3">
                                                        <Form.Group as={Col}>
                                                            <Form.Label>Zone</Form.Label>
                                                            <Form.Select
                                                                defaultValue="Select Zone"
                                                                name="zone_id"
                                                                onChange={(e) => handleOnChange(e)}
                                                                isInvalid={!!errors.zone_id}
                                                            >
                                                                <option value={""}>Select Zone</option>
                                                                {zoneList.map((zonedata) => (
                                                                    <option value={zonedata.id}>{zonedata.name}</option>
                                                                ))}
                                                            </Form.Select>
                                                            {/* {errors.zone_id && <p className="error-message">{errors.zone_id}</p>} */}
                                                            <FormControl.Feedback type="invalid">
                                                                {errors.zone_id}
                                                            </FormControl.Feedback>
                                                        </Form.Group>
                                                    </Row>
                                                    <Row className="mb-3">
                                                        <Form.Group as={Col} controlId="formGridState">
                                                            <Form.Label>Latitude</Form.Label>
                                                            <Form.Control type="number" placeholder="Ex: -94.22213" name="latitude" onChange={(e) => handleOnChange(e)} isInvalid={!!errors.latitude} />
                                                            {/* {errors.latitude && <p className="error-message">{errors.latitude}</p>} */}
                                                            <FormControl.Feedback type="invalid">
                                                                {errors.latitude}
                                                            </FormControl.Feedback>
                                                        </Form.Group>
                                                        <Form.Group as={Col} controlId="formGridCity">
                                                            <Form.Label>Longitude </Form.Label>
                                                            <Form.Control type="number" placeholder="Ex: 103.344322" name="longitude" onChange={(e) => handleOnChange(e)} isInvalid={!!errors.latitude} />
                                                            {/* {errors.latitude && <p className="error-message">{errors.latitude}</p>} */}
                                                            <FormControl.Feedback type="invalid">
                                                                {errors.latitude}
                                                            </FormControl.Feedback>
                                                        </Form.Group>
                                                    </Row>
                                                    <div className="mainForm-btn">
                                                        <Button onClick={handleNext}>Next</Button>
                                                    </div>
                                                </div>
                                            )}
                                            {step === 2 && (
                                                <div className='multi-form'>
                                                    <h4><i className="fa fa-user" />  Owner Information</h4>
                                                    <Form.Group className="mb-3" controlId="formGroupEmail">
                                                        <Form.Label>First Name</Form.Label>
                                                        <Form.Control type="text" placeholder="First Name" name="f_name" onChange={(e) => handleOnChange(e)} />
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" controlId="formGroupEmail">
                                                        <Form.Label>Last Name</Form.Label>
                                                        <Form.Control type="text" placeholder="Last Name" name="l_name" onChange={(e) => handleOnChange(e)} />
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" controlId="formGroupEmail">
                                                        <Form.Label>Phone</Form.Label>
                                                        <Form.Control type="number" placeholder="Ex:007*****" name="phone" onChange={(e) => handleOnChange(e)} />
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
                                                        <Form.Control type="email" placeholder="email" name="email" onChange={(e) => handleOnChange(e)} />
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" controlId="formGroupEmail">
                                                        <Form.Label>Password</Form.Label>
                                                        <Form.Control type="password" placeholder="password" name="password" onChange={(e) => handleOnChange(e)} />
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