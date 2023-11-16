import React, { useEffect, useState } from "react";
import Newheader from "../../directives/newheader";
import Footer from "../../directives/footer";
import { Col, Container, Row } from "react-bootstrap";
import { BASE_URL } from "../../Constant/Index";
import axios from "axios";
import productdetail from "../../assets/images/banner/productdetail.png";
import loadinggif from "../../assets/images/video/loading.gif";


const Cancellationpolicy = () => {
  const [cancelation, setcancelation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetchcancelation()
    ])
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);


  const fetchcancelation = () => {
    fetch(`${BASE_URL}/auth/cancelation`)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === '200') {
          setcancelation(data.data[0]);
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
            <h1 className='text-center'><strong>Cancellation Policy</strong></h1>
              <div>
              {cancelation && (
        <div>
          <div dangerouslySetInnerHTML={{ __html: JSON.parse(cancelation.value).value }} />
        </div>
      )}
              </div>
            </Col>
          </Row>
        </Container>
      </section>
        </>)}

      <Footer />
    </>
  );
};

export default Cancellationpolicy;
