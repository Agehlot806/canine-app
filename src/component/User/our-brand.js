import React, { useEffect, useState } from 'react'
import Header from '../../directives/header'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import shopbybrand from '../../assets/images/banner/shopbybrand.png'
import brand1 from "../../assets/images/img/brand1.png";
import brand2 from "../../assets/images/img/brand2.png";
import brand3 from "../../assets/images/img/brand3.png";
import brandPro1 from "../../assets/images/img/brandPro1.png";
import brandPro2 from "../../assets/images/img/brandPro2.png";
import brandPro3 from "../../assets/images/img/brandPro3.png";
import { BASE_URL } from '../../Constant/Index'
import Footer from '../../directives/footer'
import axios from 'axios';
import catpng from "../../assets/images/img/catpng.png";
import bannerPro from "../../assets/images/img/bannerPro.png";
import { Link } from 'react-router-dom';


function Ourbrand() {
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
                    <img src={shopbybrand} />
                </div>
            </Container>

            <section className="section-padding">
                <Container>
                    <h1 className="main-head">Our Brands</h1>
                    <div className="needplace">
                        <Row>
                            <Col lg={3} sm={6} xs={6} className="mb-5">
                                <div className="Brand-card brand-1">
                                    <Link to='/'>
                                        <div className="brandLOGO">
                                            <img src={brand1} />
                                        </div>
                                        <div className="brand-main">
                                            <img src={brandPro1} />
                                        </div>
                                        <div className="brand-text">
                                            <h5>Rresrvation</h5>
                                        </div>
                                    </Link>
                                </div>
                            </Col>
                            <Col lg={3} sm={6} xs={6} className="mb-5">
                                <div className="Brand-card brand-2">
                                    <Link to='/'>
                                        <div className="brandLOGO">
                                            <img src={brand2} />
                                        </div>
                                        <div className="brand-main">
                                            <img src={brandPro2} />
                                        </div>
                                        <div className="brand-text">
                                            <h5>Rresrvation</h5>
                                        </div>
                                    </Link>
                                </div>
                            </Col>
                            <Col lg={3} sm={6} xs={6} className="mb-5">
                                <div className="Brand-card brand-3">
                                    <Link to='/'>
                                        <div className="brandLOGO">
                                            <img src={brand3} />
                                        </div>
                                        <div className="brand-main">
                                            <img src={brandPro1} />
                                        </div>
                                        <div className="brand-text">
                                            <h5>Rresrvation</h5>
                                        </div>
                                    </Link>
                                </div>
                            </Col>
                            <Col lg={3} sm={6} xs={6} className="mb-5">
                                <div className="Brand-card brand-4">
                                    <Link to='/'>
                                        <div className="brandLOGO">
                                            <img src={brand1} />
                                        </div>
                                        <div className="brand-main">
                                            <img src={brandPro2} />
                                        </div>
                                        <div className="brand-text">
                                            <h5>Rresrvation</h5>
                                        </div>
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

export default Ourbrand