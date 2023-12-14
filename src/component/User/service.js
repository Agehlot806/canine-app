import React, { useEffect, useState } from "react";
import Newheader from "../../directives/newheader";
import service from "../../assets/images/banner/service.png";
import banner from "../../assets/images/banner/banner.png";
import { Container, Row, Col } from "react-bootstrap";
import icon3 from "../../assets/images/icon/icon3.png";
import servicepage from "../../assets/images/img/servicepage.png";
import Footer from "../../directives/footer";
import axios from "axios";
import { BASE_URL } from "../../Constant/Index";
import { Link } from "react-router-dom";
import loadinggif from "../../assets/images/video/loading.gif";
import DocumentMeta from "react-document-meta";

function Service() {
  const meta = {
    title:
      "Canine Products - Services for Grooming, Walking, Sitting, Training, and Health & Wellness",
    description:
      "Our premium services encompass grooming sessions that leave your furry friends looking and feeling fabulous, invigorating walks, attentive sitting for those times your away, expert training to nurture good behavior, and dedicated health and wellness checks.",
    canonical: "https://canine.hirectjob.in/",
    meta: {
      charset: "utf-8",
      name: {
        keywords:
          "Pet grooming,Dog walking services,Pet sitting,Professional pet training,Pet health and wellness,Comprehensive pet care,Grooming specialists,Experienced pet sitters,Certified dog trainers,Holistic pet health,Pet care packages,Tailored grooming solutions,Daily dog walks,In-home pet sitting,Positive reinforcement training",
      },
    },
  };

  const [allservice, setallservice] = useState([]);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    Promise.all([allService()])
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const allService = async () => {
    axios
      .get(`${BASE_URL}/banners/service_category`)
      .then((response) => {
        console.log(response);
        console.log("Service category Successful");
        setallservice(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <DocumentMeta {...meta}>
        <Newheader />
        {loading ? (
          <section className="section-padding mt-3 mb-3">
            <div className="loaderimg text-center text-black mb-4">
              <img src={loadinggif} alt="" />
              <h5>Please Wait.......</h5>
            </div>
          </section>
        ) : (
          <>
            <Container fluid className="p-0">
              <div className="all-bg">
                <img src={service} />
              </div>
            </Container>
            <section className="section-padding">
              <Container>
                <div className="text-left">
                  <h1 className="main-head">All Services</h1>
                </div>
                <div className="needplace">
                  <Row>
                    {/* {allservice.map((item) => (
                    <Col lg={4} sm={6} className="mb-4">
                      <div className="service-card" key={item.id}>
                        <Link to={`/service-date/${item.id}`}>
                          <img
                            src={
                              "https://canine.hirectjob.in//storage/app/public/service/" +
                              item.image
                            }
                          />
                          <h3>{item.name}</h3>
                          <p>
                            Ut tortor pretium viverra suspendisse potenti nullam ac
                            tortor vitae eget dolor morbi
                          </p>
                        </Link>
                      </div>
                    </Col>
                  ))} */}

                    {allservice.map((item) => (
                      <Col lg={4} sm={6} className="mb-4" key={item.id}>
                        <Link
                          to={
                            item.name === "Health & Wellness"
                              ? "veterinary-service"
                              : `/service-date/${item.name}/${item.id}`
                          }
                        >
                          <div className="service-card">
                            <img
                              src={
                                "https://canine.hirectjob.in//storage/app/public/service/" +
                                item.image
                              }
                            />
                            <h3>{item.name}</h3>
                            <p>{item.description}</p>
                          </div>
                        </Link>
                      </Col>
                    ))}
                  </Row>
                </div>
              </Container>
            </section>

            <section className="section-padding">
              <Container fluid className="p-0">
                <div className="banner-bgmain">
                  <img src={banner} />
                </div>
              </Container>
            </section>

            <section className="section-padding">
              <Container>
                <Row>
                  <Col lg={7} sm={7} className="align-self-center">
                    <div className="service-Visit">
                      <h1 className="main-head">Each Visit Also Includes</h1>
                      {/* <p>
                      Justo eget magna fermentum iaculis eu non diam phasellus.
                      Eu lobortis elementum nibh tellus molestie nunc.
                      Ullamcorper eget nulla facilisi etiam dignissim diam. Eget
                      felis eget nunc lobortis mattis
                    </p> */}
                      <ul>
                        <li>
                          <i className="fa fa-check-circle" /> Clean pet cages
                          and tanks
                        </li>
                        <li>
                          <i className="fa fa-check-circle" /> Scoop Litter
                          Boxes
                        </li>
                        <li>
                          <i className="fa fa-check-circle" /> Bringing in mail
                          and packages
                        </li>
                        <li>
                          <i className="fa fa-check-circle" /> Watering Plants
                        </li>
                      </ul>
                    </div>
                  </Col>
                  <Col lg={5} sm={5}>
                    <div className="aboutpage-img">
                      <img src={servicepage} />
                    </div>
                  </Col>
                </Row>
              </Container>
            </section>
          </>
        )}
        <Footer />
      </DocumentMeta>
    </>
  );
}

export default Service;
