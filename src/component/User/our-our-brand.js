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

function Ourourbrand(props) {
    // filter tabs
    const [brandDropdownVisible, setBrandDropdownVisible] = useState(false);
    const [productTypeDropdownVisible, setProductTypeDropdownVisible] = useState(false);
    const [priceDropdownVisible, setPriceDropdownVisible] = useState(false);
    const [lifestageDropdownVisible, setLifestageDropdownVisible] = useState(false);
    const [breedTypeDropdownVisible, setBreedTypeDropdownVisible] = useState(false)
    const [healthDropdownVisible, setHealthDropdownVisible] = useState(false);
    const [specialDietDropdownVisible, setSpecialDietDropdownVisible] = useState(false);
    const [vegNonvegDropdownVisible, setVegNonvegDropdownVisible] = useState(false);
    const [groomingFeatureDropdownVisible, setGroomingFeatureDropdownVisible] = useState(false);
    const [groomingToolsDropdownVisible, setGroomingToolsDropdownVisible] = useState(false);
    const [accessoryTypeDropdownVisible, setAccessoryTypeDropdownVisible] = useState(false);
    const handleParentClick = (dropdownName) => {
        switch (dropdownName) {
            case 'brand':
                setBrandDropdownVisible(!brandDropdownVisible);
                break;
            case 'productType':
                setProductTypeDropdownVisible(!productTypeDropdownVisible);
                break;
            case 'price':
                setPriceDropdownVisible(!priceDropdownVisible);
                break;
            case 'lifestage':
                setLifestageDropdownVisible(!lifestageDropdownVisible);
                break;
            case 'breedType':
                setBreedTypeDropdownVisible(!breedTypeDropdownVisible)
                break;
            case 'health':
                setHealthDropdownVisible(!healthDropdownVisible)
                break;
            case 'specialDiet':
                setSpecialDietDropdownVisible(!specialDietDropdownVisible)
                break;
            case 'veg-Non-veg':
                setVegNonvegDropdownVisible(!vegNonvegDropdownVisible)
                break;
            case 'groomingFeature':
                setGroomingFeatureDropdownVisible(!groomingFeatureDropdownVisible)
                break;
            case 'groomingTools':
                setGroomingToolsDropdownVisible(!groomingToolsDropdownVisible)
                break;
            case 'accessoryType':
                setAccessoryTypeDropdownVisible(!accessoryTypeDropdownVisible)
            default:
                break;


        }
    };
    const handleCheckboxClick = (event) => {
        event.stopPropagation();
    };
    
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
                                <div onClick={() => handleParentClick('brand')} className='main-chk'>
                                    Brand
                                    <div className='i-con'>
                                        <span><i class="fa fa-angle-down" aria-hidden="true"></i></span>
                                    </div>

                                    {brandDropdownVisible && (
                                        <>
                                            <div>
                                                <div className="form-check" onClick={handleCheckboxClick}>
                                                    <input className="form-check-input" type="checkbox" id="defaultCheck1" />
                                                    <label className="form-check-label" htmlFor="defaultCheck1">
                                                        Awesome Pawsome (2)
                                                    </label>
                                                </div>
                                                <div className="form-check" onClick={handleCheckboxClick}>
                                                    <input className="form-check-input" type="checkbox" id="defaultCheck1" />
                                                    <label className="form-check-label" htmlFor="defaultCheck1">
                                                        Basil (14)
                                                    </label>
                                                </div>
                                                <div className="form-check" onClick={handleCheckboxClick}>
                                                    <input className="form-check-input" type="checkbox" id="defaultCheck1" />
                                                    <label className="form-check-label" htmlFor="defaultCheck1">
                                                        Boltz (1)
                                                    </label>
                                                </div>
                                                <div className="form-check" onClick={handleCheckboxClick}>
                                                    <input className="form-check-input" type="checkbox" id="defaultCheck1" />
                                                    <label className="form-check-label" htmlFor="defaultCheck1">
                                                        Canine Craving (10)
                                                    </label>
                                                </div>
                                                <div className="form-check" onClick={handleCheckboxClick}>
                                                    <input className="form-check-input" type="checkbox" id="defaultCheck1" />
                                                    <label className="form-check-label" htmlFor="defaultCheck1">
                                                        Chip Chops (24)
                                                    </label>
                                                </div>
                                            </div>

                                        </>
                                    )}
                                </div>
                                <hr />
                                <div onClick={() => handleParentClick('productType')} className='main-chk'>
                                    Product Type
                                    <div className='i-con'>
                                        <span><i class="fa fa-angle-down" aria-hidden="true"></i></span>
                                    </div>
                                    {productTypeDropdownVisible && (
                                        <>
                                            <div>
                                                <div className="form-check" onClick={handleCheckboxClick}>
                                                    <input className="form-check-input" type="checkbox" id="defaultCheck1" />
                                                    <label className="form-check-label" htmlFor="defaultCheck1">
                                                        Buscuits & Cookies (4)
                                                    </label>
                                                </div>
                                                <div className="form-check" onClick={handleCheckboxClick}>
                                                    <input className="form-check-input" type="checkbox" id="defaultCheck1" />
                                                    <label className="form-check-label" htmlFor="defaultCheck1">
                                                        Buscuits and Cookies (58)
                                                    </label>
                                                </div>
                                                <div className="form-check" onClick={handleCheckboxClick}>
                                                    <input className="form-check-input" type="checkbox" id="defaultCheck1" />
                                                    <label className="form-check-label" htmlFor="defaultCheck1">
                                                        Dental Treats (55)
                                                    </label>
                                                </div>
                                                <div className="form-check" onClick={handleCheckboxClick}>
                                                    <input className="form-check-input" type="checkbox" id="defaultCheck1" />
                                                    <label className="form-check-label" htmlFor="defaultCheck1">
                                                        Freeze-Dried Treats (12)
                                                    </label>
                                                </div>
                                                <div className="form-check" onClick={handleCheckboxClick}>
                                                    <input className="form-check-input" type="checkbox" id="defaultCheck1" />
                                                    <label className="form-check-label" htmlFor="defaultCheck1">
                                                        Jerkies (45)
                                                    </label>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                                <hr />
                                <div onClick={() => handleParentClick('price')} className='main-chk'>
                                    Price
                                    <div className='i-con'>
                                        <span><i class="fa fa-angle-down" aria-hidden="true"></i></span>
                                    </div>
                                    {priceDropdownVisible && (
                                        <>
                                            <div className='form-range' onClick={handleCheckboxClick}>
                                                <span>₹</span>
                                                <input type='number' placeholder='From' />
                                            </div>
                                            <div className='form-range' onClick={handleCheckboxClick}>
                                                <span>₹</span>
                                                <input type='number' placeholder='From' />
                                            </div>
                                        </>
                                    )}
                                </div>
                                <hr />
                                <div onClick={() => handleParentClick('lifestage')} className='main-chk'>
                                    Lifestage
                                    <div className='i-con'>
                                        <span><i class="fa fa-angle-down" aria-hidden="true"></i></span>
                                    </div>
                                    {lifestageDropdownVisible && (
                                        <>
                                            <div>
                                                <div className="form-check" onClick={handleCheckboxClick}>
                                                    <input className="form-check-input" type="checkbox" id="defaultCheck1" />
                                                    <label className="form-check-label" htmlFor="defaultCheck1">
                                                        All (10)
                                                    </label>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                                <hr />
                                <div onClick={() => handleParentClick('breedType')} className='main-chk'>
                                    Breed Type
                                    <div className='i-con'>
                                        <span><i class="fa fa-angle-down" aria-hidden="true"></i></span>
                                    </div>
                                    {breedTypeDropdownVisible && (
                                        <>
                                            <div>
                                                <div className="form-check" onClick={handleCheckboxClick}>
                                                    <input className="form-check-input" type="checkbox" id="defaultCheck1" />
                                                    <label className="form-check-label" htmlFor="defaultCheck1">
                                                        All (180)
                                                    </label>
                                                </div>
                                                <div className="form-check" onClick={handleCheckboxClick}>
                                                    <input className="form-check-input" type="checkbox" id="defaultCheck1" />
                                                    <label className="form-check-label" htmlFor="defaultCheck1">
                                                        Large and Giant (13)
                                                    </label>
                                                </div>
                                                <div className="form-check" onClick={handleCheckboxClick}>
                                                    <input className="form-check-input" type="checkbox" id="defaultCheck1" />
                                                    <label className="form-check-label" htmlFor="defaultCheck1">
                                                        Medium (4)
                                                    </label>
                                                </div>
                                                <div className="form-check" onClick={handleCheckboxClick}>
                                                    <input className="form-check-input" type="checkbox" id="defaultCheck1" />
                                                    <label className="form-check-label" htmlFor="defaultCheck1">
                                                        Medium and Large (5)
                                                    </label>
                                                </div>
                                                <div className="form-check" onClick={handleCheckboxClick}>
                                                    <input className="form-check-input" type="checkbox" id="defaultCheck1" />
                                                    <label className="form-check-label" htmlFor="defaultCheck1">
                                                        Small (9)
                                                    </label>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                                <hr />
                                <div onClick={() => handleParentClick('health')} className='main-chk'>
                                    Health Condition
                                    <div className='i-con'>
                                        <span><i class="fa fa-angle-down" aria-hidden="true"></i></span>
                                    </div>
                                    {healthDropdownVisible && (
                                        <>
                                            <div>
                                                <div className="form-check" onClick={handleCheckboxClick}>
                                                    <input className="form-check-input" type="checkbox" id="defaultCheck1" />
                                                    <label className="form-check-label" htmlFor="defaultCheck1">
                                                        222
                                                    </label>
                                                </div>
                                                <div className="form-check" onClick={handleCheckboxClick}>
                                                    <input className="form-check-input" type="checkbox" id="defaultCheck1" />
                                                    <label className="form-check-label" htmlFor="defaultCheck1">
                                                        223
                                                    </label>
                                                </div>
                                                <div className="form-check" onClick={handleCheckboxClick}>
                                                    <input className="form-check-input" type="checkbox" id="defaultCheck1" />
                                                    <label className="form-check-label" htmlFor="defaultCheck1">
                                                        223
                                                    </label>
                                                </div>
                                                <div className="form-check" onClick={handleCheckboxClick}>
                                                    <input className="form-check-input" type="checkbox" id="defaultCheck1" />
                                                    <label className="form-check-label" htmlFor="defaultCheck1">
                                                        223
                                                    </label>
                                                </div>
                                                <div className="form-check" onClick={handleCheckboxClick}>
                                                    <input className="form-check-input" type="checkbox" id="defaultCheck1" />
                                                    <label className="form-check-label" htmlFor="defaultCheck1">
                                                        223
                                                    </label>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                                <hr />
                                <div onClick={() => handleParentClick('specialDiet')} className='main-chk'>
                                    Special Diet
                                    <div className='i-con'>
                                        <span><i class="fa fa-angle-down" aria-hidden="true"></i></span>
                                    </div>
                                    {specialDietDropdownVisible && (
                                        <>
                                            <div>
                                                <div className="form-check" onClick={handleCheckboxClick}>
                                                    <input className="form-check-input" type="checkbox" id="defaultCheck1" />
                                                    <label className="form-check-label" htmlFor="defaultCheck1">
                                                        Gluten-Free (7)
                                                    </label>
                                                </div>
                                                <div className="form-check" onClick={handleCheckboxClick}>
                                                    <input className="form-check-input" type="checkbox" id="defaultCheck1" />
                                                    <label className="form-check-label" htmlFor="defaultCheck1">
                                                        Gluten-Free (12)
                                                    </label>
                                                </div>
                                                <div className="form-check" onClick={handleCheckboxClick}>
                                                    <input className="form-check-input" type="checkbox" id="defaultCheck1" />
                                                    <label className="form-check-label" htmlFor="defaultCheck1">
                                                        Grain-free and Gluten-free (3)
                                                    </label>
                                                </div>
                                                <div className="form-check" onClick={handleCheckboxClick}>
                                                    <input className="form-check-input" type="checkbox" id="defaultCheck1" />
                                                    <label className="form-check-label" htmlFor="defaultCheck1">
                                                        Hypoallergenic (1)
                                                    </label>
                                                </div>
                                                <div className="form-check" onClick={handleCheckboxClick}>
                                                    <input className="form-check-input" type="checkbox" id="defaultCheck1" />
                                                    <label className="form-check-label" htmlFor="defaultCheck1">
                                                        Vegan (12)
                                                    </label>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                                <hr />
                                <div onClick={() => handleParentClick('veg-Non-veg')} className='main-chk'>
                                    Veg/Non-veg
                                    <div className='i-con'>
                                        <span><i class="fa fa-angle-down" aria-hidden="true"></i></span>
                                    </div>
                                    {vegNonvegDropdownVisible && (
                                        <>
                                            <div>
                                                <div className="form-check" onClick={handleCheckboxClick}>
                                                    <input className="form-check-input" type="checkbox" id="defaultCheck1" />
                                                    <label className="form-check-label" htmlFor="defaultCheck1">
                                                        Non-Veg (219)
                                                    </label>
                                                </div>
                                                <div className="form-check" onClick={handleCheckboxClick}>
                                                    <input className="form-check-input" type="checkbox" id="defaultCheck1" />
                                                    <label className="form-check-label" htmlFor="defaultCheck1">
                                                        Veg (73)
                                                    </label>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                                <hr />
                                <div onClick={() => handleParentClick('groomingFeature')} className='main-chk'>
                                    Grooming Feature
                                    <div className='i-con'>
                                        <span><i class="fa fa-angle-down" aria-hidden="true"></i></span>
                                    </div>
                                    {groomingFeatureDropdownVisible && (
                                        <>
                                            <div>
                                                <div className="form-check" onClick={handleCheckboxClick}>
                                                    <input className="form-check-input" type="checkbox" id="defaultCheck1" />
                                                    <label className="form-check-label" htmlFor="defaultCheck1">
                                                        223
                                                    </label>
                                                </div>
                                                <div className="form-check" onClick={handleCheckboxClick}>
                                                    <input className="form-check-input" type="checkbox" id="defaultCheck1" />
                                                    <label className="form-check-label" htmlFor="defaultCheck1">
                                                        223
                                                    </label>
                                                </div>
                                                <div className="form-check" onClick={handleCheckboxClick}>
                                                    <input className="form-check-input" type="checkbox" id="defaultCheck1" />
                                                    <label className="form-check-label" htmlFor="defaultCheck1">
                                                        223
                                                    </label>
                                                </div>
                                                <div className="form-check" onClick={handleCheckboxClick}>
                                                    <input className="form-check-input" type="checkbox" id="defaultCheck1" />
                                                    <label className="form-check-label" htmlFor="defaultCheck1">
                                                        223
                                                    </label>
                                                </div>
                                                <div className="form-check" onClick={handleCheckboxClick}>
                                                    <input className="form-check-input" type="checkbox" id="defaultCheck1" />
                                                    <label className="form-check-label" htmlFor="defaultCheck1">
                                                        223
                                                    </label>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                                <hr />
                                <div onClick={() => handleParentClick('groomingTools')} className='main-chk'>
                                    Grooming Tools
                                    <div className='i-con'>
                                        <span><i class="fa fa-angle-down" aria-hidden="true"></i></span>
                                    </div>
                                    {groomingToolsDropdownVisible && (
                                        <>
                                            <div>
                                                <div className="form-check" onClick={handleCheckboxClick}>
                                                    <input className="form-check-input" type="checkbox" id="defaultCheck1" />
                                                    <label className="form-check-label" htmlFor="defaultCheck1">
                                                        223
                                                    </label>
                                                </div>
                                                <div className="form-check" onClick={handleCheckboxClick}>
                                                    <input className="form-check-input" type="checkbox" id="defaultCheck1" />
                                                    <label className="form-check-label" htmlFor="defaultCheck1">
                                                        223
                                                    </label>
                                                </div>
                                                <div className="form-check" onClick={handleCheckboxClick}>
                                                    <input className="form-check-input" type="checkbox" id="defaultCheck1" />
                                                    <label className="form-check-label" htmlFor="defaultCheck1">
                                                        223
                                                    </label>
                                                </div>
                                                <div className="form-check" onClick={handleCheckboxClick}>
                                                    <input className="form-check-input" type="checkbox" id="defaultCheck1" />
                                                    <label className="form-check-label" htmlFor="defaultCheck1">
                                                        223
                                                    </label>
                                                </div>
                                                <div className="form-check" onClick={handleCheckboxClick}>
                                                    <input className="form-check-input" type="checkbox" id="defaultCheck1" />
                                                    <label className="form-check-label" htmlFor="defaultCheck1">
                                                        223
                                                    </label>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                                <hr />
                                <div onClick={() => handleParentClick('accessoryType')} className='main-chk'>
                                    Accessory Type
                                    <div className='i-con'>
                                        <span><i class="fa fa-angle-down" aria-hidden="true"></i></span>
                                    </div>
                                    {accessoryTypeDropdownVisible && (
                                        <>
                                            <div>
                                                <div className="form-check" onClick={handleCheckboxClick}>
                                                    <input className="form-check-input" type="checkbox" id="defaultCheck1" />
                                                    <label className="form-check-label" htmlFor="defaultCheck1">
                                                        223
                                                    </label>
                                                </div>
                                                <div className="form-check" onClick={handleCheckboxClick}>
                                                    <input className="form-check-input" type="checkbox" id="defaultCheck1" />
                                                    <label className="form-check-label" htmlFor="defaultCheck1">
                                                        223
                                                    </label>
                                                </div>
                                                <div className="form-check" onClick={handleCheckboxClick}>
                                                    <input className="form-check-input" type="checkbox" id="defaultCheck1" />
                                                    <label className="form-check-label" htmlFor="defaultCheck1">
                                                        223
                                                    </label>
                                                </div>
                                                <div className="form-check" onClick={handleCheckboxClick}>
                                                    <input className="form-check-input" type="checkbox" id="defaultCheck1" />
                                                    <label className="form-check-label" htmlFor="defaultCheck1">
                                                        223
                                                    </label>
                                                </div>
                                                <div className="form-check" onClick={handleCheckboxClick}>
                                                    <input className="form-check-input" type="checkbox" id="defaultCheck1" />
                                                    <label className="form-check-label" htmlFor="defaultCheck1">
                                                        223
                                                    </label>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                                <hr />



                            </div>
                        </section>
                    </Col>
                    <Col lg={9}>


                        <section className="section-padding">

                            <Container>
                                <Row>
                                    <Col lg={6}>
                                        <h1 className="main-head">Our Brand</h1>
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

export default Ourourbrand