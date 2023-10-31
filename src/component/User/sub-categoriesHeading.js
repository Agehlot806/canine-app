import React, { useEffect, useState } from "react";
import Newheader from '../../directives/newheader';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Footer from '../../directives/footer';
import axios from "axios";
import { BASE_URL } from "../../Constant/Index";

function SubcategoriesHeading() {
    const [dogsubcategories, setdogsubcategories] = useState("");
    const [homebanner, sethomebanner] = useState([]);

    useEffect(() => {
        AllDogsubcategories();
        AllBanner();
    }, []);

    const AllBanner = async () => {
        try {
          const response = await axios.get(`${BASE_URL}/categories/banner`);
          sethomebanner(response.data.data);
        } catch (error) {
          console.error(error);
        }
      };

    const AllDogsubcategories = async () => {
        axios
            .get(`${BASE_URL}/categories/subcategories`)
            .then((response) => {
                console.log(response);
                console.log("Delete Successful");
                setdogsubcategories(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const ourBrand = [
        "linear-gradient(180deg, #C8FFBA 0%, rgba(200, 255, 186, 0) 100%)",
        "linear-gradient(180deg, #FFF0BA 0%, rgba(251.81, 233.11, 165.78, 0) 100%)",
        "linear-gradient(180deg, #C7EBFF 0%, rgba(199, 235, 255, 0) 100%)",
        "linear-gradient(180deg, #FECBCD 0%, rgba(253.94, 203.15, 204.70, 0) 100%)",
    ];
    return (
        <>
            <Newheader />
            <div className="home-section">
        {homebanner
          ? homebanner.map(
            (item, index) =>
              item.type === "common" && (
                <Link to={item.default_link}>
                  <img
                    className="partner-img"
                    src={
                      "https://canine.hirectjob.in//storage/app/" + item.image
                    }
                  />
                </Link>
              )
          )
          : null}
      </div>

            <section className="section-padding">
                <Container>
                    <h1 className="main-head">Dog Food</h1>
                    <div className="needplace">
                        <Row>
                            {dogsubcategories ? (
                                dogsubcategories.map(
                                    (item, index) =>
                                        item.heading == "Food" && (
                                            <Col lg={3} sm={6} xs={6} className="mb-5">
                                                <div className="food-product text-center"
                                                    style={{
                                                        background:
                                                            ourBrand[index % ourBrand.length],
                                                    }} key={item.id}>
                                                    <Link to={`/sub-categoriesProduct/${item.name}`}>
                                                        <img
                                                            src={
                                                                "https://canine.hirectjob.in//storage/app/public/category/" +
                                                                item.image
                                                            }
                                                        />
                                                        <h6>{item.name}</h6>
                                                    </Link>
                                                </div>
                                            </Col>
                                        )
                                )
                            ) : (
                                <p className="emptyMSG">
                                    No Dog Food Sub Categories.
                                </p>
                            )}
                        </Row>
                    </div>
                </Container>
            </section>


            <Footer />
        </>
    )
}

export default SubcategoriesHeading
