import React, { useState, useEffect } from "react";
import Newheader from "../../directives/newheader";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import shopbybrand from "../../assets/images/banner/shopbybrand.png";
import axios from "axios";
import { BASE_URL } from "../../Constant/Index";
import { Link, useParams, useNavigate } from "react-router-dom";
import Footer from "../../directives/footer";
import loadinggif from "../../assets/images/video/loading.gif";
import { Fade } from "react-reveal";
import { Toaster, toast } from "react-hot-toast";
import { useCartWithoutLogin } from "../context/AddToCardWithoutLogin";
import { styled } from "styled-components";
import paydone from "../../assets/images/icon/paydone.png";
import voch from "../../assets/images/icon/voch.png";

function Shopbybrandlist() {
  const { id } = useParams();
  const { title } = useParams();
  const [brandproduct, setBrandproduct] = useState([]);
  const [allproduct, setallproduct] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    Promise.all([
      fetchBrandproduct(),
      allProduct(),
      fetchWishlistData(),
      GetdataAll(),
      allAddressList(),
      couponlistdata(),
    ])
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const customer_id = localStorage.getItem("userInfo");
  let storedUserId = JSON.parse(customer_id);
  const fetchBrandproduct = () => {
    axios
      .get(`${BASE_URL}/banners/brand_product/${id}`)
      .then((response) => {
        console.log(response.data.data);
        setBrandproduct(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const linknewwindonopne = (linkdata) => {
    window.open(linkdata);
  };

  const allProduct = async () => {
    axios
      .get(`${BASE_URL}/items/latest`)
      .then((response) => {
        console.log(response);
        const filterData = response.data.data;
        const filterDatashow = filterData.filter(
          (item) => item.brand_id === title
        );
        setallproduct(filterDatashow);
        setSortOption("default");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const gradientColors = [
    "linear-gradient(180deg, #FFF0BA 0%, rgba(251.81, 233.11, 165.78, 0) 100%)",
    "linear-gradient(180deg, #C7EBFF 0%, rgba(199, 235, 255, 0) 100%)",
    "linear-gradient(180deg, #FECBF0 0%, rgba(254, 203, 240, 0) 100%)",
    "linear-gradient(180deg, #C8FFBA 0%, rgba(200, 255, 186, 0) 100%)",
  ];

  const renderProducthead = (name) => {
    const maxCharacters = 20;
    if (name?.length <= maxCharacters) {
      return <h6>{name}</h6>;
    }
    const truncatedDescription = name?.slice(0, maxCharacters);
    return (
      <>
        <h6>{truncatedDescription}..</h6>
      </>
    );
  };

  const renderProductDescription = (description) => {
    const maxCharacters = 35; // Number of characters to show initially

    if (description.length <= maxCharacters) {
      return <p>{description}</p>; // Show the full description if it's short
    }

    const truncatedDescription = description.slice(0, maxCharacters);

    return (
      <>
        <p>{truncatedDescription}.......</p>
      </>
    );
  };

  const [buttonVisibility, setButtonVisibility] = useState({});
  const handleMouseEnter = (productId) => {
    setButtonVisibility((prevVisibility) => ({
      ...prevVisibility,
      [productId]: true,
    }));
  };

  const handleMouseLeave = (productId) => {
    setButtonVisibility((prevVisibility) => ({
      ...prevVisibility,
      [productId]: false,
    }));
  };

  // =============================================================================
  // ================================================================================
  // Product details code with modal
  // ================================================================================
  // =============================================================================

  const [productDetails, setProductDetails] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState([]);
  const [selectedVariantPrice, setSelectedVariantPrice] = useState("");
  const [selectedVariantStock, setSelectedVariantStock] = useState("");

  const handleIncrementone = () => {
    setQuantity(quantity + 1);
  };
  const handleDecrementone = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  useEffect(() => {
    if (productDetails?.variations && productDetails.variations.length > 0) {
      const defaultVariant = productDetails.variations[0];
      setSelectedVariant(defaultVariant.type);
      setSelectedVariantPrice(defaultVariant?.price);
    }
  }, [productDetails]);

  // useEffect(() => {
  //   productData();
  // }, []);

  const productData = async (selctId) => {
    axios
      .get(`${BASE_URL}/items/product_details/${selctId}`)
      .then((response) => {
        console.log("=======>", response);
        console.log("product details Successful");
        setProductDetails(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value, 10);
    if (!isNaN(newQuantity)) {
      setQuantity(newQuantity);
    }
  };

  const ratingStar = Array.from({ length: 5 }, (item, index) => {
    let number = index + 0.5;
    return (
      <span key={index}>
        {productDetails?.rating_count >= index + 1 ? (
          <i className="fa fa-star" />
        ) : productDetails?.rating_count >= number ? (
          <i className="fa fa-star-half-o" />
        ) : (
          <i className="fa fa-star-o" />
        )}
      </span>
    );
  });

  let uservariationprice = 0;

  if (selectedVariantPrice !== "") {
    uservariationprice = selectedVariantPrice;
  } else {
    uservariationprice = productDetails.price;
  }
  uservariationprice = uservariationprice * (quantity > 1 ? quantity : 1);

  const Amount = Math.floor(
    uservariationprice - (uservariationprice * productDetails?.discount) / 100
  ).toFixed(2);

  const formattedAmount = Number(Amount).toString();
  const calculatedPrice = selectedVariantPrice
    ? selectedVariantPrice -
      (selectedVariantPrice * productDetails.discount) / 100
    : productDetails?.price;
  const savedAmount = Math.floor(
    productDetails?.price * quantity - Amount
  ).toFixed(2);
  const formattedSavedAmount = Number(savedAmount).toString();
  const MrpPrice = Number(savedAmount).toString();
  // coupen code funtion after apply close button start

  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    setTotalPrice(Amount);
  }, [Amount]);
  // coupen code funtion after apply close button end
  // Set deliveryChargesAmount based on the value of originalPrice
  const deliveryChargesAmount = totalPrice <= 999 ? 40 : 0;

  // State for delivery charges
  const [deliveryCharges, setDeliveryCharges] = useState(0);

  // Use useEffect to update the total price when the deliveryChargesAmount changes
  useEffect(() => {
    setDeliveryCharges(deliveryChargesAmount);
  }, [deliveryChargesAmount]);
  // coupen code funtion after apply close button end

  // Lightbox product =====
  const [mainImage, setMainImage] = useState("");
  const [lightboxIsOpen, setLightboxIsOpen] = useState(false);
  const [lightboxImageIndex, setLightboxImageIndex] = useState(0);

  useEffect(() => {
    if (productDetails.image) {
      setMainImage(
        "https://canine.hirectjob.in//storage/app/public/product/" +
          productDetails.image
      );
    }
  }, [productDetails]);

  const handleThumbnailClick = (index) => {
    setMainImage(
      "https://canine.hirectjob.in//storage/app/public/product/" +
        productDetails.images[index]
    );
  };

  const handleMainImageClick = () => {
    setLightboxIsOpen(true);
    setLightboxImageIndex(productDetails.images.indexOf(mainImage));
  };
  const handeldataId = (id) => {
    productData(id);
  };

  // ===============================================================
  // =================================================================
  // Buy Now ------------------------
  // ==================================================================
  // ===============================================================
  const shippingpage = useNavigate("");
  const [quantitybuynow, setQuantitybuynow] = useState(1);
  // const handleIncrementbuynow = () => {
  //   setQuantitybuynow(quantitybuynow + 1);
  // };
  // const handleDecrementbuynow = () => {
  //   if (quantitybuynow > 1) {
  //     setQuantitybuynow(quantitybuynow - 1);
  //   }
  // };
  // const taxamound = Math.floor(Amount * 0.05);
  const handleQuantityChangebuynow = (event) => {
    const newQuantity = parseInt(event.target.value, 10);
    if (!isNaN(newQuantity)) {
      setQuantity(newQuantity);
    }
  };

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
  const [profileData, setProfileData] = useState({});

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

  // without signup add cart start
  const loginType = localStorage.getItem("loginType");
  const customerLoginId =
    loginType === "wholeseller"
      ? Number(localStorage.getItem("UserWholesellerId"))
      : localStorage.getItem("userInfo");
  const { cart, dispatch } = useCartWithoutLogin();
  // without signup add cart end

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

  const removeFromCart = async (selctId) => {
    try {
      const response = await axios
        .delete(`${BASE_URL}/customer/wish-list/remove_product/${selctId}`)
        .then((response) => {
          console.log(response);
          window.location.reload(false);
        });
    } catch (error) {
      console.error("Error removing product from cart:", error);
    }
  };

  const handleDeleteAddress = (id) => {
    axios
      .delete(`${BASE_URL}/customer/address/delete/${id}`)
      .then((response) => {
        toast.success("Address deleted successfully");
        setAddressList((prevAddressList) =>
          prevAddressList.filter((item) => item.id !== id)
        );
      })
      .catch((error) => {
        console.error("Error deleting address:", error);
      });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${BASE_URL}/customer/address/update`,
        profileData
      );
      if (response.data.status === 200) {
        console.log("Profile updated successfully!");
        setAddressList((prevAddressList) =>
          prevAddressList.filter((item) => item.id !== id)
        );
        fieldpagerefresh();
      }
    } catch (error) {
      console.error(error);
    }
  };
  const [couponlist, setcouponlist] = useState([]);
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
  const [coupencode, setcoupenCode] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState(false);
  const data = localStorage.getItem("disconut");
  const disscountvalue = JSON.parse(data);
  // const finalPrice = parseInt(
  //   disscountvalue?.discount
  //     ? Amount - disscountvalue.discount
  //     : Amount + taxamound
  // );
  // {`${parseInt(
  //   disscountvalue?.discount
  //     ? Amount -
  //         disscountvalue.discount +
  //         taxamound
  //     : Amount + taxamound
  // )}`}
  // const coupendisscount = (dis) => {
  //   setcoupenCode(!coupencode);
  //   localStorage.setItem("disconut", JSON.stringify(dis));
  //   setAppliedCoupon(true); // Set appliedCoupon to true when the button is clicked
  // };
  // const clearCoupon = () => {
  //   setcoupenCode(!coupencode);
  //   setAppliedCoupon(false); // Set appliedCoupon to false when the "X" button is clicked
  //   localStorage.removeItem("disconut"); // Optionally, you can remove the discount value from localStorage here
  // };
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
    let newTotalPrice = Amount - discountAmount;

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
    setTotalPrice(Amount);
    localStorage.removeItem("disconut"); // Optionally, you can remove the discount value from localStorage here
  };
  const [selectedInput, setSelectedInput] = useState("");
  function formatAddress(selectedAddress) {
    return `${selectedAddress.first_name} ${selectedAddress.last_name}, ${selectedAddress.house_no} ${selectedAddress.area} ${selectedAddress.landmark}, ${selectedAddress.city}, ${selectedAddress.state} ${selectedAddress.pincode}, Mobile: ${selectedAddress.mobile}`;
  }
  // ...

  // Use the formatAddress function to get the selected address as a single string
  const deliveryAddress = selectedAddress
    ? formatAddress(selectedAddress)
    : "No address selected";
  // Buy now checkout code
  const handleSendRequest = async () => {
    // const cartData = sendcartdata.map((item) => ({
    //   product_id: item.item_id,
    //   variation: item.variant,
    //   price: item.price,
    //   quantity: item.quantity,
    //   tax_amount: taxamound,
    //   discount_on_item: disscountvalue?.discount || "",
    // }));
    const cartData = {
      product_id: productDetails.id,
      variation: selectedVariant,
      price: parseInt(productDetails?.price),
      quantity: quantity,
      tax_amount: 0,
      discount_on_item: disscountvalue?.discount || "",
    };
    // Calculate the order_amount
    const orderAmount = parseInt(totalPrice + deliveryCharges);

    const requestData = {
      user_id: storedUserId,
      delivery_charge: deliveryCharges,
      coupon_discount_amount: disscountvalue?.discount || "",
      coupon_discount_title: disscountvalue?.title || "",
      payment_status: "paid",
      order_status: "pending",
      total_tax_amount: 0,
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
      order_amount: orderAmount,
      //    {
      //   (parseInt(Amount) * 0.05) + parseInt(Amount) - (
      //     (disscountvalue?.discount ?? 0)
      //   )
      // },
      // {`${parseInt( Amount * 0.05 + Amount - disscountvalue?.discount + taxamound)}`},
      // parseInt(Amount * 0.05 + Amount - disscountvalue?.discount) ||
      // Amount * 0.05 + Amount,
      cart: [cartData],
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
        console.log("order_id", responseData);
      })
      .catch((error) => {
        console.error("Error sending request:", error);
      });
    const modal = document.querySelector(".modal");
    if (modal) {
      modal.classList.remove("show");
      modal.style.display = "none";
      document.body.classList.remove("modal-open");
      const modalBackdrop = document.querySelector(".modal-backdrop");
      if (modalBackdrop) {
        modalBackdrop.remove();
      }
    }
  };

  const handleRadioChange = (event) => {
    setSelectedInput(event.target.checked);
  };
  const [reviewlist, setreviewlist] = useState([]);
  const allReview = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/customer/order/list?id=${storedUserId}`
      );
      const data = await response.json();
      const latestPosts = data.data.slice(0, 3);
      setreviewlist(latestPosts);
    } catch (error) {
      console.log(error);
    }
  };
  const quickViewClear = () => {
    setSelectedVariantPrice(null);
    setSelectedVariant(null);
    setSelectedVariantStock(null);
    setQuantity(1);
  };
  const handleResetClick = () => {
    setfirst_name(null);
    setlast_name(null);
    setmobile(null);
    sethouse_no(null);
    setarea(null);
    setlandmark(null);
    setpincode(null);
    setstate(null);
    setcity(null);
    setFirst_nameError(null);
    setLast_nameError(null);
    setMobileError(null);
    setHouse_noError(null);
    setAreaError(null);
    setLandmarkError(null);
    setPincodeError(null);
    setStateError(null);
    setCityError(null);
    setIsFormValid(null);
    setSelectedCity(null);
    setcoupenCode(null);
    setAppliedCoupon(null);
    setSelectedInput(null);
    setAddressContentVisible(null);
    setSelectedAddress(null);
    setQuantity(1);
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

  const [addToCartStatus, setAddToCartStatus] = useState("");
  const [isFavCheck, setisFavCheck] = useState(false);
  useEffect(() => {
    if (allproduct.length > 0) {
      handleWishlist();
    }

    return () => {
      setisFavCheck(false);
    };
  }, [isFavCheck]);

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
          total_quantity: selectedVariantStock
            ? selectedVariantStock
            : productDetails?.stock,
          return_order: productDetails?.returnable || "yes",
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
    const modal = document.querySelector(".modal");
    if (modal) {
      modal.classList.remove("show");
      modal.style.display = "none";
      document.body.classList.remove("modal-open");
      const modalBackdrop = document.querySelector(".modal-backdrop");
      if (modalBackdrop) {
        modalBackdrop.remove();
      }
    }
  };
  const [wishlistData, setWishlistData] = useState([]);
  const fetchWishlistData = async () => {
    try {
      await axios
        .get(`${BASE_URL}/customer/wish-list/${storedUserId}`)
        .then((response) => {
          console.log("response in whisList", response);
          setWishlistData(response.data.data);
          setisFavCheck(true);
          localStorage.setItem(`wishlist_${productDetails.id}`, "true");
        });
    } catch (error) {
      console.error("Error fetching wishlist data:", error);
    }
  };

  const handleWishlist = () => {
    let newArr = [...allproduct];

    const filterData = allproduct.filter((el) => {
      return wishlistData.some((ele) => {
        return ele.item_id === el.id;
      });
    });

    if (filterData.length > 0) {
      for (let index = 0; index < filterData.length; index++) {
        const element = filterData[index];
        const indexData = allproduct.map((ele) => ele.id).indexOf(element.id);
        newArr[indexData].isFav = true;
        setallproduct(newArr);
      }
    }
  };
  const addToWishlist = async (item_id) => {
    if (!storedUserId) {
      // If the user is not logged in, navigate to the login page
      navigate("/login");
      return; // Exit the function without adding to wishlist
    }

    const formData = new FormData();
    formData.append("user_id", storedUserId);
    formData.append("item_id", item_id);
    axios
      .post(`${BASE_URL}/customer/wish-list/add`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        console.log("response143", response);
        if (response.data.message) {
          toast.success(response.data.message);
          let newArr = [...allproduct];
          const index = allproduct.map((el) => el.id).indexOf(item_id);
          newArr[index].isFav = true;
          setallproduct(newArr);
        }
      })
      .catch((error) => {
        toast.error("Already in your wishlist");
      });
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
      <Newheader />
      {loading ? (
        <section className="section-padding mt-3 mb-3">
          <div className="loaderimg text-center text-black mb-4">
            <img src={loadinggif} alt="" />
            <h5>Please Wait.......</h5>
          </div>
        </section>
      ) : (
        <>
          <Container fluid className="p-0">
            <div className="all-bg">
              <img src={shopbybrand} />
            </div>
          </Container>

          <section className="section-padding">
            <Container>
              <h1 className="main-head">Shop By {title} Product List</h1>
              <div className="needplace">
                <Row>
                  {brandproduct && brandproduct.length > 0 ? (
                    brandproduct.map((item, index) => (
                      <Col lg={3} sm={6} xs={6} className="mb-5">
                        <div key={item.id} className="Brand-card brand-1">
                          <div
                            onClick={(e) => linknewwindonopne(item.product_url)}
                          >
                            <div className="brand-main">
                              <img
                                src={
                                  "https://canine.hirectjob.in//storage/app/public/brand_product/" +
                                  item.image
                                }
                              />
                            </div>
                            <div className="brand-text">
                              <h5>{item.title}</h5>
                            </div>
                          </div>
                        </div>
                      </Col>
                    ))
                  ) : (
                    <p className="emptyMSG">No Data Shop By Brand.</p>
                  )}
                </Row>
              </div>
            </Container>
          </section>

          <section className="section-padding">
            <Container>
              <Row>
                {/* ///tarungurjar// */}
                {allproduct
                  ? allproduct.map((item, index) => (
                      <Col lg={3} sm={6} xs={6} className="mb-4">
                        <div
                          className="food-product"
                          // onMouseEnter={() => handleMouseEnter(item.id)}
                          // onMouseLeave={() => handleMouseLeave(item.id)}
                          key={item.id}
                          style={{
                            background:
                              gradientColors[index % gradientColors.length],
                          }}
                        >
                          <i
                            class={
                              item.isFav
                                ? "fa-solid fa-heart"
                                : "fa-regular fa-heart"
                            }
                            onClick={(id) => {
                              if (storedUserId == null) {
                                toast.error("Please Login first");
                              } else {
                                addToWishlist(item.id);
                              }
                            }}
                          />
                          <Link to={`/product-details/${item.id}`}>
                            <div className="text-center">
                              <img
                                src={
                                  "https://canine.hirectjob.in///storage/app/public/product/" +
                                  item.image
                                }
                              />
                            </div>
                            <div>
                              <h6>{renderProducthead(item.name)}</h6>
                              <p>
                                {renderProductDescription(item.description)}
                              </p>
                            </div>
                            <div className="product-bag">
                              {parseFloat(item.discount) > 0 ? (
                                <Row>
                                  <Col>
                                    <p>₹{parseFloat(item.price)}</p>
                                  </Col>
                                  <Col>
                                    <h5>Save {parseFloat(item.discount)}%</h5>
                                  </Col>
                                </Row>
                              ) : null}
                              <Row>
                                <Col className="align-self-center">
                                  <h4>{`₹${Math.floor(
                                    item.price -
                                      (item.price * item.discount) / 100
                                  )}`}</h4>
                                </Col>
                              </Row>
                            </div>
                          </Link>
                          {/* {buttonVisibility[item.id] && (
                            <Fade top> */}
                          <div className="button-container">
                            <button
                              data-toggle="modal"
                              data-target=".bd-example-modal-lg"
                              onClick={(e) => handeldataId(item.id)}
                            >
                              Quick View
                            </button>
                            <button
                              data-toggle="modal"
                              data-target=".buynow"
                              // onClick={(e) => handeldataId(item.id)}
                              onClick={(e) => {
                                if (!storedUserId) {
                                  shippingpage("/login");
                                } else {
                                  handeldataId(item.id);
                                }
                              }}
                            >
                              Buy Now
                            </button>
                          </div>
                          {/* </Fade>
                          )} */}
                        </div>
                      </Col>
                    ))
                  : null}
              </Row>
            </Container>
          </section>
        </>
      )}
      <Footer />

      {/* Product details Modal */}
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
              <i
                class="quickarea fa fa-times"
                data-dismiss="modal"
                onClick={quickViewClear}
              />
              <section className="section-padding">
                <Container>
                  <Row>
                    <Col lg={6} sm={6}>
                      <>
                        <div>
                          <div className="product-item quickviewimg">
                            <img
                              src={mainImage}
                              alt="Product Image"
                              // onClick={handleMainImageClick}
                            />
                          </div>
                          <div className="needplace">
                            <Row>
                              {productDetails?.images &&
                              productDetails?.images.length > 0 ? (
                                productDetails.images.map((item, index) => (
                                  <Col
                                    lg={3}
                                    sm={3}
                                    xs={3}
                                    className="mb-3"
                                    key={index}
                                  >
                                    <div
                                      className="product-item-inner"
                                      onClick={() =>
                                        handleThumbnailClick(index)
                                      }
                                    >
                                      <img
                                        src={
                                          "https://canine.hirectjob.in//storage/app/public/product/" +
                                          item
                                        }
                                        alt={`Image ${index}`}
                                      />
                                    </div>
                                  </Col>
                                ))
                              ) : (
                                <p className="emptyMSG">No Related Image.</p>
                              )}
                            </Row>
                          </div>
                        </div>

                        {lightboxIsOpen && (
                          <Lightbox
                            mainSrc={
                              "https://canine.hirectjob.in//storage/app/public/product/" +
                              productDetails.images[lightboxImageIndex]
                            }
                            nextSrc={
                              "https://canine.hirectjob.in//storage/app/public/product/" +
                              productDetails.images[
                                (lightboxImageIndex + 1) %
                                  productDetails.images.length
                              ]
                            }
                            prevSrc={
                              "https://canine.hirectjob.in//storage/app/public/product/" +
                              productDetails.images[
                                (lightboxImageIndex +
                                  productDetails.images.length -
                                  1) %
                                  productDetails.images.length
                              ]
                            }
                            onCloseRequest={() => setLightboxIsOpen(false)}
                            onMovePrevRequest={() =>
                              setLightboxImageIndex(
                                (lightboxImageIndex +
                                  productDetails.images.length -
                                  1) %
                                  productDetails.images.length
                              )
                            }
                            onMoveNextRequest={() =>
                              setLightboxImageIndex(
                                (lightboxImageIndex + 1) %
                                  productDetails.images.length
                              )
                            }
                          />
                        )}
                      </>
                    </Col>
                    <Col lg={6} sm={6}>
                      <div className="productDetail-content">
                        <Row>
                          <Col lg={9} sm={9} xs={9}>
                            <h4>{productDetails?.name}</h4>
                          </Col>
                          <Col lg={3} sm={3} xs={3}>
                            <p>
                              {productDetails?.veg == 0 ? (
                                <span>
                                  <span className="non-vegetarian">●</span>
                                </span>
                              ) : (
                                <span>
                                  <span className="vegetarian">●</span>
                                </span>
                              )}
                            </p>
                          </Col>
                        </Row>
                        <p>
                          By <span>{productDetails.store_name}</span>
                        </p>

                        <Wrapper>
                          <div className="icon-style">
                            {ratingStar}
                            <p>
                              ({productDetails?.rating_count} customer reviews)
                            </p>
                          </div>
                        </Wrapper>

                        <div className="needplaceProduct">
                          <Row>
                            <Col sm={6} xs={6}>
                              <div>
                                <div>
                                  <div className="tab-container">
                                    <h6>Variations</h6>
                                    <Row>
                                      {productDetails?.variations &&
                                        productDetails?.variations.length > 0 &&
                                        productDetails.variations.map(
                                          (item, index) => (
                                            <Col
                                              lg={5}
                                              className="p-0"
                                              key={index}
                                            >
                                              {item.stock !== 0 ? (
                                                <div
                                                  className={`tab-variations ${
                                                    selectedVariant ===
                                                    item.type
                                                      ? "active"
                                                      : ""
                                                  }`}
                                                  onClick={() => {
                                                    setSelectedVariant(
                                                      item.type
                                                    );
                                                    setSelectedVariantPrice(
                                                      item?.price
                                                    ); // Store the price in state
                                                  }}
                                                >
                                                  {item.type}
                                                </div>
                                              ) : (
                                                <div
                                                  className="tab-variations disabledvariation"
                                                  title="Stock unavailable"
                                                >
                                                  {/* <span className="blurred-text"> */}
                                                  {item.type}
                                                  {/* </span> */}
                                                </div>
                                              )}
                                            </Col>
                                          )
                                        )}
                                    </Row>
                                  </div>
                                </div>
                              </div>
                            </Col>
                            <Col sm={6} xs={6}>
                              <div className="quantity-btn quickbtn">
                                <button onClick={handleDecrementone}>
                                  <i className="fa fa-minus" />
                                </button>
                                <form>
                                  <div className="form-group">
                                    <input
                                      type="tel"
                                      className="form-control"
                                      placeholder="Quantity"
                                      value={quantity}
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
                          </Row>
                        </div>
                        <div className="needplaceProduct">
                          <div className="product-deatils-price">
                            {uservariationprice && formattedAmount >= 0 ? (
                              <Row>
                                <Col lg={3} sm={3} xs={3}>
                                  <p>{`₹${uservariationprice}`}</p>
                                </Col>
                                <Col lg={4} sm={4} xs={3}>
                                  <h5>{`₹${
                                    isNaN(formattedAmount) ? 0 : formattedAmount
                                  }`}</h5>
                                </Col>
                                {/* {formattedSavedAmount > 0 && ( */}
                                <Col lg={5} sm={5} xs={3}>
                                  {formattedSavedAmount > 0 ? (
                                    <h6>You save ₹{formattedSavedAmount}</h6>
                                  ) : (
                                    <h6>No savings</h6>
                                  )}
                                </Col>
                                {/* )} */}
                              </Row>
                            ) : (
                              <Row>
                                <Col lg={4} sm={4} xs={3}>
                                  <h5>{`₹${
                                    isNaN(MrpPrice) ? 0 : MrpPrice
                                  }`}</h5>
                                </Col>
                              </Row>
                            )}
                          </div>
                          <Row>
                            <Col lg={5} sm={5} xs={4}>
                              <p>(inclusive of all taxes)</p>
                            </Col>
                          </Row>
                        </div>
                        <h5>About Us</h5>
                        {productDetails ? (
                          <Table responsive>
                            <tbody>
                              <tr>
                                <th>Brand</th>
                                <td>{productDetails?.brand_id}</td>
                              </tr>
                              <tr>
                                <th>Age Range</th>
                                <td>{productDetails?.lifeStage_id}</td>
                              </tr>
                              {/* <tr>
                                <th>Health Condition</th>
                                <td>{productDetails?.helthCondition_id}</td>
                              </tr> */}
                              <tr>
                                <th>Target Species</th>
                                <td>{productDetails?.Petsbreeds_id}</td>
                              </tr>
                            </tbody>
                          </Table>
                        ) : (
                          <p>No data available for this product.</p>
                        )}
                      </div>
                    </Col>
                  </Row>
                  {productDetails?.stock &&
                  productDetails?.stock?.length !== 0 ? (
                    <div className="productBTNaddcard">
                      {customerLoginId === null ? (
                        <Button data-dismiss="modal">
                          {/* <Button> */}
                          <Link
                            onClick={() => {
                              const filterData = cart.filter((el) => {
                                console.log("elll: ", el);
                                return el.item_id === productDetails.id;
                              });
                              if (filterData?.length > 0) {
                                toast.error("Already in added");
                              } else {
                                dispatch({
                                  type: "ADD_TO_CART",
                                  payload: {
                                    item_id: productDetails.id,
                                    variant: selectedVariant,
                                    price:
                                      calculatedPrice === 0
                                        ? parseInt(productDetails?.price) *
                                          quantity
                                        : parseInt(calculatedPrice),
                                    quantity: quantity,
                                    name: productDetails.name,
                                    image: productDetails.image,
                                    orderamountwithquantity: formattedAmount,
                                  },
                                });
                              }
                            }}
                          >
                            <i className="fa fa-shopping-bag" /> Add to cart
                          </Link>
                          <p>{addToCartStatus}</p>
                        </Button>
                      ) : (
                        <Button>
                          <Link
                            to={`/add-cart/${productDetails.id}`}
                            onClick={handleAddToCart}
                          >
                            <i className="fa fa-shopping-bag" /> Add to cart
                          </Link>
                          <p>{addToCartStatus}</p>
                        </Button>
                      )}
                    </div>
                  ) : (
                    <div className="sold-out-btn mt-3">
                      <Link>Sold Out</Link>
                      <br />
                      <Button data-toggle="modal" data-target="#soldoutModel">
                        Notify Me When Available
                      </Button>
                    </div>
                  )}
                </Container>
              </section>
            </div>
          </div>
        </div>
      </div>

      {/*  Modal */}

      {/* buynow-model */}
      <div
        className="modal fade buynow"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="myLargeModalLabel"
        aria-hidden="true"
        data-backdrop="static"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-body">
              <>
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
                          <Col lg={2} sm={3}>
                            <Button
                              data-toggle="modal"
                              data-target="#changeadress-model"
                            >
                              Add
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
                {/* {productDetails && productDetails.length > 0 ? ( */}
                <section className="section-padding">
                  <Container>
                    <Row>
                      <Col lg={3}>
                        <img
                          src={
                            "https://canine.hirectjob.in//storage/app/public/product/" +
                            productDetails?.image
                          }
                        />
                      </Col>
                      <Col lg={7} sm={10}>
                        <h2>{productDetails?.name}</h2>
                        <div className="tab-container">
                          <h6>Variations</h6>
                          <Row>
                            {productDetails?.variations &&
                              productDetails?.variations.length > 0 &&
                              productDetails?.variations.map((item, index) => (
                                <Col lg={3} key={index}>
                                  {item.stock !== 0 ? (
                                    <div
                                      className={`tab-variations ${
                                        selectedVariant === item.type
                                          ? "active"
                                          : ""
                                      }`}
                                      onClick={() => {
                                        setSelectedVariant(item.type);
                                        setSelectedVariantPrice(item?.price); // Store the price in state
                                      }}
                                    >
                                      {item.type}
                                    </div>
                                  ) : (
                                    <div
                                      className="tab-variations disabledvariation"
                                      title="Stock unavailable"
                                    >
                                      {/* <span className="blurred-text"> */}
                                      {item.type}
                                      {/* </span> */}
                                    </div>
                                  )}
                                </Col>
                              ))}
                          </Row>
                        </div>
                        {/* <h3>{`₹${parseInt(buynowformattedAmount)}`}</h3>
                        <div className="quantity-btn quickbtn">
                          <button onClick={handleDecrementbuynow}>
                            <i className="fa fa-minus" />
                          </button>
                          <form>
                            <div className="form-group">
                              <input
                                type="tel"
                                className="form-control"
                                placeholder="Quantity"
                                value={quantitybuynow}
                                onChange={handleQuantityChangebuynow}
                                autoComplete="new-number"
                              />
                            </div>
                          </form>
                          <button onClick={handleIncrementbuynow}>
                            <i className="fa fa-plus" />
                          </button>
                        </div> */}
                        <div className="quantity-btn quickbtn">
                          <button onClick={handleDecrementone}>
                            <i className="fa fa-minus" />
                          </button>
                          <form>
                            <div className="form-group">
                              <input
                                type="tel"
                                className="form-control"
                                placeholder="Quantity"
                                value={quantity}
                                onChange={handleQuantityChange}
                                autoComplete="new-number"
                              />
                            </div>
                          </form>
                          <button onClick={handleIncrementone}>
                            <i className="fa fa-plus" />
                          </button>
                          <p>(inclusive of all taxes)</p>
                        </div>

                        <div className="needplaceProduct">
                          <div className="product-deatils-price">
                            {uservariationprice && formattedAmount >= 0 ? (
                              <Row>
                                <Col lg={3} sm={3} xs={3}>
                                  <p>{`₹${uservariationprice}`}</p>
                                </Col>
                                <Col lg={4} sm={4} xs={3}>
                                  <h5>{`₹${
                                    isNaN(formattedAmount) ? 0 : formattedAmount
                                  }`}</h5>
                                </Col>
                                {/* {formattedSavedAmount > 0 && ( */}
                                <Col lg={5} sm={5} xs={3}>
                                  {formattedSavedAmount > 0 ? (
                                    <h6>You save ₹{formattedSavedAmount}</h6>
                                  ) : (
                                    <h6>No savings</h6>
                                  )}
                                </Col>
                                {/* )} */}
                              </Row>
                            ) : (
                              <Row>
                                <Col lg={4} sm={4} xs={3}>
                                  <h5>{`₹${
                                    isNaN(MrpPrice) ? 0 : MrpPrice
                                  }`}</h5>
                                </Col>
                              </Row>
                            )}
                          </div>
                        </div>
                      </Col>
                      <Col lg={2} sm={2} xs={6} className="align-self-end">
                        <div className="delete-addcard">
                          <Link onClick={() => removeFromCart(item.id)}>
                            <i class="fa fa-trash-o" />
                          </Link>
                        </div>
                      </Col>
                    </Row>
                    <hr />
                  </Container>
                </section>
                {/* ) : (
                  <section className="section-padding">
                    <Container
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      <Row>
                        <p>Cart is Empty</p>
                      </Row>
                    </Container>
                  </section>
                )} */}
                <Container>
                  <div className="needplace">
                    <Row className="justify-content-center">
                      <Col lg={10}>
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

                <Container>
                  <div className="needplace">
                    <Row className="justify-content-center">
                      <Col lg={10}>
                        <div className="add-cart-total">
                          <Row>
                            <Col>
                              <h5>Sub Total</h5>
                            </Col>
                            <Col>
                              {/* <h5>₹{addToCartProduct[0]?.price}</h5> */}
                              <h5>₹{parseInt(Amount)}</h5>
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
                          {/* <Row>
                            <Col>
                              <h5>Tax(5%)</h5>
                            </Col>
                            <Col>
                              <h5>{`₹${Math.floor(Amount * 0.05)}`}</h5>
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
                                {/* {parseInt(Amount) * 0.05 +
                                  parseInt(Amount) -
                                  (disscountvalue?.discount ?? 0)} */}
                                {parseInt(totalPrice)}
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
                <div className="homecheckout">
                  <button
                    data-toggle="modal"
                    data-target="#cod"
                    disabled={!isAddressSelected}
                  >
                    Checkout
                  </button>
                  <button data-dismiss="modal" onClick={handleResetClick}>
                    Close
                  </button>
                  {isAddressSelected ? null : (
                    <div className="error-message">
                      Please Select Shipping Address.
                    </div>
                  )}
                </div>
              </>
            </div>
          </div>
        </div>
      </div>

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
                Add
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
              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <label>State</label>
                    <select
                      className="form-control"
                      onChange={Subscription}
                      value={profileData.state || ""}
                      // onChange={(e) =>
                      // setProfileData ({
                      //   ...profileData,
                      //   state: e.target.value,
                      // })}
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
      {/* Coupon */}
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
                              <td>{item?.discount_type}</td>
                            </tr>
                            <tr>
                              <th>Discount : </th>
                              <td>{item?.discount}</td>
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
                            // data-toggle="modal"
                            // data-target="#Coupon"
                            data-dismiss="modal"
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
      {/* cod */}
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
      {/* paysubmit */}
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
    </>
  );
}
const Wrapper = styled.section`
  justify-content: flex-start;

  icon {
    font-size: 2rem;
    color: orange;
  }
  .emty-icon {
    font-size: 2.6rem;
  }
  p {
    margin: 0;
    padding-left: 1.2rem;
  }
`;
export default Shopbybrandlist;
