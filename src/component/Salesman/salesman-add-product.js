import React, { useEffect, useState } from 'react'
import Newheader from '../../directives/newheader';
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import Carousel from "react-multi-carousel";
import product from '../../assets/images/banner/product.png'
import { Link } from 'react-router-dom'
import product1 from '../../assets/images/img/product1.png'
import product2 from '../../assets/images/img/product2.png'
import product3 from '../../assets/images/img/product3.png'
import Footer from '../../directives/footer'
import productdetail from '../../assets/images/banner/productdetail.png'
import bannerone from '../../assets/images/banner/banner.png'
import { BASE_URL } from '../../Constant/Index';
import axios from 'axios';
import bag from '../../assets/images/icon/bag.png'

const clinetreview = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3,
        slidesToSlide: 2 // optional, default to 1.
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
        slidesToSlide: 1 // optional, default to 1.
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        slidesToSlide: 1 // optional, default to 1.
    }
};
function SalesmanaddProduct(props) {
    const [categories, setcategories] = useState([]);
    const [allproduct, setallproduct] = useState([]);


    useEffect(() => {
        categoriesProduct();
        allProduct();
    }, []);

    const categoriesProduct = async () => {
        try {
            const response = await fetch(`${BASE_URL}/categories`);
            const jsonData = await response.json();
            setcategories(jsonData.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    const allProduct = async () => {
        axios
            .get(`${BASE_URL}/items/latest`)
            .then((response) => {
                console.log(response);
                console.log("Delete Successful");
                setallproduct(response.data.data)
                // Perform any additional actions after successful deletion
            })
            .catch((error) => {
                console.log(error);
            });
    };



    return (
        <>
            <Newheader />
            <Container fluid className='p-0'>
                <div className='all-bg'>
                    <img src={product} />
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
                        <section className="section-padding">
                            <Container>
                                <h1 className="main-head">
                                    Shop Deals For Your Best Buddy
                                </h1>
                            </Container>
                            <Container fluid>
                                <Carousel
                                    swipeable={true}
                                    draggable={true}
                                    showDots={true}
                                    responsive={clinetreview}
                                    ssr={true} // means to render carousel on server-side.
                                    infinite={true}
                                    autoPlay={props.deviceType !== "mobile" ? true : false}
                                    autoPlaySpeed={2000}
                                    keyBoardControl={true}
                                    customTransition="all 1s"
                                    transitionDuration={1000}
                                    containerClass="carousel-container"
                                    removeArrowOnDeviceType={["tablet", "mobile"]}
                                    deviceType={props.deviceType}
                                    dotListClass="custom-dot-list-style"
                                    itemClass="carousel-item-padding-40-px"
                                >
                                    {categories.map((item) => (
                                        <div className="Shop-Deals" key={item.id}>
                                            <img src={"https://caninetest.xyz/storage/app/public/category/" + item.image} />
                                            <h1>{item.name}</h1>
                                        </div>
                                    ))}

                                </Carousel>
                            </Container>
                        </section>


                        <section className="section-padding food">
                            <Container>
                                <Row>
                                    {allproduct && allproduct.map((item) => (
                                        <Col lg={4} sm={6} xs={6} className="mb-4">
                                            <div className="food-product" key={item.id}>
                                                <i class="fa fa-heart-o" />
                                                <Link to="/salesman-product-details">
                                                    <div className='text-center'>
                                                        <img src={"https://caninetest.xyz//storage/app/public/product/" + item.image} />
                                                    </div>
                                                    <div>
                                                        <h6>{item.name}</h6>
                                                        <p>{item.description}</p>
                                                    </div>
                                                    <div className="product-bag">
                                                        <Row>
                                                            <Col>
                                                                <p>₹999.00</p>
                                                            </Col>
                                                            <Col>
                                                                <h5>20%</h5>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col className='align-self-center'><h6>₹{item.price}</h6></Col>
                                                            <Col><Link to=''><img src={bag} /></Link></Col>
                                                        </Row>
                                                    </div>
                                                </Link>
                                            </div>
                                        </Col>
                                    ))}
                                </Row>
                            </Container>
                        </section>

                        <Container fluid className='p-0'>
                            <div className='all-bg'>
                                <img src={bannerone} />
                            </div>
                        </Container>

                        <section className="section-padding food">
                            <Container>
                                <Row>
                                    <Col lg={6} sm={6}>
                                        <h3>Related products</h3>
                                    </Col>
                                    <Col lg={6} sm={6}>
                                        <div className='see-allbtn'>
                                            <Link to="">See All</Link>
                                        </div>
                                    </Col>
                                </Row>
                                <div className="needplace">
                                    <Row>
                                        <Col lg={4} sm={6} xs={6} className="mb-4">
                                            <div className="food-product">
                                                <i class="fa fa-heart-o" />
                                                <Link to="/salesman-product-details">
                                                    <div className='text-center'>
                                                        <img src={product1} />
                                                    </div>
                                                    <div>
                                                        <h6>Farmina</h6>
                                                        <p>asdsdsdadwe sdseded sded</p>
                                                    </div>
                                                    <div className="product-bag">
                                                        <Row>
                                                            <Col>
                                                                <p>₹999.00</p>
                                                            </Col>
                                                            <Col>
                                                                <h5>20%</h5>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col className='align-self-center'><h6>₹100.00</h6></Col>
                                                            <Col><Link to=''><img src={bag} /></Link></Col>
                                                        </Row>
                                                    </div>
                                                </Link>
                                            </div>
                                        </Col>
                                        <Col lg={4} sm={6} xs={6} className="mb-4">
                                            <div className="food-product">
                                                <i class="fa fa-heart-o" />
                                                <Link to="/salesman-product-details">
                                                    <div className='text-center'>
                                                        <img src={product1} />
                                                    </div>
                                                    <div>
                                                        <h6>Farmina</h6>
                                                        <p>asdsdsdadwe sdseded sded</p>
                                                    </div>
                                                    <div className="product-bag">
                                                        <Row>
                                                            <Col>
                                                                <p>₹999.00</p>
                                                            </Col>
                                                            <Col>
                                                                <h5>20%</h5>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col className='align-self-center'><h6>₹100.00</h6></Col>
                                                            <Col><Link to=''><img src={bag} /></Link></Col>
                                                        </Row>
                                                    </div>
                                                </Link>
                                            </div>
                                        </Col>
                                        <Col lg={4} sm={6} xs={6} className="mb-4">
                                            <div className="food-product">
                                                <i class="fa fa-heart-o" />
                                                <Link to="/salesman-product-details">
                                                    <div className='text-center'>
                                                        <img src={product1} />
                                                    </div>
                                                    <div>
                                                        <h6>Farmina</h6>
                                                        <p>asdsdsdadwe sdseded sded</p>
                                                    </div>
                                                    <div className="product-bag">
                                                        <Row>
                                                            <Col>
                                                                <p>₹999.00</p>
                                                            </Col>
                                                            <Col>
                                                                <h5>20%</h5>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col className='align-self-center'><h6>₹100.00</h6></Col>
                                                            <Col><Link to=''><img src={bag} /></Link></Col>
                                                        </Row>
                                                    </div>
                                                </Link>
                                            </div>
                                        </Col>
                                        <Col lg={4} sm={6} xs={6} className="mb-4">
                                            <div className="food-product">
                                                <i class="fa fa-heart-o" />
                                                <Link to="/salesman-product-details">
                                                    <div className='text-center'>
                                                        <img src={product1} />
                                                    </div>
                                                    <div>
                                                        <h6>Farmina</h6>
                                                        <p>asdsdsdadwe sdseded sded</p>
                                                    </div>
                                                    <div className="product-bag">
                                                        <Row>
                                                            <Col>
                                                                <p>₹999.00</p>
                                                            </Col>
                                                            <Col>
                                                                <h5>20%</h5>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col className='align-self-center'><h6>₹100.00</h6></Col>
                                                            <Col><Link to=''><img src={bag} /></Link></Col>
                                                        </Row>
                                                    </div>
                                                </Link>
                                            </div>
                                        </Col>
                                        <Col lg={4} sm={6} xs={6} className="mb-4">
                                            <div className="food-product">
                                                <i class="fa fa-heart-o" />
                                                <Link to="/salesman-product-details">
                                                    <div className='text-center'>
                                                        <img src={product1} />
                                                    </div>
                                                    <div>
                                                        <h6>Farmina</h6>
                                                        <p>asdsdsdadwe sdseded sded</p>
                                                    </div>
                                                    <div className="product-bag">
                                                        <Row>
                                                            <Col>
                                                                <p>₹999.00</p>
                                                            </Col>
                                                            <Col>
                                                                <h5>20%</h5>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col className='align-self-center'><h6>₹100.00</h6></Col>
                                                            <Col><Link to=''><img src={bag} /></Link></Col>
                                                        </Row>
                                                    </div>
                                                </Link>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </Container>
                        </section>
                    </Col>
                </Row>
            </Container >



            <Footer />
        </>
    )
}

export default SalesmanaddProduct