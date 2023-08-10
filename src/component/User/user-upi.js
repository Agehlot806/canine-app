import React from 'react'
import Newheader from '../../directives/newheader';
import { Col, Row, Container, Form, Button } from 'react-bootstrap'
import CreditCardwholeseller from '../../assets/images/img/Credit CardWholeseller.png'
import paydone from '../../assets/images/icon/paydone.png'
import card1 from '../../assets/images/img/card1.png'
import card2 from '../../assets/images/img/card2.png'
import Footer from '../../directives/footer'



function Userupi() {
    return (
        <>
            <Newheader />
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
                                    <Form.Label>
                                    UPI ID
                                            </Form.Label>
                                        <Form.Control type="text" placeholder="@dbkjhfdk123" />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formGroupEmail">
                                        <Form.Label>
                                            Name
                                        </Form.Label>
                                        <Form.Control type="text" placeholder="Full name" />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formGroupEmail">
                                        <Form.Label>
                                        Amount
                                        </Form.Label>
                                        <Form.Control type="number" placeholder="Amount" />
                                    </Form.Group>
                                </Form>
                            </div>
                            <div className='pay-btn'>
                                <Button data-toggle="modal" data-target="#paysubmit">Pay</Button>
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

export default Userupi