import React, { useEffect, useState } from "react";
import Newheader from "../../directives/newheader";
import Footer from "../../directives/footer";
import { Col, Container, Row } from "react-bootstrap";
import { BASE_URL } from "../../Constant/Index";
import axios from "axios";
import productdetail from "../../assets/images/banner/productdetail.png";
import loadinggif from "../../assets/images/video/loading.gif";

const Helpandfaqs = () => {
  const [faqs, setfaqs] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetchfaqs()
    ])
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);


  const fetchfaqs = () => {
    fetch(`${BASE_URL}/auth/faq`)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === '200') {
          setfaqs(data.data[0]);
        } else {
          console.error('Error fetching shipping policy');
        }
      })
      .catch((error) => {
        console.error('Error fetching shipping policy:', error);
      });
  };
  return (
    <>
      {" "}
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
                  <h1 className='text-center'><strong>FAQs</strong></h1>
                  <div>
                    {faqs && (
                      <div>
                        <div dangerouslySetInnerHTML={{ __html: JSON.parse(faqs.value).value }} />
                      </div>
                    )}
                  </div>
                </Col>
              </Row>
            </Container>
          </section>
        </>)}

      {/* <section className="section-padding">
        <Container>
          <Row>
            <Col lg={12}>
              <div className="faqs-area">
                <Accordion defaultActiveKey="0">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>What shipping charges can I expect to incur?</Accordion.Header>
                    <Accordion.Body>
                    For prepaid orders below Rs 599, there is a shipping fee of Rs 50 and it's absolutely free for orders above Rs 599. We have a flat Rs 70 COD charge for any Cash on Delivery orders.
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="1">
                    <Accordion.Header>What locations do you ship to?</Accordion.Header>
                    <Accordion.Body>
                    We know that pet lovers are all over the place, so we can ship to most areas pan India. Unfortunately, we don’t ship internationally yet., sunt in
                      culpa qui officia deserunt mollit anim id est laborum.
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="2">
                    <Accordion.Header>How long will my delivery take?</Accordion.Header>
                    <Accordion.Body>
                    The excitement of receiving a package knows no boundaries! That’s why at Petsy, we do our best to make sure you receive your delivery ASAP. Orders are usually dispatched within 24hrs Monday to Friday.

Orders within Mumbai will be delivered within 72 hours of placing the order and it takes upto 5-7 working days for orders to be delivered in other parts of India.

However, We are not liable for any delays in delivery by our courier partners but don’t worry, at Petsy we have your back and will help you track the parcel and keep you updated.
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="3">
                    <Accordion.Header>Does it cost anything?</Accordion.Header>
                    <Accordion.Body>
                    Not at all. Our Petsy Perks program is designed purely for your benefit and your furry friends!
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="4">
                    <Accordion.Header>Do I have a limit on how many friends I can refer?</Accordion.Header>
                    <Accordion.Body>
                    Absolutely not. Refer one, two or as many as you like! Go wild and spread the Petsy love.
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="5">
                    <Accordion.Header>What if I have issues with logging in or creating an account?</Accordion.Header>
                    <Accordion.Body>
                    Just get in touch with us at info@canine.online with your query or concern, and we’ll be sure to do our best to fix it!
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="6">
                    <Accordion.Header>Do I earn Petsy Points if I redeem a coupon or store voucher?</Accordion.Header>
                    <Accordion.Body>
                    No Petsy Points are earned on the value of coupons/store vouchers redeemed.
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="7">
                    <Accordion.Header>Can I redeem my Petsy Points across a number of transactions?</Accordion.Header>
                    <Accordion.Body>
                    Your voucher has to be redeemed in a single transaction.
                    </Accordion.Body>
                  </Accordion.Item><Accordion.Item eventKey="8">
                    <Accordion.Header>How long will the return take to process?</Accordion.Header>
                    <Accordion.Body>
                    We aim to make this process as easy as possible for you. Once we have received your parcel, we will access the product and get back to you accordingly within 2 working days of your return arriving back to us. Don’t worry we’ll keep you updated along the way. Please refer to our Returns Policy for more information.
                    </Accordion.Body>
                  </Accordion.Item>

                </Accordion>
              </div>
            </Col>
          </Row>
        </Container>
      </section> */}
      <Footer />
    </>
  );
};

export default Helpandfaqs;
