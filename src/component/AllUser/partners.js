import React, { useEffect, useState } from "react";
import logo from "../../assets/images/logo.png";
import login from "../../assets/images/img/login.png";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../Constant/Index";
import axios from "axios";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

function Partners() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [zoneList, setZoneList] = useState([]);
  const [address, setAddress] = useState("");
  const [addressError, setAddressError] = useState("");
  const [shopNameStored, setShopNameStored] = useState("");
  const [zoneIdstored, setZoneIdstored] = useState("");
  const [gstNumberStored, setGstNumberStored] = useState("");
  const [zoneError, setZoneError] = useState("");
  const [gstError, setGstError] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const [isFormValid, setIsFormValid] = useState(false);
  // STEP 1 Handle Form Data start
  const handleZoneIdChange = (event) => {
    //   setZoneIdstored(event.target.value);
    const zoneId = event.target.value;
    setZoneIdstored(zoneId);
    if (!zoneId) {
      setZoneError("Zone is required");
    } else {
      setZoneError("");
    }
  };
  const handleNameStoredChange = (event) => {
    const shopName = event.target.value;
    setShopNameStored(shopName);
    // if (event.target.value.trim() === "") {
    //   setShopNameError("Shop name is required");
    // } else {
    //   setShopNameError("");
    // }
    // Define the regex pattern
    if (shopName.length <= 15) {
      setShopNameStored(shopName);
    }
    const shopNameRegex = /^[A-Za-z\s]{1,15}$/;

    // Validate shop name against the pattern
    if (shopName.trim() === "") {
      setShopNameError("Shop name is required");
    } else if (!shopNameRegex.test(shopName)) {
      setShopNameError(
        "Shop name can only contain alphabetic characters and spaces, up to 15 characters"
      );
    } else {
      setShopNameError("");
    }
  };
  const handleGstNumberChange = (event) => {
    const gstNumber = event.target.value;
    setGstNumberStored(gstNumber);
    // if (event.target.value.trim() === "") {
    //   setGstError("GST is required");
    // } else {
    //   setGstError("");
    // }
    // Define the GST regex pattern
    const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][A-Z0-9]Z[A-Z0-9]$/;

    // Validate GST number against the pattern
    if (gstNumber.trim() === "") {
      setGstError("GST is required");
    } else if (gstNumber.length > 15) {
      setGstError("GST number must not exceed 15 characters");
    } else if (!gstRegex.test(gstNumber)) {
      setGstError("Invalid GST format");
    } else {
      setGstError("");
    }
  };
  // STEP 1 Handle Form Data end
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  // error
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [phoneNumError, setPhoneNumError] = useState("");
  // STEP 2 Handle Form Data start
  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
    if (event.target.value.trim() === "") {
      setFirstNameError("First name is required");
    } else {
      setFirstNameError("");
    }
  };
  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
    if (event.target.value.trim() === "") {
      setLastNameError("Last name is required");
    } else {
      setLastNameError("");
    }
  };
  const handlePhoneNumChange = (event) => {
    setPhoneNum(event.target.value);
    if (event.target.value.trim() === "") {
      setPhoneNumError("Phone number is required");
    } else {
      setPhoneNumError("");
    }
  };

  // STEP 2 Handle Form Data end
  const [emailStored, setEmailStored] = useState("");
  const [passwordStored, setPasswordStored] = useState("");
  // error
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  // STEP 3 Handle Form Data Start
  const handleEmailChange = (event) => {
    setEmailStored(event.target.value);
    if (
      event.target.value.trim() === "" ||
      !/^\S+@\S+\.\S+$/.test(event.target.value)
    ) {
      setEmailError("Email is not valid");
    } else {
      setEmailError("");
    }
  };
  const handlePasswordChange = (event) => {
    setPasswordStored(event.target.value);
    if (event.target.value.trim() === "") {
      setPasswordError("Password is required");
    } else {
      setPasswordError("");
    }
  };

  const nameValid = (name) => {
    if (name?.length <= 15 && /^[a-zA-Z\s]*$/.test(name)) {
      return true;
    } else {
      return false;
    }
  };

  const gstNumberValid = (gstNumber) => {
    if (
      gstNumber?.length <= 15 &&
      /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][A-Z0-9]Z[A-Z0-9]$/.test(gstNumber)
    ) {
      return true;
    } else {
      return false;
    }
  };

  const addressValid = (address) => {
    if (address?.length <= 15 && /^[a-zA-Z\s]*$/.test(address)) {
      return true;
    } else {
      return false;
    }
  };

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!shopNameStored.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Email is not valid";
    }

    setErrors(newErrors);

    // If there are no errors, you can submit the form
    if (Object.keys(newErrors).length === 0) {
      // Submit the form or perform other actions
    }
  };
  const searchoptions = {
    types: ["(regions)"],
    componentRestrictions: { country: "in" },
  };
  const handleChange = (newAddress) => {
    setAddress(newAddress);
    if (newAddress.trim() === "") {
      setAddressError("Shop Address is required");
    } else {
      setAddressError("");
    }
  };
  const handleSelect = (selectedAddress) => {
    geocodeByAddress(selectedAddress)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        console.log("Success", latLng);
        setAddress(selectedAddress);
        setLatitude(latLng.lat);
        setLongitude(latLng.lng);
        // Update the location state with latitude and longitude
        // setpartnerData({
        //   address: selectedAddress,
        //   latitude: latLng.lat,
        //   longitude: latLng.lng,
        // });
        // validateFields();
      })
      .catch((error) => console.error("Error", error));
  };
  const [shopNameError, setShopNameError] = useState("");
  const nextStep = () => {
    // if (isFormValid) {
    let hasErrors = false; // Flag to track whether there are validation errors
    //   if (emailStored.trim() === "" || !/^\S+@\S+\.\S+$/.test(emailStored)) {
    //     setEmailError("Email is not valid");
    //     hasErrors = true;
    //   } else {
    //     setEmailError("");
    //   }
    if (shopNameStored.trim() === "") {
      setShopNameError("Shop Name is required");
      hasErrors = true;
    } else {
      setShopNameError("");
    }
    if (gstNumberStored.trim() === "") {
      setGstError("GST is required");
      hasErrors = true;
    } else {
      setGstError("");
    }
    if (address.trim() === "") {
      setAddressError("Shop Address is required");
      hasErrors = true;
    } else {
      setAddressError("");
    }
    // Validate Cover Photo
    if (!coverPhotoStored) {
      setCoverPhotoError("Cover Photo is required");
      hasErrors = true;
    } else {
      setCoverPhotoError(""); // Clear the error if valid
    }

    // Validate Logo Photo
    if (!logoPhotoStored) {
      setLogoPhotoError("Logo Photo is required");
      hasErrors = true;
    } else {
      setLogoPhotoError(""); // Clear the error if valid
    }

    // Validate Zone ID
    if (!zoneIdstored) {
      setZoneError("Zone is required");
      hasErrors = true;
    } else {
      setZoneError(""); // Clear the error if valid
    }
    if (!hasErrors) {
      setStep((prevStep) => prevStep + 1);
    }
    //   ********************************
    if (firstName.trim() === "") {
      setFirstNameError("First name is required");
      hasErrors = true;
    } else {
      setFirstNameError("");
    }
    if (lastName.trim() === "") {
      setLastNameError("Last name is required");
      hasErrors = true;
    } else {
      setLastNameError("");
    }
    if (phoneNum.trim() === "") {
      setPhoneNumError("Phone Number is required");
      hasErrors = true;
    } else {
      setPhoneNumError("");
    }
  };
  const nextStepTwo = () => {
    let hasErrors = false; // Flag to track whether there are validation errors

    if (firstName.trim() === "") {
      setFirstNameError("First name is required");
      hasErrors = true;
    } else {
      setFirstNameError("");
    }
    if (lastName.trim() === "") {
      setLastNameError("Last name is required");
      hasErrors = true;
    } else {
      setLastNameError("");
    }
    if (phoneNum.trim() === "") {
      setPhoneNumError("Phone Number is required");
      hasErrors = true;
    } else {
      setPhoneNumError("");
    }
    if (!hasErrors) {
      setStep((prevStep) => prevStep + 1);
    }
  };

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
    const { name, value } = e.target;
    setpartnerData({
      ...partnerData,
      //   [e.target.name]: e.target.value,
      [name]: value,
    });
    // validateFields();
  };

  // post data
  const handleSubmit = async (e) => {
    // if (!handleValid()) {
    e.preventDefault();
    let hasErrors = false; // Flag to track whether there are validation errors

    if (emailStored.trim() === "" || !/^\S+@\S+\.\S+$/.test(emailStored)) {
      setEmailError("Email is not valid");
      hasErrors = true;
    } else {
      setEmailError("");
    }

    if (passwordStored.trim() === "") {
      setPasswordError("Password is required");
      hasErrors = true;
    } else {
      setPasswordError("");
    }

    if (!hasErrors) {
      let formData = new FormData();
      formData.append("f_name", firstName);
      formData.append("l_name", lastName);
      formData.append("email", emailStored);
      formData.append("s_name", shopNameStored);
      formData.append("zone_id", zoneIdstored);
      formData.append("address", address);
      formData.append("latitude", latitude);
      formData.append("longitude", longitude);
      formData.append("cover_photo", coverPhotoStored);
      formData.append("phone", phoneNum);
      formData.append("password", passwordStored);
      formData.append("logo", logoPhotoStored);
      // formData.append("zone_id", partnerData.zone_id);
      formData.append("gst", gstNumberStored);

      await axios
        .post(`${BASE_URL}/auth/register`, formData)
        .then((res) => {
          // toast.success("Application placed successfully");
          navigate("/partner-dashboad");
        })
        .catch((error) => {
          console.log("error in submit", error);
        });
    }
  };

  const [coverPhotoStored, setCoverPhotoStored] = useState(null);
  const [coverPhotoError, setCoverPhotoError] = useState(null);
  const [selectedImageCover, setSelectedImageCover] = useState(null);
  const [disableInputCover, setDisableInputCover] = useState(false);

  const [logoPhotoStored, setLogoPhotoStored] = useState(null);
  const [logoPhotoError, setLogoPhotoError] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [disableInput, setDisableInput] = useState(false);
  const handleCoverImageChange = (event) => {
    const coverfile = event.target.files[0];
    setCoverPhotoStored(event.target.files[0]);
    if (coverfile) {
      setSelectedImageCover(URL.createObjectURL(coverfile));
      setDisableInputCover(true);
    }
    if (!coverfile) {
      setCoverPhotoError("Cover Photo is required");
    } else {
      setCoverPhotoError("");
      setSelectedImageCover(URL.createObjectURL(coverfile));
      setDisableInputCover(true);
    }
  };
  const handleLogoImageChange = (event) => {
    const file = event.target.files[0];
    setLogoPhotoStored(file);
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setDisableInput(true);
    }
    if (!file) {
      setLogoPhotoError("Logo Photo is required");
    } else {
      setLogoPhotoError("");
      setSelectedImage(URL.createObjectURL(file));
      setDisableInput(true);
    }
  };
  const handleRemoveImageCover = () => {
    setSelectedImageCover(null);
    setDisableInputCover(false);
  };
  const handleRemoveImage = () => {
    setSelectedImage(null);
    setDisableInput(false);
  };

  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <>
      <div className="users-bg">
        <Container>
          <div className="text-center">
            <img src={logo} />
          </div>
          <section className="section-padding">
            <div>
              <Row>
                <Col lg={7}>
                  <div className="form-area">
                    <h1 className="main-head">Partners Application</h1>
                    <p>
                      Enter your mobile number to Sign up/Sign in to your logo
                      account
                    </p>
                    <Form>
                      {step === 1 && (
                        <div className="multi-form">
                          <h4>
                            <i className="fa fa-home" /> Partners Information
                          </h4>
                          <Form.Group
                            className="mb-3"
                            controlId="formGroupEmail"
                          >
                            <Form.Label>Shop Name</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Shop Name"
                              name="s_name"
                              value={shopNameStored}
                              onChange={handleNameStoredChange}
                            />{" "}
                            {shopNameError && (
                              <div className="error">{shopNameError}</div>
                            )}
                          </Form.Group>
                          <Form.Group
                            className="mb-3"
                            controlId="formGroupEmail"
                          >
                            <Form.Label>GST Number</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="GST number"
                              name="gst"
                              //   value={partnerData.gst}
                              //   onChange={(e) => handleOnChange(e)}
                              value={gstNumberStored}
                              onChange={handleGstNumberChange}
                            />
                            {gstError && (
                              <div className="error">{gstError}</div>
                            )}
                          </Form.Group>
                          <Form.Group
                            className="mb-3"
                            controlId="formGroupEmail"
                          >
                            <Form.Label>Shop Address</Form.Label>
                            <PlacesAutocomplete
                              value={address}
                              onChange={handleChange}
                              searchOptions={searchoptions}
                              onSelect={handleSelect}
                            >
                              {({
                                getInputProps,
                                suggestions,
                                getSuggestionItemProps,
                                loading,
                              }) => (
                                <div>
                                  <input
                                    {...getInputProps({
                                      placeholder: "Search Places ...",
                                      className: "form-control",
                                    })}
                                  />
                                  <div className="autocomplete-dropdown-container">
                                    {loading && <div>Loading...</div>}
                                    {suggestions.map((suggestion) => {
                                      const className = suggestion.active
                                        ? "suggestion-item--active"
                                        : "suggestion-item";
                                      // inline style for demonstration purpose
                                      const style = suggestion.active
                                        ? {
                                          backgroundColor: "#fafafa",
                                          cursor: "pointer",
                                        }
                                        : {
                                          backgroundColor: "#ffffff",
                                          cursor: "pointer",
                                        };
                                      return (
                                        <div
                                          {...getSuggestionItemProps(
                                            suggestion,
                                            {
                                              className,
                                              style,
                                            }
                                          )}
                                        >
                                          <span>{suggestion.description}</span>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              )}
                            </PlacesAutocomplete>
                            {addressError && (
                              <div className="error">{addressError}</div>
                            )}
                          </Form.Group>
                          <Row className="mb-3">
                            <Form.Group as={Col}>
                              <Form.Label>
                                Upload Cover Photo (Ratio 2:1)
                              </Form.Label>
                              {selectedImageCover ? (
                                <div>
                                  <img
                                    src={selectedImageCover}
                                    alt="Image"
                                    style={{ width: "100px", height: "100px" }}
                                  />
                                  <button
                                    class="RemoveImg-button"
                                    // style={{ fontSize: 48, color: red }}
                                    onClick={handleRemoveImageCover}
                                  >
                                    X
                                  </button>
                                </div>
                              ) : (
                                <Form.Control
                                  type="file"
                                  name="logo"
                                  onChange={handleCoverImageChange}
                                  disabled={disableInputCover}
                                />
                              )}
                              {coverPhotoError && (
                                <div className="error">{coverPhotoError}</div>
                              )}
                            </Form.Group>
                            <Form.Group as={Col}>
                              <Form.Label>
                                Partners Logo ( Ratio 1:1 )
                              </Form.Label>
                              {selectedImage ? (
                                <div>
                                  <img
                                    src={selectedImage}
                                    alt="Image"
                                    style={{ width: "100px", height: "100px" }}
                                  />
                                  <button
                                    class="RemoveImg-button"
                                    onClick={handleRemoveImage}
                                  >
                                    X
                                  </button>
                                </div>
                              ) : (
                                <Form.Control
                                  type="file"
                                  name="logo"
                                  onChange={handleLogoImageChange}
                                  disabled={disableInput}
                                />
                              )}
                              {logoPhotoError && (
                                <div className="error">{logoPhotoError}</div>
                              )}
                            </Form.Group>
                          </Row>
                          <Row className="mb-3">
                            <Form.Group as={Col}>
                              <Form.Label>Zone</Form.Label>
                              <Form.Select
                                defaultValue=""
                                name="zone_id"
                                // onChange={(e) => handleZoneChange(e)}
                                value={zoneIdstored}
                                onChange={handleZoneIdChange}
                              >
                                <option value="" disabled>
                                  Select Zone
                                </option>
                                {zoneList.map((zonedata) => (
                                  <option key={zonedata.id} value={zonedata.id}>
                                    {zonedata.name}
                                  </option>
                                ))}
                              </Form.Select>
                              {zoneError && (
                                <div className="error">{zoneError}</div>
                              )}
                            </Form.Group>
                          </Row>
                          <div className="mainForm-btn">
                            <Button
                              onClick={nextStep}
                            //   disabled={!isFormValid}
                            >
                              Next
                            </Button>
                          </div>
                        </div>
                      )}
                      {step === 2 && (
                        <div className="multi-form">
                          <h4>
                            <i className="fa fa-user" /> Owner Information
                          </h4>
                          <Form.Group
                            className="mb-3"
                            controlId="formGroupEmail"
                          >
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="First Name"
                              name="f_name"
                              //   onChange={(e) => handleOnChange(e)}
                              onChange={handleFirstNameChange}
                              value={firstName}
                            />
                          </Form.Group>
                          <Form.Group
                            className="mb-3"
                            controlId="formGroupEmail"
                          >
                            {" "}
                            {firstNameError && (
                              <div className="error">{firstNameError}</div>
                            )}
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Last Name"
                              name="l_name"
                              //   onChange={(e) => handleOnChange(e)}
                              onChange={handleLastNameChange}
                              value={lastName}
                            />{" "}
                            {lastNameError && (
                              <div className="error">{lastNameError}</div>
                            )}
                          </Form.Group>
                          <Form.Group
                            className="mb-3"
                            controlId="formGroupEmail"
                          >
                            <Form.Label>Phone</Form.Label>
                            <Form.Control
                              type="number"
                              placeholder="Ex:007*****"
                              name="phone"
                              //   onChange={(e) => handleOnChange(e)}
                              onChange={handlePhoneNumChange}
                              value={phoneNum}
                            />{" "}
                            {phoneNumError && (
                              <div className="error">{phoneNumError}</div>
                            )}
                          </Form.Group>
                          <div className="mainForm-btn">
                            <Button
                              style={{ width: "180px", margin: "4px" }}
                              onClick={prevStep}
                            >
                              Previous
                            </Button>
                            <Button onClick={nextStepTwo}>Next</Button>
                          </div>
                        </div>
                      )}
                      {step === 3 && (
                        <div className="multi-form">
                          <h4>
                            <i className="fa fa-user-circle" /> Login
                            Information
                          </h4>
                          <Form.Group
                            className="mb-3"
                            controlId="formGroupEmail"
                          >
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                              type="email"
                              placeholder="email"
                              name="email"
                              //   onChange={(e) => handleOnChange(e)}
                              onChange={handleEmailChange}
                              value={emailStored}
                            />
                            {emailError && (
                              <div className="error">{emailError}</div>
                            )}
                          </Form.Group>
                          <Form.Group
                            className="mb-3"
                            controlId="formGroupEmail"
                          >
                            <Form.Label>Password</Form.Label>
                            <div className="form-area eyeicon">
                              <Form.Control
                                type={showPassword ? "text" : "password"}
                                placeholder="password"
                                name="password"
                                //   onChange={(e) => handleOnChange(e)}
                                onChange={handlePasswordChange}
                                value={passwordStored}
                              />
                              <button
                                type="button"
                                // className="btn btn-secondary"
                                style={{
                                  border: "none",
                                  borderRadius: "37.75px",
                                  height: "55px",
                                }}
                                onClick={togglePassword}
                              >
                                <i
                                  className={`fa ${showPassword ? "fa-eye" : "fa-eye-slash"
                                    }`}
                                  aria-hidden="true"
                                />
                              </button>
                            </div>
                            {" "}
                            {passwordError && (
                              <div className="error">{passwordError}</div>
                            )}
                          </Form.Group>
                          <div className="mainForm-btn">
                            <Button
                              style={{ width: "180px", margin: "4px" }}
                              onClick={prevStep}
                            >
                              Previous
                            </Button>
                            <Button
                              type="submit"
                              onClick={(e) => handleSubmit(e)}
                            >
                              Submit
                            </Button>
                          </div>
                        </div>
                      )}
                    </Form>
                  </div>
                </Col>
                <Col lg={5}>
                  <div className="login-img">
                    <img src={login} />
                  </div>
                </Col>
              </Row>
            </div>
          </section>
        </Container>
      </div>
    </>
  );
}

export default Partners;
