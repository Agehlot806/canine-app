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
                      <Link to="/delivery-details">
                        {strings.deliveryDeatils}
                      </Link>
                    </li>
                    <li>
                      <Link to="/international-shipping">
                        {strings.internationalShipping}
                      </Link>
                    </li>
                    <li>
                      <Link to="/user-pay-method">{strings.paymentOption}</Link>
                    </li>
                    <li>
                      <Link to="/track-your-order">
                        {strings.trackYourOrder}
                      </Link>
                    </li>
                    <li>
                      <Link to="/return">{strings.return}</Link>
                    </li>
                    <li>
                      <Link to="/find-a-Store">{strings.findaStore}</Link>
                    </li>
                  </ul>
                </div>
              </Col>
              <Col lg={3} sm={6}>
                <div className="footer-list">
                  <h5>Information</h5>
                  <ul>
                    <li>
                      <Link to="/careers">Careers</Link>
                    </li>
                    <li>
                      <Link to="/about-us">AboutUs</Link>
                    </li>
                    <li>
                      <Link to="/offers-details">{strings.offersDetails}</Link>
                    </li>
                    <li>
                      <Link to="/help-faqs">{strings.helpandFAQs}</Link>
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
                      <Link to="https://accounts.google.com/v3/signin/identifier?continue=https%3A%2F%2Fmyaccount.google.com%2Femail&followup=https%3A%2F%2Fmyaccount.google.com%2Femail&ifkv=AXo7B7Xm-1RBYi8bBLAiZ5QxsIe8sy0uR4DDsBI5-wCY2jT0YmZ0XyP6ueHOjBTxAEja4ZXnyp6_&osid=1&passive=1209600&service=accountsettings&flowName=GlifWebSignIn&flowEntry=ServiceLogin&dsh=S285245534%3A1692185345192690">
                        <i className="fa fa-envelope-o" /> Mail Us
                      </Link>
                    </li>
                    <li>
                      <Link to="tel:0987654321">
                        <i className="fa fa-phone" /> +91-0987654321
                      </Link>
                    </li>
                    <li>
                      <Link to="https://www.whatsapp.com/">
                        <i className="fa fa-commenting-o" />
                        <WhatsAppWidget />
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
                      <Link to="https://www.facebook.com/">
                        <BiLogoFacebookCircle />
                      </Link>
                      <Link to="https://twitter.com/">
                        <BiLogoTwitter />
                      </Link>
                      <Link to="https://www.instagram.com/">
                        <BiLogoInstagramAlt />
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
