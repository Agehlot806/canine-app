import React, { useEffect, useState } from "react";
import Header from "../../directives/header";
import { Button, Col, Container, Row } from "react-bootstrap";
import service from "../../assets/images/banner/service.png";
import { Form, Link } from "react-router-dom";
import Footer from "../../directives/footer";
import { dayanddates, stringes, times } from "../../utils";
import axios from "axios";
import { BASE_URL } from "../../Constant/Index";
import moment from "moment/moment";
import dog1 from "../../assets/images/img/dog1.svg";
import cat1 from "../../assets/images/img/cat1.png";
import { useParams } from "react-router-dom";

function Servicedate() {
  const { id } = useParams();
  console.log("id: ", id);
  const [slotday, setSlotDay] = useState([]);
  const [timingSlot, setTimingSlot] = useState([]);
  const [bookinTimingSlot, setBookingTimingSlot] = useState([]);
  const [mobile, setMobile] = useState([]);
  const [petType, setPetType] = useState([]);
  const [stateall, setStateall] = useState([]);
  const [stateallCity, setStateallCity] = useState([]);
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handleSubmit called"); // Add this

    console.log("bookingData: ", bookingData);
    const bookingData = new FormData();
    bookingData.append("user_id", "1");
    bookingData.append("service_id", id);
    bookingData.append("dates", moment(slotday).format("DD-MM-YYYY"));
    bookingData.append("slot", moment(timingSlot).format("h:mm a"));
    bookingData.append("pet", pet);
    bookingData.append("city", city_name);
    bookingData.append("mobile", mobile);
    console.log("bookingData", bookingData);
    axios
      .post(`${BASE_URL}/banners/service_booking`, bookingData)
      .then((response) => {
        setResponseMessage(response.data.message);
        console.log("bookingdatattttt....", bookingData);
        toast.success("Your data Successfully Add");
      })
      .catch((error) => {
        toast.error("Field is required");
      });
  };

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
      <Header />
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
                    <li className="nav-item">
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
                        {item.day} <br />
                        <span>
                          {moment(item.slot_date).format("MMMM Do YYYY")}
                        </span>
                      </a>
                    </li>
                  ))
                ) : (
                  <p className="emptyMSG">{stringes.invalidDate}</p>
                )}
                {/*  <li className="nav-item">
                  <a
                    className="nav-link"
                    id="Sun-tab"
                    data-toggle="pill"
                    href="#Sun"
                    role="tab"
                    aria-controls="Sun"
                    aria-selected="false"
                  >
                    Sun <br />
                    <span>21</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    id="Mon-tab"
                    data-toggle="pill"
                    href="#Mon"
                    role="tab"
                    aria-controls="Mon"
                    aria-selected="false"
                  >
                    Mon <br />
                    <span>22</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    id="Tue-tab"
                    data-toggle="pill"
                    href="#Tue"
                    role="tab"
                    aria-controls="Tue"
                    aria-selected="false"
                  >
                    Tue <br />
                    <span>23</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    id="Wed-tab"
                    data-toggle="pill"
                    href="#Wed"
                    role="tab"
                    aria-controls="Wed"
                    aria-selected="false"
                  >
                    Wed <br />
                    <span>24</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    id="Thu-tab"
                    data-toggle="pill"
                    href="#Thu"
                    role="tab"
                    aria-controls="Thu"
                    aria-selected="false"
                  >
                    Thu <br />
                    <span>25</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    id="Fri-tab"
                    data-toggle="pill"
                    href="#Fri"
                    role="tab"
                    aria-controls="Fri"
                    aria-selected="false"
                  >
                    Fri <br />
                    <span>26</span>
                  </a>
                </li> */}
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
              {/* <div
                className="tab-pane fade"
                id="Sun"
                role="tabpanel"
                aria-labelledby="Sun-tab"
              >
                <div>
                  <div className="selectService-date">
                    <h2>Time</h2>
                    <ul className="nav nav-pills mb-3" role="tablist">
                      {times?.length > 0 ? (
                        times.map((item, index) => (
                          <li className="nav-item">
                            <a
                              className="nav-link"
                              data-toggle="pill"
                              role="tab"
                              aria-selected="true"
                            >
                              {item.time}
                            </a>
                          </li>
                        ))
                      ) : (
                        <p className="emptyMSG">No slot</p>
                      )}
                    </ul>
                  </div>
                </div>
              </div> */}
              {/* <div
                className="tab-pane fade"
                id="Mon"
                role="tabpanel"
                aria-labelledby="Mon-tab"
              >
                <div>
                  <div className="selectService-date">
                    <h2>Time</h2>
                    <ul className="nav nav-pills mb-3" role="tablist">
                      {times?.length > 0 ? (
                        times.map((item, index) => (
                          <li className="nav-item">
                            <a
                              className="nav-link"
                              data-toggle="pill"
                              role="tab"
                              aria-selected="true"
                            >
                              {item.time}
                            </a>
                          </li>
                        ))
                      ) : (
                        <p className="emptyMSG">No slot</p>
                      )}
                    </ul>
                  </div>
                </div>
              </div> */}
              {/* <div
                className="tab-pane fade"
                id="Tue"
                role="tabpanel"
                aria-labelledby="Tue-tab"
              >
                <div>
                  <div className="selectService-date">
                    <h2>Time</h2>
                    <ul className="nav nav-pills mb-3" role="tablist">
                      {times?.length > 0 ? (
                        times.map((item, index) => (
                          <li className="nav-item">
                            <a
                              className="nav-link"
                              data-toggle="pill"
                              role="tab"
                              aria-selected="true"
                            >
                              {item.time}
                            </a>
                          </li>
                        ))
                      ) : (
                        <p className="emptyMSG">No slot</p>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="Wed"
                role="tabpanel"
                aria-labelledby="Wed-tab"
              >
                <div>
                  <div className="selectService-date">
                    <h2>Time</h2>
                    <ul className="nav nav-pills mb-3" role="tablist">
                      {times?.length > 0 ? (
                        times.map((item, index) => (
                          <li className="nav-item">
                            <a
                              className="nav-link"
                              data-toggle="pill"
                              role="tab"
                              aria-selected="true"
                            >
                              {item.time}
                            </a>
                          </li>
                        ))
                      ) : (
                        <p className="emptyMSG">No slot</p>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="Thu"
                role="tabpanel"
                aria-labelledby="Thu-tab"
              >
                <div>
                  <div className="selectService-date">
                    <h2>Time</h2>

                    <ul className="nav nav-pills mb-3" role="tablist">
                      {times?.length > 0 ? (
                        times.map((item, index) => (
                          <li className="nav-item">
                            <a
                              className="nav-link"
                              data-toggle="pill"
                              role="tab"
                              aria-selected="true"
                            >
                              {item.time}
                            </a>
                          </li>
                        ))
                      ) : (
                        <p className="emptyMSG">No slot</p>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="Fri"
                role="tabpanel"
                aria-labelledby="Fri-tab"
              >
                <div>
                  <div className="selectService-date">
                    <h2>Time</h2>
                    <ul className="nav nav-pills mb-3" role="tablist">
                      {times?.length > 0 ? (
                        times.map((item, index) => (
                          <li className="nav-item">
                            <a
                              className="nav-link"
                              data-toggle="pill"
                              role="tab"
                              aria-selected="true"
                            >
                              {item.time}
                            </a>
                          </li>
                        ))
                      ) : (
                        <p className="emptyMSG">No slot</p>
                      )}
                    </ul>
                  </div>
                </div>
              </div> */}
            </div>

            <div className="add-petbtn">
              <Button>
                <Link to="/service-add-pet">{stringes.addPet}</Link>
              </Button>
            </div>

            <div className="form-pet">
              <form>
                <div className="form-group">
                  <select
                    className="form-control"
                  // value={city_name}
                  >
                    <option>Pet</option>
                    {petType &&
                      petType.map((item) => (
                        <option key={item.id}>{item.name}</option>
                      ))}
                  </select>
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
                      >
                        <option>City Choose...</option>
                        {stateallCity.map((items) => (
                          <option>{items.city_name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <input
                    type="tel"
                    maxLength={10}
                    className="form-control"
                    placeholder="+91 00000000"
                    onChange={(e) => setMobile(e.target.value)}
                    value={mobile}
                  />
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
