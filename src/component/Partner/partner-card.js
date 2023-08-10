import React from 'react'
import Newheader from '../../directives/newheader';
import { Col, Row, Container, Form, Button } from 'react-bootstrap'
import CreditCard from '../../assets/images/img/Credit Card.png'
import card from '../../assets/images/img/cards.png'
import card1 from '../../assets/images/img/card1.png'
import card2 from '../../assets/images/img/card2.png'
import Footer from '../../directives/footer'
import { Link } from 'react-router-dom'



function Partnercard() {
    return (
        <>
            <Newheader />
            <section className='section-padding '>
                <Container>
                    <Row className='justify-content-center'>
                        <Col lg={6}>
                            <div className='credit-card'>
                                <img src={CreditCard} />
                            </div>
                            <div className='select-card select-card1'>
                                <div className='selct-card-text'>
                                <input className="form-check-input" type="radio" name="exampleRadios"  />
                                <img src={card} /><p>Cradit / Debit Card</p>
                                </div>
                            </div>
                            <div className='select-card select-card2'>
                                <div className='selct-card-text'>
                                <input className="form-check-input" type="radio" name="exampleRadios"/>
                                <img src={card1} />
                                </div>
                            </div>
                            <div className='select-card select-card3'>
                                <div className='selct-card-text'>
                                <input className="form-check-input" type="radio" name="exampleRadios"  />
                                <img src={card2} />
                                </div>
                            </div>
                            <div className='pay-btn'>
                            <Button><Link to="/pay">Pay</Link></Button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            <Footer />
        </>
    )
}

export default Partnercard