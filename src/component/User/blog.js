import React, { useState, useEffect } from "react";
import Newheader from '../../directives/newheader';;
import Footer from "../../directives/footer";
import { Container, Row, Col, Button } from "react-bootstrap";
import { BASE_URL } from "../../Constant/Index";
import about from "../../assets/images/banner/about.png";
import { Link } from "react-router-dom";

function Blog() {
  const [blog, setblog] = useState([]);
  const [showFullParagraph, setShowFullParagraph] = useState(false);
  const [paragraphData, setParagraphData] = useState("");

  const fetchBlogs = async () => {
    try {
      const response = await fetch(`${BASE_URL}/auth/blog`);
      const data = await response.json();
      setblog(data.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };
  useEffect(() => {
    fetchBlogs();
  }, []);

  const renderBlogDescription = (description) => {
    const maxCharacters = 350; // Number of characters to show initially

    if (description.length <= maxCharacters) {
      return <p>{description}</p>; // Show the full description if it's short
    }

    const truncatedDescription = description.slice(0, maxCharacters);

    return (
      <>
        <p>{truncatedDescription}.......</p>
      </>
    );
  };

  return (
    <>
      <Newheader />
      <Container fluid className="p-0">
        <div className="all-bg">
          <img src={about} />
        </div>
      </Container>
      <section className="section-padding">
        <Container>
          <Row>
            {blog && blog.length > 0 ? (
              blog.map((item, index) => (
                <Col lg={12} className="mb-4">
                  <div className="blog-card-are" key={item.id}>
                    <Row>
                      <Col sm={5}>
                        <img
                          src={
                            "https://canine.hirectjob.in//storage/app/public/blog/" +
                            item.image
                          }
                        />
                      </Col>
                      <Col sm={7} className="align-self-center">
                        <div className="blog-cardContent">
                          <h4>{item.title}</h4>
                          <p>{renderBlogDescription(item.description)}</p>
                          <Link to={`/blog-details/${item.id}`}>Read More</Link>
                          <hr />
                          <Row>
                            <Col lg={8}>
                              <div className="blog-comment">
                                <Link>
                                  <i className="fa fa-user" /> {item.author}
                                </Link>
                              </div>
                            </Col>
                          </Row>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Col>
              ))
            ) : (
              <p className="emptyMSG">No Blog Data.</p>
            )}
          </Row>
          
        </Container>
      </section>
      <Footer />
    </>
  );
}

export default Blog;
