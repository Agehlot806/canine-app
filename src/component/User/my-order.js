import React from 'react'
import Newheader from '../../directives/newheader'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../Constant/Index';
import brandPro1 from "../../assets/images/img/brandPro1.png";
import Footer from '../../directives/footer';
import cart from "../../assets/images/icon/cart.png";

function Myorder() {
    const [allorder, setallorder] = useState([]);
    useEffect(() => {
        allOrders();
    }, []);

    const allOrders = async () => {
        axios
            .get(`${BASE_URL}/customer/order/list/232`)
            .then((response) => {
                console.log(response);
                console.log("Order List Successful");
                setallorder(response.data.data);
                // Perform any additional actions after successful deletion
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
                    <h1 className='main-head'>My Orders</h1>
                    <div className='needplace myorder-list'>
                        {/* {allorder && allorder.length > 0 ? (
                            allorder.map((item, index) => (
                                <Row>
                                    <Col lg={2}>
                                        <img
                                    src={
                                        "https://canine.hirectjob.in//storage/app/public/product/" +
                                        item.image
                                    }
                                />
                                    </Col>
                                    <Col lg={6} className="align-self-center">
                                        <h2>{item.name}</h2>
                                        <p>{item.description}</p>
                                    </Col>
                                    <Col lg={2} className="align-self-center">
                                        <h3>{item.price}</h3>
                                    </Col>
                                    <Col lg={2} className="align-self-center">
                                        <div className="myorder-btn">
                                            <Button><Link to="/order-view-details">View</Link></Button>
                                            <Button><Link to="/track-your-order">Track</Link></Button>
                                        </div>
                                    </Col>
                                    <hr />
                                </Row>
                            ))
                        ) : (
                            <div className='text-center'>
                                <img src={cart} />
                            <h4 className="emptyMSG">Content Not Available</h4>
                            </div>
                        )} */}
                        <Row>
                            <Col lg={2}>
                                <img
                                    src={
                                        brandPro1
                                    }
                                />
                            </Col>
                            <Col lg={6} className="align-self-center">
                                <h2>Drools | 3KG</h2>
                                <p>Royal Canin (85g x 12 Pouches)</p>
                            </Col>
                            <Col lg={2} className="align-self-center">
                                <h3>₹200</h3>
                            </Col>
                            <Col lg={2} className="align-self-center">
                                <div className="myorder-btn">
                                    <Button><Link to="/order-view-details">View</Link></Button>
                                    <Button><Link to="/track-your-order">Track</Link></Button>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={2}>
                                <img
                                    src={
                                        brandPro1
                                    }
                                />
                            </Col>
                            <Col lg={6} className="align-self-center">
                                <h2>Drools | 3KG</h2>
                                <p>Royal Canin (85g x 12 Pouches)</p>
                            </Col>
                            <Col lg={2} className="align-self-center">
                                <h3>₹200</h3>
                            </Col>
                            <Col lg={2} className="align-self-center">
                                <div className="myorder-btn">
                                    <Button><Link to="/order-view-details">View</Link></Button>
                                    <Button><Link to="/track-your-order">Track</Link></Button>
                                </div>
                            </Col>
                        </Row>
                            <hr />
                            <Row>
                            <Col lg={2}>
                                <img
                                    src={
                                        brandPro1
                                    }
                                />
                            </Col>
                            <Col lg={6} className="align-self-center">
                                <h2>Sheba</h2>
                                <p>Royal Canin (85g x 12 Pouches)</p>
                            </Col>
                            <Col lg={2} className="align-self-center">
                                <h3>₹800</h3>
                            </Col>
                            <Col lg={2} className="align-self-center">
                                <div className="myorder-btn">
                                    <Button><Link to="/order-view-details">View</Link></Button>
                                    <Button><Link to="/track-your-order">Track</Link></Button>
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

export default Myorder