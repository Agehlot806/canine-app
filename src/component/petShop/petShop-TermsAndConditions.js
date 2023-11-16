import React, { useEffect, useState } from 'react'
import cart from "../../assets/images/icon/cart.png";
import PetShopHeader from "../../directives/petShopHeader";
import Petshopfooter from "../../directives/petShop-Footer";
import productdetail from "../../assets/images/banner/productdetail.png";
import { Col, Container, Row } from 'react-bootstrap';
import { BASE_URL } from '../../Constant/Index';
import axios from 'axios';

const PetshopTermsAndConditions = () => {
  const [termsandconditions, settermsandconditions] = useState([]);
  useEffect(() => {
    alltermsandconditions();
  }, []);
  const alltermsandconditions = async () => {
    axios
      .get(`${BASE_URL}/auth/terms_and_conditions`)
      .then((response) => {
        console.log(response);
        settermsandconditions(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      {" "}
      <PetShopHeader />
      <Container fluid className="p-0">
                <div className="all-bg">
                    <img src={productdetail} />
                </div>
            </Container>
            <section className='section-padding'>
        <Container>
          <Row className="justify-content-center">
            <Col lg={9}>
            <h1 className='text-center'><strong>Terms & Conditions </strong></h1>
              <div>
                {termsandconditions.map((conditions, index) => (
                  <div key={index}>
                    <div dangerouslySetInnerHTML={{ __html: conditions.value }} />
                  </div>
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <Petshopfooter />
    </>
  );
};

export default PetshopTermsAndConditions;
