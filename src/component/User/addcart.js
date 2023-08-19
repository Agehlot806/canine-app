import React, { useEffect, useState, useRef } from "react";
import Newheader from "../../directives/newheader";
import productdetail from "../../assets/images/banner/productdetail.png";
import { Button, Col, Container, Row } from "react-bootstrap";
import brandPro1 from "../../assets/images/img/brandPro1.png";
import voch from "../../assets/images/icon/voch.png";
import cart from "../../assets/images/icon/cart1.png";
import Footer from "../../directives/footer";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../Constant/Index";
import { Toaster, toast } from "react-hot-toast";

function Addcart() {
  const { id } = useParams();
  console.log("id", id);
  // Create a ref to store the list of items in the cart
  const cartItemsRef = useRef();
  const [quantity, setQuantity] = useState(1);
  const [selectQuantity, setSelectQuantity] = useState(1);
  // const [customer_id, setcustomer_id] = useState("");
  const [coupencode, setcoupenCode] = useState(false);
  const [addToCartProduct, setAddToCartProduct] = useState([]);
  const [couponlist, setcouponlist] = useState([]);
  const [itemQuantities, setItemQuantities] = useState({});

  // const originalPrice = addToCartProduct[0]?.price;

  let originalPrice = 0;

  const updatedPrice = originalPrice * 1.05;
  const priceWithoutCents = parseInt(updatedPrice);
  addToCartProduct.forEach((el) => {
    let allPrice = parseInt(el.price) + parseInt(originalPrice);
    originalPrice = allPrice;
  });
  console.log("originalPrice: ", originalPrice);

  // const customer_id = localStorage.getItem("userInfo");
  // let storedUserId = JSON.parse(customer_id);

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value, 10);
    if (!isNaN(newQuantity)) {
      setQuantity(newQuantity);
    }
  };

  const fieldpagerefresh = () => {
    window.location.reload(false);
  }


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
    GetdataAll();
    allAddressList();
  }, []);

  // useEffect(() => {
  //   setAddToCartProduct(cartItemsRef.current);
  // }, [cartItemsRef]);

  const addToCartData = async () => {
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

  const [selectedCity, setSelectedCity] = useState("");
  console.log("selectedCity: ", selectedCity);
  const GetdataAll = async (e) => {
    var headers = {
      Accept: "application/json",
      "Content-Data": "application/json",
    };
    await fetch(`${BASE_URL}/auth/state`, {
      method: "GET",
      headers: headers,
    })
      .then((Response) => Response.json())
      .then((Response) => {
        setStateall(Response?.data ? Response?.data : []);
        console.log("99999999999999999999", Response);
      })
      .catch((error) => {
        console.error("ERROR FOUND---->>>>" + error);
      });
  };

  const Getdatacity = (state) => {
    axios
      .get(`${BASE_URL}/auth/city?state=${state}`, {
        headers: { "Content-Data": "multipart/form-data" },
      })
      .then((response) => {
        console.log("responseresponse", response);
        setStateallCity(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const Subscription = (event) => {
    if (event.target.value) {
      setstate(event.target.value);

      Getdatacity(event.target.value);
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
        toast.success("Successfully added!");
        console.log("SuccessfullyAddress", data);
      })
      .catch((error) => {
        // toast.error("Field is required");
      });
  };

  // order placed
  const handleCheckOut = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/customer/order/place`, {
        user_id: storedUserId,
        image: productDetails.image,
        quantity: productDetails.quantity,
        price: productDetails.price,
        user_id: storedUserId,
        item_id: productDetails.id,
      });

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

  // const [addressContentVisible, setAddressContentVisible] = useState(false);
  // const toggleAddressContent = () => {
  //   setAddressContentVisible(!addressContentVisible);
  // };

  // const [selectedAddress, setSelectedAddress] = useState(null);

  // const handleAddressClick = (index) => {
  //   setSelectedAddress(addresslist[index]);
  // };

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [addressContentVisible, setAddressContentVisible] = useState(false);

  const handleAddressClick = (index) => {
    setSelectedAddress(addresslist[index]);
    setAddressContentVisible(false); // Hide the address content after selecting an address
  };

  const toggleAddressContent = () => {
    setAddressContentVisible(!addressContentVisible);
  };

  // storedUserId
  const customer_id = localStorage.getItem("userInfo");
  console.log("=======>>>>>> id", customer_id);
  let storedUserId = JSON.parse(customer_id);
  console.log("customer_id: ", customer_id);
  // ----------------------------------------

  const [addresslist, setaddresslist] = useState([]);
  const allAddressList = async () => {
    axios
      .get(`${BASE_URL}/customer/address/list/${storedUserId}`)
      .then((response) => {
        console.log(response);
        console.log("address list Successful");
        setaddresslist(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  console.log("address list", addresslist);

  const handleDeleteAddress = (id) => {
    axios
      .delete(
        `https://canine.hirectjob.in/api/v1/customer/address/delete/${id}`
      )
      .then((response) => {
        toast.success("Address deleted successfully");
        console.log("Address deleted successfully:", response.data.message);
        setaddresslist((prevAddressList) =>
          prevAddressList.filter((item) => item.id !== id)
        );
      })
      .catch((error) => {
        console.error("Error deleting address:", error);
      });
  };

  // ============================================================

  const [profileData, setProfileData] = useState({});
  console.log("profileData: ", profileData);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'https://canine.hirectjob.in/api/v1/customer/address/update',
        profileData // Send the updated profileData in the request body
      );
      console.log('response in edit', response);
      if (response.data.status === 200) {
        console.log('Profile updated successfully!');
        setaddresslist((prevAddressList) =>
          prevAddressList.filter((item) => item.id !== id)
        );
        fieldpagerefresh(); // Call fieldpagerefresh here
      }
    } catch (error) {
      console.error(error);
    }
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
                            // value={itemQuantities[item.id] || 1}
                            value={item.quantity}
                            onChange={handleQuantityChange}
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
                                  data-toggle="modal"
                                  data-target="#Coupon"
                                />
                                {/* <span class="input-group-append px-3">
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
                                </span> */}
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
                          {/* <h5>₹{addToCartProduct[0]?.price}</h5> */}
                          <h5>₹{originalPrice}</h5>
                        </Col>
                      </Row>
                      <hr />
                      <Row>
                        <Col>
                          <h5>Tax(5%)</h5>
                        </Col>
                        <Col>
                          <h5>₹{Math.floor(originalPrice * 0.05)}</h5>
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
                            {`${parseInt(
                              originalPrice * 0.05 + originalPrice
                            )}`}
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
                    {console.log("addresslist", addresslist)}
                    {addresslist && addresslist.length > 1 ? (
                      addresslist.map(
                        (item, index) =>
                          index === 0 && (
                            <p key={item.id}>
                              {item.house_no} {item.area} {item.landmark}{" "}
                              {item.city} {item.state} {item.pincode}
                            </p>
                          )
                      )
                    ) : (
                      <p>No data to display</p>
                    )}
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
                        {selectedAddress ? (
                          <div className="selectedAddress-area">
                            <p>
                              {selectedAddress.first_name}{" "}
                              {selectedAddress.last_name}
                            </p>
                            <p>
                              {selectedAddress.house_no} {selectedAddress.area}{" "}
                              {selectedAddress.landmark} {selectedAddress.city}{" "}
                              {selectedAddress.state} {selectedAddress.pincode}
                            </p>
                            <p>Mobile: {selectedAddress.mobile}</p>
                          </div>
                        ) : (
                          <p>No address selected</p>
                        )}
                      </Col>
                      <Col lg={2}>
                        <Button
                          data-toggle="modal"
                          data-target="#changeadress-model"

                        >
                          Add +
                        </Button>
                      </Col>
                      <Col lg={12}>
                        <div className="address-arrow">
                          <button onClick={toggleAddressContent}>
                            Select Address{" "}
                            <i
                              className={`fa ${addressContentVisible
                                  ? "fa-arrow-up"
                                  : "fa-arrow-down"
                                }`}
                              aria-hidden="true"
                            ></i>
                          </button>
                        </div>
                        <br />
                        <Row>
                          {addressContentVisible && (
                            <Col lg={12}>
                              <div className="address-Content">
                                {addresslist && addresslist.length > 0 ? (
                                  addresslist.map((item, index) => (
                                    <div className="chk-address" key={item.id}>
                                      <div className="chk-center">
                                        <input
                                          className="form-check-input"
                                          type="radio"
                                          name="exampleRadios"
                                          onClick={() =>
                                            handleAddressClick(index)
                                          }
                                        />
                                      </div>
                                      <div className="Daynamic-address">
                                        <table>
                                          <tr>
                                            <th>Name:&nbsp;</th>
                                            <td>
                                              {item.first_name}&nbsp;
                                              {item.last_name}
                                            </td>
                                          </tr>
                                          <tr>
                                            <th>Address:&nbsp;</th>
                                            <td>
                                              {item.house_no} {item.area}{" "}
                                              {item.landmark} {item.city}{" "}
                                              {item.state} {item.pincode}
                                            </td>
                                          </tr>
                                          <tr>
                                            <th>Mobile:&nbsp;</th>
                                            <td>{item.mobile}</td>
                                          </tr>
                                        </table>
                                        <div className="address-delete">
                                          <i
                                            className="fa fa-trash"
                                            onClick={() =>
                                              handleDeleteAddress(item.id)
                                            }
                                          />
                                          &nbsp; &nbsp;
                                          <i className="fa fa-edit" data-toggle="modal"
                                            onClick={() => {
                                              setProfileData(item)
                                            }}
                                            data-target="#update-model" />
                                        </div>
                                      </div>
                                    </div>
                                  ))
                                ) : (
                                  <p>No Addresses Available</p>
                                )}
                              </div>
                            </Col>
                          )}
                        </Row>
                      </Col>
                    </Row>
                  </div>
                </div>
              </div>

            </Container>
          ) : null}
          {addToCartProduct && addToCartProduct.length > 0 && (
            <Container>
              <div className="needplace">
                <div className="totalPAY">
                  <Row className="justify-content-center">
                    <Col lg={10}>
                      <div className="totelPAYCAR">
                        <Row>
                          <Col sm={6}>
                            <h4>Total</h4>
                            <h2>
                              ₹{" "}
                              {`${parseInt(
                                originalPrice * 0.05 + originalPrice
                              )}`}
                            </h2>
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
          )}
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
                New Address Add
              </h5>
            </div>
            <div className="modal-body">
              <div class="form-group">
                <label>First Name</label>
                <input
                  class="form-control"
                  type="text"
                  value={first_name}
                  onChange={(e) => setfirst_name(e.target.value)}
                />
              </div>
              <div class="form-group">
                <label>Last Name</label>
                <input
                  class="form-control"
                  type="text"
                  value={last_name}
                  onChange={(e) => setlast_name(e.target.value)}
                />
              </div>
              <div class="form-group">
                <label>Mobile</label>
                <input
                  class="form-control"
                  type="number"
                  value={mobile}
                  onChange={(e) => setmobile(e.target.value)}
                />
              </div>
              <div class="form-group">
                <label>Plat,House no,Building,Company</label>
                <input
                  class="form-control"
                  type="text"
                  value={house_no}
                  onChange={(e) => sethouse_no(e.target.value)}
                />
              </div>
              <div class="form-group">
                <label>Area, Street,Sector,Village</label>
                <input
                  class="form-control"
                  type="text"
                  value={area}
                  onChange={(e) => setarea(e.target.value)}
                />
              </div>
              <div class="form-group">
                <label>Landmark</label>
                <input
                  class="form-control"
                  type="text"
                  value={landmark}
                  onChange={(e) => setlandmark(e.target.value)}
                />
              </div>
              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <label>State</label>
                    <select
                      className="form-control"
                      onChange={Subscription}
                      value={state}
                      onInput={(e) => setstate(e.target.value)}
                    >
                      <option>State Choose...</option>
                      {stateall.map((items) => (
                        <option value={items.id} key={items.id}>
                          {items.state_name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <label>City</label>
                    <select
                      className="form-control"
                      onInput={(e) => setSelectedCity(e.target.value)}
                      value={selectedCity}
                      onChange={(e) => setcity(e.target.value)}
                    >
                      <option>City Choose...</option>
                      {stateallCity.map((items) => (
                        <option>{items.city_name}</option>
                      ))}
                    </select>
                    {/* {formValid.cityname && (
                        <span style={{ color: "red" }}>City is required</span>
                      )} */}
                  </div>
                </div>
              </div>
              <div class="form-group">
                <label for="exampleFormControlInput1">Pincode</label>
                <input
                  class="form-control"
                  type="text"
                  value={pincode}
                  onChange={(e) => setpincode(e.target.value)}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleAddAddress}
                onInput={fieldpagerefresh}
              >
                Add +
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* update-model */}
      <div
        className="modal fade editAddress"
        id="update-model"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Update Address
              </h5>
            </div>
            <div className="modal-body">
              <div class="form-group">
                <label>First Name</label>
                <input
                  class="form-control"
                  type="text"
                  name="first_name"
                  value={profileData.first_name || ""}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      first_name: e.target.value.replace(/[^A-Za-z]/, ""),
                    })
                  }
                />
              </div>
              <div class="form-group">
                <label>Last Name</label>
                <input
                  class="form-control"
                  type="text"
                  placeholder="Enter last name"
                  name="last_name"
                  value={profileData.last_name || ""}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      last_name: e.target.value.replace(/[^A-Za-z]/, ""),
                    })
                  }
                />
              </div>
              <div class="form-group">
                <label>Mobile</label>
                <input
                  type="tel"
                  name="mobile"
                  class="form-control"
                  maxLength={10}
                  value={profileData.mobile || ""}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      mobile: e.target.value
                        .replace(/\D/g, "")
                        .substring(0, 10),
                    })
                  }
                />
              </div>
              <div class="form-group">
                <label>Plat,House no,Building,Company</label>
                <input
                  class="form-control"
                  type="text"
                  name="house_no"
                  value={profileData.house_no || ""}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      house_no: e.target.value.replace(/[^A-Za-z]/, ""),
                    })
                  }
                />
              </div>
              <div class="form-group">
                <label>Area, Street,Sector,Village</label>
                <input
                  class="form-control"
                  type="text"
                  name="area"
                  value={profileData.area || ""}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      area: e.target.value.replace(/[^A-Za-z]/, ""),
                    })
                  }
                />
              </div>
              <div class="form-group">
                <label>Landmark</label>
                <input
                  class="form-control"
                  type="text"
                  name="landmark"
                  value={profileData.landmark || ""}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      landmark: e.target.value.replace(/[^A-Za-z]/, ""),
                    })
                  }
                />
              </div>
              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <label>State</label>
                    <select
                      className="form-control"
                      onChange={Subscription}
                      value={state}
                      onInput={(e) =>
                        setProfileData({
                          ...profileData,
                          state: e.target.value.replace(/[^A-Za-z]/, ""),
                        })
                      }
                    >
                      <option>State Choose...</option>
                      {stateall.map((items) => (
                        <option value={profileData.state || ""} key={items.id}>
                          {items.state_name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <label>City</label>
                    <select
                      className="form-control"
                      onInput={(e) => setSelectedCity(e.target.value)}
                      name={city}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          city: e.target.value.replace(/[^A-Za-z]/, ""),
                        })
                      }
                    >
                      <option>City Choose...</option>
                      {stateallCity.map((items) => (
                        <option value={profileData.city || ""} key={items.id}>
                          {items.city_name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div class="form-group">
                <label for="exampleFormControlInput1">Pincode</label>
                <input
                  class="form-control"
                  type="text"
                  value={profileData.pincode || ""}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      pincode: e.target.value.replace(/[^A-Za-z]/, ""),
                    })
                  }
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleFormSubmit}
                data-dismiss="modal"
              >
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

                        <div className="text-center">
                          <button
                            onClick={() => {
                              setcoupenCode(!coupencode);
                            }}
                            type="button"
                            className="btn btn-primary btn-apply coupon"
                            data-toggle="modal"
                            data-target="#Coupon"
                          >
                            Apply
                          </button>
                        </div>
                      </Col>
                    </Row>
                  </div>
                ))
              ) : (
                <p className="emptyMSG">No Coupon List.</p>
              )}

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
