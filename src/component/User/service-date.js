import React, { useEffect, useState } from "react";
import Newheader from '../../directives/newheader';;
import { Button, Col, Container, Row } from "react-bootstrap";
import service from "../../assets/images/banner/service.png";
import { Form, Link } from "react-router-dom";
import Footer from "../../directives/footer";
import { dayanddates, stringes, times } from "../../utils";
import axios from "axios";
import { BASE_URL } from "../../Constant/Index";
import moment from "moment/moment";
import { useParams } from "react-router-dom";
import strings from "react-localization";
import { Toaster, toast } from "react-hot-toast";

function Servicedate() {
  const { id } = useParams();
  console.log("id: ", id);
  const [slotday, setSlotDay] = useState([]);
  console.log("slotday: ", slotday[0]?.slot_date);
  const [timingSlot, setTimingSlot] = useState([]);
  console.log("timingSlot: ", timingSlot);
  const [bookingSlot, setBookingSlot] = useState([]);
  console.log("bookingSlot: ", bookingSlot);
  const [mobile, setMobile] = useState("");
  const [petType, setPetType] = useState([]);
  const [petData, setPetData] = useState("");
  console.log("petData: ", petData);
  const [stateall, setStateall] = useState([]);
  const [stateallCity, setStateallCity] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  console.log("selectedCity: ", selectedCity);
  const [formValid, setFormValid] = useState({});
  console.log("formValid: ", formValid);
  const [state, setstate] = useState("");

  console.log("petType: ", petType);

  useEffect(() => {
    handleSlotsData();
    petCategories();
    GetdataAll();
  }, []);
  const handleSlotsData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/banners/service/18`);
      setSlotDay(response.data.data);
      console.log("response.data: ", response.data);

      // Handle response as needed
    } catch (error) {
      console.error(error);
      // Handle error as needed
    }
  };
  const petCategories = async () => {
    try {
      const response = await fetch(`${BASE_URL}/categories`);
      const jsonData = await response.json();
      setPetType(jsonData.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // const handleValid = () => {
  //   let err = {};
  //   let formError = true;
  //   if (petData == "") {
  //     formError = false;
  //     err["name"] = "Pet is required";
  //   } else if (selectedCity == "") {
  //     formError = false;
  //     err["city_name"] = "City is required";
  //   } else if (mobile == "") {
  //     formError = false;
  //     err["mobile"] = " Mobile Number is required";
  //   }
  //   setFormValid(err);
  //   return formError;
  // };

  const customer_id = localStorage.getItem("userInfo");
  let storedUserId = JSON.parse(customer_id);
  console.log("customer_id: ", customer_id);
  const handleSubmit = async (e) => {
    // e.preventDefault();
    // console.log("handleSubmit called", handleValid()); // Add this

    // if (handleValid()) {
    const bookingData = new FormData();
    bookingData.append("user_id", storedUserId[0].id);
    bookingData.append("service_id", id);
    bookingData.append("dates", slotday[0]?.slot_date);
    bookingData.append("slot", bookingSlot);
    bookingData.append("pet", petData);
    bookingData.append("city", selectedCity);
    bookingData.append("mobile", mobile);
    // console.log("bookingData", bookingData);
    axios
      .post(`${BASE_URL}/banners/service_booking`, bookingData)
      .then((response) => {
        // setResponseMessage(response.data.message);
        // console.log("bookingdatattttt....", bookingData);
        toast.success("Your data Successfully Add");
      })
      .catch((error) => {
        toast.error("Field is required");
      });
    // .then((response) => {
    //   setResponseMessage(response.data.message);
    //   console.log("bookingdatattttt....", bookingData);
    //   toast.success("Your data Successfully Add");
    // })
    // .catch((error) => {
    //   toast.error("Field is required");
    // });
    // }
  };

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
      .get(`${BASE_URL}/auth/city?state=${state}`, {
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
      setstate(event.target.value);

      Getdatacity(event.target.value);
    }
  };
  return (
    <>
      <Toaster />
      <Newheader />
      <Container fluid className="p-0">
        <div className="all-bg">
          <img src={service} />
        </div>
      </Container>

      <section className="section-padding">
        <Container>
          <div className="service-dateCart">
            <div className="month-name">
              {slotday?.length > 0 ? (
                slotday.map((item, index) => (
                  <h4>
                    {moment(item.slot_date).format("MMMM Do YYYY").split("", 3)}
                  </h4>
                ))
              ) : (
                <h4 className="emptyMSG">{stringes.invalidMonth}</h4>
              )}
            </div>
            <div className="sevice-select-date">
              <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
              
                {slotday?.length > 0 ? (
  slotday.map((item, index) => (
    <li className="nav-item" key={index}>
      <a
        className="nav-link"
        id="Set-tab"
        data-toggle="pill"
        href="#Set"
        role="tab"
        aria-controls="Set"
        aria-selected="true"
        onClick={() => {
          setTimingSlot(item.slot_timing);
        }}
      >
        {moment(item.slot_date).format("dddd").split("", 3)} <br />
        <span>
        {moment(item.slot_date).format("D")}
        </span>
      </a>
    </li>
  ))
) : (
  <p className="emptyMSG">{stringes.invalidDate}</p>
)}

              </ul>
            </div>
          </div>
          <div className="needplace">
            <div className="tab-content" id="pills-tabContent">
              <div
                className="tab-pane fade show"
                id="Set"
                role="tabpanel"
                aria-labelledby="Set-tab"
              >
                <div>
                  <div className="selectService-date">
                    <h2>{stringes.time}</h2>
                    <ul className="nav nav-pills mb-3" role="tablist">
                      {timingSlot.length > 0 ? (
                        timingSlot.map((item, index) => (
                          <li className="nav-item">
                            <a
                              className="nav-link"
                              data-toggle="pill"
                              role="tab"
                              aria-selected="true"
                              onClick={() => {
                                setBookingSlot(item);
                              }}
                            >
                              {moment(item.slot_timing).format("h:mm a")}
                            </a>
                          </li>
                        ))
                      ) : (
                        <p className="emptyMSG">{stringes.noSlot}</p>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {!petType.length > 0 ? null : (
              <div className="add-petbtn">
                <Button>
                  <Link to={`/service-add-pet/${id}`}>{stringes.addPet}</Link>
                </Button>
              </div>
            )}

            <div className="form-pet mt-4">
              <form>
                <div className="form-group">
                  <select
                    className="form-control"
                    onChange={(e) => setPetData(e.target.value)}
                    value={petData}
                  >
                    <option>Choose</option>
                    {petType &&
                      petType.map((item) => (
                        <option key={item.id}>{item.name}</option>
                      ))}
                  </select>
                  {/* {formValid.petName && (
                    <span style={{ color: "red" }}>Pet is required</span>
                  )} */}
                </div>

                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <select
                        className="form-control"
                        onChange={Subscription}
                        value={state}
                      >
                        <option>State Choose...</option>
                        {stateall.map((items) => (
                          <option value={items.id} key={items.id}>
                            {items.state_name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-group">
                      <select
                        className="form-control"
                        onChange={(e) => setSelectedCity(e.target.value)}
                        value={selectedCity}
                      >
                        <option>City Choose...</option>
                        {stateallCity.map((items) => (
                          <option>{items.city_name}</option>
                        ))}
                      </select>
                      {/* {formValid.cityname && (
                        <span style={{ color: "red" }}>City is required</span>
                      )} */}
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <input
                    type="tel"
                    maxLength={10}
                    className="form-control"
                    placeholder="+91 00000000"
                    onChange={(e) => setMobile(e.target.value.replace(/[^0-9+]/g, ""))}
                    value={mobile}
                  />
                  {/* {formValid.mobile && (
                    <span style={{ color: "red" }}>
                      Mobile Number is required
                    </span>
                  )} */}
                </div>
              </form>
            </div>
            <div className="add-petbtn">
              <Button onClick={(e) => handleSubmit(e)}>
                <Link>{stringes.submit}</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <Footer />
    </>
  );
}

export default Servicedate;
