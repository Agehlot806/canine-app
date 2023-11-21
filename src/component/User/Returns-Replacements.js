import React, { useEffect, useState } from "react";
import Newheader from "../../directives/newheader";
import Footer from "../../directives/footer";
import { Col, Container, Row } from "react-bootstrap";
import { BASE_URL } from "../../Constant/Index";
import axios from "axios";
import productdetail from "../../assets/images/banner/productdetail.png";
import loadinggif from "../../assets/images/video/loading.gif";
import { Link } from "react-router-dom";

function ReturnsReplacements() {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
    //   fetchrefund()
    ])
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);


    return (
        <>
            <Newheader />
             {loading ? (
        <section className="section-padding mt-3 mb-3">
          <div className="loaderimg text-center text-black mb-4">
            <img src={loadinggif} alt="" />
            <h5>Please Wait.......</h5>
          </div>
        </section>) : (<>
          <Container fluid className="p-0">
            <div className="all-bg">
              <img src={productdetail} />
            </div>
          </Container>
          <section className='section-padding'>
        <Container>
          <Row className="justify-content-center">
            <Col lg={9}>
            <h1 className='text-center'><strong>Returns & Replacements</strong></h1>
              <div>
             <p> In case you find any problems, damages or defects in the products you can simply return the product to us within 7 days of receiving the product. On Successful processing of returned Item(s), we will either replace the product or refund the entire amount.</p>
<h6>CanineProducts does not allow returns on the following -</h6>
<ul>
    <li>Perishable / Food items that are opened and/or used</li>
    <li>Diapers, Sanitation or Hygiene related products, deodorants will not be returnable unless containing a manufacturing defect that can be proved</li>
    <li>Any Used Apparel / Merchandise</li>
    <li>If the product doesn’t bear its original packaging</li>
    <li>If the product is soiled, dirty, washed, refurbished or used for a prolonged period</li>
    <li>If the product is torn, damaged or possesses any signs of strains</li>
</ul>

              </div>
            </Col>
          </Row>
        </Container>
      </section>
        </>)}
            <Footer />
        </>
    )
}

export default ReturnsReplacements