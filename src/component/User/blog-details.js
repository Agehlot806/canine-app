import React, { useState, useEffect } from "react";
import Footer from "../../directives/footer";
import { Container, Row, Col } from "react-bootstrap";
import { BASE_URL } from "../../Constant/Index";
// import blog1 from "../../assets/images/img/blog.png";
import { useParams } from "react-router-dom";
import axios from "axios";
import Newheader from "../../directives/newheader";

function Blogdetails() {
  const { id } = useParams();
  console.log("id", id);

  useEffect(() => {
    allblogs();
  }, []);
  const [blogdata, setBlogdata] = useState([]);

  const allblogs = () => {
    axios
      .get(`${BASE_URL}/auth/blog_detail/${id}`)
      .then((response) => {
        setBlogdata(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  return (
    <>
      <Newheader />
      <section className="section-padding">
        <Container>
          <Row className="justify-content-center">
            <Col lg={10}>
              <div className="blogDetails">
                {blogdata && blogdata.length > 0 ? (
                  blogdata.map((item, index) => (
                    <Col lg={12} className="mb-4" key={item.id}>
                      <div className="blog-card-are">
                        <Row>
                          <Col sm={5}>
                            {/* <img
                              src={
                                item.image
                                  ? `https://veejayjewels.com/storage/app/public/banner/${item.image}`
                                  : blog1
                              }
                              alt=""
                            /> */}
                            <img
                              src={
                                "https://canine.hirectjob.in/storage/app/public/blog/" +
                                item.image
                              }
                            />
                          </Col>
                          <Col sm={7} className="align-self-center">
                            <div className="blog-cardContent">
                              <h4>{item.title}</h4>
                              <p>{item.description}</p>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </Col>
                  ))
                ) : (
                  <p className="emptyMSG">No Blog Data.</p>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <Footer />
    </>
  );
}

export default Blogdetails;
