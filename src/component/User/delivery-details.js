import React from "react";
import Newheader from "../../directives/newheader";
import Footer from "../../directives/footer";
import cart from "../../assets/images/icon/cart.png";
import { Col, Container, Row } from "react-bootstrap";

const Deliverydetails = () => {
  return (
    <>
      {" "}
      <Newheader />
      <section className="section-padding">
        <div className="Emptycart">
          <div class="d-flex justify-content-around">
            <img src={cart} />
          </div>
          <div class="d-flex justify-content-around">
            <p className="emptyMSG">Content Not Available</p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Deliverydetails;
