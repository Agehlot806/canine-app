import React, { useEffect, useState, useRef } from "react";
import Newheader from "../../directives/newheader";
import { Col, Container, Row, Button, Table } from "react-bootstrap";
import productdetail from "../../assets/images/banner/productdetail.png";
import brandPro1 from "../../assets/images/img/brandPro1.png";
import logo from "../../assets/images/logo.png";
import invoice from "../../assets/images/icon/invoice.png";
import icon from "../../assets/images/icon/pro.png";
import orders from "../../assets/images/img/orders.png";
import Footer from "../../directives/footer";
import cart from "../../assets/images/icon/cart.png";
import axios from "axios";
import { BASE_URL } from "../../Constant/Index";
import { Link, useParams } from "react-router-dom";
import moment from "moment";

function Shipping() {
  // storedUserId
  const customer_id = localStorage.getItem("userInfo");
  console.log("=======>>>>>> id", customer_id);
  let storedUserId = JSON.parse(customer_id);
  console.log("customer_id: ", customer_id);
  // ----------------------------------------

  useEffect(() => {
    allAddressList();
    allOrders();
  }, []);

  const { id } = useParams();
  console.log("id: ", id);

  const [addresslist, setaddresslist] = useState([]);
  const [allorder, setallorder] = useState([]);

  const allAddressList = async () => {
    axios
      .get(`${BASE_URL}/customer/address/list/${storedUserId}`)
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
      .get(`${BASE_URL}/customer/order/list?id=${storedUserId}`)
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

  // const Alldatamodeler1 = () => {
  //     fetch(` https://sahadev.techpanda.art/api/cta-filter/${loginIduser}`)
  //       .then((Response) => Response.json())
  //       .then((response) => {
  //         console.log("tarun categorys", response);
  //         setMyactivity1(response.results)
  //       }).catch((error) => {
  //         console.log("error", error);
  //       })
  //   }

  return (
    <>
      <Newheader />
      <Container fluid className="p-0">
        <div className="all-bg">
          <img src={productdetail} />
        </div>
      </Container>

      <section className="section-padding">
        <Container>
          <div className="add-cart">
            {allorder && allorder.length > 0 ? (
              allorder.map((item, index) => (
                <div className="myorder-list">
                  <Row className="justify-content-center">
                    <Col lg={2} sm={2}>
                      <img src={logo} />
                    </Col>
                    <Col lg={6} sm={6}>
                      <h3>Order Id: {item.id}</h3>
                      <h3>Date: {getDateFromCreatedAt(item.created_at)}</h3>
                      <h3>Payment Method: {item.payment_method}</h3>
                      <h3>Order Amount: ₹{item.order_amount}</h3>
                    </Col>

                    <Col lg={4} sm={4} className="align-self-center">
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
      </section>

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
        </Container>
      </section>
      <section className="section-padding">
        <Container>
          <h1 className="main-head text-center mb-3">Order Details</h1>
          <div className="order-area-detials">
            <Row>
              <Col lg={4} sm={4}>
                <div className="order-details">
                  {allorder && allorder.length > 0 ? (
                    allorder.map((item, index) => {
                      console.log("Desired ID:", id);
                      console.log("Item ID:", item.id);
                      // Convert item.created_at to a JavaScript Date object
                      const createdDate = new Date(item.created_at);

                      // Calculate the 7th day date after item.created_at
                      const seventhDayDate = new Date(createdDate);
                      seventhDayDate.setDate(createdDate.getDate() + 7);

                      if (item.id == id) {
                        console.log("Match found for ID:", id);
                        return (
                          <div key={index}>
                            <>
                              <h6>ORDER NUMBER</h6>
                              <p>{item.id}</p>
                              <h6>PAYMENT</h6>
                              <p>Paid: Using Upi</p>
                              <h6>Date</h6>
                              <p>
                                {moment(item.created_at).format("YYYY-MM-DD")}
                              </p>
                              <h6>Phone Number</h6>
                              <p>{item.phone || "number not available"}</p>
                              <h6>Deliver To</h6>
                              <p>{seventhDayDate.toDateString()}</p>
                            </>
                          </div>
                        );
                      } else {
                        console.log("No match for ID:", id);
                        return null; // If no match, return null or an empty fragment
                      }
                    })
                  ) : (
                    <p className="emptyMSG">No Order list</p>
                  )}
                </div>
              </Col>
              <Col lg={8} sm={8} className="align-self-center">
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
                {/* <div className='order-main-deals'>
                                <img src={orders} />
                            </div> */}
              </Col>
            </Row>
          </div>
        </Container>
      </section>
      <section className="section-padding">
        <Container>
          <Row>
            <Col lg={6} sm={6} className="align-self-center">
              <div className="Re-order">
                <Button>Re Order</Button>
              </div>
            </Col>
            <Col lg={6} sm={6}>
              <div className="order-main-deals">
                <img src={orders} />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <Footer />
    </>
  );
}

export default Shipping;
