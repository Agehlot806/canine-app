import React, { useEffect, useState } from 'react'
import Newheader from '../../directives/newheader'
import productdetail from "../../assets/images/banner/productdetail.png";
import { Col, Container, Row } from 'react-bootstrap';
import Footer from '../../directives/footer';
import { BASE_URL } from '../../Constant/Index';
import axios from 'axios';

function Privacypolicy() {
  const [privacyPolicy, setPricacyPolicy] = useState([]);
  useEffect(() => {
    allPrivacypolicy();
  }, []);
  const allPrivacypolicy = async () => {
    axios
      .get(`${BASE_URL}/auth/privacy_policy`)
      .then((response) => {
        console.log(response);
        setPricacyPolicy(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
            <h1 className='text-center'><strong>Privacy Policy </strong></h1>
              <div>
                {privacyPolicy.map((policy, index) => (
                  <div key={index}>
                    <div dangerouslySetInnerHTML={{ __html: policy.value }} />
                  </div>
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <Footer />
    </>
  )
}

export default Privacypolicy