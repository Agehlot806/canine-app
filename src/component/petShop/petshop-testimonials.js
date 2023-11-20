import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { BASE_URL } from "../../Constant/Index";
import axios from "axios";
import productdetail from "../../assets/images/banner/productdetail.png";
import loadinggif from "../../assets/images/video/loading.gif";
import PetShopHeader from "../../directives/petShopHeader";
import Petshopfooter from "../../directives/petShop-Footer";

const Petshoptestimonials = () => {
  const [reviewlist, setreviewlist] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    Promise.all([
      allReview()
    ])
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const allReview = async () => {
    try {
      const response = await fetch(`${BASE_URL}/items/get_happyreview`);
      const data = await response.json();
      const latestPosts = data.data.slice(0, 3);
      const reversedPosts = latestPosts.reverse();
      setreviewlist(reversedPosts);
    } catch (error) {
      console.log(error);
    }
  };

  const happyCus = [
    "linear-gradient(180deg, #C6ECFC 0%, rgba(198.30, 235.76, 251.81, 0.43) 100%)",
    "linear-gradient(180deg, #EEEEFF 0%, rgba(238.43, 238.43, 255, 0.45) 100%)",
    "linear-gradient(180deg, #FFEAD2 0%, rgba(255, 234.18, 210.37, 0.33) 100%)",
  ];

  const renderhappycus = (comment) => {
    const maxCharacters = 15;

    if (comment?.length <= maxCharacters) {
      return <p>{comment}</p>;
    }

    const truncatedDescription = comment?.slice(0, maxCharacters);

    return (
      <>
        <p>{truncatedDescription}.......</p>
      </>
    );
  };
  return (
    <>
      <PetShopHeader />
      {loading ? (
        <section className="section-padding mt-3 mb-3">
          <div className="loaderimg text-center text-black mb-4">
            <img src={loadinggif} alt="" />
            <h5>Please Wait.......</h5>
          </div>
        </section>) : (<>
          <Container fluid className="p-0">
            <div className="all-bg">
              <img src={productdetail} />
            </div>
          </Container>
          <section className='section-padding'>
            <Container>
              <Row className="justify-content-center">
                <Col lg={12}>
                  <h1 className='text-center'><strong>Testimonials</strong></h1>
                  <div className="needplace">
                  <Row>
                {reviewlist.map((order, index) => (
                  <Col lg={4} sm={6} key={order.id} className="mb-3">
                    <div
                      className="Brand-cus"
                      style={{
                        background: happyCus[index % happyCus.length],
                      }}
                    >
                      <>
                        <img
                          src={
                            "https://canine.hirectjob.in/storage/app/public/profile/" +
                            order.user_id[0].image
                          }
                          alt={order.user_id[0].f_name}
                        />
                      </>
                      <div className="brand-bg">
                        {order.user_id && order.user_id.length > 0 && (
                          <h5>
                            {order.user_id[0].f_name} {order.user_id[0].l_name}
                          </h5>
                        )}
                        <p>{order.comment}</p>
                        <div className="icon-style">
                          {Array.from({
                            length: order.rating,
                          }).map((_, index) => (
                            <Link>
                              <i className="fa fa-star" />
                            </Link>
                          ))}
                        </div>
                        {/* <Link>4.2/5</Link> */}
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
              </div>
                </Col>
              </Row>
            </Container>
          </section>
        </>)}
        <Petshopfooter />
    </>
  );
};

export default Petshoptestimonials;
