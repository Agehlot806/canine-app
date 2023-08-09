import React, { useEffect, useState } from 'react'
import Header from '../../directives/header'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import Carousel from "react-multi-carousel";
import product from '../../assets/images/banner/product.png'
import { Link, useParams } from 'react-router-dom'
import product1 from '../../assets/images/img/product1.png'
import product2 from '../../assets/images/img/product2.png'
import product3 from '../../assets/images/img/product3.png'
import Footer from '../../directives/footer'
import productdetail from '../../assets/images/banner/productdetail.png'
import bannerone from '../../assets/images/banner/banner.png'
import { BASE_URL } from '../../Constant/Index';
import axios from 'axios';
import bag from '../../assets/images/icon/bag.png'
import { Toaster, toast } from 'react-hot-toast';


function Petcategory() {
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

    const { id } = useParams();
    console.log("idid", id);
    
    const [petitemproduct, setpetitemproduct] = useState([]);
    const [subcategories, setsubcategories] = useState([]);

    useEffect(() => {
        // allPetitemproduct();
        Allsubcategories();
    }, []);
    // const allPetitemproduct = async () => {
    // axios
    //     .get(`${BASE_URL}/items/product/7/${subid}`)
    //     .then((response) => {
    //         console.log(response);
    //         console.log("Delete Successful");
    //         setpetitemproduct(response.data.data)
    //     })
    //     .catch((error) => {
    //         console.log(error);
    //     });
    // };

    const Allsubcategories = async () => {
        axios
            .get(`${BASE_URL}/categories/subcategories`)
            .then((response) => {
                console.log(response);
                console.log("Delete Successful");
                setsubcategories(response.data.data)
            })
            .catch((error) => {
                console.log(error);
            });
    };

    // storedUserId
  const customer_id = localStorage.getItem("userInfo");
  let storedUserId = JSON.parse(customer_id);
  console.log("storedUserId: ", storedUserId);
  console.log("customer_id: ", customer_id);
  // ----------------------------------------

    const addToWishlist = async (item_id) => {
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
                    toast.success("Added successfully");

                }
            })
            .catch((error) => {
                toast.error("Already in your wishlist");
            });
    };


    const [subid, setsubid] = useState("")
    const subcatid = (id) => {
        console.log("testid", id);
        setsubid(id)
        axios
            .get(`${BASE_URL}/items/product/${id}/${subid}`)
            .then((response) => {
                console.log(response);
                setpetitemproduct(response.data.data)
            })
            .catch((error) => {
                console.log(error);
            });

    }

    return (
        <>
            <Toaster />
            <Header />
            <Container fluid className='p-0'>
                <div className='all-bg'>
                    <img src={product} />
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
                        <section className="section-padding food">
                            <Container>
                                <h1 className="main-head">
                                    Dogs
                                </h1>
                                <div className="needplace">
                                    <div className='dog-categorys-area'>
                                        <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                                            {subcategories && subcategories.length > 0 ? (
                                                subcategories.map((item, index) => (
                                                    <li className="nav-item">
                                                        <a className="nav-link" id="pills-home-tab" data-toggle="pill"
                                                            onClick={(id) => subcatid(item.id)} href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true">
                                                            <img src={item.image} />
                                                            <h6>{item.name}</h6>
                                                        </a>
                                                    </li>
                                                ))
                                            ) : (
                                                <p className="emptyMSG">No Sub Categories.</p>
                                            )}
                                        </ul>
                                        <div className="tab-content" id="pills-tabContent">
                                            <div className="tab-pane fade show" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                                                <Row>
                                                {petitemproduct && petitemproduct.length > 0 ? (
                                                petitemproduct.map((item, index) => (
                                                        <Col lg={4} sm={6} xs={6} className="mb-4">
                                                            <div className="food-product" key={item.id}>
                                                                <i class="fa fa-heart-o" onClick={(id) => addToWishlist(item.id)} />
                                                                <Link to="/product-details">
                                                                    <div className='text-center'>
                                                                        <img src={"https://canine.hirectjob.in//storage/app/public/product/" + item.image} />
                                                                    </div>
                                                                    <div>
                                                                        <h6>{item.name}</h6>
                                                                        <p>{item.description}</p>
                                                                    </div>
                                                                    <div className="product-bag">
                                                                        <Row>
                                                                            <Col>
                                                                                <p>₹{item.price}</p>
                                                                            </Col>
                                                                            <Col>
                                                                                <h5>{item.discount}%</h5>
                                                                            </Col>
                                                                        </Row>
                                                                        <Row>
                                                                            <Col className='align-self-center'><h6>{`₹${item.price - (item.price * item.discount / 100)}`}</h6></Col>
                                                                            <Col><Link to=''><img src={bag} /></Link></Col>
                                                                        </Row>
                                                                    </div>
                                                                </Link>
                                                            </div>
                                                        </Col>
                                                     ))
                                                     ) : (
                                                         <p className="emptyMSG">No Sub Categories Product.</p>
                                                     )}
                                                </Row>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </Container>
                        </section>

                        {/* <Container fluid className='p-0'>
                            <div className='all-bg'>
                                <img src={bannerone} />
                            </div>
                        </Container> */}

                        {/* <section className="section-padding food">
                            <Container>
                                <Row>
                                    <Col lg={6} sm={6}>
                                        <h3>Related products</h3>
                                    </Col>
                                    <Col lg={6} sm={6}>
                                        <div className='see-allbtn'>
                                            <Link to="">See All</Link>
                                        </div>
                                    </Col>
                                </Row>
                                <div className="needplace">
                                    <Row>
                                        <Col lg={4} sm={6} xs={6} className="mb-4">
                                            <div className="food-product">
                                                <i class="fa fa-heart-o" />
                                                <Link to="/product-details">
                                                    <div className='text-center'>
                                                        <img src={product1} />
                                                    </div>
                                                    <div>
                                                        <h6>Farmina</h6>
                                                        <p>asdsdsdadwe sdseded sded</p>
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
                                                            <Col className='align-self-center'><h6>₹100.00</h6></Col>
                                                            <Col><Link to=''><img src={bag} /></Link></Col>
                                                        </Row>
                                                    </div>
                                                </Link>
                                            </div>
                                        </Col>
                                        <Col lg={4} sm={6} xs={6} className="mb-4">
                                            <div className="food-product">
                                                <i class="fa fa-heart-o" />
                                                <Link to="/product-details">
                                                    <div className='text-center'>
                                                        <img src={product1} />
                                                    </div>
                                                    <div>
                                                        <h6>Farmina</h6>
                                                        <p>asdsdsdadwe sdseded sded</p>
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
                                                            <Col className='align-self-center'><h6>₹100.00</h6></Col>
                                                            <Col><Link to=''><img src={bag} /></Link></Col>
                                                        </Row>
                                                    </div>
                                                </Link>
                                            </div>
                                        </Col>
                                        <Col lg={4} sm={6} xs={6} className="mb-4">
                                            <div className="food-product">
                                                <i class="fa fa-heart-o" />
                                                <Link to="/product-details">
                                                    <div className='text-center'>
                                                        <img src={product1} />
                                                    </div>
                                                    <div>
                                                        <h6>Farmina</h6>
                                                        <p>asdsdsdadwe sdseded sded</p>
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
                                                            <Col className='align-self-center'><h6>₹100.00</h6></Col>
                                                            <Col><Link to=''><img src={bag} /></Link></Col>
                                                        </Row>
                                                    </div>
                                                </Link>
                                            </div>
                                        </Col>
                                        <Col lg={4} sm={6} xs={6} className="mb-4">
                                            <div className="food-product">
                                                <i class="fa fa-heart-o" />
                                                <Link to="/product-details">
                                                    <div className='text-center'>
                                                        <img src={product1} />
                                                    </div>
                                                    <div>
                                                        <h6>Farmina</h6>
                                                        <p>asdsdsdadwe sdseded sded</p>
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
                                                            <Col className='align-self-center'><h6>₹100.00</h6></Col>
                                                            <Col><Link to=''><img src={bag} /></Link></Col>
                                                        </Row>
                                                    </div>
                                                </Link>
                                            </div>
                                        </Col>
                                        <Col lg={4} sm={6} xs={6} className="mb-4">
                                            <div className="food-product">
                                                <i class="fa fa-heart-o" />
                                                <Link to="/product-details">
                                                    <div className='text-center'>
                                                        <img src={product1} />
                                                    </div>
                                                    <div>
                                                        <h6>Farmina</h6>
                                                        <p>asdsdsdadwe sdseded sded</p>
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
                                                            <Col className='align-self-center'><h6>₹100.00</h6></Col>
                                                            <Col><Link to=''><img src={bag} /></Link></Col>
                                                        </Row>
                                                    </div>
                                                </Link>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </Container>
                        </section> */}
                    </Col>
                </Row>
            </Container >



            <Footer />
        </>
    )
}

export default Petcategory