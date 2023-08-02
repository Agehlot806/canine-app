import React from 'react'
import Header from '../../directives/header'
import { Col, Container, Row } from 'react-bootstrap'
import banner from '../../assets/images/banner/banner.png'
import cat from '../../assets/images/banner/cat.png'
import dog1 from '../../assets/images/img/dog1.svg'
import cat1 from '../../assets/images/img/cat1.png'
import Footer from '../../directives/footer'

function Servicepet() {
    return (
        <>
            <Header />
            <Container fluid className='p-0'>
                <div className='all-bg'>
                    <img src={banner} />
                </div>
            </Container>
            <section className='section-padding'>
                <Container>
                    <div className='all-bg'>
                        <img src={cat} />
                    </div>
                </Container>
            </section>

            <section className='section-padding'>
                <Container>
                    <Row className='justify-content-center'>
                        <Col lg={8}>
                            <div className='service-pet-card'>
                                <Row>
                                    <Col sm={6}>
                                        <div className='pet-img-ser'>
                                            <img src={dog1} />
                                            <h4>Jumba</h4>
                                            <p>Female</p>
                                        </div>
                                    </Col>
                                    <Col sm={6}>
                                        <div className="pet-status"><h6>2 Year 3 Month</h6></div>
                                        <div className='pet-text-ser'>
                                            <div>
                                                <h6>09/04/2021</h6>
                                                <h6>Jarman safed</h6>
                                            </div>
                                            <div className='pet-icon-ser'>
                                                <a><i class="fa fa-pencil" /></a>
                                                <a><i class="fa fa-trash-o" /></a>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                            <div className='service-pet-card'>
                                <Row>
                                    <Col sm={6}>
                                        <div className='pet-img-ser'>
                                            <img src={cat1} />
                                            <h4>Jumba</h4>
                                            <p>Female</p>
                                        </div>
                                    </Col>
                                    <Col sm={6}>
                                        <div className="pet-status"><h6>2 Year 3 Month</h6></div>
                                        <div className='pet-text-ser'>
                                            <div>
                                                <h6>09/04/2021</h6>
                                                <h6>Jarman safed</h6>
                                            </div>
                                            <div className='pet-icon-ser'>
                                                <a><i class="fa fa-pencil" /></a>
                                                <a><i class="fa fa-trash-o" /></a>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            <Footer />
        </>
    )
}

export default Servicepet