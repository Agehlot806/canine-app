import React from "react";
import Newheader from "../../directives/newheader";
import cart from "../../assets/images/icon/cart.png";
import Wholesallerfooter from "../../directives/wholesaller-Footer";

const Wholesallerinternationalshipping = () => {
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
      <Wholesallerfooter />
    </>
  );
};

export default Wholesallerinternationalshipping;
