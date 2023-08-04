import React, { useEffect, useState } from "react";
import Header from "../../directives/header";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import Carousel from "react-multi-carousel";
import { Link } from "react-router-dom";
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
import product3 from "../../assets/images/img/product3.png";
import Group1 from "../../assets/images/img/Group1.png";
import Group2 from "../../assets/images/img/Group2.png";
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
    items: 2,
    slidesToSlide: 1, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

function Home(props) {
  const [categories, setcategories] = useState([]);
  const [homebanner, sethomebanner] = useState([]);
  const [allproduct, setallproduct] = useState([]);
  const [thirdbanner, setthirdbanner] = useState([]);
  const [brands, setBrands] = useState([]);
  const [email, setEmail] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  useEffect(() => {
    fetchBrands();
    homeAllBanner();
  }, []);

  const homeAllBanner = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/banners/`);
      sethomebanner(response.data.data);
    }
    catch (error) {
      console.error(error);
    }
  };

  const handleNewsletter = (event) => {
    event.preventDefault();
    const data = {
      email: email,
    };
    axios.post(`${BASE_URL}/newsletter/subscribe`, data)
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

  return (
    <>
      <Toaster />
      <Header />
      <div className="home-bg">
        <div className="home-section">
          <Container className="p-0">
            {/* <Row>
              <Col lg={6} className="align-self-center">
                <div className="home-content">
                  <h1>Taking care <br />
                    for your Smart Dog !</h1>
                  <p>Human–canine bonding is the relationship between dogs and humans.</p>
                  <Button>Explore More <i className="fa fa-angle-right" /></Button>
                </div>
              </Col>
              <Col lg={6}>
                <img src={HomeImg} />
              </Col>
            </Row> */}
            <Carousel
              swipeable={true}
              draggable={true}
              showDots={true}
              responsive={homeslider}
              ssr={true} // means to render carousel on server-side.
              infinite={true}
              autoPlay={props.deviceType !== "mobile" ? true : false}
              autoPlaySpeed={1000}
              keyBoardControl={true}
              customTransition="all 1s"
              transitionDuration={1000}
              containerClass="carousel-container"
              removeArrowOnDeviceType={["tablet", "mobile"]}
              deviceType={props.deviceType}
              // dotListClass="custom-dot-list-style"
              itemClass="carousel-item-padding-40-px"
            >
              {homebanner &&
                homebanner.map((item) => (
                  <div>
                    <Row>
                      <Col lg={6} className="align-self-center">
                        <div className="home-content">
                          <h1>{item.title}</h1>
                          <p>{item.description}</p>
                          <Button>
                            Explore More <i className="fa fa-angle-right" />
                          </Button>
                        </div>
                      </Col>
                      <Col lg={6}>
                        <img src={
                          "https://canine.hirectjob.in/storage/app/public/banner/" +
                          item.image
                        } />
                      </Col>
                    </Row>
                  </div>
                ))}
              {/* <div>
                <Row>
                  <Col lg={6}>
                    <img src={HomeImg} />
                  </Col>
                  <Col lg={6} className="align-self-center">
                    <div className="home-content">
                      <h1>
                        Taking care <br />
                        for your Smart Dog !
                      </h1>
                      <p>
                        Human–canine bonding is the relationship between dogs
                        and humans.
                      </p>
                      <Button>
                        Explore More <i className="fa fa-angle-right" />
                      </Button>
                    </div>
                  </Col>
                </Row>
              </div>
              <div>
                <Row>
                  <Col lg={6} className="align-self-center">
                    <div className="home-content">
                      <h1>
                        Taking care <br />
                        for your Smart Dog !
                      </h1>
                      <p>
                        Human–canine bonding is the relationship between dogs
                        and humans.
                      </p>
                      <Button>
                        Explore More <i className="fa fa-angle-right" />
                      </Button>
                    </div>
                  </Col>
                  <Col lg={6}>
                    <img src={HomeImg} />
                  </Col>
                </Row>
              </div> */}
            </Carousel>
          </Container>
        </div>
      </div>

      <section className="section-padding">
        <Container>
          <Row>
            <Col lg={6}>
              <div className="aboutpage-img">
                <img src={aboutpage} />
              </div>
            </Col>
            <Col lg={6} className="align-self-center">
              <div className="aboutPage-content">
                <h1 className="main-head">Pet care, up close and personal.</h1>
                <p>
                  But this isn’t just about our fresh new look. As you’ll see
                  below, we’ve hired more qualified advisors, expanded our
                  range, built a pet-first navigation, and launched new services
                  like on-demand healthcare and insurance. There’s much more to
                  come, but we hope you think we’re headed in the right
                  direction.
                </p>
                <ul>
                  <li>Adipiscing elit pellentesque</li>
                  <li>Posuere ac ut consequat</li>
                </ul>
                <Button>
                  <Link to="/about-us">
                    Read More <i className="fa fa-angle-right" />
                  </Link>
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="section-padding">
        <Container>
          <Row>
            <h1 className="main-head">Shop Deals For Your Best Buddy</h1>
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
            autoPlaySpeed={2000}
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
                  <Link to="/dog">
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
            <Col lg={6}>
              {/* <h5>Dog Nutrients & Food </h5> */}
              <h1 className="main-head">Latest all Products</h1>
            </Col>
            <Col lg={6}>
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
                allproduct.map((item) => (
                  <Col lg={3} sm={6} xs={6} className="mb-4">
                    <div className="food-product" key={item.id}>
                      <i class="fa fa-heart-o" />
                      <Link to="/product-details">
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
                          <p>{item.description}</p>
                        </div>
                        <div className="product-bag">
                          <Row>
                            <Col>
                              <p>₹999.00</p>
                            </Col>
                            <Col>
                              <h5>20%</h5>
                            </Col>
                          </Row>
                          <Row>
                            <Col className="align-self-center">
                              <h6>₹{item.price}</h6>
                            </Col>
                            <Col>
                              <Link to="">
                                <img src={bag} />
                              </Link>
                            </Col>
                          </Row>
                        </div>
                      </Link>
                    </div>
                  </Col>
                ))}

              {/* <Col lg={4} sm={6} xs={6} className="mb-4">
              <div className="food-product">
                <img src={product2} />
                <h6>Canine Creek 4 KG</h6>
                <p>Adult chicken and egg Egg, Chicken 3 kg Dry Adult Dog Food</p>
                <div className="all-btn">
                  <Button className="blue-btn">Buy Now</Button>
                </div>
              </div>
            </Col>
            <Col lg={4} sm={6} xs={6} className="mb-4">
              <div className="food-product">
                <img src={product3} />
                <h6>Biscork Biscuits</h6>
                <p>Adult chicken and egg Egg, Chicken 3 kg Dry Adult Dog Food</p>
                <div className="all-btn">
                  <Button className="blue-btn">Buy Now</Button>
                </div>
              </div>
            </Col>
            <Col lg={4} sm={6} xs={6} className="mb-4">
              <div className="food-product">
                <img src={product1} />
                <h6>Drools | 3KG</h6>
                <p>Adult chicken and egg Egg, Chicken 3 kg Dry Adult Dog Food</p>
                <div className="all-btn">
                  <Button className="blue-btn">Buy Now</Button>
                </div>
              </div>
            </Col>
            <Col lg={4} sm={6} xs={6} className="mb-4">
              <div className="food-product">
                <img src={product2} />
                <h6>Canine Creek 4 KG</h6>
                <p>Adult chicken and egg Egg, Chicken 3 kg Dry Adult Dog Food</p>
                <div className="all-btn">
                  <Button className="blue-btn">Buy Now</Button>
                </div>
              </div>
            </Col>
            <Col lg={4} sm={6} xs={6} className="mb-3">
              <div className="food-product">
                <img src={product3} />
                <h6>Biscork Biscuits</h6>
                <p>Adult chicken and egg Egg, Chicken 3 kg Dry Adult Dog Food</p>
                <div className="all-btn">
                  <Button className="blue-btn">Buy Now</Button>
                </div>
              </div>
            </Col> */}
            </Row>
          </div>
        </Container>
      </section>

      <section className="section-padding">
        <Container>
          <Row>
            <Col lg={6}>
              <h1 className="main-head">Our Brand</h1>
            </Col>
            <Col lg={6}>
              <div className="foodMore">
                <Link to="/our-brand">See all</Link>
              </div>
            </Col>
          </Row>
          <Row className="mt-4">
            {brands &&
              brands.map((brand) => (
                <Col lg={3} sm={6} xs={6} className="mb-5">
                  <div key={brand.id} className="Brand-card brand-1">
                    <div className="brandLOGO">
                      <img
                        src={
                          "https://canine.hirectjob.in/storage/app/public/category/" +
                          brand.logo
                        }
                      />
                    </div>
                    <div className="brand-main">
                      <img
                        src={
                          "https://canine.hirectjob.in/storage/app/public/category/" +
                          brand.image
                        }
                      />
                    </div>
                    <div className="brand-text">
                      <h5>{brand.title}</h5>
                    </div>
                  </div>
                  {/* <div key={brand.id}>
                    <h2>{brand.name}</h2>
                    Display other brand data 
                  </div> */}
                </Col>
              ))}
            {/* <Col lg={3} sm={6} xs={6} className="mb-5">
              <div className="Brand-card brand-2">
                <div className="brandLOGO">
                  <img src={brand2} />
                </div>
                <div className="brand-main">
                  <img src={brandPro2} />
                </div>
                <div className="brand-text">
                  <h5>Rresrvation</h5>
                </div>
              </div>
            </Col>
            <Col lg={3} sm={6} xs={6} className="mb-5">
              <div className="Brand-card brand-3">
                <div className="brandLOGO">
                  <img src={brand3} />
                </div>
                <div className="brand-main">
                  <img src={brandPro1} />
                </div>
                <div className="brand-text">
                  <h5>Rresrvation</h5>
                </div>
              </div>
            </Col>
            <Col lg={3} sm={6} xs={6} className="mb-5">
              <div className="Brand-card brand-4">
                <div className="brandLOGO">
                  <img src={brand1} />
                </div>
                <div className="brand-main">
                  <img src={brandPro2} />
                </div>
                <div className="brand-text">
                  <h5>Rresrvation</h5>
                </div>
              </div>
            </Col> */}
          </Row>
        </Container>
      </section>

      <section className="section-padding">
        <Container>
          {thirdbanner
            ? thirdbanner.map(
              (item, index) =>
                item.title === "new" && (
                  <div className="banner-bgmain" key={item.id}>
                    <img
                      src={
                        "https://canine.hirectjob.in/storage/app/public/banner/" +
                        item.image
                      }
                    />
                  </div>
                )
            )
            : null}
        </Container>
      </section>
      <section className="section-padding">
        <Container>
          <Row>
            <Col lg={6}>
              <h1 className="main-head">Shop By Brands</h1>
            </Col>
            <Col lg={6}>
              <div className="foodMore">
                <Link to="/shop-by-brand">See all</Link>
              </div>
            </Col>
          </Row>
          <div className="needplace">
            <Row>
              <Col lg={3} sm={6} xs={6} className="mb-5">
                <div className="Brand-card brand-1">
                  <div className="brandLOGO">
                    <img src={brand1} />
                  </div>
                  <div className="brand-main">
                    <img src={brandPro1} />
                  </div>
                  <div className="brand-text">
                    <h5>Rresrvation</h5>
                  </div>
                </div>
              </Col>
              <Col lg={3} sm={6} xs={6} className="mb-5">
                <div className="Brand-card brand-2">
                  <div className="brandLOGO">
                    <img src={brand2} />
                  </div>
                  <div className="brand-main">
                    <img src={brandPro2} />
                  </div>
                  <div className="brand-text">
                    <h5>Rresrvation</h5>
                  </div>
                </div>
              </Col>
              <Col lg={3} sm={6} xs={6} className="mb-5">
                <div className="Brand-card brand-3">
                  <div className="brandLOGO">
                    <img src={brand3} />
                  </div>
                  <div className="brand-main">
                    <img src={brandPro1} />
                  </div>
                  <div className="brand-text">
                    <h5>Rresrvation</h5>
                  </div>
                </div>
              </Col>
              <Col lg={3} sm={6} xs={6} className="mb-5">
                <div className="Brand-card brand-4">
                  <div className="brandLOGO">
                    <img src={brand1} />
                  </div>
                  <div className="brand-main">
                    <img src={brandPro2} />
                  </div>
                  <div className="brand-text">
                    <h5>Rresrvation</h5>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </section>

      <section className="section-padding">
        <Container>
          <Row>
            <Col lg={6}>
              <h1 className="main-head">Product By Partner</h1>
            </Col>
            <Col lg={6}>
              <div className="foodMore">
                <Link to="/product-by-partner">See all</Link>
              </div>
            </Col>
          </Row>
          <div className="needplace">
            <Row>
              <Col lg={3} sm={6} xs={6} className="mb-5">
                <a href="/product-by-partner">
                  <div className="ProductPartner-card">
                    <img src={loicon1} />
                    <h3 className="text-dark">Shop Name</h3>
                  </div>
                </a>
              </Col>
              <Col lg={3} sm={6} xs={6} className="mb-5">
                <a href="/product-by-partner">
                  <div className="ProductPartner-card">
                    <img src={loicon2} />
                    <h3 className="text-dark">Shop Name</h3>
                  </div>
                </a>
              </Col>
              <Col lg={3} sm={6} xs={6} className="mb-5">
                <a href="/product-by-partner">
                  <div className="ProductPartner-card">
                    <img src={loicon1} />
                    <h3 className="text-dark">Shop Name</h3>
                  </div>
                </a>
              </Col>
              <Col lg={3} sm={6} xs={6} className="mb-5">
                <a href="/product-by-partner">
                  <div className="ProductPartner-card">
                    <img src={loicon2} />
                    <h3 className="text-dark">Shop Name</h3>
                  </div>
                </a>
              </Col>
            </Row>
          </div>
        </Container>
      </section>

      <section className="section-padding">
        <Container>
          <div className="banner-video">
            <Row>
              <Col lg={5} className="p-0">
                <div className="video-content">
                  <h1 className="main-head">Samantha & Maya’s Pet Grooming</h1>
                  <p>
                    When it comes to cats, everyone knows taste is what’s most
                    important, right? Imagine every meal oozing with
                    irresistible flavour whilst being super healthy. Yup, the
                    purrrfect combination! Say yes to Drools just like Samantha
                    & Maya!
                  </p>
                  <Button>Shop Now</Button>
                </div>
              </Col>
              <Col lg={7} className="p-0">
                <video loop autoPlay muted>
                  <source src={video2} type="video/mp4" />
                </video>
              </Col>
            </Row>
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
              <Col lg={4}>
                <div className="blog-card">
                  <img src={cat} />
                  <h3>El Rey Coffee Bar & Luncheonette</h3>
                  <p>
                    Different kinds of domestic animals have different
                    characteristics and needs. Aquatic pets can provide a sense
                    of tranquility to their owners and remove stress.
                  </p>
                </div>
              </Col>
              <Col lg={4}>
                <div className="blog-card">
                  <img src={hamster} />
                  <h3>Photography Tips From Wai Su</h3>
                  <p>
                    Different kinds of domestic animals have different
                    characteristics and needs. Aquatic pets can provide a sense
                    of tranquility to their owners and remove stress.
                  </p>
                </div>
              </Col>
              <Col lg={4}>
                <div className="blog-card">
                  <img src={rebit} />
                  <h3>Take Interior Design To A New Level</h3>
                  <p>
                    Different kinds of domestic animals have different
                    characteristics and needs. Aquatic pets can provide a sense
                    of tranquility to their owners and remove stress.
                  </p>
                </div>
              </Col>
            </Row>
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
                      value={email} onChange={(e) => setEmail(e.target.value)}
                    />
                    <Button variant="outline-success" onClick={handleNewsletter}>Subscribe</Button>
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
