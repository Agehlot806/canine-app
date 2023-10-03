import React, { useEffect, useState, useRef } from "react";
import Newheader from "../../directives/newheader";
import productdetail from "../../assets/images/banner/productdetail.png";
import { Button, Col, Container, Row } from "react-bootstrap";
import brandPro1 from "../../assets/images/img/brandPro1.png";
import voch from "../../assets/images/icon/voch.png";
import cart from "../../assets/images/icon/cart1.png";
import Footer from "../../directives/footer";
import {
  Link,
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../Constant/Index";
import { Toaster, toast } from "react-hot-toast";
import { loadRazorpay } from "../../utils";
import paydone from "../../assets/images/icon/paydone.png";

function Addcart() {
  const { id } = useParams();
  // const location = useLocation();
  // const params = new URLSearchParams(location.search);
  // const goWithBuyNow = params.get('gowithbuynow');
  console.log("id", id);
  // Create a ref to store the list of items in the cart
  const [quantity, setQuantity] = useState(1);
  const [addToCartProduct, setAddToCartProduct] = useState([]);
  const [coupencode, setcoupenCode] = useState(false);
  const [couponlist, setcouponlist] = useState([]);
  const [appliedCoupon, setAppliedCoupon] = useState(false);
  const [paymentId, setPaymentId] = useState("");
  const [selectedInput, setSelectedInput] = useState("");

  // const firstDiscount = couponlist.length > 0 ? couponlist[0] : null;
  // const firstDiscountTitle = firstDiscount ? firstDiscount.title : "";
  // const firstDiscountAmount = firstDiscount ? firstDiscount.discount : "";

  const handleRadioChange = (event) => {
    setSelectedInput(event.target.checked);
  };

  const redirectToShipping = () => {
    Navigate("/shipping");
  };
  // loadRazorpayScript
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
      // const response = await loadRazorpay();
      // loadRazorpay()
      //   .then((response) => {
      //     console.log("response handlePayment: ", response);
      //     // Code to execute after the script has loaded
      //   })
      //   .catch((error) => {
      //     console.error("Error loading Razorpay script:", error);
      //   });
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

  // const originalPrice = addToCartProduct[0]?.price;

  let originalPrice = 0;

  const updatedPrice = originalPrice * 0.05;
  const priceWithoutCents = parseInt(updatedPrice);
  addToCartProduct.forEach((el) => {
    let allPrice = parseInt(el.price) + parseInt(originalPrice);
    originalPrice = allPrice;
  });
  const taxamound = Math.floor(originalPrice * 0.05);
  console.log("allPrice: ", originalPrice);
  console.log("taxamound: ", taxamound);

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
      updatedCart[index].price / (updatedCart[index].quantity - 1);

    const updatedSendCart = [...sendcartdata];
    updatedSendCart[index].quantity += 1;

    // Calculate the new price with tax included
    const priceWithTax = updatedCart[index].price * 1.05; // Adding 5% tax
    updatedSendCart[index].price = priceWithTax;

    setAddToCartProduct(updatedCart);
    setSandCartData(updatedSendCart); // Update sendcartdata
  };

  const handleDecrementone = (index) => {
    const updatedCart = [...addToCartProduct];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
      updatedCart[index].price =
        updatedCart[index].price *
        (updatedCart[index].quantity / (updatedCart[index].quantity + 1));

      const updatedSendCart = [...sendcartdata];
      updatedSendCart[index].quantity -= 1;

      // Calculate the new price with tax included
      const priceWithTax = updatedCart[index].price * 1.05; // Adding 5% tax
      updatedSendCart[index].price = priceWithTax;

      setAddToCartProduct(updatedCart);
      setSandCartData(updatedSendCart); // Update sendcartdata
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
    AllBanner();
  }, []);

  const [sendcartdata, setSandCartData] = useState([]);
  const [dataLength, setDataLength] = useState(0);

  const addToCartData = async () => {
    axios
      .get(`${BASE_URL}/customer/wish-list/add_to_card/${storedUserId}`, {
        params: {
          id: id, // Replace this with the correct product_id you want to add
          quantity: quantity,
        },
      })

      .then((response) => {
        setDataLength(response.data.data.length);
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
          variant: item.variant,
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
    } catch (error) {
      console.error("Error removing product from cart:", error);
    }
  };

  const [selectedCity, setSelectedCity] = useState("");
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
        // console.log("99999999999999999999", Response);
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
        // console.log("responseresponse", response);
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

  const handleAddAddress = async (event) => {
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
    try {
      const response = await axios.post(
        `${BASE_URL}/customer/address/add`,
        data
      );
      setResponseMessage(response.data.message);
      toast.success("Successfully added!");
      // Call allAddressList to update the address list
      await allAddressList();
    } catch (error) {
      console.error("Error:", error);
    }
  };





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
  let storedUserId = JSON.parse(customer_id);
  // ----------------------------------------

  // const [addresslist, setAddressList] = useState([]);
  const [addresslist, setAddressList] = useState([]);
  const allAddressList = async () => {
    axios
      .get(`${BASE_URL}/customer/address/list/${storedUserId}`)
      .then((response) => {
        console.log(response);
        console.log("address list Successful");
        setAddressList(response.data.data);
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
        // console.log("Address deleted successfully:", response.data.message);
        setAddressList((prevAddressList) =>
          prevAddressList.filter((item) => item.id !== id)
        );
      })
      .catch((error) => {
        console.error("Error deleting address:", error);
      });
  };

  // ============================================================

  const [profileData, setProfileData] = useState({});
  const data = localStorage.getItem("disconut");
  const disscountvalue = JSON.parse(data);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://canine.hirectjob.in/api/v1/customer/address/update",
        profileData // Send the updated profileData in the request body
      );
      // console.log("response in edit", response);
      if (response.data.status === 200) {
        console.log("Profile updated successfully!");
        setAddressList((prevAddressList) =>

          prevAddressList.filter((item) => item.id !== id)
        );
        fieldpagerefresh(); // Call fieldpagerefresh here
      }
    } catch (error) {
      console.error(error);
    }
  };

  const shippingpage = useNavigate("");

  const handleSendRequest = async () => {
    const cartData = sendcartdata.map((item) => ({
      product_id: item.item_id,
      variation: item.variant,
      price: item.price,
      quantity: item.quantity,
      tax_amount: taxamound,
      discount_on_item: disscountvalue?.discount || "",
    }));
    const requestData = {
      user_id: customer_id,
      coupon_discount_amount: disscountvalue?.discount || "",
      coupon_discount_title: disscountvalue?.title || "",
      payment_status: "paid",
      order_status: "pending",
      total_tax_amount: taxamound,
      payment_method: selectedInput ? "offline" : "online",
      transaction_reference: selectedInput ? "" : "sadgash23asds",
      delivery_address_id: 2,
      coupon_code: disscountvalue?.code || "",
      order_type: "delivery",
      checked: selectedInput,
      store_id: 1,
      zone_id: 2,
      delivered_status: "undelivered",
      delivery_address: deliveryAddress,
      item_campaign_id: "",
      order_amount:
        parseInt(
          originalPrice * 0.05 + originalPrice - disscountvalue?.discount
        ) || originalPrice * 0.05 + originalPrice,
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

  // failed place api notifiction_post
  const handlenotifictionpostSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Prepare form data
    const notifymePostData = new FormData();
    notifymePostData.append("order_status", "Failed");
    notifymePostData.append("user_id", storedUserId);
    notifymePostData.append("item_id", "");
    notifymePostData.append("order_id", "");

    console.log("productDetails.id: ", productDetails?.id);
    console.log("notifymePostData", notifymePostData);

    // Send a request
    axios
      .post(`https://canine.hirectjob.in/api/v1/items/notifiction_post`, notifymePostData)
      .then((response) => {
        toast.success("Your data was successfully added");
      })
      .catch((error) => {
        toast.error("An error occurred. Please try again.");
      });
  };

  function formatAddress(selectedAddress) {
    return `${selectedAddress.first_name} ${selectedAddress.last_name}, ${selectedAddress.house_no} ${selectedAddress.area} ${selectedAddress.landmark}, ${selectedAddress.city}, ${selectedAddress.state} ${selectedAddress.pincode}, Mobile: ${selectedAddress.mobile}`;
  }

  // ...

  // Use the formatAddress function to get the selected address as a single string
  const deliveryAddress = selectedAddress
    ? formatAddress(selectedAddress)
    : "No address selected";

  console.log("disscountvalue", disscountvalue);
  const coupendisscount = (dis) => {
    setcoupenCode(!coupencode);
    localStorage.setItem("disconut", JSON.stringify(dis));
    setAppliedCoupon(true); // Set appliedCoupon to true when the button is clicked
    console.log("disccount?????", dis);
  };
  const clearCoupon = () => {
    setcoupenCode(!coupencode);
    setAppliedCoupon(false); // Set appliedCoupon to false when the "X" button is clicked
    localStorage.removeItem("disconut"); // Optionally, you can remove the discount value from localStorage here
  };
  const [first_nameError, setFirst_nameError] = useState("");

  const [last_nameError, setLast_nameError] = useState("");

  const [mobileError, setMobileError] = useState("");

  const [house_noError, setHouse_noError] = useState("");

  const [areaError, setAreaError] = useState("");

  const [landmarkError, setLandmarkError] = useState("");

  const [pincodeError, setPincodeError] = useState("");

  const [stateError, setStateError] = useState("");

  const [cityError, setCityError] = useState("");

  const [isFormValid, setIsFormValid] = useState(false);

  const validateForm = () => {
    if (
      first_name.trim() === "" ||
      last_name.trim() === "" ||
      mobile.trim() === "" ||
      house_no.trim() === "" ||
      area.trim() === "" ||
      landmark.trim() === "" ||
      state.trim() === "" ||
      selectedCity.trim() === "" ||
      pincode.trim() === ""
    ) {
      setIsFormValid(false);
    } else {
      setIsFormValid(true);
    }
  };

  const [homebanner, sethomebanner] = useState([]);
  const AllBanner = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/banners/`);
      sethomebanner(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <Toaster />
      <Newheader dataLength={dataLength} />
      <div className="home-section">
        <Container fluid className="p-0">
          <div>
            {homebanner
              ? homebanner.map(
                (item, index) =>
                  item.type === "default" && (
                    <div className="home-img">
                      <div className="">
                        <img
                          src={
                            "https://canine.hirectjob.in/storage/app/" +
                            item.image
                          }
                        />
                      </div>
                      <Row>
                        <Col lg={7}>
                          <div className="home-content">
                            <h1>{item.title}</h1>
                            <p>{item.description}</p>
                            <Button>
                              Explore More <i className="fa fa-angle-right" />
                            </Button>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  )
              )
              : null}
          </div>
        </Container>
      </div>
      <section className="section-padding">
        <div className="add-cart">
          {addToCartProduct && addToCartProduct.length > 0 ? (
            addToCartProduct.map((item, index) => (
              <Container>
                <Row>
                  <Col lg={2} sm={2}>
                    <img
                      src={
                        "https://canine.hirectjob.in//storage/app/public/product/" +
                        item.image
                      }
                    />
                  </Col>
                  <Col lg={6} sm={5} className="align-self-center addCARThead">
                    <h2>{item.item_name}</h2>
                    <p>Selected Variant : {item.variant}</p>
                  </Col>
                  <Col
                    lg={2}
                    sm={3}
                    xs={6}
                    className="align-self-center addCARThead"
                  >
                    <h3>₹{item.price}</h3>

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
                  <Col lg={2} sm={2} xs={6} className="align-self-center">
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
                            <h5>{disscountvalue?.title}</h5>
                          </Col>
                          <Col className="align-self-center">
                            <h6>₹{disscountvalue?.discount}</h6>
                          </Col>
                          <Col className="align-self-center">
                            <button
                              // onClick={() => {
                              //   setcoupenCode(!coupencode);
                              // }}
                              onClick={clearCoupon}
                              type="button"
                              class="btn btn-danger"
                            >
                              X
                            </button>
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
                          <h5>Coupon Discount</h5>
                        </Col>
                        <Col>
                          <h5>
                            ₹
                            {appliedCoupon
                              ? parseInt(disscountvalue?.discount)
                              : 0}
                          </h5>
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
                              originalPrice * 0.05 +
                              originalPrice -
                              disscountvalue?.discount ||
                              originalPrice + taxamound
                            )}`}
                            {/* Calculate  and display the Rounding Adjust */}
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
                      <Col lg={10} sm={9}>
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
                      <Col lg={2} sm={3}>
                        <Button
                          data-toggle="modal"
                          data-target="#changeadress-model"
                        >
                          Add +
                        </Button>
                      </Col>
                      <Col lg={12} sm={12}>
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
                              {/* {`${parseInt(
                                originalPrice * 0.05 + originalPrice
                              )}`} */}
                              {`${parseInt(
                                originalPrice * 0.05 +
                                originalPrice -
                                disscountvalue?.discount ||
                                originalPrice + taxamound
                              )}`}
                            </h2>
                          </Col>
                          <Col sm={6}>
                            {/* <Button onClick={() => handlePayment()}>
                              Checkout
                            </Button> */}
                            <Button
                              data-toggle="modal"
                              data-target="#cod"
                            // onClick={handleAddToCart}
                            >
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
                  <Link to="/shipping">Done</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
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
                  onChange={(e) => {
                    setfirst_name(e.target.value);
                    validateForm();
                  }}
                  onBlur={() => {
                    if (first_name.trim() === "") {
                      setFirst_nameError("First Name is required");
                    } else {
                      setFirst_nameError("");
                    }
                  }}
                />
                <span style={{ color: "red" }}>{first_nameError}</span>
              </div>
              <div class="form-group">
                <label>Last Name</label>
                <input
                  class="form-control"
                  type="text"
                  value={last_name}
                  onChange={(e) => {
                    setlast_name(e.target.value);
                    validateForm();
                  }}
                  onBlur={() => {
                    if (last_name.trim() === "") {
                      setLast_nameError("Last Name is required");
                    } else {
                      setLast_nameError("");
                    }
                  }}
                />
                <span style={{ color: "red" }}>{last_nameError}</span>
              </div>
              <div class="form-group">
                <label>Mobile</label>
                <input
                  type="tel"
                  name="mobile"
                  class="form-control"
                  maxLength={10}
                  value={mobile}
                  onChange={(e) => {
                    setmobile(e.target.value);
                    validateForm();
                    const numericValue = e.target.value.replace(/[^0-9+]/g, ""); // Remove non-numeric character
                    if (numericValue.length <= 10) {
                      setmobile(numericValue);
                    }
                  }}
                  onBlur={() => {
                    if (mobile.trim() === "") {
                      setMobileError("Mobile Number is required");
                    } else {
                      setMobileError("");
                    }
                  }}
                />
                <span style={{ color: "red" }}>{mobileError}</span>
              </div>
              <div class="form-group">
                <label>flat,House no,Building,Company</label>
                <input
                  class="form-control"
                  type="text"
                  value={house_no}
                  onChange={(e) => {
                    sethouse_no(e.target.value);
                    validateForm();
                  }}
                  onBlur={() => {
                    if (house_no.trim() === "") {
                      setHouse_noError(
                        "House no, flat, Building, Company Number is required"
                      );
                    } else {
                      setHouse_noError("");
                    }
                  }}
                />
                <span style={{ color: "red" }}>{house_noError}</span>
              </div>
              <div class="form-group">
                <label>Area, Street,Sector,Village</label>
                <input
                  class="form-control"
                  type="text"
                  value={area}
                  onChange={(e) => {
                    setarea(e.target.value);
                    validateForm();
                  }}
                  onBlur={() => {
                    if (area.trim() === "") {
                      setAreaError("Area, Street, Sector, Village is required");
                    } else {
                      setAreaError("");
                    }
                  }}
                />
                <span style={{ color: "red" }}>{areaError}</span>
              </div>
              <div class="form-group">
                <label>Landmark</label>
                <input
                  class="form-control"
                  type="text"
                  value={landmark}
                  onChange={(e) => {
                    setlandmark(e.target.value);
                    validateForm();
                  }}
                  onBlur={() => {
                    if (landmark.trim() === "") {
                      setLandmarkError("Landmark is required");
                    } else {
                      setLandmarkError("");
                    }
                  }}
                />
                <span style={{ color: "red" }}>{landmarkError}</span>
              </div>
              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <label>State</label>
                    <select
                      className="form-control"
                      onChange={Subscription}
                      value={state}
                      onInput={(e) => {
                        setstate(e.target.value);
                        validateForm();
                      }}
                      onBlur={() => {
                        if (state.trim() === "") {
                          setStateError("State is required");
                        } else {
                          setStateError("");
                        }
                      }}
                    >
                      <option>State Choose...</option>
                      {stateall.map((items) => (
                        <option value={items.id} key={items.id}>
                          {items.state_name}
                        </option>
                      ))}
                    </select>
                    <span style={{ color: "red" }}>{stateError}</span>
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <label>City</label>
                    <select
                      className="form-control"
                      onInput={(e) => setSelectedCity(e.target.value)}
                      value={selectedCity}
                      onChange={(e) => {
                        setcity(e.target.value);
                        validateForm();
                      }}
                      onBlur={() => {
                        if (city.trim() === "") {
                          setCityError("City is required");
                        } else {
                          setCityError("");
                        }
                      }}
                    >
                      <option>City Choose...</option>
                      {stateallCity.map((items) => (
                        <option>{items.city_name}</option>
                      ))}
                    </select>
                    <span style={{ color: "red" }}>{cityError}</span>
                  </div>
                </div>
              </div>
              <div class="form-group">
                <label for="exampleFormControlInput1">Pincode</label>
                <input
                  class="form-control"
                  type="text"
                  value={pincode}
                  onChange={(e) => {
                    setpincode(e.target.value);
                    validateForm();
                  }}
                  onBlur={() => {
                    if (pincode.trim() === "") {
                      setPincodeError("Pincode is required");
                    } else {
                      setPincodeError("");
                    }
                  }}
                />
                <span style={{ color: "red" }}>{pincodeError}</span>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleAddAddress}
                data-dismiss="modal"
                disabled={
                  !isFormValid ||
                  first_name.trim() === "" || // Add this condition
                  last_name.trim() === "" || // Add similar conditions for other fields
                  mobile.trim() === "" ||
                  house_no.trim() === "" ||
                  area.trim() === "" ||
                  landmark.trim() === "" ||
                  state.trim() === "" ||
                  selectedCity.trim() === "" ||
                  pincode.trim() === ""
                }
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
                {/* <input
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
                /> */}
                <input
                  className="form-control"
                  type="text"
                  name="first_name"
                  value={profileData.first_name || ""}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      first_name: e.target.value,
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
                      last_name: e.target.value,
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
                <label>flat,House no,Building,Company</label>
                <input
                  class="form-control"
                  type="text"
                  name="house_no"
                  value={profileData.house_no || ""}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      house_no: e.target.value,
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
                      area: e.target.value,
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
                      landmark: e.target.value,
                    })
                  }
                />
              </div>
              {/* <div className="row">
                <div className="col">
                  <div className="form-group">
                    <label>State</label>
                    <select
                      className="form-control"
                      onChange={Subscription}
                      value={profileData.state || ""}
                      onChange={(e) =>
                      setProfileData ({
                        ...profileData,
                        state: e.target.value,
                      })}
                    >
                      <option value="">State Choose...</option>
                      {stateall.map((items) => (
                        <option value={items.state_name} key={items.id}>
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
                      value={profileData.city || ""}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          city: e.target.value,
                        })
                      }
                    >
                      <option value="">City Choose...</option>
                      {stateallCity.map((items) => (
                        <option value={items.city_name} key={items.id}>
                          {items.city_name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div> */}
              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <label>State</label>
                    <select
                      className="form-control"
                      value={profileData.state || ""}
                      onChange={(e) => {
                        Subscription(e);
                        setProfileData({
                          ...profileData,
                          state: e.target.value,
                        });
                      }}
                    >
                      <option value="">State Choose...</option>
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
                      value={profileData.city || ""}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          city: e.target.value,
                        })
                      }
                    >
                      <option value="">City Choose...</option>
                      {stateallCity.map((items) => (
                        <option value={items.id} key={items.id}>
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
                      pincode: e.target.value,
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
                  <div className="notification" key={index}>
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
                            // onClick={() => {
                            //   setcoupenCode(!coupencode);
                            // }}
                            onClick={(e) => coupendisscount(item)}
                            type="button"
                            className="btn btn-primary btn-apply coupon"
                            data-dismiss="modal"
                          // data-toggle="modal"
                          // data-target="#Coupon"
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
