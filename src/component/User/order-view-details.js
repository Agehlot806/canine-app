import React, { useRef } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import logo from "../../assets/images/logo.png";
import invoice from "../../assets/images/icon/invoice.png";
import Newheader from "../../directives/newheader";
import Footer from "../../directives/footer";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../Constant/Index";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useReactToPrint } from "react-to-print";
import { useBootstrapMinBreakpoint } from "react-bootstrap/esm/ThemeProvider";
import { Toaster, toast } from "react-hot-toast";
import StarRating from "../starrating";
import loadinggif from "../../assets/images/video/loading.gif";

function Orderviewdetails() {
  const navigate = useNavigate();
  const tableRef = useRef();
  const summaryTableRef = useRef(); // Ref for summary table
  // Retrieve the formatted address from localStorage
  const storedFormattedAddress = localStorage.getItem("formattedAddress");

  // Use the stored formatted address
  const handlePrint = useReactToPrint({
    content: () => tableRef.current,
  });
  const summaryPrint = useReactToPrint({
    content: () => summaryTableRef.current,
  });

  const [allorder, setallorder] = useState([]);
  const [orderDetails, setorderDetails] = useState([]);
  console.log("orderDetails: ", orderDetails);
  console.log("storedFormattedAddress: ", storedFormattedAddress);

  const { id } = useParams();
  const [orderItemId, setOrderItemId] = useState(null); // Initialize as null

  useEffect(() => {
    // Make sure orderDetails is available before accessing item_id
    if (orderDetails && orderDetails.length > 0) {
      const firstOrder = orderDetails[0];
      const itemId = firstOrder.item_id;
      setOrderItemId(itemId); // Store item_id in the state variable
    }
  }, [orderDetails]);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    Promise.all([orderViewdetails(), allOrders()])
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);
  let originalPrice = 0;
  orderDetails.forEach((el) => {
    let allPrice = parseInt(el.price) + parseInt(originalPrice);
    originalPrice = allPrice;
  });

  let subTotal = orderDetails.reduce(
    (total, order) => total + parseFloat(order.price * order.quantity),
    0
  );
  // let taxAmount = orderDetails.reduce(
  //   (total, order) => total + parseFloat(order.tax_amount * order.quantity),
  //   0
  // );
  let promoDiscount = orderDetails.reduce(
    (total, order) => total + parseFloat(order.discount_on_item ?? 0),
    0
  );

  let couponDiscount = parseFloat(orderDetails[0]?.discount_on_item ?? 0);

  let deliveryCharge = orderDetails.reduce(
    (total, order) => total + parseFloat(order.delivery_charge == 0 ? 30 : 30),
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
  // let TotalDataPrice =
  //   promoDiscount === 0
  //     ? subTotal + taxAmount + deliveryCharge
  //     : subTotal + taxAmount + deliveryCharge - couponDiscount;
  let TotalDataPrice =
    promoDiscount === 0
      ? subTotal + deliveryCharge
      : subTotal + deliveryCharge - couponDiscount;
  // storedUserId
  const customer_id = localStorage.getItem("userInfo");
  const loginType = localStorage.getItem("loginType");
  const wholesellerId = localStorage.getItem("UserWholesellerId");
  let storedUserId =
    loginType == "salesman" ? parseInt(wholesellerId) : JSON.parse(customer_id);
  // =----------------------------
  const allOrders = async () => {
    axios
      .get(`${BASE_URL}/customer/order/list?id=${storedUserId}`)
      .then((response) => {
        console.log(response);
        console.log("Order List Successful", allorder);
        setallorder(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const item_id = orderDetails[0]?.item_id;

  const orderViewdetails = async () => {
    axios
      .get(`${BASE_URL}/customer/order/detail/${id}`)
      .then((response) => {
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

  const [addToCartStatus, setAddToCartStatus] = useState("");

  const [isBuyitagainButtonDisabled, setIsBuyitagainButtonDisabled] =
    useState(false);
  const handleAddToCart = async (order) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/customer/wish-list/add_product`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Set appropriate content type
            "Access-Control-Allow-Methods": "POST",
            "Access-Control-Allow-Headers": "Content-Type",
          },
          item_name: order?.variant,
          variant: order?.variation, // You may need to update this based on your data
          // image: productDetails?.image,
          image:
            // "https://canine.hirectjob.in///storage/app/public/product/" +
            order?.item_details[0]?.image,
          quantity: order?.quantity,
          total_quantity: 5,
          return_order: "yes",
          coupon_discount_amount: 0,
          coupon_discount_title: "",
          coupon_code: "",
          price: order?.price.toString(),
          // calculatedPrice === 0 ? productDetails?.price : calculatedPrice,
          user_id: storedUserId,
          item_id: order?.item_id,
        }
      );
      console.log("response in Cart", response);
      if (response) {
        if (response.data.status === "200") {
          toast.success("Added to cart!");
          // buy it again start
          setIsBuyitagainButtonDisabled(true); // Disable the button
          localStorage.setItem(`orderBuyitagain_${order?.item_id}`, "true");
          // buy it again end
          // setAddToCartStatus("Added to cart!");
          navigate(`/add-cart/${order?.item_id}`);
        } else {
          // setAddToCartStatus(response.data.message);
          toast.error("Already added");
        }
        // const updatedCart = [...addToCartStatus, productDetails];
        // setAddToCartStatus(updatedCart);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      setAddToCartStatus("Error adding to cart");
    }
  };
  useEffect(() => {
    const isOrderBuyitagain = localStorage.getItem(`orderBuyitagain_${id}`);
    if (isOrderBuyitagain === "true") {
      setIsBuyitagainButtonDisabled(true);
    }
  }, []);
  useEffect(() => {
    // Clear the flag on page refresh
    window.addEventListener("beforeunload", () => {
      localStorage.removeItem("orderBuyitagain_");
    });

    return () => {
      // Remove the event listener when the component unmounts
      window.removeEventListener("beforeunload", () => {});
    };
  }, []);

  const [rating, setRating] = useState(0);

  const handleStarClick = (index) => {
    if (index === rating) {
      // If the same star is clicked again, deselect it (set rating to 0).
      setRating(0);
    } else {
      // Otherwise, set the rating to the clicked star index or half of it.
      setRating(index);
    }
  };

  const [responseMessage, setResponseMessage] = useState("");
  const [comment, setcomment] = useState("");
  const [showForm, setShowForm] = useState(true);

  const handleReview = (event) => {
    event.preventDefault();
    const data = {
      user_id: storedUserId,
      item_id: item_id,
      order_id: id,
      comment: comment,
      rating: rating,
    };
    axios
      .post(`${BASE_URL}/items/reviews/submit`, data)
      .then((response) => {
        setResponseMessage(response.data.message);
        toast.success("Review Add Successfully");
        setShowForm(false);
      })
      .catch((error) => {
        toast.error("Field is required");
      });
  };
  const orderWithstatus = allorder.find(
    (order) => order.order_status === "delivered"
  );
  const renderProducthead = (name) => {
    const maxCharacters = 14;
    if (name?.length <= maxCharacters) {
      return <h6>{name}</h6>;
    }
    const truncatedDescription = name?.slice(0, maxCharacters);
    return (
      <>
        <h6>{truncatedDescription}</h6>
      </>
    );
  };

  function formatPrice(price) {
    // Convert the price to a number
    const numericPrice = parseInt(price);

    // Use toLocaleString to format the number with commas
    const formattedPrice = numericPrice.toLocaleString();

    // Remove unnecessary decimal places
    const finalPrice = formattedPrice.replace(/\.0+$/, "");

    return finalPrice;
  }

  return (
    <>
      <Toaster />
      <Newheader />
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
                        <p>{storedFormattedAddress}</p>
                      </div>
                    </div>
                  </Col>
                  <Col lg={7}>
                    <div className="dowload-invioce">
                      {/* <Link to="https://veejayjewels.com/storage/app/public/pdf/2023-06-29-649d7c76c81d3.pdf"> */}
                      <Button className="invoice-1" onClick={handlePrint}>
                        <img src={invoice} /> download invoice
                      </Button>
                      {/* </Link> */}
                      {/* <Link to="https://veejayjewels.com/storage/app/public/pdf/2023-06-29-649d7c76c81d3.pdf"> */}
                      {/* <Button className="invoice-2" onClick={summaryPrint}>
                        <img src={invoice} /> download summary
                      </Button> */}
                      {/* </Link> */}
                    </div>
                  </Col>
                </Row>
                <Row className="justify-content-center">
                  <Col lg={8}>
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
                                      <span>
                                        ₹{formatPrice(order.price, 0)}
                                      </span>
                                    </p>
                                    <p>
                                      quantity: <span>{order.quantity}</span>
                                    </p>
                                    <p>
                                      gst: <span>{order.gst}</span>
                                    </p>
                                  </div>
                                </Col>

                                <Col sm={3}>
                                  <div className="order-ids">
                                    <Button
                                      onClick={() => {
                                        handleAddToCart(order);
                                      }}
                                      disabled={isBuyitagainButtonDisabled}
                                    >
                                      Buy it again
                                    </Button>
                                  </div>
                                </Col>
                              </Row>
                              <div>
                                {orderWithstatus &&
                                orderWithstatus.order_status === "delivered" ? (
                                  <div>
                                    <p className="m-0">
                                      Product Rating: {rating}
                                    </p>
                                    <div className="star-rating">
                                      {[1, 2, 3, 4, 5].map((index) => (
                                        <div
                                          key={index}
                                          className={`star ${
                                            index <= rating ? "filled" : ""
                                          }`}
                                          onClick={() => handleStarClick(index)}
                                        ></div>
                                      ))}
                                    </div>
                                    {showForm ? (
                                      <form>
                                        <div className="form-group">
                                          <label>Write a Review</label>
                                          <textarea
                                            className="form-control mb-3"
                                            rows={3}
                                            value={comment}
                                            onChange={(e) =>
                                              setcomment(e.target.value)
                                            }
                                          />
                                        </div>
                                        <button
                                          className="btn btn-primary"
                                          onClick={handleReview}
                                        >
                                          Submit
                                        </button>
                                      </form>
                                    ) : (
                                      <p>Review submitted. Thank you!</p>
                                    )}
                                  </div>
                                ) : null}
                              </div>

                              <hr />
                            </div>
                          );
                        })
                      ) : (
                        <p>No orders available</p>
                      )}
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col lg={6} className="mb-4">
                    <div className="order-table" ref={tableRef}>
                      {allorder && allorder.length > 0 ? (
                        allorder.map((item, index) => {
                          if (item.id == id) {
                            return (
                              <div className="dow-summy">
                                <h5>Order Invoice</h5>
                                <table responsive key={index}>
                                  <>
                                    <tbody>
                                      <tr>
                                        <th>
                                          <p>Total</p>
                                        </th>
                                        <td>
                                          <p>
                                            ₹
                                            {formatPrice(
                                              orderDetails.reduce(
                                                (total, order) =>
                                                  total +
                                                  order.price * order.quantity,
                                                0
                                              )
                                            )}{" "}
                                            {item && !isNaN(item.coupon_code)
                                              ? item.coupon_code
                                              : "0"}
                                          </p>
                                        </td>
                                      </tr>

                                      <tr>
                                        <th>
                                          <p>
                                            {" "}
                                            Discount <br />
                                            Promo Code:{" "}
                                            {item && !isNaN(item.coupon_code)
                                              ? item.coupon_code
                                              : "0"}
                                          </p>
                                        </th>

                                        <td>
                                          <p>
                                            <span style={{ fontSize: 20 }}>
                                              {"-"}
                                            </span>{" "}
                                            ₹{formatPrice(couponDiscount)}
                                          </p>
                                        </td>
                                      </tr>
                                      <tr>
                                        <th>
                                          <p>Sub Total:</p>
                                        </th>
                                        <td>
                                          <p>
                                            ₹
                                            {formatPrice(
                                              promoDiscount === 0
                                                ? subTotal
                                                : subTotal - couponDiscount
                                            )}
                                            {/* {formatPrice(
                                              promoDiscount === 0
                                                ? subTotal + taxAmount
                                                : subTotal +
                                                    taxAmount -
                                                    couponDiscount
                                            )} */}
                                          </p>
                                        </td>
                                      </tr>

                                      <tr>
                                        <th>
                                          <p>Delivery Charge</p>
                                        </th>
                                        <td>
                                          <p>₹{deliveryCharge}</p>
                                        </td>
                                      </tr>
                                      <tr>
                                        <th>
                                          <h4>Total</h4>
                                        </th>
                                        <td>
                                          <h4 style={{ color: "#3b71ca" }}>
                                            ₹{formatPrice(TotalDataPrice)}
                                          </h4>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </>
                                </table>
                              </div>
                            );
                          } else {
                            return null; // If no match, return null or an empty fragment
                          }
                        })
                      ) : (
                        <p className="emptyMSG">No Order list</p>
                      )}
                    </div>
                  </Col>
                  <Col lg={6}>
                    <div ref={summaryTableRef}>
                      {allorder && allorder.length > 0 ? (
                        allorder.map((item, index) => {
                          if (item.id == id) {
                            return (
                              <div className="dow-summy leftsummy">
                                <h5>Order Summary</h5>
                                <table>
                                  <tbody>
                                    <tr>
                                      <th>
                                        <p>Order ID :</p>
                                      </th>
                                      <td>
                                        <p>{item.id}</p>
                                      </td>
                                    </tr>
                                    <tr>
                                      <th>
                                        <p>Item Name :</p>
                                      </th>
                                      <td>
                                        {item.callback[0] && (
                                          <p style={{ fontSize: "small" }}>
                                            {renderProducthead(
                                              item.callback[0].variant
                                            )}
                                          </p>
                                        )}
                                      </td>
                                    </tr>
                                    {/* <tr>
                                      <th>
                                        <p>Total Before Tax:</p>
                                      </th>
                                      <td>
                                        <p>
                                          <p>
                                            ₹
                                            {formatPrice(
                                              promoDiscount === 0
                                                ? subTotal
                                                : subTotal - couponDiscount
                                            )}
                                          </p>
                                        </p>
                                      </td>
                                    </tr> */}
                                    <tr>
                                      <th>
                                        <p>Sub Total:</p>
                                      </th>
                                      <td>
                                        <p>
                                          {" "}
                                          ₹
                                          {formatPrice(
                                            promoDiscount === 0
                                              ? subTotal
                                              : subTotal - couponDiscount
                                          )}
                                          {/* {formatPrice(
                                            promoDiscount === 0
                                              ? subTotal + taxAmount
                                              : subTotal +
                                                  taxAmount -
                                                  couponDiscount
                                          )} */}
                                        </p>
                                      </td>
                                    </tr>
                                    <tr>
                                      <th>
                                        <p>Coupon Discount:</p>
                                      </th>
                                      <td>
                                        <p>
                                          ₹
                                          {formatPrice(
                                            item.coupon_discount_amount ?? 0
                                          )}
                                        </p>
                                      </td>
                                    </tr>
                                    <tr>
                                      <th>
                                        <p>Delivery Fee:</p>
                                      </th>
                                      <td>
                                        <p>₹{deliveryCharge}</p>
                                      </td>
                                    </tr>
                                    <tr>
                                      <th>
                                        <h4>Total:</h4>
                                      </th>
                                      <td>
                                        <h4 style={{ color: "#3b71ca" }}>
                                          ₹{formatPrice(TotalDataPrice)}
                                        </h4>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            );
                          } else {
                            return null;
                          }
                        })
                      ) : (
                        <p className="emptyMSG">No Order list</p>
                      )}
                    </div>
                  </Col>
                </Row>
              </div>
            </Container>
          </section>
        </>
      )}
      <Footer />
    </>
  );
}

export default Orderviewdetails;
