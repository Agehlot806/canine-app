import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../Constant/Index"; import HomeImg from "../../assets/images/img/home.png";
import { Col, Container, Row, Button, Form, Nav, Table } from "react-bootstrap";
import logo from "../../assets/images/logo.png";
import icon from "../../assets/images/icon/pro.png";
import arrow from "../../assets/images/icon/arrow.png";
import invoice from "../../assets/images/icon/invoice.png";
import orders from "../../assets/images/img/orders.png";
import { Link, useNavigate } from "react-router-dom";
import catpng from "../../assets/images/img/catpng.png";
import bannerPro from "../../assets/images/img/bannerPro.png";
import paydone from "../../assets/images/icon/paydone.png";
import PetShopHeader from "../../directives/petShopHeader";
import Petshopfooter from "../../directives/petShop-Footer";
import toast, { Toaster } from "react-hot-toast";
import Fade, { Flip } from "react-reveal";

function Petshopdashboard() {
  const navigate = useNavigate();
  const storedWholesellerId = Number(localStorage.getItem("UserWholesellerId"));
  console.log("storedWholesellerId: ", storedWholesellerId);
  const [totalorder, settotalorder] = useState([]);
  const [homebanner, sethomebanner] = useState([]);
  const [email, setEmail] = useState("");
  useEffect(() => {
    totalOrders();
    AllBanner();
  }, []);

  const handleNewsletter = (event) => {
    event.preventDefault();
    const data = {
      email: email,
    };
    axios
      .post(`${BASE_URL}/newsletter/subscribe`, data)
      .then((response) => {
        setResponseMessage(response.data.message);
        toast.success("Subscription Successfully");
      })
      .catch((error) => {
        toast.error("The email field is required");
      });
  };

  const AllBanner = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/categories/banner`);
      sethomebanner(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOrderHistory = (id) => {

    navigate(`/order-view-details/${id}`)
  };

  const totalOrders = async () => {
    axios
      .get(`${BASE_URL}/customer/order/list?id=${storedWholesellerId}`)
      .then((response) => {
        console.log(response);
        console.log("Order List Successful");
        settotalorder(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const deliveredOrders = totalorder.filter(order => order.order_status === "delivered");
  const pendingOrders = totalorder.filter(order => order.order_status === "pending");
  const gradientColors = [
    "linear-gradient(180deg, #eef 70%, rgba(238, 238, 255, 0) 100%)",
    "linear-gradient(180deg, #ffead2 0%, rgba(255, 234, 210, 0) 100%)",
    "linear-gradient(180deg, #fecbcd 0%, rgba(254, 203, 205, 0) 100%)",
  ];



  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/auth/wholesaler_orders/${storedWholesellerId}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data.data);
        // console.log("data",data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <>
      <Toaster />
      <PetShopHeader />
      <div className="home-section">
        <Container fluid className="p-0">
          <div>
            {homebanner
              ? homebanner.map(
                (item, index) =>
                  item.type === "default" && (
                    <div className="home-img">
                      <Link to={item.default_link}>
                        <div>
                          <img
                            src={
                              "https://canine.hirectjob.in//storage/app/" +
                              item.image
                            }
                          />
                        </div>
                        <Row>
                          <Col lg={7}>
                            <div className="home-content">
                              <h1>{item.title}</h1>
                              <p>{item.description}</p>
                              <Button>
                                Explore More <i className="fa fa-angle-right" />
                              </Button>
                            </div>
                          </Col>
                        </Row>
                      </Link>
                    </div>
                  )
              )
              : null}
          </div>
        </Container>
      </div>
      <section className="dash-addProduct-btn">
        <div className="text-center mt-3">
          <Button>
            <Link to="/petshop-product">Add Products</Link>
          </Button>
        </div>
      </section>
      <section className="section-padding">
        <Container>
          <div className="dash-tabs">
            <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  id="pills-home-tab"
                  data-toggle="pill"
                  href="#pills-home"
                  role="tab"
                  aria-controls="pills-home"
                  aria-selected="true"
                >
                  <div className="text-center">
                    <h3>Total Order</h3>
                    <h5>{data.length}</h5>
                    {/* <p>+10.80%</p> */}
                  </div>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  id="pills-profile-tab"
                  data-toggle="pill"
                  href="#pills-profile"
                  role="tab"
                  aria-controls="pills-profile"
                  aria-selected="false"
                >
                  <h3>Completed Order</h3>
                  <h5>{deliveredOrders.length}</h5>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  id="pills-contact-tab"
                  data-toggle="pill"
                  href="#pills-contact"
                  role="tab"
                  aria-controls="pills-contact"
                  aria-selected="false"
                >
                  <h3>Pending Order</h3>
                  <h5>{pendingOrders.length}</h5>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  id="Balance-tab"
                  data-toggle="pill"
                  href="#Balance"
                  role="tab"
                  aria-controls="Balance"
                  aria-selected="false"
                >
                  <h3>Balance</h3>
                  <h5>10</h5>
                </a>
              </li>
            </ul>
            <div className="tab-content" id="pills-tabContent">
              <div
                className="tab-pane fade show active"
                id="pills-home"
                role="tabpanel"
                aria-labelledby="pills-home-tab"
              >
                <div className="needplace">
                  <div className="dash-head">
                    <h1>Total Order</h1>
                  </div>
                  <Row>
                    {totalorder && totalorder.length > 0 ? (
                      totalorder.map((item, index) => (
                        <Col lg={4} sm={6} className="mb-4">
                          <div className="order-card order-bg1" style={{
                            background:
                              gradientColors[index % gradientColors.length],
                          }}>
                            <div className="order-status">
                              <h6>{item.payment_status}</h6>
                            </div>
                            <div className="order-content">
                              <Row>
                                <Col sm={3}>
                                  <div className="dash-logo">
                                    <img src={logo} />
                                  </div>
                                </Col>
                                <Col sm={9}>
                                  <div className="dashCard-detail">
                                    <h6>
                                      Order ID : <span>{item.id}
                                      </span>
                                    </h6>
                                    <p>
                                      Payment status : <span>{item.payment_status}</span>
                                    </p>
                                    <p>
                                      Order By : <span>{item.user_id ? "Wholeseller" : ""}</span>
                                    </p>
                                    <p>
                                      Total Amount : <span>₹ {item.order_amount}</span>
                                    </p>
                                  </div>
                                </Col>
                              </Row>
                              <p>{item.user_id ? "Wholeseller" : ""}</p>
                              <div className="dash-review">
                                {item.callback.map((callbackItem, callbackIndex) => (
                                  <h6>{callbackItem.variant}</h6>
                                ))}
                                <a>
                                  <i class="fa fa-star" aria-hidden="true"></i>
                                </a>
                                <a>
                                  <i class="fa fa-star" aria-hidden="true"></i>
                                </a>
                                <a>
                                  <i class="fa fa-star" aria-hidden="true"></i>
                                </a>
                                <a>
                                  <i class="fa fa-star" aria-hidden="true"></i>
                                </a>
                                <a>
                                  <i
                                    class="fa fa-star-half-o"
                                    aria-hidden="true"
                                  ></i>
                                </a>
                                {/* <p>
                                  Lorem Ipsum is simply dummy text of the printing
                                  and typesetting
                                </p> */}
                              </div>
                            </div>
                            <div className="text-center mt-3">
                              <Button
                                onClick={() => {
                                  handleOrderHistory(item.id)
                                }}
                              >Detail Order</Button>
                            </div>
                          </div>
                        </Col>
                      ))
                    ) : (
                      <p className="emptyMSG">No Total Order</p>
                    )}
                  </Row>
                </div>



                <section className="section-padding">
                  <Container>
                    <div>
                      {homebanner
                        ? homebanner.map(
                          (item, index) =>
                            item.type === "news_letter" && (
                              <div className="home-img">
                                <div className="">
                                  <img
                                    src={
                                      "https://canine.hirectjob.in/storage/app/" + item.image
                                    }
                                  />
                                </div>
                                <Row className="justify-content-center">
                                  <Col lg={7}>
                                    <div className="new-content">
                                      <div className="Newsletter">
                                        <Flip right>
                                          <h1 className="main-head">
                                            Get Or Promo Code by Subscribing To our
                                            Newsletter
                                          </h1>
                                        </Flip>
                                        <Form className="d-flex">
                                          <Form.Control
                                            type="search"
                                            placeholder="Enter your email"
                                            className="me-2"
                                            aria-label="Search"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                          />
                                          <Button
                                            variant="outline-success"
                                            onClick={handleNewsletter}
                                          >
                                            Subscribe
                                          </Button>
                                        </Form>
                                      </div>
                                    </div>
                                  </Col>
                                </Row>
                              </div>
                            )
                        )
                        : null}
                    </div>
                  </Container>
                </section>

              </div>
              <div
                className="tab-pane fade"
                id="pills-profile"
                role="tabpanel"
                aria-labelledby="pills-profile-tab"
              >
                <div className="needplace">
                <div className="dash-head">
                    <h1>Completed Order</h1>
                  </div>
                  <Row>
                    {totalorder
                      ? totalorder.map(
                        (item, index) =>
                          item.order_status == "delivered" && (
                            <Col lg={4} sm={6} className="mb-4">
                              <div className="order-card order-bg1" style={{
                                background:
                                  gradientColors[index % gradientColors.length],
                              }}>
                                <div className="order-status">
                                  <h6>{item.payment_status}</h6>
                                </div>
                                <div className="order-content">
                                  <Row>
                                    <Col sm={3}>
                                      <div className="dash-logo">
                                        <img src={logo} />
                                      </div>
                                    </Col>
                                    <Col sm={9}>
                                      <div className="dashCard-detail">
                                        <h6>
                                          Order ID : <span>{item.id}
                                          </span>
                                        </h6>
                                        <p>
                                          Payment status : <span>{item.payment_status}</span>
                                        </p>
                                        <p>
                                          Order By : <span>{item.user_id ? "Wholeseller" : ""}</span>
                                        </p>
                                        <p>
                                          Total Amount : <span>₹ {item.order_amount}</span>
                                        </p>
                                      </div>
                                    </Col>
                                  </Row>
                                  <p>{item.user_id ? "Wholeseller" : ""}</p>
                                  <div className="dash-review">
                                    {item.callback.map((callbackItem, callbackIndex) => (
                                      <h6>{callbackItem.variant}</h6>
                                    ))}
                                    <a>
                                      <i class="fa fa-star" aria-hidden="true"></i>
                                    </a>
                                    <a>
                                      <i class="fa fa-star" aria-hidden="true"></i>
                                    </a>
                                    <a>
                                      <i class="fa fa-star" aria-hidden="true"></i>
                                    </a>
                                    <a>
                                      <i class="fa fa-star" aria-hidden="true"></i>
                                    </a>
                                    <a>
                                      <i
                                        class="fa fa-star-half-o"
                                        aria-hidden="true"
                                      ></i>
                                    </a>
                                  </div>
                                </div>
                                <div className="text-center mt-3">
                                  <Button
                                    onClick={() => {
                                      handleOrderHistory(item.id)
                                    }}
                                  >Detail Order</Button>
                                </div>
                              </div>
                            </Col>
                          )
                      )
                      : (
                        <p className="emptyMSG">No Pending Order</p>
                      )}
                  </Row>
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="pills-contact"
                role="tabpanel"
                aria-labelledby="pills-contact-tab"
              >
                <div className="needplace">
                  <div className="dash-head">
                    <h1>Pending Order</h1>
                  </div>
                  <Row>
                    {totalorder
                      ? totalorder.map(
                        (item, index) =>
                          item.order_status == "pending" && (
                            <Col lg={4} sm={6} className="mb-4">
                              <div className="order-card order-bg1" style={{
                                background:
                                  gradientColors[index % gradientColors.length],
                              }}>
                                <div className="order-status">
                                  <h6>{item.payment_status}</h6>
                                </div>
                                <div className="order-content">
                                  <Row>
                                    <Col sm={3}>
                                      <div className="dash-logo">
                                        <img src={logo} />
                                      </div>
                                    </Col>
                                    <Col sm={9}>
                                      <div className="dashCard-detail">
                                        <h6>
                                          Order ID : <span>{item.id}
                                          </span>
                                        </h6>
                                        <p>
                                          Payment status : <span>{item.payment_status}</span>
                                        </p>
                                        <p>
                                          Order By : <span>{item.user_id ? "Wholeseller" : ""}</span>
                                        </p>
                                        <p>
                                          Total Amount : <span>₹ {item.order_amount}</span>
                                        </p>
                                      </div>
                                    </Col>
                                  </Row>
                                  <p>{item.user_id ? "Wholeseller" : ""}</p>
                                  <div className="dash-review">
                                    {item.callback.map((callbackItem, callbackIndex) => (
                                      <h6>{callbackItem.variant}</h6>
                                    ))}
                                    <a>
                                      <i class="fa fa-star" aria-hidden="true"></i>
                                    </a>
                                    <a>
                                      <i class="fa fa-star" aria-hidden="true"></i>
                                    </a>
                                    <a>
                                      <i class="fa fa-star" aria-hidden="true"></i>
                                    </a>
                                    <a>
                                      <i class="fa fa-star" aria-hidden="true"></i>
                                    </a>
                                    <a>
                                      <i
                                        class="fa fa-star-half-o"
                                        aria-hidden="true"
                                      ></i>
                                    </a>
                                  </div>
                                </div>
                                <div className="text-center mt-3">
                                  <Button
                                    onClick={() => {
                                      handleOrderHistory(item.id)
                                    }}
                                  >Detail Order</Button>
                                </div>
                              </div>
                            </Col>
                          )
                      )
                      : (
                        <p className="emptyMSG">No Pending Order</p>
                      )}
                  </Row>
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="Balance"
                role="tabpanel"
                aria-labelledby="pills-Balance-tab"
              >
                <div className="needplace">
                  <Row className="justify-content-center">
                    <Col lg={8}>
                      <div className="balance-card">
                        <h5>Current Balance</h5>
                        <h1>₹143,421.20</h1>
                        <Button>+ Add Balance</Button>
                      </div>
                    </Col>
                  </Row>
                </div>
                <div className="needplace">
                  <Row className="justify-content-center">
                    <Col lg={6}>
                      <div className="Withdrawal-card">
                        {/* <Button>Withdrawal Amount</Button> */}
                        <h5>Transactions</h5>
                        <div className="with-table">
                          <div>
                            <img src={icon} />
                          </div>
                          <div className="with-content">
                            <h6>John Smith</h6>
                            <p>
                              10 May<span>10:30 PM</span>
                            </p>
                          </div>
                          <div className="arrow-icon">
                            <img src={arrow} />
                            <p>$30.00</p>
                          </div>
                        </div>
                        <div className="with-table">
                          <div>
                            <img src={icon} />
                          </div>
                          <div className="with-content">
                            <h6>John Smith</h6>
                            <p>
                              10 May<span>10:30 PM</span>
                            </p>
                          </div>
                          <div className="arrow-icon">
                            <img src={arrow} />
                            <p>$30.00</p>
                          </div>
                        </div>
                        <div className="with-table">
                          <div>
                            <img src={icon} />
                          </div>
                          <div className="with-content">
                            <h6>John Smith</h6>
                            <p>
                              10 May<span>10:30 PM</span>
                            </p>
                          </div>
                          <div className="arrow-icon">
                            <img src={arrow} />
                            <p>$30.00</p>
                          </div>
                        </div>
                        <div className="with-table">
                          <div>
                            <img src={icon} />
                          </div>
                          <div className="with-content">
                            <h6>John Smith</h6>
                            <p>
                              10 May<span>10:30 PM</span>
                            </p>
                          </div>
                          <div className="arrow-icon">
                            <img src={arrow} />
                            <p>$30.00</p>
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
      <Petshopfooter />
    </>
  );
}

export default Petshopdashboard;
