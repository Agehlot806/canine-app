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
  const [partnerData, setpartnerData] = useState({
    s_name: "",
    gst: "",
    address: "",
    cover_photo: null,
    logo: null,
    zone_id: "",
  });
  const [zoneList, setZoneList] = useState([]);
  const [address, setAddress] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  const validateFields = () => {
    const isValid =
      nameValid(partnerData.s_name) &&
      gstNumberValid(partnerData.gst) &&
      addressValid(partnerData.address) &&
      partnerData.cover_photo !== null &&
      partnerData.logo !== null &&
      partnerData.zone_id !== "";

    setIsFormValid(isValid);
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

        // Update the location state with latitude and longitude
        setpartnerData({
          address: selectedAddress,
          latitude: latLng.lat,
          longitude: latLng.lng,
        });
        validateFields();
      })
      .catch((error) => console.error("Error", error));
  };
  const nextStep = () => {
    if (isFormValid) {
      setStep((prevStep) => prevStep + 1);
    }
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

  const handleOnChange = (e) => {
    setpartnerData({
      ...partnerData,
      [e.target.name]: e.target.value,
    });
    validateFields();
  };

  // post data
  const handleSubmit = async (e) => {
    // if (!handleValid()) {
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
    // }
  };

  //   const imageuploadhandler = (e) => {
  //     setpartnerData({
  //       ...partnerData,
  //       [e.target.name]: e.target.files[0],
  //     });
  //     validateFields();
  //   };
  const [coverPhotoError, setCoverPhotoError] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [zoneError, setZoneError] = useState(false);
  const handleImageUpload = (e) => {
    const fieldName = e.target.name;
    if (!e.target.files.length) {
      if (fieldName === "cover_photo") {
        setCoverPhotoError(true);
      } else if (fieldName === "logo") {
        setLogoError(true);
      }
    } else {
      // File selected, no error
      if (fieldName === "cover_photo") {
        setCoverPhotoError(false);
      } else if (fieldName === "logo") {
        setLogoError(false);
      }
    }
  };

  // For "Zone"
  const handleZoneChange = (e) => {
    const zoneId = e.target.value;
    if (zoneId === "") {
      setZoneError(true);
    } else {
      setZoneError(false);
    }
  };
  //   const [formVaild, setFormVaild] = useState(null);
  //   const handleValid = () => {
  //     let err = {};
  //     let formError = false;
  //     if (!partnerData.s_name) {
  //       formError = true;
  //       err["s_name"] = "firstnameErr";
  //     } else if (!nameValid(partnerData.s_name)) {
  //       formError = true;
  //       err["s_name"] = "nameValidErr";
  //     }
  //     if (!isEmpty(err)) {
  //       formError = true;
  //     }
  //     setFormVaild(err);
  //     return formError;
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
                              onChange={(e) => handleOnChange(e)}
                              //   error={formVaild?.firstname}
                            />
                            {!nameValid(partnerData.s_name) && (
                              <span className="error-text">
                                {partnerData.s_name.length > 15
                                  ? "Shop Name can be up to 15 characters"
                                  : "Invalid Shop Name"}
                              </span>
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
                              onChange={(e) => handleOnChange(e)}
                            />
                            {!gstNumberValid(partnerData.gst) && (
                              <span className="error-text">
                                {partnerData.gst.length > 15
                                  ? "GST Number can be up to 15 characters and digits"
                                  : "Invalid GST Number"}
                              </span>
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
                              //   className="form-control"
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
                            {!addressValid(partnerData.address) && (
                              <span className="error-text">
                                {partnerData.address.length > 15
                                  ? "Address can be up to 15 characters"
                                  : "Invalid  Address"}
                              </span>
                            )}
                            {/* 
                            <Form.Control
                              type="text"
                              placeholder="Shop Address"
                              name="address"
                              onChange={(e) => handleOnChange(e)}
                            /> */}
                          </Form.Group>
                          <Row className="mb-3">
                            {/* <Form.Group as={Col}>
                              <Form.Label>
                                Upload Cover Photo (Ratio 2:1)
                              </Form.Label>
                              <Form.Control
                                type="file"
                                name="cover_photo"
                                onChange={(e) => imageuploadhandler(e)}
                              />
                              {!partnerData.cover_photo && (
                                <span className="error-text">
                                  Cover Photo is required
                                </span>
                              )}
                            </Form.Group>
                            <Form.Group as={Col}>
                              <Form.Label>
                                Partners Logo ( Ratio 1:1 )
                              </Form.Label>
                              <Form.Control
                                type="file"
                                name="logo"
                                onChange={(e) => imageuploadhandler(e)}
                              />
                              {!partnerData.logo && (
                                <span className="error-text">
                                  Partners Logo is required
                                </span>
                              )}
                            </Form.Group> */}
                            <Form.Group as={Col}>
                              <Form.Label>
                                Upload Cover Photo (Ratio 2:1)
                              </Form.Label>
                              <Form.Control
                                type="file"
                                name="cover_photo"
                                onChange={(e) => handleImageUpload(e)}
                              />
                              {coverPhotoError && (
                                <span className="error-text">
                                  Cover Photo is required
                                </span>
                              )}
                            </Form.Group>
                            <Form.Group as={Col}>
                              <Form.Label>
                                Partners Logo ( Ratio 1:1 )
                              </Form.Label>
                              <Form.Control
                                type="file"
                                name="logo"
                                onChange={(e) => handleImageUpload(e)}
                              />
                              {logoError && (
                                <span className="error-text">
                                  Partners Logo is required
                                </span>
                              )}
                            </Form.Group>
                          </Row>
                          <Row className="mb-3">
                            <Form.Group as={Col}>
                              <Form.Label>Zone</Form.Label>
                              <Form.Select
                                defaultValue=""
                                name="zone_id"
                                onChange={(e) => handleZoneChange(e)}
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
                                <span className="error-text">
                                  Zone is required
                                </span>
                              )}
                            </Form.Group>
                            {/* <Form.Group as={Col}>
                              <Form.Label>Zone</Form.Label>
                              <Form.Select
                                defaultValue="Select Zone"
                                name="zone_id"
                                onChange={handleOnChange}
                              >
                                <option value={""}>Select Zone</option>
                                {zoneList.map((zonedata) => (
                                  <option key={zonedata.id} value={zonedata.id}>
                                    {zonedata.name}
                                  </option>
                                ))}
                              </Form.Select>
                              {partnerData.zone_id === "" && (
                                <span className="error-text">
                                  Zone is required
                                </span>
                              )}
                            </Form.Group> */}
                          </Row>
                          {/* <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridState">
                              <Form.Label>Latitude</Form.Label>
                              <Form.Control
                                type="number"
                                placeholder="Ex: -94.22213"
                                name="latitude"
                                onChange={(e) => handleOnChange(e)}
                              />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridCity">
                              <Form.Label>Longitude </Form.Label>
                              <Form.Control
                                type="number"
                                placeholder="Ex: 103.344322"
                                name="longitude"
                                onChange={(e) => handleOnChange(e)}
                              />
                            </Form.Group>
                          </Row> */}
                          <div className="mainForm-btn">
                            <Button onClick={nextStep} disabled={!isFormValid}>
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
                              onChange={(e) => handleOnChange(e)}
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
                              onChange={(e) => handleOnChange(e)}
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
                              onChange={(e) => handleOnChange(e)}
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
                              onChange={(e) => handleOnChange(e)}
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
                              onChange={(e) => handleOnChange(e)}
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
