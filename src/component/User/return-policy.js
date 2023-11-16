import React from 'react'
import Newheader from '../../directives/newheader'
import productdetail from "../../assets/images/banner/productdetail.png";
import { Col, Container, Row } from 'react-bootstrap';
import Footer from '../../directives/footer';

function Returnpolicy() {
    return (
        <>
            <Newheader />
            <Container fluid className="p-0">
                <div className="all-bg">
                    <img src={productdetail} />
                </div>
            </Container>
            <section className='section-padding'>
                <Container>
                    <Row className="justify-content-center">
                        <Col lg={9}>
                            <h1 className='text-center'><strong>Return Policy</strong></h1>
                            <div className="col-md-12" style={{ padding: 0 }}>
                                <h5>REPLACEMENT POLICY</h5>
                                <p>In case you find any problems, damages or defects in the products you can simply return the product to us within 7 days of receiving the product. On Successful processing of returned Item(s), we will either replace the product or refund the entire amount.</p>
                                <h5>CanineProducts does not allow returns on the following -</h5>
                                <ul>
                                    <li>Perishable / Food items that are opened and/or used</li>
                                    <li>Diapers, Sanitation or Hygiene related products, deodorants will not be returnable unless containing a manufacturing defect that can be proved</li>
                                    <li>Any Used Apparel / Merchandise</li>
                                    <li>If the product doesn’t bear its original packaging</li>
                                    <li>If the product is soiled, dirty, washed, refurbished or used for a prolonged period</li>
                                    <li>If the product is torn, damaged or possesses any signs of strains</li>
                                </ul>



                                <div />
                            </div>



                        </Col>
                    </Row>
                </Container>
            </section>
            <Footer />
        </>
    )
}

export default Returnpolicy