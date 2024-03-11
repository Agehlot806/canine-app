import React from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import logo from "../../assets/images/logo.png";
import invoice from "../../assets/images/icon/invoice.png";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../Constant/Index";
import PetShopHeader from "../../directives/petShopHeader";
import Petshopfooter from "../../directives/petShop-Footer";
import paydone from "../../assets/images/icon/paydone.png";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Toaster, toast } from "react-hot-toast";
import loadinggif from "../../assets/images/video/loading.gif";

function PetshopOrderviewdetails() {
  const [allorder, setallorder] = useState([]);
  const [orderDetails, setorderDetails] = useState([]);

  // const { id } = useParams();
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const id = params.get("id");
  const paymentStatus = params.get("status");
  const navigate = useNavigate();

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

  const storedFormattedAddress = localStorage.getItem("formattedAddress");
  let subTotal = orderDetails.reduce(
    (total, order) => total + parseFloat(order.price * order.quantity),
    0
  );
  // let TaxAmount = orderDetails.reduce(
  //   (total, order) => total + parseFloat(order.tax_amount * order.quantity),
  //   0
  // );
  let SubTotalTaxAmount = orderDetails.reduce(
    (total, order) => total + parseFloat(order.total_add_on_price),
    0
  );
  let SubTotalData = subTotal;

  let orderIdData = allorder.reduce(
    (total, order) => total + parseFloat(order.id),
    0
  );

  // let couponDiscount = orderDetails.coupon_discount_amount || 200;

  let deliveryCharge = orderDetails.reduce(
    (total, order) => parseFloat(order.delivery_charge),
    0
  );

  // const AddAllServiceCharges = SubTotalTaxAmount + deliveryCharge;
  const AddAllServiceCharges = SubTotalTaxAmount;
  const formatted = AddAllServiceCharges.toLocaleString(undefined, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
  const GrandTotal = formatted.endsWith(".0")
    ? formatted.slice(0, -2)
    : formatted;

  // storedWholesellerId
  const storedWholesellerId = Number(localStorage.getItem("UserWholesellerId"));
  // =----------------------------
  // salesmanId
  const loginType = localStorage.getItem("loginType");
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

  const handlePayment = async () => {
    try {
      await loadRazorpayScript();

      const options = {
        key: "rzp_test_yXpKwsLWjkzvBJ", // Replace with your actual key
        amount: 10000, // Amount in paise (100 INR)
        currency: "INR",
        name: "HEllo world",
        description: "Test Payment",
        image: "https://your_logo_url.png",
        // order_id: response.id, // Order ID obtained from Razorpay
        handler: (response) => {
          setPaymentId(response.razorpay_payment_id);
          // Handle the success callback
          window.location.href = "/shipping";
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

  const tableRef = useRef();
  const summaryTableRef = useRef(); // Ref for summary table

  const handlePrint = useReactToPrint({
    content: () => tableRef.current,
  });
  const summaryPrint = useReactToPrint({
    content: () => summaryTableRef.current,
  });

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
          min_order: order?.quantity,
          price: order?.price.toString(),
          // calculatedPrice === 0 ? productDetails?.price : calculatedPrice,
          user_id: storedWholesellerId,
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
          navigate(`/petShop-add-cart/${order?.item_id}`);
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
  const [selectedPaymentMode, setSelectedPaymentMode] = useState(null);
  const [isBuyitagainButtonDisabled, setIsBuyitagainButtonDisabled] =
    useState(false);
  const handleRadioChange = (value) => {
    setSelectedPaymentMode(value);
  };
  const handleRemaningAmount = (event) => {
    event.preventDefault();
    const data = {
      order_id: id,
      user_id: storedWholesellerId,
      // amount: SubTotalData + deliveryCharge,
      amount: SubTotalData,
      pay_mode: selectedPaymentMode,
      seles_man_id: salesmanId,
    };
    axios
      .post(`${BASE_URL}/auth/selesman_pay_amount`, data)
      .then((response) => {
        setResponseMessage(response.data.message);
        toast.success("Remaning Balance Add Successfully");
        // setShowForm(false);
        navigate("/petShop-my-orders");
      })
      .catch((error) => {
        toast.error("Field is required");
      });
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
  const [responseMessage, setResponseMessage] = useState("");
  const [comment, setcomment] = useState("");
  const [showForm, setShowForm] = useState(true);

  const handleStarClick = (index) => {
    if (index === rating) {
      // If the same star is clicked again, deselect it (set rating to 0).
      setRating(0);
    } else {
      // Otherwise, set the rating to the clicked star index or half of it.
      setRating(index);
    }
  };

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

  const renderProducthead = (name) => {
    const maxCharacters = 22;
    if (name?.length <= maxCharacters) {
      return <h6>{name}</h6>;
    }
    const truncatedDescription = name?.slice(0, maxCharacters);
    return (
      <>
        <h6>{truncatedDescription}.</h6>
      </>
    );
  };

  function formatPrice(price) {
    // Convert the price to a number
    const numericPrice = Number(price);

    // Use toLocaleString to format the number with commas
    const formattedPrice = numericPrice.toLocaleString();

    // Remove unnecessary decimal places
    const finalPrice = formattedPrice.replace(/\.0+$/, "");

    return finalPrice;
  }

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
                        {allorder && allorder.length > 0
                          ? allorder.map((item, index) => {
                              if (item.id == id) {
                                return (
                                  <div key={item.id}>
                                    <p>{item?.delivery_address}</p>
                                  </div>
                                );
                              }
                            })
                          : null}
                        {/* <p>{storedFormattedAddress}</p> */}
                      </div>
                    </div>
                  </Col>
                  <Col lg={7}>
                    <div className="dowload-invioce">
                      <Button className="invoice-1" onClick={handlePrint}>
                        <img src={invoice} /> download invoice
                      </Button>
                      {/* <Button className="invoice-2" onClick={summaryPrint}>
                        <img src={invoice} /> download summary
                      </Button> */}
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col lg={5} className="align-self-center">
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
                                        ₹
                                        {parseFloat(
                                          order.price * order.quantity,
                                          0
                                        )}
                                      </span>
                                    </p>
                                    <p>
                                      quantity: <span>{order.quantity}</span>
                                    </p>
                                    {/* <p>
                                      gst: <span>{order.gst}</span>
                                    </p> */}
                                  </div>
                                </Col>

                                <Col sm={3}>
                                  <div className="order-ids">
                                    <Button
                                      onClick={() => {
                                        handleAddToCart(order);
                                      }}
                                    >
                                      Buy it again
                                    </Button>
                                  </div>
                                </Col>
                              </Row>
                              {salesmanId && paymentStatus === "unpaid" ? (
                                <Row>
                                  <h6>Total outstanding amount</h6>
                                  {/* <h4>₹{SubTotalData + deliveryCharge}</h4> */}
                                  <h4>₹{SubTotalData}</h4>
                                  <Col sm={3}>
                                    <div className="order-ids">
                                      <Button
                                        data-toggle="modal"
                                        data-target="#cod"
                                      >
                                        {/* <Link
                                      to={`/add-cart/${order.item_id}`}
                                      onClick={handleAddToCart}
                                    > */}
                                        Proceed to Pay
                                        {/* </Link> */}
                                      </Button>
                                    </div>
                                  </Col>
                                </Row>
                              ) : null}
                              <div>
                                {allorder.order_status === "delivered" ? (
                                  <div>
                                    <p>Product Rating: {rating}</p>
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
                                    {showForm && (
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
                                    )}
                                    {!showForm && (
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
                  <Col lg={7} className="align-self-center">
                    <Row>
                      <Col sm={12} className="mb-4">
                        <div
                          className="order-table"
                          // ref={tableRef}
                        >
                          {allorder && allorder.length > 0 ? (
                            allorder.map((item, index) => {
                              if (item.id == id) {
                                console.log("Match found for ID:", id);
                                console.log("allorder: ", allorder);
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
                                              <p>₹{formatPrice(subTotal)}</p>
                                            </td>
                                          </tr>
                                          {/* <tr>
                                            <th>
                                              <p>Tax:</p>
                                            </th>
                                            <td>
                                              <p>₹{formatPrice(TaxAmount)}</p>
                                            </td>
                                          </tr> */}
                                          <tr>
                                            <th>
                                              <p>Item Name :</p>
                                            </th>
                                            <td>
                                              {item.callback &&
                                                item.callback.length > 0 && (
                                                  <div>
                                                    {item.callback.map(
                                                      (callbackItem) => (
                                                        <div
                                                          key={callbackItem.id}
                                                        >
                                                          <p
                                                            style={{
                                                              fontSize: "small",
                                                            }}
                                                          >
                                                            {/* Item ID: {callbackItem.id}
                                                      , Variant:{" "} */}
                                                            {renderProducthead(
                                                              callbackItem.variant
                                                            )}
                                                          </p>
                                                          {/* Render other callback item details here */}
                                                        </div>
                                                      )
                                                    )}
                                                  </div>
                                                )}
                                            </td>
                                          </tr>
                                          {/* <tr>
                                            <th>
                                              <p>Gst Total Tax :</p>
                                            </th>
                                            <td>
                                              {item.callback &&
                                                item.callback.length > 0 && (
                                                  <div>
                                                    {item.callback.map(
                                                      (callbackItem) => (
                                                        <div
                                                          key={callbackItem.id}
                                                        >
                                                           <p
                                                            style={{
                                                              fontSize: "small",
                                                            }}
                                                          >
                                                            {callbackItem.gst}
                                                          </p> 
                                                        </div>
                                                      )
                                                    )}
                                                  </div>
                                                )}
                                            </td>
                                          </tr> */}
                                          <tr>
                                            <th>
                                              <p>Sub Total</p>
                                            </th>
                                            <td>
                                              <p>
                                                ₹{formatPrice(SubTotalData)}
                                              </p>
                                            </td>
                                          </tr>
                                          {/* <tr>
                                            <th>
                                              <p>Delivery Charge</p>
                                            </th>
                                            <td>
                                              <p>
                                                ₹
                                                {parseInt(item.delivery_charge)}
                                              </p>
                                            </td>
                                          </tr> */}
                                          <tr>
                                            <th>Total</th>
                                            <td>
                                              ₹{formatPrice(SubTotalData)}
                                            </td>
                                          </tr>
                                        </tbody>
                                      </>
                                    </table>
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
                      <Col sm={12}>
                        <div ref={summaryTableRef}>
                          {allorder && allorder.length > 0 ? (
                            allorder.map((item, index) => {
                              console.log("IDD:", typeof id);
                              console.log("IDI:", typeof item.id);

                              if (item.id == id) {
                                console.log("Match found for ID:", id);
                                return (
                                  <div className="dow-summy">
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
                                            {item.callback &&
                                              item.callback.length > 0 && (
                                                <div>
                                                  {item.callback.map(
                                                    (callbackItem) => (
                                                      <div
                                                        key={callbackItem.id}
                                                      >
                                                        <p
                                                          style={{
                                                            fontSize: "small",
                                                          }}
                                                        >
                                                          {/* Item ID: {callbackItem.id}
                                                      , Variant:{" "} */}
                                                          {renderProducthead(
                                                            callbackItem.variant
                                                          )}
                                                        </p>
                                                        {/* Render other callback item details here */}
                                                      </div>
                                                    )
                                                  )}
                                                </div>
                                              )}
                                          </td>
                                        </tr>

                                        {/* <tr>
                                          <th>
                                            <p>Gst Total Tax :</p>
                                          </th>
                                          <td>
                                            {item.callback &&
                                              item.callback.length > 0 && (
                                                <div>
                                                  {item.callback.map(
                                                    (callbackItem) => (
                                                      <div
                                                        key={callbackItem.id}
                                                      >
                                                        <p
                                                          style={{
                                                            fontSize: "small",
                                                          }}
                                                        >
                                                          Gst:{" "}
                                                          {callbackItem.gst}
                                                        </p>
                                                      </div>
                                                    )
                                                  )}
                                                </div>
                                              )}
                                          </td>
                                        </tr> */}
                                        <tr>
                                          <th>
                                            <p>Payment Status:</p>
                                          </th>
                                          <td>
                                            <p>{paymentStatus}</p>
                                          </td>
                                        </tr>
                                        {/* <tr>
                                          <th>
                                            <p>Total Before Tax:</p>
                                          </th>
                                          <td>
                                            <p>
                                              ₹
                                              {formatPrice(
                                                orderDetails.reduce(
                                                  (total, order) =>
                                                    total +
                                                    parseFloat(
                                                      order.price *
                                                        order.quantity
                                                    ),
                                                  0
                                                )
                                              )}
                                            </p>
                                          </td>
                                        </tr> */}
                                        <tr>
                                          <th>
                                            <p>Sub Total:</p>
                                          </th>
                                          <td>
                                            <p>₹{formatPrice(SubTotalData)}</p>
                                          </td>
                                        </tr>

                                        {/* <tr>
                                          <th>
                                            <p>Delivery Fee:</p>
                                          </th>
                                          <td>
                                            <p>
                                              ₹ {parseInt(item.delivery_charge)}
                                            </p>
                                          </td>
                                        </tr> */}
                                        <tr>
                                          <th>
                                            <h4>Total:</h4>
                                          </th>
                                          <td>
                                            <h4>
                                              ₹{formatPrice(SubTotalData)}
                                            </h4>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                );
                              } else {
                                console.log("No match for ID:", id);
                                return null;
                              }
                            })
                          ) : (
                            <p className="emptyMSG">No Order list</p>
                          )}
                        </div>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                {/* download */}
                <Row>
                  <Col lg={6} className="mb-4">
                    <div className="order-tablee" ref={tableRef}>
                      {console.log("allorderInvoice: ", allorder)}
                      {allorder && allorder.length > 0 ? (
                        allorder.map((item, index) => {
                          if (item.id == id) {
                            return (
                              <div className="row" key={item.id}>
                                <div className="col-12" key={index}>
                                  <h4 className="text-center">
                                    *******************************************************************************
                                  </h4>
                                  <h3 className="text-center">CASH RECEIPT</h3>
                                  <h4 className="text-center">
                                    *******************************************************************************
                                  </h4>
                                  <br />
                                  <br />
                                  <h3 className="text-center">
                                    Order ID :{item?.id}
                                  </h3>
                                  <h6 className="text-center">
                                    GSTIN :27AUIPM6812G1ZI
                                  </h6>
                                  <h6 className="text-center">
                                    {item.callback &&
                                      item.callback.length > 0 && (
                                        <div>
                                          <p
                                            style={{
                                              fontSize: "small",
                                            }}
                                          >
                                            {item.callback[0]?.created_at}
                                          </p>
                                        </div>
                                      )}
                                  </h6>
                                  <br />
                                  <br />
                                  <h4> Address : {item?.delivery_address}</h4>
                                  <div class="row ">
                                    <div class="col-4 font-weight-bold">
                                      <h5 class="font-weight-bold"> ITEM : </h5>
                                      {item.callback &&
                                        item.callback.length > 0 && (
                                          <div>
                                            {item.callback.map(
                                              (callbackItem) => (
                                                <div key={callbackItem.id}>
                                                  <p
                                                    style={{
                                                      fontSize: "small",
                                                    }}
                                                  >
                                                    {/* Item ID: {callbackItem.id}
                                                      , Variant:{" "} */}
                                                    {callbackItem.variant}
                                                    <br />
                                                    CGST :
                                                    {(parseInt(
                                                      callbackItem.price *
                                                        callbackItem.quantity
                                                    ) *
                                                      (callbackItem.gst.slice(
                                                        0,
                                                        -1
                                                      ) /
                                                        100)) /
                                                      2}
                                                    <br />
                                                    SGST :
                                                    {(parseInt(
                                                      callbackItem.price *
                                                        callbackItem.quantity
                                                    ) *
                                                      (callbackItem.gst.slice(
                                                        0,
                                                        -1
                                                      ) /
                                                        100)) /
                                                      2}
                                                  </p>
                                                  {/* Render other callback item details here */}
                                                </div>
                                              )
                                            )}
                                          </div>
                                        )}
                                    </div>

                                    <div class="col-3 font-weight-bold">
                                      <h5 class="text-center font-weight-bold">
                                        {" "}
                                        PRICE :
                                      </h5>
                                      {item.callback &&
                                        item.callback.length > 0 && (
                                          <div>
                                            {item.callback.map(
                                              (callbackItem) => (
                                                <div key={callbackItem.id}>
                                                  <p
                                                    class="text-center font-weight-bold"
                                                    style={{
                                                      fontSize: "small",
                                                    }}
                                                  >
                                                    {/* Item ID: {callbackItem.id}
                                                      , Variant:{" "} */}
                                                    {parseInt(
                                                      callbackItem.price *
                                                        callbackItem.quantity
                                                    )}
                                                  </p>
                                                </div>
                                              )
                                            )}
                                          </div>
                                        )}
                                    </div>
                                    <div class="col-2 font-weight-bold">
                                      <h5 class="text-center font-weight-bold">
                                        QTY :{" "}
                                      </h5>
                                      {item.callback &&
                                        item.callback.length > 0 && (
                                          <div>
                                            {item.callback.map(
                                              (callbackItem) => (
                                                <div key={callbackItem.id}>
                                                  <p
                                                    class="text-center font-weight-bold"
                                                    style={{
                                                      fontSize: "small",
                                                    }}
                                                  >
                                                    {callbackItem.quantity}
                                                  </p>
                                                </div>
                                              )
                                            )}
                                          </div>
                                        )}
                                    </div>
                                  </div>
                                  <div class="d-flex justify-content-between">
                                    <h4> SubTotal :</h4>
                                    <h4>
                                      ₹
                                      {formatPrice(
                                        orderDetails.reduce(
                                          (total, order) =>
                                            total +
                                            order.price * order.quantity,
                                          0
                                        )
                                      )}
                                    </h4>
                                  </div>
                                  <div class="d-flex justify-content-between">
                                    <h4>TotalPrice :</h4>

                                    <h4>
                                      ₹{" "}
                                      {formatPrice(
                                        orderDetails.reduce(
                                          (total, order) =>
                                            total +
                                            order.price * order.quantity,
                                          0
                                        )
                                      )}
                                    </h4>
                                  </div>

                                  <br />
                                  <p>
                                    -------------------------------------------------------------------------------------
                                  </p>
                                  <div class="row ">
                                    <div class="col-2 font-weight-bold">
                                      <h5 class="text-center font-weight-bold">
                                        {" "}
                                        GST :{" "}
                                      </h5>
                                      <p
                                        class="text-center font-weight-bold"
                                        style={{ fontSize: 20 }}
                                      >
                                        {" "}
                                        {item.callback &&
                                          item.callback.length > 0 && (
                                            <div>
                                              {item.callback.map(
                                                (callbackItem) => (
                                                  <div key={callbackItem.id}>
                                                    <p
                                                      style={{
                                                        fontSize: "small",
                                                      }}
                                                    >
                                                      {/* Item ID: {callbackItem.id}
                                                      , Variant:{" "} */}
                                                      {callbackItem.gst}
                                                    </p>
                                                    {/* Render other callback item details here */}
                                                  </div>
                                                )
                                              )}
                                            </div>
                                          )}
                                      </p>
                                    </div>
                                    <div class="col-3 font-weight-bold">
                                      <h5 class="text-center font-weight-bold">
                                        {" "}
                                        Taxiable Amount :{" "}
                                      </h5>
                                      <p
                                        class="text-center font-weight-bold"
                                        style={{ fontSize: 20 }}
                                      >
                                        {item.callback &&
                                          item.callback.length > 0 && (
                                            <div>
                                              {item.callback.map(
                                                (callbackItem) => (
                                                  <div key={callbackItem.id}>
                                                    <p
                                                      class="text-center font-weight-bold"
                                                      style={{
                                                        fontSize: "small",
                                                      }}
                                                    >
                                                      {/* Item ID: {callbackItem.id}
                                                      , Variant:{" "} */}
                                                      {parseInt(
                                                        callbackItem.price *
                                                          callbackItem.quantity
                                                      ) -
                                                        callbackItem.price *
                                                          callbackItem.quantity *
                                                          (callbackItem.gst.slice(
                                                            0,
                                                            -1
                                                          ) /
                                                            100)}
                                                    </p>
                                                  </div>
                                                )
                                              )}
                                            </div>
                                          )}
                                      </p>
                                    </div>
                                    <div class="col-2 font-weight-bold">
                                      <h5 class="text-center font-weight-bold">
                                        {" "}
                                        CGST :
                                      </h5>
                                      <p class="text-center">
                                        {item.callback &&
                                          item.callback.length > 0 && (
                                            <div>
                                              {item.callback.map(
                                                (callbackItem) => (
                                                  <div key={callbackItem.id}>
                                                    <p
                                                      style={{
                                                        fontSize: "small",
                                                      }}
                                                    >
                                                      {(parseInt(
                                                        callbackItem.price *
                                                          callbackItem.quantity
                                                      ) *
                                                        (callbackItem.gst.slice(
                                                          0,
                                                          -1
                                                        ) /
                                                          100)) /
                                                        2}
                                                    </p>
                                                  </div>
                                                )
                                              )}
                                            </div>
                                          )}{" "}
                                      </p>
                                    </div>
                                    <div class="col-2 font-weight-bold">
                                      <h5 class="text-center font-weight-bold">
                                        {" "}
                                        SGST :
                                      </h5>
                                      <p class="text-center">
                                        {item.callback &&
                                          item.callback.length > 0 && (
                                            <div>
                                              {item.callback.map(
                                                (callbackItem) => (
                                                  <div key={callbackItem.id}>
                                                    <p
                                                      style={{
                                                        fontSize: "small",
                                                      }}
                                                    >
                                                      {(parseInt(
                                                        callbackItem.price *
                                                          callbackItem.quantity
                                                      ) *
                                                        (callbackItem.gst.slice(
                                                          0,
                                                          -1
                                                        ) /
                                                          100)) /
                                                        2}
                                                    </p>
                                                  </div>
                                                )
                                              )}
                                            </div>
                                          )}{" "}
                                      </p>
                                    </div>
                                    <div class="col-3 font-weight-bold">
                                      <h5 class="text-center font-weight-bold">
                                        Total Amount:{" "}
                                      </h5>
                                      <p class="text-center">
                                        {item.callback &&
                                          item.callback.length > 0 && (
                                            <div>
                                              {item.callback.map(
                                                (callbackItem) => (
                                                  <div key={callbackItem.id}>
                                                    <p
                                                      class="text-center font-weight-bold"
                                                      style={{
                                                        fontSize: "small",
                                                      }}
                                                    >
                                                      {/* Item ID: {callbackItem.id}
                                                      , Variant:{" "} */}
                                                      {parseInt(
                                                        callbackItem.price *
                                                          callbackItem.quantity
                                                      )}
                                                    </p>
                                                  </div>
                                                )
                                              )}
                                            </div>
                                          )}
                                      </p>
                                    </div>
                                  </div>
                                  <div class="d-flex justify-content-end">
                                    <h4>Grand Total : </h4>
                                    <h4>
                                      {" "}
                                      ₹
                                      {formatPrice(
                                        orderDetails.reduce(
                                          (total, order) =>
                                            total +
                                            order.price * order.quantity,
                                          0
                                        )
                                      )}
                                    </h4>
                                  </div>
                                  <br />
                                  <br />
                                  <h4 className="text-center">
                                    *******************************************************************************
                                  </h4>
                                  <h3 className="text-center">
                                    FSSAI:226572678456565
                                  </h3>
                                  <h3 className="text-center">THANK YOU</h3>
                                  <h4 className="text-center">
                                    *******************************************************************************
                                  </h4>
                                  <h3 className="text-center">
                                    @Elevenmonk. Canine @ 2023
                                  </h3>
                                </div>
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
                </Row>
              </div>
            </Container>
          </section>
        </>
      )}
      <Petshopfooter />
      {/* Modal */}
      <div
        className="modal fade"
        id="cod"
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
                      name="paymentMode"
                      value="online"
                      checked={selectedPaymentMode === "online"}
                      onChange={() => handleRadioChange("online")}
                    />
                    {/* <p>Cash On Delivery</p> */}
                    <p>Payment By OnLine </p>
                  </div>
                </div>
                <div className="select-card select-card3">
                  <div className="selct-card-text">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="paymentMode"
                      value="offline"
                      checked={selectedPaymentMode === "offline"}
                      onChange={() => handleRadioChange("offline")}
                    />
                    {/* <p>Cash On Delivery</p> */}
                    <p>Payment By OffLine</p>
                  </div>
                </div>
                <Button
                  // disabled={!selectedInput}
                  // data-toggle="modal"
                  // data-target="#paysubmit"
                  data-toggle="modal"
                  data-target="#paysubmit"
                  data-dismiss="modal"
                  onClick={handleRemaningAmount}
                >
                  <Link>pay</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PetshopOrderviewdetails;
