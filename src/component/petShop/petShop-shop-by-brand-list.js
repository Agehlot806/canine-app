import React, { useState, useEffect } from 'react'
import Newheader from '../../directives/newheader';
import { Container, Row, Col } from 'react-bootstrap'
import shopbybrand from '../../assets/images/banner/shopbybrand.png'
import axios from 'axios';
import { BASE_URL } from '../../Constant/Index';
import { Link, useParams } from 'react-router-dom';
import Footer from '../../directives/footer';
import loadinggif from "../../assets/images/video/loading.gif";

function PetshopShopbybrandlist() {
    const { id } = useParams();
    const [brandproduct, setBrandproduct] = useState([]);

    const [loading, setLoading] = useState(true);
  useEffect(() => {
    Promise.all([fetchBrandproduct()])
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);
    

    const fetchBrandproduct = () => {
        axios
            .get(`${BASE_URL}/banners/brand_product/${id}`)
            .then((response) => {
                console.log(response.data.data);
                setBrandproduct(response.data.data);

            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    };

    return (
        <>
            <Newheader />
            {loading ? (
                <div className="loaderimg text-center text-black mb-4">
                <img src={loadinggif} alt="" />
                <h5>Please Wait.......</h5>
              </div>
            ) : (
                <>
                <Container fluid className='p-0'>
                <div className='all-bg'>
                    <img src={shopbybrand} />
                </div>
            </Container>

            <section className="section-padding">
                <Container>
                    <h1 className="main-head">Shop By Brands List</h1>
                    <div className="needplace">
                        <Row>
                            {brandproduct && brandproduct.length > 0 ? (
                                brandproduct.map((item, index) => (
                                    <Col lg={3} sm={6} xs={6} className="mb-5">
                                        <div key={item.id} className="Brand-card brand-1">
                                            <Link to={item.product_url} >
                                                <div className="brand-main">
                                                    <img
                                                    src={
                                                        "https://canine.hirectjob.in//storage/app/public/brand_product/" +
                                                        item.image
                                                    } />
                                                </div>
                                                <div className="brand-text">
                                                    <h5>{item.title}</h5>
                                                </div>
                                            </Link>
                                        </div>
                                    </Col>
                                ))
                            ) : (
                                <p className="emptyMSG">No Data Shop By Brand.</p>
                            )}
                        </Row>
                    </div>
                </Container>
            </section>
                </>
            )}
            <Footer />
        </>
    )
}

export default PetshopShopbybrandlist