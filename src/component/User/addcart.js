import React, { useEffect, useState, useRef } from "react";
import Newheader from "../../directives/newheader";
import productdetail from "../../assets/images/banner/productdetail.png";
import { Button, Col, Container, Row } from "react-bootstrap";
import brandPro1 from "../../assets/images/img/brandPro1.png";
import voch from "../../assets/images/icon/voch.png";
// import Cart from "../../assets/images/icon/cart.png";
import CartOne from "../../assets/images/icon/cart1.png";
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
import { useCartWithoutLogin } from "../context/AddToCardWithoutLogin";

function Addcart() {
  const { id } = useParams();
  // const location = useLocation();
  // const params = new URLSearchParams(location.search);
  // const goWithBuyNow = params.get('gowithbuynow');
  // Create a ref to store the list of items in the cart
  const [quantity, setQuantity] = useState(1);
  const [addToCartProduct, setAddToCartProduct] = useState([]);
  console.log("addToCartProduct: ", addToCartProduct);
  const [coupencode, setcoupenCode] = useState(false);
  const [couponlist, setcouponlist] = useState([]);
  const [appliedCoupon, setAppliedCoupon] = useState(false);
  const [paymentId, setPaymentId] = useState("");
  const [selectedInput, setSelectedInput] = useState("");
  const loginType = localStorage.getItem("loginType");
  const vendorIDstore = localStorage.getItem("vendorID");
  const customerLoginId =
    loginType === "wholeseller"
      ? Number(localStorage.getItem("UserWholesellerId"))
      : localStorage.getItem("userInfo");
  const { cart, dispatch } = useCartWithoutLogin();

  useEffect(() => {
    if (customerLoginId !== null) {
      dispatch({
        type: "CLEAR_CART",
      });
    }
  }, [customerLoginId]);
  // const firstDiscount = couponlist.length > 0 ? couponlist[0] : null;
  // const firstDiscountTitle = firstDiscount ? firstDiscount.title : "";
  // const firstDiscountAmount = firstDiscount ? firstDiscount.discount : "";
  const paymentclose = () => {
    setSelectedInput(null);
  };
  const handleRadioChange = (event) => {
    setSelectedInput(event.target.checked);
  };

  const redirectToShipping = () => {
    Navigate("/shipping");
  };
  const [paymentDetails, setPaymentDetails] = useState({
    amount: 100, // In paise
    customerDetails: {
      name: "John Doe",
      phone: "9999999999",
    },
    orderId: "ORDER12345",
    cardDetails: {
      card_number: "4242424242424242",
      card_type: "DEBIT_CARD",
      card_issuer: "VISA",
      expiry_month: "12",
      expiry_year: "2023",
      cvv: "936",
    },
  });

  // const handlePayment = async () => {
  //   try {
  //     const response = await axios.post(
  //       "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay",
  //       paymentDetails
  //     );

  //     if (response.data.status === "SUCCESS") {
  //       window.location.href =
  //         response.data.instrumentResponse.redirectInfo.url;
  //     } else {
  //       // Handle payment initiation error
  //     }
  //   } catch (error) {
  //     // Handle network or other errors
  //   }
  // };
  // const handlePayment = async () => {
  //   const merchantId = "PGTESTPAYUAT";
  //   const accessKey = "099eb0cd-02cf-4e2a-8aca-3e6c6aff0399";
  //   const apiUrl = "https://api.phonepe.com/v3/payment";
  //   const requestData = {
  //     merchantId,
  //     accessKey,
  //     // Add other required parameters
  //     amount: 100,
  //     orderId: "10010",
  //     // Add other payment details
  //   };
  //   try {
  //     const response = await fetch(apiUrl, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(requestData),
  //     });
  //     if (response.ok) {
  //       const paymentResponse = await response.json();
  //       // Handle the payment response
  //       console.log("Payment Response:", paymentResponse);
  //     } else {
  //       // Handle errors
  //       console.error("Payment Error:", response.statusText);
  //     }
  //   } catch (error) {
  //     // Handle network errors
  //     console.error("Network Error:", error.message);
  //   }
  // };

  // loadRazorpayScript
  // const loadRazorpayScript = () => {
  //   return new Promise((resolve, reject) => {
  //     const script = document.createElement("script");
  //     script.src = "https://checkout.razorpay.com/v1/checkout.js";
  //     script.async = true;
  //     script.onload = resolve;
  //     script.onerror = reject;
  //     document.body.appendChild(script);
  //   });
  // };

  // const handlePayment = async () => {
  //   try {
  //     await loadRazorpayScript();

  //     const options = {
  //       key: "rzp_test_yXpKwsLWjkzvBJ", // Replace with your actual key
  //       amount: 10000, // Amount in paise (100 INR)
  //       currency: "INR",
  //       name: "HEllo world",
  //       description: "Test Payment",
  //       image: "https://your_logo_url.png",
  //       // order_id: response.id, // Order ID obtained from Razorpay
  //       handler: (response) => {
  //         setPaymentId(response.razorpay_payment_id);
  //         // Handle the success callback
  //         window.location.href = "/shipping";
  //         console.log("Payment Successful:", response);
  //       },

  //       prefill: {
  //         email: "test@example.com",
  //         contact: "1234567890",
  //       },
  //       notes: {
  //         address: "1234, Demo Address",
  //       },
  //       theme: {
  //         color: "#F37254",
  //       },
  //     };

  //     const rzp1 = new window.Razorpay(options);
  //     rzp1.open();
  //   } catch (error) {
  //     console.error("Razorpay Load Error:", error);
  //   }
  // };

  // const originalPrice = addToCartProduct[0]?.price;

  let originalPrice = 0;

  const updatedPrice = originalPrice * 0.05;
  const priceWithoutCents = parseInt(updatedPrice);
  if (customerLoginId === null) {
    cart.forEach((el) => {
      let allPrice =
        parseInt(el.orderamountwithquantity) + parseInt(originalPrice);
      originalPrice = allPrice;
    });
  } else {
    // addToCartProduct.forEach((el) => {
    //   let allPrice = parseInt(el.price) + parseInt(originalPrice);
    //   originalPrice = allPrice;
    // });
    addToCartProduct.forEach((el) => {
      let allPrice = parseInt(el.price * el.quantity) + parseInt(originalPrice);
      originalPrice = allPrice;
    });
  }

  // const taxamound = Math.floor(originalPrice * 0.05) ?? 0;
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    setTotalPrice(originalPrice);
  }, [originalPrice]);

  // Set deliveryChargesAmount based on the value of originalPrice
  const deliveryChargesAmount = totalPrice <= 999 ? 40 : 0;

  // State for delivery charges
  const [deliveryCharges, setDeliveryCharges] = useState(0);

  // Use useEffect to update the total price when the deliveryChargesAmount changes
  useEffect(() => {
    setDeliveryCharges(deliveryChargesAmount);
  }, [deliveryChargesAmount]);

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value, 10);
    if (!isNaN(newQuantity)) {
      setQuantity(newQuantity);
      // itemQuantity = newQuantity;
    }
  };
  const handleIncrementone = (index) => {
    const updatedCart = [...addToCartProduct];
    const updatedSendCart = [...sendcartdata];

    if (
      updatedCart[index].quantity ===
      Number(variantStockCount[index].total_quantity)
    ) {
      toast.error("Stock not avilable");
    } else {
      updatedCart[index].quantity += 1;
      // updatedCart[index].price +=
      //   updatedCart[index].price * (updatedCart[index].quantity - 1);

      updatedSendCart[index].quantity += 1;

      // Calculate the new price with tax included
      // const priceWithTax = updatedCart[index].price * 1.05; // Adding 5% tax
      // updatedSendCart[index].price = priceWithTax;
    }

    setAddToCartProduct(updatedCart);
    setSandCartData(updatedSendCart); // Update sendcartdata
    console.log("IndexupdatedCart: ", updatedCart[index].quantity);
    console.log(
      "IndexvariantStockCount: ",
      Number(variantStockCount[index].total_quantity)
    );
  };

  const handleDecrementone = (index) => {
    const updatedCart = [...addToCartProduct];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
      // updatedCart[index].price =
      // updatedCart[index].price *
      // (updatedCart[index].quantity / (updatedCart[index].quantity + 1));

      const updatedSendCart = [...sendcartdata];
      updatedSendCart[index].quantity -= 1;

      // Calculate the new price with tax included
      // const priceWithTax = updatedCart[index].price * 1.05; // Adding 5% tax
      // updatedSendCart[index].price = priceWithTax;

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
  const [variantStockCount, setVariantStockCount] = useState([]);
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

        const newVariantStockCount = response.data.data.map((stock) => ({
          total_quantity: stock.total_quantity,
        }));

        setVariantStockCount(newVariantStockCount);

        const newCartItems = response.data.data.map((item) => ({
          id: item.id,
          item_name: item.item_name,
          image: item.image,
          price: item.price,
          variant: item.variant,
          quantity: item.quantity,
          return_order: item?.return_order || "no",
          total_quantity: item.total_quantity,
          type: item.type,
          // Assuming the response already includes the quantity
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
      .post(`${BASE_URL}/auth/city?state=${state}`, {
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

  const [responseMessage, setResponseMessage] = useState("");
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
  const [isAddressSelected, setIsAddressSelected] = useState(false);
  const handleAddressClick = (index) => {
    setSelectedAddress(addresslist[index]);
    setAddressContentVisible(false); // Hide the address content after selecting an address
    setIsAddressSelected(true);
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

  const handleDeleteAddress = (id) => {
    axios
      .delete(`${BASE_URL}/customer/address/delete/${id}`)
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
        `${BASE_URL}/customer/address/update`,
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
      tax_amount: 0,
      discount_on_item: disscountvalue?.discount || "",
    }));
    const requestData = {
      user_id: customer_id,
      coupon_discount_amount: disscountvalue?.discount || "",
      coupon_discount_title: disscountvalue?.title || "",
      payment_status: "paid",
      order_status: "pending",
      total_tax_amount: 0,
      payment_method: selectedInput ? "offline" : "online",
      transaction_reference: selectedInput ? "" : "sadgash23asds",
      delivery_address_id: 2,
      delivery_charge: deliveryCharges,
      coupon_code: disscountvalue?.code || "",
      order_type: "delivery",
      checked: selectedInput,
      store_id: vendorIDstore || 1,
      zone_id: 2,
      delivered_status: "undelivered",
      delivery_address: deliveryAddress,
      item_campaign_id: "",
      order_amount: parseInt(
        // originalPrice + deliveryCharges - disscountvalue?.discount) ||
        totalPrice + deliveryCharges
      ),
      cart: cartData,
    };
    fetch(`${BASE_URL}/customer/order/place`, {
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
        localStorage.removeItem("vendorID");
      })
      .catch((error) => {
        console.error("Error sending request:", error);
      });
  };

  // PhonePe Payment Gateway Integration start
  const phonepaydata = {
    amount: totalPrice + deliveryCharges,
  };
  const handlePayment = (e) => {
    // e.preventDefault();
    // const transaction_id = generateUniqueTransactionId();
    const cartData = sendcartdata.map((item) => ({
      product_id: item.item_id,
      variation: item.variant,
      price: item.price,
      quantity: item.quantity,
      tax_amount: 0,
      discount_on_item: disscountvalue?.discount || "",
    }));
    const requestData = {
      role: 0,
      user_id: customer_id,
      coupon_discount_amount: disscountvalue?.discount || "",
      coupon_discount_title: disscountvalue?.title || "",
      payment_status: "paid",
      order_status: "pending",
      total_tax_amount: 0,
      payment_method: selectedInput ? "offline" : "online",
      transaction_reference: selectedInput ? "" : "sadgash23asds",
      delivery_address_id: 2,
      delivery_charge: deliveryCharges,
      coupon_code: disscountvalue?.code || "",
      order_type: "delivery",
      checked: selectedInput,
      store_id: vendorIDstore || 1,
      zone_id: 2,
      delivered_status: "undelivered",
      delivery_address: deliveryAddress,
      item_campaign_id: "",
      order_amount: parseInt(
        // originalPrice + deliveryCharges - disscountvalue?.discount) ||
        totalPrice + deliveryCharges
      ),
      cart: cartData,
    };
    axios
      .post("https://canine.hirectjob.in/api/v1/auth/payment/initiate", {
        ...phonepaydata,
        ...requestData,
      })
      .then((res) => {
        // Extract the redirect URL from the response
        const redirectUrl = res.data.data.instrumentResponse.redirectInfo.url;
        const merchantTransactionId = res.data.data.merchantTransactionId;

        // Call your callback API with relevant data
        axios
          .post("http://canine.hirectjob.in/api/v1/auth/payment/callback", {
            payment_status: true,
            transaction_id: merchantTransactionId,
          })
          .then((callbackRes) => {
            // Handle callback response if needed
          })
          .catch((callbackError) => {
            // Handle callback error if needed
          });

        // Open the redirect URL in a new window
        window.open(redirectUrl);
      })
      .catch((error) => {
        // Handle error if needed
      });
    // .then((res) => {
    //   const abc = res.data.data.instrumentResponse.redirectInfo.url;
    //   window.open(abc);
    // })
    // .catch((error) => {});
  };
  function generateUniqueTransactionId() {
    // Generate a unique ID based on your requirements
    // You can use libraries like uuid or generate IDs based on timestamps
    return merchantTransactionId; // Example unique transaction ID
  }
  // PhonePe Payment Gateway Integration end

  // failed place api notifiction_post
  const handlenotifictionpostSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Prepare form data
    const notifymePostData = new FormData();
    notifymePostData.append("order_status", "Failed");
    notifymePostData.append("user_id", storedUserId);
    notifymePostData.append("item_id", "");
    notifymePostData.append("order_id", "");

    // Send a request
    axios
      .post(`${BASE_URL}/items/notifiction_post`, notifymePostData)
      .then((response) => {
        toast.success("Your data was successfully added");
      })
      .catch((error) => {
        toast.error("An error occurred. Please try again.");
      });
  };

  function formatAddress(selectedAddress) {
    return `${selectedAddress?.first_name} ${selectedAddress?.last_name}, ${selectedAddress?.house_no} ${selectedAddress?.area} ${selectedAddress?.landmark}, ${selectedAddress?.city}, ${selectedAddress?.state} ${selectedAddress?.pincode}, Mobile: ${selectedAddress?.mobile}`;
  }

  // ...

  // Use the formatAddress function to get the selected address as a single string
  const deliveryAddress = selectedAddress
    ? formatAddress(selectedAddress)
    : "No address selected";

  // // Get the selected address from wherever you have it
  // const selectedAddressLocal = {
  //   first_name: selectedAddress?.first_name,
  //   last_name: selectedAddress?.last_name,
  //   house_no: selectedAddress?.house_no,
  //   area: selectedAddress?.area,
  //   landmark: selectedAddress?.landmark,
  //   city: selectedAddress?.city,
  //   state: selectedAddress?.state,
  //   pincode: selectedAddress?.pincode,
  //   mobile: selectedAddress?.mobile,
  // };

  // // Store the formatted address in localStorage
  // const formattedAddress = formatAddress(selectedAddressLocal);
  // localStorage.setItem("formattedAddress", formattedAddress);

  // // Retrieve the formatted address from localStorage
  // const storedFormattedAddress = localStorage.getItem("formattedAddress");

  // Check if addresslist exists and has a length greater than 1
  if (addresslist && addresslist.length > 1) {
    // Create a formatted address object
    const selectedAddressLocal = {
      first_name: addresslist[0]?.first_name,
      last_name: addresslist[0]?.last_name,
      house_no: addresslist[0]?.house_no,
      area: addresslist[0]?.area,
      landmark: addresslist[0]?.landmark,
      city: addresslist[0]?.city,
      state: addresslist[0]?.state,
      pincode: addresslist[0]?.pincode,
      mobile: addresslist[0]?.mobile,
    };

    // Store the formatted address in localStorage
    const formattedAddress = formatAddress(selectedAddressLocal);
    localStorage.setItem("formattedAddress", formattedAddress);

    // Retrieve the formatted address from localStorage
    const storedFormattedAddress = localStorage.getItem("formattedAddress");
  }

  // // Use the stored formatted address
  // const coupendisscount = (dis) => {
  //   setcoupenCode(!coupencode);
  //   localStorage.setItem("disconut", JSON.stringify(dis));
  //   setAppliedCoupon(true); // Set appliedCoupon to true when the button is clicked
  //   console.log("disccount?????", dis);
  // };
  // const clearCoupon = () => {
  //   setcoupenCode(!coupencode);
  //   setAppliedCoupon(false); // Set appliedCoupon to false when the "X" button is clicked
  //   localStorage.removeItem("disconut"); // Optionally, you can remove the discount value from localStorage here
  // };
  // new applied code 11/13/2023
  // if (appliedCoupon) {
  //   totalPrice -= disscountvalue;
  // }
  useEffect(() => {
    // Function to be called on page refresh
    const clearCoupon = () => {
      setcoupenCode(!coupencode);
      setAppliedCoupon(false); // Set appliedCoupon to false when the "X" button is clicked
      setTotalPrice(originalPrice);
      localStorage.removeItem("disconut"); // Optionally, you can remove the discount value from localStorage here
    };

    // Attach the event listener when the component mounts
    window.addEventListener("beforeunload", clearCoupon);

    // Detach the event listener when the component unmounts
    return () => {
      window.removeEventListener("beforeunload", clearCoupon);
    };
  }, []);
  const coupendisscount = (dis) => {
    setcoupenCode(!coupencode);
    localStorage.setItem("disconut", JSON.stringify(dis));
    setAppliedCoupon(true); // Set appliedCoupon to true when the button is clicked
    // setTotalPrice(
    //   parseInt(originalPrice + originalPrice * 0.05 - disscountvalue)
    // );
    const discountAmount = dis?.discount || 0;
    let newTotalPrice = parseInt(originalPrice) - parseInt(discountAmount);

    // Update totalPrice only if the newTotalPrice is a valid number
    if (!isNaN(newTotalPrice)) {
      setTotalPrice(newTotalPrice);
    } else {
      console.error("Invalid totalPrice calculation. Check your values.");
    }
    console.log("disccount?????", dis);
  };
  const clearCoupon = () => {
    setcoupenCode(!coupencode);
    setAppliedCoupon(false); // Set appliedCoupon to false when the "X" button is clicked
    setTotalPrice(originalPrice);
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
      const response = await axios.get(`${BASE_URL}/categories/banner`);
      sethomebanner(response.data.data);
    } catch (error) {
      console.error(error);
    }
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
      <Newheader dataLength={dataLength} />
      <div className="home-section">
        {homebanner
          ? homebanner.map(
              (item, index) =>
                item.type === "common" && (
                  <Link to={item.default_link}>
                    <img
                      className="partner-img"
                      src={
                        "https://canine.hirectjob.in//storage/app/" + item.image
                      }
                    />
                  </Link>
                )
            )
          : null}
      </div>
      <section className="section-padding">
        <div className="add-cart">
          {/* with out signin start */}
          {customerLoginId === null ? (
            cart && cart.length > 0 ? (
              <>
                {cart.map((item, index) => (
                  <>
                    {console.log("cartt: ", item)}
                    <Container>
                      <Row>
                        <Col lg={2} sm={2}>
                          <img
                            src={
                              "https://canine.hirectjob.in///storage/app/public/product/" +
                              item.image
                            }
                          />
                        </Col>
                        <Col
                          lg={6}
                          sm={5}
                          className="align-self-center addCARThead"
                        >
                          <h2>{item.item_name}</h2>
                          {
                            item.variant?.length === 0 ? null : item.variant ? (
                              <p>{`Selected Variant: ${item.variant
                                .replace(/\\/g, "")
                                .replace(/"/g, "")}`}</p>
                            ) : null // or you can omit this part if you want nothing to be displayed
                          }
                        </Col>
                        <Col
                          lg={2}
                          sm={3}
                          xs={6}
                          className="align-self-center addCARThead"
                        >
                          <h3>₹{formatPrice(item.orderamountwithquantity)}</h3>

                          {item?.type == "combo" ? (
                            <h5>Qty -: 1</h5>
                          ) : (
                            <div className="quantity-btn">
                              {/* <button onClick={() => handleDecrementone(index)}>
                        <i className="fa fa-minus" />
                      </button> */}
                              <button>Qty</button>
                              <form>
                                <div className="form-group">
                                  <input
                                    type="tel"
                                    className="form-control"
                                    placeholder="Quantity"
                                    value={item.quantity}
                                    onChange={handleQuantityChange}
                                    autoComplete="new-number"
                                    disabled
                                  />
                                </div>
                              </form>
                              {/* <button onClick={() => handleIncrementone(index)}>
                        <i className="fa fa-plus" />
                      </button> */}
                            </div>
                          )}
                        </Col>
                        <Col lg={2} sm={2} xs={6} className="align-self-center">
                          <div
                            className="delete-addcard"
                            // onClick={() => removeFromCart(item.id)}
                          >
                            <Link
                              onClick={() =>
                                dispatch({
                                  type: "REMOVE_FROM_CART",
                                  payload: item.item_id,
                                })
                              }
                            >
                              <i class="fa fa-trash-o" />
                            </Link>
                          </div>
                        </Col>
                        <hr />
                      </Row>
                    </Container>
                  </>
                ))}
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

                          {/* <Row>
                            <Col>
                              <h5>Coupon Discount</h5>
                            </Col>
                            <Col>
                              <h5>₹{0}</h5>
                            </Col>
                          </Row>
                          <hr /> */}
                          {/* <Row>
                            <Col>
                              <h5>GST</h5>
                            </Col>
                            <Col>
                              <h5>₹{Math.floor(originalPrice * 0.05)}</h5>
                            </Col>
                          </Row> */}
                          {/* <hr /> */}

                          <Row>
                            <Col>
                              <h5>Rounding Adjust</h5>
                            </Col>
                            <Col>
                              <h5>
                                {/* ₹{`${parseInt(originalPrice + taxamound)}`} */}
                                ₹{`${parseInt(totalPrice)}`}
                                {/* Calculate  and display the Rounding Adjust */}
                              </h5>
                            </Col>
                          </Row>
                          <hr />
                          <Row>
                            <Col>
                              <h5>Delivery Charges</h5>
                            </Col>
                            <Col>
                              {/* <h5>₹{addToCartProduct[0]?.price}</h5> */}
                              <h5>₹{deliveryCharges}</h5>
                            </Col>
                          </Row>
                        </div>
                      </Col>
                    </Row>
                  </div>
                  {/* <div className="check-Continue">
                    // <Button onClick={() => handlePayment()}>
                    //           Checkout
                    //         </Button> 
                    <Button
                    // data-toggle="modal"
                    // data-target="#cod"
                    // onClick={handleAddToCart}
                    >
                      <Link to="/login">Checkout</Link>
                    </Button>
                    <Button>
                      <Link to="/product">Continue Shopping</Link>
                    </Button>
                  </div> */}
                  {parseInt(originalPrice) !== 0 ? (
                    <div className="check-Continue">
                      <Button>
                        <Link to="/login">Checkout</Link>
                      </Button>
                      <Button>
                        <Link to="/product">Continue Shopping</Link>
                      </Button>
                    </div>
                  ) : (
                    <p className="check-Continue">
                      Sorry, the item you're trying to add has a price of ₹0.
                      Please remove this item. We apologize for any
                      inconvenience caused. This issue seems to be on our end.
                      Please remove the selected item and try adding it again.
                      Thank you for your understanding.
                    </p>
                  )}
                </Container>
              </>
            ) : (
              <div className="Emptycart">
                <img src={CartOne} />
                <p className="emptyMSG">Cart is Empty</p>
              </div>
            )
          ) : addToCartProduct && addToCartProduct.length > 0 ? (
            addToCartProduct.map((item, index) => (
              <Container>
                {console.log("addToCartProduct: ", addToCartProduct)}
                <Row>
                  <Col lg={2} sm={2}>
                    <img
                      src={
                        "https://canine.hirectjob.in///storage/app/public/product/" +
                        item.image
                      }
                    />
                  </Col>
                  <Col lg={6} sm={5} className="align-self-center addCARThead">
                    <h2>{item.item_name}</h2>
                    {
                      item.variant ? (
                        <p>{`Selected Variant: ${item.variant
                          .replace(/\\/g, "")
                          .replace(/"/g, "")}`}</p>
                      ) : null // or you can omit this part if you want nothing to be displayed
                    }
                  </Col>
                  <Col
                    lg={2}
                    sm={3}
                    xs={6}
                    className="align-self-center addCARThead"
                  >
                    <h3>₹{parseInt(item?.price) * item?.quantity}</h3>
                    {/* <h3>₹{formatPrice(item?.price)}</h3> */}

                    {item?.type == "combo" ? (
                      <h5>Qty -: 1</h5>
                    ) : (
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
                    )}
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
              <img src={CartOne} />
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
                            <h6>₹{parseInt(disscountvalue?.discount)}</h6>
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
                          <h5>₹{formatPrice(originalPrice)}</h5>
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
                              ? formatPrice(disscountvalue?.discount)
                              : 0}
                          </h5>
                        </Col>
                      </Row>
                      <hr />
                      {/* <Row>
                        <Col>
                          <h5>GST</h5>
                        </Col>
                        <Col>
                          <h5>₹{formatPrice(originalPrice * 0.05)}</h5>
                        </Col>
                      </Row>
                      <hr /> */}

                      <Row>
                        <Col>
                          <h5>Rounding Adjust</h5>
                        </Col>
                        <Col>
                          <h5>
                            ₹
                            {/* {`${parseInt(
                              originalPrice * 0.05 +
                                originalPrice -
                                disscountvalue?.discount ||
                                originalPrice + taxamound
                            )}`} */}
                            {`${formatPrice(totalPrice)}`}
                            {/* Calculate  and display the Rounding Adjust */}
                          </h5>
                        </Col>
                      </Row>
                      <hr />
                      <Row>
                        <Col>
                          <h5>Delivery Charges</h5>
                        </Col>
                        <Col>
                          {/* <h5>₹{addToCartProduct[0]?.price}</h5> */}
                          <h5>₹{formatPrice(deliveryCharges)}</h5>
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
                              ₹{`${formatPrice(totalPrice + deliveryCharges)}`}
                            </h2>
                          </Col>
                          <Col sm={6}>
                            {/* <Button onClick={() => handlePayment()}>
                              Checkout
                            </Button> */}
                            <Button
                              data-toggle="modal"
                              data-target="#cod"
                              disabled={!isAddressSelected}
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
                            {isAddressSelected ? null : (
                              <div className="error-message">
                                Please Select Shipping Address.
                              </div>
                            )}
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
        data-backdrop="static"
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
                      // style={{cursor:""}}
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
                <Button data-dismiss="modal" onClick={paymentclose}>
                  <Link>Close</Link>
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
        data-backdrop="static"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <div className="payment-done">
                <img src={paydone} />
                <p>Please Confirm to place order.</p>
                <Button
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={handleSendRequest}
                >
                  <Link to="/shipping">Place Order</Link>
                </Button>
                <Button data-dismiss="modal">
                  <Link>Close</Link>
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

                        <div className="coup-area">
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
