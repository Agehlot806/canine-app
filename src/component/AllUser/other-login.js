import React from 'react'
import logo from '../../assets/images/logo.png'
import login from '../../assets/images/img/login.png'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import loicon1 from '../../assets/images/img/loicon1.png'
import loicon2 from '../../assets/images/img/loicon2.png'
import loicon3 from '../../assets/images/img/loicon3.png'

function Otherlogin() {
    return (
        <>
            <div className='users-bg'>
                <Container>
                    <div className="text-center">
                        <img src={logo} />
                    </div>
                    <div>
                        <Row>
                            <Col lg={6}>
                                <Row className='justify-content-center'>
                                    <Col lg={6} className='mb-3'>
                                        <Link to='/wholeseller-login'>
                                            <div className='otherLogin-card otherLogin1'>
                                                <img src={loicon1} />
                                                <h5>Login for Wholesales</h5>
                                            </div>
                                        </Link>
                                    </Col>
                                    <Col lg={6} className='mb-3'>
                                    <Link to='https://canine.hirectjob.in/store/apply'>
                                        <div className='otherLogin-card otherLogin2'>
                                            <img src={loicon2} />
                                            <h5>Login for Partner</h5>
                                        </div>
                                        </Link>
                                    </Col>
                                    <Col lg={6} className='mb-3'>
                                    <Link to='/salesman-login'>
                                        <div className='otherLogin-card otherLogin3'>
                                            <img src={loicon3} />
                                            <h5>login for Salesman</h5>
                                        </div>
                                        </Link>
                                    </Col>
                                </Row>
                            </Col>
                            <Col lg={6}>
                                <div className='login-img'>
                                    <img src={login} />
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </div>
        </>
    )
}

export default Otherlogin