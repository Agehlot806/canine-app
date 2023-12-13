import React, { useEffect, useState } from "react";
import HomeImg from "../../assets/images/img/home.png";
import { Col, Container, Row, Button, Form, Nav, Table } from "react-bootstrap";
import logo from "../../assets/images/logo.png";
import icon from "../../assets/images/icon/pro.png";
import arrow from "../../assets/images/icon/arrow.png";
import pro from "../../assets/images/icon/pro.png";
import filter from "../../assets/images/icon/filter.png";
import orders from "../../assets/images/img/orders.png";
import Petshopfooter from "../../directives/petShop-Footer";
import { Link, useNavigate } from "react-router-dom";
import invoice from "../../assets/images/icon/invoice.png";
import axios from "axios";
import { BASE_URL } from "../../Constant/Index";
import moment from "moment";
import PetShopHeader from "../../directives/petShopHeader";
import loadinggif from "../../assets/images/video/loading.gif";

function DashboadSalesman() {
  const navigate = useNavigate();
  const [wholeSellerList, setWholeSellerList] = useState([]);
  const [orderList, setOrderList] = useState([]);
  const [homebanner, sethomebanner] = useState([]);
  const [completedOders, setCompletedOders] = useState([]);
  const [totalTransactions, setTotalTransactions] = useState(0);
  const salesmanId = localStorage.getItem("salesmanId");
  const zoneId = localStorage.getItem("zoneId");
  useEffect(() => {}, []);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    Promise.all([
      getWholesellerList(),
      getOrders(),
      AllBanner(),
      allAddressList(),
    ])
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const handleAddProduct = async (item) => {
    await localStorage.setItem("wholeSellerId", item.id);
    await localStorage.setItem("UserWholesellerId", item.id);
    // await localStorage.setItem("verifiedId", item.verified); harsh
    await localStorage.setItem("verifiedId", item.status);

    navigate("/petshop-product");
  };
  const handleOrderHistory = async (item) => {
    await localStorage.setItem("wholeSellerId", item.id);
    await localStorage.setItem("UserWholesellerId", item.id);
    // await localStorage.setItem("verifiedId", item.verified);harsh
    await localStorage.setItem("verifiedId", item.statuss);

    navigate("/petshop-my-orders");
  };

  const getWholesellerList = async () => {
    await axios
      .get(`${BASE_URL}/auth/wholesaler_list/${zoneId}`)
      .then((res) => {
        setWholeSellerList(res.data.data);
        console.log("res in list", res);
      })
      .catch((error) => {
        console.log("Error in whol list", error);
      });
  };
  const storedWholesellerId = Number(localStorage.getItem("UserWholesellerId"));

  const [addresslist, setAddressList] = useState([]);
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
  const getOrders = async () => {
    await axios
      .get(`${BASE_URL}/auth/seller_orders/${salesmanId}`)
      .then((res) => {
        console.log("res in orderList", res);
        if (res.data.status === "200") {
          setOrderList(res.data.data);
          const orderList = res.data.data;
          const completeOrdes = orderList.filter((el) => {
            return el.delivered !== null;
          });
          setCompletedOders(completeOrdes);
          let subtotal = 0;
          for (let index = 0; index < orderList.length; index++) {
            const element = orderList[index];
            let total = parseInt(element.order_amount);
            // +
            // parseInt(element.total_tax_amount) -
            // parseInt(element.coupon_discount_amount);
            if (subtotal === 0) {
              subtotal = total;
            } else {
              subtotal = total + subtotal;
            }
          }
          setTotalTransactions(subtotal);

          console.log("subtotal", subtotal);
        }
      })
      .catch((error) => {
        console.log("error in orderList", error);
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

  const gradientColors = [
    "linear-gradient(180deg,#c6ecfc 0%,rgba(198, 236, 252, 0.43) 100%)",
    "linear-gradient(180deg, #eef 0%, rgba(238, 238, 255, 0.45) 100%)",
    "linear-gradient(180deg,#ffead2 0%,rgba(255, 234, 210, 0.33) 100%)",
  ];

  return (
    <>
      <PetShopHeader type={"salesman"} />
      {loading ? (
        <section className="section-padding mt-3 mb-3">
          <div className="loaderimg text-center text-black mb-4">
            <img src={loadinggif} alt="" />
            <h5>Please Wait.......</h5>
          </div>
        </section>
      ) : (
        <>
          <div className="home-section">
            {homebanner
              ? homebanner.map(
                  (item, index) =>
                    item.type === "common" && (
                      <Link to={item.default_link}>
                        <img
                          className="partner-img"
                          src={
                            "https://canine.hirectjob.in//storage/app/" +
                            item.image
                          }
                        />
                      </Link>
                    )
                )
              : null}
          </div>
          <section className="section-padding">
            <Container>
              <div className="dash-tabs">
                <ul
                  className="nav nav-pills mb-3"
                  id="pills-tab"
                  role="tablist"
                >
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      id="total-wholeseller-tab"
                      data-toggle="pill"
                      href="#total-wholeseller"
                      role="tab"
                      aria-controls="total-wholeseller"
                      aria-selected="true"
                    >
                      <h3>Total Wholeseller</h3>
                      <h5>{wholeSellerList?.length}</h5>
                    </a>
                  </li>
                  {/* <li className="nav-item">
                    <a
                      className="nav-link"
                      id="transaction-tab"
                      data-toggle="pill"
                      href="#transaction"
                      role="tab"
                      aria-controls="transaction"
                      aria-selected="false"
                    >
                      <h3>Transactions</h3>
                      <h5>
                        ₹{isNaN(totalTransactions) ? 0 : totalTransactions}
                      </h5>
                    </a>
                  </li> */}
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      id="total-order-tab"
                      data-toggle="pill"
                      href="#total-order"
                      role="tab"
                      aria-controls="total-order"
                      aria-selected="false"
                    >
                      <h3>Total order</h3>
                      <h5>{orderList?.length}</h5>
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
                      <h3>Completed Order</h3>
                      <h5>{completedOders?.length}</h5>
                    </a>
                  </li>
                </ul>
                <div className="tab-content" id="pills-tabContent">
                  <div
                    className="tab-pane fade show active"
                    id="total-wholeseller"
                    role="tabpanel"
                    aria-labelledby="total-wholeseller-tab"
                  >
                    <div className="needplace">
                      <div className="dash-head">
                        <h1>Total Wholeseller</h1>
                      </div>

                      <div className="wholeseller-tabs">
                        <Row>
                          <Col lg={6}>
                            <ul
                              className="nav nav-pills mb-3"
                              id="pills-tab"
                              role="tablist"
                            >
                              <li className="nav-item">
                                <a
                                  className="nav-link active"
                                  id="Wholeseller-tab"
                                  data-toggle="pill"
                                  href="#Wholeseller"
                                  role="tab"
                                  aria-controls="Wholeseller"
                                  aria-selected="true"
                                >
                                  Wholeseller
                                </a>
                              </li>
                              <li className="nav-item">
                                <a
                                  className="nav-link"
                                  id="Add New Wholeseller-tab"
                                  data-toggle="pill"
                                  role="tab"
                                  aria-controls="Add New Wholeseller"
                                  aria-selected="false"
                                  onClick={() => {
                                    navigate("/petshop-signup", {
                                      state: {
                                        type: "salesman",
                                        salesmanId: salesmanId,
                                      },
                                    });
                                  }}
                                >
                                  Add New Wholeseller
                                </a>
                              </li>
                            </ul>
                          </Col>
                        </Row>

                        <div className="tab-content" id="pills-tabContent">
                          <div
                            className="tab-pane fade show active"
                            id="Wholeseller"
                            role="tabpanel"
                            aria-labelledby="Wholeseller-tab"
                          >
                            <div className="needplace">
                              <Row>
                                {wholeSellerList.map((item, index) => {
                                  return (
                                    <Col lg={4} className="mb-4">
                                      <div
                                        className="Wholeseller-card wholeseller-bg1 "
                                        style={{
                                          background:
                                            gradientColors[
                                              index % gradientColors.length
                                            ],
                                        }}
                                      >
                                        <div className="wholeseller-status">
                                          <h6>Completed</h6>
                                        </div>
                                        <div className="wholeseller-head-text">
                                          <div>
                                            <Row>
                                              <Col sm={3}>
                                                <div className="wholeseller-logo">
                                                  <img src={logo} />
                                                </div>
                                              </Col>
                                              <Col sm={9}>
                                                <div className="wholeseller-detail">
                                                  <h6>
                                                    {item.f_name +
                                                      " " +
                                                      item.l_name}
                                                  </h6>
                                                  {/* <p>{item.city + "" + item.state + "" + item.pincode}</p> */}
                                                  <p>
                                                    {item.city +
                                                      " " +
                                                      item.state.substring(2) +
                                                      " " +
                                                      item.pincode}
                                                  </p>
                                                </div>
                                              </Col>
                                            </Row>
                                          </div>
                                          <div className="Wholeseller-btn">
                                            <Button
                                              onClick={() => {
                                                handleAddProduct(item);
                                              }}
                                            >
                                              Add Product
                                            </Button>
                                            <Button
                                              onClick={() => {
                                                handleOrderHistory(item);
                                              }}
                                            >
                                              Order History
                                            </Button>
                                          </div>
                                        </div>
                                      </div>
                                    </Col>
                                  );
                                })}
                              </Row>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="transaction"
                    role="tabpane2"
                    aria-labelledby="transaction-tab"
                  >
                    <div className="needplace">
                      <div className="dash-head">
                        <h1>Transactions</h1>
                      </div>
                      <div className="needplace">
                        {orderList
                          ? orderList.map((item) => {
                              return (
                                <div className="Transactions-card">
                                  <Row>
                                    <Col lg={2}>
                                      <img src={pro} />
                                    </Col>
                                    <Col lg={8} className="align-self-center">
                                      <h5>
                                        {item.user_id[0]?.f_name +
                                          " " +
                                          item?.user_id[0]?.l_name}
                                      </h5>
                                      <p>
                                        {moment(item.pending).format("LLL")}
                                      </p>
                                      <p>{`Order Status: ${item.order_status}`}</p>
                                    </Col>
                                    <Col lg={2} className="align-self-center">
                                      <div className="Transactions-icon">
                                        <img src={arrow} />
                                        <h5>
                                          ₹
                                          {parseInt(item.order_amount) +
                                            parseInt(item.total_tax_amount) -
                                            parseInt(
                                              item.coupon_discount_amount
                                            )}
                                        </h5>
                                      </div>
                                    </Col>
                                  </Row>
                                </div>
                              );
                            })
                          : null}
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="total-order"
                    role="tabpane3"
                    aria-labelledby="total-order-tab"
                  >
                    <div className="needplace">
                      <div className="dash-head">
                        <h1>Total Order</h1>
                      </div>
                      <div className="needplace">
                        <div className="needplace">
                          {orderList && orderList.length > 0 ? (
                            orderList.map((item, index) => (
                              <div className="myorder-list">
                                <Row className="justify-content-center">
                                  <Col lg={2}>
                                    <img src={logo} />
                                  </Col>
                                  <Col lg={6}>
                                    <h3>Order Id: {item.id}</h3>
                                    <h3>
                                      Name:{" "}
                                      {item?.user_id[0].f_name +
                                        " " +
                                        item?.user_id[0].l_name}
                                    </h3>
                                    <h3>
                                      Date: {moment(item.pending).format("LLL")}
                                    </h3>
                                    <h3>
                                      Payment Method: {item.payment_method}
                                    </h3>
                                    <h3>
                                      Order Amount: ₹{" "}
                                      {
                                        isNaN(
                                          parseInt(item.order_amount)
                                          //+ parseInt(item.total_tax_amount) -
                                          // parseInt(item.coupon_discount_amount)
                                        )
                                          ? parseInt(item.order_amount)
                                          : parseInt(item.order_amount)
                                        // + parseInt(item.total_tax_amount) -
                                        //   parseInt(item.coupon_discount_amount)
                                      }
                                    </h3>
                                  </Col>

                                  <Col lg={2} className="align-self-center">
                                    <div className="myorder-btn">
                                      <Button>
                                        <a
                                          onClick={() => {
                                            localStorage.setItem(
                                              "UserWholesellerId",
                                              item?.user_id[0]?.id
                                            );
                                            navigate(
                                              `/order-view-details/${item.id}`
                                            );
                                          }}
                                        >
                                          View
                                        </a>
                                      </Button>
                                      <Button>
                                        <Link
                                          to={`/track-your-order/${item.id}`}
                                        >
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
                    id="Balance"
                    role="tabpane3"
                    aria-labelledby="pills-Balance-tab"
                  >
                    <div className="needplace">
                      <div className="dash-head">
                        <h1>Completed Order</h1>
                      </div>
                      <div className="needplace">
                        <div className="needplace">
                          {completedOders && completedOders.length > 0 ? (
                            completedOders.map((item, index) => (
                              <div className="myorder-list">
                                <Row className="justify-content-center">
                                  <Col lg={2}>
                                    <img src={logo} />
                                  </Col>
                                  <Col lg={6}>
                                    <h3>Order Id: {item.id}</h3>
                                    <h3>
                                      Name:{" "}
                                      {item?.user_id[0].f_name +
                                        " " +
                                        item?.user_id[0].l_name}
                                    </h3>
                                    <h3>
                                      Date: {moment(item.pending).format("LLL")}
                                    </h3>
                                    <h3>
                                      Payment Method: {item.payment_method}
                                    </h3>
                                    <h3>
                                      Order Amount: ₹{" "}
                                      {
                                        isNaN(
                                          parseInt(item.order_amount)
                                          //+ parseInt(item.total_tax_amount) -
                                          // parseInt(item.coupon_discount_amount)
                                        )
                                          ? parseInt(item.order_amount)
                                          : parseInt(item.order_amount)
                                        // + parseInt(item.total_tax_amount) -
                                        // parseInt(item.coupon_discount_amount)
                                      }
                                    </h3>
                                  </Col>

                                  <Col lg={2} className="align-self-center">
                                    <div className="myorder-btn">
                                      <Button>
                                        <Link
                                          to={`/order-view-details/${item.id}`}
                                        >
                                          View
                                        </Link>
                                      </Button>
                                      <Button>
                                        <Link to="/track-your-order">
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
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Container>
          </section>
        </>
      )}
      <Petshopfooter />
    </>
  );
}

export default DashboadSalesman;
