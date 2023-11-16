import React, { useEffect, useState } from "react";
import cart from "../../assets/images/icon/cart.png";
import { Col, Container, Row } from "react-bootstrap";
import { BASE_URL } from "../../Constant/Index";
import axios from "axios";
import productdetail from "../../assets/images/banner/productdetail.png";
import PetShopHeader from "../../directives/petShopHeader";
import Petshopfooter from "../../directives/petShop-Footer";
import loadinggif from "../../assets/images/video/loading.gif";


const Petshopdeliverydetails = () => {
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
      <PetShopHeader />
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
          <img src={productdetail} />
        </div>
      </Container>
      <section className="section-padding">
        <Container>
          <Row>
            <Col lg={12}>

            
            <h1 className="main-head">Shipping/Delivery</h1>
                  <div>
                    <h5>Shipping Rules or Tracking Details</h5>
                    <p>
                      The shipment details - "Tracking Number" is shared once the parcel / article is dispatched by any of the logistics partner. The details once put on our admin portal shows the term "complete" to the customer. The customer will then receive an email registered with us and a SMS on the mobile number stating that the order is complete. The term "complete" is referred as the shipment is fulfilled; it should be not considered as the final delivery done by the logistic partner.
                      Most articles / parcels reach within 6-7 working days depending upon their location. If at all the article is not received within the stipulated timeframe, please get in touch with us on our WhatsApp number or email us.

                    </p>
                    <p>We will assume that once the tracking details is shared customer should regularly check the status on the respective logistics partner website and are always welcomed to get in touch with us if the shipment is on hold, undelivered, wrong information, delay in delivering etc. We will try our level best to solve the issue as soon as possible.</p>
                    <h5>Delivery Charges</h5>
                    <p>Canine Products provides FREE shipping of all items if the total amount of your purchase exceeds Rs. 999 or more. If total amount of your purchases is less than Rs. 999 then a nominal shipping charge of Rs. 49 is applicable.</p>
                    <h5>Delivery Period</h5>
                    <p>The estimated delivery period of every product is different. We also sell a wide range of imported goods which comes with a delivery marker of ‘Delivery more than 6-7 working days’. In such a scenario, we procure the goods from international markets and then ship the product once it’s available to our warehouses. Such a delivery marker may also be an indication that the particular product is expected at our warehouses shortly and shall be dispatched immediately.</p>
                    <p>You can also pre-order a product from our website. Usually newly launched products that face a scarcity of stocks are categorised under pre-order. A delivery marker may not be necessarily featured alongside the product, but they read an ‘Expected Availability’ date. Once the products arrive at our warehouses, we dispatch them immediately. Pre-orders will be given the preference of ‘first-cum-first-serve’ basis. Delivery of such products can vary between 1 to 2 weeks.</p>


                  </div>

          </Col>
          </Row>
        </Container>
      </section>
        </>
      )}
      
      <Petshopfooter />
    </>
  );
};

export default Petshopdeliverydetails;