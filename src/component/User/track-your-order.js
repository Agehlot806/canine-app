import React from "react";
import "../../assets/css/order-tracker.css";
import {
  // Button,
  MDBCard,
  MDBCardBody,
  MDBCardFooter,
  MDBCardHeader,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import Newheader from "../../directives/newheader";
import Footer from "../../directives/footer";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useState } from "react";

export default function Trackyourorder() {
  const [activetraker, setActivetraker] = useState(1);
  const [trankershowData, settrankershowData] = useState(false);

  const handletrakerNext = () => {
    setActivetraker((prevActive) => Math.min(prevActive + 1, steps.length));
  };
  const handletrakerPrev = () => {
    setActivetraker((prevActive) => Math.max(prevActive - 1, 1));
  };
  const steps = [1, 2, 3, 4]; // Define your steps here

  const handleButtonClick = () => {
    settrankershowData(!trankershowData); 
  };

  return (
    <>
      <Newheader />

 
      <section className="tracker-bg">
        <div className="section-padding tracker-area">
        <Container >
          <Row className="justify-content-center">
            <Col lg={6}>
             
            <div className="tranker-search">
            <h4>Track Your Shipment</h4>
          <form className="d-flex">
            <input placeholder="Please Enter your tracking number" type="text" className="me-2 form-control" />
            <button type="button" className="btn" onClick={handleButtonClick}>{trankershowData ? "Hide Track" : "Show Track"}</button>
          </form>
          </div>
            </Col>
          </Row>
        </Container>
        </div>
      </section>
      {trankershowData && (
      <section className="" style={{ backgroundColor: "#eee" }}>
        <MDBContainer className="py-5 h-100">
          <MDBRow className="justify-content-center align-items-center h-100">
            <MDBCol>
              <MDBCard
                className="card-stepper"
                style={{ borderRadius: "10px" }}
              >
                <MDBCardBody className="p-4">
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex flex-column">
                      <span className="lead fw-normal">
                        Your order has been delivered
                      </span>
                      <span className="text-muted small">
                        by DHFL on 21 Jan, 2020
                      </span>
                    </div>
                    <div>
                      <Button
                        className="cancel-btn"
                        data-toggle="modal"
                        data-target="#cancle-order-Modal"
                      >
                        Cancel Order
                      </Button>
                    </div>
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
                          ((activetraker - 1) / (steps.length - 1)) * 100 + "%",
                      }}
                    ></div>
                    <ul id="progress-num">
                      {steps.map((step, index) => (
                        <li
                          key={index}
                          className={`step ${
                            index < activetraker ? "active" : ""
                          }`}
                        >
                          {step}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="d-flex flex-row justify-content-between align-items-center">
                    <div className="d-flex flex-column align-items-start">
                      <span>15 Mar</span>
                      <span>Order placed</span>
                    </div>
                    <div className="d-flex flex-column justify-content-center">
                      <span>15 Mar</span>
                      <span>Order placed</span>
                    </div>
                    <div className="d-flex flex-column justify-content-center align-items-center">
                      <span>15 Mar</span>
                      <span>Order Dispatched</span>
                    </div>
                    <div className="d-flex flex-column align-items-end">
                      <span>15 Mar</span>
                      <span>Delivered</span>
                    </div>
                  </div>
                  <button
                    id="progress-prev"
                    className="btn"
                    disabled={activetraker === 1}
                    onClick={handletrakerPrev}
                  >
                    Prev
                  </button>
                  <button
                    id="progress-next"
                    className="btn"
                    disabled={activetraker === steps.length}
                    onClick={handletrakerNext}
                  >
                    Next
                  </button>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
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
              <Button className="bordercancle">Cancel</Button>
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

              <div className="selct-cancle">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="exampleRadios"
                    id="exampleRadios1"
                    defaultValue="option1"
                  />
                  <label className="form-check-label" htmlFor="exampleRadios1">
                    Damaged Product
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="exampleRadios"
                    id="exampleRadios2"
                    defaultValue="option2"
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
                    id="exampleRadios2"
                    defaultValue="option2"
                  />
                  <label className="form-check-label" htmlFor="exampleRadios2">
                    Changed My Mind
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="exampleRadios"
                    id="exampleRadios2"
                    defaultValue="option2"
                    data-toggle="modal"
                    data-dismiss="modal"
                    data-target="#exampleModalCenter"
                  />
                  <label className="form-check-label" htmlFor="exampleRadios2">
                    Other
                  </label>
                </div>
              </div>
              <Button className="bordercancle">Cancel</Button>
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
                  />
                </div>
              </div>
              <Button className="bordercancle" data-dismiss="modal">
                Cancel
              </Button>
              <Button>Ok</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
