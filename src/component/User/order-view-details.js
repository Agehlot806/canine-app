import React from 'react'
import { Button, Col, Container, Row, Table } from 'react-bootstrap'
import logo from '../../assets/images/logo.png'
import invoice from '../../assets/images/icon/invoice.png'
import Newheader from '../../directives/newheader'
import Footer from '../../directives/footer'
import { Link, useParams } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { BASE_URL } from '../../Constant/Index'

function Orderviewdetails() {
    const [allorder, setallorder] = useState([]);
    const [orderDetails, setorderDetails] = useState([]);

    const { id } = useParams();
    console.log("order id ", id);

    useEffect(() => {
        orderViewdetails();
        allOrders();
    }, []);

    // storedUserId
    const customer_id = localStorage.getItem("userInfo");
    let storedUserId = JSON.parse(customer_id);
    // =----------------------------
    const allOrders = async () => {
        axios
            .get(`${BASE_URL}/customer/order/list?id=${storedUserId}`)
            .then((response) => {
                console.log(response);
                console.log("Order List Successful");
                setallorder(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const orderViewdetails = async () => {
        axios
            .get(`${BASE_URL}/customer/order/detail/${id}`)
            .then((response) => {
                console.log("=======>???????????????????????????????? ", response);
                console.log("order Details Successful");
                setorderDetails(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

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
                                    {orderDetails && orderDetails.length > 0 ? (
                                        orderDetails.map((order) => {
                                          

                                            return (
                                                <div key={order.id}>
                                                    <Row>
                                                        <h6>Order ID: {order.order_id}</h6>
                                                        <Col sm={9}>
                                                            <div className='order-ids'>
                                                                <p>Product name: <span>{order.variant}</span></p>
                                                                <p>Price: <span>₹{order.price}</span></p>
                                                                <p>quantity: <span>{order.quantity}</span></p>
                                                            </div>
                                                        </Col>

                                                        <Col sm={3}>
                                                            <div className='order-ids'>
                                                                <Button>Buy it again</Button>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                    <hr />
                                                </div>
                                            );
                                        })
                                    ) : (
                                        <p>No orders available</p>
                                    )}
                                </div>
                            </Col>
                            <Col lg={7} className='align-self-center'>
                                <div className='order-table'>
                                    <Table responsive>
                                        <tbody>
                                            <tr>
                                                <th>Sub Total</th>
                                                <td>₹{orderDetails.reduce((total, order) => total + parseFloat(order.price), 0)}</td>
                                            </tr>
                                            <tr>
                                                <th>Moving Cart <br />
                                                    <p>Additional Services</p></th>
                                                <td>$10</td>
                                            </tr>
                                            <tr>
                                                <th>Discount <br />
                                                    <p>Promo Code: 554dffd</p>
                                                    <p>delivery_charge</p></th>

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