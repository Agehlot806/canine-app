import React from "react";
import cart from "../../assets/images/icon/cart.png";
import { Col, Container, Row } from "react-bootstrap";
import Wholesallerfooter from "../../directives/wholesaller-Footer";
import PetShopHeader from "../../directives/petShopHeader";

const Petshopfindastore = () => {
  return (
    <>
      {" "}
      <PetShopHeader />
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
      <Wholesallerfooter />
    </>
  );
};

export default Petshopfindastore;
