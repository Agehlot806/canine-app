import React, { useEffect, useState } from 'react'
import Header from '../../directives/header'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import partner from "../../assets/images/banner/partner.png"
import loicon1 from "../../assets/images/img/loicon1.png";
import loicon2 from "../../assets/images/img/loicon2.png";
import { Link } from 'react-router-dom';
import catpng from "../../assets/images/img/catpng.png";
import bannerPro from "../../assets/images/img/bannerPro.png";
import axios from 'axios'
import { BASE_URL } from '../../Constant/Index'
import Footer from '../../directives/footer';


function Productbypartner() {
    const [thirdbanner, setthirdbanner] = useState([]);

    useEffect(() => {
        thirdBanner();
    }, []);


    const thirdBanner = () => {
        axios
            .get(`${BASE_URL}/banners`)
            .then((response) => {
                console.log(response.data.data);
                setthirdbanner(response.data.data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    };

    return (
        <>
            <Header />
            <Container fluid className='p-0'>
                <div className='all-bg'>
                    <img src={partner} />
                </div>
            </Container>
            <section className='section-padding'>
                <Container>
                    <h1 className="main-head">Product By Partner</h1>

                    <div className="needplace">
                        <Row>
                            <Col lg={3} sm={6} xs={6} className="mb-5">
                                <div className="ProductPartner-card">
                                    <Link to="/product-partner-shop">
                                        <img src={loicon1} />
                                        <h3>Shop Name 1</h3>
                                    </Link>
                                </div>
                            </Col>
                            <Col lg={3} sm={6} xs={6} className="mb-5">
                                <div className="ProductPartner-card">
                                    <Link to="/product-partner-shop">
                                        <img src={loicon2} />
                                        <h3>Shop Name 2</h3>
                                    </Link>
                                </div>
                            </Col>
                            <Col lg={3} sm={6} xs={6} className="mb-5">
                                <div className="ProductPartner-card">
                                    <Link to="/product-partner-shop">
                                        <img src={loicon1} />
                                        <h3>Shop Name 3</h3>
                                    </Link>
                                </div>
                            </Col>
                            <Col lg={3} sm={6} xs={6} className="mb-5">
                                <div className="ProductPartner-card">
                                    <Link to="/product-partner-shop">
                                        <img src={loicon2} />
                                        <h3>Shop Name 4</h3>
                                    </Link>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </section>

            <section className="section-padding">
                <Container>
                    {thirdbanner
                        ? thirdbanner.map(
                            (item, index) =>
                                item.title === "new" && (
                                    <div className="banner-bgmain" key={item.id}>
                                        <img
                                            src={
                                                "https://canine.hirectjob.in/storage/app/public/banner/" +
                                                item.image
                                            }
                                        />
                                    </div>
                                )
                        )
                        : null}
                </Container>
            </section>

            <section className="section-padding">
                <Container>
                    <div className=" Newsletter-bg">
                        <Row>
                            <Col lg={3}>
                                <img src={catpng} />
                            </Col>
                            <Col lg={6}>
                                <div className="Newsletter">
                                    <h1 className="main-head">Get Or Promo Code by Subscribing To our Newsletter</h1>
                                    <Form className="d-flex">
                                        <Form.Control
                                            type="search"
                                            placeholder="Enter your email"
                                            className="me-2"
                                            aria-label="Search"
                                        />
                                        <Button variant="outline-success">Subscribe</Button>
                                    </Form>
                                </div>
                            </Col>
                            <Col lg={3} className="align-self-center">
                                <img src={bannerPro} />
                            </Col>
                        </Row>
                    </div>
                </Container>
            </section>
            <Footer />
        </>
    )
}

export default Productbypartner