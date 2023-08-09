import React, { useEffect, useState } from "react";
import Header from "../../directives/header";
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
  console.log("id111111111111: ", id);
  const [quantity, setQuantity] = useState(1);
  const [customer_id, setcustomer_id] = useState('');
  const [coupencode, setcoupenCode] = useState(false);
  const [addToCartProduct, setAddToCartProduct] = useState([]);
  console.log("addToCartProduct: ", addToCartProduct);
  const handleIncrementone = () => {
    setQuantity(quantity + 1);
  };
  const handleDecrementone = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  useEffect(() => {
    getUserInfo()
    addToCartData();
  }, []);

   // storedUserId
   const getUserInfo = async ()=>{
    const customerData = await localStorage.getItem("userInfo");
    console.log("customerData: ",customerData);
    if (customerData) {
      setcustomer_id(JSON.parse(customerData).id)
    }
 
  }
  console.log("customer_id: ", customer_id);
   // ----------------------------------------

  const addToCartData = async () => {
    axios
      .get(`${BASE_URL}/customer/wish-list/add_to_card/2`)
      .then((response) => {
        console.log(response);
        setAddToCartProduct(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleRemoveFromWishlist = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/customer/wish-list/remove/7/1`);
      setWishlistData((prevData) => prevData.filter((item) => item.id !== id));

    } catch (error) {
      console.error('Error removing item from wishlist:', error);
      if (error.response) {
        console.log('Response status:', error.response.status);
        console.log('Response data:', error.response.data);
        toast.success("Your Product deleted successfully");
      }
    }
  };
  return (
    <>
      <Header />
      <Container fluid className="p-0">
        <div className="all-bg">
          <img src={productdetail} />
        </div>
      </Container>
      <section className="section-padding">
        <div className="add-cart">
          <Container>
            {addToCartProduct && addToCartProduct.length > 0 ? (
              addToCartProduct.map((item, index) => (
                <Row>
                  <Col lg={2}>
                    <img src={item.image} />
                  </Col>
                  <Col lg={7} className="align-self-center">
                    <h2>{item.item_name}</h2>
                    {/* <p>with paneer or cottage cheese.</p> */}
                  </Col>
                  <Col lg={2} className="align-self-center">
                    <h3>₹{item.price}</h3>
                    <div className="quantity-btn">
                      <button onClick={handleDecrementone}>
                        <i className="fa fa-minus" />
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={handleIncrementone}>
                        <i className="fa fa-plus" />
                      </button>
                    </div>
                  </Col>
                  <Col lg={1} className="align-self-center">
                    <div className="delete-addcard">
                      <i class="fa fa-trash-o" />
                    </div>
                  </Col>
                  <hr />
                </Row>
              ))
            ) : (
              <div className="Emptycart">
                <img src={cart} />
                <p className="emptyMSG">Cart is Empty</p>
              </div>
            )}
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
            <div className="needplace">
              <Row className="justify-content-center">
                <Col lg={8}>
                  <div className="add-cart-total">
                    <Row>
                      <Col>
                        <h5>Sub Total</h5>
                      </Col>
                      <Col>
                        <h5>₹620.00</h5>
                      </Col>
                    </Row>
                    <hr />
                    <Row>
                      <Col>
                        <h5>Tax(5%)</h5>
                      </Col>
                      <Col>
                        <h5>₹00.00</h5>
                      </Col>
                    </Row>
                    <hr />
                    <Row>
                      <Col>
                        <h5>Rounding Adjust</h5>
                      </Col>
                      <Col>
                        <h5>₹00.00</h5>
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Row>
            </div>
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
            <div className="needplace">
              <div className="address">
                <h3>Shipping Address</h3>
                <div className="address-card">
                  <Row>
                    <Col lg={10}>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesettim Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s,
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
    </>
  );
}

export default Addcart;
