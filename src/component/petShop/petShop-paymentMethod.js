import React from 'react'
import { Col, Row, Container, Form, Button } from 'react-bootstrap'
import CreditCardwholeseller from '../../assets/images/img/Credit CardWholeseller.png'
import card from '../../assets/images/img/cards.png'
import card1 from '../../assets/images/img/card1.png'
import card2 from '../../assets/images/img/card2.png'
import { Link } from 'react-router-dom'
import Wholesallerfooter from '../../directives/wholesaller-Footer';
import PetShopHeader from '../../directives/petShopHeader';



function PetshopPaymentMethod() {
    return (
        <>
            <PetShopHeader />
            <section className='section-padding '>
                <Container>
                    <Row className='justify-content-center'>
                        <Col lg={6}>
                            <div className='credit-card'>
                                <img src={CreditCardwholeseller} />
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
                            <Button><Link to="/petshop-pay">Pay</Link></Button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            <Wholesallerfooter />
        </>
    )
}

export default PetshopPaymentMethod;