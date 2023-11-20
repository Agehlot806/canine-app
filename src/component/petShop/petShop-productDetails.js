import React, { useEffect, useState } from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AiOutlineStar } from "react-icons/ai";
import axios from "axios";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { BASE_URL } from "../../Constant/Index";
import { styled } from "styled-components";
import toast, { Toaster } from "react-hot-toast";
import PetShopHeader from "../../directives/petShopHeader";
import Petshopfooter from "../../directives/petShop-Footer";
import paydone from "../../assets/images/icon/paydone.png";
import { Fade } from "react-reveal";
import loadinggif from "../../assets/images/video/loading.gif";
import { RWebShare } from "react-web-share";
import Lightbox from "react-awesome-lightbox";

function PetshopproductDetails() {
  const { id } = useParams();
  // *************************
  const storedWholesellerId = Number(localStorage.getItem("UserWholesellerId"));
  const salesmanId = localStorage.getItem("salesmanId");
  // **********************

  const verifiredIdaccess = Number(localStorage.getItem("verifiedId"));
  const [productDetails, setProductDetails] = useState([]);
  const categoryid = productDetails.category_id;
  const itemsid = productDetails.id;
  const demousercheck = () => {
    toast.error("Profile is not verified");
  };
  const [itemwiseonebanner, setitemwiseonebanner] = useState([]);
  const [homebanner, sethomebanner] = useState([]);
  const [addToCartStatus, setAddToCartStatus] = useState("");
  // const { stars, reviews } = Productdetail;
  const [quantity, setQuantity] = useState(0);
  const [minOrder, setMinOrder] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState([]);
  const [selectedVariantPrice, setSelectedVariantPrice] = useState("");
  const [selectedVariantStock, setSelectedVariantStock] = useState("");

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value, 10);
    if (!isNaN(newQuantity) && newQuantity >= minOrder) {
      setQuantity(newQuantity);
    }
  };

  const handleIncrementOne = () => {
    // setQuantity(quantity + 1);
    if (productDetails?.variations?.length > 0) {
      productDetails?.variations.forEach((el) => {
        if (el?.type === selectedVariant) {
          if (quantity === el?.stock) {
            toast.error(`${el.type} Stock not avilable`);
          } else {
            setQuantity(quantity + 1);
          }
        } else {
        }
      });
    } else {
      if (quantity === productDetails?.stock) {
        toast.error(`Stock not avilable`);
      } else {
        setQuantity(quantity + 1);
      }
    }
  };

  const handleDecrementOne = () => {
    if (quantity > minOrder) {
      setQuantity(quantity - 1);
    }
  };

  useEffect(() => {
    if (productDetails?.variations && productDetails.variations.length > 0) {
      const defaultVariant = productDetails.variations[0];
      setSelectedVariant(defaultVariant.type);
      setSelectedVariantPrice(defaultVariant.wholeprice);
      setSelectedVariantStock(defaultVariant.stock);
    }
  }, [productDetails]);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    Promise.all([
      productData(),
      itemWiseBanner(),
      fetchrelatedproduct(),
      fetchBreed(),
      AllBanner(),
      AllOrderList(),
      allAddressList(),
    ])
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  const productData = async () => {
    axios
      .get(`${BASE_URL}/items/product_details/${id}`)
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

  const [email, setEmail] = useState("");
  const [variation, setVariation] = useState("");
  const handleNotifymeSubmit = async (e) => {
    // e.preventDefault();
    // console.log("handleSubmit called", handleValid()); // Add this

    // if (handleValid()) {
    const notifymeData = new FormData();

    notifymeData.append("email", email);
    notifymeData.append("variation", variation);
    notifymeData.append("stock", productDetails.stock);
    notifymeData.append("user_id", storedWholesellerId);
    notifymeData.append("item_id", productDetails.id);
    axios
      .post(`${BASE_URL}/items/notify`, notifymeData)
      .then((response) => {
        toast.success("Your data Successfully Add");
      })
      .catch((error) => {
        toast.error("Field is required");
      });
  };

  const handleAddToCart = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/customer/wish-list/add_product`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Set appropriate content type
            "Access-Control-Allow-Methods": "POST",
            "Access-Control-Allow-Headers": "Content-Type",
          },
          item_name: productDetails?.name,
          variant: selectedVariant.length > 0 ? selectedVariant : "", // You may need to update this based on your data
          image: productDetails?.image,
          quantity: quantity,
          total_quantity: selectedVariantStock
            ? selectedVariantStock
            : productDetails?.stock,
          return_order: productDetails?.returnable || "yes",
          // price: selectedVariantPrice,
          price:
            formattedAmount === "0"
              ? productDetails?.whole_price.toString()
              : formattedAmount,
          min_order: productDetails.min_order,
          user_id: storedWholesellerId,
          item_id: productDetails?.id,
          seller_id: salesmanId ? Number(salesmanId) : "",
        }
      );

      if (response) {
        // Store the cart items in local storage
        // const savedCartItems = JSON.parse(localStorage.getItem('cart')) || [];
        // const updatedCart = [...savedCartItems, productDetails];
        // localStorage.setItem('cart', JSON.stringify(updatedCart));
        if (response.data.status === "200") {
          toast.success("Added to cart!");

          // setAddToCartStatus("Added to cart!");
          shippingpage(`/petshop-add-cart/${id}`);
        } else {
          // setAddToCartStatus(response.data.message);
          toast.error("Already added");
        }
        // const updatedCart = [...addToCartStatus, productDetails];
        // setAddToCartStatus(updatedCart);
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

  const ratingStar = Array.from({ length: 5 }, (item, index) => {
    let number = index + 0.5;
    return (
      <span key={index}>
        {productDetails.rating_count >= index + 1 ? (
          <FaStar className="icon" />
        ) : productDetails.rating_count >= number ? (
          <FaStarHalfAlt className="icon" />
        ) : (
          <AiOutlineStar className="icon" />
        )}
      </span>
    );
  });
  const [getreviewlist, setgetreviewlist] = useState([]);
  const AllOrderList = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/items/get_reviewitem/${id}`
      );
      setgetreviewlist(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

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
  const AllBanner = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/categories/banner`);
      sethomebanner(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };
  const itemWiseBanner = async () => {
    try {
      const response = await fetch(`${BASE_URL}/banners/`);
      const data = await response.json();
      const latestPosts = data.data.slice(0, 2);
      setitemwiseonebanner(latestPosts);
    } catch (error) {
      console.log(error);
    }
  };
  const [allrelatedproduct, setallrelatedproduct] = useState([]);
  const fetchrelatedproduct = async () => {
    axios
      .get(`${BASE_URL}/items/product/2/8`)
      .then((response) => {
        console.log(response);
        console.log("Delete Successful");
        setallrelatedproduct(response.data.data);
        // Perform any additional actions after successful deletion
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const [tragetSpecies, setTragetSpecies] = useState([]);
  const fetchBreed = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/auth/breed/1`);
      const names = response.data.data.map((item) => item.name);
      setTragetSpecies(names);

      // Handle response as needed
    } catch (error) {
      console.error(error);
      // Handle error as needed
    }
  };

  const gradientColors = [
    "linear-gradient(180deg, #FFF0BA 0%, rgba(251.81, 233.11, 165.78, 0) 100%)",
    "linear-gradient(180deg, #C7EBFF 0%, rgba(199, 235, 255, 0) 100%)",
    "linear-gradient(180deg, #FECBF0 0%, rgba(254, 203, 240, 0) 100%)",
    "linear-gradient(180deg, #C8FFBA 0%, rgba(200, 255, 186, 0) 100%)",
    // Add more gradient colors as needed
  ];
  let wholesellervariationprice = 0;

  if (selectedVariantPrice !== "") {
    wholesellervariationprice = selectedVariantPrice;
  } else {
    wholesellervariationprice = productDetails.whole_price;
  }
  const Amount = (
    wholesellervariationprice * (quantity > 1 ? quantity : 1)
  ).toFixed(2);
  const formattedAmount = Number(productDetails.whole_price).toString();
  // const calculatedPrice = selectedVariantPrice
  // ? selectedVariantPrice -
  //   (selectedVariantPrice * productDetails.discount) / 100
  //   : productDetails?.price;
  // price:
  // calculatedPrice === 0
  //   ? parseInt(productDetails?.price)
  //   : parseInt(calculatedPrice),
  const addToWishlist = async (item_id) => {
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
          toast.success("Added successfully");
        }
      })
      .catch((error) => {
        toast.error("Already in your wishlist");
      });
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

  const handeldataId = (id) => {
    productDatatwo(id);
  };
  const productDatatwo = async (selctId) => {
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

  const [responseMessage, setResponseMessage] = useState("");
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

  // const removeFromCart = async (selctId) => {
  //   try {
  //     const response = await axios
  //       .delete(`${BASE_URL}/customer/wish-list/remove_product/${selctId}`)
  //       .then((response) => {
  //         console.log(response);
  //         window.location.reload(false);
  //       });
  //     // if (response.data.success) {
  //     //   setAddToCartProduct(
  //     //     (prevData) => prevData.filter((item) => item.id !== id)
  //     //     // refresh
  //     //   );
  //     //   window.location.reload(false);
  //     //   console.log("Product removed from cart:", response.data);
  //     // }
  //   } catch (error) {
  //     console.error("Error removing product from cart:", error);
  //   }
  // };

  const handleDeleteAddress = (id) => {
    axios
      .delete(
        `${BASE_URL}/customer/address/delete/${id}`
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
  //   console.log("disccount?????", dis);
  // };
  // const clearCoupon = () => {
  //   setcoupenCode(!coupencode);
  //   setAppliedCoupon(false); // Set appliedCoupon to false when the "X" button is clicked
  //   localStorage.removeItem("disconut"); // Optionally, you can remove the discount value from localStorage here
  // };
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
      price: Amount,
      quantity: quantity,
      tax_amount: Math.floor(Amount * 0.05),
      discount_on_item: "",
      total_quantity:
        selectedVariantStock.length > 0
          ? selectedVariantStock
          : productDetails?.stock,
      return_order: productDetails?.returnable || "yes",
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
      const response = await fetch(
        `${BASE_URL}/customer/order/list?id=${storedWholesellerId}`
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

  const [showData, setShowData] = useState(false);

  const toggleData = (e) => {
    e.preventDefault();
    setShowData(!showData);
  };

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

  return (
    <>
      <Toaster />
      <PetShopHeader />
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
            <Container>
              <Row>
                {/* <Col lg={6}>
                  <div>
                    <div className="product-item">
                      <img src={mainImage} alt="Product Image" />
                    </div>
                    <div className="needplace">
                      <Row>
                        {productDetails?.images &&
                        productDetails?.images.length > 0 ? (
                          productDetails?.images.map((item, index) => (
                            <Col
                              lg={2}
                              sm={3}
                              xs={3}
                              className="mb-3"
                              key={index}
                            >
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
                </Col> */}

                <Col lg={6} sm={6}>
                  <>
                    <div>
                      <div className="product-item">
                        <img
                          src={mainImage}
                          alt="Product Image"
                          onClick={handleMainImageClick}
                        />
                      </div>
                      <div className="needplace">
                        <Row>
                          {productDetails?.images &&
                            productDetails?.images.length > 0 ? (
                            productDetails.images.map((item, index) => (
                              <Col
                                lg={2}
                                sm={3}
                                xs={3}
                                className="mb-3"
                                key={index}
                              >
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

                    {lightboxIsOpen && (
                      <Lightbox
                        images={productDetails.images.map((item) => ({
                          url:
                            "https://canine.hirectjob.in//storage/app/public/product/" +
                            item,
                          title: productDetails.name,
                        }))}
                        currentIndex={lightboxImageIndex}
                        onClose={() => setLightboxIsOpen(false)}
                      />
                    )}
                  </>
                </Col>
                <Col lg={6}>
                  <div className="productDetail-content">
                    <Row>
                      <Col lg={9} sm={9} xs={12}>
                        <h4>{productDetails.name}</h4>
                      </Col>
                      <Col lg={3} sm={3} xs={12}>
                        <p>
                          {productDetails.veg == 0 ? (
                            <span>
                              <span className="non-vegetarian">●</span>
                            </span>
                          ) : (
                            <span>
                              <span className="vegetarian">●</span>
                            </span>
                          )}

                          <RWebShare
                            data={{
                              text: `Check out this amazing product: ${productDetails.name}`,
                              url: window.location.href,
                              title: productDetails.name,
                            }}
                            onClick={() =>
                              console.log("Product shared successfully!")
                            }
                          >
                            <div className="share-btn">
                              <i class="fa fa-share-alt" />
                            </div>
                          </RWebShare>
                        </p>
                      </Col>
                    </Row>
                    <p>
                      By <span>{productDetails?.brand_id}</span>
                    </p>

                    <Wrapper>
                      <div className="icon-style">
                        {ratingStar}
                        <p>({productDetails.rating_count} customer reviews)</p>
                      </div>
                    </Wrapper>

                    <div className="needplaceProduct">
                      <Row>
                        {productDetails?.variations?.length > 0 && (
                          <Col sm={6}>
                            <div className="tab-container">
                              <h6>Variations</h6>
                              <Row>
                                {productDetails?.variations &&
                                  productDetails?.variations.length > 0 &&
                                  productDetails.variations.map(
                                    (item, index) => (
                                      <Col
                                        lg={3}
                                        sm={3}
                                        xs={3}
                                        key={index}
                                        className="p-0"
                                      >
                                        {item.stock !== 0 ? (
                                          <div
                                            className={`tab-variations ${selectedVariant === item.type
                                                ? "active"
                                                : ""
                                              }`}
                                            onClick={() => {
                                              setSelectedVariant(item.type);
                                              setSelectedVariantPrice(
                                                item.wholeprice
                                              );
                                              setSelectedVariantStock(
                                                item.stock
                                              );
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
                        )}
                        <Col sm={6}>
                          <div className="quantity-btn">
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
                          <Col lg={4}>
                            {/* <h5>{`₹${
                          isNaN(formattedAmount) ? 0 : formattedAmount
                        }`}</h5> */}
                            <h5>
                              ₹
                              {isNaN(productDetails.whole_price * quantity)
                                ? 0
                                : productDetails.whole_price * quantity}
                            </h5>
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
                    <Button onClick={handleAddToCart}>
                      <Link
                      // to={`/petshop-add-cart/${id}`}
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
                  <Button data-toggle="modal" data-target="#soldoutModel">
                    Notify Me When Available
                  </Button>
                </div>
              )}
              {/* </Row> */}
              <div className="productBTNaddcard">
                {/* <Button>
              <Link to="/petshop-add-cart">
                <i className="fa fa-shopping-bag" /> Add to cart
              </Link>
            </Button> */}
              </div>
              <h1 className="main-head mt-4">Product details</h1>
              <p>{productDetails.description}</p>

              <>
                <div className="Product-Review">
                  <h1 className="main-head mt-4">Product Review</h1>
                  {getreviewlist && getreviewlist.length > 1 ? (
                    getreviewlist.map(
                      (order, index) =>
                        index === 0 && (
                          <div key={order.id}>
                            <div className="linereview">
                              <p>{order.comment}</p>
                              <div className="row">
                                <div className="col-sm-3 col">
                                  <Wrapper>
                                    <div className="icon-style">
                                      {Array.from({
                                        length: order.rating,
                                      }).map((_, index) => (
                                        <i
                                          className="fa-solid fa-star"
                                          key={index}
                                        />
                                      ))}
                                    </div>
                                  </Wrapper>
                                </div>
                                <div className="col-sm-5 col">
                                  {order.user_id &&
                                    order.user_id.length > 0 && (
                                      <div className="Product-img">
                                        <img
                                          src={
                                            "https://canine.hirectjob.in//storage/app/public/profile/" +
                                            order.user_id[0].image
                                          }
                                          alt={order.user_id[0].f_name}
                                        />
                                        <span>
                                          {order.user_id[0].f_name}{" "}
                                          {order.user_id[0].l_name}
                                        </span>
                                      </div>
                                    )}
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                    )
                  ) : (
                    <p>No Review data</p>
                  )}

                  <div>
                    {showData ? (
                      <>
                        {getreviewlist.map((order) => (
                          <div key={order.id}>
                            <div className="linereview">
                              <p>{order.comment}</p>
                              <div className="row">
                                <div className="col-sm-3 col">
                                  <Wrapper>
                                    <div className="icon-style">
                                      {Array.from({
                                        length: order.rating,
                                      }).map((_, index) => (
                                        <i
                                          className="fa-solid fa-star"
                                          key={index}
                                        />
                                      ))}
                                    </div>
                                  </Wrapper>
                                </div>
                                <div className="col-sm-5 col">
                                  {order.user_id &&
                                    order.user_id.length > 0 && (
                                      <div className="Product-img">
                                        <img
                                          src={
                                            "https://canine.hirectjob.in//storage/app/public/profile/" +
                                            order.user_id[0].image
                                          }
                                          alt={order.user_id[0].f_name}
                                        />
                                        <span>
                                          {order.user_id[0].f_name}{" "}
                                          {order.user_id[0].l_name}
                                        </span>
                                      </div>
                                    )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                        <a href="#" onClick={toggleData}>
                          Read less
                        </a>
                      </>
                    ) : (
                      <a href="#" onClick={toggleData}>
                        Read more
                      </a>
                    )}
                  </div>
                </div>
              </>
            </Container>
          </section>

          <section className="section-padding food">
            <Container>
              <div className="text-left">
                <h1 className="main-head">Related products</h1>
              </div>
              <div className="needplace">
                <Row>
                  {allrelatedproduct &&
                    allrelatedproduct.map((item, index) => (
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
                            class="fa fa-heart-o"
                            onClick={() => addToWishlist(item.id)}
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
                              <h6>{renderProducthead(item.name)}</h6>
                              <p>{item.description}</p>
                            </div>
                            <div className="product-bag">
                              <Row>
                                <Col className="align-self-center">
                                  <h4>₹{item.whole_price}</h4>
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
        </>
      )}

      <Petshopfooter />
      {/* Modal */}

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
                            {productDetails?.variations?.length > 0 && (
                              <Col sm={6}>
                                <div className="tab-container">
                                  <h6>Variations</h6>
                                  <Row>
                                    {productDetails?.variations &&
                                      productDetails?.variations.length > 0 &&
                                      productDetails.variations.map(
                                        (item, index) => (
                                          <Col lg={5} sm={5} xs={3} key={index}>
                                            {item.stock !== 0 ? (
                                              <div
                                                className={`tab-variations ${selectedVariant === item.type
                                                    ? "active"
                                                    : ""
                                                  }`}
                                                onClick={() => {
                                                  setSelectedVariant(item.type);
                                                  setSelectedVariantPrice(
                                                    item.wholeprice
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
                            )}
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
                              {/* <p>{`₹${wholesellervariationprice}`}</p> */}

                              {/* </Col> */}
                              <Col lg={4}>
                                {/* <h5>{`₹${
                                  isNaN(formattedAmount) ? 0 : formattedAmount
                                 }`}</h5> */}
                                {/* <p>{`₹${productDetails.whole_price}`}</p> */}
                                <h5>{productDetails.whole_price}</h5>
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
                            to={`/petshop-add-cart/${id}`}
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
      {/* // ============================== */}
      {/* all modals */}

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
                                      className={`tab-variations ${selectedVariant === item.type
                                          ? "active"
                                          : ""
                                        }`}
                                      onClick={() => {
                                        setSelectedVariant(item.type);
                                        setSelectedVariantPrice(
                                          item.wholeprice
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
                                <p>{`₹${wholesellervariationprice}`}</p>
                              </Col> */}
                              <Col lg={4} sm={4} xs={3}>
                                <h5>{`₹${isNaN(formattedAmount) ? 0 : formattedAmount
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
                          <hr />*/}
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
                    <button
                      data-toggle="modal"
                      data-target="#cod"
                      disabled={!isAddressSelected}
                    >
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
              <form>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Variations</label>
                  <select
                    className="form-control"
                    onChange={(e) => setVariation(e.target.value)}
                    value={variation}
                  >
                    <option>Choose....</option>
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
              </form>
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

export default PetshopproductDetails;
