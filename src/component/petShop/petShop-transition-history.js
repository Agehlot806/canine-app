import React from "react";
import cart from "../../assets/images/icon/cart.png";
import Wholesallerfooter from "../../directives/wholesaller-Footer";
import PetShopHeader from "../../directives/petShopHeader";

const PetshopTransitionHistory = () => {
  return (
    <>
      <PetShopHeader />

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
      <Wholesallerfooter />
    </>
  );
};
export default PetshopTransitionHistory;
