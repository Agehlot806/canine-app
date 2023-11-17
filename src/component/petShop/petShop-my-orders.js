import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../Constant/Index";
import brandPro1 from "../../assets/images/img/brandPro1.png";
import cart from "../../assets/images/icon/cart.png";
import logo from "../../assets/images/logo.png";
import PetShopHeader from "../../directives/petShopHeader";
import Petshopfooter from "../../directives/petShop-Footer";
import loadinggif from "../../assets/images/video/loading.gif";

function PetshopMyorder() {
  const [allorder, setallorder] = useState([]);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    Promise.all([allOrders(), storePaymentStatus()])
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  // storedWholesellerId
  const storedWholesellerId = Number(localStorage.getItem("UserWholesellerId"));
  // ----------------------------------------
  // salesmanId
  const salesmanId = localStorage.getItem("salesmanId");
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
  const storePaymentStatus = (paymentStatus) => {
    if (paymentStatus) {
      localStorage.setItem("payment_status", paymentStatus);
    }
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
          <section className="section-padding">
            <Container>
              <h1 className="main-head">My Orders</h1>
              <div className="needplace">
                {allorder && allorder.length > 0 ? (
                  allorder.map((item, index) => (
                    <div className="myorder-list">
                      <Row className="justify-content-center">
                        <Col lg={2} sm={2} className="align-self-center">
                          <img src={logo} />
                        </Col>
                        <Col lg={5} sm={5}>
                          <h3>Order Id: {item.id}</h3>
                          <h3>Date: {getDateFromCreatedAt(item.created_at)}</h3>
                          <h3>Payment Method: {item.payment_method}</h3>
                          <h3>Payment Status: {item.payment_status}</h3>
                          <h3>
                            Order Amount: ₹
                            {parseInt(
                              item.order_amount + item.total_tax_amount
                            )}
                          </h3>
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
                                to={`/petShop-order-view-details/?id=${
                                  item.id
                                }&status=${item.payment_status ?? "not found"}`}
                              >
                                View
                              </Link>
                            </Button>
                            
                            <Button>
                              <Link to={`/petshoptrackyourorde/${item.id}`}>
                                Track
                              </Link>
                            </Button>
                            {salesmanId && item.payment_status === "unpaid" ? (
                              <Button>
                                <Link
                                  to={`/petShop-order-view-details/?id=${
                                    item.id
                                  }&status=${
                                    item.payment_status ?? "not found"
                                  }`}
                                >
                                  Pay
                                </Link>
                              </Button>
                            ) : null}
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
        </>
      )}

      <Petshopfooter />
    </>
  );
}

export default PetshopMyorder;
