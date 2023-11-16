import React, { useEffect, useState, useRef } from "react";
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
import { Link, useParams, useNavigate } from "react-router-dom";
import moment from "moment";
import PetShopHeader from "../../directives/petShopHeader";
import Petshopfooter from "../../directives/petShop-Footer";
import loadinggif from "../../assets/images/video/loading.gif";

function PetshopShipping() {
  // storedWholesellerId
  const storedWholesellerId = Number(localStorage.getItem("UserWholesellerId"));
  console.log("storedWholesellerId: ", storedWholesellerId);
  const storedFormattedAddress = localStorage.getItem("formattedAddress");
  console.log("storedFormattedAddress: ", storedFormattedAddress);
  const { mobile } = storedFormattedAddress || {};
  // ----------------------------------------
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    Promise.all([allAddressList(), allOrders()])
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);
  const { id } = useParams();
  console.log("idd: ", typeof id);
  const [addresslist, setAddressList] = useState([]);
  const [allorder, setallorder] = useState([]);

  const allAddressList = async () => {
    axios
      .get(`${BASE_URL}/customer/address/list/${storedWholesellerId}`)
      .then((response) => {
        console.log(response);
        console.log("address list Successful");
        setAddressList(response.data.data);
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
      <PetShopHeader />
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
                        <Col lg={5} sm={5}>
                          <h3>Order Id: {item.id}</h3>
                          <h3>Date: {getDateFromCreatedAt(item.created_at)}</h3>
                          <h3>Payment Method: {item.payment_method}</h3>
                          <h3>Order Amount: ₹{item.order_amount}</h3>
                          <h3>Order Status: {item.order_status}</h3>
                          {item.order_status === "delivered" ? (
                            <div>
                              {item.callback.map((callbackItem) => (
                                <div key={callbackItem.id}>
                                  {callbackItem.user_details &&
                                  callbackItem.user_details.rating > 0 ? (
                                    <div className="solidFA-icon">
                                      {Array.from({
                                        length:
                                          callbackItem.user_details.rating,
                                      }).map((_, index) => (
                                        <i
                                          className="fa-solid fa-star"
                                          key={index}
                                        />
                                      ))}
                                    </div>
                                  ) : (
                                    <div>
                                      <a>
                                        <i className="fa-regular fa-star" />
                                      </a>
                                      <a>
                                        <i className="fa-regular fa-star" />
                                      </a>
                                      <a>
                                        <i className="fa-regular fa-star" />
                                      </a>
                                      <a>
                                        <i className="fa-regular fa-star" />
                                      </a>
                                      <a>
                                        <i className="fa-regular fa-star" />
                                      </a>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div>
                              <a>
                                <i className="fa-regular fa-star" />
                              </a>
                              <a>
                                <i className="fa-regular fa-star" />
                              </a>
                              <a>
                                <i className="fa-regular fa-star" />
                              </a>
                              <a>
                                <i className="fa-regular fa-star" />
                              </a>
                              <a>
                                <i className="fa-regular fa-star" />
                              </a>
                            </div>
                          )}
                        </Col>

                        <Col lg={3} sm={3} className="align-self-center">
                          <div className="myorder-btn">
                            <Button>
                              <Link
                                to={`/petShop-order-view-details/${item.id}`}
                              >
                                View
                              </Link>
                            </Button>
                            <Button>
                              <Link to={`/petShop-track-your-order/${item.id}`}>
                                Track
                              </Link>
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
              <h1 className="main-head text-center mb-3">Order Details</h1>
              <div className="order-area-detials">
                <Row>
                  <Col lg={4}>
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

                          if (parseInt(item.id) == parseInt(id)) {
                            console.log("Match found for ID:", id);
                            return (
                              <div key={index}>
                                <>
                                  <h6>ORDER NUMBER</h6>
                                  <p>{item.id}</p>
                                  <h6>PAYMENT</h6>
                                  <p>Paid: {item.payment_method}</p>
                                  <h6>Date</h6>
                                  <p>
                                    {moment(item.created_at).format(
                                      "YYYY-MM-DD"
                                    )}
                                  </p>
                                  {/* <h6>Phone Number</h6>
                                  <p>{mobile || "number not available"}</p> */}
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
              <Row className="justify-content-center">
                <Col lg={6}>
                  <div className="order-main-deals">
                    <img src={orders} />
                  </div>
                </Col>
              </Row>
            </Container>
          </section>
        </>
      )}
      <Petshopfooter />
    </>
  );
}

export default PetshopShipping;
