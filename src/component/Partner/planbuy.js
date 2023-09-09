import React from "react";
import Newheader from "../../directives/newheader";
import { Col, Container, Row, Button, Form, Nav, Table } from "react-bootstrap";
import HomeImg from "../../assets/images/img/home.png";
import partner from "../../assets/images/img/partner.png";
import Footer from "../../directives/footer";
import { Link } from "react-router-dom";
import { loadRazorpay } from "../../utils";
import { useState } from "react";
import { useEffect } from "react";
import moment from 'moment';
function Planbuy() {
  const [paymentId, setPaymentId] = useState("");
  const [homebanner, sethomebanner] = useState([]);
  const allbanner = async () => {
    try {
      const response = await fetch(`${BASE_URL}/banners/`);
      const data = await response.json();
      const latestPosts = data.data.slice(0, 1);
      sethomebanner(latestPosts);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    allbanner();
  }, []);
  const storedPlanData = localStorage.getItem("planData");
  const parsedPlanData = JSON.parse(storedPlanData);

  // Access the "Monthly" and "price" properties
  const monthly = parsedPlanData.plantime;
  const price = parsedPlanData.price;
  const image = parsedPlanData.image
  const advertisement = parsedPlanData.advertisement;
  const limit = parsedPlanData.limit;
  const expairedate = parsedPlanData.plan_expaire_date;
  const planname = parsedPlanData.pname;
  const descriptiondata = parsedPlanData.description;
  //   const vendorId = localStorage.getItem("vendor_id");
  //   const planName = localStorage.getItem("plan_name");
  //   const planPrice = localStorage.getItem("plan_price");
  //   console.log("planPrice: ", planPrice);
  //   const planType = localStorage.getItem("plan_type");
  //   console.log("planType: ", planType);
  //   const planPurchaseDate = localStorage.getItem("plan_purchase_date");
  //   console.log("planPurchaseDate: ", planPurchaseDate);
  //   const planExpireDate = localStorage.getItem("plan_expaire_date");

  const handlePayment = async () => {
    try {
      // const response = await loadRazorpay();
      loadRazorpay()
        .then((response) => {
          // console.log("response handlePayment: ", response);
          // Code to execute after the script has loaded
        })
        .catch((error) => {
          console.error("Error loading Razorpay script:", error);
        });

      const options = {
        key: "rzp_test_FaUw0RsaEo9pZE", // Replace with your actual key
        amount: 10000, // Amount in paise (100 INR)
        currency: "INR",
        name: "HEllo world",
        description: "Test Payment",
        image: "https://your_logo_url.png",
        // order_id: response.id, // Order ID obtained from Razorpay
        handler: (response) => {
          setPaymentId(response.razorpay_payment_id);
          // Handle the success callback
          window.location.href = "https://canine.hirectjob.in/admin/auth/login";
          console.log("Payment Successful:", response);
        },

        prefill: {
          email: "test@example.com",
          contact: "1234567890",
        },
        notes: {
          address: "1234, Demo Address",
        },
        theme: {
          color: "#F37254",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error("Razorpay Load Error:", error);
    }
  };

  const [initialDate] = useState(new Date());
  const [item] = useState({ plantime: 'Monthly' }); // Replace with your actual item data
  const [expirationDate, setExpirationDate] = useState(null);

  useEffect(() => {
    const calculateExpirationDate = () => {
      let expirationDate = new Date(initialDate);

      if (item.plantime === 'Monthly') {
        expirationDate.setDate(expirationDate.getDate() + 30);
      } else if (item.plantime === 'Half-Yearly') {
        expirationDate.setDate(expirationDate.getDate() + 30 * 6);
      } else if (item.plantime === 'Annual') {
        expirationDate.setDate(expirationDate.getDate() + 365);
      }

      return moment(expirationDate).format('L');
    };

    const formattedExpirationDate = calculateExpirationDate();
    setExpirationDate(formattedExpirationDate);
  }, [initialDate, item]);

  return (
    <>
      <Newheader />
      <div className="home-section">
        {homebanner
          ? homebanner.map(
            (item, index) =>
              item.type === "default" && (
                <img className="partner-img"
                  src={
                    "https://canine.hirectjob.in/storage/app/" +
                    item.image
                  }
                />
              )
          )
          : null}
      </div>

      <section className="section-padding">
        <Container>
          <div className="partner-area">
            <h3>Subscribe for Premium Features</h3>
            <p>
              Protect up to 10 devices with all <br />
              features
            </p>
          </div>
          <div className="partner-img">
            <img
              src={
                "https://canine.hirectjob.in/uploads/subscription//" +
                image
              }
            />
          </div>
        </Container>
      </section>
      <section className="section-padding">
        <Container>
          <div className="plan-buy">
            <p>
              {descriptiondata}
              {/* My Spy discount now. Link a device to enjoy a 50% OFF for new
              users, first month only 2430.00 */}
            </p>
            <div className="plan-buy-content">
              <h1>{planname}</h1>
              <div className="plan-rupy">
                <h2>{price}</h2>
                <span>/{monthly}</span>
              </div><br />
              <h4>Product upload Limit / {limit}</h4>
              <h4>{advertisement} Advertisement</h4>
              <Button onClick={() => handlePayment()}>Buy Now</Button>
              <br />
              <br /> <br />
              <Link>Expiration Date:</Link>
              <Link className="placDate">{expirationDate}</Link>
            </div>
          </div>

        </Container>
      </section>
      <Footer />
    </>
  );
}

export default Planbuy;
