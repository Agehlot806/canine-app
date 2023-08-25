import React, { useState } from "react";
import Newheader from "../../directives/newheader";
import productdetail from "../../assets/images/banner/productdetail.png";
import { Button, Col, Container, Row } from "react-bootstrap";
import brandPro1 from "../../assets/images/img/brandPro1.png";
import Footer from "../../directives/footer";
// import { Link, useParams } from 'react-router-dom'
import cart from "../../assets/images/icon/cart1.png";
import Wholeheader from "../../directives/wholesalesheader";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../Constant/Index";
import { Toaster, toast } from "react-hot-toast";
import { loadRazorpay } from "../../utils";
import { useEffect } from "react";
import paydone from "../../assets/images/icon/paydone.png";

function WholesellerAddCart() {
  const { id } = useParams();
  console.log("id", id);
  // Create a ref to store the list of items in the cart
  const [quantity, setQuantity] = useState(1);
  const [addToCartProduct, setAddToCartProduct] = useState([]);
  console.log("addToCartProduct: ", addToCartProduct);
  // const [customer_id, setcustomer_id] = useState("");
  const [coupencode, setcoupenCode] = useState(false);
  const [couponlist, setcouponlist] = useState([]);
  const [paymentId, setPaymentId] = useState("");
  const [selectedInput, setSelectedInput] = useState("");

  const handleRadioChange = (event) => {
    setSelectedInput(event.target.checked);
  };

  const redirectToShipping = () => {
    Navigate("/shipping");
  };
  let originalPrice = 0;

  const updatedPrice = originalPrice * 1.05;
  const priceWithoutCents = parseInt(updatedPrice);
  addToCartProduct.forEach((el) => {
    let allPrice = parseInt(el.price) + parseInt(originalPrice);
    originalPrice = allPrice;
  });
  const taxamound = Math.floor(originalPrice * 0.05);
  // console.log("allPrice: ", originalPrice);
  // console.log("taxamound: ", taxamound);

  const shippingpage = useNavigate("");
  const [sendcartdata, setSandCartData] = useState([]);
  const handleSendRequest = async () => {
    const cartData = sendcartdata.map((item) => ({
      product_id: item.item_id,
      variation: item.variant,
      price: item.price,
      quantity: item.quantity,
      tax_amount: taxamound,
      discount_on_item: disscountvalue,
    }));
    const requestData = {
      user_id: customer_id,
      coupon_discount_amount: 200,
      coupon_discount_title: "coupan",
      payment_status: "confirm",
      order_status: "pending",
      total_tax_amount: 160,
      payment_method: "online",
      transaction_reference: "sadgash23asds",
      delivery_address_id: 2,
      coupon_code: "sdf42",
      order_type: "delivery",
      checked: 1,
      store_id: 1,
      zone_id: 2,
      delivered_status: "undelivered",
      delivery_address: "Delhi city 389",
      item_campaign_id: "",
      order_amount: parseInt(
        originalPrice * 0.05 + originalPrice - disscountvalue
      ),
      cart: cartData,
    };
    fetch(`https://canine.hirectjob.in/api/v1/customer/order/place`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        console.log("responseData???>>>>", responseData);
        shippingpage("/shipping/" + responseData.data.order_id);
      })
      .catch((error) => {
        console.error("Error sending request:", error);
      });
  };
  const disscountvalue = localStorage.getItem("disconut");
  console.log("disscountvalue", disscountvalue);
  const coupendisscount = (dis) => {
    setcoupenCode(!coupencode);
    localStorage.setItem("disconut", dis);
    console.log("disccount?????", dis);
  };

  const handlePayment = async () => {
    try {
      // const response = await loadRazorpay();
      loadRazorpay()
        .then((response) => {
          console.log("response handlePayment: ", response);
          // Code to execute after the script has loaded
        })
        .catch((error) => {
          console.error("Error loading Razorpay script:", error);
        });

      const options = {
        key: "rzp_test_FaUw0RsaEo9pZE", // Replace with your actual key
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
  // const originalPrice = addToCartProduct[0]?.price;


  

  // const customer_id = localStorage.getItem("userInfo");
  // let storedUserId = JSON.parse(customer_id);

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value, 10);
    if (!isNaN(newQuantity)) {
      setQuantity(newQuantity);
    }
  };

  const handleIncrementone = (index) => {
    const updatedCart = [...addToCartProduct];
    updatedCart[index].quantity += 1;
    updatedCart[index].price +=
      updatedCart[index].price / (updatedCart[index].quantity - 1); // Update the price per item
    setAddToCartProduct(updatedCart);
  };

  const handleDecrementone = (index) => {
    const updatedCart = [...addToCartProduct];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
      updatedCart[index].price =
        updatedCart[index].price *
        (updatedCart[index].quantity / (updatedCart[index].quantity + 1)); // Update the price
      setAddToCartProduct(updatedCart);
    }
  };
  const fieldpagerefresh = () => {
    window.location.reload(false);
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
        // id: id, // Replace this with the correct product_id you want to add
        // user_id: storedUserId,
        // price: price,
        // quantity: quantity,
        // image: image,
        // item_id: item_id,
        // item_name: item_name,
        // variant: variant,
        params: {
          id: id, // Replace this with the correct product_id you want to add
          quantity: quantity,
        },
      })

      .then((response) => {
        console.log(
          "addtocard show data>>>>?????565756756?????7878?????",
          response
        );
        const newCartsend = response.data.data.map((item) => ({
          item_id: item.item_id,
          variant: item.variant,
          price: item.price,
          quantity: item.quantity, // Assuming the response already includes the quantity
        }));

        setSandCartData([...newCartsend]);

        const newCartItems = response.data.data.map((item) => ({
          id: item.id,
          item_name: item.item_name,
          image: item.image,
          price: item.price,
          quantity: item.quantity, // Assuming the response already includes the quantity
        }));

        // Update the addToCartProduct state by adding the new cart items
        setAddToCartProduct([...addToCartProduct, ...newCartItems]);

        // Clear the quantity input field after adding the item to the cart
        setQuantity(1);
        // cartItemsRef.current = response.data.data;
        // setAddToCartProduct(response.data.data);
        // console.log("response.data.data: ", response.data.data);
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
        "https://canine.hirectjob.in/api/v1/customer/address/update",
        profileData // Send the updated profileData in the request body
      );
      console.log("response in edit", response);
      if (response.data.status === 200) {
        console.log("Profile updated successfully!");
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
      <Wholeheader />
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
                      <button onClick={() => handleDecrementone(index)}>
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
                      <button onClick={() => handleIncrementone(index)}>
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
                              className={`fa ${
                                addressContentVisible
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
                                          <i
                                            className="fa fa-edit"
                                            data-toggle="modal"
                                            onClick={() => {
                                              setProfileData(item);
                                            }}
                                            data-target="#update-model"
                                          />
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
                            {/* <Button onClick={() => handlePayment()}>
                              Checkout
                            </Button> */}
                            <Button data-toggle="modal" data-target="#cod">
                              {/* <Link

                                // to="/user-pay-method"
                              > */}
                              Checkout
                              {/* </Link> */}
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
        id="wholesellerchangeaddress-model"
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
                      name="exampleRadios"
                      data-dismiss="modal"
                      onClick={() => handlePayment()}
                    />
                    <p>Online Payment</p>
                  </div>
                </div>
                <div className="select-card select-card3">
                  <div className="selct-card-text">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="exampleRadios"
                      value="second"
                      checked={selectedInput}
                      onChange={handleRadioChange}
                    />
                    <p>Cash On Delivery</p>
                  </div>
                </div>
                <Button
                  disabled={!selectedInput}
                  data-toggle="modal"
                  data-target="#paysubmit"
                  data-dismiss="modal"
                >
                  <Link>pay</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <div
        className="modal fade"
        id="paysubmit"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <div className="payment-done">
                <img src={paydone} />
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesettingLorem Ipsum is simply dummy text of the printing
                  and typesetting
                </p>
                <Button
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={handleSendRequest}
                >
                  <Link to="/wholeseller-shipping">Done</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default WholesellerAddCart;
