import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Form, Table } from "react-bootstrap";
import Carousel from "react-multi-carousel";
import { Link, useNavigate, useParams } from "react-router-dom";
import bag from "../../assets/images/icon/bag.png";
import cus1 from "../../assets/images/img/cus1.png";
import cus2 from "../../assets/images/img/cus2.png";
import cus3 from "../../assets/images/img/cus3.png";
import vector from "../../assets/images/img/Vector.png";
import { BASE_URL } from "../../Constant/Index";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import PetShopHeader from "../../directives/petShopHeader";
import Petshopfooter from "../../directives/petShop-Footer";
import app1 from "../../assets/images/img/app1.png";
import app2 from "../../assets/images/img/app2.png";
import { styled } from "styled-components";
import paydone from "../../assets/images/icon/paydone.png";
// import { loadRazorpay } from "../../utils";
import Fade, { Flip } from "react-reveal";
import { AnimationOnScroll } from "react-animation-on-scroll";
import "animate.css/animate.min.css";

const homeslider = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

const clinetreview = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    slidesToSlide: 2, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 1, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

function PetshopHome(props) {
  const [categories, setcategories] = useState([]);
  const [homebanner, sethomebanner] = useState([]);
  const [allproduct, setallproduct] = useState([]);
  const [thirdbanner, setthirdbanner] = useState([]);
  const [allVendorShop, setAllVendorShop] = useState([]);
  const [brands, setBrands] = useState([]);
  const [blog, setblog] = useState([]);
  const [email, setEmail] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const demousercheck = () => {
    toast.error("Profile is not verified");
  };

  useEffect(() => {
    fetchBrands();
    homeAllBanner();
    allAddressList();
    allReview();
  }, []);
  // const discontedMrp = allproduct.map(el => el.price * el.discount)
  // ((price * discount) / 100)
  const homeAllBanner = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/categories/banner`);
      sethomebanner(response.data.data);
      response.headers["Access-Control-Allow-Methods"] = "GET"; // Allow specified methods
      response.headers["Access-Control-Allow-Headers"] = "Content-Type"; // Allow specified headers
    } catch (error) {
      console.error(error);
    }
  };

  const handleNewsletter = (event) => {
    event.preventDefault();
    const data = {
      email: email,
    };
    axios
      .post(`${BASE_URL}/newsletter/subscribe`, data)
      .then((response) => {
        setResponseMessage(response.data.message);
        toast.success("Subscription Successfully");
      })
      .catch((error) => {
        toast.error("The email field is required");
      });
  };

  const fetchBrands = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/auth/brand`);
      setBrands(response.data.data);

      // Handle response as needed
    } catch (error) {
      console.error(error);
      // Handle error as needed
    }
  };
  console.log("====================================");
  console.log(brands);
  console.log("====================================");

  useEffect(() => {
    categoriesProduct();
    allProduct();
    thirdBanner();
    fetchBlogs();
    AllVendorHomePage();
    fetchWishlistData();
  }, []);

  const categoriesProduct = async () => {
    try {
      const response = await fetch(`${BASE_URL}/categories`);
      const jsonData = await response.json();
      setcategories(jsonData.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const allProduct = async () => {
    try {
      const response = await fetch(`${BASE_URL}/items/latest`);
      const data = await response.json();
      const latestPosts = data.data.slice(0, 8);
      setallproduct(latestPosts);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBlogs = async () => {
    try {
      const response = await fetch(`${BASE_URL}/auth/blog`);
      const data = await response.json();
      const latestPosts = data.data.slice(0, 3);
      setblog(latestPosts);
    } catch (error) {
      console.log(error);
    }
  };

  const thirdBanner = () => {
    axios
      .get(`${BASE_URL}/categories/banner`)
      .then((response) => {
        console.log(response.data.data);
        setthirdbanner(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  // all venders
  const AllVendorHomePage = async () => {
    try {
      const response = await fetch(`${BASE_URL}/vendor/all_vendor`);
      const data = await response.json();
      const latestPosts = data.data.slice(0, 4);
      setAllVendorShop(latestPosts);
    } catch (error) {
      console.log(error);
    }
  };

  // storedWholesellerId
  // *************************
  const storedWholesellerId = Number(localStorage.getItem("UserWholesellerId"));
  const salesmanId = localStorage.getItem("salesmanId");
  console.log("storedWholesellerId: ", storedWholesellerId);
  // ----------------------------------------

  const [wishlistData, setWishlistData] = useState([]);
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

  const fetchWishlistData = async () => {
    try {
      await axios
        .get(`${BASE_URL}/customer/wish-list/${storedWholesellerId}`)
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
    console.log("filterData", filterData);

    if (filterData.length > 0) {
      for (let index = 0; index < filterData.length; index++) {
        const element = filterData[index];
        console.log("element", element);
        const indexData = allproduct.map((ele) => ele.id).indexOf(element.id);
        console.log("indexData", indexData);
        newArr[indexData].isFav = true;
        console.log("newArrnewArr", newArr);
        setallproduct(newArr);
      }
    }
  };
  const addToWishlist = async (item_id) => {
    if (!storedWholesellerId) {
      // If the user is not logged in, navigate to the login page
      navigate("/login");
      return; // Exit the function without adding to wishlist
    }

    const formData = new FormData();
    formData.append("user_id", storedWholesellerId);
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

  // const randomColor = `rgb(${Math.floor(Math.random() * 'linear-gradient(180deg, #FFF0BA 0%, rgba(251.81, 233.11, 165.78, 0) 100%)')}, ${Math.floor(
  //   Math.random() * 'linear-gradient(180deg, #C7EBFF 0%, rgba(199, 235, 255, 0) 100%)'
  // )}, ${Math.floor(Math.random() * 'linear-gradient(180deg, #FECBF0 0%, rgba(254, 203, 240, 0) 100%)')})`;

  const gradientColors = [
    "linear-gradient(180deg, #FFF0BA 0%, rgba(251.81, 233.11, 165.78, 0) 100%)",
    "linear-gradient(180deg, #C7EBFF 0%, rgba(199, 235, 255, 0) 100%)",
    "linear-gradient(180deg, #FECBF0 0%, rgba(254, 203, 240, 0) 100%)",
    "linear-gradient(180deg, #C8FFBA 0%, rgba(200, 255, 186, 0) 100%)",
    // Add more gradient colors as needed
  ];

  const { id } = useParams();
  console.log("id: ", id);

  const renderBlogDescription = (description) => {
    const maxCharacters = 50; // Number of characters to show initially

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
  const [quantity, setQuantity] = useState(0);
  const [minOrder, setMinOrder] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState([]);
  const [selectedVariantPrice, setSelectedVariantPrice] = useState([]);
  console.log("selectedVariantPrice: ", selectedVariantPrice);

  useEffect(() => {
    if (productDetails?.variations && productDetails.variations.length > 0) {
      const defaultVariant = productDetails.variations[0];
      setSelectedVariant(defaultVariant.type);
      setSelectedVariantPrice(defaultVariant.wholeprice);
    }
  }, [productDetails]);

  // useEffect(() => {
  //   productData();
  // }, []);

  const productData = async (selctId) => {
    axios
      .get(`${BASE_URL}/items/product_details/${selctId}`)
      .then((response) => {
        console.log("=======> ", response);
        console.log("Delete Successful");
        setProductDetails(response.data.data);
        // Perform any additional actions after successful deletion
        const fetchedProductDetails = response.data.data;

        if (
          fetchedProductDetails?.min_order !== null &&
          fetchedProductDetails?.min_order > 0
        ) {
          setMinOrder(fetchedProductDetails.min_order);
          setQuantity(fetchedProductDetails.min_order); // Set initial quantity to min_order
        }

        // Perform any additional actions after successful fetch
        setProductDetails(fetchedProductDetails);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value, 10);
    if (!isNaN(newQuantity) && newQuantity >= minOrder) {
      setQuantity(newQuantity);
    }
  };

  const handleIncrementOne = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrementOne = () => {
    if (quantity > minOrder) {
      setQuantity(quantity - 1);
    }
  };

  const ratingStar = Array.from({ length: 5 }, (item, index) => {
    let number = index + 0.5;
    return (
      <span key={index}>
        {productDetails.rating_count >= index + 1 ? (
          <i className="fa fa-star" />
        ) : productDetails.rating_count >= number ? (
          <i className="fa fa-star-half-o" />
        ) : (
          <i className="fa fa-star-o" />
        )}
      </span>
    );
  });

  let uservariationprice = 0;

  if (selectedVariantPrice !== null) {
    uservariationprice = selectedVariantPrice;
  }
  // uservariationprice = uservariationprice * (quantity > 1 ? quantity : 1);

  const Amount = (uservariationprice * (quantity > 1 ? quantity : 1)).toFixed(
    2
  );
  const formattedAmount = Number(Amount).toString();
  // const Amount = Math.floor(
  //   uservariationprice - (uservariationprice * productDetails.discount) / 100
  // ).toFixed(2);
  // let wholesellervariationprice = 0;

  // if (selectedVariantPrice !== null) {
  //   wholesellervariationprice = selectedVariantPrice;
  // }

  const savedAmount = Math.floor(
    productDetails.price * quantity - Amount
  ).toFixed(2);
  const formattedSavedAmount = Number(savedAmount).toString();

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

  let wholesellervariationprice = 0;

  if (selectedVariantPrice !== null) {
    wholesellervariationprice = selectedVariantPrice;
  }
  const verifiredIdaccess = Number(localStorage.getItem("verifiedId"));

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

  const handleQuantityChangebuynow = (event) => {
    const newQuantity = parseInt(event.target.value, 10);
    if (!isNaN(newQuantity)) {
      setQuantity(newQuantity);
    }
  };

  const [addresslist, setAddressList] = useState([]);
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

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [addressContentVisible, setAddressContentVisible] = useState(false);

  const handleAddressClick = (index) => {
    setSelectedAddress(addresslist[index]);
    setAddressContentVisible(false); // Hide the address content after selecting an address
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
  const [paymentId, setPaymentId] = useState("");

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
          window.location.href = "/petshop-shipping";
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

  const handleAddAddress = async (event) => {
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

  const removeFromCart = async (selctId) => {
    try {
      const response = await axios
        .delete(`${BASE_URL}/customer/wish-list/remove_product/${selctId}`)
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

  const handleDeleteAddress = (id) => {
    axios
      .delete(
        `https://canine.hirectjob.in/api/v1/customer/address/delete/${id}`
      )
      .then((response) => {
        toast.success("Address deleted successfully");
        // console.log("Address deleted successfully:", response.data.message);
        setaddresslist((prevAddressList) =>
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
        "https://canine.hirectjob.in/api/v1/customer/address/update",
        profileData // Send the updated profileData in the request body
      );
      // console.log("response in edit", response);
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
      price: selectedVariantPrice,
      quantity: quantity,
      tax_amount: Math.floor(selectedVariantPrice * 0.05),
      discount_on_item: "",
    };
    // Calculate the order_amount
    const orderAmount = parseInt(Amount) * 0.05 + parseInt(Amount) ?? 0;

    const requestData = {
      user_id: storedWholesellerId,
      coupon_discount_amount: "",
      coupon_discount_title: "",
      payment_status: "paid",
      order_status: "pending",
      total_tax_amount: Math.floor(Amount * 0.05),
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
      order_amount: orderAmount,
      cart: [cartData],
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
        shippingpage("/petShop-shipping/" + responseData.data.order_id);
        // shippingpage(
        //   `/shipping/${responseData.data.order_id}?gowithbuynow=true`
        // );
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
      const response = await fetch(`${BASE_URL}/items/get_happyreview`);
      const data = await response.json();
      const latestPosts = data.data.slice(0, 3);
      setreviewlist(latestPosts);
    } catch (error) {
      console.log(error);
    }
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

  // ****************notifyme
  const [variation, setVariation] = useState("");
  const [variationError, setVariationError] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const isEmailFormatValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    setIsEmailValid(isEmailFormatValid(emailValue));
  };
  const handleNotifymeSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Prepare form data
    const notifymeData = new FormData();
    notifymeData.append("email", email);
    notifymeData.append("variation", variation);
    notifymeData.append("stock", productDetails.stock);
    notifymeData.append("user_id", storedWholesellerId);
    notifymeData.append("item_id", productDetails.id);

    console.log("productDetails.id: ", productDetails?.id);
    console.log("notifymeData", notifymeData);

    // Send a request
    axios
      .post(`https://canine.hirectjob.in/api/v1/items/notify`, notifymeData)
      .then((response) => {
        toast.success("Your data was successfully added");
      })
      .catch((error) => {
        toast.error("An error occurred. Please try again.");
      });
  };

  const happyCus = [
    "linear-gradient(180deg, #C6ECFC 0%, rgba(198.30, 235.76, 251.81, 0.43) 100%)",
    "linear-gradient(180deg, #EEEEFF 0%, rgba(238.43, 238.43, 255, 0.45) 100%)",
    "linear-gradient(180deg, #FFEAD2 0%, rgba(255, 234.18, 210.37, 0.33) 100%)",
  ];
  const ourBrand = [
    "linear-gradient(180deg, #C8FFBA 0%, rgba(200, 255, 186, 0) 100%)",
    "linear-gradient(180deg, #FFF0BA 0%, rgba(251.81, 233.11, 165.78, 0) 100%)",
    "linear-gradient(180deg, #C7EBFF 0%, rgba(199, 235, 255, 0) 100%)",
    "linear-gradient(180deg, #FECBCD 0%, rgba(253.94, 203.15, 204.70, 0) 100%)",
  ];
  // ********************
  // console.log("handleAddToCartF", handleAddToCart());
  const handleAddToCart = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/customer/wish-list/add_product`,
        {
          item_name: productDetails?.name,
          variant: selectedVariant, // You may need to update this based on your data
          image: productDetails?.image,
          quantity: quantity,
          price: selectedVariantPrice,
          min_order: productDetails.min_order,
          user_id: storedWholesellerId,
          item_id: productDetails?.id,
          seller_id: salesmanId ? Number(salesmanId) : "",
        }
      );

      if (response.data.success) {
        const updatedCart = [...addToCartStatus, productDetails];
        setAddToCartStatus(updatedCart);
        // setAddToCartStatus("Added to cart!");
        toast.success("Added to cart!");
        console.log("Added to cart");
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
  return (
    <>
      <Toaster />
      <PetShopHeader />
      <div className="">
        <div className="home-section">
          <Container fluid className="p-0">
            <Carousel
              swipeable={true}
              draggable={true}
              showDots={true}
              responsive={homeslider}
              ssr={true} // means to render carousel on server-side.
              infinite={true}
              autoPlay={props.deviceType !== "mobile" ? true : false}
              autoPlaySpeed={2000}
              keyBoardControl={true}
              customTransition="all 1s"
              transitionDuration={1000}
              containerClass="carousel-container"
              removeArrowOnDeviceType={["tablet", "mobile"]}
              deviceType={props.deviceType}
              // dotListClass="custom-dot-list-style"
              itemClass="carousel-item-padding-40-px"
            >
              <div>
                {homebanner
                  ? homebanner.map(
                      (item, index) =>
                        item.type === "home_banner_1" && (
                          <div className="home-img">
                            <Link to={item.default_link}>
                              <div className="">
                                <img
                                  src={
                                    "https://canine.hirectjob.in//storage/app/" +
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
                                      Explore More{" "}
                                      <i className="fa fa-angle-right" />
                                    </Button>
                                  </div>
                                </Col>
                              </Row>
                            </Link>
                          </div>
                        )
                    )
                  : null}
              </div>
              <div>
                {homebanner
                  ? homebanner.map(
                      (item, index) =>
                        item.type === "home_banner_2" && (
                          <div className="home-img">
                            <Link to={item.default_link}>
                              <div className="">
                                <img
                                  src={
                                    "https://canine.hirectjob.in//storage/app/" +
                                    item.image
                                  }
                                />
                              </div>
                              <Row>
                                <Col lg={7}>
                                  <div className="home-content">
                                    <h1>{item.title}</h1>
                                    <p>{item.description}</p>

                                    <div className="app-home">
                                      <Link>
                                        <img src={app1} />
                                      </Link>

                                      <Link>
                                        <img src={app2} />
                                      </Link>
                                    </div>
                                  </div>
                                </Col>
                              </Row>
                            </Link>
                          </div>
                        )
                    )
                  : null}
              </div>
              <div>
                {homebanner
                  ? homebanner.map(
                      (item, index) =>
                        item.type === "home_banner_3" && (
                          <div className="home-img">
                            <Link to={item.default_link}>
                              <div>
                                <img
                                  src={
                                    "https://canine.hirectjob.in//storage/app/" +
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
                                      Explore More{" "}
                                      <i className="fa fa-angle-right" />
                                    </Button>
                                  </div>
                                </Col>
                              </Row>
                            </Link>
                          </div>
                        )
                    )
                  : null}
              </div>
            </Carousel>
          </Container>
        </div>
      </div>

      <section className="section-padding">
        <Container>
          <Row>
            <AnimationOnScroll
              animateIn="animate__fadeInLeftBig"
              animateOnce={true}
            >
              <h1 className="main-head">Shop Deals For Your Best Buddy</h1>
            </AnimationOnScroll>
          </Row>
        </Container>
        <Container fluid>
          <Carousel
            swipeable={true}
            draggable={true}
            showDots={true}
            responsive={clinetreview}
            ssr={true} // means to render carousel on server-side.
            infinite={true}
            autoPlay={props.deviceType !== "mobile" ? true : false}
            autoPlaySpeed={7000}
            keyBoardControl={true}
            customTransition="all 1s"
            transitionDuration={1000}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile"]}
            deviceType={props.deviceType}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
          >
            {categories &&
              categories.map((item) => (
                <div className="Shop-Deals" key={item.id}>
                  <Link to={`/petshop-pet-category/${item.name}/${item.id}`}>
                    <img
                      src={
                        "https://canine.hirectjob.in//storage/app/public/category/" +
                        item.image
                      }
                    />
                    <h1>{item.name}</h1>
                  </Link>
                </div>
              ))}
          </Carousel>
        </Container>
      </section>

      <section className="section-padding food">
        <Container>
          <Row>
            <Col lg={6} sm={6}>
              {/* <h5>Dog Nutrients & Food </h5> */}
              <AnimationOnScroll animateIn="animate__tada" animateOnce={true}>
                <h1 className="main-head">Latest all Products</h1>
              </AnimationOnScroll>
            </Col>
            <Col lg={6} sm={6}>
              <div className="foodMore">
                <Link to="/petshop-product">
                  View More <i className="fa fa-angle-right" />
                </Link>
              </div>
            </Col>
          </Row>
          <div className="needplace">
            <Row>
              {allproduct &&
                allproduct.map((item, index) => (
                  <Col lg={3} sm={6} xs={6} className="mb-4">
                    <div
                      className="food-product"
                      onMouseEnter={() => handleMouseEnter(item.id)}
                      onMouseLeave={() => handleMouseLeave(item.id)}
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
                          if (storedWholesellerId == null) {
                            toast.error("Please Login first");
                          } else {
                            addToWishlist(item.id);
                          }
                        }}
                      />

                      <Link to={`/petshop-productDetails/${item.id}`}>
                        <div className="text-center">
                          <img
                            src={
                              "https://canine.hirectjob.in///storage/app/public/product/" +
                              item.image
                            }
                          />
                        </div>
                        <div>
                          <h6>{item.name}</h6>
                          <p>{renderProductDescription(item.description)}</p>
                        </div>
                        <div className="product-bag">
                          {/* <Row>
                            <Col>
                              <p>₹{item.price}</p>
                            </Col>
                            <Col>
                              <h5>{item.discount}%</h5>
                            </Col>
                          </Row> */}
                          <Row>
                            <Col className="align-self-center">
                              <h6>
                                {/* {`₹${(item.price * item.discount) / 100}`} */}
                                {/* {`₹${
                                  item.price -
                                  (item.price * item.discount) / 100
                                }`} */}
                                ₹{item?.whole_price}
                              </h6>
                            </Col>
                            {/* <Col>
                              <Link
                                to={`/petshop-add-cart/${item.id}`}
                                onClick={handleAddToCart}
                              >
                                <img src={bag} />
                              </Link>
                            </Col> */}
                          </Row>
                        </div>
                      </Link>

                      {buttonVisibility[item.id] && (
                        <Fade top>
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
                              onClick={(e) => handeldataId(item.id)}
                            >
                              Buy Now
                            </button>
                          </div>
                        </Fade>
                      )}
                    </div>
                  </Col>
                ))}
            </Row>
          </div>
        </Container>
      </section>

      <section className="section-padding">
        <Container>
          <Row>
            <Col lg={6} sm={6}>
              <AnimationOnScroll animateIn="animate__tada" animateOnce={true}>
                <h1 className="main-head">Our Brand</h1>
              </AnimationOnScroll>
            </Col>
            <Col lg={6} sm={6}>
              <div className="foodMore">
                <Link to="/petshop-our-brand">See all</Link>
              </div>
            </Col>
          </Row>
          <Row className="mt-4">
            {brands
              ? brands.map(
                  (brand, index) =>
                    brand.canine == "1" && (
                      <Col lg={3} sm={6} xs={6} className="mb-5">
                        <div
                          key={brand.id}
                          className="Brand-card"
                          style={{
                            background: ourBrand[index % ourBrand.length],
                          }}
                        >
                          <Link to={`/petshop-our-Ourbrand/${brand.title}`}>
                            <div className="brandLOGO">
                              <img
                                src={
                                  "https://canine.hirectjob.in//storage/app/public/brand_logo/" +
                                  brand.logo
                                }
                              />
                            </div>
                            <div className="brand-main">
                              <img
                                src={
                                  "https://canine.hirectjob.in//storage/app/public/brand/" +
                                  brand.image
                                }
                              />
                            </div>
                            <div className="brand-text">
                              <h5>{brand.title}</h5>
                            </div>
                          </Link>
                        </div>
                      </Col>
                    )
                )
              : null}
          </Row>
        </Container>
      </section>

      <section className="section-padding thirdbnner-area">
        <Container>
          <Row>
            {homebanner
              ? homebanner.map(
                  (item, index) =>
                    item.type === "default" && (
                      <Col lg={6} className="mb-4">
                        <img
                          src={
                            "https://canine.hirectjob.in//storage/app/" +
                            item.image
                          }
                        />
                      </Col>
                    )
                )
              : null}
            <Col lg={6} className="align-self-center">
              <Row>
                {homebanner
                  ? homebanner.map(
                      (item, index) =>
                        item.type === "store_wise" && (
                          <Col sm={12} className="mb-4">
                            <img
                              src={
                                "https://canine.hirectjob.in//storage/app/" +
                                item.image
                              }
                            />
                          </Col>
                        )
                    )
                  : null}
                {homebanner
                  ? homebanner.map(
                      (item, index) =>
                        item.type === "item_wise" && (
                          <Col sm={12} className="mb-4">
                            <img
                              src={
                                "https://canine.hirectjob.in//storage/app/" +
                                item.image
                              }
                            />
                          </Col>
                        )
                    )
                  : null}
              </Row>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="section-padding">
        <Container>
          <Row>
            <Col lg={6} sm={6}>
              <AnimationOnScroll animateIn="animate__tada" animateOnce={true}>
                <h1 className="main-head">Shop By Brands</h1>
              </AnimationOnScroll>
            </Col>
            <Col lg={6} sm={6}>
              <div className="foodMore">
                <Link to="/petshop-shop-by-brand">See all</Link>
              </div>
            </Col>
          </Row>
          <div className="needplace">
            <Row>
              {brands
                ? brands.map(
                    (brand, index) =>
                      brand.canine == "0" && (
                        <Col lg={3} sm={6} xs={6} className="mb-5">
                          <div
                            key={brand.id}
                            className="Brand-card"
                            style={{
                              background: ourBrand[index % ourBrand.length],
                            }}
                          >
                            <Link to={`/petshop-shop-by-brandList/${brand.id}`}>
                              <div className="brandLOGO">
                                <img
                                  src={
                                    "https://canine.hirectjob.in//storage/app/public/brand_logo/" +
                                    brand.logo
                                  }
                                />
                              </div>
                              <div className="brand-main">
                                <img
                                  src={
                                    "https://canine.hirectjob.in//storage/app/public/brand/" +
                                    brand.image
                                  }
                                />
                              </div>
                              <div className="brand-text">
                                <h5>{brand.title}</h5>
                              </div>
                            </Link>
                          </div>
                        </Col>
                      )
                  )
                : null}
            </Row>
          </div>
        </Container>
      </section>

      <section className="section-padding">
        <Container>
          <div className="banner-video">
            {homebanner
              ? homebanner.map(
                  (item, index) =>
                    item.type === "video" && (
                      <Row>
                        <Col lg={5} className="p-0">
                          <div className="video-content">
                            <h1 className="main-head">{item.title}</h1>
                            <p>{item.description}</p>
                            <Button>Shop Now</Button>
                          </div>
                        </Col>
                        <Col lg={7} className="p-0">
                          <video loop autoPlay muted>
                            <source
                              src={
                                "https://canine.hirectjob.in//storage/app/" +
                                item.image
                              }
                              type="video/mp4"
                            />
                          </video>
                        </Col>
                      </Row>
                    )
                )
              : null}
          </div>
        </Container>
      </section>

      <section className="section-padding">
        <Container>
          <div className="text-left">
            <AnimationOnScroll animateIn="animate__tada" animateOnce={true}>
              <h1 className="main-head">Blog</h1>
            </AnimationOnScroll>
          </div>
          <div className="needplace">
            <Row>
              {blog && blog.length > 0 ? (
                blog.map((item, index) => (
                  <Col lg={4} sm={6} className="mb-4">
                    <div className="blog-card">
                      <img
                        src={
                          "https://canine.hirectjob.in//storage/app/public/blog/" +
                          item.image
                        }
                      />
                      <h3>{item.title}</h3>
                      <p>{renderBlogDescription(item.description)}</p>
                      <Link to={`/petshop-blog-details/${item.id}`}>
                        Read More
                      </Link>
                    </div>
                  </Col>
                ))
              ) : (
                <p className="emptyMSG">No Blog Data.</p>
              )}
            </Row>
          </div>
          <div className="allblogbtn">
            <Button>
              <Link to="/petshop-blog">All Blogs</Link>
            </Button>
          </div>
        </Container>
      </section>

      <section className="section-padding">
        <Container>
          <Row>
            <Col lg={6}>
              <AnimationOnScroll animateIn="animate__tada" animateOnce={true}>
                <h1 className="main-head">Happy Customer</h1>
              </AnimationOnScroll>
            </Col>
          </Row>
          <Row>
            {reviewlist.map((order, index) => (
              <Col lg={4} sm={6} xs={6} key={order.id}>
                <div
                  className="Brand-cus"
                  style={{
                    background: happyCus[index % happyCus.length],
                  }}
                >
                  <>
                    <img
                      src={
                        "https://canine.hirectjob.in//storage/app/public/profile/" +
                        order.user_id[0].image
                      }
                      alt={order.user_id[0].f_name}
                    />
                  </>
                  <div className="brand-bg">
                    {order.user_id && order.user_id.length > 0 && (
                      <h5>
                        {order.user_id[0].f_name} {order.user_id[0].l_name}
                      </h5>
                    )}
                    <p>{order.comment}</p>
                    <div className="icon-style">
                      {Array.from({
                        length: order.rating,
                      }).map((_, index) => (
                        <Link>
                          <i class="fa fa-star" />
                        </Link>
                      ))}
                    </div>
                    {/* <Link>4.2/5</Link> */}
                  </div>
                </div>
              </Col>
            ))}
          </Row>
          <div className="all-btn text-center mt-5 mb-4">
            <Button className="blue-btn">
              Explore More <i className="fa fa-angle-right" />
            </Button>
          </div>
        </Container>
      </section>

      <section className="section-padding">
        <Container>
          <div>
            {homebanner
              ? homebanner.map(
                  (item, index) =>
                    item.type === "news_letter" && (
                      <div className="home-img">
                        <div className="">
                          <img
                            src={
                              "https://canine.hirectjob.in//storage/app/" +
                              item.image
                            }
                          />
                        </div>
                        <Row className="justify-content-center">
                          <Col lg={7}>
                            <div className="new-content">
                              <div className="Newsletter">
                                <Flip right>
                                  <h1 className="main-head">
                                    Get Or Promo Code by Subscribing To our
                                    Newsletter
                                  </h1>
                                </Flip>
                                <Form className="d-flex">
                                  <Form.Control
                                    type="search"
                                    placeholder="Enter your email"
                                    className="me-2"
                                    aria-label="Search"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                  />
                                  <Button
                                    variant="outline-success"
                                    onClick={handleNewsletter}
                                  >
                                    Subscribe
                                  </Button>
                                </Form>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    )
                )
              : null}
          </div>
        </Container>
      </section>

      <Petshopfooter />

      {/* Product details Modal */}
      <div
        className="modal fade bd-example-modal-lg"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="myLargeModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-body">
              <i class="quickarea fa fa-times" data-dismiss="modal" />
              <section className="section-padding">
                <Container>
                  <Row>
                    <Col lg={6}>
                      <div>
                        <div className="product-item quickviewimg">
                          <img src={mainImage} alt="Product Image" />
                        </div>
                        <div className="needplace">
                          <Row>
                            {/* <Col sm={2} className="mb-3">
                      <div
                        className="product-item-inner" onClick={() => handleThumbnailClick(index)}>
                        <img src={singleImage} />
                      </div></Col> */}
                            {productDetails?.images &&
                            productDetails?.images.length > 0 ? (
                              productDetails?.images.map((item, index) => (
                                <Col sm={3} className="mb-3" key={index}>
                                  <div
                                    className="product-item-inner"
                                    onClick={() => handleThumbnailClick(index)}
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
                    </Col>
                    <Col lg={6}>
                      <div className="productDetail-content">
                        <Row>
                          <Col lg={10}>
                            <h4>{productDetails.name}</h4>
                          </Col>
                        </Row>
                        <p>
                          By <span>{productDetails.store_name}</span>
                        </p>

                        <Wrapper>
                          <div className="icon-style">
                            {ratingStar}
                            <p>
                              ({productDetails.rating_count} customer reviews)
                            </p>
                          </div>
                        </Wrapper>

                        <div className="needplaceProduct">
                          <Row>
                            <Col sm={6}>
                              <div className="tab-container">
                                <h6>Variations</h6>
                                <Row>
                                  {productDetails?.variations &&
                                    productDetails?.variations.length > 0 &&
                                    productDetails.variations.map(
                                      (item, index) => (
                                        <Col lg={4} sm={4} xs={3} key={index}>
                                          {item.stock !== 0 ? (
                                            <div
                                              className={`tab-variations ${
                                                selectedVariant === item.type
                                                  ? "active"
                                                  : ""
                                              }`}
                                              onClick={() => {
                                                setSelectedVariant(item.type);
                                                setSelectedVariantPrice(
                                                  item.price
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
                            </Col>
                            <Col sm={6}>
                              <div className="quantity-btn quickbtn">
                                <button onClick={handleDecrementOne}>
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
                                <button onClick={handleIncrementOne}>
                                  <i className="fa fa-plus" />
                                </button>
                              </div>
                            </Col>
                          </Row>
                        </div>
                        <div className="needplaceProduct">
                          <div className="product-deatils-price">
                            <Row>
                              {/* <Col lg={3}> */}
                              {/* <p>{`₹${productDetails.whole_price}`}</p> */}
                              {/* <p>{`₹${wholesellervariationprice}`}</p> */}
                              {/* {console.log(
                          "productDetails?.variations?.price: ",
                          productDetails?.variations?.price
                        )} */}
                              {/* </Col> */}
                              <Col lg={4}>
                                <h5>{`₹${
                                  isNaN(formattedAmount) ? 0 : formattedAmount
                                }`}</h5>
                              </Col>
                              {/* <Col lg={5}>
                        <h6>
                          Your save
                          {formattedSavedAmount >= 0
                            ? "₹" + formattedSavedAmount
                            : "No savings"}
                        </h6>
                      </Col> */}
                            </Row>
                          </div>
                        </div>
                        <h5>About Us</h5>
                        {console.log(
                          "productDetails.brand_id: ",
                          productDetails.brand_id
                        )}

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
                              <tr>
                                <th>Health Condition</th>
                                <td>{productDetails?.helthCondition_id}</td>
                              </tr>
                              <tr>
                                <th>Target Species</th>
                                <td>{productDetails?.Petsbreeds_id}</td>
                              </tr>
                              {/* <tr>
                          <th>Item From</th>
                          <td>Pellet</td>
                        </tr> */}
                            </tbody>
                          </Table>
                        ) : (
                          <p>No data available for this product.</p>
                        )}
                      </div>
                    </Col>
                  </Row>
                  {productDetails.stock && productDetails.stock.length !== 0 ? (
                    <div className="productBTNaddcard">
                      {verifiredIdaccess === 1 ? (
                        <Button>
                          <Link
                            to={`/petshop-add-cart/${productDetails.id}`}
                            onClick={handleAddToCart}
                          >
                            <i className="fa fa-shopping-bag" /> Add to cart
                          </Link>
                        </Button>
                      ) : (
                        <Button onClick={demousercheck}>
                          <Link>
                            <i className="fa fa-shopping-bag" /> Add to cart
                          </Link>
                        </Button>
                      )}
                      <p>{addToCartStatus}</p>
                    </div>
                  ) : (
                    <div className="sold-out-btn mt-3">
                      <Link>Sold Out</Link>
                      <br />
                      <Button
                        data-toggle="modal"
                        data-target="#soldoutModel"
                        data-dismiss="modal"
                      >
                        Notify Me When Available
                      </Button>
                    </div>
                  )}
                  {/* </Row> */}
                </Container>
              </section>
            </div>
          </div>
        </div>
      </div>
      {/* buy now model */}
      <div
        className="modal fade buynow"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="myLargeModalLabel"
        aria-hidden="true"
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
                              data-dismiss="modal"
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
                                        setSelectedVariantPrice(item.price); // Store the price in state
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
                          <button onClick={handleDecrementOne}>
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
                          <button onClick={handleIncrementOne}>
                            <i className="fa fa-plus" />
                          </button>
                        </div>

                        <div className="needplaceProduct">
                          <div className="product-deatils-price">
                            <Row>
                              {/* <Col lg={3} sm={3} xs={3}>
                                <p>{`₹${uservariationprice}`}</p>
                              </Col> */}
                              <Col lg={4} sm={4} xs={3}>
                                <h5>{`₹${
                                  isNaN(formattedAmount) ? 0 : formattedAmount
                                }`}</h5>
                              </Col>
                              {/* <Col lg={5} sm={5} xs={3}>
                                <h6>
                                  Your save
                                  {formattedSavedAmount >= 0
                                    ? "₹" + formattedSavedAmount
                                    : "No savings"}
                                </h6>
                              </Col> */}
                            </Row>
                          </div>
                        </div>
                      </Col>
                      {/* <Col lg={2} sm={2} xs={6} className="align-self-end">
                        <div className="delete-addcard">
                          <Link onClick={() => removeFromCart(item.id)}>
                            <i class="fa fa-trash-o" />
                          </Link>
                        </div>
                      </Col> */}
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
                          {/* <Row>
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
                          <hr /> */}
                          <Row>
                            <Col>
                              <h5>Tax(5%)</h5>
                            </Col>
                            <Col>
                              <h5>{`₹${Math.floor(Amount * 0.05)}`}</h5>
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
                                {parseInt(Amount) * 0.05 + parseInt(Amount) ??
                                  0}
                              </h5>
                            </Col>
                          </Row>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Container>
                <div className="homecheckout">
                  {productDetails?.stock &&
                  productDetails?.stock?.length !== 10 ? (
                    <button data-toggle="modal" data-target="#cod">
                      Checkout
                    </button>
                  ) : (
                    <div className="sold-out-btn soldbtn-new mt-3">
                      <Link className="mb-4">Sold Out</Link>
                      <br />
                      <Button data-toggle="modal" data-target="#soldoutModel">
                        Notify Me When Available
                      </Button>
                      <br />
                    </div>
                  )}
                  <button
                    className="mt-3"
                    data-dismiss="modal"
                    onClick={handleResetClick}
                  >
                    Close
                  </button>
                </div>
              </>
            </div>
          </div>
        </div>
      </div>

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
                  <Link to="/petShop-shipping">Done</Link>
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
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* update-model */}

      <div
        className="modal fade buynow"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="myLargeModalLabel"
        aria-hidden="true"
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
                              data-dismiss="modal"
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
                                        setSelectedVariantPrice(item.price); // Store the price in state
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
                          <button onClick={handleDecrementOne}>
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
                          <button onClick={handleIncrementOne}>
                            <i className="fa fa-plus" />
                          </button>
                        </div>

                        <div className="needplaceProduct">
                          <div className="product-deatils-price">
                            <Row>
                              <Col lg={3} sm={3} xs={3}>
                                <p>{`₹${uservariationprice}`}</p>
                              </Col>
                              <Col lg={4} sm={4} xs={3}>
                                <h5>{`₹${
                                  isNaN(formattedAmount) ? 0 : formattedAmount
                                }`}</h5>
                              </Col>
                              <Col lg={5} sm={5} xs={3}>
                                <h6>
                                  Your save
                                  {formattedSavedAmount >= 0
                                    ? "₹" + formattedSavedAmount
                                    : "No savings"}
                                </h6>
                              </Col>
                            </Row>
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
                          <Row>
                            <Col>
                              <h5>Tax(5%)</h5>
                            </Col>
                            <Col>
                              <h5>{`₹${Math.floor(Amount * 0.05)}`}</h5>
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
                                {parseInt(Amount) * 0.05 + parseInt(Amount) ??
                                  0}
                              </h5>
                            </Col>
                          </Row>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Container>
                <div className="homecheckout">
                  {productDetails?.stock &&
                  productDetails?.stock?.length !== 10 ? (
                    <button data-toggle="modal" data-target="#cod">
                      Checkout
                    </button>
                  ) : (
                    <div className="sold-out-btn soldbtn-new mt-3">
                      <Link className="mb-4">Sold Out</Link>
                      <br />
                      <Button data-toggle="modal" data-target="#soldoutModel">
                        Notify Me When Available
                      </Button>
                      <br />
                    </div>
                  )}
                  <button
                    className="mt-3"
                    data-dismiss="modal"
                    onClick={handleResetClick}
                  >
                    Close
                  </button>
                </div>
              </>
            </div>
          </div>
        </div>
      </div>

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

      <div
        className="modal fade"
        id="soldoutModel"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <h4>{productDetails.name}</h4>
              <p>{productDetails.description}</p>
              {/* <form>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Variations</label>
                  <select
                    className="form-control"
                    onChange={(e) => setVariation(e.target.value)}
                    value={variation}
                  >
                    <option value="" disabled selected>
                      Choose an option...
                    </option>
                    {productDetails?.variations &&
                      productDetails?.variations.map((item) => (
                        <option>{item.type}</option>
                      ))}
                  </select>{" "}
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter Email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                </div>
                <div className="Notify-Me">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    data-dismiss="modal"
                    onClick={(e) => handleNotifymeSubmit(e)}
                  >
                    Notify Me When Available
                  </button>
                </div>
              </form> */}
              <Form onSubmit={handleNotifymeSubmit}>
                {/* <Form.Group controlId="formVariations">
        <Form.Label>Variations</Form.Label>
        <Form.Control
          as="select"
          value={variation}
          onChange={(e) => setVariation(e.target.value)}
          required
          isInvalid={!!variationError}
        >
          <option value="" disabled>
            Choose an option...
          </option>
          {productDetails?.variations &&
            productDetails?.variations.map((item, index) => (
              <option key={index}>{item.type}</option>
            ))}
        </Form.Control>
        {variationError && (
          <div className="error-message">{variationError}</div>
        )}
      </Form.Group> */}
                <Form.Group controlId="formVariations" className="mb-3">
                  <Form.Label>Variations</Form.Label>
                  <Form.Control
                    as="select"
                    value={variation}
                    onChange={(e) => {
                      setVariation(e.target.value);
                      setVariationError(""); // Clear previous error when the value changes
                    }}
                    required
                    isInvalid={!!variationError}
                  >
                    <option value="" disabled>
                      Choose an option...
                    </option>
                    {productDetails?.variations &&
                      productDetails?.variations?.length > 0 &&
                      productDetails?.variations.map((item, index) => (
                        <option key={index}>{item.type}</option>
                      ))}
                  </Form.Control>
                  {variationError && (
                    <div className="error-message">{variationError}</div>
                  )}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupEmail">
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Email ID"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setIsEmailValid(isEmailFormatValid(e.target.value));
                    }}
                    isInvalid={!isEmailValid}
                  />
                  {!isEmailValid && (
                    <Form.Control.Feedback
                      type="invalid"
                      className="custom-form-control-feedback"
                    >
                      {/[A-Z]/.test(email) && !email.includes("@")
                        ? "Email should not contain capital letters and must include '@'."
                        : "Please enter a valid email address."}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>

                <Button variant="primary mt-3" type="submit">
                  Notify Me When Available
                </Button>
              </Form>
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
export default PetshopHome;
