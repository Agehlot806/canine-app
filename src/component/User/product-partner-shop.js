import React, { useEffect, useState } from 'react'
import Newheader from '../../directives/newheader';
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import shop from '../../assets/images/banner/shop.png'
import { Link ,useParams} from 'react-router-dom'
import filter from '../../assets/images/icon/filter.png'
import product1 from "../../assets/images/img/product1.png";
import bag from "../../assets/images/icon/bag.png";
import axios from 'axios'
import { BASE_URL } from '../../Constant/Index'
import Footer from '../../directives/footer'
import catpng from "../../assets/images/img/catpng.png";
import bannerPro from "../../assets/images/img/bannerPro.png";


function Productpartnershop() {
    const { id } = useParams();
    console.log("vendorlistid: ", id);

    const [thirdbanner, setthirdbanner] = useState([]);
    const [vendorItemList, setVendorItemList] = useState([]);

    useEffect(() => {
        thirdBanner();
        VendorItems();
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

    const gradientColors = [
        "linear-gradient(180deg, #FFF0BA 0%, rgba(251.81, 233.11, 165.78, 0) 100%)",
        "linear-gradient(180deg, #C7EBFF 0%, rgba(199, 235, 255, 0) 100%)",
        "linear-gradient(180deg, #FECBF0 0%, rgba(254, 203, 240, 0) 100%)",
        "linear-gradient(180deg, #C8FFBA 0%, rgba(200, 255, 186, 0) 100%)",
        // Add more gradient colors as needed
    ];

    // vendor item 
    const VendorItems = () => {
        axios
            .get(`${BASE_URL}/vendor/get-items-list/${id}`)
            .then((response) => {
                console.log("vendor", response.data.data);
                setVendorItemList(response.data.data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    };
    return (
        <>
            <Newheader />
            <Container fluid className='p-0'>
                <div className='all-bg'>
                    <img src={shop} />
                </div>
            </Container>

            <Container>
                <Row>
                    <Col lg={3}>
                        <section className='section-padding'>
                            <div className='filter-product'>
                                <h3>Filters</h3>
                                <hr />
                                <Form.Select aria-label="Default select example">
                                    <option>Brand</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </Form.Select>
                                <hr />
                                <Form.Select aria-label="Default select example">
                                    <option>Product Type</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </Form.Select>
                                <hr />
                                <Form.Select aria-label="Default select example">
                                    <option>Price </option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </Form.Select>
                                <hr />

                            </div>
                        </section>
                    </Col>
                    <Col lg={9}>

                        <section className='section-padding'>
                            <div className="needplace">
                                <Container>
                                    <Row>
                                        {vendorItemList && vendorItemList.length > 0 ? (
                                            vendorItemList.map((item, index) => (
                                                <Col lg={4} sm={6} xs={6} className="mb-4">
                                                    <div className="food-product"
                                                        style={{ background: gradientColors[index % gradientColors.length], }}>
                                                        <i class="fa fa-heart-o" />
                                                        <Link to="/product-details">
                                                            <div className="text-center">
                                                                <img
                                                                    src={
                                                                        "https://canine.hirectjob.in//storage/app/public/product/" +
                                                                        item.image
                                                                    }
                                                                />
                                                            </div>
                                                            <div>
                                                                <h6>{item.name}</h6>
                                                                <p>{item.description}</p>
                                                            </div>
                                                            <div className="product-bag">
                                                                <Row>
                                                                    <Col>
                                                                        <p>₹{item.price}</p>
                                                                    </Col>
                                                                    <Col>
                                                                        <h5>{item.discount}</h5>
                                                                    </Col>
                                                                </Row>
                                                                <Row>
                                                                    <Col className="align-self-center">
                                                                        <h6>{`₹${item.price -
                                                                            (item.price * item.discount) / 100
                                                                            }`}</h6>
                                                                    </Col>
                                                                    <Col>
                                                                        <Link to="">
                                                                            <img src={bag} />
                                                                        </Link>
                                                                    </Col>
                                                                </Row>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                </Col>
                                            ))
                                        ) : (
                                            <p className="emptyMSG">No Product By Partner Data.</p>
                                        )}
                                    </Row>
                                </Container>
                            </div>
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
                    </Col>
                </Row>
            </Container>






            <Footer />
        </>
    )
}

export default Productpartnershop