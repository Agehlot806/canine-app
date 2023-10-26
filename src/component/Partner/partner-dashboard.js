import React, { useEffect, useState } from "react";
import { Col, Container, Row, Button, Form, Nav, Table } from "react-bootstrap";
import HomeImg from "../../assets/images/img/home.png";
import partner from "../../assets/images/img/partner.png";
import Footer from "../../directives/footer";
import axios from "axios";
import { BASE_URL } from "../../Constant/Index";
import { useNavigate } from "react-router-dom";
import Petshopheader from "../../directives/petShopHeader";

function Partnerdashboard() {
  const navigate = useNavigate();
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

  const gradientColors = [
    "linear-gradient(180deg, #f9e1dd 0%, rgba(249, 225, 221, 0) 100%)",
    "linear-gradient(180deg, #d0e1fb 0%, rgba(208, 225, 251, 0) 100%)",
    "linear-gradient(180deg, #fcecff 0%, rgba(252, 236, 255, 0) 100%)",
    // Add more gradient colors as needed
  ];

  const [subscriptions, setSubscriptions] = useState([]);
  const apiUrl = "https://canine.hirectjob.in/api/v1/auth/get_subscription";

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setSubscriptions(data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const [planData, setPlanData] = useState({});
  useEffect(() => {
    fetchPurchaceplan();
    allbanner();
  }, []);
  const fetchPurchaceplan = async () => {
    try {
      const response = await axios.post(
        "https://canine.hirectjob.in/api/v1/auth/purchace_plan",
        {}
      );
      const data = response.data.data;
      localStorage.setItem("planData", JSON.stringify(data));
      console.log("Plan data stored in local storage:", data);
      setPlanData(data);
    } catch (error) {
      console.error("Error fetching plan data from API:", error);
    }
  };
  const handleMorePlanClick = (subscription) => {
    const storedPlanData = localStorage.setItem(
      "planData",
      JSON.stringify(subscription)
    );
    console.log("storedPlanData: ", storedPlanData);
    // if (storedPlanData) {
    //   const parsedPlanData = JSON.parse(storedPlanData);
    //   localStorage.setItem("vendor_id", parsedPlanData.vendor_id);
    //   localStorage.setItem("plan_name", parsedPlanData.plan_name);
    //   localStorage.setItem("plan_price", parsedPlanData.plan_price);
    //   localStorage.setItem("plan_type", parsedPlanData.plan_type);
    //   localStorage.setItem(
    //     "plan_purchase_date",
    //     parsedPlanData.plan_purchase_date
    //   );
    //   localStorage.setItem(
    //     "plan_expaire_date",
    //     parsedPlanData.plan_expaire_date
    //   );
    //   console.log("local storage:", parsedPlanData);
    navigate("/plan-buy");
    // }
  };
  return (
    <>
      <Petshopheader />
      <div className="home-section">
        {homebanner
          ? homebanner.map(
              (item, index) =>
                item.type === "common" && (
                  <img
                    className="partner-img"
                    src={"https://canine.hirectjob.in//storage/app/" + item.image}
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
            <img src={partner} />
          </div>
        </Container>
      </section>
      <section className="section-padding">
        <Container>
          <Row>
            {subscriptions.map((subscription) => (
              <Col lg={4} key={subscription.id}>
                <div className="Members-card Members-bg1">
                  <img
                    src={
                      "https://canine.hirectjob.in//uploads/subscription//" +
                      subscription.image
                    }
                  />
                  <h4>{subscription.pname}</h4>
                  {/* <p><i className="fa fa-users" /> 987 Members</p> */}
                  <h5>
                    Advertisement : <span>{subscription.advertisement}</span>
                  </h5>

                  <div className="Members-monthly Members-monthly1">
                    <h2>
                      ₹ {subscription.price}/
                      <span>{subscription.plantime}</span>
                    </h2>
                    <span>Limit : {subscription.limit}</span>
                  </div>
                  <ul>
                    <li>
                      <i class="fa fa-check-circle" />{" "}
                      {subscription.description}
                    </li>
                  </ul>
                  <Button onClick={() => handleMorePlanClick(subscription)}>
                    More Plan
                  </Button>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
      <Footer />
    </>
  );
}

export default Partnerdashboard;
