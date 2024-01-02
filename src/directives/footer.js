import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import app1 from "../assets/images/img/app1.png";
import app2 from "../assets/images/img/app2.png";
import strings from "../component/language";
import { stringes } from "../utils";
import {
  BiLogoFacebookCircle,
  BiLogoTwitter,
  BiLogoInstagramAlt,
} from "react-icons/bi";
import WhatsAppWidget from "../chatwhatsapp";
import Paycard1 from "../assets/images/img/paycard1.png";
import Paycard2 from "../assets/images/img/paycard2.png";
import Paycard3 from "../assets/images/img/paycard3.png";
import Paycard4 from "../assets/images/img/paycard4.png";
import Paycard5 from "../assets/images/img/paycard5.png";
import Paycard6 from "../assets/images/img/paycard6.png";
import Paycard7 from "../assets/images/img/paycard7.png";

function Footer() {
  const linknewwindonopne = (linkdata) => {
    window.open(linkdata);
  };
  return (
    <>
      <footer className="footer-bg">
        <div className="section-padding">
          <Container>
            <Row>
              <Col lg={3} sm={6} xs={6}>
                <div className="footer-list">
                  <h5>Customer Services</h5>
                  <ul>
                    <li>
                      <Link to="/delivery-details">
                        {strings.deliveryDeatils}
                      </Link>
                    </li>
                    <li>
                      <Link to="/cancellation-policy">
                        {strings.trackYourOrder}
                      </Link>
                    </li>

                    <li>
                      <Link to="/privacy-security">Privacy & Security</Link>
                    </li>
                    <li>
                      <Link to="/returns-replacements">
                        Returns & Replacements
                      </Link>
                    </li>
                    <li>
                      <Link to="/return-policy">Return Policy</Link>
                    </li>
                    <li>
                      <Link to="/terms-&-conditions">
                        {strings.termsConditions}
                      </Link>
                    </li>
                    <li>
                      <Link to="/terms-of-use">Terms of use</Link>
                    </li>
                    <li>
                      <Link to="/offers-details">Top Offers</Link>
                    </li>
                  </ul>
                </div>
              </Col>
              <Col lg={3} sm={6} xs={6}>
                <div className="footer-list">
                  <h5>Company Info</h5>
                  <ul>
                    <li>
                      <Link to="/about-us">AboutUs</Link>
                    </li>
                    <li>
                      <Link to="/contact">{strings.contactUs}</Link>
                    </li>
                    {/* <li>
                      <Link to="/service">Customer Services</Link>
                    </li> */}
                    <li>
                      <Link to="/blog">{strings.blog}</Link>
                    </li>
                    <li>
                      <Link to="/help-faqs">{strings.helpandFAQs}</Link>
                    </li>
                    <li>
                      <Link to="/privacy-policy">{strings.privacypolicy}</Link>
                    </li>
                    <li>
                      <Link to="/disclaimer">Disclaimer</Link>
                    </li>
                    <li>
                      <Link to="/testimonials">Testimonials</Link>
                    </li>
                  </ul>
                </div>
              </Col>
              <Col lg={3} sm={6} xs={6}>
                <div className="footer-list">
                  <h5>Contact Us</h5>
                  <ul>
                    <li>
                      <Link to="https://accounts.google.com/v3/signin/identifier?continue=https%3A%2F%2Fmyaccount.google.com%2Femail&followup=https%3A%2F%2Fmyaccount.google.com%2Femail&ifkv=AXo7B7Xm-1RBYi8bBLAiZ5QxsIe8sy0uR4DDsBI5-wCY2jT0YmZ0XyP6ueHOjBTxAEja4ZXnyp6_&osid=1&passive=1209600&service=accountsettings&flowName=GlifWebSignIn&flowEntry=ServiceLogin&dsh=S285245534%3A1692185345192690">
                        <i className="fa fa-envelope-o" />{" "}
                        support@canineproducts.in
                      </Link>
                    </li>
                    <li>
                      <Link to="tel:7700019949">
                        <i className="fa fa-phone" /> +91-7700019949
                      </Link>
                    </li>
                    <li>
                      {/* <a
                        aria-label="Chat on WhatsApp"
                        href="https://wa.me/7045883457"
                      >
                        <WhatsAppWidget />
                      </a> */}
                      <Link to="https://wa.me/7045883457">
                        {/* <i className="fa fa-commenting-o" /> */}
                        <WhatsAppWidget />
                      </Link>
                    </li>
                  </ul>
                </div>
              </Col>
              <Col lg={3} sm={6} xs={6}>
                <div className="footer-list">
                  <h5>Download The Apps</h5>
                  <ul>
                    <div className="d-flex">
                    <li >
                      <Link to="https://play.google.com/store/games?device=windows">
                        <img src={app1} />
                      </Link>
                    </li>
                    <li>
                      <Link to="https://www.apple.com/in/">
                        <img src={app2} />
                      </Link>
                    </li>
                    </div>
                    <li className="social-media web-social">
                      <span>Follow Us On</span>
                      <Link
                        onClick={(e) =>
                          linknewwindonopne(
                            "https://www.facebook.com/canineproductsretail/"
                          )
                        }
                      >
                        <BiLogoFacebookCircle />
                      </Link>
                      <Link to="https://twitter.com/">
                        <BiLogoTwitter />
                      </Link>
                      <Link to="https://www.instagram.com/">
                        <BiLogoInstagramAlt />
                      </Link>
                    </li>
                    <li className="cardpay web-social">
                      <Link>
                        <img src={Paycard1} />
                      </Link>
                      <Link>
                        <img src={Paycard2} />
                      </Link>
                      <Link>
                        <img src={Paycard3} />
                      </Link>
                      <Link>
                        <img src={Paycard4} />
                      </Link>
                      <Link>
                        <img src={Paycard5} />
                      </Link>
                      <Link>
                        <img src={Paycard6} />
                      </Link>
                      <Link>
                        <img src={Paycard7} />
                      </Link>
                    </li>
                  </ul>
                </div>
              </Col>
              <div className="footer-list mobile-social">
              <ul>
              <li className="social-media">
                      <span>Follow Us On</span>
                      <Link
                        onClick={(e) =>
                          linknewwindonopne(
                            "https://www.facebook.com/canineproductsretail/"
                          )
                        }
                      >
                        <BiLogoFacebookCircle />
                      </Link>
                      <Link to="https://twitter.com/">
                        <BiLogoTwitter />
                      </Link>
                      <Link to="https://www.instagram.com/">
                        <BiLogoInstagramAlt />
                      </Link>
                    </li>
                    <li className="cardpay">
                      <Link>
                        <img src={Paycard1} />
                      </Link>
                      <Link>
                        <img src={Paycard2} />
                      </Link>
                      <Link>
                        <img src={Paycard3} />
                      </Link>
                      <Link>
                        <img src={Paycard4} />
                      </Link>
                      <Link>
                        <img src={Paycard5} />
                      </Link>
                      <Link>
                        <img src={Paycard6} />
                      </Link>
                      <Link>
                        <img src={Paycard7} />
                      </Link>
                    </li>
              </ul>
        </div>
            </Row>
          </Container>
        </div>
      </footer>
    </>
  );
}

export default Footer;
