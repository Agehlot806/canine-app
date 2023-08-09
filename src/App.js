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
import Wholesellerdashboard from "./component/wholeseller/wholeseller-dashboard";
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
import Userpay from "./component/User/user-pay";
import Userupi from "./component/User/user-upi";
import Map from "./component/User/map";
import SalesmanaddProduct from "./component/Salesman/salesman-add-product";
import SalesmanProductdetail from "./component/Salesman/salesman-product-details";
import SalesmanAddcart from "./component/Salesman/salesman-add-cart";
import Wholeseller from "./component/AllUser/wholeseller";
import Catcategory from "./component/User/cat-category";
import Allveterinary from "./component/User/all-veterinary";
import Allservicebooking from "./component/User/all-service-booking";
import Petprofile from "./component/User/pet-profile";
import Wishlistproduct from "./component/User/wishlist-product";
import Shopbybrandlist from "./component/User/shop-by-brand-list";
import Blog from "./component/User/blog";
import Updateprofile from "./component/User/update-profile";
import Blogdetails from "./component/User/blog-details";

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
    <>
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
          <Route path="/product-partner-shop" element={<Productpartnershop />}/>
          <Route path="/user-pay-method" element={<Userpaymethod />} />
          <Route path="/user-pay" element={<Userpay />} />
          <Route path="/user-upi" element={<Userupi />} />
          <Route path="/map" element={<Map />} />
          <Route path="/pet-category/:id" element={<Petcategory />} />
          <Route path="/cat-category" element={<Catcategory />} />
          <Route path="/all-veterinary" element={<Allveterinary />} />
          <Route path="/all-service-booking" element={<Allservicebooking />} />
          <Route path="/wishlist-products" element={<Wishlistproduct />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog-details/:id" element={<Blogdetails />} />
          <Route path="/update-profile" element={<Updateprofile />} />
          


          {/* All Login Users */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/other-login" element={<Otherlogin />} />
          <Route path="/wholeseller-login" element={<Wholeseller />} />
          <Route path="/otp" element={<Otp />} />
          <Route path="/partners-login" element={<Partners />} />
          <Route path="/salesman-login" element={<Salesman />} />

          {/* Wholeseller flow  */}
          <Route
            path="/wholeseller-dashboard"
            element={<Wholesellerdashboard />}
          />
          <Route path="/wholeseller-product" element={<Wholesellerproduct />} />
          <Route
            path="/wholeseller-product-details"
            element={<WholesellerproductDetails />}
          />
          <Route
            path="/wholeseller-add-cart"
            element={<WholesellerAddCart />}
          />
          <Route
            path="/wholeseller-payment-method"
            element={<WholesellerPaymentMethod />}
          />
          <Route path="/wholeseller-pay" element={<Wholesellerpay />} />

          {/* Sales Man flow  */}
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
    </>
  );
}

export default App;
