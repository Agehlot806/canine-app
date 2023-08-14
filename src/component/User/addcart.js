import React, { useEffect, useState, useRef } from "react";
import Newheader from "../../directives/newheader";
import productdetail from "../../assets/images/banner/productdetail.png";
import { Button, Col, Container, Row } from "react-bootstrap";
import brandPro1 from "../../assets/images/img/brandPro1.png";
import voch from "../../assets/images/icon/voch.png";
import cart from "../../assets/images/icon/cart.png";
import Footer from "../../directives/footer";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../Constant/Index";

function Addcart() {
  const { id } = useParams();
  console.log("id", id);
  // Create a ref to store the list of items in the cart
  const cartItemsRef = useRef();
  const [quantity, setQuantity] = useState(1);
  // const [customer_id, setcustomer_id] = useState("");
  const [coupencode, setcoupenCode] = useState(false);
  const [addToCartProduct, setAddToCartProduct] = useState([]);
  const [couponlist, setcouponlist] = useState([]);

  console.log("addToCartProduct: ", addToCartProduct);

  const customer_id = localStorage.getItem("userInfo");
  console.log("=======>>>>>> id", customer_id);
  let storedUserId = JSON.parse(customer_id);
  console.log("customer_id: ", customer_id);

  const handleIncrementone = () => {
    setQuantity(quantity + 1);
  };
  const handleDecrementone = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };
  useEffect(() => {
    // getUserInfo()
    addToCartData();
    couponlistdata();
  }, []);

  // useEffect(() => {
  //   setAddToCartProduct(cartItemsRef.current);
  // }, [cartItemsRef]);

  const addToCartData = async () =>
    // quantity,
    // image,
    // item_id,
    // item_name,
    // price,
    // variant
    {
      axios
        .get(`${BASE_URL}/customer/wish-list/add_to_card/${storedUserId}`, {
          id: id, // Replace this with the correct product_id you want to add
          // user_id: storedUserId,
          // price: price,
          quantity: quantity,
          // image: image,
          // item_id: item_id,
          // item_name: item_name,
          // variant: variant,
        })
        .then((response) => {
          console.log(response);
          // cartItemsRef.current = response.data.data;
          setAddToCartProduct(response.data.data);
          console.log("response.data.data: ", response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
  const couponlistdata = async () => {
    axios
      .get(`${BASE_URL}/coupon/list`)
      .then((response) => {
        console.log(response);
        setcouponlist(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const removeFromCart = async (id) => {
    try {
      const response = await axios
        .delete(`${BASE_URL}/customer/wish-list/remove_product/${id}`)
        .then((response) => {
          console.log(response);
          window.location.reload(false);
        });
      // if (response.data.success) {
      //   setAddToCartProduct(
      //     (prevData) => prevData.filter((item) => item.id !== id)
      //     // refresh
      //   );
      //   window.location.reload(false);
      //   console.log("Product removed from cart:", response.data);
      // }
    } catch (error) {
      console.error("Error removing product from cart:", error);
    }
  };

  const handleRemoveFromWishlist = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/customer/wish-list/remove/7/1`);
      setWishlistData((prevData) => prevData.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error removing item from wishlist:", error);
      if (error.response) {
        console.log("Response status:", error.response.status);
        console.log("Response data:", error.response.data);
        toast.success("Your Product deleted successfully");
      }
    }
  };
  // const calculateRoundingAdjust = () => {
  //   if (addToCartProduct && addToCartProduct.length > 0) {
  //     const subtotal = addToCartProduct[0]?.price;
  //     const taxAmount = subtotal * 0.05;
  //     const totalAmount = subtotal + taxAmount;

  //     // Calculate the rounding adjust amount based on the sum of subtotal and taxAmount
  //     const roundingAdjust = Math.round(totalAmount) - totalAmount;

  //     return roundingAdjust.toFixed(2); // Format the rounding adjust to two decimal places
  //   }

  //   return "0.00";
  // };
  return (
    <>
      <Newheader />
      <Container fluid className="p-0">
        <div className="all-bg">
          <img src={productdetail} />
        </div>
      </Container>
      <section className="section-padding">
        <div className="add-cart">
          {addToCartProduct && addToCartProduct.length > 0 ? (
            addToCartProduct.map((item, index) => (
              <Container>
                <Row>
                  <Col lg={2}>
                    <img
                      src={
                        "https://canine.hirectjob.in//storage/app/public/product/" +
                        item.image
                      }
                    />
                  </Col>
                  <Col lg={6} className="align-self-center">
                    <h2>{item.item_name}</h2>
                    {/* <p>with paneer or cottage cheese.</p> */}
                  </Col>
                  <Col lg={2} className="align-self-center">
                    <h3>₹{item.price}</h3>
                    {/* <div className="quantity-btn">
                      <button onClick={handleIncrementone}>
                        <i className="fa fa-minus" />
                      </button>
                      <span>{item.quantity}</span>

                      <button onClick={handleDecrementone}>
                        <i className="fa fa-plus" />
                      </button>
                    </div> */}
                    <div className="quantity-btn">
                      <button onClick={handleDecrementone}>
                        <i className="fa fa-minus" />
                      </button>
                      <form>
                        <div className="form-group">
                          <input
                            type="tel"
                            className="form-control"
                            placeholder="Quantity"
                            value={quantity == 0 ? 1 : 1}
                            // onChange={handleQuantityChange}
                            autoComplete="new-number"
                          />
                        </div>
                      </form>
                      <button onClick={handleIncrementone}>
                        <i className="fa fa-plus" />
                      </button>
                    </div>
                  </Col>
                  <Col lg={2} className="align-self-center">
                    <div
                      className="delete-addcard"
                      // onClick={() => removeFromCart(item.id)}
                    >
                      <Link onClick={() => removeFromCart(item.id)}>
                        <i class="fa fa-trash-o" />
                      </Link>
                    </div>
                  </Col>
                  <hr />
                </Row>
              </Container>
            ))
          ) : (
            <div className="Emptycart">
              <img src={cart} />
              <p className="emptyMSG">Cart is Empty</p>
            </div>
          )}
          {addToCartProduct && addToCartProduct.length > 0 ? (
            <Container>
              <div className="needplace">
                <Row className="justify-content-center">
                  <Col lg={5}>
                    {!coupencode ? (
                      <div class="card mb-3">
                        <div class="card-body">
                          <form>
                            <div class="form-group">
                              <label>Have a Coupon Code?</label>
                              <div class="input-group ">
                                <input
                                  type="text"
                                  class="form-control coupon"
                                  name=""
                                  placeholder="Coupon code"
                                />
                                <span class="input-group-append px-3">
                                  <button
                                    onClick={() => {
                                      setcoupenCode(!coupencode);
                                    }}
                                    class="btn btn-primary btn-apply coupon"
                                    data-toggle="modal"
                                    data-target="#Coupon"
                                  >
                                    Apply
                                  </button>
                                </span>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    ) : (
                      <div className="add-cart-Voucher ">
                        <Row>
                          <Col>
                            <img src={voch} />
                          </Col>
                          <Col className="align-self-center">
                            <h5>Voucher Discount</h5>
                          </Col>
                          <Col className="align-self-center">
                            <h6>$30.00</h6>
                          </Col>
                          <Col className="align-self-center">
                            <button
                              onClick={() => {
                                setcoupenCode(!coupencode);
                              }}
                              type="button"
                              class="btn btn-danger"
                            >
                              X
                            </button>
                            {/* <button
                            onClick={() => {
                              setcoupenCode(!coupencode);
                            }}
                            type="button"
                            class="close"
                            aria-label="Close"
                          >
                            <span aria-hidden="true">&times;</span>
                          </button> */}
                          </Col>
                        </Row>
                      </div>
                    )}
                  </Col>
                </Row>
              </div>
            </Container>
          ) : null}
          {addToCartProduct && addToCartProduct.length > 0 ? (
            <Container>
              <div className="needplace">
                <Row className="justify-content-center">
                  <Col lg={8}>
                    <div className="add-cart-total">
                      <Row>
                        <Col>
                          <h5>Sub Total</h5>
                        </Col>
                        <Col>
                          <h5>₹{addToCartProduct[0]?.price}</h5>
                        </Col>
                      </Row>
                      <hr />
                      <Row>
                        <Col>
                          <h5>Tax(5%)</h5>
                        </Col>
                        <Col>
                          <h5>₹{addToCartProduct[0]?.price * 0.05}</h5>
                        </Col>
                      </Row>
                      <hr />
                      <Row>
                        <Col>
                          <h5>Rounding Adjust</h5>
                        </Col>
                        <Col>
                          <h5>
                            ₹
                            {/* {(
                              (addToCartProduct[0]?.price ||
                                addToCartProduct[0]?.price) +
                              (taxAmount || addToCartProduct[0]?.price * 0.05) +
                              calculateRoundingAdjust()
                            ).toFixed(2)}{" "} */}
                            {/* Calculate and display the Rounding Adjust */}
                          </h5>
                        </Col>
                      </Row>
                    </div>
                  </Col>
                </Row>
              </div>
            </Container>
          ) : null}
          {addToCartProduct && addToCartProduct.length > 0 ? (
            <Container>
              <div className="needplace">
                <div className="address">
                  <h3>Address</h3>
                  <div className="address-card">
                    {/* <Row>
                    <Col lg={10}> */}
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesettim Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s,
                    </p>
                    {/* </Col>
              
                  </Row> */}
                  </div>
                </div>
              </div>
            </Container>
          ) : null}
          {addToCartProduct && addToCartProduct.length > 0 ? (
            <Container>
              <div className="needplace">
                <div className="address">
                  <h3>Shipping Address</h3>
                  <div className="address-card">
                    <Row>
                      <Col lg={10}>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesettim Ipsum is simply dummy text of the printing
                        and typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                      </Col>
                      <Col lg={2}>
                        <Button
                          data-toggle="modal"
                          data-target="#changeadress-model"
                        >
                          Change
                        </Button>
                      </Col>
                    </Row>
                  </div>
                </div>
              </div>
            </Container>
          ) : null}
          {addToCartProduct && addToCartProduct.length > 0 ? (
            <Container>
              <div className="needplace">
                <div className="totalPAY">
                  <Row className="justify-content-center">
                    <Col lg={10}>
                      <div className="totelPAYCAR">
                        <Row>
                          <Col sm={6}>
                            <h4>Total</h4>
                            <h2>₹620.00</h2>
                          </Col>
                          <Col sm={6}>
                            <Button>
                              <Link to="/user-pay-method">Checkout</Link>
                            </Button>
                            <Button>
                              <Link to="/product">Continue Shopping</Link>
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </Container>
          ) : null}
        </div>
      </section>

      <Footer />

      {/* Modal */}
      <div
        className="modal fade editAddress"
        id="changeadress-model"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit For New Address
              </h5>
              {/* <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button> */}
            </div>
            <div className="modal-body">
              <div class="form-group">
                <label for="exampleFormControlInput1">New address</label>
                <input class="form-control" type="text" />
              </div>
              <div class="form-group">
                <label for="exampleFormControlInput1">State</label>
                <select
                  class="form-control"
                  aria-label="Default select example"
                >
                  <option>state</option>
                </select>
              </div>
              <div class="form-group">
                <label for="exampleFormControlInput1">City</label>
                <select
                  class="form-control"
                  aria-label="Default select example"
                >
                  <option>City</option>
                </select>
              </div>
              <div class="form-group">
                <label for="exampleFormControlInput1">Pincode</label>
                <input class="form-control" type="text" />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary">
                Update
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <div
        className="modal fade notification-area"
        id="Coupon"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <h5>Coupon List</h5>
              {couponlist && couponlist.length > 0 ? (
                couponlist.map((item, index) => (
                  <div className="notification">
                    <Row>
                      <Col lg={12}>
                        <table>
                          <tbody>
                            <tr>
                              <th>Title : </th>
                              <td>{item.title}</td>
                            </tr>
                            <tr>
                              <th>Code : </th>
                              <td>{item.code}</td>
                            </tr>
                            <tr>
                              <th>Discount Type : </th>
                              <td>{item.discount_type}</td>
                            </tr>
                            <tr>
                              <th>Discount : </th>
                              <td>{item.discount}</td>
                            </tr>
                            <tr>
                              <th>Min Purchase : </th>
                              <td>{item.min_purchase}</td>
                            </tr>
                            <tr>
                              <th>Max Discount : </th>
                              <td>{item.max_discount}</td>
                            </tr>
                            <tr>
                              <th>Start Date : </th>
                              <td>{item.start_date}</td>
                            </tr>
                            <tr>
                              <th>Expire Date : </th>
                              <td>{item.expire_date}</td>
                            </tr>
                          </tbody>
                        </table>
                      </Col>
                    </Row>
                  </div>
                ))
              ) : (
                <p className="emptyMSG">No Coupon List.</p>
              )}

              {/* <div className='notification'>
              <Row>
                <Col lg={2}>
                  <img src={pro} />
                </Col>
                <Col lg={10} className='align-self-center'>
                  <h6>Comment on your announce Alpina B12-Alpina...</h6>
                </Col>
              </Row>
            </div>
            <div className='notification'>
              <Row>
                <Col lg={2}>
                  <img src={pro} />
                </Col>
                <Col lg={10} className='align-self-center'>
                  <h6>Comment on your announce Alpina B12-Alpina...</h6>
                </Col>
              </Row>
            </div>
            <div className='notification'>
              <Row>
                <Col lg={2}>
                  <img src={pro} />
                </Col>
                <Col lg={10} className='align-self-center'>
                  <h6>Comment on your announce Alpina B12-Alpina...</h6>
                </Col>
              </Row>
            </div> */}
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
            {/* <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" className="btn btn-primary">Save changes</button>
          </div> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Addcart;
