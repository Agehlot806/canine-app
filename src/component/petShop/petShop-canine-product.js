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
import { Toaster, toast } from 'react-hot-toast';

const clinetreview = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 4,
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
function PetShopcanineproduct(props) {
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
                console.log("all product Successful");
                setallproduct(response.data.data)
                // Perform any additional actions after successful deletion
            })
            .catch((error) => {
                console.log(error);
            });
    };

    // storedUserId
    const customer_id = localStorage.getItem("userInfo");
    let storedUserId = JSON.parse(customer_id);

    const addToWishlist = async (item_id) => {
        const formData = new FormData();
        formData.append("user_id", storedUserId);
        formData.append("item_id", item_id);
        axios
            .post(`${BASE_URL}/customer/wish-list/add`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            })
            .then((response) => {
                console.log("response143", response);
                if (response.data.message) {
                    toast.success("Added successfully");
                }
            })
            .catch((error) => {
                toast.error("Already in your wishlist");
            });
    };

    const gradientColors = [
        "linear-gradient(180deg, #FFF0BA 0%, rgba(251.81, 233.11, 165.78, 0) 100%)",
        "linear-gradient(180deg, #C7EBFF 0%, rgba(199, 235, 255, 0) 100%)",
        "linear-gradient(180deg, #FECBF0 0%, rgba(254, 203, 240, 0) 100%)",
        "linear-gradient(180deg, #C8FFBA 0%, rgba(200, 255, 186, 0) 100%)",
        // Add more gradient colors as needed
      ];

    return (
        <>
            <Toaster />
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
                                        <div className="product-Deals" key={item.id}>
                                            <img src={"https://canine.hirectjob.in/storage/app/public/category/" + item.image} />
                                            <h1>{item.name}</h1>
                                        </div>
                                    ))}
                                </Carousel>
                            </Container>
                        </section>


                        <section className="section-padding food">
                            <Container>
                                <Row>
                                    {allproduct
                                        ? allproduct.map(
                                            (item, index) =>
                                                item.module_id === 1 && (
                                                    <Col lg={4} sm={6} xs={6} className="mb-4">
                                                        <div className="food-product" key={item.id} style={{
                          background:
                            gradientColors[index % gradientColors.length],
                        }}>
                                                            <i
                                                                class="fa fa-heart-o"
                                                                onClick={() => addToWishlist(item.id)}
                                                            />
                                                            <Link to={`/petshop-productDetails/${item.id}`}>
                                                                <div className='text-center'>
                                                                    <img src={"https://canine.hirectjob.in//storage/app/public/product/" + item.image} />
                                                                </div>
                                                                <div>
                                                                    <h6>{item.name}</h6>
                                                                    <p>{item.description}</p>
                                                                </div>
                                                                <div className="product-bag">
                                                                    <Row>
                                                                        <Col className='align-self-center'><h6>₹{item.whole_price}</h6></Col>
                                                                        <Col><Link to=''><img src={bag} /></Link></Col>
                                                                    </Row>
                                                                </div>
                                                            </Link>
                                                        </div>
                                                    </Col>
                                                )
                                        )
                                        : null}
                                </Row>
                            </Container>
                        </section>


                    </Col>
                </Row>
            </Container >



            <Footer />
        </>
    )
}

export default PetShopcanineproduct