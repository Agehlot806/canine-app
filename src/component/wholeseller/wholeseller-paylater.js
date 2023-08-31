import React, { useEffect, useState, useRef } from "react";
import Wholeheader from "../../directives/wholesalesheader";
import { Col, Container, Row, Button, Table } from "react-bootstrap";
import productdetail from "../../assets/images/banner/productdetail.png";
import brandPro1 from "../../assets/images/img/brandPro1.png";
import logo from "../../assets/images/logo.png";
import invoice from "../../assets/images/icon/invoice.png";
import icon from "../../assets/images/icon/pro.png";
import orders from "../../assets/images/img/orders.png";
import cart from "../../assets/images/icon/cart.png";
import axios from "axios";
import { BASE_URL } from "../../Constant/Index";
import { Link } from "react-router-dom";
import Wholesallerfooter from "../../directives/wholesaller-Footer";

function WholeSellerPayLater() {
  // storedWholesellerId
  const storedWholesellerId = Number(localStorage.getItem("UserWholesellerId"));
  console.log("storedWholesellerId: ", storedWholesellerId);
  // ----------------------------------------

  useEffect(() => {
    allAddressList();
    allOrders();
  }, []);

  const [addresslist, setaddresslist] = useState([]);
  const [allorder, setallorder] = useState([]);

  const allAddressList = async () => {
    axios
      .get(`${BASE_URL}/customer/address/list/${storedWholesellerId}`)
      .then((response) => {
        console.log(response);
        console.log("address list Successful");
        setaddresslist(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const allOrders = async () => {
    axios
      .get(`${BASE_URL}/customer/order/list?id=${storedWholesellerId}`)
      .then((response) => {
        console.log(response);
        console.log("Order List Successful");
        setallorder(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getDateFromCreatedAt = (createdAt) => {
    const dateObject = new Date(createdAt);
    return dateObject.toLocaleDateString();
  };

  return (
    <>
      <Wholeheader />
      <Container fluid className="p-0">
        <div className="all-bg">
          <img src={productdetail} />
        </div>
      </Container>

      {/* <section className="section-padding">
        <Container>
          <div className="add-cart">
            {allorder && allorder.length > 0 ? (
              allorder.map((item, index) => (
                <div className="myorder-list">
                  <Row className="justify-content-center">
                    <Col lg={2}>
                      <img src={logo} />
                    </Col>
                    <Col lg={6}>
                      <h3>Order Id: {item.id}</h3>
                      <h3>Date: {getDateFromCreatedAt(item.created_at)}</h3>
                      <h3>Payment Method: {item.payment_method}</h3>
                      <h3>Order Amount: ₹{item.order_amount}</h3>
                    </Col>

                    <Col lg={2} className="align-self-center">
                      <div className="myorder-btn">
                        <Button>
                          <Link to={`/order-view-details/${item.id}`}>
                            View
                          </Link>
                        </Button>
                        <Button>
                          <Link to="/track-your-order">Track</Link>
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </div>
              ))
            ) : (
              <p className="emptyMSG">No Order list</p>
            )}
          </div>
        </Container>
      </section> */}

      <section className="section-padding">
        <Container>
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
              {/* <Col lg={7}> */}
              <Col lg={7} className="d-flex justify-content-center">
                <div className="product-details text-center">
                  <div>
                    <h5>Canine Pay Later</h5>
                    <p>Your total approved credit is ₹ 10,0000</p>
                  </div>
                </div>
              </Col>
              {/* <div>
                  <h5>Canine Pay Later</h5>
                  <p>Your total approved credit is 10,0000</p>
                </div> */}
              {/* </Col> */}
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
                        <th>Utilised Credit</th>
                        <td>₹0</td>
                      </tr>
                      <tr>
                        <th>Available Credit</th>
                        <td>₹10,0000</td>
                      </tr>
                      <tr>
                        <th>Total Approved Credit</th>
                        <td>₹10,0000</td>
                      </tr>
                      <tr>
                        {/* <th>(All due are debited on 5th of each month)</th> */}
                        {/* <td>₹138.00</td> */}
                      </tr>
                    </tbody>
                  </Table>
                  <p className="d-flex justify-content-center">
                    (All due are debited on 5th of each month)
                  </p>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </section>
      {/* <section className="section-padding">
        <Container>
          <h1 className="main-head text-center mb-3">Order Details</h1>
          <div className="order-area-detials">
            <Row>
              <Col lg={4}>
                <div className="order-details">
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
              </Col>
              <Col lg={8} className="align-self-center">
                <div className="order-details">
                  <h4>Address</h4>
                  <p>
                    {addresslist && addresslist.length > 1 ? (
                      addresslist.map(
                        (item, index) =>
                          index === 0 && (
                            <p key={item.id}>
                              {item.house_no} {item.area} {item.landmark}{" "}
                              {item.city} {item.state} {item.pincode}
                            </p>
                          )
                      )
                    ) : (
                      <p>No data to display</p>
                    )}
                  </p>
                  <h4>shipping Address</h4>
                  <p>
                    {addresslist && addresslist.length > 1 ? (
                      addresslist.map(
                        (item, index) =>
                          index === 1 && (
                            <p key={item.id}>
                              {item.house_no} {item.area} {item.landmark}{" "}
                              {item.city} {item.state} {item.pincode}
                            </p>
                          )
                      )
                    ) : (
                      <p>No data to display</p>
                    )}
                  </p>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </section> */}
      {/* <section className="section-padding">
        <Container>
          <Row>
            <Col lg={6} className="align-self-center">
              <div className="Re-order">
                <Button>Re Order</Button>
              </div>
            </Col>
            <Col lg={6}>
              <div className="order-main-deals">
                <img src={orders} />
              </div>
            </Col>
          </Row>
        </Container>
      </section> */}
      <Wholesallerfooter />
    </>
  );
}

export default WholeSellerPayLater;