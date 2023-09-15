import React, { useEffect, useState } from "react";
import Newheader from "../../directives/newheader";
import { Container, Row, Col, Button, Form, Table } from "react-bootstrap";
import Carousel from "react-multi-carousel";
import { Link, useNavigate, useParams } from "react-router-dom";
import bag from "../../assets/images/icon/bag.png";
import cus1 from "../../assets/images/img/cus1.png";
import cus2 from "../../assets/images/img/cus2.png";
import cus3 from "../../assets/images/img/cus3.png";
import vector from "../../assets/images/img/Vector.png";
import Footer from "../../directives/footer";
import { BASE_URL } from "../../Constant/Index";
import axios from "axios";
import app1 from "../../assets/images/img/app1.png";
import app2 from "../../assets/images/img/app2.png";
import toast, { Toaster } from "react-hot-toast";
import { styled } from "styled-components";
import { AiOutlineStar } from "react-icons/ai";

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
    items: 4,
    slidesToSlide: 1, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 540, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

function Home(props) {
  const [expandedDescription, setExpandedDescription] = useState({});
  const navigate = useNavigate();
  const [categories, setcategories] = useState([]);
  const [homebanner, sethomebanner] = useState([]);

  const [allproduct, setallproduct] = useState([]);
  console.log("allproduct in home: ", allproduct);
  const [thirdbanner, setthirdbanner] = useState([]);
  const [allVendorShop, setAllVendorShop] = useState([]);
  // console.log("allVendorShop: ", allVendorShop);
  const [brands, setBrands] = useState([]);
  const [blog, setblog] = useState([]);
  const [email, setEmail] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [wishlistData, setWishlistData] = useState([]);
  useEffect(() => {
    fetchBrands();
    homeAllBanner();
  }, []);
  // const discontedMrp = allproduct.map(el => el.price * el.discount)
  // ((price * discount) / 100)
  console.log("homebannerhomebanner", homebanner);
  const homeAllBanner = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/banners/`);
      sethomebanner(response.data.data);
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
  // useEffect(() => {

  //   fetchWishlistData();
  // }, []);

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

  const thirdBanner = () => {
    axios
      .get(`${BASE_URL}/banners`)
      .then((response) => {
        console.log(response.data.data);
        setthirdbanner(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  // all vender
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

  // storedUserId
  const customer_id = localStorage.getItem("userInfo");
  let storedUserId = JSON.parse(customer_id);
  console.log("storedUserId: ", storedUserId);
  console.log("customer_id: ", customer_id);
  // ----------------------------------------

  const gradientColors = [
    "linear-gradient(180deg, #FFF0BA 0%, rgba(251.81, 233.11, 165.78, 0) 100%)",
    "linear-gradient(180deg, #C7EBFF 0%, rgba(199, 235, 255, 0) 100%)",
    "linear-gradient(180deg, #FECBF0 0%, rgba(254, 203, 240, 0) 100%)",
    "linear-gradient(180deg, #C8FFBA 0%, rgba(200, 255, 186, 0) 100%)",
    // Add more gradient colors as needed
  ];

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
    const modal = document.querySelector('.modal');
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
      document.body.classList.remove('modal-open');
      const modalBackdrop = document.querySelector('.modal-backdrop');
      if (modalBackdrop) {
        modalBackdrop.remove();
      }
    }
  };
  const fetchWishlistData = async () => {
    try {
      await axios
        .get(`${BASE_URL}/customer/wish-list/${storedUserId}`)
        .then((response) => {
          console.log("response in whisList", response);
          setWishlistData(response.data.data);
          setisFavCheck(true);
          localStorage.setItem(`wishlist_${productDetails.id}`, 'true');
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



  const { id } = useParams();
  const [buttonVisibility, setButtonVisibility] = useState({});

  // Function to handle mouse enter and mouse leave for a card
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
  const [selectedVariantPrice, setSelectedVariantPrice] = useState([]);
  console.log("productDetails---->", productDetails);
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
      setSelectedVariantPrice(defaultVariant.price);
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
  uservariationprice = uservariationprice * (quantity > 1 ? quantity : 1);

  const Amount = Math.floor(
    uservariationprice - (uservariationprice * productDetails.discount) / 100
  ).toFixed(2);

  const formattedAmount = Number(Amount).toString();

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
        "https://canine.hirectjob.in/storage/app/public/product/" +
        productDetails.image
      );
    }
  }, [productDetails]);

  const handleThumbnailClick = (index) => {
    setMainImage(
      "https://canine.hirectjob.in/storage/app/public/product/" +
      productDetails.images[index]
    );
  };

  const handleMainImageClick = () => {
    setLightboxIsOpen(true);
    setLightboxImageIndex(productDetails.images.indexOf(mainImage));
  };
  const handeldataId = (id) => {
    productData(id);
  }

  return (
    <>
      <Toaster />
      <Newheader />
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
                                Explore More{" "}
                                <i className="fa fa-angle-right" />
                              </Button>
                            </div>
                          </Col>
                        </Row>
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
                                Explore More{" "}
                                <i className="fa fa-angle-right" />
                              </Button>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    )
                )
                : null}
            </div>
          </Carousel>
        </Container>
      </div>

      <section className="section-padding">
        <Container>
          <Row>
            <h1 className="main-head ">Shop Deals For Your Best Buddy</h1>
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
                  <Link className="dog-paw-cursor" to={`/pet-category/${item.name}/${item.id}`}>
                    <img
                      src={
                        "https://canine.hirectjob.in/storage/app/public/category/" +
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
            <Col lg={6} sm={6} xs={6}>
              <h1 className="main-head">Latest all Products</h1>
            </Col>
            <Col lg={6} sm={6} xs={6}>
              <div className="foodMore">
                <Link to="/product">
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
                          item.isFav ? "fa-solid fa-heart" : "fa-regular fa-heart"
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
                              "https://canine.hirectjob.in//storage/app/public/product/" +
                              item.image
                            }
                          />
                        </div>
                        <div>
                          <h6>{item.name}</h6>
                          {/* <p>{item.description}</p> */}
                          <p
                            className={`truncate-text ${!expandedDescription[item.id]
                              ? "read-more-link"
                              : ""
                              }`}
                          >
                            {item.description}
                            {item.description.length > 100 &&
                              !expandedDescription[item.id] && (
                                <span
                                  className="read-more-link"
                                  onClick={() =>
                                    setExpandedDescription({
                                      ...expandedDescription,
                                      [item.id]: true,
                                    })
                                  }
                                >
                                  Read More
                                </span>
                              )}
                          </p>
                        </div>
                        <div className="product-bag">
                          <Row>
                            <Col lg={6} sm={6} xs={6}>
                              <p>₹{item.price}</p>
                            </Col>
                            <Col lg={6} sm={6} xs={6}>
                              <h5>Save {parseFloat(item.discount)}%</h5>
                            </Col>
                          </Row>
                          <Row>
                            <Col
                              lg={6}
                              sm={6}
                              xs={6}
                              className="align-self-center"
                            >
                              <h6>
                                {/* {`₹${(item.price * item.discount) / 100}`} */}
                                {`₹${item.price -
                                  (item.price * item.discount) / 100
                                  }`}
                              </h6>
                            </Col>
                            <Col lg={6} sm={6} xs={6}>
                              <Link
                                to={`/add-cart/${id}`}
                                onClick={handleAddToCart}
                              >
                                <img src={bag} />
                              </Link>
                            </Col>
                          </Row>
                        </div>
                      </Link>
                      {buttonVisibility[item.id] && (
                        <div className="button-container">
                          <button data-toggle="modal" data-target=".bd-example-modal-lg" onClick={(e) => handeldataId(item.id)}>Quick View</button>
                          <button><Link to={`/add-cart/${item.id}`} onClick={handleAddToCart}>
                           Buy Now
                          </Link></button>
                        </div>
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
            <Col lg={6} sm={6} xs={6}>
              <h1 className="main-head">Our Brand</h1>
            </Col>
            <Col lg={6} sm={6} xs={6}>
              <div className="foodMore">
                <Link to="/our-brand">See all</Link>
              </div>
            </Col>
          </Row>
          <Row className="mt-4">
            {brands
              ? brands.map(
                (brand) =>
                  brand.canine == "1" && (
                    <Col lg={3} sm={6} xs={6} className="mb-5">
                      <div key={brand.id} className="Brand-card brand-1">
                        <Link to={`/our-our-brand/${brand.id}`}>
                          <div className="brandLOGO">
                            <img
                              src={
                                "https://canine.hirectjob.in/storage/app/public/brand_logo/" +
                                brand.logo
                              }
                            />
                          </div>
                          <div className="brand-main">
                            <img
                              src={
                                "https://canine.hirectjob.in/storage/app/public/brand/" +
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
                          "https://canine.hirectjob.in/storage/app/" +
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
                              "https://canine.hirectjob.in/storage/app/" +
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
                              "https://canine.hirectjob.in/storage/app/" +
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
            <Col lg={6} sm={6} xs={6}>
              <h1 className="main-head">Shop By Brands</h1>
            </Col>
            <Col lg={6} sm={6} xs={6}>
              <div className="foodMore">
                <Link to="/shop-by-brand">See all</Link>
              </div>
            </Col>
          </Row>
          <div className="needplace">
            <Row>
              {brands
                ? brands.map(
                  (brand) =>
                    brand.canine == "0" && (
                      <Col lg={3} sm={6} xs={6} className="mb-5">
                        <div key={brand.id} className="Brand-card brand-1">
                          <Link to={`/shop-by-brand-list/${brand.id}`}>
                            <div className="brandLOGO">
                              <img
                                src={
                                  "https://canine.hirectjob.in/storage/app/public/brand_logo/" +
                                  brand.logo
                                }
                              />
                            </div>
                            <div className="brand-main">
                              <img
                                src={
                                  "https://canine.hirectjob.in/storage/app/public/brand/" +
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
          <Row>
            <Col lg={6} sm={6} xs={6}>
              <h1 className="main-head">Product By Partner</h1>
            </Col>
            <Col lg={6} sm={6} xs={6}>
              <div className="foodMore">
                <Link to="/product-by-partner">See all</Link>
              </div>
            </Col>
          </Row>
          <div className="needplace">
            <Row>
              {allVendorShop && allVendorShop.length > 0 ? (
                allVendorShop.map((item) => (
                  <Col lg={3} sm={6} xs={6} className="mb-5" key={item.id}>
                    {/* <Link to={`/product-partner-Oneshop/${item.id}`}> */}
                    <a
                      onClick={() => {
                        navigate("/product-partner-Oneshop", {
                          state: {
                            item: item,
                          },
                        });
                      }}
                    >
                      <div className="ProductPartner-card">
                        {/* <img src={item.logo} /> */}
                        <img
                          src={
                            "https://canine.hirectjob.in/storage/app/public/store/" +
                            item.logo
                          }
                        />
                        <h3 className="text-dark">{item.name}</h3>
                      </div>
                    </a>
                  </Col>
                ))
              ) : (
                <p className="emptyMSG">No Product By Partner Data.</p>
              )}
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
                              "https://canine.hirectjob.in/storage/app/" +
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
            <h1 className="main-head">Blog</h1>
          </div>
          <div className="needplace">
            <Row>
              {blog && blog.length > 0 ? (
                blog.map((item, index) => (
                  <Col lg={4} sm={6} className="mb-4">
                    <div className="blog-card">
                      <img
                        src={
                          "https://canine.hirectjob.in/storage/app/public/blog/" +
                          item.image
                        }
                      />
                      <h3>{item.title}</h3>
                      <p>{renderBlogDescription(item.description)}</p>
                      <Link to={`/blog-details/${item.id}`}>Read More</Link>
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
              <Link to="/blog">All Blogs</Link>
            </Button>
          </div>
        </Container>
      </section>

      <section className="section-padding">
        <Container>
          <Row>
            <Col lg={6}>
              <h1 className="main-head">Happy Customer</h1>
            </Col>
          </Row>
          <Row>
            <Col lg={4} sm={6} xs={6}>
              <div className="Brand-cus">
                <img src={cus1} />
                <div className="brand-bg">
                  <h5>Anna & Tobby</h5>
                  <p>Amazing Products & Delivery on time.</p>
                  <div>
                    <Link>
                      <img src={vector} />
                    </Link>
                    <Link>
                      <img src={vector} />
                    </Link>
                    <Link>
                      <img src={vector} />
                    </Link>
                    <Link>
                      <img src={vector} />
                    </Link>
                    <Link>
                      <img src={vector} />
                    </Link>
                    <Link>4.2/5</Link>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={4} sm={6} xs={6}>
              <div className="Brand-cus">
                <img src={cus2} />
                <div className="brand-bg">
                  <h5>Christine & Tom</h5>
                  <p>Love the overall Shpping experience!</p>
                  <div>
                    <Link>
                      <img src={vector} />
                    </Link>
                    <Link>
                      <img src={vector} />
                    </Link>
                    <Link>
                      <img src={vector} />
                    </Link>
                    <Link>
                      <img src={vector} />
                    </Link>
                    <Link>
                      <img src={vector} />
                    </Link>
                    <Link>4.2/5</Link>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={4} sm={6} xs={6}>
              <div className="Brand-cus">
                <img src={cus3} />
                <div className="brand-bg">
                  <h5>Sindy & Kitch</h5>
                  <p>Kitch is love food from the pup-hub</p>
                  <div>
                    <Link>
                      <img src={vector} />
                    </Link>
                    <Link>
                      <img src={vector} />
                    </Link>
                    <Link>
                      <img src={vector} />
                    </Link>
                    <Link>
                      <img src={vector} />
                    </Link>
                    <Link>
                      <img src={vector} />
                    </Link>
                    <Link>4.2/5</Link>
                  </div>
                </div>
              </div>
            </Col>
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
                            "https://canine.hirectjob.in/storage/app/" +
                            item.image
                          }
                        />
                      </div>
                      <Row className="justify-content-center">
                        <Col lg={7}>
                          <div className="home-content">
                            <div className="Newsletter">
                              <h1 className="main-head">
                                Get Or Promo Code by Subscribing To our Newsletter
                              </h1>
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

      <Footer />



      {/* Product details Modal */}
      <div className="modal fade bd-example-modal-lg" tabIndex={-1} role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-body">
              <i class="quickarea fa fa-times" data-dismiss="modal" />
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
                              onClick={handleMainImageClick}
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
                                      onClick={() => handleThumbnailClick(index)}
                                    >
                                      <img
                                        src={
                                          "https://canine.hirectjob.in/storage/app/public/product/" +
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
                              "https://canine.hirectjob.in/storage/app/public/product/" +
                              productDetails.images[lightboxImageIndex]
                            }
                            nextSrc={
                              "https://canine.hirectjob.in/storage/app/public/product/" +
                              productDetails.images[
                              (lightboxImageIndex + 1) % productDetails.images.length
                              ]
                            }
                            prevSrc={
                              "https://canine.hirectjob.in/storage/app/public/product/" +
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
                                (lightboxImageIndex + 1) % productDetails.images.length
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
                            <h4>{productDetails.name}</h4>
                          </Col>
                          <Col lg={3} sm={3} xs={3}>
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
                            </p>
                          </Col>
                        </Row>
                        <p>
                          By <span>{productDetails.store_name}</span>
                        </p>

                        <Wrapper>
                          <div className="icon-style">
                            {ratingStar}
                            <p>({productDetails.rating_count} customer reviews)</p>
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
                                        productDetails.variations.map((item, index) => (
                                          <Col lg={4} key={index}>
                                            <div
                                              className={`tab-variations ${selectedVariant === item.type
                                                ? "active"
                                                : ""
                                                }`}
                                              onClick={() => {
                                                setSelectedVariant(item.type);
                                                setSelectedVariantPrice(item.price);
                                              }}
                                            >
                                              {item.type}
                                            </div>
                                          </Col>
                                        ))}
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
                            <Row>
                              <Col lg={3} sm={3} xs={3}>
                                <p>{`₹${uservariationprice}`}</p>
                              </Col>
                              <Col lg={4} sm={4} xs={3}>
                                <h5>{`₹${formattedAmount}`}</h5>
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
                              <tr>
                                <th>Health Condition</th>
                                <td>{productDetails?.helthCondition_id}</td>
                              </tr>
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
                  {productDetails.stock && productDetails.stock.length !== 0 ? (
                    <div className="productBTNaddcard">
                      <Button>
                        <Link to={`/add-cart/${productDetails.id}`} onClick={handleAddToCart}>
                          <i className="fa fa-shopping-bag" /> Add to cart
                        </Link>
                        <p>{addToCartStatus}</p>
                      </Button>
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
export default Home;
