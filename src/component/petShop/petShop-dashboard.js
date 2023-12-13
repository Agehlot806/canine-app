import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../Constant/Index";
import HomeImg from "../../assets/images/img/home.png";
import { Col, Container, Row, Button, Form, Nav, Table } from "react-bootstrap";
import logo from "../../assets/images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import catpng from "../../assets/images/img/catpng.png";
import bannerPro from "../../assets/images/img/bannerPro.png";
import paydone from "../../assets/images/icon/paydone.png";
import PetShopHeader from "../../directives/petShopHeader";
import Petshopfooter from "../../directives/petShop-Footer";
import toast, { Toaster } from "react-hot-toast";
import Fade, { Flip } from "react-reveal";
import loadinggif from "../../assets/images/video/loading.gif";

function Petshopdashboard() {
  const navigate = useNavigate();
  const storedWholesellerId = Number(localStorage.getItem("UserWholesellerId"));
  const [totalorder, settotalorder] = useState([]);
  const [homebanner, sethomebanner] = useState([]);
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    Promise.all([totalOrders(), AllBanner(), WholesellerData()])
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
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
  const [totalUnpaidAmount, setTotalUnpaidAmount] = useState(0);
  // storedUserId
  const walletBalance = localStorage.getItem("wallet_balance");
  useEffect(() => {
    // Calculate the total unpaid amount whenever totalorder changes
    let unpaidAmount = 0;
    totalorder.forEach((item) => {
      if (item.payment_status === "unpaid") {
        unpaidAmount += parseFloat(item.order_amount.replace(/,/g, ""));
      }
    });
    setTotalUnpaidAmount(unpaidAmount);
  }, [totalorder]);
  const walletPayClick = () => {
    const data = {
      order_id: idItem.id,
      user_id: storedWholesellerId,
      amount: 0,
      pay_mode: "offline",
    };
    axios
      .post(`${BASE_URL}/auth/pay_amount`, data)
      .then((response) => {
        console.log("responseqqqq: ", response);

        if (response.status === 200) {
          // setResponseMessagePA(response.data.message);
          toast.success("Payment Successfully Completed");
          window.location.reload(false);
        } else if (response.status === 201) {
          toast.error(response.data.message);
        }
      })

      .catch((error) => {
        toast.error("The email field is required");
      });
  };
  const [amount, setAmount] = useState([]);
  // const handleAddAmount = () => {
  //   // Make a POST request to the API
  //   axios
  //     .post(`${BASE_URL}/auth/add_amount`, {
  //       user_id: storedWholesellerId,
  //       amount: 0,
  //     })
  //     .then((response) => {
  //       // Handle the response as needed
  //       toast.success("Payment Add Wallet Successfully");
  //       console.log("POST request was successful:", response.data);
  //     })
  //     .catch((error) => {
  //       // Handle errors
  //       toast.error("The email field is required");
  //       console.error("POST request failed:", error);
  //     });
  // };
  // Razorpay
  const loadRazorpayScript = () => {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = resolve;
      script.onerror = reject;
      document.body.appendChild(script);
    });
  };
  const [paymentId, setPaymentId] = useState("");
  const handlePayment = async () => {
    try {
      await loadRazorpayScript();

      const options = {
        key: "rzp_test_yXpKwsLWjkzvBJ", // Replace with your actual key
        amount: "100", // Amount in paise (100 INR)
        currency: "INR",
        name: "ritik vyas",
        description: "Test Payment",
        image: "https://your_logo_url.png",
        // order_id: response.id, // Order ID obtained from Razorpay
        handler: (response) => {
          setPaymentId(response.razorpay_payment_id);
          handleAddAmount();
          // Handle the success callback
          // window.location.href = "/shipping";
          toast.success("Unpaid Amount Payment Add Successfully Paylater");
          console.log("Payment Successful:", response);
        },

        prefill: {
          email: "test@example.com",
          contact: "1234567890",
        },
        notes: {
          address: "1234, Demo Address",
        },
        theme: {
          color: "#F37254",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error("Razorpay Load Error:", error);
    }
  };
  // Razorpay
  const AllBanner = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/categories/banner`);
      sethomebanner(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOrderHistory = (id) => {
    // navigate(`/petShop-order-view-details/${id}`);
    navigate(
      `/petShop-order-view-details/?id=${item.id}&status=${
        item.payment_status ?? "not found"
      }`
    );
  };
  const [idItem, setIdItem] = useState("");
  const SaveItemId = (item) => {
    setIdItem(item);
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
  console.log("totalorderrrrr: ", totalorder);
  const deliveredOrders = totalorder.filter(
    (order) => order.order_status === "delivered"
  );
  const pendingOrders = totalorder.filter(
    (order) => order.order_status === "pending"
  );
  const gradientColors = [
    "linear-gradient(180deg, #eef 70%, rgba(238, 238, 255, 0) 100%)",
    "linear-gradient(180deg, #ffead2 0%, rgba(255, 234, 210, 0) 100%)",
    "linear-gradient(180deg, #fecbcd 0%, rgba(254, 203, 205, 0) 100%)",
  ];

  const [data, setData] = useState([]);
  const WholesellerData = () => {
    fetch(`${BASE_URL}/auth/wholesaler_orders/${storedWholesellerId}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  return (
    <>
      <Toaster />
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
                <ul
                  className="nav nav-pills mb-3"
                  id="pills-tab"
                  role="tablist"
                >
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      id="totalorder-tab"
                      data-toggle="pill"
                      href="#totalorder"
                      role="tab"
                      aria-controls="totalorder"
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
                      id="completeorder-tab"
                      data-toggle="pill"
                      href="#completeorder"
                      role="tab"
                      aria-controls="completeorder"
                      aria-selected="false"
                    >
                      <h3>Completed Order</h3>
                      <h5>{deliveredOrders.length}</h5>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      id="pendindorder-tab"
                      data-toggle="pill"
                      href="#pendindorder"
                      role="tab"
                      aria-controls="pendindorder"
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
                      <h3>Unpaid Amount</h3>
                      <h5>{parseInt(totalUnpaidAmount)}</h5>
                    </a>
                  </li>
                </ul>
                <div className="tab-content" id="pills-tabContent">
                  <div
                    className="tab-pane fade show active"
                    id="totalorder"
                    role="tabpanel"
                    aria-labelledby="totalorder-tab"
                  >
                    <div className="needplace">
                      <div className="dash-head">
                        <h1>Total Order</h1>
                      </div>
                      <Row>
                        {totalorder && totalorder.length > 0 ? (
                          totalorder.map((item, index) => {
                            const paymentStatus = item.payment_status;
                            const orderAmount = parseFloat(
                              item.order_amount.replace(/,/g, "")
                            );
                            // Check if payment_status is "paid"
                            const isPaid = paymentStatus === "paid";
                            return (
                              <Col lg={4} sm={6} className="mb-4">
                                <div
                                  className="order-card order-bg1"
                                  style={{
                                    background:
                                      gradientColors[
                                        index % gradientColors.length
                                      ],
                                  }}
                                >
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
                                            Payment status :{" "}
                                            <span>{item.payment_status}</span>
                                          </p>
                                          <p>
                                            Order By :{" "}
                                            <span>
                                              {item.user_id
                                                ? "Wholeseller"
                                                : ""}
                                            </span>
                                          </p>
                                          <p>
                                            Total Amount :{" "}
                                            <span>₹ {item.order_amount}</span>
                                          </p>
                                        </div>
                                      </Col>
                                    </Row>
                                    <p>{item.user_id ? "Wholeseller" : ""}</p>
                                    <div className="dash-review">
                                      {item.callback.map(
                                        (callbackItem, callbackIndex) => (
                                          <h6>{callbackItem.variant}</h6>
                                        )
                                      )}
                                    </div>
                                  </div>
                                  <div className="text-center mt-3">
                                    <Button
                                    // onClick={() => {
                                    //   handleOrderHistory(item.id);
                                    // }}
                                    >
                                      <Link
                                        to={`/petShop-order-view-details/?id=${
                                          item.id
                                        }&status=${
                                          item.payment_status ?? "not found"
                                        }`}
                                      >
                                        Detail Order
                                      </Link>
                                    </Button>
                                    {!isPaid && (
                                      <Button
                                        onClick={() => {
                                          SaveItemId(item);
                                        }}
                                        data-toggle="modal"
                                        data-target="#PayModal"
                                      >
                                        Pay
                                      </Button>
                                    )}
                                  </div>
                                  {/* <div className="text-center mt-3"> */}
                                  {/* </div> */}
                                </div>
                              </Col>
                            );
                          })
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
                                            "https://canine.hirectjob.in/storage/app/" +
                                            item.image
                                          }
                                        />
                                      </div>
                                      <Row className="justify-content-center">
                                        <Col lg={7}>
                                          <div className="new-content">
                                            <div className="Newsletter">
                                              <Flip right>
                                                <h1 className="main-head">
                                                  {item.title}
                                                </h1>
                                              </Flip>
                                              <Form className="d-flex">
                                                <Form.Control
                                                  type="search"
                                                  placeholder="Enter your email"
                                                  className="me-2"
                                                  aria-label="Search"
                                                  value={email}
                                                  onChange={(e) =>
                                                    setEmail(e.target.value)
                                                  }
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
                    id="completeorder"
                    role="tabpanel"
                    aria-labelledby="completeorder-tab"
                  >
                    <div className="needplace">
                      <div className="dash-head">
                        <h1>Completed Order</h1>
                      </div>
                      <Row>
                        {totalorder ? (
                          totalorder.map(
                            (item, index) =>
                              item.order_status == "delivered" && (
                                <Col lg={4} sm={6} className="mb-4">
                                  <div
                                    className="order-card order-bg1"
                                    style={{
                                      background:
                                        gradientColors[
                                          index % gradientColors.length
                                        ],
                                    }}
                                  >
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
                                              Payment status :{" "}
                                              <span>{item.payment_status}</span>
                                            </p>
                                            <p>
                                              Order By :{" "}
                                              <span>
                                                {item.user_id
                                                  ? "Wholeseller"
                                                  : ""}
                                              </span>
                                            </p>
                                            <p>
                                              Total Amount :{" "}
                                              <span>₹ {item.order_amount}</span>
                                            </p>
                                          </div>
                                        </Col>
                                      </Row>
                                      <p>{item.user_id ? "Wholeseller" : ""}</p>
                                      <div className="dash-review">
                                        {item.callback.map(
                                          (callbackItem, callbackIndex) => (
                                            <h6>{callbackItem.variant}</h6>
                                          )
                                        )}
                                        <a>
                                          <i
                                            class="fa fa-star"
                                            aria-hidden="true"
                                          ></i>
                                        </a>
                                        <a>
                                          <i
                                            class="fa fa-star"
                                            aria-hidden="true"
                                          ></i>
                                        </a>
                                        <a>
                                          <i
                                            class="fa fa-star"
                                            aria-hidden="true"
                                          ></i>
                                        </a>
                                        <a>
                                          <i
                                            class="fa fa-star"
                                            aria-hidden="true"
                                          ></i>
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
                                      // onClick={() => {
                                      //   handleOrderHistory(item.id);
                                      // }}
                                      >
                                        <Link
                                          to={`/petShop-order-view-details/?id=${
                                            item.id
                                          }&status=${
                                            item.payment_status ?? "not found"
                                          }`}
                                        >
                                          Detail Order
                                        </Link>
                                      </Button>
                                    </div>
                                  </div>
                                </Col>
                              )
                          )
                        ) : (
                          <p className="emptyMSG">No Pending Order</p>
                        )}
                      </Row>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="pendindorder"
                    role="tabpanel"
                    aria-labelledby="pendindorder-tab"
                  >
                    <div className="needplace">
                      <div className="dash-head">
                        <h1>Pending Order</h1>
                      </div>
                      <Row>
                        {totalorder ? (
                          totalorder.map(
                            (item, index) =>
                              item.order_status == "pending" && (
                                <Col lg={4} sm={6} className="mb-4">
                                  <div
                                    className="order-card order-bg1"
                                    style={{
                                      background:
                                        gradientColors[
                                          index % gradientColors.length
                                        ],
                                    }}
                                  >
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
                                              Payment status :{" "}
                                              <span>{item.payment_status}</span>
                                            </p>
                                            <p>
                                              Order By :{" "}
                                              <span>
                                                {item.user_id
                                                  ? "Wholeseller"
                                                  : ""}
                                              </span>
                                            </p>
                                            <p>
                                              Total Amount :{" "}
                                              <span>₹ {item.order_amount}</span>
                                            </p>
                                          </div>
                                        </Col>
                                      </Row>
                                      <p>{item.user_id ? "Wholeseller" : ""}</p>
                                      <div className="dash-review">
                                        {item.callback.map(
                                          (callbackItem, callbackIndex) => (
                                            <h6>{callbackItem.variant}</h6>
                                          )
                                        )}
                                        <a>
                                          <i
                                            class="fa fa-star"
                                            aria-hidden="true"
                                          ></i>
                                        </a>
                                        <a>
                                          <i
                                            class="fa fa-star"
                                            aria-hidden="true"
                                          ></i>
                                        </a>
                                        <a>
                                          <i
                                            class="fa fa-star"
                                            aria-hidden="true"
                                          ></i>
                                        </a>
                                        <a>
                                          <i
                                            class="fa fa-star"
                                            aria-hidden="true"
                                          ></i>
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
                                      // onClick={() => {
                                      //   handleOrderHistory(item.id);
                                      // }}
                                      >
                                        <Link
                                          to={`/petShop-order-view-details/?id=${
                                            item.id
                                          }&status=${
                                            item.payment_status ?? "not found"
                                          }`}
                                        >
                                          Detail Order
                                        </Link>
                                      </Button>
                                    </div>
                                  </div>
                                </Col>
                              )
                          )
                        ) : (
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
                            <h5>Unpaid Amount</h5>
                            <h1>{parseInt(totalUnpaidAmount)}</h1>
                            {/* <div class="input-group">
                          <div class="input-group-prepend">
                            <div class="input-group-text">₹</div>
                          </div>
                          <input
                            class="form-control"
                            id="inlineFormInputGroupUsername"
                            placeholder="Add Balance"
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                          />
                        </div>
                        <Button onClick={() => handlePayment()}>
                          + Add Balance
                        </Button> */}
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </div>
              </div>
            </Container>
          </section>
        </>
      )}

      <Petshopfooter />
      {/* Pay Modal */}
      <div
        className="modal fade"
        id="PayModal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <div className="payment-done">
                <div className="select-card select-card3">
                  <div className="selct-card-text">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="exampleRadios"
                      data-dismiss="modal"
                      onClick={() => handlePayment()}
                    />
                    <p>Online Payment</p>
                  </div>
                </div>
                {/* <div className="select-card select-card3">
                   <div className="selct-card-text">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="exampleRadios"
                      data-dismiss="modal"
                      onClick={() => walletPayClick()}
                    />
                    <p>wallet</p>
                  </div> 
                </div>*/}
                <Button
                  // disabled={!selectedInput}
                  // data-toggle="modal"
                  // data-target="#paysubmit"
                  data-toggle="modal"
                  data-target="#PayModal"
                  data-dismiss="modal"
                >
                  <Link>Close</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Petshopdashboard;
