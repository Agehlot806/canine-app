import React, { useEffect, useState } from "react";
import Newheader from "../../directives/newheader";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import partner from "../../assets/images/banner/partner.png";
import loicon1 from "../../assets/images/img/loicon1.png";
import loicon2 from "../../assets/images/img/loicon2.png";
import { Link, useNavigate } from "react-router-dom";
import catpng from "../../assets/images/img/catpng.png";
import bannerPro from "../../assets/images/img/bannerPro.png";
import axios from "axios";
import { BASE_URL } from "../../Constant/Index";
import Footer from "../../directives/footer";

function Productbypartner() {
  const navigate = useNavigate()
  const [thirdbanner, setthirdbanner] = useState([]);
  const [allVendorShop, setAllVendorShop] = useState([]);
    
  useEffect(() => {
    thirdBanner();
      AllVendorHomePage();
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


  const gradientColors = [
    "linear-gradient(180deg, #FFF0BA 0%, rgba(251.81, 233.11, 165.78, 0) 100%)",
    "linear-gradient(180deg, #C7EBFF 0%, rgba(199, 235, 255, 0) 100%)",
    "linear-gradient(180deg, #FECBF0 0%, rgba(254, 203, 240, 0) 100%)",
    "linear-gradient(180deg, #C8FFBA 0%, rgba(200, 255, 186, 0) 100%)",
    // Add more gradient colors as needed
  ];
  
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
                allVendorShop.map((item,index) => (
                  <Col lg={3} sm={6} xs={6} className="mb-5">
                    <a onClick={() => {
                      navigate('/product-partner-Oneshop',{
                        state: {
                          item : item
                        }
                      })
                    }}>
                      <div className="ProductPartner-card" style={{
                    background:
                      gradientColors[index % gradientColors.length],
                  }}>
                        {/* <img src={item.logo} /> */}
                        <img
                          src={
                            "https://canine.hirectjob.in/storage/app/public/store/" +
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
      <section className="section-padding">
        <Container>
          {thirdbanner
            ? thirdbanner.map(
                (item, index) =>
                  item.title === "new" && (
                    <div className="banner-bgmain" key={item.id}>
                      <img
                        src={
                          "https://canine.hirectjob.in/storage/app/" +
                          item.image
                        }
                      />
                    </div>
                  )
              )
            : null}
        </Container>
      </section>

      <Footer />
    </>
  );
}

export default Productbypartner;
