import React, { useEffect, useState } from "react";
import Newheader from "../../directives/newheader";
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
// import { DatePicker } from "react-datepicker";
// import DatePicker from "react-datepicker/dist/react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import loadinggif from "../../assets/images/video/loading.gif";
import servicepage from "../../assets/images/img/servicepage.png";

const addMonths = (date, months) => {
  const newDate = new Date(date);
  newDate.setMonth(newDate.getMonth() + months);
  return newDate;
};
const serviceDetailsMap = {
  "Pets Grooming": {
    title: "Each Visit Also Includes",
    details: [
      "Pampered pups Expert baths, trims, and styles for furry friends.",
      "Tail wags guaranteed Gentle groomers handle anxious furries with love.",
      "More than shampoo Spa treatments leave coats gleaming & smiles wide.",
      "Convenience is key Mobile grooming brings the salon to your doorstep.",
      "Healthy & happy Regular sessions prevent mats and promote skin health.",
    ],
  },
  "Health & Wellness": {
    title: "Each Visit Also Includes",
    details: [
      "Comprehensive Health Assessments",
      "Laboratory Testing",
      "Fitness and Exercise Programs",
      "Weight Management Programs",
    ],
  },
  "Walking & Sitting": {
    title: "Each Visit Also Includes",
    details: [
      "Pet walking",
      "Pet  running",
      "Pet sitting for any animal or time",
    ],
  },
  "Pet Training": {
    title: "Each Visit Also Includes",
    details: [
      "Experienced Trainers",
      "Behavior Modification",
      "Pet Therapy",
      "Obedience Training",
    ],
  },
  "Pet Onboarding": {
    title: "Each Visit Also Includes",
    details: [
      " Luxurious pet boarding with playtime",
      " Luxurious pet boarding with spa treatments",
      " Luxurious pet boarding with comfy suites",
    ],
  },
  "Pet-Swimming": {
    title: "Each Visit Also Includes",
    details: [
      "Swimming Lesson",
      "Swim Safety Assessments",
      "Life Jackets",
      "Fun and Recreational Swims",
    ],
  },
};

function Servicedate() {
  const { id, name } = useParams();
  const { title, details } = serviceDetailsMap[name] || {};
  console.log("name: ", name);
  const [slotday, setSlotDay] = useState([]);

  const [timingSlot, setTimingSlot] = useState([]);
  const [hoveredDate, setHoveredDate] = useState(null);
  const [bookingSlot, setBookingSlot] = useState([]);
  const [mobile, setMobile] = useState("");
  const [petType, setPetType] = useState([]);
  const [petData, setPetData] = useState("");
  const [stateall, setStateall] = useState([]);
  const [stateallCity, setStateallCity] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [formValid, setFormValid] = useState({});
  const [state, setstate] = useState("");
  const [allservicebooking, setallservicebooking] = useState([]);
  const [bookedSlotTimes, setBookedSlotTimes] = useState([]);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    Promise.all([handleSlotsData(), petCategories(), GetdataAll()])
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);
  const handleSlotsData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/banners/service/${id}`);
      setSlotDay(response.data.data);
      console.log("response.data: ", response.data);

      // Handle response as needed
    } catch (error) {
      console.error(error);
      // Handle error as needed
    }
  };

  useEffect(() => {
    fetchBookedSlotTimes();
  }, [id]);

  const fetchBookedSlotTimes = async () => {
    try {
      const response = await fetch(`${BASE_URL}/banners/get_allservicebooking`);
      const jsonData = await response.json();
      const bookedTimes = jsonData.data.map((booking) => booking.slot);
      setBookedSlotTimes(bookedTimes);
    } catch (error) {
      console.error("Error fetching booked slot times:", error);
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

  const customer_id = localStorage.getItem("userInfo");
  let storedUserId = JSON.parse(customer_id);
  const handleSubmit = async (e) => {
    const bookingData = new FormData();
    bookingData.append("user_id", storedUserId);
    bookingData.append("service_id", id);
    bookingData.append("dates", slotday[0]?.slot_date);
    bookingData.append("slot", bookingSlot);
    bookingData.append("pet", petData);
    bookingData.append("city", selectedCity);
    bookingData.append("mobile", mobile);
    axios
      .post(`${BASE_URL}/banners/service_booking`, bookingData)
      .then((response) => {
        // setResponseMessage(response.data.message);
        toast.success("Your data Successfully Add");
      })
      .catch((error) => {
        toast.error("Field is required");
      });
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
      .post(`${BASE_URL}/auth/city?state=${state}`, {
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

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  return (
    <>
      <Toaster />
      <Newheader />
      {loading ? (
        <section className="section-padding mt-3 mb-3">
          <div className="loaderimg text-center text-black mb-4">
            <img src={loadinggif} alt="" />
            <h5>Please Wait.......</h5>
          </div>
        </section>
      ) : (
        <>
          <Container fluid className="p-0">
            <div className="all-bg">
              <img src={service} />
            </div>
          </Container>
          <section className="section-padding">
            <Container>
              <Row>
                <Col lg={7} sm={7} className="align-self-center">
                  <div className="service-Visit">
                    <h1 className="main-head">{title}</h1>

                    <ul>
                      {details &&
                        details.map((detail, index) => (
                          <li key={index}>
                            <i className="fa fa-check-circle" /> {detail}
                          </li>
                        ))}
                      {/* <li>
                          
                        <i className="fa fa-check-circle" /> {details}
                      </li> */}
                      {/* <li>
                          <i className="fa fa-check-circle" /> {pointtwo}
                      </li>
                      <li>
                        <i className="fa fa-check-circle" /> {pointthree}
                      </li>
                      <li>
                          <i className="fa fa-check-circle" /> Watering Plants
                        </li> */}
                    </ul>
                  </div>
                </Col>
                <Col lg={5} sm={5}>
                  <div className="aboutpage-img">
                    <img src={servicepage} />
                  </div>
                </Col>
              </Row>
            </Container>
          </section>
          <section className="section-padding">
            <Container>
              <h1 className="main-head">{name} Service Slot </h1>
              <div className="needplace">
                {/* <DatePicker
              selected={startDate}
              onChange={onChange}
              minDate={new Date()}
              maxDate={addMonths(new Date(), 5)}
              startDate={startDate}
              endDate={endDate}
              selectsRange
              inline
              showDisabledMonthNavigation
            /> */}
              </div>
              <div className="service-dateCart">
                <div className="month-name">
                  {/* {slotday?.length > 1 ? (
                    <h4>
                      {moment(slotday[1].slot_date).format("MMMM Do YYYY").split("", 3)}
                    </h4>
                  ) : (
                    <h4 className="emptyMSG">{stringes.invalidMonth}</h4>
                  )} */}
                  {hoveredDate && (
                    <h4>
                      {moment(hoveredDate).format("MMMM Do YYYY").split("", 3)}
                    </h4>
                  )}
                </div>
                <div className="sevice-select-date">
                  {/* <DatePicker
                selected={startDate}
                onChange={onChange}
                minDate={new Date()}
                maxDate={addMonths(new Date(), 5)}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                inline
                showDisabledMonthNavigation
                className="custom-datepicker"
                // onSelect={() => setTimingSlot(item.slot_timing)}
                // onClick={() => {
                //   setTimingSlot(item.slot_timing);
                // }}
              /> */}
                  <ul
                    className="nav nav-pills mb-3"
                    id="pills-tab"
                    role="tablist"
                  >
                    {slotday?.length > 0 ? (
                      slotday.map((item, index) => (
                        <li
                          className="nav-item"
                          key={index}
                          onMouseEnter={() => setHoveredDate(item.slot_date)} // Set the hovered date
                          onMouseLeave={() => setHoveredDate(null)} // Reset when leaving
                        >
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
                            {moment(item.slot_date).format("dddd").split("", 3)}{" "}
                            <br />
                            <span>{moment(item.slot_date).format("D")}</span>
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
                    <div className="selectService-date">
                      <h2>{stringes.time}</h2>
                      <ul className="nav nav-pills mb-3" role="tablist">
                        {timingSlot && timingSlot.length > 0 ? (
                          timingSlot.map((item, index) => (
                            <li className="nav-item" key={index}>
                              <a
                                className={`nav-link ${
                                  bookedSlotTimes.includes(item)
                                    ? "disabled"
                                    : ""
                                }`}
                                data-toggle="pill"
                                role="tab"
                                aria-selected="true"
                                onClick={() => {
                                  setBookingSlot(item);
                                }}
                              >
                                {item}
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

                {!petType.length > 0 ? null : (
                  <div className="add-petbtn">
                    <Button>
                      <Link to={`/service-add-pet/${name}/${id}`}>
                        {stringes.addPet}
                      </Link>
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
                        onChange={(e) =>
                          setMobile(e.target.value.replace(/[^0-9+]/g, ""))
                        }
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
        </>
      )}
      <Footer />
    </>
  );
}

export default Servicedate;
