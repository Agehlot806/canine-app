import React, { useEffect, useState } from "react";
import Newheader from "../../directives/newheader";
import Footer from "../../directives/footer";
import { Col, Container, Row } from "react-bootstrap";
import { BASE_URL } from "../../Constant/Index";
import axios from "axios";
import productdetail from "../../assets/images/banner/productdetail.png";
import loadinggif from "../../assets/images/video/loading.gif";

const Testimonials = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    Promise.all([
      // fetchrefund()
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
                <Col lg={12}>
                  <h1 className='text-center'><strong>Testimonials</strong></h1>
                  <Row>
                  <Col lg={3} className="mb-4">
                      <div className="testimonial-card">
                        <h3>Shalini Pandey</h3>
                        <p>Canine products is awesome...!it has range of products n pet accessories...staffs are very helpful n understanding... whenever I seek extra advice on pet care they are always happy to help.</p>
                      </div>
                    </Col>
                    <Col lg={3} className="mb-4">
                      <div className="testimonial-card">
                        <h3>Vansh Polanki</h3>
                        <p>Really good service and staff</p>
                      </div>
                    </Col>
                    <Col lg={3} className="mb-4">
                      <div className="testimonial-card">
                        <h3>abhijit paradkar</h3>
                        <p>One Stop For All Your Pets Need. Great Service - Ebrahim the owner is Humble and kind enough to give honest Suggestions...Must Visit</p>
                      </div>
                    </Col>
                    <Col lg={3} className="mb-4">
                      <div className="testimonial-card">
                        <h3>Shubham Agarkar</h3>
                        <p>Nicely organises events</p>
                      </div>
                    </Col>
                    <Col lg={3} className="mb-4">
                      <div className="testimonial-card">
                        <h3>Rajiv Sundararaju</h3>
                        <p>Wide variety of food and leashes for dogs and cats. They also have a pet stay and care zone</p>
                      </div>
                    </Col>
                    <Col lg={3} className="mb-4">
                      <div className="testimonial-card">
                        <h3>Deblina Sen</h3>
                        <p>An amazing place...it's a 100% one stop shop for pets...my pup's entire stuff are from here...the boarding/daycare facility is superb...every pet is so well taken care...good staff...you can trust them...it's a blessing in disguise for pet parents like us…</p>
                      </div>
                    </Col>
                    <Col lg={3} className="mb-4">
                      <div className="testimonial-card">
                        <h3>Sachin Chand</h3>
                        <p>Best pet shop in kandivali</p>
                      </div>
                    </Col>
                    
                    <Col lg={3} className="mb-4">
                      <div className="testimonial-card">
                        <h3>Avik Biswas</h3>
                        <p>This is one of the best place to keep my pet! My pet loves the place. It is like his second home!</p>
                      </div>
                    </Col>
                    
                  </Row>
                </Col>
              </Row>
            </Container>
          </section>
        </>)}
      <Footer />
    </>
  );
};

export default Testimonials;
