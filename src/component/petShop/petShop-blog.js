import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { BASE_URL } from "../../Constant/Index";
import about from "../../assets/images/banner/banner.png";
import { Link } from "react-router-dom";
import PetShopHeader from "../../directives/petShopHeader";
import Petshopfooter from "../../directives/petShop-Footer";
import loadinggif from "../../assets/images/video/loading.gif";

function PetshopBlog() {
  const [blog, setblog] = useState([]);
  const [showFullParagraph, setShowFullParagraph] = useState(false);
  const [paragraphData, setParagraphData] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const fetchBlogs = async () => {
    try {
      const response = await fetch(`${BASE_URL}/auth/blog`);
      const data = await response.json();
      setblog(data.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    Promise.all([fetchBlogs()])
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const renderBlogDescription = (description) => {
    // Remove HTML tags
    const removeHTMLTags = (html) => {
      const doc = new DOMParser().parseFromString(html, "text/html");
      return doc.body.textContent || "";
    };

    // Remove HTML tags and attributes
    const plainTextDescription = removeHTMLTags(description);

    const maxCharacters = 350; // Number of characters to show initially

    if (plainTextDescription.length <= maxCharacters) {
      return <p>{plainTextDescription}</p>; // Show the full description if it's short
    }

    const truncatedDescription = plainTextDescription.slice(0, maxCharacters);

    return (
      <>
        <p>{truncatedDescription}......</p>
      </>
    );
  };
  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    if (searchQuery.length > 0) {
      // Filter products when the search query changes
      const filteredProducts = blog.filter((product) => {
        const lowerSearchQuery = searchQuery.toLowerCase();
        return (
          (product.title &&
            product.title.toLowerCase().includes(lowerSearchQuery)) ||
          (product.description &&
            product.description.toLowerCase().includes(lowerSearchQuery)) ||
          (product.sub_category &&
            product.sub_category.toLowerCase().includes(lowerSearchQuery)) ||
          (product.category_ids &&
            product.category_ids.toLowerCase().includes(lowerSearchQuery)) ||
          (product.brand_id &&
            product.brand_id.toLowerCase().includes(lowerSearchQuery)) ||
          (product.lifeStage_id &&
            product.lifeStage_id.toLowerCase().includes(lowerSearchQuery)) ||
          (product.helthCondition_id &&
            product.helthCondition_id
              .toLowerCase()
              .includes(lowerSearchQuery)) ||
          (product.Petsbreeds_id &&
            product.Petsbreeds_id.toLowerCase().includes(lowerSearchQuery)) ||
          (product.price &&
            product.price.toLowerCase().includes(lowerSearchQuery)) ||
          (product.wholePrice &&
            product.wholePrice.toLowerCase().includes(lowerSearchQuery))
        );
      });

      setFilteredProducts(filteredProducts);
      console.log("=========>>>>>>>", filteredProducts);
    } else {
      setFilteredProducts([]);
    }
  }, [searchQuery, blog]);

  return (
    <>
      <PetShopHeader />
      {loading ? (
        <section className="section-padding mt-3 mb-3">
          <div className="loaderimg text-center text-black mb-4">
            <img src={loadinggif} alt="" />
            <h5>Please Wait.......</h5>
          </div>
        </section>
      ) : (
        <>
          <Container fluid className="p-0">
            <div className="all-bg">
              <img src={about} />
            </div>
          </Container>
          <section className="section-padding">
            <Container>
              <div className="text-right">
                <div className="search-bar">
                  <input
                    type="text"
                    placeholder="Search Blog"
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                    className="search-input"
                  />
                  <button type="button" className="search-button">
                    <i className="fa fa-search" />
                  </button>
                </div>
                {/* Your dropdown here */}
                <ul className="search-dropdown">
                  {filteredProducts.map((product, index) => (
                    <li key={index}>
                      <Link to={`/petShop-blog-details/${product.id}`}>
                        {product.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Container>
          </section>
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
                              <Link to={`/petshop-blog-details/${item.id}`}>
                                Read More
                              </Link>
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
        </>
      )}
      <Petshopfooter />
    </>
  );
}

export default PetshopBlog;
