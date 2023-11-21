import React, { useEffect, useState } from "react";
import Newheader from "../../directives/newheader";
import Footer from "../../directives/footer";
import { Col, Container, Row } from "react-bootstrap";
import { BASE_URL } from "../../Constant/Index";
import axios from "axios";
import productdetail from "../../assets/images/banner/productdetail.png";
import loadinggif from "../../assets/images/video/loading.gif";
import { Link } from "react-router-dom";

function Termsofuse() {

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
            <Newheader />
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
            <h1 className='text-center'><strong>Terms of use</strong></h1>
              <div>
             <p>Canineproducts.in (Website) is an online pet retail store which is operated and managed by Alif Store. Our head office is in Crawford Market Mumbai 400001. By using the website, you are deemed to accept the terms and conditions which are listed below:</p>
<p>You shall not host, upload, display, modify, transmit, update, publish, or share any information which:</p>
             
             <p>a)      mistreat, defame, harass, intimidate, stalk, or otherwise infringe the legal rights of others;</p>
              <p>b)      is ambiguous in any way;</p>
              <p>c)      has harmful, blasphemous, offensive, obscene, indecent, or racial topic, name, information or material;</p>
              <p>d)     contains software or other material, intellectual property rights of which are owned by someone else unless you have received all necessary consents;</p>
              <p>e)      encourages illegal activities;</p>
              
              <p>f)       violates the rights of any third party. These rights may include (but not limited to) rights of privacy, intellectual property rights, or rights of publicity;</p>
              <p>g)      involves violation of any code of conduct or other guidelines (applicable for or to any particular service);</p>
              <p>h)      contains viruses, any computer code or program that may damage the Website’s, or any other computer’s, operations;</p>
              
              <p>i)        offers material that takes advantage of people in a sexual, brutal or otherwise inappropriate way or ask for personal information from anyone;</p>
              
              <p>j)        offers instructional information about activities which are against the law such as creating or buying illegal arms, violating someone’s privacy, or creating computer viruses;</p>
              <p>k)      invites people for gambling or engages them in any gambling activity which We, in our sole discretion, believe is or could be understood as illegal;</p>
              <p>l)        violates any current law;</p>
              
              <p>m)    is a threat to the integrity, unity, defence, sovereignty or security of India, public order, relations of India with foreign states; or causes provocation to the commission of any perceptible offence or prevents the investigation of any offence or is abusive to any other country.</p>
              <p>You can’t use, copy or store any content of this Website, in whole or in part, for commercial purpose without the explicit permission of Canine Products;</p>
              <p>Canine Products is committed to provide the best prices possible on its products to its users. However, there is no such guarantee that the price will be the lowest in the town, region or geography. Prices and accessibility are subject to change without notice or any significant legal responsibility on the Canine Products;</p>
              <p>You shall not try to gain unlawful right to use of any portion or feature of the Website, or any other systems or networks connected to the Website or to any server, computer, network, or to any of the services offered on or through the Website, by hacking, password "mining" or any other illegitimate means.</p>
              
              <p>You shall not use any "deep-link", "page-scrape", "robot", "spider" or other automatic device, program, algorithm or methodology, or any alike manual process, to get the right to use, obtain, copy or monitor any part of the website or any content, or in any way replicate or get around the navigational structure or presentation of the Website or any Content, to get or attempt to get any materials, documents or information through any way not deliberately made available through the Website. Canine Products reserves all rights to block any such action.</p>
              <p>If you deal with the advertisers which you have found through our website, only you will be responsible for your dealings. We are in no means responsible for your issues such as participation in promotions of the advertisers which you found through us or for payment, delivery, terms and warranties of related products with the online advertisers. Canine Products shall not be legally responsible for any loss which incur as a result of your dealings with online advertisers.</p>
              <p>You agree and undertake not to reverse engineer, manipulate, distribute, broadcast, exhibit, carry out, replicate, bring out, create derivative works from, move, or sell any information or software which you have obtained from the canineproducts.in</p>
            
            <p>However, you can reproduce and copy the content of the Website, to a limited extent, with a condition that you have to state Canine Products name as the source. Prior written permission also needs to be taken. We make it clear that limitless reproduction, copying of the website’s content for money-making or non-commercial purposes is not permitted. Unauthorised modification of data and information within the content of the Website is also not permitted.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
        </>)}
            <Footer />
        </>
    )
}

export default Termsofuse