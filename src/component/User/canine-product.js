import React from 'react'
import Header from '../../directives/header'
import { Container, Row, Col, Button } from 'react-bootstrap'
import product from '../../assets/images/banner/product.png'
import { Link } from 'react-router-dom'
import product1 from '../../assets/images/img/product1.png'
import product2 from '../../assets/images/img/product2.png'
import product3 from '../../assets/images/img/product3.png'
import Footer from '../../directives/footer'
import productdetail from '../../assets/images/banner/productdetail.png'
import bag from '../../assets/images/icon/bag.png'

function Canineproduct() {
    return (
        <>
            <Header />
            <Container fluid className='p-0'>
                <div className='all-bg'>
                    <img src={product} />
                </div>
            </Container>

            <section className="section-padding food">
                <Container>
                    <Row>
                        <Col lg={6}>
                            <h5>Dog Nutrients & Food </h5>
                            <h1 className="main-head">25 % OFF all Products</h1>
                        </Col>
                        <Col lg={6}>
                            <div className="foodMore">
                                <Link to="">View More <i className="fa fa-angle-right" /></Link>
                            </div>
                        </Col>
                    </Row>
                    <div className="needplace">
                        <Row>
                        <Col lg={3} sm={6} xs={6} className="mb-4">
                            <div className="food-product">
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
                                            <Col className='align-self-center'><h6>₹100.00</h6></Col>
                                            <Col><Link to=''><img src={bag} /></Link></Col>
                                        </Row>
                                    </div>
                                </Link>
                            </div>
                        </Col>
                        <Col lg={3} sm={6} xs={6} className="mb-4">
                            <div className="food-product">
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
                                            <Col className='align-self-center'><h6>₹100.00</h6></Col>
                                            <Col><Link to=''><img src={bag} /></Link></Col>
                                        </Row>
                                    </div>
                                </Link>
                            </div>
                        </Col>
                        <Col lg={3} sm={6} xs={6} className="mb-4">
                            <div className="food-product">
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
                                            <Col className='align-self-center'><h6>₹100.00</h6></Col>
                                            <Col><Link to=''><img src={bag} /></Link></Col>
                                        </Row>
                                    </div>
                                </Link>
                            </div>
                        </Col>
                        <Col lg={3} sm={6} xs={6} className="mb-4">
                            <div className="food-product">
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
                                            <Col className='align-self-center'><h6>₹100.00</h6></Col>
                                            <Col><Link to=''><img src={bag} /></Link></Col>
                                        </Row>
                                    </div>
                                </Link>
                            </div>
                        </Col>
                        <Col lg={3} sm={6} xs={6} className="mb-4">
                            <div className="food-product">
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
                                            <Col className='align-self-center'><h6>₹100.00</h6></Col>
                                            <Col><Link to=''><img src={bag} /></Link></Col>
                                        </Row>
                                    </div>
                                </Link>
                            </div>
                        </Col>
                        <Col lg={3} sm={6} xs={6} className="mb-4">
                            <div className="food-product">
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
                                            <Col className='align-self-center'><h6>₹100.00</h6></Col>
                                            <Col><Link to=''><img src={bag} /></Link></Col>
                                        </Row>
                                    </div>
                                </Link>
                            </div>
                        </Col>
                        <Col lg={3} sm={6} xs={6} className="mb-4">
                            <div className="food-product">
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
                                            <Col className='align-self-center'><h6>₹100.00</h6></Col>
                                            <Col><Link to=''><img src={bag} /></Link></Col>
                                        </Row>
                                    </div>
                                </Link>
                            </div>
                        </Col>
                        <Col lg={3} sm={6} xs={6} className="mb-4">
                            <div className="food-product">
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

            <Container fluid className='p-0'>
                <div className='all-bg'>
                    <img src={productdetail} />
                </div>
            </Container>

            <section className="section-padding food">
                <Container>
                    <Row>
                    <Col lg={3} sm={6} xs={6} className="mb-4">
                            <div className="food-product">
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
                                            <Col className='align-self-center'><h6>₹100.00</h6></Col>
                                            <Col><Link to=''><img src={bag} /></Link></Col>
                                        </Row>
                                    </div>
                                </Link>
                            </div>
                        </Col>
                        <Col lg={3} sm={6} xs={6} className="mb-4">
                            <div className="food-product">
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
                                            <Col className='align-self-center'><h6>₹100.00</h6></Col>
                                            <Col><Link to=''><img src={bag} /></Link></Col>
                                        </Row>
                                    </div>
                                </Link>
                            </div>
                        </Col>
                        <Col lg={3} sm={6} xs={6} className="mb-4">
                            <div className="food-product">
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
                                            <Col className='align-self-center'><h6>₹100.00</h6></Col>
                                            <Col><Link to=''><img src={bag} /></Link></Col>
                                        </Row>
                                    </div>
                                </Link>
                            </div>
                        </Col>
                        <Col lg={3} sm={6} xs={6} className="mb-4">
                            <div className="food-product">
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
                                            <Col className='align-self-center'><h6>₹100.00</h6></Col>
                                            <Col><Link to=''><img src={bag} /></Link></Col>
                                        </Row>
                                    </div>
                                </Link>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            <Footer />
        </>
    )
}

export default Canineproduct