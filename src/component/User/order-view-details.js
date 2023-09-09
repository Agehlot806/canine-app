import React, { useRef } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import logo from "../../assets/images/logo.png";
import invoice from "../../assets/images/icon/invoice.png";
import Newheader from "../../directives/newheader";
import Footer from "../../directives/footer";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../Constant/Index";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { useReactToPrint } from "react-to-print"
import { useBootstrapMinBreakpoint } from "react-bootstrap/esm/ThemeProvider";
import { Toaster, toast } from "react-hot-toast";
import StarRating from "../starrating";

function Orderviewdetails() {

  const tableRef = useRef();
  const summaryTableRef = useRef(); // Ref for summary table

  // const handlePrint = () => {
  //       if (tableRef.current) {
  //           const doc = new jsPDF();
  //           doc.autoTable({ html: tableRef.current });
  //           doc.save('table.pdf');
  //       }
  //   }
  const handlePrint = useReactToPrint({
    content: () => tableRef.current,
  });



  const summaryPrint = () => {
    const doc = new jsPDF();


    const summaryData = [
      ["Description", "Price"],
      ["Item 1", "$10"],
      ["Item 2", "$20"],
      ["Sub Total", "$30"],
      ["Discount", "-$5"],
      ["Delivery Charge", "$5"],
      ["Total", "$30"],
    ];

    doc.autoTable({
      head: [["Summary Invoice"]],
      body: summaryData,
      startY: 10,
      margin: { top: 20, right: 20, bottom: 0, left: 20 },
    });

    doc.save("summary_invoice.pdf");
  };


  const [allorder, setallorder] = useState([]);
  console.log("allorder: ", allorder);
  const [orderDetails, setorderDetails] = useState([]);
  console.log("orderDetails: ", orderDetails);

  const { id } = useParams();
  console.log("order id ", id);






  useEffect(() => {
    orderViewdetails();
    allOrders();
  }, []);
  let subTotal = orderDetails.reduce(
    (total, order) => total + parseFloat(order.total_add_on_price),
    0
  );

  // let couponDiscount = orderDetails.reduce(
  //   (total, order) => total + parseFloat(order.coupon_discount_amount),
  //   0
  // );allorder

  let couponDiscount = parseFloat(orderDetails[0]?.discount_on_item);

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
        console.log("Order List Successful");
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
  console.log("addToCartStatusaddToCartStatus", addToCartStatus);

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
      })
      .catch((error) => {
        toast.error("Field is required");
      });
  };


  return (
    <>
      <Toaster />
      <Newheader />
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
                  {/* <Link to="https://veejayjewels.com/storage/app/public/pdf/2023-06-29-649d7c76c81d3.pdf"> */}
                  <Button className="invoice-1" onClick={handlePrint}>
                    <img src={invoice} /> download invoice
                  </Button>
                  {/* </Link> */}
                  {/* <Link to="https://veejayjewels.com/storage/app/public/pdf/2023-06-29-649d7c76c81d3.pdf"> */}
                  <Button className="invoice-2" onClick={summaryPrint}>
                    <img src={invoice} /> download summary
                  </Button>
                  {/* </Link> */}
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
                                  <span>
                                    ₹{parseFloat(order.total_add_on_price, 0)}
                                  </span>
                                </p>
                                <p>
                                  quantity: <span>{order.quantity}</span>
                                </p>
                              </div>
                            </Col>

                            <Col sm={3}>
                              <div className="order-ids">
                                <Button>
                                  <Link to={`/add-cart/${id}`} onClick={handleAddToCart}>
                                    Buy it again
                                  </Link>
                                </Button>
                              </div>
                            </Col>
                          </Row>
                          {/* <div>
                            {allorder && allorder.length > 0 ? (
                              <h3>Order Status: {allorder[0].order_status}</h3>
                            ) : (
                              <p className="emptyMSG">No Order list</p>
                            )}
                          </div> */}
                          <>
                            <p>Product Rating: {rating}</p>
                            <div className="star-rating">
                              {[1, 2, 3, 4, 5].map((index) => (
                                <div
                                  key={index}
                                  className={`star ${index <= rating ? 'filled' : ''}`}
                                  onClick={() => handleStarClick(index)}
                                ></div>
                              ))}
                            </div>
                            <form>
                              <div className="form-group">
                                <label >Write a Review</label>
                                <textarea className="form-control mb-3" rows={3} value={comment}
                                  onChange={(e) => setcomment(e.target.value)} />
                              </div>
                            </form>
                            <Button  onClick={handleReview}>Submit</Button>
                          </>


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
                <div className="order-table" ref={tableRef}>
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
                                  <th>Total</th>
                                  <td>
                                    ₹
                                    {parseInt(
                                      orderDetails.reduce(
                                        (total, order) =>
                                          total + parseFloat(order.price),
                                        0
                                      )
                                    )}
                                  </td>
                                  {/* <td>₹{subTotal}</td> */}
                                </tr>
                                {/* <tr>
                                  <th>
                                    Moving Cart <br />
                                    <p>Additional Services</p>
                                  </th>
                                            <td>{ item.}</td>
                                </tr> */}
                                <tr>
                                  <th>
                                    Discount <br />
                                    <p>Promo Code: {item.coupon_code}</p>
                                  </th>

                                  <td>
                                    <span style={{ fontSize: 20 }}>{"-"}</span>{" "}
                                    ₹{couponDiscount}
                                  </td>
                                </tr>
                                <tr>
                                  <th>Sub Total</th>
                                  <td>₹{subTotal}</td>
                                </tr>

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

export default Orderviewdetails;
