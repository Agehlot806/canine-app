import React from 'react'
import Newheader from '../../directives/newheader';
import { Col, Container, Row, Button, Form, Nav, Table } from 'react-bootstrap'
import HomeImg from '../../assets/images/img/home.png'
import partner from '../../assets/images/img/partner.png'
import Footer from '../../directives/footer'

function Partnerdashboard() {
    return (
        <>
            <Newheader />
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
                    <Row>
                        <Col lg={4}>
                            <div className='Members-card Members-bg1'>
                                <h4>Annual</h4>
                                <p><i className="fa fa-users" /> 987 Members</p>
                                <div className='Members-monthly Members-monthly1'>
                                    <h2>$ 500.00 /</h2>
                                    <span>Pr Monthly</span>
                                </div>
                                <ul>
                                    <li><i class="fa fa-check-circle"/> Lorem ipsum dolor sit amet</li>
                                    <li><i class="fa fa-check-circle"/> Lorem ipsum dolor</li>
                                    <li><i class="fa fa-check-circle"/> Lorem ipsum dolor sit amet</li>
                                </ul>
                                <Button>More Plan</Button>
                            </div>
                        </Col>
                        <Col lg={4}>
                            <div className='Members-card Members-bg2'>
                                <h4>Annual</h4>
                                <p><i className="fa fa-users" /> 740 Members</p>
                                <div className='Members-monthly Members-monthly2'>
                                    <h2>$ 500.00 /</h2>
                                    <span>Pr Monthly</span>
                                </div>
                                <ul>
                                    <li><i class="fa fa-check-circle"/> Lorem ipsum dolor sit amet</li>
                                    <li><i class="fa fa-check-circle"/> Lorem ipsum dolor</li>
                                    <li><i class="fa fa-check-circle"/> Lorem ipsum dolor sit amet</li>
                                </ul>
                                <Button>More Plan</Button>
                            </div>
                        </Col>
                        <Col lg={4}>
                            <div className='Members-card Members-bg3'>
                                <h4>Annual</h4>
                                <p><i className="fa fa-users" /> 1000 Members</p>
                                <div className='Members-monthly Members-monthly3'>
                                    <h2>$ 500.00 /</h2>
                                    <span>Pr Monthly</span>
                                </div>
                                <ul>
                                    <li><i class="fa fa-check-circle"/> Lorem ipsum dolor sit amet</li>
                                    <li><i class="fa fa-check-circle"/> Lorem ipsum dolor</li>
                                    <li><i class="fa fa-check-circle"/> Lorem ipsum dolor sit amet</li>
                                </ul>
                                <Button>More Plan</Button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            <Footer />
        </>
    )
}

export default Partnerdashboard