import React from 'react'
import Header from '../../directives/header'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import service from '../../assets/images/banner/service.png'
import Footer from '../../directives/footer'


function Veterinaryservice() {
    return (
        <>
            <Header />
            <Container fluid className='p-0'>
                <div className='all-bg'>
                    <img src={service} />
                </div>
            </Container>
            <section className="section-padding">
                <Container>
                    <Row>
                        <Col lg={6}>
                            <div className='veter-area'>
                                <div className='veter-timing'>
                                    <div> <i className="fa fa-clock-o" /></div>
                                    <div>
                                        <h3>Open Hours</h3>
                                        <p>Mon-Fri:7am-6pm</p>
                                        <p>Sat-Sun:9ap-4pm</p>
                                    </div>
                                </div>
                                <div className='veter-timing'>
                                    <div><i className="fa fa-phone " /></div>
                                    <div>
                                        <h3>Phone</h3>
                                        <p>(+91)0000000000</p>
                                        <p>(+91)0000000000</p>
                                    </div>
                                </div>
                                <div className='veter-timing'>
                                    <div> <i className="fa fa-map-marker" /></div>
                                    <div>
                                        <h3>Address</h3>
                                        <p>Canine Products Borvali (Mumbai)</p>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col lg={6}>
                            <div className='contact-form'>
                                <h1>Pet Grooming Service</h1>
                                <Form>
                                    <Form.Group className="mb-3" controlId="formGridAddress1">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control placeholder="Enter name" />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formGridAddress1">
                                        <Form.Label>Address</Form.Label>
                                        <Form.Control placeholder="Enter address" />
                                    </Form.Group>
                                    <Row className="mb-3">
                                        <Col>
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control placeholder="Enter email" />
                                        </Col>
                                        <Col>
                                            <Form.Label>Phone no</Form.Label>
                                            <Form.Control placeholder="Enter phone" />
                                        </Col>
                                    </Row>
                                    <Form.Group className="mb-3" controlId="formGridAddress1">
                                        <Form.Label>Message</Form.Label>
                                        <Form.Control placeholder="Leave a comment here" as="textarea" />
                                    </Form.Group>
                                    <Button className='mt-4'>Submit</Button>
                                </Form>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            <Footer />
        </>
    )
}

export default Veterinaryservice