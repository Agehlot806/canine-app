import React, { useEffect, useState } from "react";
import Newheader from "../../directives/newheader";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import Carousel from "react-multi-carousel";
import { Link, useNavigate, useParams } from "react-router-dom";
import HomeImg from "../../assets/images/img/home.png";
import leftImg from "../../assets/images/img/left-img.png";
import food from "../../assets/images/img/food.png";
import video2 from "../../assets/images/video/video1.mp4";
import paw from "../../assets/images/img/paw.png";
import bag from "../../assets/images/icon/bag.png";
import cat from "../../assets/images/img/cat.png";
import rebit from "../../assets/images/img/rebit.png";
import hamster from "../../assets/images/img/hamster.png";
import catpng from "../../assets/images/img/catpng.png";
import bannerPro from "../../assets/images/img/bannerPro.png";
import third1 from "../../assets/images/banner/third1.webp";
import third2 from "../../assets/images/banner/third2.webp";
import third3 from "../../assets/images/banner/third3.webp";
import cus1 from "../../assets/images/img/cus1.png";
import cus2 from "../../assets/images/img/cus2.png";
import cus3 from "../../assets/images/img/cus3.png";
import vector from "../../assets/images/img/Vector.png";
import brand1 from "../../assets/images/img/brand1.png";
import brand2 from "../../assets/images/img/brand2.png";
import brand3 from "../../assets/images/img/brand3.png";
import brandPro1 from "../../assets/images/img/brandPro1.png";
import brandPro2 from "../../assets/images/img/brandPro2.png";
import brandPro3 from "../../assets/images/img/brandPro3.png";
import Footer from "../../directives/footer";
import { BASE_URL } from "../../Constant/Index";
import axios from "axios";
import loicon1 from "../../assets/images/img/loicon1.png";
import loicon2 from "../../assets/images/img/loicon2.png";
import aboutpage from "../../assets/images/img/aboutpage.png";
import toast, { Toaster } from "react-hot-toast";

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
          item_name: productDetails.name,
          // variant: productDetails.variations || "Default", // You may need to update this based on your data
          image: productDetails.image,
          quantity: productDetails.quantity,
          price: productDetails.price,
          user_id: storedUserId,
          item_id: productDetails.id,
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
    console.log("filterData",filterData);

    if (filterData.length > 0) {
      for (let index = 0; index < filterData.length; index++) {
        const element = filterData[index];
        const indexData = allproduct.map((ele) => ele.id).indexOf(element.id);
        console.log("indexData", indexData);
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



  const { id } = useParams();
  // console.log("id: ", id);
  // const navigate = useNavigate();
  // navigate("/login");

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
              {/* <h5>Dog Nutrients & Food </h5> */}
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
                      key={item.id}
                      style={{
                        background:
                          gradientColors[index % gradientColors.length],
                      }}
                    >
                      {/* <i
                        class="fa fa-heart-o"
                        onClick={() => addToWishlist(item.id)}
                      /> */}

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
                            className={`truncate-text ${
                              !expandedDescription[item.id]
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
                                {`₹${
                                  item.price -
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
          <div className=" Newsletter-bg">
            <Row>
              <Col lg={3}>
                <img src={catpng} />
              </Col>
              <Col lg={6}>
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
              </Col>
              <Col lg={3} className="align-self-center">
                <img src={bannerPro} />
              </Col>
            </Row>
          </div>
        </Container>
      </section>

      <Footer />
    </>
  );
}

export default Home;
