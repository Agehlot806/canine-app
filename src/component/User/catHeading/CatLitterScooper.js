import React, { useEffect, useState } from "react";
import { Col, Container, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import Footer from '../../../directives/footer';
import axios from "axios";
import { BASE_URL } from "../../../Constant/Index";
import loadinggif from "../../../assets/images/video/loading.gif";
import DocumentMeta from "react-document-meta";
import Newheader from "../../../directives/newheader";

function CatLitterScooper() {

    const CatLitterScoopermeta= {
    
        title: 'Simplify Cat Care with Scoop Away Litter, ScoopFree Trays, and Convenient Cat Litter Scoops',
        description: 'Our top-quality products, including Scoop Away and ScoopFree litter boxes, streamline cat litter routines, keep spaces clean, and make cat care a breeze.',
        canonical: 'http://caninedemo.caninetest.xyz/',
        meta: {
          charset: 'utf-8',
          name: {
            keywords: 'scoop away cat litter,scoop free litter box tray,cat litter scoop'
          }
        }
      }

    const [dogsubcategories, setdogsubcategories] = useState("");
    const [homebanner, sethomebanner] = useState([]);
    const { heading ,id} = useParams()
    useEffect(() => {
        AllDogsubcategories()
    }, [heading,id]);
    const [loading, setLoading] = useState(true);
  useEffect(() => {
    Promise.all([AllDogsubcategories(),
        AllBanner()])
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
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
                const responseData = response.data.data
                const demouser = responseData.filter(le=>le.category=== id);
                const filterData = demouser.filter(el => {
                    return el.heading === heading
                })
                setdogsubcategories(filterData);
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
    const allowedHeadings = ["Food", "Treats", "Toys", "and many more"];
    return (
        <>
        <DocumentMeta {...CatLitterScoopermeta}>
            <Newheader />
            {loading ? (
                <section className="section-padding mt-3 mb-3">
                <div className="loaderimg text-center text-black mb-4">
                <img src={loadinggif} alt=""/>
                <h5>Please Wait.......</h5>
              </div>
              </section>
            ) : (
                <>
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
                    <h1 className="main-head">All {heading} Sub Categories</h1>
                    <div className="needplace">
                        <Row>
                            {dogsubcategories ? (
                                dogsubcategories.map(
                                    (item, index) => (
                                        <Col lg={3} sm={6} xs={6} className="mb-5">
                                            <div className="food-product text-center"
                                                style={{
                                                    background:
                                                        ourBrand[index % ourBrand.length],
                                                }} key={item.id}>
                                                <Link to={`/sub-categoriesProduct/${item.name}/${item.category}`}>
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
                                )) : (
                                <p className="emptyMSG">
                                    No Dog Food Sub Categories.
                                </p>
                            )}
                        </Row>
                    </div>

                </Container>
            </section>
                </>
            )}
            <Footer />
            </DocumentMeta>
        </>
    )
}

export default CatLitterScooper
