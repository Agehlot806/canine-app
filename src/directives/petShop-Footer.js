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
import Paycard1 from '../assets/images/img/paycard1.png';
import Paycard2 from '../assets/images/img/paycard2.png';
import Paycard3 from '../assets/images/img/paycard3.png';
import Paycard4 from '../assets/images/img/paycard4.png';
import Paycard5 from '../assets/images/img/paycard5.png';
import Paycard6 from '../assets/images/img/paycard6.png';
import Paycard7 from '../assets/images/img/paycard7.png';
function Petshopfooter() {
  return (
    <>
      <footer className="footer-bg">
        <div className="section-padding">
          <Container>
            <Row>
              <Col lg={3} sm={6}>
                <div className="footer-list">
                  <h5>Customer Services</h5>
                  <ul>
                    <li>
                      <Link to="/petshopdeliverydetails">
                        {strings.deliveryDeatils}
                      </Link>
                    </li>
                    <li>
                      <Link to="/petshop-privacy-security">
                      Privacy & Security
                      </Link>
                    </li>
                    <li>
                      <Link to="/petshop-terms-of-use">
                      Terms of use
                      </Link>
                    </li>
                    <li>
                      <Link to="/petshop-Returns-Replacements">
                      Returns & Replacements
                      </Link>
                    </li>
                    
                    <li>
                      <Link to="/petshop-cancellation-policy">
                        {strings.trackYourOrder}
                      </Link>
                    </li>
                    <li>
                      <Link to="/petshopreturnpolicy">Return Policy</Link>
                    </li>
                    <li>
                      <Link to="/petshop-terms-and-conditions">
                      Terms & Conditions
                      </Link>
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
                      <Link to="/petshop-contact">Contact Us</Link>
                    </li>
                    <li>
                      <Link to="/petshop-blog">{strings.blog}</Link>
                    </li>
                    <li>
                      <Link to="/petshophelpandfaqs">{strings.helpandFAQs}</Link>
                    </li>
                    <li>
                      <Link to="/petshop-privacy-policy">Privacy Policy</Link>
                    </li>
                   
                    <li>
                      <Link to="/petshop-disclaimer">Disclaimer</Link>
                    </li>
                    <li>
                      <Link to="/petshop-testimonials">Testimonials</Link>
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
                    <li className="cardpay">
                      <Link><img src={Paycard1}/></Link>
                      <Link><img src={Paycard2}/></Link>
                      <Link><img src={Paycard3}/></Link>
                      <Link><img src={Paycard4}/></Link>
                      <Link><img src={Paycard5}/></Link>
                      <Link><img src={Paycard6}/></Link>
                      <Link><img src={Paycard7}/></Link>
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
