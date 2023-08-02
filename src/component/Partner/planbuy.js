import React from 'react'
import Header from '../../directives/header'
import { Col, Container, Row, Button, Form, Nav, Table } from 'react-bootstrap'
import HomeImg from '../../assets/images/img/home.png'
import partner from '../../assets/images/img/partner.png'
import Footer from '../../directives/footer'
import { Link } from 'react-router-dom'

function Planbuy() {
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
                    <div className='plan-buy'>
                        <p>My Spy discount now. Link a device to enjoy a 50% OFF for new users, first month only 2430.00
                        </p>
                        <div className='plan-buy-content'>
                            <div className='plan-rupy'>
                                <h2>$49.00</h2>
                                <span>/ first month</span>
                            </div>
                            <p>3850.00/month</p>
                            <Button>By Now</Button><br /><br /> <br/>
                            <Link>Expiration Date:</Link>
                            <Link className='placDate'>07/15/2022 15:07</Link>
                        </div>
                    </div>
                </Container>
            </section>
            <Footer />
        </>
    )
}

export default Planbuy