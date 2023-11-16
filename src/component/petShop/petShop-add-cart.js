import React, { useState } from "react";
import productdetail from "../../assets/images/banner/productdetail.png";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import brandPro1 from "../../assets/images/img/brandPro1.png";
// import { Link, useParams } from 'react-router-dom'
import Cartone from "../../assets/images/icon/cart1.png";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../Constant/Index";
import { Toaster, toast } from "react-hot-toast";
import { loadRazorpay } from "../../utils";
import { useEffect } from "react";
import paydone from "../../assets/images/icon/paydone.png";
import moment from "moment";
import PetShopHeader from "../../directives/petShopHeader";
import Petshopfooter from "../../directives/petShop-Footer";
import logo from "../../assets/images/logo.png";
import loadinggif from "../../assets/images/video/loading.gif";

function PetshopAddCart() {
  const { id } = useParams();
  console.log("id", id);
  // Create a ref to store the list of items in the cart
  const [quantity, setQuantity] = useState(0);
  const [minOrder, setMinOrder] = useState(0);
  const [addToCartProduct, setAddToCartProduct] = useState([]);
  console.log("addToCartProduct: ", addToCartProduct);
  // const [customer_id, setcustomer_id] = useState("");
  const salesmanId = localStorage.getItem("salesmanId");
  const [coupencode, setcoupenCode] = useState(false);
  const [couponlist, setcouponlist] = useState([]);
  const [paymentId, setPaymentId] = useState("");
  const [selectedInput, setSelectedInput] = useState("");
  const loginType = localStorage.getItem("loginType");
  const [dataLengthpetshop, setDataLengthpetshop] = useState(0);

  const handleRadioChange = (event) => {
    setSelectedInput(event.target.checked);
  };

  const redirectToShipping = () => {
    Navigate("/petshop-shipping");
  };
  // ************************
  // let wholesellervariationprice = 0;
  let itemQty = addToCartProduct[0]?.quantity;
  console.log("itemQty: ", itemQty);
  // if (addToCartProduct && addToCartProduct.length > 0) {
  //   itemQty = addToCartProduct[0].quantity;
  // }
  const [getQuantityValue, setGetQuantityValue] = useState();
  const stroredQuantity = () => {
    setGetQuantityValue();
  };
  let originalPrice = 0;
  console.log("originalPrice: ", originalPrice);

  const updatedPrice = originalPrice * 0.05;
  const priceWithoutCents = parseInt(updatedPrice);
  addToCartProduct.forEach((el) => {
    console.log("elll: ", el);
    let allPrice = parseInt(el.price * el.quantity) + parseInt(originalPrice);
    originalPrice = allPrice;
  });
  const taxamound = Math.floor(originalPrice * 0.05);
  console.log("allPrice: ", originalPrice);
  // console.log("taxamound: ", taxamound);
  const [selectedValue, setSelectedValue] = useState(0);
  const handleRadioButton = (event) => {
    setSelectedValue(parseInt(event.target.value, 10));
  };

  const shippingpage = useNavigate("");
  // const [itemQty, setItemQty] = useState(second);
  // console.log("itemQty: ", itemQty);
  const [sendcartdata, setSandCartData] = useState([]);

  const handleSendRequest = async () => {
    const cartData = sendcartdata.map((item) => ({
      product_id: item.item_id,
      variation: item.variant,
      price: parseInt(item.price),
      quantity: item.quantity,
      min_order: item.min_order,
      tax_amount: parseInt(item.price * 0.05),
      discount_on_item: "",
    }));
    const requestData = {
      user_id: storedWholesellerId,
      seller_id: Number(salesmanId),
      coupon_discount_amount: "",
      discount_on_item: "",
      coupon_discount_title: "",
      payment_status: "unpaid",
      order_status: "pending",
      total_tax_amount: taxamound,
      // * itemQty,
      gst_bill: selectedValue,
      payment_day: selectedOption,
      payment_mode: selectedOptiontwo,
      payment_method: selectedInput ? "offline" : "online",
      transaction_reference: selectedInput ? "" : "sadgash23asds",
      delivery_address_id: 2,
      coupon_code: "",
      order_type: "delivery",
      checked: selectedInput,
      store_id: 1,
      zone_id: 2,
      delivered_status: "undelivered",
      delivery_address: deliveryAddress,
      item_campaign_id: "",
      // order_amount: parseInt(originalPrice * 0.05 + originalPrice),
      order_amount: parseInt(
        // itemQty * (
        originalPrice * 0.05 + originalPrice
        // )
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
        if (loginType == "salesman") {
          shippingpage("/salesman-dashboad");
        } else {
          shippingpage("/petshop-shipping/" + responseData.data.order_id);
        }
      })
      .catch((error) => {
        console.error("Error sending request:", error);
      });
  };
  // const disscountvalue = localStorage.getItem("disconut");
  // console.log("disscountvalue", disscountvalue);
  // const coupendisscount = (dis) => {
  //   setcoupenCode(!coupencode);
  //   localStorage.setItem("disconut", dis);
  //   console.log("disccount?????", dis);
  // };

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

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value, 10);
    if (!isNaN(newQuantity)) {
      setQuantity(newQuantity);
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

  const handleDecrementone = (index, item) => {
    const updatedCart = [...addToCartProduct];
    if (updatedCart[index].quantity > item.min_order) {
      updatedCart[index].quantity -= 1;
      // updatedCart[index].price =
      //   updatedCart[index].price *
      //   (updatedCart[index].quantity / (updatedCart[index].quantity + 1));

      const updatedSendCart = [...sendcartdata];
      updatedSendCart[index].quantity -= 1;

      // Calculate the new price with tax included
      // const priceWithTax = updatedCart[index].price * 1.05; // Adding 5% tax
      // updatedSendCart[index].price = priceWithTax;

      setAddToCartProduct(updatedCart);
      setSandCartData(updatedSendCart); // Update sendcartdata
    }
  };

  const [variantStockCount, setVariantStockCount] = useState([]);

  const fieldpagerefresh = () => {
    window.location.reload(false);
  };
  useEffect(() => {
    // getUserInfo()
  }, []);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    Promise.all([
      addToCartData(),
      couponlistdata(),
      GetdataAll(),
      allAddressList(),
      AllBanner(),
      allOrders(),
    ])
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  // useEffect(() => {
  //   setAddToCartProduct(cartItemsRef.current);
  // }, [cartItemsRef]);

  const addToCartData = async () => {
    axios
      .get(
        `${BASE_URL}/customer/wish-list/add_to_card/${storedWholesellerId}`,
        {
          // id: id, // Replace this with the correct product_id you want to add
          // user_id: storedWholesellerId,
          // price: price,
          // quantity: quantity,
          // image: image,
          // item_id: item_id,
          // item_name: item_name,
          // variant: variant,
          params: {
            id: id, // Replace this with the correct product_id you want to add
            quantity: quantity,
            // min_order: minOrder,
          },
        }
      )

      .then((response) => {
        setDataLengthpetshop(response.data.data.length);
        console.log(
          "addtocard show data>>>>?????565756756?????7878?????",
          response
        );
        const newCartsend = response.data.data.map((item) => ({
          item_id: item.item_id,
          variant: item.variant,
          price: item.price,
          quantity: item.quantity, // Assuming the response already includes the quantity
          min_order: item.min_order,
        }));
        console.log("newCartsend: ", response.data.data);

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
          quantity: item.quantity, // Assuming the response already includes the quantity
          min_order: item.min_order,
          return_order: item?.return_order || "no",
          total_quantity: item.total_quantity,
          variant: item.variant,
        }));

        const addcartitem = response.data.data[0];
        if (addcartitem?.min_order !== null && addcartitem?.min_order > 0) {
          setMinOrder(addcartitem.min_order);
          setQuantity(addcartitem.min_order); // Set initial quantity to min_order
        }
        // Update the addToCartProduct state by adding the new cart items
        setAddToCartProduct([
          ...addToCartProduct,
          ...newCartItems,
          // ...addcartitem,
        ]);

        // Clear the quantity input field after adding the item to the cart
        // setQuantity(1);

        // setAddToCartProduct([...addcartitem])
        // Update the minOrder state with the min_order value
        // setMinOrder(addcartitem.min_order);

        // Set the quantity state to the desired value (e.g., 1)
        // setQuantity(addcartitem.min_order);
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
      .post(`${BASE_URL}/auth/city?state=${state}`, {
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
  const [paylaterMessage, setPaylaterMessage] = useState("");

  const [responseMessage, setResponseMessage] = useState("");
  const handleAddAddress = (event) => {
    event.preventDefault();
    const data = {
      user_id: storedWholesellerId,
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
        user_id: storedWholesellerId,
        image: productDetails.image,
        quantity: productDetails.quantity,
        price: productDetails.price,
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
  const [isAddressSelected, setIsAddressSelected] = useState(false);
  const handleAddressClick = (index) => {
    setSelectedAddress(addresslist[index]);
    setAddressContentVisible(false); // Hide the address content after selecting an address
    setIsAddressSelected(true);
  };

  const toggleAddressContent = () => {
    setAddressContentVisible(!addressContentVisible);
  };

  function formatAddress(selectedAddress) {
    return `${selectedAddress.first_name} ${selectedAddress.last_name}, ${selectedAddress.house_no} ${selectedAddress.area} ${selectedAddress.landmark}, ${selectedAddress.city}, ${selectedAddress.state} ${selectedAddress.pincode}, Mobile: ${selectedAddress.mobile}`;
  }

  // ...

  // Get the selected address from wherever you have it
  const selectedAddressLocal = {
    first_name: selectedAddress?.first_name,
    last_name: selectedAddress?.last_name,
    house_no: selectedAddress?.house_no,
    area: selectedAddress?.area,
    landmark: selectedAddress?.landmark,
    city: selectedAddress?.city,
    state: selectedAddress?.state,
    pincode: selectedAddress?.pincode,
    mobile: selectedAddress?.mobile,
  };

  // Store the formatted address in localStorage
  const formattedAddress = formatAddress(selectedAddressLocal);
  localStorage.setItem("formattedAddress", formattedAddress);

  // Retrieve the formatted address from localStorage
  const storedFormattedAddress = localStorage.getItem("formattedAddress");

  // // Use the stored formatted address
  console.log("Stored Address:", storedFormattedAddress);

  // Use the formatAddress function to get the selected address as a single string
  const deliveryAddress = selectedAddress
    ? formatAddress(selectedAddress)
    : "No address selected";

  const allAddressList = async () => {
    axios
      .get(`${BASE_URL}/customer/address/list/${storedWholesellerId}`)
      .then((response) => {
        console.log(response);
        console.log("address list Successful");
        setAddressList(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // console.log("address list", addresslist);

  const handleDeleteAddress = (id) => {
    axios
      .delete(
        `https://canine.hirectjob.in/api/v1/customer/address/delete/${id}`
      )
      .then((response) => {
        toast.success("Address deleted successfully");
        console.log("Address deleted successfully:", response.data.message);
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
        setAddressList((prevAddressList) =>
          prevAddressList.filter((item) => item.id !== id)
        );
        fieldpagerefresh(); // Call fieldpagerefresh here
      }
    } catch (error) {
      console.error(error);
    }
  };

  // paylater handel
  //

  const handlePaylater = () => {
    const currentDate = new Date(); // Get the current date
    const formattedDate = `${currentDate.getDate()}-${
      currentDate.getMonth() + 1
    }-${currentDate.getFullYear()}`; // Format as "DD-MM-YYYY"

    const data = {
      user_id: storedWholesellerId,
      amount: parseInt(
        // itemQty * (
        originalPrice * 0.05 + originalPrice
        // )
      ),
      paydate: formattedDate, // Formatted current date
    };

    fetch(`${BASE_URL}/paylater_update`, {
      method: "POST",
      // mode: "no-cors",
      // credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Methods": "POST",
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((responseData) => {
        setPaylaterMessage(responseData.message);
        // toast.success("Successfully added!");
        console.log("SuccessfullyPaylater", data);
      })
      .catch((error) => {
        console.log("error failed", error);
        // toast.error("Field is required");
      });
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

  // ===============================================================
  // ===============================================================
  console.log("id", id);
  // const location = useLocation();
  // const state = location.state;
  // console.log("state: ", state);
  // storedWholesellerId
  const storedWholesellerId = Number(localStorage.getItem("UserWholesellerId"));
  console.log("storedWholesellerId: ", storedWholesellerId);
  // ----------------------------------------

  const [addresslist, setAddressList] = useState([]);
  const [allorder, setallorder] = useState([]);
  const [selectedOption, setSelectedOption] = useState("Select Payment Time");
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOptiontwo, setSelectedOptiontwo] = useState(
    "Select Payment Mode"
  );
  const [isDropdownOpentwo, setDropdownOpentwo] = useState(false);
  const [showPaymentModeDropdown, setShowPaymentModeDropdown] = useState(false);
  const [selectedPaymentMode, setSelectedPaymentMode] = useState(null);
  const [showGstOptions, setShowGstOptions] = useState(false);

  const handleOptionSelect = (option) => {
    if (option !== selectedOption) {
      setSelectedOption(option);
      setDropdownOpen(false);
      setShowPaymentModeDropdown(true);
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleOptionSelecttwo = (option, mode) => {
    if (option !== selectedOptiontwo) {
      setSelectedOptiontwo(option);
      setDropdownOpentwo(false);
      setSelectedPaymentMode(mode);
      // setShowPaymentModeDropdown(false);
      // Check if both "Cheque" and "UPI" are selected, and set GST as default
      // Check if both "Cheque" and "UPI" are selected, and set GST as default
      if (selectedOptiontwo === "Cheque" && option === "UPI") {
        setSelectedPaymentMode("GST");
      } else if (selectedOptiontwo === "UPI" && option === "Cheque") {
        setSelectedPaymentMode("GST");
      } else if (
        selectedOptiontwo === "GST" &&
        option !== "Cheque" &&
        option !== "UPI"
      ) {
        setSelectedPaymentMode(""); // Reset the payment mode if neither "Cheque" nor "UPI" is selected
      }
      // Check if "Cash" is selected to show/hide GST options
      if (option === "Cash" || option === "Cheque" || option === "UPI") {
        setShowGstOptions(true);
      } else {
        setShowGstOptions(false);
      }
    }
  };

  const toggleDropdowntwo = () => {
    setDropdownOpentwo(!isDropdownOpentwo);
  };

  const handlePaymentModeSelect = (mode) => {
    setSelectedPaymentMode(mode);
  };

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

  const getDateFromCreatedAt = (createdAt) => {
    const dateObject = new Date(createdAt);
    return dateObject.toLocaleDateString();
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
      <PetShopHeader dataLengthpetshop={dataLengthpetshop} />
      {loading ? (
        <section className="section-padding mt-3 mb-3">
          <div className="loaderimg text-center text-black mb-4">
            <img src={loadinggif} alt="" />
            <h5>Please Wait.......</h5>
          </div>
        </section>
      ) : (
        <>
          <div className="home-section">
            {homebanner
              ? homebanner.map(
                  (item, index) =>
                    item.type === "common" && (
                      <Link to={item.default_link}>
                        <img
                          className="partner-img"
                          src={
                            "https://canine.hirectjob.in//storage/app/" +
                            item.image
                          }
                        />
                      </Link>
                    )
                )
              : null}
          </div>
          <section className="section-padding">
            <div className="add-cart">
              {addToCartProduct && addToCartProduct.length > 0 ? (
                addToCartProduct.map((item, index) => (
                  <Container>
                    {console.log("item.variant: ", item.variant)}
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
                        {/* <p>Selected Variant: {item.variant}</p>
                    {console.log("item.variant",item.variant)} */}
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
                        <h3>₹{formatPrice(item.price) * item.quantity}</h3>
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
                          <button
                            onClick={() => handleDecrementone(index, item)}
                          >
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
                  <img src={Cartone} />
                  <p className="emptyMSG">Cart is Empty</p>
                </div>
              )}

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
                              <h5>GST</h5>
                            </Col>
                            <Col>
                              <h5>
                                ₹
                                {formatPrice(
                                  // itemQty * (
                                  originalPrice * 0.05
                                  // )
                                )}
                              </h5>
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
                                {`${formatPrice(
                                  // itemQty * (
                                  originalPrice * 0.05 + originalPrice
                                  // )
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
                        {addresslist && addresslist.length > 0 ? (
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
                                  {selectedAddress.house_no}{" "}
                                  {selectedAddress.area}{" "}
                                  {selectedAddress.landmark}{" "}
                                  {selectedAddress.city} {selectedAddress.state}{" "}
                                  {selectedAddress.pincode}
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
                                        <div
                                          className="chk-address"
                                          key={item.id}
                                        >
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
                                  {`${formatPrice(
                                    // itemQty * (
                                    originalPrice * 0.05 + originalPrice
                                    // )
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
                                  disabled={!isAddressSelected}
                                >
                                  {/* <Link

                                // to="/user-pay-method"
                              > */}
                                  Checkout
                                  {/* </Link> */}
                                </Button>
                                <Button>
                                  <Link to="/petShop-product">
                                    Continue Shopping
                                  </Link>
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
        </>
      )}

      <Petshopfooter />
      {/* Modal add address */}
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
                  type="tel"
                  name="mobile"
                  class="form-control"
                  maxLength={10}
                  value={mobile}
                  onChange={(e) => setmobile(e.target.value)}
                />
              </div>
              <div class="form-group">
                <label>flat,House no,Building,Company</label>
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
                data-dismiss="modal"
              >
                Add +
              </button>
            </div>
          </div>
        </div>
      </div>
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
                {/* <div className="select-card select-card3">
                  <div className="selct-card-text">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="exampleRadios"
                      value="second"
                      checked={selectedInput}
                      onChange={handleRadioChange}
                    />
                    <p>Canine Pay Later</p>
                    <p>₹ 100000 Available</p>
                  </div>
                </div> */}
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
                    {/* <p>Cash On Delivery</p> */}
                    <p>Canine Pay Later</p>
                  </div>
                </div>
                <Button
                  disabled={!selectedInput}
                  // data-toggle="modal"
                  // data-target="#paysubmit"
                  data-toggle="modal"
                  data-target=".bd-example-modal-lg"
                  data-dismiss="modal"
                >
                  <Link>pay</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade bd-example-modal-lg"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="myLargeModalLabel"
        aria-hidden="true"
        data-backdrop="static"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-body">
              <Container>
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
                    <Col lg={7} className="d-flex justify-content-center">
                      <div className="product-details text-center">
                        <div>
                          <h5>Canine Pay Later</h5>
                          <p>Your total approved credit is ₹ 10,0000</p>
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={5}>
                      <div className="payment-time">
                        <div className="dropdown">
                          <button
                            className="btn dropdown-toggle"
                            type="button"
                            id="dropdownMenuButton"
                            aria-haspopup="true"
                            aria-expanded={isDropdownOpen}
                            onClick={toggleDropdown}
                          >
                            {selectedOption}
                          </button>
                          <div
                            className={`dropdown-menu ${
                              isDropdownOpen ? "show" : ""
                            }`}
                            aria-labelledby="dropdownMenuButton"
                          >
                            <div
                              className="form-check"
                              onClick={() => handleOptionSelect("15 Days")}
                            >
                              <input
                                className="form-check-input"
                                type="radio"
                                name="paymentTimeRadios"
                                id="15Days"
                                checked={selectedOption == "15"}
                                readOnly
                              />
                              <label className="form-check-label">
                                15 Days
                              </label>
                            </div>
                            {/* Add similar code for other options */}
                            <div
                              className="form-check"
                              onClick={() => handleOptionSelect("30 Days")}
                            >
                              <input
                                className="form-check-input"
                                type="radio"
                                name="paymentTimeRadios"
                                id="30Days"
                                checked={selectedOption == "30"}
                                readOnly
                              />
                              <label className="form-check-label">
                                30 Days
                              </label>
                            </div>
                            <div
                              className="form-check"
                              onClick={() => handleOptionSelect("45 Days")}
                            >
                              <input
                                className="form-check-input"
                                type="radio"
                                name="paymentTimeRadios"
                                id="45Days"
                                checked={selectedOption == "45"}
                                readOnly
                              />
                              <label className="form-check-label">
                                45 Days
                              </label>
                            </div>
                          </div>
                        </div>
                        {showPaymentModeDropdown && (
                          <div className="dropdown">
                            <button
                              className="btn dropdown-toggle"
                              type="button"
                              id="paymentModeDropdownButton"
                              data-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded={isDropdownOpentwo}
                              onClick={toggleDropdowntwo}
                            >
                              {selectedOptiontwo}
                            </button>
                            <div
                              className={`dropdown-menu ${
                                isDropdownOpentwo ? "show" : ""
                              }`}
                              aria-labelledby="paymentModeDropdownButton"
                            >
                              <div
                                className="form-check"
                                onClick={() => handleOptionSelecttwo("UPI")}
                              >
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="paymentModeRadios"
                                  id="UPI"
                                  checked={selectedOptiontwo == "UPI"}
                                  readOnly
                                />
                                <label className="form-check-label">UPI</label>
                              </div>
                              {/* Add similar code for other payment modes */}
                              <div
                                className="form-check"
                                onClick={() => handleOptionSelecttwo("Cheque")}
                              >
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="paymentModeRadios"
                                  id="Cheque"
                                  checked={selectedOptiontwo == "Cheque"}
                                  readOnly
                                />
                                <label className="form-check-label">
                                  Cheque
                                </label>
                              </div>
                              <div
                                className="form-check"
                                onClick={() => handleOptionSelecttwo("Cash")}
                              >
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="paymentModeRadios"
                                  id="Cash"
                                  checked={selectedOptiontwo == "Cash"}
                                  readOnly
                                />
                                <label className="form-check-label">Cash</label>
                              </div>
                            </div>
                          </div>
                        )}

                        <div>
                          {showGstOptions && (
                            <div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="gstRadios"
                                  id="withoutGST"
                                  value={0}
                                  onChange={handleRadioButton}
                                  disabled={
                                    selectedOptiontwo == "Cheque" ||
                                    selectedOptiontwo == "UPI"
                                  }
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="withoutGST"
                                >
                                  Without GST
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="gstRadios"
                                  id="withGST"
                                  value={1}
                                  onChange={handleRadioButton}
                                  // checked={
                                  //   selectedPaymentMode == "GST"
                                  //     ? selectedOptiontwo == "Cheque"
                                  //     : selectedOptiontwo == "UPI"
                                  // }
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="withGST"
                                >
                                  GST
                                </label>
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="payletter-btn">
                          <button
                            data-toggle="modal"
                            data-dismiss="modal"
                            data-target="#paysubmit"
                          >
                            Sumbit
                          </button>
                        </div>
                      </div>
                    </Col>
                    <Col lg={7} className="align-self-center">
                      <div className="order-table">
                        <Table responsive>
                          <tbody>
                            <tr>
                              <th>Utilised Credit</th>
                              <td>₹0</td>
                            </tr>
                            <tr>
                              <th>Available Credit</th>
                              <td>₹10,0000</td>
                            </tr>
                            <tr>
                              <th>Total Approved Credit</th>
                              <td>₹10,0000</td>
                            </tr>
                            <tr>
                              {/* <th>(All due are debited on 5th of each month)</th> */}
                              {/* <td>₹138.00</td> */}
                            </tr>
                          </tbody>
                        </Table>
                        <p className="d-flex justify-content-center">
                          (All due are debited on 5th of each month)
                        </p>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Container>
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
                  onClick={() => {
                    handleSendRequest();
                    handlePaylater(); // Pass the 'event' parameter here if needed
                  }}
                >
                  <Link to="/petshop-shipping">Done</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PetshopAddCart;
