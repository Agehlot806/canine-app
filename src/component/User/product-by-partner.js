import React, { useEffect, useState } from "react";
import Newheader from "../../directives/newheader";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import partner from "../../assets/images/banner/partner.png";
import loicon1 from "../../assets/images/img/loicon1.png";
import loicon2 from "../../assets/images/img/loicon2.png";
import { Link } from "react-router-dom";
import catpng from "../../assets/images/img/catpng.png";
import bannerPro from "../../assets/images/img/bannerPro.png";
import axios from "axios";
import { BASE_URL } from "../../Constant/Index";
import Footer from "../../directives/footer";

function Productbypartner() {
  const [thirdbanner, setthirdbanner] = useState([]);
  const [allVendorShop, setAllVendorShop] = useState([]);
  console.log("allVendorShop: ", allVendorShop);
  const [vendorItemList, setVendorItemList] = useState([]);
    
  useEffect(() => {
    thirdBanner();
      AllVendorHomePage();
      VendorItems();
  }, []);

  const thirdBanner = () => {
    axios
      .get(`${BASE_URL}/banners`)
      .then((response) => {
        console.log(response.data.data);
        setthirdbanner(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  // all venders
  const AllVendorHomePage = () => {
    axios
      .get(`${BASE_URL}/vendor/all_vendor`)
      .then((response) => {
        console.log("vendor", response.data.data);
        setAllVendorShop(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    };
    // vendor item 
    const VendorItems = () => {
        axios
          .get(`${BASE_URL}/vendor/get-items-list/4`)
          .then((response) => {
            console.log("vendor", response.data.data);
            setVendorItemList(response.data.data);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
        };

  return (
    <>
      <Newheader />
      <Container fluid className="p-0">
        <div className="all-bg">
          <img src={partner} />
        </div>
      </Container>
      <section className="section-padding">
        <Container>
          <h1 className="main-head">Product By Partner</h1>

          <div className="needplace">
            <Row>
              {allVendorShop && allVendorShop.length > 0 ? (
                allVendorShop.map((item) => (
                  <Col lg={3} sm={6} xs={6} className="mb-5">
                    <a href="/product-by-partner">
                      <div className="ProductPartner-card">
                        {/* <img src={item.logo} /> */}
                        <img
                          src={
                            "https://canine.hirectjob.in/storage/app/public/vendor/" +
                            item.logo
                          }
                        />
                        <h3 className="text-dark">{item.name}</h3>
                      </div>
                    </a>
                  </Col>
                ))
              ) : (
                <p className="emptyMSG">No Product By Partner Data.</p>
              )}
            </Row>
          </div>
        </Container>
      </section>
          {/* vendor Item list start */}
          <section className="section-padding">
        <Container>
          <h1 className="main-head">Product By Partner</h1>

          <div className="needplace">
            <Row>
              {vendorItemList && vendorItemList.length > 0 ? (
                vendorItemList.map((item) => (
                  <Col lg={3} sm={6} xs={6} className="mb-5">
                    <a href="/product-by-partner">
                      <div className="ProductPartner-card">
                        {/* <img src={item.logo} /> */}
                        <img
                          src={
                            "https://canine.hirectjob.in/storage/app/public/vendor/" +
                            item.image
                          }
                        />
                        <h3 className="text-dark">{item.name}</h3>
                      </div>
                    </a>
                  </Col>
                ))
              ) : (
                <p className="emptyMSG">No Product By Partner Data.</p>
              )}
            </Row>
          </div>
        </Container>
      </section>
          {/* vendor item list end */}
      <section className="section-padding">
        <Container>
          {thirdbanner
            ? thirdbanner.map(
                (item, index) =>
                  item.title === "new" && (
                    <div className="banner-bgmain" key={item.id}>
                      <img
                        src={
                          "https://canine.hirectjob.in/storage/app/public/banner/" +
                          item.image
                        }
                      />
                    </div>
                  )
              )
            : null}
        </Container>
      </section>

      <section className="section-padding">
        <Container>
          <div className=" Newsletter-bg">
            <Row>
              <Col lg={3}>
                <img src={catpng} />
              </Col>
              <Col lg={6}>
                <div className="Newsletter">
                  <h1 className="main-head">
                    Get Or Promo Code by Subscribing To our Newsletter
                  </h1>
                  <Form className="d-flex">
                    <Form.Control
                      type="search"
                      placeholder="Enter your email"
                      className="me-2"
                      aria-label="Search"
                    />
                    <Button variant="outline-success">Subscribe</Button>
                  </Form>
                </div>
              </Col>
              <Col lg={3} className="align-self-center">
                <img src={bannerPro} />
              </Col>
            </Row>
          </div>
        </Container>
      </section>
      <Footer />
    </>
  );
}

export default Productbypartner;
