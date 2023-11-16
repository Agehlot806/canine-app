import React from "react";
import "../../assets/css/order-tracker.css";
import Footer from "../../directives/footer";
import { Button, Col, Container, Row, Card, CardBody } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../Constant/Index";
import loadinggif from "../../assets/images/video/loading.gif";
import moment from "moment";
import Petshopheader from "../../directives/petShopHeader";

export default function Trackyourorderps() {
  const { id } = useParams();
  // const customer_id = localStorage.getItem("userInfo");
  // let storedUserId = JSON.parse(customer_id);
  const storedWholesellerId = Number(localStorage.getItem("UserWholesellerId"));
  const [canReturnOrder, setCanReturnOrder] = useState(true);
  const [trackingValue, setTrackingValue] = useState([]);
  const [cancelValue, setCancelValue] = useState("");

  useEffect(() => {
    if (id) {
      setTrackingValue(id);
    }
  }, [id]);
  console.log("canReturnOrder", canReturnOrder);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    Promise.all([orderViewdetails()])
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const handleInputChange = (e) => {
    setTrackingValue(e.target.value);
  };
  const [orderDetails, setorderDetails] = useState([]);
  const [trankershowData, settrankershowData] = useState(false);
  const steps = [
    "Pending",
    "Confirmed",
    "Processing",
    "Picked Up",
    "Delivered",
  ];
  const [orderData, setOrderData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isCancelButtonDisabled, setIsCancelButtonDisabled] = useState(false);
  const trackingtargetvaluenumber = () => {
    // Fetch order data from an API endpoint
    fetch(
      `https://canine.hirectjob.in/api/v1/customer/order/tracking/${trackingValue}`
    )
      .then((response) => response.json())
      .then((data) => {
        setOrderData(data.data[0]);
        setIsLoading(false);
        settrankershowData(!trankershowData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  };
  const orderViewdetails = async () => {
    axios
      .get(`${BASE_URL}/customer/order/detail/${id}`)
      .then((response) => {
        console.log("Trackingggggggggggggggggggg", response.data.data);
        console.log("=======>???????????????????????????????? ", response);
        console.log("order Details Successful");
        setorderDetails(response.data.data);
        //       const item_id = response.data.data.item_id;
        // console.log("Item ID:", item_id);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getCurrentStepIndex = () => {
    if (orderData.delivered) {
      return 5; // Delivered
    } else if (orderData.picked_up) {
      return 4; // Picked Up
    } else if (orderData.processing) {
      return 3; // Processing
    } else if (orderData.confirmed) {
      return 2; // Confirmed
    } else if (orderData.pending) {
      return 1; // Confirmed
    } else {
      return 0; // Pending
    }
  };
  const currentStepIndex = getCurrentStepIndex();
  const handleButtonClick = () => {};

  const cancelorders = (e) => {
    e.preventDefault();
    var formData = new FormData();
    // formData.append('username', username);
    formData.append("user_id", storedWholesellerId);
    formData.append("order_id", id);
    formData.append("canceled", cancelValue);
    axios({
      method: "post",
      url: `https://canine.hirectjob.in/api/v1/customer/order/cancel/${id}`,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((response) => {
        console.log("respo", response);
        if (response.status === 200) {
          setIsCancelButtonDisabled(true); // Disable the button
          localStorage.setItem(`orderCancelled_${id}`, "true");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const Canceldata = (e) => {
    setCancelValue(e.target.value);
  };
  useEffect(() => {
    const isOrderCancelled = localStorage.getItem(`orderCancelled_${id}`);
    if (isOrderCancelled === "true") {
      setIsCancelButtonDisabled(true);
    }
  }, []);
  useEffect(() => {
    // Clear the flag on page refresh
    window.addEventListener("beforeunload", () => {
      localStorage.removeItem("orderCancelled_");
    });

    return () => {
      // Remove the event listener when the component unmounts
      window.removeEventListener("beforeunload", () => {});
    };
  }, []);
  const [customerReason, setCustomerReason] = useState("");
  const [customerNote, setCustomerNote] = useState("");
  const [refundMethod, setRefundMethod] = useState("");
  const handleReturnOrder = () => {
    const formData = new FormData();
    formData.append("user_id", storedWholesellerId);
    formData.append("order_id", id);
    formData.append("refund_method", refundMethod);
    formData.append("customer_reason", customerReason);
    formData.append("customer_note", customerNote);
    axios
      .post(
        "https://canine.hirectjob.in/api/v1/customer/order/refund-request",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        console.log("Return order request successful", response.data);
        document.getElementById("returnModal").modal("hide");
      })
      .catch((error) => {
        console.error("Error sending return order request:", error);
        if (error.response) {
          // The request was made and the server responded with a status code
          console.error("Server error data:", error.response.data);
          console.error("Server error status:", error.response.status);
          console.error("Server error headers:", error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.error("No response from server:", error.request);
        } else {
          // Something happened in setting up the request
          console.error("Error setting up the request:", error.message);
        }
      });
  };

  useEffect(() => {
    if (orderData.delivered) {
      const deliveredTime = moment(orderData.delivered);
      const returnTime = deliveredTime.add(2, "days");
      const currentTime = moment();

      if (currentTime.isSameOrAfter(returnTime)) {
        setCanReturnOrder(false);
      }
    }
  }, [orderData.delivered]);
  return (
    <>
      <Petshopheader />
      {loading ? (
        <section className="section-padding mt-3 mb-3">
          <div className="loaderimg text-center text-black mb-4">
            <img src={loadinggif} alt="" />
            <h5>Please Wait.......</h5>
          </div>
        </section>
      ) : (
        <>
          <section className="tracker-bg">
            <div className="section-padding tracker-area">
              <Container>
                <Row className="justify-content-center">
                  <Col lg={6}>
                    <div className="tranker-search">
                      <h4>Track Your Shipment</h4>
                      <form className="d-flex">
                        <input
                          placeholder="Please Enter your tracking number"
                          type="text"
                          className="me-2 form-control"
                          value={trackingValue}
                          onChange={handleInputChange}
                        />
                        <button
                          type="button"
                          className="btn"
                          onClick={trackingtargetvaluenumber}
                        >
                          Track
                        </button>
                        {/* <button type="button" className="btn" onClick={handleButtonClick}>{trankershowData ? "Hide Track" : "Show Track"}</button> */}
                      </form>
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>
          </section>
          {trankershowData && (
            <section className="" style={{ backgroundColor: "#eee" }}>
              <Container className="py-5 h-100">
                <Row className="justify-content-center align-items-center h-100">
                  <Col>
                    <Card
                      className="card-stepper"
                      style={{ borderRadius: "10px" }}
                    >
                      <Card.Body className="p-4">
                        <div className="d-flex justify-content-between align-items-center tranker-head">
                          <div className="d-flex flex-column">
                            <span className="lead fw-normal">
                              Your order has been delivered
                            </span>
                            <span className="text-muted small">
                              by DHFL on 21 Jan, 2020
                            </span>
                          </div>
                          <div>
                            {getCurrentStepIndex() >= 1 &&
                            getCurrentStepIndex() <= 4 ? (
                              <Button
                                className="cancel-btn"
                                data-toggle="modal"
                                data-target="#cancle-order-Modal"
                                disabled={isCancelButtonDisabled}
                              >
                                Cancel Order
                              </Button>
                            ) : canReturnOrder ? (
                              <Button
                                className="cancel-btn"
                                data-toggle="modal"
                                data-target="#returnModal"
                              >
                                Return Order
                              </Button>
                            ) : null}
                            {/* )} */}
                          </div>
                          {/* <div>
                            {canReturnOrder ? (
                              getCurrentStepIndex() >= 1 &&
                              getCurrentStepIndex() <= 4 ? (
                                <Button
                                  className="cancel-btn"
                                  data-toggle="modal"
                                  data-target="#cancle-order-Modal"
                                >
                                  Cancel Order
                                </Button>
                              ) : null
                            ) : (
                              <Button
                                className="cancel-btn"
                                data-toggle="modal"
                                data-target="#returnModal"
                              >
                                Return Order
                              </Button>
                            )}
                          </div> */}
                        </div>

                        <hr className="my-4" />

                        {/* <div className="d-flex flex-row justify-content-between align-items-center align-content-center">
                                        <span className="dot"></span>
                                        <hr className="flex-fill track-line" />
                                        <span className="dot"></span>
                                        <hr className="flex-fill track-line" />
                                        <span className="dot"></span>
                                        <hr className="flex-fill track-line" />
                                        <span className="dot"></span>
                                        <hr className="flex-fill track-line" />
                                        <span className="d-flex justify-content-center align-items-center big-dot dot">
                                            <MDBIcon icon="check text-white" />
                                        </span>
                                    </div> */}
                        <div id="progress">
                          <div
                            id="progress-bar"
                            style={{
                              width:
                                ((getCurrentStepIndex() - 1) /
                                  (steps.length - 1)) *
                                  100 +
                                "%",
                              backgroundColor: "blue",
                            }}
                          ></div>
                          <ul id="progress-num">
                            {steps.map((step, index) => (
                              <li
                                key={index}
                                className={`step ${
                                  index === 0 ? "active" : ""
                                } ${
                                  index < getCurrentStepIndex() ? "active" : ""
                                }`}
                              ></li>
                            ))}
                          </ul>
                        </div>
                        <div className="d-flex flex-row justify-content-between align-items-center tracker-content">
                          {isLoading ? (
                            <p>Loading...</p>
                          ) : (
                            steps.map((step, index) => (
                              <div
                                key={index}
                                className={`d-flex flex-column ${
                                  index === getCurrentStepIndex() - 1
                                    ? "align-items-center"
                                    : "align-items-" +
                                      (index < getCurrentStepIndex() - 1
                                        ? "start"
                                        : "end")
                                }`}
                              >
                                {step === "Picked Up" && orderData.picked_up ? (
                                  <span>
                                    {orderData.picked_up} -<br /> Picked Up
                                  </span>
                                ) : (
                                  <span>
                                    {orderData[step.toLowerCase()]} -<br />
                                    {step}
                                  </span>
                                )}
                              </div>
                            ))
                          )}
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Container>
            </section>
          )}
        </>
      )}

      <Footer />

      {/* Modal */}
      {/* Cancel Order */}
      <div
        className="cancle-orderModal modal fade"
        id="cancle-order-Modal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <h3>Cancel Order</h3>
              <p>Are you sure you want to cancel this order?</p>
              <Button className="bordercancle" data-dismiss="modal">
                Cancel
              </Button>
              <Button
                data-toggle="modal"
                data-dismiss="modal"
                data-target="#cancleconfirmModal"
              >
                Confirm
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {/* Select a reason for order cancellation */}
      <div
        className="cancle-orderModal modal fade"
        id="cancleconfirmModal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <h2>Cancel Order</h2>
              <p>Select a reason for order cancellation:</p>
              <div
                className="selct-cancle"
                value={cancelValue}
                onChange={Canceldata}
              >
                {/* <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="exampleRadios"
                    value="Damaged Product"
                  />
                  <label className="form-check-label" htmlFor="exampleRadios1">
                    Damaged Product
                  </label>
                </div> */}
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="exampleRadios"
                    value=" Late Delivery"
                  />
                  <label className="form-check-label" htmlFor="exampleRadios2">
                    Late Delivery
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="exampleRadios"
                    value="Changed My Mind"
                  />
                  <label className="form-check-label" htmlFor="exampleRadios2">
                    Changed My Mind
                  </label>
                </div>
                <div className="form-check">
                  {/* <input
                    className="form-check-input"
                    type="radio"
                    name="exampleRadios"
                    id="exampleRadios2"
                    data-toggle="modal"
                    data-dismiss="modal"
                    data-target="#exampleModalCenter"
                  /> */}
                  <label
                    className="form-check-label"
                    data-toggle="modal"
                    data-dismiss="modal"
                    data-target="#exampleModalCenter"
                    htmlFor="exampleRadios2"
                  >
                    Other
                  </label>
                </div>
              </div>
              <Button className="bordercancle" data-dismiss="modal">
                Cancel
              </Button>
              <Button
                data-toggle="modal"
                data-dismiss="modal"
                data-target="#cancleconfirmModal"
                onClick={cancelorders}
              >
                Confirm
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {/* Enter Other Reason */}
      <div
        className="cancle-orderModal modal fade"
        id="exampleModalCenter"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <h2>Enter Other Reason</h2>
              <div className="selct-cancle">
                <div className="form-group mt-3 mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter reason"
                    value={cancelValue}
                    onChange={(e) => setCancelValue(e.target.value)}
                  />
                </div>
              </div>
              <Button className="bordercancle" data-dismiss="modal">
                Cancel
              </Button>
              <Button onClick={cancelorders} data-dismiss="modal">
                {" "}
                Ok
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Modal */}
      {/* Return Order Code By Sohel */}
      <div
        class="modal fade"
        id="returnModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="returnModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="returnModalLabel">
                Order Return
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body return-area">
              {orderDetails.map((ob, index) => (
                <div key={index}>
                  <Row>
                    <img
                      src={`https://canine.hirectjob.in///storage/app/public/product/${ob.item_details[0]?.image}`}
                      alt="Item Image"
                    />
                    <h6>Order ID: {ob.order_id}</h6>
                  </Row>
                </div>
              ))}
              <form>
                <div class="form-group">
                  <label for="customerreason">Customer reason</label>
                  <input
                    type="text"
                    class="form-control"
                    id="customerreason"
                    placeholder="Enter reason"
                    onChange={(e) => setCustomerReason(e.target.value)}
                  />
                </div>
                <div class="form-group">
                  <label for="Customernote">Customer note</label>
                  <input
                    type="text"
                    class="form-control"
                    id="Customernote"
                    placeholder="Enter note"
                    onChange={(e) => setCustomerNote(e.target.value)}
                  />
                </div>
                <div class="form-group">
                  <label for="refundmethod">Refund Method</label>
                  <select
                    class="form-control"
                    id="refundmethod"
                    onChange={(e) => setRefundMethod(e.target.value)}
                  >
                    <option>Select Method</option>
                    <option>Cash on Delivery</option>
                    <option>Online Payment</option>
                  </select>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              {/* <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary">Save changes</button> */}
              <button
                type="button"
                class="btn btn-primary"
                onClick={() => handleReturnOrder()}
              >
                Return Order
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Modal End */}
    </>
  );
}
