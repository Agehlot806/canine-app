import React from 'react'
import Header from '../../directives/header'
import { Container, Row, Col, Button } from 'react-bootstrap'
import banner from '../../assets/images/banner/banner.png'
import Avatar1 from '../../assets/images/icon/Avatar1.svg'
import Avatar2 from '../../assets/images/icon/Avatar2.png'
import Avatar3 from '../../assets/images/icon/Avatar3.png'
import { Link } from 'react-router-dom'
import Footer from '../../directives/footer'


function Serviceaddpet() {
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
                    <div className='add-upload-area'>
                        <form>
                            <div className="form-group add-upload">
                                <label htmlFor="exampleFormControlFile1">Upload image
                                    <i class="fa fa-upload" /></label>
                                <input type="file" className="form-control-file" id="exampleFormControlFile1" />
                            </div>
                            <div className="needplace">
                                <Row>
                                    <Col lg={6}>
                                        <div className="form-group">
                                            <a><img src={Avatar1} /></a>
                                            <a><img src={Avatar2} /></a>
                                            <a><img src={Avatar3} /></a>
                                        </div>
                                        <div className="form-group">
                                            <label >Pet type</label>
                                            <ul className="nav nav-pills mb-3" role="tablist">
                                                <li className="nav-item">
                                                    <a className="nav-link active" data-toggle="pill" role="tab" aria-selected="true">Dog</a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">Cat</a>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="form-group">
                                            <label >Gender</label>
                                            <ul className="nav nav-pills mb-3" role="tablist">
                                                <li className="nav-item">
                                                    <a className="nav-link active" data-toggle="pill" role="tab" aria-selected="true">Male</a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">Female</a>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="form-group">
                                            <label >Breed</label>
                                            <select className="form-control">
                                                <option>Jarman safed</option>
                                                <option>2</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label >DOB</label>
                                            <input type="date" className="form-control" placeholder="DOB" />
                                        </div>
                                        <div className="form-group">
                                            <label >Age</label>
                                            <ul className="nav nav-pills mb-3" role="tablist">
                                                <li className="nav-item">
                                                    <a className="nav-link active" data-toggle="pill" role="tab" aria-selected="true">3 Month</a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false">2 Year</a>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="form-group">
                                            <label >Pet Name</label>
                                            <input type="text" className="form-control" placeholder="Pet Name" />
                                        </div>
                                        <div className='add-petbtn'>
                                        <Button><Link to=''>Add Pet</Link></Button>
                                    </div>
                                    </Col>
                                </Row>


                            </div>
                        </form>
                    </div>
                </Container>
            </section>

            <Footer />
        </>
    )
}

export default Serviceaddpet