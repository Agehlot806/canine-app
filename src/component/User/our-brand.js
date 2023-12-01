import React, { useEffect, useState } from "react";
import Newheader from "../../directives/newheader";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import ourbrand from "../../assets/images/banner/ourbrand.png";
import brand1 from "../../assets/images/img/brand1.png";
import brand2 from "../../assets/images/img/brand2.png";
import brand3 from "../../assets/images/img/brand3.png";
import brandPro1 from "../../assets/images/img/brandPro1.png";
import brandPro2 from "../../assets/images/img/brandPro2.png";
import brandPro3 from "../../assets/images/img/brandPro3.png";
import { BASE_URL } from "../../Constant/Index";
import Footer from "../../directives/footer";
import axios from "axios";
import catpng from "../../assets/images/img/catpng.png";
import bannerPro from "../../assets/images/img/bannerPro.png";
import { Link } from "react-router-dom";
import loadinggif from "../../assets/images/video/loading.gif";

function Ourbrand() {
  const [thirdbanner, setthirdbanner] = useState([]);
  const [brands, setBrands] = useState([]);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    Promise.all([thirdBanner(), fetchBrands()])
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
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

  const fetchBrands = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/auth/brand`);
      setBrands(response.data.data);

      // Handle response as needed
    } catch (error) {
      console.error(error);
      // Handle error as needed
    }
  };

  const ourBrandcolor = [
    "linear-gradient(180deg, #C8FFBA 0%, rgba(200, 255, 186, 0) 100%)",
    "linear-gradient(180deg, #FFF0BA 0%, rgba(251.81, 233.11, 165.78, 0) 100%)",
    "linear-gradient(180deg, #C7EBFF 0%, rgba(199, 235, 255, 0) 100%)",
    "linear-gradient(180deg, #FECBCD 0%, rgba(253.94, 203.15, 204.70, 0) 100%)",
  ];

  return (
    <>
      <Newheader />
      {loading ? (
      <section className="section-padding mt-3 mb-3">
      <div className="loaderimg text-center text-black mb-4">
          <img src={loadinggif} alt=""/>
          <h5>Please Wait.......</h5>
        </div>
        </section>) : (<>
          <Container fluid className="p-0">
        <div className="all-bg">
          <img src={ourbrand} />
        </div>
      </Container>

      <section className="section-padding">
        <Container>
          <h1 className="main-head">Our Brands</h1>
          <div className="needplace">
            <Row>
              {brands
                ? brands.map(
                    (brand,index) =>
                      brand.canine == "1" && (
                        <Col lg={3} sm={6} xs={6} className="mb-5">
                          <div key={brand.id} className="Brand-card" style={{
                          background:
                            ourBrandcolor[index % ourBrandcolor.length],
                        }}>
                            <Link to={`/our-our-brand/${brand.title}`}>
                              <div className="brandLOGO">
                                <img
                                 src={
                                  "http://caninedemo.caninetest.xyz//storage/app/public/brand_logo/" +
                                  brand.logo
                                }
                                />
                              </div>
                              <div className="brand-main">
                                <img
                                  src={
                                    "http://caninedemo.caninetest.xyz//storage/app/public/brand/" +
                                    brand.image
                                  }
                                />
                              </div>
                              <div className="brand-text">
                                <h5>{brand.title}</h5>
                              </div>
                            </Link>
                          </div>
                        </Col>
                      )
                  )
                : null}
            </Row>
          </div>
        </Container>
      </section>

      <section className="section-padding">
        <Container>
          {thirdbanner
            ? thirdbanner.map(
                (item, index) =>
                  item.title === "new" && (
                    <div className="banner-bgmain" key={item.id}>
                      <img
                        src={
                          "http://caninedemo.caninetest.xyz//storage/app/" +
                          item.image
                        }
                      />
                    </div>
                  )
              )
            : null}
        </Container>
      </section>

      
        </>)}
      

      <Footer />
    </>
  );
}

export default Ourbrand;
