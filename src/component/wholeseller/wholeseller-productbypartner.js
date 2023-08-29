import React, { useEffect, useState } from "react";
import Newheader from "../../directives/newheader";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import partner from "../../assets/images/banner/partner.png";
import bag from "../../assets/images/icon/bag.png";
import loicon1 from "../../assets/images/img/loicon1.png";
import loicon2 from "../../assets/images/img/loicon2.png";
import { Link, useParams } from "react-router-dom";
import catpng from "../../assets/images/img/catpng.png";
import bannerPro from "../../assets/images/img/bannerPro.png";
import axios from "axios";
import { BASE_URL } from "../../Constant/Index";
import Wholesallerfooter from "../../directives/wholesaller-Footer";

function WholesellerProductbypartner() {
  const { id } = useParams();
  console.log("id: ", id);
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
  const gradientColors = [
    "linear-gradient(180deg, #FFF0BA 0%, rgba(251.81, 233.11, 165.78, 0) 100%)",
    "linear-gradient(180deg, #C7EBFF 0%, rgba(199, 235, 255, 0) 100%)",
    "linear-gradient(180deg, #FECBF0 0%, rgba(254, 203, 240, 0) 100%)",
    "linear-gradient(180deg, #C8FFBA 0%, rgba(200, 255, 186, 0) 100%)",
    // Add more gradient colors as needed
  ];

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
                    <a href="/wholeseller-product-by-partner">
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
                vendorItemList.map((item, index) => (
                  <Col lg={3} sm={6} xs={6} className="mb-4">
                    <div
                      className="food-product"
                      key={item.id}
                      style={{
                        background:
                          gradientColors[index % gradientColors.length],
                      }}
                    >
                      <i
                        class="fa fa-heart-o"
                        onClick={() => addToWishlist(item.id)}
                      />
                      <Link to={`/wholeseller-product-details/${item.id}`}>
                        <div className="text-center">
                          <img
                            src={
                              "https://canine.hirectjob.in//storage/app/public/product/" +
                              item.image
                            }
                          />
                        </div>
                        <div>
                          <h6>{item.name}</h6>
                          <p>{item.description}</p>
                        </div>
                        <div className="product-bag">
                          <Row>
                            <Col className="align-self-center">
                              <h6>₹{item.price}</h6>
                            </Col>
                            <Col>
                              <Link
                                to={`/wholeseller-add-cart/${id}`}
                                // onClick={handleAddToCart}
                              >
                                <img src={bag} />
                              </Link>
                            </Col>
                          </Row>
                        </div>
                      </Link>
                    </div>
                  </Col>
                  // <Col lg={3} sm={6} xs={6} className="mb-5">
                  //   <a href="/wholeseller-product-by-partner">
                  //     <div className="ProductPartner-card">
                  //       {/* <img src={item.logo} /> */}
                  //       <img
                  //         src={
                  //           "https://canine.hirectjob.in/storage/app/public/vendor/" +
                  //           item.image
                  //         }
                  //       />
                  //       <div>
                  //         <h6>{item.name}</h6>
                  //         <p>{item.description}</p>
                  //       </div>
                  //       <div className="product-bag">
                  //         <Row>
                  //           <Col className="align-self-center">
                  //             <h6>₹{item.price}</h6>
                  //           </Col>
                  //           <Col>
                  //             <Link
                  //             // to={`/wholeseller-add-cart/${id}`}
                  //             // onClick={handleAddToCart}
                  //             >
                  //               <img src={bag} />
                  //             </Link>
                  //           </Col>
                  //         </Row>
                  //       </div>
                  //     </div>
                  //   </a>
                  // </Col>
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
      <Wholesallerfooter />
    </>
  );
}

export default WholesellerProductbypartner;
