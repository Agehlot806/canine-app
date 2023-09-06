import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../Constant/Index";import HomeImg from "../../assets/images/img/home.png";
import { Col, Container, Row, Button, Form, Nav, Table } from "react-bootstrap";
import logo from "../../assets/images/logo.png";
import icon from "../../assets/images/icon/pro.png";
import arrow from "../../assets/images/icon/arrow.png";
import invoice from "../../assets/images/icon/invoice.png";
import orders from "../../assets/images/img/orders.png";
import { Link } from "react-router-dom";
import catpng from "../../assets/images/img/catpng.png";
import bannerPro from "../../assets/images/img/bannerPro.png";
import paydone from "../../assets/images/icon/paydone.png";
import Wholesallerfooter from "../../directives/wholesaller-Footer";
import PetShopHeader from "../../directives/petShopHeader";

function Petshopdashboard() {
  const storedWholesellerId = Number(localStorage.getItem("UserWholesellerId"));
  console.log("storedWholesellerId: ", storedWholesellerId);
  const [totalorder, settotalorder] = useState([]);
  useEffect(() => {
    totalOrders();
  }, []);
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
  return (
    <>
      <PetShopHeader />
      <div className="home-bg">
        <div className="home-section">
          <Container className="p-0">
            <Row>
              <Col lg={6} className="align-self-center">
                <div className="home-content">
                  {/* <h1>
                    Taking care <br />
                    for your Smart Dog !
                  </h1>
                  <p>
                    Human–canine bonding is the relationship between dogs and
                    humans.
                  </p>
                  <Button>
                    Explore More <i className="fa fa-angle-right" />
                  </Button> */}
                </div>
              </Col>
              <Col lg={6}>
                <img src={HomeImg} />
              </Col>
            </Row>
          </Container>
        </div>
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
                  <h3>Total Order</h3>
                  <h5>50</h5>
                  <p>+10.80%</p>
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
                  <h5>$22k</h5>
                  <p>+10.80%</p>
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
                  <h5>50</h5>
                  <p>+10.80%</p>
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
                  <p>+10.80%</p>
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
                          <div className="order-card order-bg1">
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
                                      Order ID : <span>{item.id}</span>
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
                              <Button>Detail Order</Button>
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
                    <div className=" Newsletter-bg">
                      <Row>
                        <Col lg={3}>
                          <img src={catpng} />
                        </Col>
                        <Col lg={6}>
                          <div className="Newsletter">
                            <h1 className="main-head">
                              Get Or Promo Code by Subscribing To our Newsletter
                            </h1>
                            <Form className="d-flex">
                              <Form.Control
                                type="search"
                                placeholder="Enter your email"
                                className="me-2"
                                aria-label="Search"
                              />
                              <Button variant="outline-success">
                                Subscribe
                              </Button>
                            </Form>
                          </div>
                        </Col>
                        <Col lg={3} className="align-self-center">
                          <img src={bannerPro} />
                        </Col>
                      </Row>
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
                    <h1>Order Details</h1>
                  </div>
                  <div className="needplace">
                    <div className="oder-detail-card">
                      <Row>
                        <Col lg={5}>
                          <div className="product-details">
                            <div>
                              <img src={logo} />
                            </div>
                            <div>
                              <h5>Canine Products</h5>
                              <p>1901 Thornridge Cir. Shiloh, Hawaii 81063</p>
                            </div>
                          </div>
                        </Col>
                        <Col lg={7}>
                          <div className="dowload-invioce">
                            <Button className="invoice-1">
                              <img src={invoice} /> download invoice
                            </Button>
                            <Button className="invoice-2">
                              <img src={invoice} /> download summary
                            </Button>
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={5}>
                          <div className="order-minicard">
                            <Row>
                              <h6>Order ID : 125683</h6>
                              <Col>
                                <div className="order-ids">
                                  <p>1 X Food bowl</p>
                                </div>
                              </Col>
                              <Col>
                                <div className="order-ids">
                                  <p>$138.00</p>
                                </div>
                              </Col>
                            </Row>
                            <Row>
                              <Col>
                                <div className="order-ids">
                                  <p>1 X Food bowl</p>
                                </div>
                              </Col>
                              <Col>
                                <div className="order-ids">
                                  <p>$138.00</p>
                                </div>
                              </Col>
                            </Row>
                            <hr />
                            <Row>
                              <h6>Order ID : 125683</h6>
                              <Col>
                                <div className="order-ids">
                                  <p>1 X Food bowl</p>
                                </div>
                              </Col>
                              <Col>
                                <div className="order-ids">
                                  <p>$138.00</p>
                                </div>
                              </Col>
                            </Row>
                            <Row>
                              <Col>
                                <div className="order-ids">
                                  <p>1 X Food bowl</p>
                                </div>
                              </Col>
                              <Col>
                                <div className="order-ids">
                                  <p>$138.00</p>
                                </div>
                              </Col>
                            </Row>
                            <hr />
                            <Row>
                              <h6>Order ID : 125683</h6>
                              <Col>
                                <div className="order-ids">
                                  <p>1 X Food bowl</p>
                                </div>
                              </Col>
                              <Col>
                                <div className="order-ids">
                                  <p>$138.00</p>
                                </div>
                              </Col>
                            </Row>
                            <Row>
                              <Col>
                                <div className="order-ids">
                                  <p>1 X Food bowl</p>
                                </div>
                              </Col>
                              <Col>
                                <div className="order-ids">
                                  <p>$138.00</p>
                                </div>
                              </Col>
                            </Row>
                          </div>
                        </Col>
                        <Col lg={7} className="align-self-center">
                          <div className="order-table">
                            <Table responsive>
                              <tbody>
                                <tr>
                                  <th>Sub Total</th>
                                  <td>$50</td>
                                </tr>
                                <tr>
                                  <th>
                                    Moving Cart <br />
                                    <p>Additional Services</p>
                                  </th>
                                  <td>$10</td>
                                </tr>
                                <tr>
                                  <th>
                                    Discount <br />
                                    <p>Promo Code: 554dffd</p>
                                  </th>
                                  <td>$20</td>
                                </tr>
                                <tr>
                                  <th>Total</th>
                                  <td>$138.00</td>
                                </tr>
                              </tbody>
                            </Table>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </div>
                  <div className="needplace">
                    <Row>
                      <Col lg={4}>
                        <div className="order-details">
                          <h5>Order Details</h5>
                          <h6>ORDER NUMBER</h6>
                          <p>4797290627</p>
                          <h6>PAYMENT</h6>
                          <p>Paid: Using Upi</p>
                          <h6>Date</h6>
                          <p>10 Feb 2023 10:20 AM</p>
                          <h6>Phone Number</h6>
                          <p>10 Feb 2023 10:20 AM</p>
                          <h6>Deliver To</h6>
                          <p>10 Feb 2023 10:20 AM</p>
                        </div>
                        <p>Calll</p>
                        <div className="order-details-cards">
                          <div>
                            <h5>Nity Make</h5>
                            <p>+91 000000000</p>
                          </div>
                          <div>
                            <img src={icon} />
                          </div>
                        </div>
                      </Col>
                      <Col lg={8}>
                        <div className="order-main-deals">
                          <img src={orders} />
                        </div>
                      </Col>
                    </Row>
                  </div>
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
                    <Col lg={4} className="mb-4">
                      <div className="order-card order-bg1">
                        <div className="order-status">
                          <h6>Completed</h6>
                        </div>
                        <div className="order-content">
                          <Row>
                            <Col sm={3}>
                              <div className="dash-logo">
                                <img src={logo} />
                              </div>
                            </Col>
                            <Col sm={7}>
                              <div className="dashCard-detail">
                                <h6>
                                  Order ID : <span>123456</span>
                                </h6>
                                <p>
                                  Payment status : <span>Completed</span>
                                </p>
                                <p>
                                  Order By : <span>Sales Man</span>
                                </p>
                              </div>
                            </Col>
                            <Col sm={2}>
                              <div className="dashcard-text">
                                <h6>$138.00</h6>
                                <p>2+ more</p>
                              </div>
                            </Col>
                          </Row>
                          <p>sales Man</p>
                          <div className="dash-review">
                            <h6>Nity Make</h6>
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
                            <p>
                              Lorem Ipsum is simply dummy text of the printing
                              and typesetting
                            </p>
                          </div>
                        </div>
                        <div className="text-center mt-3">
                          <Button>Detail Order</Button>
                        </div>
                      </div>
                    </Col>
                    <Col lg={4} className="mb-4">
                      <div className="order-card order-bg2">
                        <div className="order-status">
                          <h6>Pending</h6>
                        </div>
                        <div className="order-content">
                          <Row>
                            <Col sm={3}>
                              <div className="dash-logo">
                                <img src={logo} />
                              </div>
                            </Col>
                            <Col sm={7}>
                              <div className="dashCard-detail">
                                <h6>
                                  Order ID : <span>123456</span>
                                </h6>
                                <p>
                                  Payment status : <span>Completed</span>
                                </p>
                                <p>
                                  Order By : <span>Sales Man</span>
                                </p>
                              </div>
                            </Col>
                            <Col sm={2}>
                              <div className="dashcard-text">
                                <h6>$138.00</h6>
                                <p>2+ more</p>
                              </div>
                            </Col>
                          </Row>
                          <p>sales Man</p>
                          <div className="dash-review">
                            <h6>Nity Make</h6>
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
                            <p>
                              Lorem Ipsum is simply dummy text of the printing
                              and typesetting
                            </p>
                          </div>
                        </div>
                        <div className="text-center mt-3">
                          <Button>Detail Order</Button>
                        </div>
                      </div>
                    </Col>
                    <Col lg={4} className="mb-4">
                      <div className="order-card order-bg3">
                        <div className="order-status">
                          <h6>Pending</h6>
                        </div>
                        <div className="order-content">
                          <Row>
                            <Col sm={3}>
                              <div className="dash-logo">
                                <img src={logo} />
                              </div>
                            </Col>
                            <Col sm={7}>
                              <div className="dashCard-detail">
                                <h6>
                                  Order ID : <span>123456</span>
                                </h6>
                                <p>
                                  Payment status : <span>Completed</span>
                                </p>
                                <p>
                                  Order By : <span>Sales Man</span>
                                </p>
                              </div>
                            </Col>
                            <Col sm={2}>
                              <div className="dashcard-text">
                                <h6>$138.00</h6>
                                <p>2+ more</p>
                              </div>
                            </Col>
                          </Row>
                          <p>sales Man</p>
                          <div className="dash-review">
                            <h6>Nity Make</h6>
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
                            <p>
                              Lorem Ipsum is simply dummy text of the printing
                              and typesetting
                            </p>
                          </div>
                        </div>
                        <div className="text-center mt-3">
                          <Button>Detail Order</Button>
                        </div>
                      </div>
                    </Col>
                    <Col lg={4} className="mb-4">
                      <div className="order-card order-bg1">
                        <div className="order-status">
                          <h6>Completed</h6>
                        </div>
                        <div className="order-content">
                          <Row>
                            <Col sm={3}>
                              <div className="dash-logo">
                                <img src={logo} />
                              </div>
                            </Col>
                            <Col sm={7}>
                              <div className="dashCard-detail">
                                <h6>
                                  Order ID : <span>123456</span>
                                </h6>
                                <p>
                                  Payment status : <span>Completed</span>
                                </p>
                                <p>
                                  Order By : <span>Sales Man</span>
                                </p>
                              </div>
                            </Col>
                            <Col sm={2}>
                              <div className="dashcard-text">
                                <h6>$138.00</h6>
                                <p>2+ more</p>
                              </div>
                            </Col>
                          </Row>
                          <p>sales Man</p>
                          <div className="dash-review">
                            <h6>Nity Make</h6>
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
                            <p>
                              Lorem Ipsum is simply dummy text of the printing
                              and typesetting
                            </p>
                          </div>
                        </div>
                        <div className="text-center mt-3">
                          <Button>Detail Order</Button>
                        </div>
                      </div>
                    </Col>
                    <Col lg={4} className="mb-4">
                      <div className="order-card order-bg2">
                        <div className="order-status">
                          <h6>Pending</h6>
                        </div>
                        <div className="order-content">
                          <Row>
                            <Col sm={3}>
                              <div className="dash-logo">
                                <img src={logo} />
                              </div>
                            </Col>
                            <Col sm={7}>
                              <div className="dashCard-detail">
                                <h6>
                                  Order ID : <span>123456</span>
                                </h6>
                                <p>
                                  Payment status : <span>Completed</span>
                                </p>
                                <p>
                                  Order By : <span>Sales Man</span>
                                </p>
                              </div>
                            </Col>
                            <Col sm={2}>
                              <div className="dashcard-text">
                                <h6>$138.00</h6>
                                <p>2+ more</p>
                              </div>
                            </Col>
                          </Row>
                          <p>sales Man</p>
                          <div className="dash-review">
                            <h6>Nity Make</h6>
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
                            <p>
                              Lorem Ipsum is simply dummy text of the printing
                              and typesetting
                            </p>
                          </div>
                        </div>
                        <div className="text-center mt-3">
                          <Button>Detail Order</Button>
                        </div>
                      </div>
                    </Col>
                    <Col lg={4} className="mb-4">
                      <div className="order-card order-bg3">
                        <div className="order-status">
                          <h6>Pending</h6>
                        </div>
                        <div className="order-content">
                          <Row>
                            <Col sm={3}>
                              <div className="dash-logo">
                                <img src={logo} />
                              </div>
                            </Col>
                            <Col sm={7}>
                              <div className="dashCard-detail">
                                <h6>
                                  Order ID : <span>123456</span>
                                </h6>
                                <p>
                                  Payment status : <span>Completed</span>
                                </p>
                                <p>
                                  Order By : <span>Sales Man</span>
                                </p>
                              </div>
                            </Col>
                            <Col sm={2}>
                              <div className="dashcard-text">
                                <h6>$138.00</h6>
                                <p>2+ more</p>
                              </div>
                            </Col>
                          </Row>
                          <p>sales Man</p>
                          <div className="dash-review">
                            <h6>Nity Make</h6>
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
                            <p>
                              Lorem Ipsum is simply dummy text of the printing
                              and typesetting
                            </p>
                          </div>
                        </div>
                        <div className="text-center mt-3">
                          <Button>Detail Order</Button>
                        </div>
                      </div>
                    </Col>
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
                        <h1>$143,421.20</h1>
                        <Button>+ Add Balance</Button>
                      </div>
                    </Col>
                  </Row>
                </div>
                <div className="needplace">
                  <Row className="justify-content-center">
                    <Col lg={6}>
                      <div className="Withdrawal-card">
                        <Button>Withdrawal Amount</Button>
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
      <Wholesallerfooter />
    </>
  );
}

export default Petshopdashboard;
