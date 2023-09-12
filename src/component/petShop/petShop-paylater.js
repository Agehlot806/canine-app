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
import { Link, useParams, useLocation } from "react-router-dom";
import PetShopHeader from "../../directives/petShopHeader";
import Petshopfooter from "../../directives/petShop-Footer";

function PetshopPayLater() {
  const { id } = useParams();
  console.log("id", id);
  const location = useLocation();
  const state = location.state;
  console.log("state: ", state);
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
  const [selectedOption, setSelectedOption] = useState("Select Payment Time");
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOptiontwo, setSelectedOptiontwo] = useState(
    "Select Payment Time"
  );
  const [isDropdownOpentwo, setDropdownOpentwo] = useState(false);
  const [showPaymentModeDropdown, setShowPaymentModeDropdown] = useState(false);
  const [selectedPaymentMode, setSelectedPaymentMode] = useState(null);

  const handleOptionSelect = (option) => {
    if (option !== selectedOption) {
      setSelectedOption(option);
      setDropdownOpen(false);
      setShowPaymentModeDropdown(true);
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  // const handleOptionSelecttwo = (option, mode) => {
  //   if (option !== selectedOptiontwo) {
  //     setSelectedOptiontwo(option);
  //     setDropdownOpentwo(false);
  //     setSelectedPaymentMode(mode);
  //     // setShowPaymentModeDropdown(false);
  //   }
  // };
  const handleOptionSelecttwo = (option, mode) => {
    if (option !== selectedOptiontwo) {
      setSelectedOptiontwo(option);
      setDropdownOpentwo(false);
      setSelectedPaymentMode(mode);

      // Check if both "Cheque" and "UPI" are selected, and set GST as default
      if (selectedOptiontwo == "Cheque" && option == "UPI") {
        setSelectedPaymentMode("GST");
      }
    }
  };

  const toggleDropdowntwo = () => {
    setDropdownOpentwo(!isDropdownOpentwo);
  };

  const handlePaymentModeSelect = (mode) => {
    setSelectedPaymentMode(mode);
  };

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
      <PetShopHeader />
      <Container fluid className="p-0">
        <div className="all-bg">
          <img src={productdetail} />
        </div>
      </Container>
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
              <Col lg={7} className="d-flex justify-content-center">
                <div className="product-details text-center">
                  <div>
                    <h5>Canine Pay Later</h5>
                    <p>Your total approved credit is ₹ 10,0000</p>
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col lg={5}>
                <div className="payment-time">
                  <div className="dropdown">
                    <button
                      className="btn dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton"
                      aria-haspopup="true"
                      aria-expanded={isDropdownOpen}
                      onClick={toggleDropdown}
                    >
                      {selectedOption}
                    </button>
                    <div
                      className={`dropdown-menu ${
                        isDropdownOpen ? "show" : ""
                      }`}
                      aria-labelledby="dropdownMenuButton"
                    >
                      <div
                        className="form-check"
                        onClick={() => handleOptionSelect("15 Days")}
                      >
                        <input
                          className="form-check-input"
                          type="radio"
                          name="paymentTimeRadios"
                          id="15Days"
                          checked={selectedOption == "15 Days"}
                          readOnly
                        />
                        <label className="form-check-label">15 Days</label>
                      </div>
                      {/* Add similar code for other options */}
                      <div
                        className="form-check"
                        onClick={() => handleOptionSelect("30 Days")}
                      >
                        <input
                          className="form-check-input"
                          type="radio"
                          name="paymentTimeRadios"
                          id="30Days"
                          checked={selectedOption == "30 Days"}
                          readOnly
                        />
                        <label className="form-check-label">30 Days</label>
                      </div>
                      <div
                        className="form-check"
                        onClick={() => handleOptionSelect("45 Days")}
                      >
                        <input
                          className="form-check-input"
                          type="radio"
                          name="paymentTimeRadios"
                          id="45Days"
                          checked={selectedOption == "45 Days"}
                          readOnly
                        />
                        <label className="form-check-label">45 Days</label>
                      </div>
                    </div>
                  </div>
                  {showPaymentModeDropdown && (
                    <div className="dropdown">
                      <button
                        className="btn dropdown-toggle"
                        type="button"
                        id="paymentModeDropdownButton"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded={isDropdownOpentwo}
                        onClick={toggleDropdowntwo}
                      >
                        {selectedOptiontwo}
                      </button>
                      <div
                        className={`dropdown-menu ${
                          isDropdownOpentwo ? "show" : ""
                        }`}
                        aria-labelledby="paymentModeDropdownButton"
                      >
                        <div
                          className="form-check"
                          onClick={() => handleOptionSelecttwo("UPI")}
                        >
                          <input
                            className="form-check-input"
                            type="radio"
                            name="paymentModeRadios"
                            id="UPI"
                            checked={selectedOptiontwo == "UPI"}
                            readOnly
                          />
                          <label className="form-check-label">UPI</label>
                        </div>
                        {/* Add similar code for other payment modes */}
                        <div
                          className="form-check"
                          onClick={() => handleOptionSelecttwo("Cheque")}
                        >
                          <input
                            className="form-check-input"
                            type="radio"
                            name="paymentModeRadios"
                            id="Cheque"
                            checked={selectedOptiontwo == "Cheque"}
                            readOnly
                          />
                          <label className="form-check-label">Cheque</label>
                        </div>
                        <div
                          className="form-check"
                          onClick={() => handleOptionSelecttwo("Cash")}
                        >
                          <input
                            className="form-check-input"
                            type="radio"
                            name="paymentModeRadios"
                            id="Cash"
                            checked={selectedOptiontwo == "Cash"}
                            readOnly
                          />
                          <label className="form-check-label">Cash</label>
                        </div>
                      </div>
                    </div>
                  )}

                  <div>
                    {selectedPaymentMode == "Cash" && (
                      <div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="gstRadios"
                            id="withoutGST"
                            defaultValue="option1"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="withoutGST"
                          >
                            Without GST
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="gstRadios"
                            id="withGST"
                            defaultValue="option2"
                          />
                          <label className="form-check-label" htmlFor="withGST">
                            GST
                          </label>
                        </div>
                      </div>
                    )}
                  </div>
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
      <Petshopfooter />
    </>
  );
}

export default PetshopPayLater;
