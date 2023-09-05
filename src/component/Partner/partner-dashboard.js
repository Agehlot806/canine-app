import React, { useEffect, useState } from "react";
import Newheader from '../../directives/newheader';
import { Col, Container, Row, Button, Form, Nav, Table } from 'react-bootstrap'
import HomeImg from '../../assets/images/img/home.png'
import partner from '../../assets/images/img/partner.png'
import Footer from '../../directives/footer'
import axios from "axios";
import { BASE_URL } from "../../Constant/Index";

function Partnerdashboard() {


    const gradientColors = [
        "linear-gradient(180deg, #f9e1dd 0%, rgba(249, 225, 221, 0) 100%)",
        "linear-gradient(180deg, #d0e1fb 0%, rgba(208, 225, 251, 0) 100%)",
        "linear-gradient(180deg, #fcecff 0%, rgba(252, 236, 255, 0) 100%)",
        // Add more gradient colors as needed
    ];

    const [subscriptions, setSubscriptions] = useState([]);
    const apiUrl = 'https://canine.hirectjob.in/api/v1/auth/get_subscription';

    useEffect(() => {
        fetch(apiUrl)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setSubscriptions(data.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <>
            <Newheader />
            <div className="home-bg">
                <div className="home-section">
                    <Container className="p-0">
                        <Row>
                            <Col lg={6} className="align-self-center">
                            </Col>
                            <Col lg={6}>
                                <img src={HomeImg} />
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>

            <section className='section-padding'>
                <Container>
                    <div className='partner-area'>
                        <h3>Subscribe for Premium Features</h3>
                        <p>Protect up to 10 devices with all <br />features</p>
                    </div>
                    <div className='partner-img'>
                        <img src={partner} />
                    </div>
                </Container>
            </section>
            <section className='section-padding'>
                <Container>
                    <Row>


                        {subscriptions.map((subscription) => (
                            <Col lg={4} key={subscription.id}>
                                <div className='Members-card Members-bg1'>
                                    <h4>{subscription.plantime}</h4>
                                    {/* <p><i className="fa fa-users" /> 987 Members</p> */}
                                    <p>{subscription.pname}</p>
                                    <h5>Advertisement : <span>{subscription.advertisement}</span></h5>

                                    <div className='Members-monthly Members-monthly1'>
                                        <h2>₹ {subscription.price}</h2>
                                        <span>Limit : {subscription.limit}</span>
                                    </div>
                                    <ul>
                                        <li><i class="fa fa-check-circle" /> {subscription.description}</li>
                                    </ul>
                                    <Button>More Plan</Button>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>
            <Footer />
        </>
    )
}

export default Partnerdashboard