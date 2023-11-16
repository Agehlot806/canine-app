import React, { useEffect, useState } from "react";
import Newheader from "../../directives/newheader";
import Footer from "../../directives/footer";
import cart from "../../assets/images/icon/cart.png";
import { Col, Container, Row } from "react-bootstrap";
import { BASE_URL } from "../../Constant/Index";
import axios from "axios";
import productdetail from "../../assets/images/banner/productdetail.png";
import loadinggif from "../../assets/images/video/loading.gif";
import Petshopheader from "../../directives/petShopHeader";
import Petshopfooter from "../../directives/petShop-Footer";


const Petshopcancellationpolicy = () => {
  const [addresslist, setAddressList] = useState([]);
  // storedUserId
  const customer_id = localStorage.getItem("userInfo");
  console.log("=======>>>>>> id", customer_id);
  let storedUserId = JSON.parse(customer_id);
  console.log("customer_id: ", customer_id);
  // ----------------------------------------

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    Promise.all([allAddressList()])
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const allAddressList = async () => {
    axios
      .get(`${BASE_URL}/customer/address/list/${storedUserId}`)
      .then((response) => {
        console.log(response);
        console.log("address list Successful");
        setAddressList(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Petshopheader />
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
          <section className="section-padding">
            <Container>
              <Row>
                <Col lg={12}>
                  <h1 className="main-head">Cancellation Policy</h1>
                  <div>
                    <p>
                    Cancellation requests can be raised only before the time we dispatch your order. Once your product has been dispatched, you can’t make a request for cancellation. If you wish to cancel your order, you can simply call our customer support and ask them to cancellation by providing the required details.

                    </p>

<p>Once we receive cancellation request, we will refund any prepaid amount according to our Refund Policy.
</p>                    <h5>IF YOUR ORDER IS CANCELED.</h5>
<p>We deeply regret the inconvenience caused due the cancellation of order. The following reasons may be after the cancellation of your product:</p>
<ul>
    <li>The product was not available with us.</li>
    <li>There was inaccuracy in pricing.</li>
    <li>Credit/Debit card information provided by you was not enough or was not accurate.</li>
</ul>

<p>We will inform you about the cancellation of the order via E-mail and SMS if your order has been cancelled. Our team will contact you for additional information if the order is cancelled due to inaccurate or less information from your side.</p>
                  </div>
                </Col>
              </Row>
            </Container>
          </section>
        </>)}

      <Petshopfooter />
    </>
  );
};

export default Petshopcancellationpolicy;
