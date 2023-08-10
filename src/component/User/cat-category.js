import React, { useEffect, useState } from 'react'
import Newheader from '../../directives/newheader';
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import Carousel from "react-multi-carousel";
import product from '../../assets/images/banner/product.png'
import { Link } from 'react-router-dom'
import product1 from '../../assets/images/img/product1.png'
import product2 from '../../assets/images/img/product2.png'
import product3 from '../../assets/images/img/product3.png'
import Footer from '../../directives/footer'
import productdetail from '../../assets/images/banner/productdetail.png'
import bannerone from '../../assets/images/banner/banner.png'
import { BASE_URL } from '../../Constant/Index';
import axios from 'axios';
import bag from '../../assets/images/icon/bag.png'


function Catcategory() {


    return (
        <>
            <Newheader />
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
                        <section className="section-padding food">
                            <Container>
                            <h1 className="main-head">
                            Wet Food
                            </h1>
                                <div className="needplace">
                                    <Row>
                                        <Col lg={4} sm={6} xs={6} className="mb-4">
                                            <div className="food-product">
                                                <i class="fa fa-heart-o" />
                                                <Link to="/product-details">
                                                    <div className='text-center'>
                                                        <img src={product3} />
                                                    </div>
                                                    <div>
                                                        <h6>Product name</h6>
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
                                                            <Col className='align-self-center'><h6>₹400.00</h6></Col>
                                                            <Col><Link to=''><img src={bag} /></Link></Col>
                                                        </Row>
                                                    </div>
                                                </Link>
                                            </div>
                                        </Col>

                                    </Row>
                                </div>
                            </Container>
                        </section>

                        <Container fluid className='p-0'>
                            <div className='all-bg'>
                                <img src={bannerone} />
                            </div>
                        </Container>

                        <section className="section-padding food">
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
                        </section>
                    </Col>
                </Row>
            </Container >



            <Footer />
        </>
    )
}

export default Catcategory