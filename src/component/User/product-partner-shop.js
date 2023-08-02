import React, { useEffect, useState } from 'react'
import Header from '../../directives/header'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import shop from '../../assets/images/banner/shop.png'
import { Link } from 'react-router-dom'
import filter from '../../assets/images/icon/filter.png'
import product1 from "../../assets/images/img/product1.png";
import bag from "../../assets/images/icon/bag.png";
import axios from 'axios'
import { BASE_URL } from '../../Constant/Index'
import Footer from '../../directives/footer'
import catpng from "../../assets/images/img/catpng.png";
import bannerPro from "../../assets/images/img/bannerPro.png";


function Productpartnershop() {
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
                    <img src={shop} />
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

                        <section className='section-padding'>
                            <Container>
                                <Row>
                                    <Col lg={6}>
                                        <h1 className="main-head">Shop Name</h1>
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
                            <div className="needplace">
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
                            </div>
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

export default Productpartnershop