import React, { useState } from 'react'
import Header from '../../directives/header'
import productdetail from '../../assets/images/banner/productdetail.png'
import { Button, Col, Container, Row } from 'react-bootstrap'
import brandPro1 from '../../assets/images/img/brandPro1.png'
import voch from '../../assets/images/icon/voch.png'
import Footer from '../../directives/footer'
import { Link } from 'react-router-dom'

function SalesmanAddcart() {
    const [quantity, setQuantity] = useState(1);
    const handleIncrementone = () => {
        setQuantity(quantity + 1);
    };
    const handleDecrementone = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };
    return (
        <>
            <Header />
            <Container fluid className='p-0'>
                <div className='all-bg'>
                    <img src={productdetail} />
                </div>
            </Container>
            <section className='section-padding'>
                <div className='add-cart'>
                    <Container>
                        <Row>
                            <Col lg={2}>
                                <img src={brandPro1} />
                            </Col>
                            <Col lg={7} className='align-self-center'>
                                <h2>Mars Petcare Inc</h2>
                                <p>with paneer or cottage cheese.</p>
                            </Col>
                            <Col lg={2} className='align-self-center'>
                                <h3>₹620.00</h3>
                                <div className="quantity-btn">
                                    <button onClick={handleDecrementone}><i className="fa fa-minus" /></button>
                                    <span>{quantity}</span>
                                    <button onClick={handleIncrementone}><i className="fa fa-plus" /></button>
                                </div>
                            </Col>
                            <Col lg={1} className='align-self-center'>
                                <div className='delete-addcard'>
                                    <i class="fa fa-trash-o" />
                                </div>
                            </Col>
                        </Row>
                        <hr />
                        <Row>
                            <Col lg={2}>
                                <img src={brandPro1} />
                            </Col>
                            <Col lg={7} className='align-self-center'>
                                <h2>Mars Petcare Inc</h2>
                                <p>with paneer or cottage cheese.</p>
                            </Col>
                            <Col lg={2} className='align-self-center'>
                                <h3>₹620.00</h3>
                                <div className="quantity-btn">
                                    <button onClick={handleDecrementone}><i className="fa fa-minus" /></button>
                                    <span>{quantity}</span>
                                    <button onClick={handleIncrementone}><i className="fa fa-plus" /></button>
                                </div>
                            </Col>
                            <Col lg={1} className='align-self-center'>
                                <div className='delete-addcard'>
                                    <i class="fa fa-trash-o" />
                                </div>
                            </Col>
                        </Row>
                        <hr />
                        <Row>
                            <Col lg={2}>
                                <img src={brandPro1} />
                            </Col>
                            <Col lg={7} className='align-self-center'>
                                <h2>Mars Petcare Inc</h2>
                                <p>with paneer or cottage cheese.</p>
                            </Col>
                            <Col lg={2} className='align-self-center'>
                                <h3>₹620.00</h3>
                                <div className="quantity-btn">
                                    <button onClick={handleDecrementone}><i className="fa fa-minus" /></button>
                                    <span>{quantity}</span>
                                    <button onClick={handleIncrementone}><i className="fa fa-plus" /></button>
                                </div>
                            </Col>
                            <Col lg={1} className='align-self-center'>
                                <div className='delete-addcard'>
                                    <i class="fa fa-trash-o" />
                                </div>
                            </Col>
                        </Row>
                        <hr />
                        <Row>
                            <Col lg={2}>
                                <img src={brandPro1} />
                            </Col>
                            <Col lg={7} className='align-self-center'>
                                <h2>Mars Petcare Inc</h2>
                                <p>with paneer or cottage cheese.</p>
                            </Col>
                            <Col lg={2} className='align-self-center'>
                                <h3>₹620.00</h3>
                                <div className="quantity-btn">
                                    <button onClick={handleDecrementone}><i className="fa fa-minus" /></button>
                                    <span>{quantity}</span>
                                    <button onClick={handleIncrementone}><i className="fa fa-plus" /></button>
                                </div>
                            </Col>
                            <Col lg={1} className='align-self-center'>
                                <div className='delete-addcard'>
                                    <i class="fa fa-trash-o" />
                                </div>
                            </Col>
                        </Row>
                        <hr />
                        <div className="needplace">
                            <Row className='justify-content-center'>
                                <Col lg={8}>
                                    <div className='add-cart-Voucher '>
                                        <Row>
                                            <Col ><img src={voch}/></Col>
                                            <Col className='align-self-center'><h5>Voucher Discount</h5></Col>
                                            <Col className='align-self-center'><h6>$30.00</h6></Col>
                                        </Row>
                                    </div>
                                    <div className='add-cart-total'>
                                        <Row>
                                            <Col><h5>Sub Total</h5></Col>
                                            <Col><h5>₹620.00</h5></Col>
                                        </Row>
                                        <hr />
                                        <Row>
                                            <Col><h5>Tex(5%)</h5></Col>
                                            <Col><h5>₹00.00</h5></Col>
                                        </Row>
                                        <hr />
                                        <Row>
                                            <Col><h5>Rounding Adjust</h5></Col>
                                            <Col><h5>₹00.00</h5></Col>
                                        </Row>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <div className="needplace">
                            <div className='address'>
                                <h3>Address</h3>
                                <div className='address-card'>
                                    <Row>
                                        <Col lg={10}>
                                            Lorem Ipsum is simply dummy text of the printing and typesettim Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                                        </Col>
                                        <Col lg={2}>
                                            <Button data-toggle="modal" data-target="#salesmanaddress-model">Change</Button>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </div>

                        <div className="needplace">
                            <div className='totalPAY'>
                                <Row className='justify-content-center'>
                                    <Col lg={6}>
                                        <div className='totelPAYCAR'>
                                            <Row>
                                                <Col sm={6}>
                                                    <h4>Total</h4>
                                                    <h2>₹620.00</h2>
                                                </Col>
                                                <Col sm={6}>
                                                    <Button><Link to='/user-pay-method'>Pay</Link></Button>
                                                </Col>
                                            </Row>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </Container>
                </div>
            </section>

            <Footer />



            {/* Modal */}
            <div className="modal fade editAddress" id="salesmanaddress-model" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit For New Address</h5>
                            {/* <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button> */}
                        </div>
                        <div className="modal-body">
                            <div class="form-group">
                                <label for="exampleFormControlInput1">New address</label>
                                <input class="form-control" type="text"  />
                            </div>
                            <div class="form-group">
                                <label for="exampleFormControlInput1">State</label>
                                <select class="form-control"
                                    aria-label="Default select example"
                                    
                                >
                                    <option>state</option>
                                    
                                </select>


                            </div>
                            <div class="form-group">
                                <label for="exampleFormControlInput1">City</label>
                                <select class="form-control"
                                    aria-label="Default select example"
                                   
                                >
                                    <option>City</option>
                                    
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="exampleFormControlInput1">Pincode</label>
                                <input class="form-control" type="text" />
                            </div>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" >Update</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SalesmanAddcart