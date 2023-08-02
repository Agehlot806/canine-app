import React, { useEffect, useState } from 'react'
import Header from '../../directives/header'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import ourbrand from '../../assets/images/banner/ourbrand.png'
import { Link } from 'react-router-dom'
import filter from '../../assets/images/icon/filter.png'
import product1 from "../../assets/images/img/product1.png";
import bag from "../../assets/images/icon/bag.png";
import axios from 'axios'
import { BASE_URL } from '../../Constant/Index'
import Footer from '../../directives/footer'
import catpng from "../../assets/images/img/catpng.png";
import bannerPro from "../../assets/images/img/bannerPro.png";
import Carousel from "react-multi-carousel";
import brandPro2 from "../../assets/images/img/brandPro2.png";
import product3 from "../../assets/images/img/product3.png";


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

function Shopourbrand(props) {
    const [thirdbanner, setthirdbanner] = useState([]);

    useEffect(() => {
        thirdBanner();
    }, []);


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
            <Header />
            <Container fluid className='p-0'>
                <div className='all-bg'>
                    <img src={ourbrand} />
                </div>
            </Container>
            <Container>
                <Row>
                    <Col lg={3}>
                        <section className='section-padding'>
                            <div className='filter-product'>
                                <h3>Filters</h3>
                                <hr />
                                <Form.Select aria-label="Default select example">
                                    <option>Brand</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </Form.Select>
                                <hr />
                                <Form.Select aria-label="Default select example">
                                    <option>Product Type</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </Form.Select>
                                <hr />
                                <Form.Select aria-label="Default select example">
                                    <option>Price </option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </Form.Select>
                                <hr />

                            </div>
                        </section>
                    </Col>
                    <Col lg={9}>
                       

                        <section className="section-padding">

                        <Container>
                                <Row>
                                    <Col lg={6}>
                                        <h1 className="main-head">Shop Our Brand</h1>
                                    </Col>
                                    <Col lg={6}>
                                        <div className='side-filter'>
                                            <form className="form-inline my-2 my-lg-0">
                                                <div className="left-inner-addon input-container">
                                                    <i className="fa fa-search" />
                                                    <input placeholder="Search" type="search" className="form-control" aria-label="Search" />
                                                </div>

                                            </form>

                                        </div>
                                    </Col>
                                </Row>
                            </Container>
                            {/* <Container>
                    <Row>
                        <h1 className="main-head">Shop Deals For Your Best Buddy</h1>
                    </Row>
                </Container> */}
                <div className="needplace">
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
                                    <div className="Shop-Deals-inner">
                                        <img
                                            src={brandPro2}
                                        />
                                        <h1>Wet Dog Food</h1>
                                    </div>
                                    <div className="Shop-Deals-inner">
                                        <img
                                            src={product3}
                                        />
                                        <h1>Dry Dog Food</h1>
                                    </div>
                                    <div className="Shop-Deals-inner">
                                        <img
                                            src={brandPro2}
                                        />
                                        <h1>Training & Behaviour</h1>
                                    </div>
                                    <div className="Shop-Deals-inner">
                                        <img
                                            src={product3}
                                        />
                                        <h1>Dog Toys</h1>
                                    </div>
                                    <div className="Shop-Deals-inner">
                                        <img
                                            src={brandPro2}
                                        />
                                        <h1>Dog Treats</h1>
                                    </div>
                                    <div className="Shop-Deals-inner">
                                        <img
                                            src={brandPro2}
                                        />
                                        <h1>Carriers & Travel</h1>
                                    </div>
                                    <div className="Shop-Deals-inner">
                                        <img
                                            src={brandPro2}
                                        />
                                        <h1>Dog Grooming</h1>
                                    </div>
                                </Carousel>
                            </Container>
                            </div>
                        </section>

                        <section className='section-padding'>
                            <Container>
                                <Row>
                                    <Col lg={4} sm={6} xs={6} className="mb-4">
                                        <div className="food-product">
                                            <i class="fa fa-heart-o" />
                                            <Link to="/product-details">
                                                <div className="text-center">
                                                    <img
                                                        src={product1}
                                                    />
                                                </div>
                                                <div>
                                                    <h6>Canine Products</h6>
                                                    <p>Lorem Ipsum is simply dummy</p>
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
                                                            <h6>₹620.00</h6>
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
                                    <Col lg={4} sm={6} xs={6} className="mb-4">
                                        <div className="food-product">
                                            <i class="fa fa-heart-o" />
                                            <Link to="/product-details">
                                                <div className="text-center">
                                                    <img
                                                        src={product1}
                                                    />
                                                </div>
                                                <div>
                                                    <h6>Canine Products</h6>
                                                    <p>Lorem Ipsum is simply dummy</p>
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
                                                            <h6>₹620.00</h6>
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
                                    <Col lg={4} sm={6} xs={6} className="mb-4">
                                        <div className="food-product">
                                            <i class="fa fa-heart-o" />
                                            <Link to="/product-details">
                                                <div className="text-center">
                                                    <img
                                                        src={product1}
                                                    />
                                                </div>
                                                <div>
                                                    <h6>Canine Products</h6>
                                                    <p>Lorem Ipsum is simply dummy</p>
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
                                                            <h6>₹620.00</h6>
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
                                    <Col lg={4} sm={6} xs={6} className="mb-4">
                                        <div className="food-product">
                                            <i class="fa fa-heart-o" />
                                            <Link to="/product-details">
                                                <div className="text-center">
                                                    <img
                                                        src={product1}
                                                    />
                                                </div>
                                                <div>
                                                    <h6>Canine Products</h6>
                                                    <p>Lorem Ipsum is simply dummy</p>
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
                                                            <h6>₹620.00</h6>
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
                                    <Col lg={4} sm={6} xs={6} className="mb-4">
                                        <div className="food-product">
                                            <i class="fa fa-heart-o" />
                                            <Link to="/product-details">
                                                <div className="text-center">
                                                    <img
                                                        src={product1}
                                                    />
                                                </div>
                                                <div>
                                                    <h6>Canine Products</h6>
                                                    <p>Lorem Ipsum is simply dummy</p>
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
                                                            <h6>₹620.00</h6>
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
                                    <Col lg={4} sm={6} xs={6} className="mb-4">
                                        <div className="food-product">
                                            <i class="fa fa-heart-o" />
                                            <Link to="/product-details">
                                                <div className="text-center">
                                                    <img
                                                        src={product1}
                                                    />
                                                </div>
                                                <div>
                                                    <h6>Canine Products</h6>
                                                    <p>Lorem Ipsum is simply dummy</p>
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
                                                            <h6>₹620.00</h6>
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
                                    <Col lg={4} sm={6} xs={6} className="mb-4">
                                        <div className="food-product">
                                            <i class="fa fa-heart-o" />
                                            <Link to="/product-details">
                                                <div className="text-center">
                                                    <img
                                                        src={product1}
                                                    />
                                                </div>
                                                <div>
                                                    <h6>Canine Products</h6>
                                                    <p>Lorem Ipsum is simply dummy</p>
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
                                                            <h6>₹620.00</h6>
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
                                    <Col lg={4} sm={6} xs={6} className="mb-4">
                                        <div className="food-product">
                                            <i class="fa fa-heart-o" />
                                            <Link to="/product-details">
                                                <div className="text-center">
                                                    <img
                                                        src={product1}
                                                    />
                                                </div>
                                                <div>
                                                    <h6>Canine Products</h6>
                                                    <p>Lorem Ipsum is simply dummy</p>
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
                                                            <h6>₹620.00</h6>
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
                                    <Col lg={4} sm={6} xs={6} className="mb-4">
                                        <div className="food-product">
                                            <i class="fa fa-heart-o" />
                                            <Link to="/product-details">
                                                <div className="text-center">
                                                    <img
                                                        src={product1}
                                                    />
                                                </div>
                                                <div>
                                                    <h6>Canine Products</h6>
                                                    <p>Lorem Ipsum is simply dummy</p>
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
                                                            <h6>₹620.00</h6>
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
                                    <Col lg={4} sm={6} xs={6} className="mb-4">
                                        <div className="food-product">
                                            <i class="fa fa-heart-o" />
                                            <Link to="/product-details">
                                                <div className="text-center">
                                                    <img
                                                        src={product1}
                                                    />
                                                </div>
                                                <div>
                                                    <h6>Canine Products</h6>
                                                    <p>Lorem Ipsum is simply dummy</p>
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
                                                            <h6>₹620.00</h6>
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
                                    <Col lg={4} sm={6} xs={6} className="mb-4">
                                        <div className="food-product">
                                            <i class="fa fa-heart-o" />
                                            <Link to="/product-details">
                                                <div className="text-center">
                                                    <img
                                                        src={product1}
                                                    />
                                                </div>
                                                <div>
                                                    <h6>Canine Products</h6>
                                                    <p>Lorem Ipsum is simply dummy</p>
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
                                                            <h6>₹620.00</h6>
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
                                    <Col lg={4} sm={6} xs={6} className="mb-4">
                                        <div className="food-product">
                                            <i class="fa fa-heart-o" />
                                            <Link to="/product-details">
                                                <div className="text-center">
                                                    <img
                                                        src={product1}
                                                    />
                                                </div>
                                                <div>
                                                    <h6>Canine Products</h6>
                                                    <p>Lorem Ipsum is simply dummy</p>
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
                                                            <h6>₹620.00</h6>
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

                    </Col>
                </Row>
            </Container>



            <Footer />
        </>
    )
}

export default Shopourbrand