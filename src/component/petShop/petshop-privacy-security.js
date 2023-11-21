import React, { useEffect, useState } from "react";
import PetShopHeader from "../../directives/petShopHeader";
import Petshopfooter from '../../directives/petShop-Footer';
import { Col, Container, Row } from "react-bootstrap";
import { BASE_URL } from "../../Constant/Index";
import axios from "axios";
import productdetail from "../../assets/images/banner/productdetail.png";
import loadinggif from "../../assets/images/video/loading.gif";
import { Link } from "react-router-dom";

function PetshopPrivacysecurity() {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
    //   fetchrefund()
    ])
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);


    return (
        <>
            <PetShopHeader />
             {loading ? (
        <section className="section-padding mt-3 mb-3">
          <div className="loaderimg text-center text-black mb-4">
            <img src={loadinggif} alt="" />
            <h5>Please Wait.......</h5>
          </div>
        </section>) : (<>
          <Container fluid className="p-0">
            <div className="all-bg">
              <img src={productdetail} />
            </div>
          </Container>
          <section className='section-padding'>
        <Container>
          <Row className="justify-content-center">
            <Col lg={9}>
            <h1 className='text-center'><strong>Privacy & Security</strong></h1>
              <div>
              <p>Canineproducts.in will only disclose your Personal Information in accordance with this Privacy Policy. If you decline to submit personal information to us, then we will unfortunately not be in a position to provide the Services to you.</p>
              <p>Any of your information which you provide when you use Canineproducts.in in an unencrypted manner and/or to an open, public environment or forum including (without limitation) any blog, chat room, albums, community, classifieds or discussion board, is not confidential, does not constitute Personal Information, and is not subject to protection under Privacy & Security Policy.</p>
              <p>
              Since such public environments are accessible by third parties, it is possible that third parties may collect and collate and use such information for their own purposes. You should accordingly be careful when deciding to share any of your Personal Information in such public environments.
              </p>
<p>Canineproducts.in is not liable to you or any third party for any damages that you or any third party may suffer howsoever arising from your disclosure of Personal Information in any public environment. You accordingly disclose information in a public environment at your own risk.</p>
<h5>Contacting Us</h5>
<p>If there are any questions regarding this privacy & security policy you may contact us using the information below:</p>
<p>215, Sheriff Devji Street, <br/>
Behind Petrol Pump Lane, <br/>
Chakla, Mumbai, <br/>
Maharashtra 400003 <br/>
Mobile: 98707 80224 <br/>
Email:  <Link to="https://accounts.google.com/v3/signin/identifier?continue=https%3A%2F%2Fmyaccount.google.com%2Femail&followup=https%3A%2F%2Fmyaccount.google.com%2Femail&ifkv=AXo7B7Xm-1RBYi8bBLAiZ5QxsIe8sy0uR4DDsBI5-wCY2jT0YmZ0XyP6ueHOjBTxAEja4ZXnyp6_&osid=1&passive=1209600&service=accountsettings&flowName=GlifWebSignIn&flowEntry=ServiceLogin&dsh=S285245534%3A1692185345192690">
                         support@canineproducts.in
                      </Link>
</p>


              </div>
            </Col>
          </Row>
        </Container>
      </section>
        </>)}
        <Petshopfooter />
        </>
    )
}

export default PetshopPrivacysecurity