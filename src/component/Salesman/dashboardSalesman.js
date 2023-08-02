import React from 'react'
import Header from '../../directives/header'
import HomeImg from '../../assets/images/img/home.png'
import { Col, Container, Row, Button, Form, Nav, Table } from 'react-bootstrap'
import logo from '../../assets/images/logo.png'
import icon from '../../assets/images/icon/pro.png'
import arrow from '../../assets/images/icon/arrow.png'
import pro from '../../assets/images/icon/pro.png'
import filter from '../../assets/images/icon/filter.png'
import orders from '../../assets/images/img/orders.png'
import Footer from '../../directives/footer'
import { Link } from 'react-router-dom'
import invoice from '../../assets/images/icon/invoice.png'

function DashboadSalesman() {

    return (
        <>
            <Header />
            <div className="home-bg">
                <div className="home-section">
                    <Container className="p-0">
                        <Row>
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
                        </Row>
                    </Container>
                </div>
            </div>
            <section className='dash-addProduct-btn'>
                <div className='text-center mt-3'>
                    <Button><Link to="/salesman-add-product" >Add Products</Link></Button>
                </div>
            </section>
            <section className='section-padding'>
                <Container>
                    <div className='dash-tabs'>
                        <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                            <li className="nav-item">
                                <a className="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab"
                                    aria-controls="pills-home" aria-selected="true">
                                    <h3>Total Wholeseller</h3>
                                    <h5>50</h5>
                                    <p>+10.80%</p>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" id="pills-profile-tab" data-toggle="pill" href="#pills-profile"
                                    role="tab" aria-controls="pills-profile" aria-selected="false">
                                    <h3>Transactions</h3>
                                    <h5>$22k</h5>
                                    <p>+10.80%</p>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" id="pills-contact-tab" data-toggle="pill" href="#pills-contact"
                                    role="tab" aria-controls="pills-contact" aria-selected="false">
                                    <h3>Total order</h3>
                                    <h5>20</h5>
                                    <p>+10.80%</p>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" id="Balance-tab" data-toggle="pill" href="#Balance"
                                    role="tab" aria-controls="Balance" aria-selected="false">
                                    <h3>Completed Order</h3>
                                    <h5>10</h5>
                                    <p>+10.80%</p>
                                </a>
                            </li>
                        </ul>
                        <div className="tab-content" id="pills-tabContent">
                            <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                                <div className="needplace">
                                    <div className='dash-head'>
                                        <h1>Total Wholeseller</h1>
                                    </div>


                                    <div className='wholeseller-tabs'>
                                        <Row>
                                            <Col lg={6}>
                                                <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                                                    <li className="nav-item">
                                                        <a className="nav-link active" id="Wholeseller-tab" data-toggle="pill" href="#Wholeseller" role="tab" aria-controls="Wholeseller" aria-selected="true">Wholeseller</a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a className="nav-link" id="Add New Wholeseller-tab" data-toggle="pill" href="#Add New Wholeseller" role="tab" aria-controls="Add New Wholeseller" aria-selected="false">Add New Wholeseller</a>
                                                    </li>
                                                </ul>
                                            </Col>
                                            <Col lg={6}>
                                                <div className='side-filter'>
                                                    <form className="form-inline my-2 my-lg-0">
                                                        <div className="left-inner-addon input-container">
                                                            <i className="fa fa-search" />
                                                            <input placeholder="Search" type="search" className="form-control" aria-label="Search" />
                                                        </div>
                                                        <Link><img src={filter} /></Link>
                                                    </form>

                                                </div>
                                            </Col>
                                        </Row>

                                        <div className="tab-content" id="pills-tabContent">
                                            <div className="tab-pane fade show active" id="Wholeseller" role="tabpanel" aria-labelledby="Wholeseller-tab">
                                                <div className="needplace">
                                                    <Row>
                                                        <Col lg={4} className='mb-4'>
                                                            <div className='Wholeseller-card wholeseller-bg1'>
                                                                <div className='wholeseller-status'>
                                                                    <h6>Completed</h6>
                                                                </div>
                                                                <div className='wholeseller-head-text'>
                                                                    <div >
                                                                        <Row>
                                                                            <Col sm={3}>
                                                                                <div className='wholeseller-logo'>
                                                                                    <img src={logo} />
                                                                                </div>
                                                                            </Col>
                                                                            <Col sm={9}>
                                                                                <div className='wholeseller-detail'>
                                                                                    <h6>Nity Make</h6>
                                                                                    <a><i className="fa fa-star" /></a>
                                                                                    <a><i className="fa fa-star" /></a>
                                                                                    <a><i className="fa fa-star" /></a>
                                                                                    <a><i className="fa fa-star" /></a>
                                                                                    <a><i className="fa fa-star" /></a>
                                                                                    <p>1901 Thornridge Cir. Shiloh, Hawaii 81063</p>
                                                                                </div>
                                                                            </Col>
                                                                        </Row>
                                                                    </div>
                                                                    <div className='Wholeseller-btn'>
                                                                        <Button>Add Product</Button>
                                                                        <Button>Order History</Button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Col>
                                                        <Col lg={4} className='mb-4'>
                                                            <div className='Wholeseller-card wholeseller-bg2'>
                                                                <div className='wholeseller-status'>
                                                                    <h6>Completed</h6>
                                                                </div>
                                                                <div className='wholeseller-head-text'>
                                                                    <div >
                                                                        <Row>
                                                                            <Col sm={3}>
                                                                                <div className='wholeseller-logo'>
                                                                                    <img src={logo} />
                                                                                </div>
                                                                            </Col>
                                                                            <Col sm={9}>
                                                                                <div className='wholeseller-detail'>
                                                                                    <h6>Nity Make</h6>
                                                                                    <a><i className="fa fa-star" /></a>
                                                                                    <a><i className="fa fa-star" /></a>
                                                                                    <a><i className="fa fa-star" /></a>
                                                                                    <a><i className="fa fa-star" /></a>
                                                                                    <a><i className="fa fa-star" /></a>
                                                                                    <p>1901 Thornridge Cir. Shiloh, Hawaii 81063</p>
                                                                                </div>
                                                                            </Col>
                                                                        </Row>
                                                                    </div>
                                                                    <div className='Wholeseller-btn'>
                                                                        <Button>Add Product</Button>
                                                                        <Button>Order History</Button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Col>
                                                        <Col lg={4} className='mb-4'>
                                                            <div className='Wholeseller-card wholeseller-bg3'>
                                                                <div className='wholeseller-status'>
                                                                    <h6>Completed</h6>
                                                                </div>
                                                                <div className='wholeseller-head-text'>
                                                                    <div >
                                                                        <Row>
                                                                            <Col sm={3}>
                                                                                <div className='wholeseller-logo'>
                                                                                    <img src={logo} />
                                                                                </div>
                                                                            </Col>
                                                                            <Col sm={9}>
                                                                                <div className='wholeseller-detail'>
                                                                                    <h6>Nity Make</h6>
                                                                                    <a><i className="fa fa-star" /></a>
                                                                                    <a><i className="fa fa-star" /></a>
                                                                                    <a><i className="fa fa-star" /></a>
                                                                                    <a><i className="fa fa-star" /></a>
                                                                                    <a><i className="fa fa-star" /></a>
                                                                                    <p>1901 Thornridge Cir. Shiloh, Hawaii 81063</p>
                                                                                </div>
                                                                            </Col>
                                                                        </Row>
                                                                    </div>
                                                                    <div className='Wholeseller-btn'>
                                                                        <Button>Add Product</Button>
                                                                        <Button>Order History</Button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Col>
                                                        <Col lg={4} className='mb-4'>
                                                            <div className='Wholeseller-card wholeseller-bg1'>
                                                                <div className='wholeseller-status'>
                                                                    <h6>Completed</h6>
                                                                </div>
                                                                <div className='wholeseller-head-text'>
                                                                    <div >
                                                                        <Row>
                                                                            <Col sm={3}>
                                                                                <div className='wholeseller-logo'>
                                                                                    <img src={logo} />
                                                                                </div>
                                                                            </Col>
                                                                            <Col sm={9}>
                                                                                <div className='wholeseller-detail'>
                                                                                    <h6>Nity Make</h6>
                                                                                    <a><i className="fa fa-star" /></a>
                                                                                    <a><i className="fa fa-star" /></a>
                                                                                    <a><i className="fa fa-star" /></a>
                                                                                    <a><i className="fa fa-star" /></a>
                                                                                    <a><i className="fa fa-star" /></a>
                                                                                    <p>1901 Thornridge Cir. Shiloh, Hawaii 81063</p>
                                                                                </div>
                                                                            </Col>
                                                                        </Row>
                                                                    </div>
                                                                    <div className='Wholeseller-btn'>
                                                                        <Button>Add Product</Button>
                                                                        <Button>Order History</Button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Col>
                                                        <Col lg={4} className='mb-4'>
                                                            <div className='Wholeseller-card wholeseller-bg2'>
                                                                <div className='wholeseller-status'>
                                                                    <h6>Completed</h6>
                                                                </div>
                                                                <div className='wholeseller-head-text'>
                                                                    <div >
                                                                        <Row>
                                                                            <Col sm={3}>
                                                                                <div className='wholeseller-logo'>
                                                                                    <img src={logo} />
                                                                                </div>
                                                                            </Col>
                                                                            <Col sm={9}>
                                                                                <div className='wholeseller-detail'>
                                                                                    <h6>Nity Make</h6>
                                                                                    <a><i className="fa fa-star" /></a>
                                                                                    <a><i className="fa fa-star" /></a>
                                                                                    <a><i className="fa fa-star" /></a>
                                                                                    <a><i className="fa fa-star" /></a>
                                                                                    <a><i className="fa fa-star" /></a>
                                                                                    <p>1901 Thornridge Cir. Shiloh, Hawaii 81063</p>
                                                                                </div>
                                                                            </Col>
                                                                        </Row>
                                                                    </div>
                                                                    <div className='Wholeseller-btn'>
                                                                        <Button>Add Product</Button>
                                                                        <Button>Order History</Button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Col>
                                                        <Col lg={4} className='mb-4'>
                                                            <div className='Wholeseller-card wholeseller-bg3'>
                                                                <div className='wholeseller-status'>
                                                                    <h6>Completed</h6>
                                                                </div>
                                                                <div className='wholeseller-head-text'>
                                                                    <div >
                                                                        <Row>
                                                                            <Col sm={3}>
                                                                                <div className='wholeseller-logo'>
                                                                                    <img src={logo} />
                                                                                </div>
                                                                            </Col>
                                                                            <Col sm={9}>
                                                                                <div className='wholeseller-detail'>
                                                                                    <h6>Nity Make</h6>
                                                                                    <a><i className="fa fa-star" /></a>
                                                                                    <a><i className="fa fa-star" /></a>
                                                                                    <a><i className="fa fa-star" /></a>
                                                                                    <a><i className="fa fa-star" /></a>
                                                                                    <a><i className="fa fa-star" /></a>
                                                                                    <p>1901 Thornridge Cir. Shiloh, Hawaii 81063</p>
                                                                                </div>
                                                                            </Col>
                                                                        </Row>
                                                                    </div>
                                                                    <div className='Wholeseller-btn'>
                                                                        <Button>Add Product</Button>
                                                                        <Button>Order History</Button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Col>
                                                        <Col lg={4} className='mb-4'>
                                                            <div className='Wholeseller-card wholeseller-bg1'>
                                                                <div className='wholeseller-status'>
                                                                    <h6>Completed</h6>
                                                                </div>
                                                                <div className='wholeseller-head-text'>
                                                                    <div >
                                                                        <Row>
                                                                            <Col sm={3}>
                                                                                <div className='wholeseller-logo'>
                                                                                    <img src={logo} />
                                                                                </div>
                                                                            </Col>
                                                                            <Col sm={9}>
                                                                                <div className='wholeseller-detail'>
                                                                                    <h6>Nity Make</h6>
                                                                                    <a><i className="fa fa-star" /></a>
                                                                                    <a><i className="fa fa-star" /></a>
                                                                                    <a><i className="fa fa-star" /></a>
                                                                                    <a><i className="fa fa-star" /></a>
                                                                                    <a><i className="fa fa-star" /></a>
                                                                                    <p>1901 Thornridge Cir. Shiloh, Hawaii 81063</p>
                                                                                </div>
                                                                            </Col>
                                                                        </Row>
                                                                    </div>
                                                                    <div className='Wholeseller-btn'>
                                                                        <Button>Add Product</Button>
                                                                        <Button>Order History</Button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Col>
                                                        <Col lg={4} className='mb-4'>
                                                            <div className='Wholeseller-card wholeseller-bg2'>
                                                                <div className='wholeseller-status'>
                                                                    <h6>Completed</h6>
                                                                </div>
                                                                <div className='wholeseller-head-text'>
                                                                    <div >
                                                                        <Row>
                                                                            <Col sm={3}>
                                                                                <div className='wholeseller-logo'>
                                                                                    <img src={logo} />
                                                                                </div>
                                                                            </Col>
                                                                            <Col sm={9}>
                                                                                <div className='wholeseller-detail'>
                                                                                    <h6>Nity Make</h6>
                                                                                    <a><i className="fa fa-star" /></a>
                                                                                    <a><i className="fa fa-star" /></a>
                                                                                    <a><i className="fa fa-star" /></a>
                                                                                    <a><i className="fa fa-star" /></a>
                                                                                    <a><i className="fa fa-star" /></a>
                                                                                    <p>1901 Thornridge Cir. Shiloh, Hawaii 81063</p>
                                                                                </div>
                                                                            </Col>
                                                                        </Row>
                                                                    </div>
                                                                    <div className='Wholeseller-btn'>
                                                                        <Button>Add Product</Button>
                                                                        <Button>Order History</Button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Col>
                                                        <Col lg={4} className='mb-4'>
                                                            <div className='Wholeseller-card wholeseller-bg3'>
                                                                <div className='wholeseller-status'>
                                                                    <h6>Completed</h6>
                                                                </div>
                                                                <div className='wholeseller-head-text'>
                                                                    <div >
                                                                        <Row>
                                                                            <Col sm={3}>
                                                                                <div className='wholeseller-logo'>
                                                                                    <img src={logo} />
                                                                                </div>
                                                                            </Col>
                                                                            <Col sm={9}>
                                                                                <div className='wholeseller-detail'>
                                                                                    <h6>Nity Make</h6>
                                                                                    <a><i className="fa fa-star" /></a>
                                                                                    <a><i className="fa fa-star" /></a>
                                                                                    <a><i className="fa fa-star" /></a>
                                                                                    <a><i className="fa fa-star" /></a>
                                                                                    <a><i className="fa fa-star" /></a>
                                                                                    <p>1901 Thornridge Cir. Shiloh, Hawaii 81063</p>
                                                                                </div>
                                                                            </Col>
                                                                        </Row>
                                                                    </div>
                                                                    <div className='Wholeseller-btn'>
                                                                        <Button>Add Product</Button>
                                                                        <Button>Order History</Button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Col>
                                                        <Col lg={4} className='mb-4'>
                                                            <div className='Wholeseller-card wholeseller-bg1'>
                                                                <div className='wholeseller-status'>
                                                                    <h6>Completed</h6>
                                                                </div>
                                                                <div className='wholeseller-head-text'>
                                                                    <div >
                                                                        <Row>
                                                                            <Col sm={3}>
                                                                                <div className='wholeseller-logo'>
                                                                                    <img src={logo} />
                                                                                </div>
                                                                            </Col>
                                                                            <Col sm={9}>
                                                                                <div className='wholeseller-detail'>
                                                                                    <h6>Nity Make</h6>
                                                                                    <a><i className="fa fa-star" /></a>
                                                                                    <a><i className="fa fa-star" /></a>
                                                                                    <a><i className="fa fa-star" /></a>
                                                                                    <a><i className="fa fa-star" /></a>
                                                                                    <a><i className="fa fa-star" /></a>
                                                                                    <p>1901 Thornridge Cir. Shiloh, Hawaii 81063</p>
                                                                                </div>
                                                                            </Col>
                                                                        </Row>
                                                                    </div>
                                                                    <div className='Wholeseller-btn'>
                                                                        <Button>Add Product</Button>
                                                                        <Button>Order History</Button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Col>
                                                        <Col lg={4} className='mb-4'>
                                                            <div className='Wholeseller-card wholeseller-bg2'>
                                                                <div className='wholeseller-status'>
                                                                    <h6>Completed</h6>
                                                                </div>
                                                                <div className='wholeseller-head-text'>
                                                                    <div >
                                                                        <Row>
                                                                            <Col sm={3}>
                                                                                <div className='wholeseller-logo'>
                                                                                    <img src={logo} />
                                                                                </div>
                                                                            </Col>
                                                                            <Col sm={9}>
                                                                                <div className='wholeseller-detail'>
                                                                                    <h6>Nity Make</h6>
                                                                                    <a><i className="fa fa-star" /></a>
                                                                                    <a><i className="fa fa-star" /></a>
                                                                                    <a><i className="fa fa-star" /></a>
                                                                                    <a><i className="fa fa-star" /></a>
                                                                                    <a><i className="fa fa-star" /></a>
                                                                                    <p>1901 Thornridge Cir. Shiloh, Hawaii 81063</p>
                                                                                </div>
                                                                            </Col>
                                                                        </Row>
                                                                    </div>
                                                                    <div className='Wholeseller-btn'>
                                                                        <Button>Add Product</Button>
                                                                        <Button>Order History</Button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Col>
                                                        <Col lg={4} className='mb-4'>
                                                            <div className='Wholeseller-card wholeseller-bg3'>
                                                                <div className='wholeseller-status'>
                                                                    <h6>Completed</h6>
                                                                </div>
                                                                <div className='wholeseller-head-text'>
                                                                    <div >
                                                                        <Row>
                                                                            <Col sm={3}>
                                                                                <div className='wholeseller-logo'>
                                                                                    <img src={logo} />
                                                                                </div>
                                                                            </Col>
                                                                            <Col sm={9}>
                                                                                <div className='wholeseller-detail'>
                                                                                    <h6>Nity Make</h6>
                                                                                    <a><i className="fa fa-star" /></a>
                                                                                    <a><i className="fa fa-star" /></a>
                                                                                    <a><i className="fa fa-star" /></a>
                                                                                    <a><i className="fa fa-star" /></a>
                                                                                    <a><i className="fa fa-star" /></a>
                                                                                    <p>1901 Thornridge Cir. Shiloh, Hawaii 81063</p>
                                                                                </div>
                                                                            </Col>
                                                                        </Row>
                                                                    </div>
                                                                    <div className='Wholeseller-btn'>
                                                                        <Button>Add Product</Button>
                                                                        <Button>Order History</Button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </div>
                                            <div className="tab-pane fade" id="Add New Wholeseller" role="tabpanel" aria-labelledby="Add New Wholeseller-tab">
                                                <div className='Add-New-Wholeseller'>
                                                    <div className="needplace">
                                                        <Row>
                                                            <Col lg={7}>
                                                                <div className='form-area'>
                                                                    <Form>
                                                                        <Form.Group className="mb-3" controlId="formGroupEmail">
                                                                            <Form.Control type="text" placeholder="Full Name" />
                                                                        </Form.Group>
                                                                        <Form.Group className="mb-3" controlId="formGroupEmail">
                                                                            <Form.Control type="date" placeholder="Date of Birth" />
                                                                        </Form.Group>
                                                                        <Form.Group className="mb-3" controlId="formGroupEmail">
                                                                            <Form.Control type="email" placeholder="Email ID" />
                                                                        </Form.Group>
                                                                        <Form.Group className="mb-3" controlId="formGroupEmail">
                                                                            <Form.Control type="text" placeholder="Business Name" />
                                                                        </Form.Group>
                                                                        <Form.Group className="mb-3" controlId="formGroupEmail">
                                                                            <Form.Label>Country</Form.Label>
                                                                            <Form.Select defaultValue="Choose...">
                                                                                <option>Choose...</option>
                                                                                <option>...</option>
                                                                            </Form.Select>
                                                                        </Form.Group>
                                                                        <Row className="mb-3">
                                                                            <Form.Group as={Col}>
                                                                                <Form.Label>
                                                                                    State<span style={{ color: "red" }}>*</span>
                                                                                </Form.Label>
                                                                                <Form.Select
                                                                                    aria-label="Default select example"
                                                                                >
                                                                                    <option>Choose...</option>
                                                                                    <option value="State">
                                                                                        State
                                                                                    </option>

                                                                                </Form.Select>
                                                                            </Form.Group>
                                                                            <Form.Group as={Col}>
                                                                                <Form.Label>
                                                                                    City<span style={{ color: "red" }}>*</span>
                                                                                </Form.Label>
                                                                                <Form.Select
                                                                                    aria-label="Default select example"

                                                                                >
                                                                                    <option>Choose...</option>

                                                                                </Form.Select>
                                                                            </Form.Group>
                                                                        </Row>
                                                                        <Form.Group className="mb-3" controlId="formGroupEmail">
                                                                            <Form.Control type="number" placeholder="GST Number" />
                                                                        </Form.Group>
                                                                        <Form.Group className="mb-3" controlId="formGroupEmail">
                                                                            <Form.Control type="number" placeholder="Pincode" />
                                                                        </Form.Group>
                                                                        <Form.Group className="mb-3" controlId="formGroupEmail">
                                                                            <Form.Label>Currency</Form.Label>
                                                                            <Form.Select defaultValue="Choose...">
                                                                                <option>Choose...</option>
                                                                                <option>...</option>
                                                                            </Form.Select>
                                                                        </Form.Group>
                                                                        <Row className="mb-3">
                                                                            <Form.Group as={Col} controlId="formGridState">
                                                                                <Form.Label>Upload 1</Form.Label>
                                                                                <Form.Control type="file" />
                                                                            </Form.Group>
                                                                            <Form.Group as={Col} controlId="formGridCity">
                                                                                <Form.Label>Upload 2</Form.Label>
                                                                                <Form.Control type="file" />
                                                                            </Form.Group>
                                                                        </Row>
                                                                    </Form>
                                                                </div>
                                                            </Col>

                                                        </Row>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>


                            </div>
                            <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                                <div className="needplace">
                                    <div className='dash-head'>
                                        <h1>Transactions</h1>
                                    </div>
                                    <div className="needplace">
                                        <div className='Transactions-card'>
                                            <Row>
                                                <Col lg={2}>
                                                    <img src={pro} />
                                                </Col>
                                                <Col lg={8} className='align-self-center'>
                                                    <h5>John Smith</h5>
                                                    <p>10 May 10:30 PM</p>
                                                </Col>
                                                <Col lg={2} className='align-self-center'>
                                                    <div className='Transactions-icon'>
                                                        <img src={arrow} />
                                                        <h5>$30.00</h5>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                        <div className='Transactions-card'>
                                            <Row>
                                                <Col lg={2}>
                                                    <img src={pro} />
                                                </Col>
                                                <Col lg={8} className='align-self-center'>
                                                    <h5>John Smith</h5>
                                                    <p>10 May 10:30 PM</p>
                                                </Col>
                                                <Col lg={2} className='align-self-center'>
                                                    <div className='Transactions-icon'>
                                                        <img src={arrow} />
                                                        <h5>$30.00</h5>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                        <div className='Transactions-card'>
                                            <Row>
                                                <Col lg={2}>
                                                    <img src={pro} />
                                                </Col>
                                                <Col lg={8} className='align-self-center'>
                                                    <h5>John Smith</h5>
                                                    <p>10 May 10:30 PM</p>
                                                </Col>
                                                <Col lg={2} className='align-self-center'>
                                                    <div className='Transactions-icon'>
                                                        <img src={arrow} />
                                                        <h5>$30.00</h5>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                        <div className='Transactions-card'>
                                            <Row>
                                                <Col lg={2}>
                                                    <img src={pro} />
                                                </Col>
                                                <Col lg={8} className='align-self-center'>
                                                    <h5>John Smith</h5>
                                                    <p>10 May 10:30 PM</p>
                                                </Col>
                                                <Col lg={2} className='align-self-center'>
                                                    <div className='Transactions-icon'>
                                                        <img src={arrow} />
                                                        <h5>$30.00</h5>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                        <div className='Transactions-card'>
                                            <Row>
                                                <Col lg={2}>
                                                    <img src={pro} />
                                                </Col>
                                                <Col lg={8} className='align-self-center'>
                                                    <h5>John Smith</h5>
                                                    <p>10 May 10:30 PM</p>
                                                </Col>
                                                <Col lg={2} className='align-self-center'>
                                                    <div className='Transactions-icon'>
                                                        <img src={arrow} />
                                                        <h5>$30.00</h5>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                        <div className='Transactions-card'>
                                            <Row>
                                                <Col lg={2}>
                                                    <img src={pro} />
                                                </Col>
                                                <Col lg={8} className='align-self-center'>
                                                    <h5>John Smith</h5>
                                                    <p>10 May 10:30 PM</p>
                                                </Col>
                                                <Col lg={2} className='align-self-center'>
                                                    <div className='Transactions-icon'>
                                                        <img src={arrow} />
                                                        <h5>$30.00</h5>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                        <div className='Transactions-card'>
                                            <Row>
                                                <Col lg={2}>
                                                    <img src={pro} />
                                                </Col>
                                                <Col lg={8} className='align-self-center'>
                                                    <h5>John Smith</h5>
                                                    <p>10 May 10:30 PM</p>
                                                </Col>
                                                <Col lg={2} className='align-self-center'>
                                                    <div className='Transactions-icon'>
                                                        <img src={arrow} />
                                                        <h5>$30.00</h5>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                        <div className='Transactions-card'>
                                            <Row>
                                                <Col lg={2}>
                                                    <img src={pro} />
                                                </Col>
                                                <Col lg={8} className='align-self-center'>
                                                    <h5>John Smith</h5>
                                                    <p>10 May 10:30 PM</p>
                                                </Col>
                                                <Col lg={2} className='align-self-center'>
                                                    <div className='Transactions-icon'>
                                                        <img src={arrow} />
                                                        <h5>$30.00</h5>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                        <div className='Transactions-card'>
                                            <Row>
                                                <Col lg={2}>
                                                    <img src={pro} />
                                                </Col>
                                                <Col lg={8} className='align-self-center'>
                                                    <h5>John Smith</h5>
                                                    <p>10 May 10:30 PM</p>
                                                </Col>
                                                <Col lg={2} className='align-self-center'>
                                                    <div className='Transactions-icon'>
                                                        <img src={arrow} />
                                                        <h5>$30.00</h5>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
                                <div className="needplace">
                                    <div className='dash-head'>
                                        <h1>Total Order</h1>
                                    </div>
                                    <div className="needplace">
                                        <div className='oder-detail-card mb-4'>
                                            <Link to="">
                                            <Row>
                                                <Col lg={5}>
                                                    <div className='product-details'>
                                                        <div><img src={logo} /></div>
                                                        <div>
                                                            <h5>Canine Products</h5>
                                                            <p>1901 Thornridge Cir. Shiloh, Hawaii 81063</p>
                                                        </div>
                                                    </div>
                                                </Col>
                                                <Col lg={7}>
                                                    <div className='dowload-invioce'>
                                                        <Button className='invoice-1'><img src={invoice} /> download invoice</Button>
                                                        <Button className='invoice-2'><img src={invoice} /> download summary</Button>
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col lg={5}>
                                                    <div className='order-minicard'>
                                                        <Row>
                                                            <h6>Order ID : 125683</h6>
                                                            <Col>
                                                                <div className='order-ids'>
                                                                    <p>1 X Food bowl</p>
                                                                </div>
                                                            </Col>
                                                            <Col>
                                                                <div className='order-ids'>
                                                                    <p>$138.00</p>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col>
                                                                <div className='order-ids'>
                                                                    <p>1 X Food bowl</p>
                                                                </div>
                                                            </Col>
                                                            <Col>
                                                                <div className='order-ids'>
                                                                    <p>$138.00</p>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        <hr />
                                                        <Row>
                                                            <h6>Order ID : 125683</h6>
                                                            <Col>
                                                                <div className='order-ids'>
                                                                    <p>1 X Food bowl</p>
                                                                </div>
                                                            </Col>
                                                            <Col>
                                                                <div className='order-ids'>
                                                                    <p>$138.00</p>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col>
                                                                <div className='order-ids'>
                                                                    <p>1 X Food bowl</p>
                                                                </div>
                                                            </Col>
                                                            <Col>
                                                                <div className='order-ids'>
                                                                    <p>$138.00</p>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        <hr />
                                                        <Row>
                                                            <h6>Order ID : 125683</h6>
                                                            <Col>
                                                                <div className='order-ids'>
                                                                    <p>1 X Food bowl</p>
                                                                </div>
                                                            </Col>
                                                            <Col>
                                                                <div className='order-ids'>
                                                                    <p>$138.00</p>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col>
                                                                <div className='order-ids'>
                                                                    <p>1 X Food bowl</p>
                                                                </div>
                                                            </Col>
                                                            <Col>
                                                                <div className='order-ids'>
                                                                    <p>$138.00</p>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                </Col>
                                                <Col lg={7} className='align-self-center'>
                                                    <div className='order-table'>
                                                        <Table responsive>
                                                            <tbody>
                                                                <tr>
                                                                    <th>Sub Total</th>
                                                                    <td>$50</td>
                                                                </tr>
                                                                <tr>
                                                                    <th>Moving Cart <br />
                                                                        <p>Additional Services</p></th>
                                                                    <td>$10</td>
                                                                </tr>
                                                                <tr>
                                                                    <th>Discount <br />
                                                                        <p>Promo Code: 554dffd</p></th>
                                                                    <td>$20</td>
                                                                </tr>
                                                                <tr>
                                                                    <th>Total</th>
                                                                    <td>$138.00</td>
                                                                </tr>
                                                            </tbody>
                                                        </Table>
                                                    </div>
                                                </Col>
                                            </Row>
                                            </Link>
                                        </div>
                                        <div className='oder-detail-card mb-4'>
                                            <Row>
                                                <Col lg={5}>
                                                    <div className='product-details'>
                                                        <div><img src={logo} /></div>
                                                        <div>
                                                            <h5>Canine Products</h5>
                                                            <p>1901 Thornridge Cir. Shiloh, Hawaii 81063</p>
                                                        </div>
                                                    </div>
                                                </Col>
                                                <Col lg={7}>
                                                    <div className='dowload-invioce'>
                                                        <Button className='invoice-1'><img src={invoice} /> download invoice</Button>
                                                        <Button className='invoice-2'><img src={invoice} /> download summary</Button>
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col lg={5}>
                                                    <div className='order-minicard'>
                                                        <Row>
                                                            <h6>Order ID : 125683</h6>
                                                            <Col>
                                                                <div className='order-ids'>
                                                                    <p>1 X Food bowl</p>
                                                                </div>
                                                            </Col>
                                                            <Col>
                                                                <div className='order-ids'>
                                                                    <p>$138.00</p>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col>
                                                                <div className='order-ids'>
                                                                    <p>1 X Food bowl</p>
                                                                </div>
                                                            </Col>
                                                            <Col>
                                                                <div className='order-ids'>
                                                                    <p>$138.00</p>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        <hr />
                                                        <Row>
                                                            <h6>Order ID : 125683</h6>
                                                            <Col>
                                                                <div className='order-ids'>
                                                                    <p>1 X Food bowl</p>
                                                                </div>
                                                            </Col>
                                                            <Col>
                                                                <div className='order-ids'>
                                                                    <p>$138.00</p>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col>
                                                                <div className='order-ids'>
                                                                    <p>1 X Food bowl</p>
                                                                </div>
                                                            </Col>
                                                            <Col>
                                                                <div className='order-ids'>
                                                                    <p>$138.00</p>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        <hr />
                                                        <Row>
                                                            <h6>Order ID : 125683</h6>
                                                            <Col>
                                                                <div className='order-ids'>
                                                                    <p>1 X Food bowl</p>
                                                                </div>
                                                            </Col>
                                                            <Col>
                                                                <div className='order-ids'>
                                                                    <p>$138.00</p>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col>
                                                                <div className='order-ids'>
                                                                    <p>1 X Food bowl</p>
                                                                </div>
                                                            </Col>
                                                            <Col>
                                                                <div className='order-ids'>
                                                                    <p>$138.00</p>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                </Col>
                                                <Col lg={7} className='align-self-center'>
                                                    <div className='order-table'>
                                                        <Table responsive>
                                                            <tbody>
                                                                <tr>
                                                                    <th>Sub Total</th>
                                                                    <td>$50</td>
                                                                </tr>
                                                                <tr>
                                                                    <th>Moving Cart <br />
                                                                        <p>Additional Services</p></th>
                                                                    <td>$10</td>
                                                                </tr>
                                                                <tr>
                                                                    <th>Discount <br />
                                                                        <p>Promo Code: 554dffd</p></th>
                                                                    <td>$20</td>
                                                                </tr>
                                                                <tr>
                                                                    <th>Total</th>
                                                                    <td>$138.00</td>
                                                                </tr>
                                                            </tbody>
                                                        </Table>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                        <div className='oder-detail-card mb-4'>
                                            <Row>
                                                <Col lg={5}>
                                                    <div className='product-details'>
                                                        <div><img src={logo} /></div>
                                                        <div>
                                                            <h5>Canine Products</h5>
                                                            <p>1901 Thornridge Cir. Shiloh, Hawaii 81063</p>
                                                        </div>
                                                    </div>
                                                </Col>
                                                <Col lg={7}>
                                                    <div className='dowload-invioce'>
                                                        <Button className='invoice-1'><img src={invoice} /> download invoice</Button>
                                                        <Button className='invoice-2'><img src={invoice} /> download summary</Button>
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col lg={5}>
                                                    <div className='order-minicard'>
                                                        <Row>
                                                            <h6>Order ID : 125683</h6>
                                                            <Col>
                                                                <div className='order-ids'>
                                                                    <p>1 X Food bowl</p>
                                                                </div>
                                                            </Col>
                                                            <Col>
                                                                <div className='order-ids'>
                                                                    <p>$138.00</p>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col>
                                                                <div className='order-ids'>
                                                                    <p>1 X Food bowl</p>
                                                                </div>
                                                            </Col>
                                                            <Col>
                                                                <div className='order-ids'>
                                                                    <p>$138.00</p>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        <hr />
                                                        <Row>
                                                            <h6>Order ID : 125683</h6>
                                                            <Col>
                                                                <div className='order-ids'>
                                                                    <p>1 X Food bowl</p>
                                                                </div>
                                                            </Col>
                                                            <Col>
                                                                <div className='order-ids'>
                                                                    <p>$138.00</p>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col>
                                                                <div className='order-ids'>
                                                                    <p>1 X Food bowl</p>
                                                                </div>
                                                            </Col>
                                                            <Col>
                                                                <div className='order-ids'>
                                                                    <p>$138.00</p>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        <hr />
                                                        <Row>
                                                            <h6>Order ID : 125683</h6>
                                                            <Col>
                                                                <div className='order-ids'>
                                                                    <p>1 X Food bowl</p>
                                                                </div>
                                                            </Col>
                                                            <Col>
                                                                <div className='order-ids'>
                                                                    <p>$138.00</p>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col>
                                                                <div className='order-ids'>
                                                                    <p>1 X Food bowl</p>
                                                                </div>
                                                            </Col>
                                                            <Col>
                                                                <div className='order-ids'>
                                                                    <p>$138.00</p>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                </Col>
                                                <Col lg={7} className='align-self-center'>
                                                    <div className='order-table'>
                                                        <Table responsive>
                                                            <tbody>
                                                                <tr>
                                                                    <th>Sub Total</th>
                                                                    <td>$50</td>
                                                                </tr>
                                                                <tr>
                                                                    <th>Moving Cart <br />
                                                                        <p>Additional Services</p></th>
                                                                    <td>$10</td>
                                                                </tr>
                                                                <tr>
                                                                    <th>Discount <br />
                                                                        <p>Promo Code: 554dffd</p></th>
                                                                    <td>$20</td>
                                                                </tr>
                                                                <tr>
                                                                    <th>Total</th>
                                                                    <td>$138.00</td>
                                                                </tr>
                                                            </tbody>
                                                        </Table>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                    </div>
                                    <div className="needplace">
                                        <Row>
                                            <Col lg={4}>
                                                <div className='order-details'>
                                                    <h5>Order Details</h5>
                                                    <h6>ORDER NUMBER</h6>
                                                    <p>4797290627</p>
                                                    <h6>PAYMENT</h6>
                                                    <p>Paid: Using Upi</p>
                                                    <h6>Date</h6>
                                                    <p>10 Feb 2023 10:20 AM</p>
                                                    <h6>Phone Number</h6>
                                                    <p>10 Feb 2023 10:20 AM</p>
                                                    <h6>Deliver To</h6>
                                                    <p>10 Feb 2023 10:20 AM</p>
                                                </div>
                                                <p>Calll</p>
                                                <div className='order-details-cards'>
                                                    <div>
                                                        <h5>Nity Make</h5>
                                                        <p>+91 000000000</p>
                                                    </div>
                                                    <div>
                                                        <img src={icon} />
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col lg={8}>
                                                <div className='order-main-deals'>
                                                    <img src={orders} />
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="Balance" role="tabpanel" aria-labelledby="pills-Balance-tab">
                            </div>

                        </div>
                    </div>
                </Container>
            </section >
            <Footer />
        </>
    )
}

export default DashboadSalesman