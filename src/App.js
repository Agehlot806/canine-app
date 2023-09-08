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
import Productpartnershop from "./component/User/product-partner-shop";
import Ourbrand from "./component/User/our-brand";
import Petcategory from "./component/User/pet-category";
import Login from "./component/AllUser/login";
import Otherlogin from "./component/AllUser/other-login";
import Otp from "./component/AllUser/otp";
import Partners from "./component/AllUser/partners";
import Salesman from "./component/AllUser/salesman";
import Signup from "./component/AllUser/signup";
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
import Catcategory from "./component/User/cat-category";
import Allveterinary from "./component/User/all-veterinary";
import Allservicebooking from "./component/User/all-service-booking";
import Petprofile from "./component/User/pet-profile";
import Wishlistproduct from "./component/User/wishlist-product";
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
import Returnpolicy from "./component/User/return-policy";
import Paymentoption from "./component/User/payment-option";
import Myorder from "./component/User/my-order";
import Orderviewdetails from "./component/User/order-view-details";
import SalesmanLogin from "./component/Salesman/SalesmanLogin";
import Partneroneshop from "./component/User/partner-oneshop";
import PetshopOrderviewdetails from "./component/petShop/petShop-order-view-details";
import Petshopaboutus from "./component/petShop/petShop-about-us";
import Petshopdeliverydetails from "./component/petShop/petShop-Delivery-details";
import Petshopfindastore from "./component/petShop/petshop-Find-a-store";
import Petshophelpandfaqs from "./component/petShop/petShop-Help&Faqs";
import Petshopinternationalshipping from "./component/petShop/petShop-International-shipping";
import Petshoppaymentoptionfooter from "./component/petShop/petShop-payment-footer";
import Petshopreturnpolicy from "./component/petShop/petShop-return-policy";
import Petshoptrackyourorder from "./component/petShop/petShop-tractYourOrder";
import PetshopAddCart from "./component/petShop/petShop-add-cart";
import PetshopContact from "./component/petShop/petShop-contact";
import Petshopdashboard from "./component/petShop/petShop-dashboard";
import PetshopHome from "./component/petShop/petShop-home";
import PetshopLogin from "./component/petShop/petShop-login";
import PetshopMyorder from "./component/petShop/petShop-my-orders";
import Petshoppay from "./component/petShop/petShop-pay";
import PetshopPayLater from "./component/petShop/petShop-paylater";
import PetshopPaymentMethod from "./component/petShop/petShop-paymentMethod";
import PetshopPetcategory from "./component/petShop/petShop-pet-category";
import Petshopproduct from "./component/petShop/petShop-product";
import PetshopProductbypartner from "./component/petShop/petShop-productbypartner";
import PetshopproductDetails from "./component/petShop/petShop-productDetails";
import PetshopShipping from "./component/petShop/petShop-shipping";
import PetshopSignUp from "./component/petShop/petShop-signup";
import PetshopTransitionHistory from "./component/petShop/petShop-transition-history";
import PetshopUpdateprofile from "./component/petShop/petShop-update-profile";
import PetshopWishlistproduct from "./component/petShop/petShop-wishlist-product";
import Petshopfooter from "./directives/petShop-Footer";
import PetShopcanineproduct from "./component/petShop/petShop-canine-product";
import PetshopBlog from "./component/petShop/petShop-blog";
import PetshopBlogdetails from "./component/petShop/petShop-blog-details";


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
          <Route path="/add-cart" element={<Addcart />} />
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
          <Route path="/petshop-login" element={<PetshopLogin />} />
          <Route path="/petshop-signup" element={<PetshopSignUp />} />

          <Route path="/otp" element={<Otp />} />
          <Route path="/partners-login" element={<Partners />} />
          <Route path="/salesman-signup" element={<Salesman />} />

          {/* Pet shop flow  */}
          <Route
            path="/petshop-dashboard"
            element={<Petshopdashboard />}
          />
          <Route
            path="/petshop-pet-category/:name/:id"
            element={<PetshopPetcategory />}
          />
          <Route path="/petshop-my-orders" element={<PetshopMyorder />} />
          <Route
            path="/petshop-update-profile"
            element={<PetshopUpdateprofile />}
          />
          <Route
            path="/petshop-wishlist-product"
            element={<PetshopWishlistproduct />}
          />
          <Route
            path="/petshop-productDetails/:id"
            element={<PetshopproductDetails />}
          />
          <Route path="/petshop-contact" element={<PetshopContact />} />
          <Route
            path="/petshop-transition-history"
            element={<PetshopTransitionHistory />}
          />
          <Route path="/petshop-product" element={<Petshopproduct />} />
          {/* <Route
            path="/petshop-product-details/:id"
            element={<PetshopproductDetails />}
          /> */}
          <Route path="/petshop-home" element={<PetshopHome />} />
          <Route
            path="/petshop-product-by-partner"
            element={<PetshopProductbypartner />}
          />
          <Route path="/petshop-add-cart/:id" element={<PetshopAddCart />} />
          <Route path="/petshop-add-cart" element={<PetshopAddCart />} />
          <Route
            path="/petshop-payment-method"
            element={<PetshopPaymentMethod />}
          />
          <Route path="/petshop-pay" element={<Petshoppay />} />
          <Route path="/petshop-shipping/:id" element={<PetshopShipping />} />
          <Route path="/petshop-paylater/:id" element={<PetshopPayLater />} />
          <Route
            path="/order-view-details/:id"
            element={<Orderviewdetails />}
          />
          <Route
            path="/petShop-order-view-details/:id"
            element={<PetshopOrderviewdetails />}
          />

          {/* Pet shop Footer  */}
          <Route path="/petshopfooter" element={<Petshopfooter />} />
          <Route
            path="/petshopdeliverydetails"
            element={<Petshopdeliverydetails />}
          />
          <Route
            path="/petshopinternationalshipping"
            element={<Petshopinternationalshipping />}
          />
          <Route
            path="/petshoppaymentoptionfooter"
            element={<Petshoppaymentoptionfooter />}
          />
          <Route
            path="/petshoptrackyourorde"
            element={<Petshoptrackyourorder />}
          />
          <Route
            path="/petshopreturnpolicy"
            element={<Petshopreturnpolicy />}
          />
          <Route path="/petshopfindastore" element={<Petshopfindastore />} />
          <Route path="/petshopaboutus" element={<Petshopaboutus />} />
          <Route path="/petshophelpandfaqs" element={<Petshophelpandfaqs />} />
          <Route path="/petshop-canine-product" element={<PetShopcanineproduct />} />
          <Route path="/petshop-blog" element={<PetshopBlog />} />
          <Route path="/petshop-blog-details/:id" element={<PetshopBlogdetails />} />


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
