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

function Petshopfooter() {
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
                      <Link to="/petshopdeliverydetails">
                        {strings.deliveryDeatils}
                      </Link>
                    </li>
                    <li>
                      <Link to="/petshopinternationalshipping">
                        {strings.internationalShipping}
                      </Link>
                    </li>
                    <li>
                      <Link to="/petshoppaymentoptionfooter">{strings.paymentOption}</Link>
                    </li>
                    <li>
                      <Link to="/petshoptrackyourorde">
                        {strings.trackYourOrder}
                      </Link>
                    </li>
                    <li>
                      <Link to="/petshopreturnpolicy">Return Policy</Link>
                    </li>
                    <li>
                      <Link to="/petshopfindastore">{strings.findaStore}</Link>
                    </li>
                  </ul>
                </div>
              </Col>
              <Col lg={3} sm={6}>
                <div className="footer-list">
                  <h5>Information</h5>
                  <ul>
                    <li>
                      <Link to="/petshopaboutus">AboutUs</Link>
                    </li>
                    <li>
                      <Link to="/petshophelpandfaqs">{strings.helpandFAQs}</Link>
                    </li>
                    <li>
                      <Link to="">Products</Link>
                    </li>
                    <li>
                      <Link to="">{strings.blog}</Link>
                    </li>
                  </ul>
                </div>
              </Col>
              <Col lg={3} sm={6}>
                <div className="footer-list">
                  <h5>Conta ct Us</h5>
                  <ul>
                    <li>
                      <Link to="https://accounts.google.com/v3/signin/identifier?continue=https%3A%2F%2Fmyaccount.google.com%2Femail&followup=https%3A%2F%2Fmyaccount.google.com%2Femail&ifkv=AXo7B7Xm-1RBYi8bBLAiZ5QxsIe8sy0uR4DDsBI5-wCY2jT0YmZ0XyP6ueHOjBTxAEja4ZXnyp6_&osid=1&passive=1209600&service=accountsettings&flowName=GlifWebSignIn&flowEntry=ServiceLogin&dsh=S285245534%3A1692185345192690">
                        <i className="fa fa-envelope-o" /> support@canineproducts.in
                      </Link>
                    </li>
                    <li>
                      <Link to="tel:0987654321">
                        <i className="fa fa-phone" /> +91-0987654321
                      </Link>
                    </li>
                    <li>
                      <Link to="https://www.whatsapp.com/">
                        {/* <i className="fa fa-commenting-o" /> */}
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
                    <Link to="https://play.google.com/store/games?device=windows">
                        <img src={app1} />
                      </Link>
                    </li>
                    <li>
                      <Link to="https://www.apple.com/in/">
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

export default Petshopfooter;
