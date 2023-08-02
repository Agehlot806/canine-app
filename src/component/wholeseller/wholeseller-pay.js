import React from 'react'
import Header from '../../directives/header'
import { Col, Row, Container, Form, Button } from 'react-bootstrap'
import CreditCardwholeseller from '../../assets/images/img/Credit CardWholeseller.png'
import card from '../../assets/images/img/cards.png'
import card1 from '../../assets/images/img/card1.png'
import card2 from '../../assets/images/img/card2.png'
import Footer from '../../directives/footer'
import paydone from '../../assets/images/icon/paydone.png'



function Wholesellerpay() {
    return (
        <>
            <Header />
            <section className='section-padding '>
                <Container>
                    <Row className='justify-content-center'>
                        <Col lg={6}>
                            <div className='credit-card'>
                                <img src={CreditCardwholeseller} />
                            </div>
                            <div className='form-area'>
                                <Form>
                                    <Form.Group className="mb-3" controlId="formGroupEmail">
                                        <Form.Control type="number" placeholder="1235 1254 8697 1234" />
                                    </Form.Group>

                                    <Row className="mb-3">
                                        <Form.Group as={Col}>
                                            <Form.Label>
                                                Expiry Date
                                            </Form.Label>
                                            <Form.Control type="date" />
                                        </Form.Group>
                                        <Form.Group as={Col}>
                                            <Form.Label>
                                                CVV
                                            </Form.Label>
                                            <Form.Control type="password" placeholder="CVV" />
                                        </Form.Group>
                                    </Row>
                                    <Form.Group className="mb-3" controlId="formGroupEmail">
                                        <Form.Label>
                                            Name
                                        </Form.Label>
                                        <Form.Control type="text" placeholder="Full name" />
                                    </Form.Group>
                                </Form>
                            </div>
                            <div className='pay-btn'>
                                <Button data-toggle="modal" data-target="#paysubmit">Submit</Button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            <Footer />



           {/* Modal */}
           <div className="modal fade" id="paysubmit" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className='payment-done'>
                                <img src={paydone} />
                                <p>Lorem Ipsum is simply dummy text of the printing and typesettingLorem Ipsum is simply dummy text of the printing and typesetting</p>
                                <Button data-dismiss="modal" aria-label="Close">Done</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Wholesellerpay