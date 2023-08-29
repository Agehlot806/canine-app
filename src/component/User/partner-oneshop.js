import React, { useEffect, useState } from "react";
import Newheader from '../../directives/newheader'
import shop from '../../assets/images/banner/shop.png'
import { Container, Table, Row, Col, Button } from 'react-bootstrap'
import bag from "../../assets/images/icon/bag.png";
import { Link, useLocation } from 'react-router-dom';
import product1 from "../../assets/images/img/product1.png";
import Footer from '../../directives/footer';
import axios from "axios";
import { BASE_URL } from "../../Constant/Index";

function Partneroneshop() {
    
    const { state } = useLocation()
    // console.log('state', state)
    const [vendorItemList, setVendorItemList] = useState([]);
    useEffect(() => {
        VendorItems();
    }, []);

    // vendor item 
    const VendorItems = async () => {
        try {
            const response = await fetch(`${BASE_URL}/vendor/get-items-list/${state.item.id}`);
            const data = await response.json();
            const latestPosts = data.data.slice(0, 8);
            setVendorItemList(latestPosts);
        } catch (error) {
            console.log(error);
        }
    };

    const gradientColors = [
        "linear-gradient(180deg, #FFF0BA 0%, rgba(251.81, 233.11, 165.78, 0) 100%)",
        "linear-gradient(180deg, #C7EBFF 0%, rgba(199, 235, 255, 0) 100%)",
        "linear-gradient(180deg, #FECBF0 0%, rgba(254, 203, 240, 0) 100%)",
        "linear-gradient(180deg, #C8FFBA 0%, rgba(200, 255, 186, 0) 100%)",
        // Add more gradient colors as needed
    ];

    // const vendorID = state.item.id
    // console.log("vendorIDvendorIDvendorID",vendorID);

    return (
        <>
            <Newheader />
            <Container fluid className='p-0'>
                <div className='all-bg'>
                    <img src={shop} />
                </div>
            </Container>

            <section className='section-padding'>
                <Container>
                    <div className='partner-oneshop'>
                        <Table>
                            <tbody>
                                <tr>
                                    <th>Partner Name :</th>
                                    <td>{state.item.name}</td>
                                </tr>
                                <tr>
                                    <th>Address :</th>
                                    <td>{state.item.address}</td>
                                </tr>
                                <tr>
                                    <th>Mobile :</th>
                                    <td>{state.item.phone}</td>
                                </tr>
                                <tr>
                                    <th>Email ID :</th>
                                    <td>{state.item.email}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                </Container>
            </section>
            <section className='section-padding'>
                <Container>
                    <Row>
                        {vendorItemList && vendorItemList.length > 0 ? (
                            vendorItemList.map((item, index) => (
                                <Col lg={3} sm={6} xs={6} className="mb-4">
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
                    <div className="allblogbtn">
                        <Button key={state.item.id}>
                            <Link to={`/product-partner-shop/${state.item.id}`}>View All</Link>
                        </Button>
                    </div>
                </Container>
            </section>

            <Footer />
        </>
    )
}

export default Partneroneshop