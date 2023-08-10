import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import app1 from "../assets/images/img/app1.png";
import app2 from "../assets/images/img/app2.png";
import strings from "../component/language";
import { stringes } from "../utils";

function Footer() {
  return (
    <>
      <footer className="footer-bg">
        <div className="section-padding">
          <Container>
            <Row>
              <Col lg={3} sm={6}>
                <div className="footer-list">
                  <h5>{strings.usefulLinks}</h5>
                  <ul>
                    <li>
                      <Link>{strings.deliveryDeatils}</Link>
                    </li>
                    <li>
                      <Link>{strings.internationalShipping}</Link>
                    </li>
                    <li>
                      <Link>{strings.paymentOption}</Link>
                    </li>
                    <li>
                      <Link>{strings.trackYourOrder}</Link>
                    </li>
                    <li>
                      <Link>{strings.return}</Link>
                    </li>
                    <li>
                      <Link>{strings.findaStore}</Link>
                    </li>
                  </ul>
                </div>
              </Col>
              <Col lg={3} sm={6}>
                <div className="footer-list">
                  <h5>Information</h5>
                  <ul>
                    <li>
                      <Link>Careers</Link>
                    </li>
                    <li>
                      <Link to="/about-us">AboutUs</Link>
                    </li>
                    <li>
                      <Link to="/">{strings.offersDetails}</Link>
                    </li>
                    <li>
                      <Link to="/">{strings.helpandFAQs}</Link>
                    </li>
                    <li>
                      <Link to="/service">Our Services</Link>
                    </li>
                    <li>
                      <Link to="/product">Products</Link>
                    </li>
                    <li>
                      <Link to="/blog">{strings.blog}</Link>
                    </li>
                  </ul>
                </div>
              </Col>
              <Col lg={3} sm={6}>
                <div className="footer-list">
                  <h5>Contact Us</h5>
                  <ul>
                    <li>
                      <Link>
                        <i className="fa fa-envelope-o" /> Mail Us
                      </Link>
                    </li>
                    <li>
                      <Link>
                        <i className="fa fa-phone" /> +00-000000000
                      </Link>
                    </li>
                    <li>
                      <Link>
                        <i className="fa fa-commenting-o" /> Chat Us
                      </Link>
                    </li>
                  </ul>
                </div>
              </Col>
              <Col lg={3} sm={6}>
                <div className="footer-list">
                  <h5>Download The Apps</h5>
                  <ul>
                    <li>
                      <Link>
                        <img src={app1} />
                      </Link>
                    </li>
                    <li>
                      <Link>
                        <img src={app2} />
                      </Link>
                    </li>
                    <li className="social-media">
                      <span>Follow Us On</span>
                      <Link>
                        <i class="fa fa-facebook" />
                      </Link>
                      <Link>
                        <i class="fa fa-twitter" />
                      </Link>
                      <Link>
                        <i class="fa fa-instagram" />
                      </Link>
                    </li>
                  </ul>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </footer>
    </>
  );
}

export default Footer;
