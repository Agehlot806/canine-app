import React, { useEffect, useState } from "react";
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
import { Toaster, toast } from "react-hot-toast";

function Addcart() {
  const { id } = useParams();
  console.log("id", id);
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
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  useEffect(() => {
    // getUserInfo()
    addToCartData();
    couponlistdata();
    GetStateAll();
  }, []);

  //  const getUserInfo = async ()=>{
  //   const customerData = await localStorage.getItem("userInfo");
  //   console.log("customerData: ",customerData);
  //   if (customerData) {
  //     setcustomer_id(JSON.parse(customerData).id)
  //   }

  // }
  // console.log("customer_id: ", customer_id);
  // ----------------------------------------

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
        product_id: id, // Replace this with the correct product_id you want to add
        // user_id: storedUserId,
        // quantity: quantity,
        // image: image,
        // item_id: item_id,
        // item_name: item_name,
        // price: price,
        // variant: variant,
      })
      .then((response) => {
        console.log(response);
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
      const response = await axios.delete(
        `${BASE_URL}/customer/wish-list/remove_product/${productId}`
      );
      console.log("Product removed from cart:", response.data);
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

  const GetStateAll = async (e) => {
    var headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    await fetch(`${BASE_URL}/auth/state`, {
      method: "GET",
      headers: headers,
    })
      .then((Response) => Response.json())
      .then((Response) => {
        setStateall(Response.state);
        // console.log("99999999999999999999", Response);
      })
      .catch((error) => {
        console.error("ERROR FOUND---->>>>" + error);
      });
  };

  const GetdCityAll = (state) => {
    axios
      .get(`${BASE_URL}/auth/city?state=${state}`, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        console.log("responseresponse", response);
        setStateallCity(response.data.state);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const Subscription = (event) => {
    if (event.target.value) {
      setstate(event.target.value);

      GetdCityAll(event.target.value);
    }
  };

  const [stateall, setStateall] = useState([]);
  const [stateallCity, setStateallCity] = useState([]);
  const [first_name, setfirst_name] = useState("");
  const [last_name, setlast_name] = useState("");
  const [mobile, setmobile] = useState("");
  const [house_no, sethouse_no] = useState("");
  const [area, setarea] = useState("");
  const [landmark, setlandmark] = useState("");
  const [pincode, setpincode] = useState("");
  const [state, setstate] = useState("");
  const [city, setcity] = useState("");

  const handleAddAddress = (event) => {
    event.preventDefault();
    const data = {
      user_id: storedUserId,
      first_name: first_name,
      last_name: last_name,
      mobile: mobile,
      house_no: house_no,
      area: area,
      landmark: landmark,
      state: state,
      city: city,
      pincode: pincode,
    };
    axios
      .post(`${BASE_URL}/customer/address/add`, data)
      .then((response) => {
        setResponseMessage(response.data.message);
        toast.success("Add Address Successfully");
        console.log("veterinary", data);
      })
      .catch((error) => {
        toast.error("Field is required");
      });
  };
  return (
    <>
    <Toaster />
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
                    <div
                      className="delete-addcard"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <i class="fa fa-trash-o" />
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
                        <Col>{/* <h5>₹{addToCartData[0]?.price}</h5> */}</Col>
                      </Row>
                      <hr />
                      <Row>
                        <Col>
                          <h5>Tax(5%)</h5>
                        </Col>
                        <Col>
                          {/* <h5>₹{addToCartData[0]?.price * 0.05}</h5> */}
                        </Col>
                      </Row>
                      <hr />
                      <Row>
                        <Col>
                          <h5>Rounding Adjust</h5>
                        </Col>
                        <Col>
                          {/* <h5>
                          ₹{addToCartProduct[0].price} + 5% = ₹
                          {(addToCartProduct[0].price * 0.05).toFixed(2)}
                        </h5> */}
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
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesettim Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s,
                    </p>
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
                <label>First Name</label>
                <input class="form-control" type="text" value={first_name}
                  onChange={(e) => setfirst_name(e.target.value)} />
              </div>
              <div class="form-group">
                <label>Last Name</label>
                <input class="form-control" type="text"
                  value={last_name}
                  onChange={(e) => setlast_name(e.target.value)} />
              </div>
              <div class="form-group">
                <label>Mobile</label>
                <input class="form-control" type="number"
                  value={mobile}
                  onChange={(e) => setmobile(e.target.value)} />
              </div>
              <div class="form-group">
                <label>Plat,House no,Building,Company</label>
                <input class="form-control" type="text"
                  value={house_no}
                  onChange={(e) => sethouse_no(e.target.value)} />
              </div>
              <div class="form-group">
                <label>Area, Street,Sector,Village</label>
                <input class="form-control" type="text"
                  value={area}
                  onChange={(e) => setarea(e.target.value)} />
              </div>
              <div class="form-group">
                <label>Landmark</label>
                <input class="form-control" type="text"
                  value={landmark}
                  onChange={(e) => setlandmark(e.target.value)} />
              </div>
              {/* <div class="form-group">
                <label>State</label>
                <select
                  onChange={Subscription}
                  value={state}
                  onInput={(e) => setstate(e.target.value)}
                  class="form-control"
                  aria-label="Default select example"
                >
                  <option>Choose...</option>
                  {stateall.map((items) => (
                    <option value={items.id} key={items.id}>
                      {items.state_name}
                    </option>
                  ))}
                </select>
              </div>
              <div class="form-group">
                <label>City</label>
                <select
                  value={city}
                  onChange={(e) => setcity(e.target.value)}
                  class="form-control"
                  aria-label="Default select example"
                >
                  <option>Choose...</option>
                  {stateallCity.map((items) => (
                    <option>{items.city_name}</option>
                  ))}
                </select>
              </div> */}
              <div class="form-group">
                <label for="exampleFormControlInput1">Pincode</label>
                <input class="form-control" type="text" value={pincode}
                  onChange={(e) => setpincode(e.target.value)} />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" onClick={handleAddAddress}>
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
