import React from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import logo from "../../assets/images/logo.png";
import invoice from "../../assets/images/icon/invoice.png";
import Footer from "../../directives/footer";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../Constant/Index";
import Wholeheader from "../../directives/wholesalesheader";

function WholesalerOrderviewdetails() {
  const [allorder, setallorder] = useState([]);
  // console.log("allorder: ", allorder);
  const [orderDetails, setorderDetails] = useState([]);
  // console.log("orderDetails: ", orderDetails);

  const { id } = useParams();
  console.log("order id ", id);

  useEffect(() => {
    orderViewdetails();
    allOrders();
  }, []);
  let subTotal = orderDetails.reduce(
    (total, order) => total + parseFloat(order.price),
    0
  );

  // let couponDiscount = orderDetails.reduce(
  //   (total, order) => total + parseFloat(order.coupon_discount_amount),
  //   0
  // );allorder

  // let couponDiscount = orderDetails.coupon_discount_amount || 200;

  let deliveryCharge = orderDetails.reduce(
    (total, order) => total + parseFloat(order.delivery_charge == 0 ? 60 : 60),
    0
  );

  const AddAllServiceCharges = subTotal + deliveryCharge;
  const formatted = AddAllServiceCharges.toLocaleString(undefined, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
  const GrandTotal = formatted.endsWith(".0")
    ? formatted.slice(0, -2)
    : formatted;

  // storedWholesellerId
  const storedWholesellerId = Number(localStorage.getItem("UserWholesellerId"));
  console.log("storedWholesellerId: ", storedWholesellerId);
  // =----------------------------
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

  const orderViewdetails = async () => {
    axios
      .get(`${BASE_URL}/customer/order/detail/${id}`)
      .then((response) => {
        console.log("=======>???????????????????????????????? ", response);
        console.log("order Details Successful");
        setorderDetails(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const [addToCartStatus, setAddToCartStatus] = useState("");
  const handleAddToCart = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/customer/wish-list/add_product`,
        {
          item_name: productDetails?.name,
          variant: selectedVariant, // You may need to update this based on your data
          image: productDetails?.image,
          quantity: quantity,
          price: formattedAmount,
          user_id: storedUserId,
          item_id: productDetails?.id,
        }
      );

      if (response.data.success) {
        const updatedCart = [...addToCartStatus, productDetails];
        setAddToCartStatus(updatedCart);
        // setAddToCartStatus("Added to cart!");
        toast.success("Added to cart!");
        // Navigate("/addcart")
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      setAddToCartStatus("Error adding to cart");
    }
  };

  return (
    <>
      <Wholeheader />
      <section className="section-padding">
        <Container>
          <h1 className="main-head">Orders View</h1>

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
                  <Link to="https://veejayjewels.com/storage/app/public/pdf/2023-06-29-649d7c76c81d3.pdf">
                    <Button className="invoice-1">
                      <img src={invoice} /> download invoice
                    </Button>
                  </Link>
                  <Link to="https://veejayjewels.com/storage/app/public/pdf/2023-06-29-649d7c76c81d3.pdf">
                    <Button className="invoice-2">
                      <img src={invoice} /> download summary
                    </Button>
                  </Link>
                </div>
              </Col>
            </Row>
            <Row>
              <Col lg={5}>
                <div className="order-minicard">
                  {orderDetails && orderDetails.length > 0 ? (
                    orderDetails.map((order) => {
                      return (
                        <div key={order.id}>
                          <Row>
                            <h6>Order ID: {order.order_id}</h6>
                            <Col sm={9}>
                              <div className="order-ids">
                                <p>
                                  Product name: <span>{order.variant}</span>
                                </p>
                                <p>
                                  Price:{" "}
                                  <span>₹{parseFloat(order.price, 0)}</span>
                                </p>
                                <p>
                                  quantity: <span>{order.quantity}</span>
                                </p>
                              </div>
                            </Col>

                            <Col sm={3}>
                              <div className="order-ids">
                                <Button>
                                  <Link to={`/wholeseller-add-cart/${id}`} onClick={handleAddToCart}>
                                    Buy it again
                                </Link></Button>
                              </div>
                            </Col>
                          </Row>
                          <hr />
                        </div>
                      );
                    })
                  ) : (
                    <p>No orders available</p>
                  )}
                </div>
              </Col>
              <Col lg={7} className="align-self-center">
                <div className="order-table">
                  {allorder && allorder.length > 0 ? (
                    allorder.map((item, index) => {
                      console.log("Desired ID:", id);
                      console.log("Item ID:", item.id);

                      if (item.id == id) {
                        console.log("Match found for ID:", id);
                        return (
                          <Table responsive key={index}>
                            <>
                              <tbody>
                                <tr>
                                  <th>Sub Total</th>
                                  {/* <td>
                                    ₹
                                    {orderDetails.reduce(
                                      (total, order) =>
                                        total + parseFloat(order.price),
                                      0
                                    )}
                                  </td> */}
                                  <td>₹{subTotal}</td>
                                </tr>
                                {/* <tr>
                                  <th>
                                    Moving Cart <br />
                                    <p>Additional Services</p>
                                  </th>
                                            <td>{ item.}</td>
                                </tr> */}
                                {/* <tr>
                                  <th>
                                    Discount <br />
                                    <p>Promo Code: {item.coupon_code}</p>
                                  </th>

                                  <td>₹{couponDiscount}</td>
                                </tr> */}
                                <tr>
                                  <th>Delivery Charge</th>
                                  <td>₹{deliveryCharge}</td>
                                </tr>
                                <tr>
                                  <th>Total</th>
                                  <td>₹{GrandTotal}</td>
                                </tr>
                              </tbody>
                            </>
                          </Table>
                        );
                      } else {
                        console.log("No match for ID:", id);
                        return null; // If no match, return null or an empty fragment
                      }
                    })
                  ) : (
                    <p className="emptyMSG">No Order list</p>
                  )}
                  {/* <Table responsive>
                                        <tbody>
                                            <tr>
                                                <th>Sub Total</th>
                                                <td>₹{orderDetails.reduce((total, order) => total + parseFloat(order.price), 0)}</td>
                                            </tr>
                                            <tr>
                                                <th>Moving Cart <br />
                                                    <p>Additional Services</p></th>
                                                <td>$10</td>
                                            </tr>
                                            <tr>
                                                <th>Discount <br />
                                                    <p>Promo Code: 554dffd</p>
                                                    <p>delivery_charge</p></th>

                                                <td>$20</td>
                                            </tr>
                                            <tr>
                                                <th>Total</th>
                                                <td>$138.00</td>
                                            </tr>
                                        </tbody>
                                    </Table> */}
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </section>
      <Footer />
    </>
  );
}

export default WholesalerOrderviewdetails;
