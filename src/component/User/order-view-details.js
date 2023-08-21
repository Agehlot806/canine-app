import React from 'react'
import { Button, Col, Container, Row, Table } from 'react-bootstrap'
import logo from '../../assets/images/logo.png'
import invoice from '../../assets/images/icon/invoice.png'
import Newheader from '../../directives/newheader'
import Footer from '../../directives/footer'
import { Link } from 'react-router-dom'

function Orderviewdetails() {
    return (
        <>
            <Newheader />
            <section className='section-padding'>
                <Container>
                    <h1 className='main-head'>Orders View</h1>
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
                                    <Link to="https://veejayjewels.com/storage/app/public/pdf/2023-06-29-649d7c76c81d3.pdf">
                                        <Button className='invoice-1'><img src={invoice} /> download invoice</Button>
                                    </Link>
                                    <Link to="https://veejayjewels.com/storage/app/public/pdf/2023-06-29-649d7c76c81d3.pdf">
                                        <Button className='invoice-2'><img src={invoice} /> download summary</Button>
                                    </Link>
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
                                        <Col>
                                            <div className='order-ids'>
                                                <Button>Buy it again</Button>
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
                                        <Col>
                                            <div className='order-ids'>
                                                <Button>Buy it again</Button>
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
                                        <Col>
                                            <div className='order-ids'>
                                                <Button>Buy it again</Button>
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
                                        <Col>
                                            <div className='order-ids'>
                                                <Button>Buy it again</Button>
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
            <Footer />
        </>
    )
}

export default Orderviewdetails