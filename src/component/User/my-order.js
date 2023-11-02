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
import logo from "../../assets/images/logo.png";
import loadinggif from "../../assets/images/video/loading.gif";

function Myorder() {

    const [allorder, setallorder] = useState([]);
    const [allreviewdata, setallreviewdata] = useState([]);

    const [loading, setLoading] = useState(true);
  useEffect(() => {
    Promise.all([allOrders(), allStarData()])
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
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

    const allStarData = async () => {
        axios
            .get(`${BASE_URL}/items/get_reviewitem/7`)
            .then((response) => {
                console.log(response);
                console.log("Review List Successful");
                setallreviewdata(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getDateFromCreatedAt = (createdAt) => {
        const dateObject = new Date(createdAt);
        return dateObject.toLocaleDateString();
    };



    return (
        <>
            <Newheader />
            {loading ? (<div className="text-center text-black mb-4">
          <img src={loadinggif} alt=""/>
          <h5>Please Wait.......</h5>
        </div>) : (
            <>
            <section className='section-padding'>
                <Container>
                    <h1 className='main-head'>My Orders</h1>
                    <div className='needplace'>
                        {allorder && allorder.length > 0 ? (
                            allorder.map((item, index) => (
                                <div className='myorder-list'>
                                    <Row className='justify-content-center'>
                                        <Col lg={2} sm={2}>
                                            <img src={logo} />
                                        </Col>
                                        <Col lg={5} sm={5}>
                                            <h3>Order Id: {item.id}</h3>
                                            <h3>Date: {getDateFromCreatedAt(item.created_at)}</h3>
                                            <h3>Payment Method: {item.payment_method}</h3>
                                            <h3>Order Amount: ₹{item.order_amount}</h3>
                                            <h3>Order Status: {item.order_status}</h3>
                                            {item.order_status === 'delivered' ? (
                                                <div>
                                                    {item.callback.map((callbackItem) => (
                                                        <div key={callbackItem.id}>
                                                            {callbackItem.user_details && callbackItem.user_details.rating > 0 ? (
                                                                <div className='solidFA-icon'>
                                                                    {Array.from({ length: callbackItem.user_details.rating }).map((_, index) => (
                                                                        <i className="fa-solid fa-star" key={index} />
                                                                    ))}
                                                                </div>
                                                            ) : (
                                                                <div>
                                                                    <a><i className="fa-regular fa-star" /></a>
                                                                   <a><i className="fa-regular fa-star" /></a>
                                                                   <a><i className="fa-regular fa-star" /></a>
                                                                   <a><i className="fa-regular fa-star" /></a>
                                                                   <a><i className="fa-regular fa-star" /></a>
                                                                </div>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div>
                                                   <a><i className="fa-regular fa-star" /></a>
                                                   <a><i className="fa-regular fa-star" /></a>
                                                   <a><i className="fa-regular fa-star" /></a>
                                                   <a><i className="fa-regular fa-star" /></a>
                                                   <a><i className="fa-regular fa-star" /></a>
                                                </div>
                                            )}



                                        </Col>

                                        <Col lg={3} sm={3} className="align-self-center">
                                            <div className="myorder-btn">
                                                <Button>
                                                    <Link to={`/order-view-details/${item.id}`}>View</Link>
                                                </Button>
                                                <Button>
                                                    <Link to={`/track-your-order/${item.id}`}>Track</Link>
                                                </Button>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            ))
                        ) : (
                            <p className="emptyMSG">No Order list</p>
                        )}
                    </div>
                </Container>
            </section>
            </>
        )}
            <Footer />
        </>
    )
}

export default Myorder