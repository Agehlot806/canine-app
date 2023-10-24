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
  const [shopNameStored, setShopNameStored] = useState("");
  const [zoneIdstored, setZoneIdstored] = useState("");
  const [gstNumberStored, setGstNumberStored] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const [isFormValid, setIsFormValid] = useState(false);
  // STEP 1 Handle Form Data start
  const handleZoneIdChange = (event) => {
    setZoneIdstored(event.target.value);
  };
  const handleNameStoredChange = (event) => {
    setShopNameStored(event.target.value);
  };
  const handleGstNumberChange = (event) => {
    setGstNumberStored(event.target.value);
  };
  // STEP 1 Handle Form Data end
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  // STEP 2 Handle Form Data start
  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };
  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };
  const handlePhoneNumChange = (event) => {
    setPhoneNum(event.target.value);
  };

  // STEP 2 Handle Form Data end
  const [emailStored, setEmailStored] = useState("");
  const [passwordStored, setPasswordStored] = useState("");
  // STEP 3 Handle Form Data Start
  const handleEmailChange = (event) => {
    setEmailStored(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPasswordStored(event.target.value);
  };
  // STEP 3 Handle Form Data end

  //   const validateFields = () => {
  //     const isValid =
  //       nameValid(partnerData.s_name) && gstNumberValid(partnerData.gst);
  //     //   addressValid(partnerData.address) &&
  //     //   partnerData.cover_photo !== null &&
  //     //   partnerData.logo !== null &&
  //     //   partnerData.zone_id !== "";

  //     setIsFormValid(isValid);
  //   };

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

  //   const gstRegex = /\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}/;

  //   const gstNumberValid = (gstNumber) => {
  //     return (
  //       /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][A-Z0-9]Z[A-Z0-9]$/.test(gstNumber) &&
  //       gstNumber.length <= 15
  //     );
  //   };

  const searchoptions = {
    types: ["(regions)"],
    componentRestrictions: { country: "in" },
  };
  const handleChange = (newAddress) => {
    setAddress(newAddress);
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
  const nextStep = () => {
    // if (isFormValid) {

    setStep((prevStep) => prevStep + 1);
    // }
  };

  const prevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  //   const nextStep = () => {
  //     setStep((prevStep) => prevStep + 1);
  //   };

  //   // Function to move to the previous step
  //   const prevStep = () => {
  //     setStep((prevStep) => prevStep - 1);
  //   };

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
  //   const handleInputChange = (event) => {
  //     const { name, value, type } = event.target;
  //     setFormData({
  //       ...formData,
  //       [name]: type === 'file' ? event.target.files[0] : value,
  //     });
  //   }
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
    // }
  };

  //   const imageuploadhandler = (e) => {
  //     setpartnerData({
  //       ...partnerData,
  //       [e.target.name]: e.target.files[0],
  //     });
  //     validateFields();
  //   };
  //   const [coverPhotoError, setCoverPhotoError] = useState(false);
  //   const [logoError, setLogoError] = useState(false);
  //     const [zoneError, setZoneError] = useState(false);
  const [coverPhotoStored, setCoverPhotoStored] = useState(null);
  const [selectedImageCover, setSelectedImageCover] = useState(null);
  const [disableInputCover, setDisableInputCover] = useState(false);

  const [logoPhotoStored, setLogoPhotoStored] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [disableInput, setDisableInput] = useState(false);
  const handleCoverImageChange = (event) => {
    const coverfile = event.target.files[0];
    setCoverPhotoStored(event.target.files[0]);
    if (coverfile) {
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
  };
  const handleRemoveImageCover = () => {
    setSelectedImageCover(null);
    setDisableInputCover(false);
  };
  const handleRemoveImage = () => {
    setSelectedImage(null);
    setDisableInput(false);
  };
  // const halderimage = (e) => {
  //     // setimgage(e.target.files[0])
  //     const file = e.target.files[0];
  //     setimgage(file); // Store the file directly

  //     // Create a preview URL for the selected image
  //     setSelectedImage(URL.createObjectURL(file));
  //   };
  //   const handleImageUpload = (e) => {
  //     const fieldName = e.target.name;
  //     if (!e.target.files.length) {
  //       if (fieldName === "cover_photo") {
  //         setCoverPhotoError(true);
  //       } else if (fieldName === "logo") {
  //         setLogoError(true);
  //       }
  //     } else {
  //       // File selected, no error
  //       if (fieldName === "cover_photo") {
  //         setCoverPhotoError(false);
  //       } else if (fieldName === "logo") {
  //         setLogoError(false);
  //       }
  //     }
  //   };

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
                            />
                            {/* {!nameValid(partnerData.s_name) && (
                              <span className="error-text">
                                {partnerData.s_name?.length > 15
                                  ? "Shop Name can be up to 15 characters"
                                  : "Invalid Shop Name"}
                              </span>
                            )} */}
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

                            {/* {!gstNumberValid(partnerData.gst) && (
                              <span className="error-text">
                                {partnerData.gst?.length > 15
                                  ? "GST Number can be up to 15 characters and digits"
                                  : "Invalid GST Number"}
                              </span>
                            )} */}
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
                              {/* <Form.Control
                                type="file"
                                name="cover_photo"
                                // onChange={(e) => handleImageUpload(e)}
                                onChange={handleCoverImageChange}
                                // value={coverPhotoStored}
                              /> */}
                              {/* {coverPhotoError && (
                                <span className="error-text">
                                  Cover Photo is required
                                </span>
                              )} */}
                            </Form.Group>
                            <Form.Group as={Col}>
                              <Form.Label>
                                Partners Logo ( Ratio 1:1 )
                              </Form.Label>
                              {/* <Form.Control
                                type="file"
                                name="logo"
                                // onChange={(e) => handleImageUpload(e)}
                                onChange={handleLogoImageChange}
                                disabled={disableInput}
                                // value={logoPhotoStored}
                              /> */}
                              {/* {logoError && (
                                <span className="error-text">
                                  Partners Logo is required
                                </span>
                              )} */}
                              {/* {selectedImage && (
                                <div>
                                  <img
                                    src={selectedImage}
                                    alt="Image"
                                    style={{ width: "100px", height: "100px" }}
                                  />
                                  <button onClick={handleRemoveImage}>
                                    Remove Image
                                  </button>
                                </div>
                              )}
                            </Form.Group> */}
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
                              {/* {zoneError && (
                                <span className="error-text">
                                  Zone is required
                                </span>
                              )} */}
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
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Last Name"
                              name="l_name"
                              //   onChange={(e) => handleOnChange(e)}
                              onChange={handleLastNameChange}
                              value={lastName}
                            />
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
                            />
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
                          </Form.Group>
                          <Form.Group
                            className="mb-3"
                            controlId="formGroupEmail"
                          >
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                              type="password"
                              placeholder="password"
                              name="password"
                              //   onChange={(e) => handleOnChange(e)}
                              onChange={handlePasswordChange}
                              value={passwordStored}
                            />
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
