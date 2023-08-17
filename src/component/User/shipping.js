import React from 'react'
import Newheader from '../../directives/newheader'
import { Col, Container, Row, Button, Table } from 'react-bootstrap'
import productdetail from "../../assets/images/banner/productdetail.png";
import brandPro1 from "../../assets/images/img/brandPro1.png";
import logo from '../../assets/images/logo.png'
import invoice from '../../assets/images/icon/invoice.png'
import icon from '../../assets/images/icon/pro.png'
import orders from '../../assets/images/img/orders.png'
import Footer from '../../directives/footer';

function Shipping() {
    return (
        <>
            <Newheader />
            <Container fluid className="p-0">
                <div className="all-bg">
                    <img src={productdetail} />
                </div>
            </Container>

            <section className="section-padding">
                <div className="add-cart">
                    <Container>
                        <Row>
                            <Col lg={2}>
                                <img
                                    src={brandPro1}
                                />
                            </Col>
                            <Col lg={8} className="align-self-center">
                                <h2>Mars Petcare Inc</h2>
                                <p>with paneer or cottage cheese.</p>
                            </Col>
                            <Col lg={2} className="align-self-center">
                                <h3>₹620.00</h3>
                                <p>Quantity = <span>2</span></p>
                            </Col>
                            <hr />
                        </Row>
                    </Container>
                    <Container>
                        <Row>
                            <Col lg={2}>
                                <img
                                    src={brandPro1}
                                />
                            </Col>
                            <Col lg={8} className="align-self-center">
                                <h2>Mars Petcare Inc</h2>
                                <p>with paneer or cottage cheese.</p>
                            </Col>
                            <Col lg={2} className="align-self-center">
                                <h3>₹620.00</h3>
                                <p>Quantity = <span>2</span></p>
                            </Col>
                            <hr />
                        </Row>
                    </Container>
                    <Container>
                        <Row>
                            <Col lg={2}>
                                <img
                                    src={brandPro1}
                                />
                            </Col>
                            <Col lg={8} className="align-self-center">
                                <h2>Mars Petcare Inc</h2>
                                <p>with paneer or cottage cheese.</p>
                            </Col>
                            <Col lg={2} className="align-self-center">
                                <h3>₹620.00</h3>
                                <p>Quantity = <span>2</span></p>
                            </Col>
                            <hr />
                        </Row>
                    </Container>
                    <Container>
                        <Row>
                            <Col lg={2}>
                                <img
                                    src={brandPro1}
                                />
                            </Col>
                            <Col lg={8} className="align-self-center">
                                <h2>Mars Petcare Inc</h2>
                                <p>with paneer or cottage cheese.</p>
                            </Col>
                            <Col lg={2} className="align-self-center">
                                <h3>₹620.00</h3>
                                <p>Quantity = <span>2</span></p>
                            </Col>
                            <hr />
                        </Row>
                    </Container>
                </div>

            </section>

            <section className='section-padding'>
                <Container>
                    <div className='oder-detail-card'>
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
                </Container>
            </section>
            <section className='section-padding'>
                <Container>
                    <h1 className="main-head text-center mb-3">Order Details</h1>
                    <div className='order-area-detials'>
                    <Row>
                        <Col lg={4}>
                            <div className='order-details'>
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
                        </Col>
                        <Col lg={8} className='align-self-center'>
                            <div className='order-details'>
                                <h4>Address</h4>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</p>
                                <h4>shipping Address</h4>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</p>
                            </div>
                            {/* <div className='order-main-deals'>
                                <img src={orders} />
                            </div> */}
                        </Col>
                    </Row>
                    </div>
                   
                </Container>
            </section >
            <section className='section-padding'>
                <Container>
                <Row>
                        <Col lg={6} className='align-self-center'>
                            <div className='Re-order'>
                                <Button>Re Order</Button>
                            </div>
                        </Col>
                        <Col lg={6}>
                            <div className='order-main-deals'>
                                <img src={orders} />
                            </div>
                        </Col>
                    </Row>
                    </Container>
                    </section>
            <Footer />
        </>
    )
}

export default Shipping