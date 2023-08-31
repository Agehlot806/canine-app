import React from "react";
import "./assets/css/style.css";
import "./assets/css/responsive.css";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Home from "./component/User/home";
import Aboutus from "./component/User/about-us";
import Service from "./component/User/service";
import Product from "./component/User/product";
import Productdetail from "./component/User/product-detail";
import Contact from "./component/User/contact";
import Canineproduct from "./component/User/canine-product";
import Patnersproduct from "./component/User/patners-product";
import Veterinaryservice from "./component/User/veterinary-service";
import Addcart from "./component/User/addcart";
import Servicedate from "./component/User/service-date";
import Shopbybrand from "./component/User/shop-by-brand";
import Ourourbrand from "./component/User/our-our-brand";
import Productbypartner from "./component/User/product-by-partner";
import WholesellerProductbypartner from "./component/wholeseller/wholeseller-productbypartner";
import Productpartnershop from "./component/User/product-partner-shop";
import Ourbrand from "./component/User/our-brand";
import Petcategory from "./component/User/pet-category";
import Login from "./component/AllUser/login";
import Otherlogin from "./component/AllUser/other-login";
import Otp from "./component/AllUser/otp";
import Partners from "./component/AllUser/partners";
import Salesman from "./component/AllUser/salesman";
import Signup from "./component/AllUser/signup";
import WholeSellerPetcategory from "./component/wholeseller/wholeseller-pet-category";
import WholesellerContact from "./component/wholeseller/wholeseller-contact";
import WholesellerHome from "./component/wholeseller/wholeseller-home";
import Wholesellerdashboard from "./component/wholeseller/wholeseller-dashboard";
import WholesellerTransitionHistory from "./component/wholeseller/wholeseller-transition-history";
import Wholesellerproduct from "./component/wholeseller/wholeseller-product";
import WholesellerproductDetails from "./component/wholeseller/wholeseller-productDetails";
import WholesellerAddCart from "./component/wholeseller/wholeseller-add-cart";
import WholesellerPaymentMethod from "./component/wholeseller/wholeseller-paymentMethod";
import Wholesellerpay from "./component/wholeseller/wholeseller-pay";
import DashboadSalesman from "./component/Salesman/dashboardSalesman";
import Partnerdashboard from "./component/Partner/partner-dashboard";
import Planbuy from "./component/Partner/planbuy";
import Partnercard from "./component/Partner/partner-card";
import Pay from "./component/Partner/pay";
import Serviceaddpet from "./component/User/service-add-pet";
import Servicepet from "./component/User/service-pet";
import Userpaymethod from "./component/User/user-pay-method";
import Map from "./component/User/track-your-order";
import SalesmanaddProduct from "./component/Salesman/salesman-add-product";
import SalesmanProductdetail from "./component/Salesman/salesman-product-details";
import SalesmanAddcart from "./component/Salesman/salesman-add-cart";
import Wholeseller from "./component/wholeseller/wholeseller-login";
import WholesellerSignUp from "./component/wholeseller/wholeseller-signup";
import Catcategory from "./component/User/cat-category";
import Allveterinary from "./component/User/all-veterinary";
import Allservicebooking from "./component/User/all-service-booking";
import Petprofile from "./component/User/pet-profile";
import Wishlistproduct from "./component/User/wishlist-product";
import WholesellerWishlistproduct from "./component/wholeseller/wholeseller-wishlist-product";
import Shopbybrandlist from "./component/User/shop-by-brand-list";
import Blog from "./component/User/blog";
import Updateprofile from "./component/User/update-profile";
import Blogdetails from "./component/User/blog-details";
import Deliverydetails from "./component/User/delivery-details";
import Internationalshipping from "./component/User/international-shipping";
import Trackyourorder from "./component/User/track-your-order";
import Findastore from "./component/User/find-a-store";
import Offersdetails from "./component/User/offers-details";
import Helpandfaqs from "./component/User/help-faqs";
import Shipping from "./component/User/shipping";
import WholeSellerShipping from "./component/wholeseller/wholeseller-shipping";
import WholeSellerPayLater from "./component/wholeseller/wholeseller-paylater";
import Returnpolicy from "./component/User/return-policy";
import Paymentoption from "./component/User/payment-option";
import Myorder from "./component/User/my-order";
import WholesellerMyorder from "./component/wholeseller/wholeseller-my-orders";
import WholeSellerUpdateprofile from "./component/wholeseller/wholeseller-update-profile";
import Orderviewdetails from "./component/User/order-view-details";
import SalesmanLogin from "./component/Salesman/SalesmanLogin";
import Partneroneshop from "./component/User/partner-oneshop";
import Wholesallerfooter from "../src/directives/wholesaller-Footer";
import Wholesallerdeliverydetails from "./component/wholeseller/wholesaller-Delivery-details";
import Wholesallerinternationalshipping from "./component/wholeseller/wholesaller-International-shipping";
import Wholesallerpaymentoptionfooter from "./component/wholeseller/wholesaller-payment-footer";
import Wholesallertrackyourorder from "./component/wholeseller/wholesaller-tractYourOrder";
import Wholesallerreturnpolicy from "./component/wholeseller/wholesaller-return-policy";
import Wholesallerfindastore from "./component/wholeseller/wholesaller-Find-a-store";
import Wholesalleraboutus from "./component/wholeseller/wholesaller-about-us";
import Wholesallerhelpandfaqs from "./component/wholeseller/wholesaller-Help&Faqs";
import WholesalerOrderviewdetails from "./component/wholeseller/wholesaler-order-view-details";

// ScrollToTop component
const ScrollToTop = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <div className="cursor-area">
      <BrowserRouter>
        <ScrollToTop /> {/* Add ScrollToTop component here */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<Aboutus />} />
          <Route path="/service" element={<Service />} />
          <Route path="/product" element={<Product />} />
          <Route path="/product-details/:id" element={<Productdetail />} />
          <Route path="/canine-product" element={<Canineproduct />} />
          <Route path="/patners-product" element={<Patnersproduct />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/veterinary-service" element={<Veterinaryservice />} />
          <Route path="/add-cart/:id" element={<Addcart />} />
          <Route path="/service-date/:id" element={<Servicedate />} />
          <Route path="/service-add-pet/:id" element={<Serviceaddpet />} />
          <Route path="/pet-profile/" element={<Petprofile />} />
          <Route path="/service-pet" element={<Servicepet />} />
          <Route path="/our-brand" element={<Ourbrand />} />

          <Route path="/our-our-brand/:id" element={<Ourourbrand />} />
          <Route path="/shop-by-brand" element={<Shopbybrand />} />
          <Route path="/shop-by-brand-list/:id" element={<Shopbybrandlist />} />
          <Route path="/product-by-partner" element={<Productbypartner />} />

          <Route
            path="/product-partner-shop/:id"
            element={<Productpartnershop />}
          />
          <Route path="/product-partner-Oneshop" element={<Partneroneshop />} />
          <Route path="/shipping/:id" element={<Shipping />} />

          <Route path="/user-pay-method" element={<Userpaymethod />} />
          <Route path="/map" element={<Map />} />
          <Route path="/pet-category/:name/:id" element={<Petcategory />} />
          <Route path="/cat-category" element={<Catcategory />} />
          <Route path="/all-veterinary" element={<Allveterinary />} />
          <Route path="/all-service-booking" element={<Allservicebooking />} />
          <Route path="/wishlist-products" element={<Wishlistproduct />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog-details/:id" element={<Blogdetails />} />
          <Route path="/update-profile" element={<Updateprofile />} />
          {/* useful links footer */}
          <Route path="/delivery-details" element={<Deliverydetails />} />
          <Route path="/return-policy" element={<Returnpolicy />} />

          <Route
            path="/international-shipping"
            element={<Internationalshipping />}
          />
          <Route path="/payment-options" element={<paymentOptions />} />
          <Route path="/track-your-order/:id" element={<Trackyourorder />} />
          <Route path="/find-a-store" element={<Findastore />} />
          <Route path="/offers-details" element={<Offersdetails />} />
          <Route path="/payment-option" element={<Paymentoption />} />

          <Route path="/help-faqs" element={<Helpandfaqs />} />
          <Route path="/my-orders" element={<Myorder />} />

          {/* All Login Users */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/other-login" element={<Otherlogin />} />
          <Route path="/wholeseller-login" element={<Wholeseller />} />
          <Route path="/wholeseller-signup" element={<WholesellerSignUp />} />

          <Route path="/otp" element={<Otp />} />
          <Route path="/partners-login" element={<Partners />} />
          <Route path="/salesman-signup" element={<Salesman />} />

          {/* Wholeseller flow  */}
          <Route
            path="/wholeseller-dashboard"
            element={<Wholesellerdashboard />}
          />
          <Route
            path="/wholeseller-pet-category/:name/:id"
            element={<WholeSellerPetcategory />}
          />
          <Route
            path="/wholeseller-my-orders"
            element={<WholesellerMyorder />}
          />
          <Route
            path="/wholeseller-update-profile"
            element={<WholeSellerUpdateprofile />}
          />
          <Route
            path="/wholeseller-wishlist-product"
            element={<WholesellerWishlistproduct />}
          />
          <Route
            path="/wholeseller-productDetails/:id"
            element={<WholesellerproductDetails />}
          />
          <Route path="/wholeseller-contact" element={<WholesellerContact />} />
          <Route
            path="/wholeseller-transition-history"
            element={<WholesellerTransitionHistory />}
          />
          <Route path="/wholeseller-product" element={<Wholesellerproduct />} />
          <Route
            path="/wholeseller-product-details/:id"
            element={<WholesellerproductDetails />}
          />
          <Route path="/wholeseller-home" element={<WholesellerHome />} />
          <Route
            path="/wholeseller-product-by-partner"
            element={<WholesellerProductbypartner />}
          />
          <Route
            path="/wholeseller-add-cart/:id"
            element={<WholesellerAddCart />}
          />
          <Route
            path="/wholeseller-payment-method"
            element={<WholesellerPaymentMethod />}
          />
          <Route path="/wholeseller-pay" element={<Wholesellerpay />} />
          <Route
            path="/wholeseller-shipping/:id"
            element={<WholeSellerShipping />}
          />
          <Route
            path="/wholeseller-paylater/:id"
            element={<WholeSellerPayLater />}
          />
          <Route
            path="/order-view-details/:id"
            element={<Orderviewdetails />}
          />
          <Route
            path="/wholesaler-order-view-details/:id"
            element={<WholesalerOrderviewdetails />}
          />

          {/* wholesaller Footer  */}
          <Route path="/wholesallerfooter" element={<Wholesallerfooter />} />
          <Route
            path="/wholesallerdeliverydetails"
            element={<Wholesallerdeliverydetails />}
          />
          <Route
            path="/wholesallerinternationalshipping"
            element={<Wholesallerinternationalshipping />}
          />
          <Route
            path="/wholesallerpaymentoptionfooter"
            element={<Wholesallerpaymentoptionfooter />}
          />
          <Route
            path="/wholesallertrackyourorde"
            element={<Wholesallertrackyourorder />}
          />
          <Route
            path="/wholesallerreturnpolicy"
            element={<Wholesallerreturnpolicy />}
          />
          <Route
            path="/wholesallerfindastore"
            element={<Wholesallerfindastore />}
          />
          <Route path="/wholesalleraboutus" element={<Wholesalleraboutus />} />
          <Route
            path="/wholesallerhelpandfaqs"
            element={<Wholesallerhelpandfaqs />}
          />

          {/* Sales Man flow  */}
          <Route path="/salesman-login" element={<SalesmanLogin />} />
          <Route path="/salesman-dashboad" element={<DashboadSalesman />} />
          <Route
            path="/salesman-add-product"
            element={<SalesmanaddProduct />}
          />
          <Route
            path="/salesman-product-details"
            element={<SalesmanProductdetail />}
          />
          <Route path="/salesman-add-cart" element={<SalesmanAddcart />} />

          {/* partners flow  */}
          <Route path="/partner-dashboad" element={<Partnerdashboard />} />
          <Route path="/plan-buy" element={<Planbuy />} />
          <Route path="/partner-card" element={<Partnercard />} />
          <Route path="/pay" element={<Pay />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
