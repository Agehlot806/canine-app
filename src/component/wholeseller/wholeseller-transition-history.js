import React from "react";
import Wholeheader from "../../directives/wholesalesheader";
import Footer from "../../directives/footer";
import cart from "../../assets/images/icon/cart.png";

const WholesellerTransitionHistory = () => {
  return (
    <>
      <Wholeheader />

      {/* --------------section-------------------- */}

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
      {/* --------------footer-------------------- */}
      <Footer />
    </>
  );
};
export default WholesellerTransitionHistory;
