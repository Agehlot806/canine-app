import React from "react";
import "../../assets/css/order-tracker.css";
import Newheader from "../../directives/newheader";
import Footer from "../../directives/footer";
import { Button, Col, Container, Row, Card, CardBody } from "react-bootstrap";
import { useState ,useEffect} from "react";
import { useParams } from "react-router-dom";

export default function Trackyourorder() {
  const { id } = useParams();
  const [trackingValue, setTrackingValue] = useState([]);
  useEffect(() => {
    if (id) {
      setTrackingValue(id);
    }
  }, [id]);
  const handleInputChange = (e) => {
    setTrackingValue(e.target.value);
  };
  const [trankershowData, settrankershowData] = useState(false);
  const [steps, setSteps] = useState([
    'Pending',
    'Confirmed',
    'Processing',
    'Handover',
    'Picked Up',
    'Delivered'
  ]);
  const [orderData, setOrderData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const trackingtargetvaluenumber = () => {
    // Fetch order data from an API endpoint
    fetch(`https://canine.hirectjob.in/api/v1/customer/order/tracking/${trackingValue}`)
      .then(response => response.json())
      .then(data => {
        setOrderData(data.data[0]);
        setIsLoading(false);
        settrankershowData(!trankershowData)
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      });
  };
  const getCurrentStepIndex = () => {
    if (orderData.delivered_status === 'delivered') {
      return steps.length;
    }
    else if (orderData.picked_up && new Date(orderData.picked_up) <= new Date()) {
      return 5; // Delivered
    }
    else if (orderData.handover && new Date(orderData.handover) <= new Date()) {
      return 4; // Picked Up
    }
    else if (orderData.processing && new Date(orderData.processing) <= new Date()) {
      return 3; // Handover
    }
    else if (orderData.confirmed && new Date(orderData.confirmed) <= new Date()) {
      return 2; // Processing
    }
    else if (orderData.pending && new Date(orderData.pending) <= new Date()) {
      return 1; // Confirmed
    } else {
      return 0; // Pending
    }
  };
  const handleButtonClick = () => {
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
                    <input placeholder="Please Enter your tracking number" type="text" className="me-2 form-control" value={trackingValue}
                      onChange={handleInputChange} />
                    <button type="button" className="btn" onClick={trackingtargetvaluenumber}>Track</button>
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
                          width: (getCurrentStepIndex() - 1) / (steps.length - 1) * 100 + '%',
                          backgroundColor: 'blue',
                        }}
                      ></div>
                      <ul id="progress-num">
                        {steps.map((step, index) => (
                          <li
                            key={index}
                            className={`step ${index === 0 ? 'active' : ''} ${index < getCurrentStepIndex() ? 'active' : ''}`}
                          >
                            {/* {step} */}
                          </li>
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
                            className={`d-flex flex-column ${index === getCurrentStepIndex() - 1 ? 'align-items-center' : 'align-items-' +
                              (index < getCurrentStepIndex() - 1 ? 'start' : 'end')
                              }`}
                          >
                            {step === 'Picked Up' && orderData.picked_up ? (
                              <span>{orderData.picked_up} - Picked Up</span>
                            ) : (
                              <span>{orderData[step.toLowerCase()]} - {step}</span>
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
