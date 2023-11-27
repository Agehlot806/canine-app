import React from "react";
import "./assets/css/style.css";
import "./assets/css/responsive.css";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Home from "./component/User/home";
import Aboutus from "./component/User/about-us";
import Service from "./component/User/service";
import Product from "./component/User/product";
import Productdetail from "./component/User/product-detail";
import Contact from "./component/User/contact";
import Canineproduct from "./component/User/canine-product";
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
import Serviceaddpet from "./component/User/service-add-pet";
import Userpaymethod from "./component/User/user-pay-method";
import Map from "./component/User/track-your-order";
import Allveterinary from "./component/User/all-veterinary";
import Allservicebooking from "./component/User/all-service-booking";
import Petprofile from "./component/User/pet-profile";
import Wishlistproduct from "./component/User/wishlist-product";
import Shopbybrandlist from "./component/User/shop-by-brand-list";
import Blog from "./component/User/blog";
import Updateprofile from "./component/User/update-profile";
import Blogdetails from "./component/User/blog-details";
import Deliverydetails from "./component/User/delivery-details";
import Trackyourorder from "./component/User/track-your-order";
import Offersdetails from "./component/User/offers-details";
import Helpandfaqs from "./component/User/help-faqs";
import Shipping from "./component/User/shipping";
import Returnpolicy from "./component/User/return-policy";
import Myorder from "./component/User/my-order";
import Orderviewdetails from "./component/User/order-view-details";
import SalesmanLogin from "./component/Salesman/SalesmanLogin";
import Partneroneshop from "./component/User/partner-oneshop";
import PetshopOrderviewdetails from "./component/petShop/petShop-order-view-details";
import Petshopaboutus from "./component/petShop/petShop-about-us";
import Petshopdeliverydetails from "./component/petShop/petShop-Delivery-details";
import Petshopfindastore from "./component/petShop/petshop-disclaimer";
import Petshophelpandfaqs from "./component/petShop/petShop-Help&Faqs";
import Petshoppaymentoptionfooter from "./component/petShop/petshop-privacy-policy";
import Petshopreturnpolicy from "./component/petShop/petShop-return-policy";
import Petshoptrackyourorder from "./component/petShop/petShop-tractYourOrder";
import PetshopAddCart from "./component/petShop/petShop-add-cart";
import PetshopContact from "./component/petShop/petShop-contact";
import Petshopdashboard from "./component/petShop/petShop-dashboard";
import PetshopHome from "./component/petShop/petShop-home";
import PetshopLogin from "./component/petShop/petShop-login";
import PetshopMyorder from "./component/petShop/petShop-my-orders";
import PetshopPayLater from "./component/petShop/petShop-paylater";
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
import Quickview from "./component/User/quick-view";
import Notfound from "./component/Not-Found/Page-Not-Found";
import PetshopOurbrand from "./component/petShop/petShop-our-brand";
import PetshopOurourbrand from "./component/petShop/petShop-our-ourBrand";
import PetShopShopbybrand from "./component/petShop/petShop-shopbybrand";
import PetshopShopbybrandlist from "./component/petShop/petShop-shop-by-brand-list";
import SubcategoriesProduct from "./component/User/sub-categoriesProduct";
import PetShopSubcategoriesProduct from "./component/petShop/petShop-SubcategoriesProduct";
import Transitionhistory from "./component/User/transition-history";
import { PaginationProvider } from "./Context/PaginationContext";
import Privacypolicy from "./component/User/privacy-policy";
import Disclaimer from "./component/User/disclaimer";
import Testimonials from "./component/User/testimonials";
import PetshopPrivacypolicy from "./component/petShop/petshop-privacy-policy";
import PetshopDisclaimer from "./component/petShop/petshop-disclaimer";
import Petshoptestimonials from "./component/petShop/petshop-testimonials";
import { useAuth } from "./component/context/AuthContext";
import is from "date-fns/esm/locale/is/index";
import { useEffect } from "react";
import Mypetprofile from "./component/User/my-pet-profile";
import Trackyourorderps from "./component/petShop/petShop-track-your-order";
import Cancellationpolicy from "./component/User/cancellation-policy";
import Petshopcancellationpolicy from "./component/petShop/petshop-cancellationpolicy";
import TermsAndConditions from "./component/User/terms&conditions";
import PetshopTermsAndConditions from "./component/petShop/petShop-TermsAndConditions";
import Privacysecurity from "./component/User/privacy-security";
import ReturnsReplacements from "./component/User/Returns-Replacements";
import Termsofuse from "./component/User/Terms-of-use";
import PetshopPrivacysecurity from "./component/petShop/petshop-privacy-security";
import PetshopTermsofuse from "./component/petShop/petshop-Terms-of-use";
import PetshopReturnsReplacements from "./component/petShop/petshop-Returns-Replacements";
import Bedscagescarriers from "./component/User/dogHeading/beds-cages-carriers";
import CollarLeashesMore from "./component/User/dogHeading/CollarLeashesMore";
import ShampooPerfumes from "./component/User/dogHeading/ShampooPerfumes";
import TreatsChews from "./component/User/dogHeading/TreatsChews";
import Toys from "./component/User/dogHeading/Toys";
import TrainingAccessories from "./component/User/dogHeading/TrainingAccessories";
import BowlsFeeders from "./component/User/dogHeading/BowlsFeeders";
import Grooming from "./component/User/dogHeading/Grooming";
import HealthCare from "./component/User/dogHeading/HealthCare";
import DogFood from "./component/User/dogHeading/DogFood";
import CatFood from "./component/User/catHeading/CatFood";
import CatCollarLeashesMore from "./component/User/catHeading/CatCollarLeashesMore";
import CatLitterScooper from "./component/User/catHeading/CatLitterScooper";
import CatToys from "./component/User/catHeading/CatToys";
import CatTreats from "./component/User/catHeading/CatTreats";
import CatShampooPerfumes from "./component/User/catHeading/CatShampooPerfumes";
import ClothingAccessories from "./component/User/catHeading/ClothingAccessories";
import CatBowlsFeeders from "./component/User/catHeading/CatBowlsFeeders";
import CatGrooming from "./component/User/catHeading/CatGrooming";
import CatHealthCare from "./component/User/catHeading/CatHealthCare";
import CatBedsCagesScratcherCrates from "./component/User/catHeading/CatBedsCagesScratcherCrates";

// ScrollToTop component
const ScrollToTop = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const UsersRoutes = () => {
  return (
    <Routes>
      {/* All Login Users */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/other-login" element={<Otherlogin />} />
      <Route path="/otp" element={<Otp />} />
      <Route path="/signup" element={<Signup />} />
      {/* =============== User flow start routing ===================== */}

      <Route path="/" element={<Home />} />
      <Route path="/about-us" element={<Aboutus />} />
      <Route path="/service" element={<Service />} />
      <Route path="/product" element={<Product />} />
      <Route
        path="/sub-categoriesProduct/:name/:id"
        element={<SubcategoriesProduct />}
      />
      <Route path="/product-details/:id" element={<Productdetail />} />
      <Route path="/quick-view/:id" element={<Quickview />} />
      <Route path="/canine-product" element={<Canineproduct />} />
      <Route path="/contact" element={<Contact />} />
      <Route
        path="/service/veterinary-service"
        element={<Veterinaryservice />}
      />
      <Route path="/add-cart/:id" element={<Addcart />} />
      <Route path="/add-cart" element={<Addcart />} />
      <Route path="/service-date/:id" element={<Servicedate />} />
      <Route path="/service-add-pet/:id" element={<Serviceaddpet />} />
      <Route path="/pet-profile/" element={<Petprofile />} />
      <Route path="/my-pet-profile" element={<Mypetprofile />} />
      <Route path="/our-brand" element={<Ourbrand />} />

      <Route path="/our-our-brand/:id" element={<Ourourbrand />} />
      <Route path="/shop-by-brand" element={<Shopbybrand />} />
      <Route path="/shop-by-brand-list/:id" element={<Shopbybrandlist />} />
      <Route path="/product-by-partner" element={<Productbypartner />} />

      <Route
        path="/product-partner-shop/:vendor_id"
        element={<Productpartnershop />}
      />
      <Route path="/product-partner-Oneshop" element={<Partneroneshop />} />
      <Route path="/shipping/:id" element={<Shipping />} />

      <Route path="/user-pay-method" element={<Userpaymethod />} />
      <Route path="/map" element={<Map />} />
      <Route path="/pet-category/:name/:id" element={<Petcategory />} />
      <Route path="/all-veterinary" element={<Allveterinary />} />
      <Route path="/all-service-booking" element={<Allservicebooking />} />
      <Route path="/wishlist-products" element={<Wishlistproduct />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog-details/:id" element={<Blogdetails />} />
      <Route path="/update-profile" element={<Updateprofile />} />
      {/* user flow links footer */}
      <Route path="/delivery-details" element={<Deliverydetails />} />
      <Route path="/return-policy" element={<Returnpolicy />} />
      <Route path="/privacy-security" element={<Privacysecurity />} />
      <Route path="/returns-replacements" element={<ReturnsReplacements />} />
      <Route path="/terms-of-use" element={<Termsofuse />} />
      {/* <Route path="/terms-of-use" element={<Termsofuse />} /> */}
      <Route path="/privacy-policy" element={<Privacypolicy />} />
      <Route path="/disclaimer" element={<Disclaimer />} />
      <Route path="/track-your-order/:id" element={<Trackyourorder />} />
      <Route path="/track-your-order" element={<Trackyourorder />} />
      <Route path="/cancellation-policy" element={<Cancellationpolicy />} />
      <Route
        path="/petShop-track-your-order/:id"
        element={<Trackyourorderps />}
      />
      <Route path="/petShop-track-your-order" element={<Trackyourorderps />} />
      <Route path="/testimonials" element={<Testimonials />} />
      <Route path="/offers-details" element={<Offersdetails />} />

      <Route path="/help-faqs" element={<Helpandfaqs />} />
      <Route path="/my-orders" element={<Myorder />} />
      <Route
              path="/DogFood/:heading/:id"
              element={<DogFood />}
            />
       <Route
              path="/Bedscagescarriers/:heading/:id"
              element={<Bedscagescarriers />}
            />
            <Route
              path="/CollarLeashesMore/:heading/:id"
              element={<CollarLeashesMore />}
            />
             <Route
              path="/ShampooPerfumes/:heading/:id"
              element={<ShampooPerfumes />}
            />
             <Route
              path="/TreatsChews/:heading/:id"
              element={<TreatsChews />}
            />
            <Route
              path="/Toys/:heading/:id"
              element={<Toys />}
            />
             <Route
              path="/TrainingAccessories/:heading/:id"
              element={<TrainingAccessories />}
            />
             <Route
              path="/BowlsFeeders/:heading/:id"
              element={<BowlsFeeders />}
            />
             <Route
              path="/Grooming/:heading/:id"
              element={<Grooming />}
            />
            <Route
              path="/HealthCare/:heading/:id"
              element={<HealthCare />}
            />
            <Route
              path="/CatFood/:heading/:id"
              element={<CatFood />}
            />
             <Route
              path="/CatCollarLeashesMore/:heading/:id"
              element={<CatCollarLeashesMore />}
            />
            <Route
              path="/CatLitterScooper/:heading/:id"
              element={<CatLitterScooper />}
            />
            <Route
              path="/CatToys/:heading/:id"
              element={<CatToys />}
            />
             <Route
              path="/CatTreats/:heading/:id"
              element={<CatTreats />}
            />
            <Route
              path="/CatShampooPerfumes/:heading/:id"
              element={<CatShampooPerfumes />}
            />
            <Route
              path="/ClothingAccessories/:heading/:id"
              element={<ClothingAccessories />}
            />
             <Route
              path="/CatBowlsFeeders/:heading/:id"
              element={<CatBowlsFeeders />}
            />
             <Route
              path="/CatGrooming/:heading/:id"
              element={<CatGrooming />}
            />
             <Route
              path="/CatHealthCare/:heading/:id"
              element={<CatHealthCare />}
            />
             <Route
              path="/CatBedsCagesScratcherCrates/:heading/:id"
              element={<CatBedsCagesScratcherCrates />}
            />
      <Route path="/transition-history" element={<Transitionhistory />} />

      {/* =============== User flow end routing ===================== */}

      {/* Add more routes specific to the wholesaler login type */}
    </Routes>
  );
};
const WholesalerRoutes = () => {
  return (
    <Routes>
      <Route path="/petshop-login" element={<PetshopLogin />} />
      <Route path="/petshop-signup" element={<PetshopSignUp />} />
      {/* Add more routes specific to the wholesaler login type */}
      <Route path="/petshop-dashboard" element={<Petshopdashboard />} />
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
      <Route path="/petshop-our-brand" element={<PetshopOurbrand />} />
      <Route
        path="/petshop-our-Ourbrand/:id"
        element={<PetshopOurourbrand />}
      />
      <Route path="/petshop-shop-by-brand" element={<PetShopShopbybrand />} />
      <Route
        path="/petshop-shop-by-brandList/:id"
        element={<PetshopShopbybrandlist />}
      />
      <Route
        path="/petshop-productDetails/:id"
        element={<PetshopproductDetails />}
      />
      <Route
        path="/petShop-subcategoriesProduct/:name"
        element={<PetShopSubcategoriesProduct />}
      />
      <Route path="/petshop-contact" element={<PetshopContact />} />
      <Route
        path="/petshop-transition-history"
        element={<PetshopTransitionHistory />}
      />

      <Route path="/petshop-product" element={<Petshopproduct />} />
      <Route path="/petshop-home" element={<PetshopHome />} />
      <Route
        path="/petshop-product-by-partner"
        element={<PetshopProductbypartner />}
      />
      <Route path="/petshop-add-cart/:id" element={<PetshopAddCart />} />
      <Route path="/petshop-add-cart" element={<PetshopAddCart />} />
     

      <Route path="/petshop-shipping/:id" element={<PetshopShipping />} />
      <Route path="/petshop-paylater/:id" element={<PetshopPayLater />} />
      <Route path="/order-view-details/:id" element={<Orderviewdetails />} />
      <Route
        path="/petShop-order-view-details/"
        element={<PetshopOrderviewdetails />}
      />

      {/*======================== Pet shop flow start routing======================*/}

      {/*======================== Pet shop Footer start ========================*/}
      <Route path="/petshop-privacy-security" element={<PetshopPrivacysecurity />} />
      <Route path="/petshop-terms-of-use" element={<PetshopTermsofuse />} />
      <Route path="/petshop-Returns-Replacements" element={<PetshopReturnsReplacements />} />
      <Route path="/petshopfooter" element={<Petshopfooter />} />
      <Route
        path="/petshopdeliverydetails"
        element={<Petshopdeliverydetails />}
      />
      <Route path="/petshop-terms-and-conditions" element={<PetshopTermsAndConditions />} />
      <Route
        path="/petshop-privacy-policy"
        element={<PetshopPrivacypolicy />}
      />
      <Route
        path="/petshoptrackyourorde/:id"
        element={<Petshoptrackyourorder />}
      />
      <Route path="/petshoptrackyourorde" element={<Petshoptrackyourorder />} />
      <Route path="/petshopreturnpolicy" element={<Petshopreturnpolicy />} />
      <Route path="/petshop-disclaimer" element={<PetshopDisclaimer />} />
      <Route path="/petshopaboutus" element={<Petshopaboutus />} />
      <Route path="/petshophelpandfaqs" element={<Petshophelpandfaqs />} />
      <Route path="/petshop-testimonials" element={<Petshoptestimonials />} />
      <Route
        path="/petshop-canine-product"
        element={<PetShopcanineproduct />}
      />
      <Route path="/petshop-blog" element={<PetshopBlog />} />
      <Route path="/petshop-cancellation-policy" element={<Petshopcancellationpolicy />} />
      <Route
        path="/petshop-blog-details/:id"
        element={<PetshopBlogdetails />}
      />
      {/*======================== Pet shop Footer end========================*/}
    </Routes>
  );
};
const partnersRoutes = () => {
  return (
    <Routes>
      <Route path="/partners-login" element={<Partners />} />
      {/* Add more routes specific to the wholesaler login type */}
      {/*======================== partners flow start ========================*/}
      <Route path="/partner-dashboad" element={<Partnerdashboard />} />
      <Route path="/plan-buy" element={<Planbuy />} />
      {/*======================== partners flow end ========================*/}
    </Routes>
  );
};

const SalesmanRoutes = () => {
  return (
    <Routes>
      {/* Add more routes specific to the salesman login type */}
      {/*======================== Sales Man flow start ========================*/}
      <Route path="/salesman-signup" element={<Salesman />} />
      <Route path="/salesman-login" element={<SalesmanLogin />} />
      <Route path="/salesman-dashboad" element={<DashboadSalesman />} />
      {/*======================== Sales Man flow end ========================*/}
    </Routes>
  );
};

export const AuthLoading = () => {
  const { loginType, isAuthenticated } = useAuth();
  return (
    <Routes>
      {isAuthenticated ? null : (
        <>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </>
      )}
    </Routes>
  );
};

const App = () => {
  useEffect(() => {
    const type = localStorage.getItem("loginType");
    console.log("type", type);
  }, []);
  return (
    <div
      className="cursor"
      // className="dog-paw-cursor/"
    >
      <PaginationProvider>
        <BrowserRouter>
          <ScrollToTop /> {/* Add ScrollToTop component here */}
          {}
          <Routes>
            {/* =============== User flow start routing ===================== */}

            <Route path="/" element={<Home />} />
            <Route path="/about-us" element={<Aboutus />} />
            <Route path="/service" element={<Service />} />
            <Route path="/product" element={<Product />} />
            <Route
              path="/sub-categoriesProduct/:name/:id"
              element={<SubcategoriesProduct />}
            />
            <Route path="/product-details/:id" element={<Productdetail />} />
            <Route path="/quick-view/:id" element={<Quickview />} />
            <Route path="/canine-product" element={<Canineproduct />} />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="/service/veterinary-service"
              element={<Veterinaryservice />}
            />
            <Route path="/add-cart/:id" element={<Addcart />} />
            <Route path="/add-cart" element={<Addcart />} />
            <Route path="/service-date/:id" element={<Servicedate />} />
            <Route path="/service-add-pet/:id" element={<Serviceaddpet />} />
            <Route path="/pet-profile/" element={<Petprofile />} />
            <Route path="/my-pet-profile" element={<Mypetprofile />} />
            <Route path="/our-brand" element={<Ourbrand />} />

            <Route path="/our-our-brand/:id" element={<Ourourbrand />} />
            <Route path="/shop-by-brand" element={<Shopbybrand />} />
            <Route
              path="/shop-by-brand-list/:id"
              element={<Shopbybrandlist />}
            />
            <Route path="/product-by-partner" element={<Productbypartner />} />

            <Route
              path="/product-partner-shop/:id"
              element={<Productpartnershop />}
            />
            <Route
              path="/product-partner-Oneshop"
              element={<Partneroneshop />}
            />
            <Route path="/shipping/:id" element={<Shipping />} />

            <Route path="/user-pay-method" element={<Userpaymethod />} />
            <Route path="/map" element={<Map />} />
            <Route path="/pet-category/:name/:id" element={<Petcategory />} />
            <Route path="/all-veterinary" element={<Allveterinary />} />
            <Route
              path="/all-service-booking"
              element={<Allservicebooking />}
            />
            <Route path="/wishlist-products" element={<Wishlistproduct />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog-details/:id" element={<Blogdetails />} />
            <Route path="/update-profile" element={<Updateprofile />} />
            {/* user flow links footer */}
            <Route path="/privacy-security" element={<Privacysecurity />} />
            <Route path="/terms-of-use" element={<Termsofuse />} />
            <Route path="/returns-replacements" element={<ReturnsReplacements />} />
            <Route path="/delivery-details" element={<Deliverydetails />} />
            <Route path="/return-policy" element={<Returnpolicy />} />
            <Route path="/terms-&-conditions" element={<TermsAndConditions />} />
            <Route path="/privacy-policy" element={<Privacypolicy />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
            <Route path="/track-your-order/:id" element={<Trackyourorder />} />
            <Route path="/track-your-order" element={<Trackyourorder />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/offers-details" element={<Offersdetails />} />
            <Route path="/cancellation-policy" element={<Cancellationpolicy />} />

            <Route path="/help-faqs" element={<Helpandfaqs />} />
            <Route path="/my-orders" element={<Myorder />} />
            <Route
              path="/DogFood/:heading/:id"
              element={<DogFood />}
            />
            <Route
              path="/Bedscagescarriers/:heading/:id"
              element={<Bedscagescarriers />}
            />
             <Route
              path="/CollarLeashesMore/:heading/:id"
              element={<CollarLeashesMore />}
            />
             <Route
              path="/ShampooPerfumes/:heading/:id"
              element={<ShampooPerfumes />}
            />
             <Route
              path="/TreatsChews/:heading/:id"
              element={<TreatsChews />}
            />
              <Route
              path="/Toys/:heading/:id"
              element={<Toys />}
            />
             <Route
              path="/TrainingAccessories/:heading/:id"
              element={<TrainingAccessories />}
            />
             <Route
              path="/BowlsFeeders/:heading/:id"
              element={<BowlsFeeders />}
            />
             <Route
              path="/Grooming/:heading/:id"
              element={<Grooming />}
            />
             <Route
              path="/HealthCare/:heading/:id"
              element={<HealthCare />}
            />
             <Route
              path="/CatFood/:heading/:id"
              element={<CatFood />}
            />
            <Route
              path="/CatCollarLeashesMore/:heading/:id"
              element={<CatCollarLeashesMore />}
            />
             <Route
              path="/CatLitterScooper/:heading/:id"
              element={<CatLitterScooper />}
            />
             <Route
              path="/CatToys/:heading/:id"
              element={<CatToys />}
            />
            <Route
              path="/CatTreats/:heading/:id"
              element={<CatTreats />}
            />
            <Route
              path="/CatShampooPerfumes/:heading/:id"
              element={<CatShampooPerfumes />}
            />
            <Route
              path="/ClothingAccessories/:heading/:id"
              element={<ClothingAccessories />}
            />
             <Route
              path="/CatBowlsFeeders/:heading/:id"
              element={<CatBowlsFeeders />}
            />
            <Route
              path="/CatGrooming/:heading/:id"
              element={<CatGrooming />}
            />
             <Route
              path="/CatHealthCare/:heading/:id"
              element={<CatHealthCare />}
            />
            <Route
              path="/CatBedsCagesScratcherCrates/:heading/:id"
              element={<CatBedsCagesScratcherCrates />}
            />
            <Route path="/transition-history" element={<Transitionhistory />} />

            {/*  =============== User flow end routing ===================== */}

            {/* All Login Users */}
            <Route path="/login" element={<Login />} />
            <Route path="/other-login" element={<Otherlogin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/petshop-login" element={<PetshopLogin />} />
            <Route path="/petshop-signup" element={<PetshopSignUp />} />

            <Route path="/otp" element={<Otp />} />
            <Route path="/partners-login" element={<Partners />} />

            {/*======================== Pet shop flow start routing======================*/}

            <Route path="/petshop-dashboard" element={<Petshopdashboard />} />
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
            <Route path="/petshop-our-brand" element={<PetshopOurbrand />} />
            <Route
              path="/petshop-our-Ourbrand/:id"
              element={<PetshopOurourbrand />}
            />
            <Route
              path="/petshop-shop-by-brand"
              element={<PetShopShopbybrand />}
            />
            <Route
              path="/petshop-shop-by-brandList/:id"
              element={<PetshopShopbybrandlist />}
            />
            <Route
              path="/petshop-productDetails/:id"
              element={<PetshopproductDetails />}
            />
            <Route
              path="/petShop-subcategoriesProduct/:name"
              element={<PetShopSubcategoriesProduct />}
            />
            <Route path="/petshop-contact" element={<PetshopContact />} />
            <Route
              path="/petshop-transition-history"
              element={<PetshopTransitionHistory />}
            />

            <Route path="/petshop-product" element={<Petshopproduct />} />
            {/* petshop-product-details comment hi rahega  */}
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
            

            <Route path="/petshop-shipping/:id" element={<PetshopShipping />} />
            <Route path="/petshop-paylater/:id" element={<PetshopPayLater />} />
            <Route
              path="/order-view-details/:id"
              element={<Orderviewdetails />}
            />
            <Route
              path="/petShop-order-view-details/"
              element={<PetshopOrderviewdetails />}
            />

            {/*======================== Pet shop flow start routing======================*/}

            {/*======================== Pet shop Footer start ========================*/}
            <Route path="/petshop-privacy-security" element={<PetshopPrivacysecurity />} />
            <Route path="/petshop-terms-of-use" element={<PetshopTermsofuse />} />
            <Route path="/petshop-Returns-Replacements" element={<PetshopReturnsReplacements />} />
            <Route path="/petshopfooter" element={<Petshopfooter />} />
            <Route
              path="/petshopdeliverydetails"
              element={<Petshopdeliverydetails />}
            />
           <Route path="/petshop-terms-and-conditions" element={<PetshopTermsAndConditions />} />
            <Route
              path="/petshop-privacy-policy"
              element={<PetshopPrivacypolicy />}
            />
            <Route
              path="/petshoptrackyourorde/:id"
              element={<Petshoptrackyourorder />}
            />
            <Route
              path="/petshoptrackyourorde"
              element={<Petshoptrackyourorder />}
            />
            <Route path="/petshop-cancellation-policy" element={<Petshopcancellationpolicy />} />
            <Route
              path="/petshopreturnpolicy"
              element={<Petshopreturnpolicy />}
            />
            <Route path="/petshop-disclaimer" element={<PetshopDisclaimer />} />
            <Route path="/petshopaboutus" element={<Petshopaboutus />} />
            <Route
              path="/petshophelpandfaqs"
              element={<Petshophelpandfaqs />}
            />
            <Route
              path="/petshop-testimonials"
              element={<Petshoptestimonials />}
            />
            <Route
              path="/petshop-canine-product"
              element={<PetShopcanineproduct />}
            />
            <Route path="/petshop-blog" element={<PetshopBlog />} />
            <Route
              path="/petshop-blog-details/:id"
              element={<PetshopBlogdetails />}
            />
            {/*======================== Pet shop Footer end========================*/}

            {/*======================== Sales Man flow start ========================*/}
            <Route path="/salesman-signup" element={<Salesman />} />
            <Route path="/salesman-login" element={<SalesmanLogin />} />
            <Route path="/salesman-dashboad" element={<DashboadSalesman />} />
            {/*======================== Sales Man flow end ========================*/}

            {/*======================== partners flow start ========================*/}
            <Route path="/partner-dashboad" element={<Partnerdashboard />} />
            <Route path="/plan-buy" element={<Planbuy />} />
            {/*======================== partners flow end ========================*/}

            {/* page Not Found flow  */}
            <Route path="*" element={<Notfound />} />
          </Routes>
        </BrowserRouter>
      </PaginationProvider>
    </div>
  );
};

export default App;
