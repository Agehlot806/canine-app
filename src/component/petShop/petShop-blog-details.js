import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { BASE_URL } from "../../Constant/Index";
// import blog1 from "../../assets/images/img/blog.png";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import PetShopHeader from "../../directives/petShopHeader";
import Petshopfooter from "../../directives/petShop-Footer";
import bag from "../../assets/images/icon/bag.png";
import toast, { Toaster } from "react-hot-toast";

function PetshopBlogdetails() {
  const { id } = useParams();
  console.log("id", id);

  useEffect(() => {
    allblogs();
    allProduct();
    fetchWishlistData();
  }, []);
  const [blogdata, setBlogdata] = useState([]);
  const [allproduct, setallproduct] = useState([]);
  const [expandedDescription, setExpandedDescription] = useState({});

  const allProduct = async () => {
    try {
      const response = await fetch(`${BASE_URL}/items/latest`);
      const data = await response.json();
      const latestPosts = data.data.slice(0, 8);
      setallproduct(latestPosts);
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
  // storedWholesellerId
  const storedWholesellerId = Number(localStorage.getItem("UserWholesellerId"));
  console.log("storedWholesellerId: ", storedWholesellerId);
  // ----------------------------------------
  const [wishlistData, setWishlistData] = useState([]);
  const [addToCartStatus, setAddToCartStatus] = useState("");
  const [isFavCheck, setisFavCheck] = useState(false);
  useEffect(() => {
    if (allproduct.length > 0) {
      handleWishlist();
    }

    return () => {
      setisFavCheck(false);
    };
  }, [isFavCheck]);

  const handleAddToCart = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/customer/wish-list/add_product`,
        {
          item_name: productDetails.name,
          // variant: productDetails.variations || "Default", // You may need to update this based on your data
          image: productDetails.image,
          quantity: productDetails.quantity,
          price: productDetails.price,
          user_id: storedWholesellerId,
          item_id: productDetails.id,
        }
      );

      if (response.data.success) {
        const updatedCart = [...addToCartStatus, productDetails];
        setAddToCartStatus(updatedCart);
        // setAddToCartStatus("Added to cart!");
        toast.success("Added to cart!");
        // Navigate("/addcart")
      }
    } 
    catch (error) {
      console.error("Error adding to cart:", error);
      setAddToCartStatus("Error adding to cart");
    }
  };
  const fetchWishlistData = async () => {
    try {
      await axios
        .get(`${BASE_URL}/customer/wish-list/${storedWholesellerId}`)
        .then((response) => {
          console.log("response in whisList", response);
          setWishlistData(response.data.data);
          setisFavCheck(true);
          localStorage.setItem(`wishlist_${productDetails.id}`, 'true');
        });
    } catch (error) {
      console.error("Error fetching wishlist data:", error);
    }
  };

  const handleWishlist = () => {
    let newArr = [...allproduct];

    const filterData = allproduct.filter((el) => {
      return wishlistData.some((ele) => {
        return ele.item_id === el.id;
      });
    });
    console.log("filterData", filterData);

    if (filterData.length > 0) {
      for (let index = 0; index < filterData.length; index++) {
        const element = filterData[index];
        console.log("element", element);
        const indexData = allproduct.map((ele) => ele.id).indexOf(element.id);
        console.log("indexData", indexData);
        newArr[indexData].isFav = true;
        console.log("newArrnewArr", newArr);
        setallproduct(newArr);
      }
    }
  };
  const addToWishlist = async (item_id) => {
    if (!storedWholesellerId) {
      // If the user is not logged in, navigate to the login page
      navigate("/login");
      return; // Exit the function without adding to wishlist
    }

    const formData = new FormData();
    formData.append("user_id", storedWholesellerId);
    formData.append("item_id", item_id);
    axios
      .post(`${BASE_URL}/customer/wish-list/add`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        console.log("response143", response);
        if (response.data.message) {
          toast.success(response.data.message);
          let newArr = [...allproduct];
          const index = allproduct.map((el) => el.id).indexOf(item_id);
          newArr[index].isFav = true;
          setallproduct(newArr);
        }
      })
      .catch((error) => {
        toast.error("Already in your wishlist");
      });
  };

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
      <Toaster />
      <PetShopHeader />
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

      <section className="section-padding food">
        <Container>
          <Row>
            <Col lg={6} sm={6} xs={6}>
              <h1 className="main-head">Related products</h1>
            </Col>
          </Row>
          <div className="needplace">
            <Row>
              {allproduct &&
                allproduct.map((item, index) => (
                  <Col lg={3} sm={6} xs={6} className="mb-4">
                    <div
                      className="food-product"
                      key={item.id}
                      style={{
                        background:
                          gradientColors[index % gradientColors.length],
                      }}
                    >

                      <i
                        class={
                          item.isFav ? "fa-solid fa-heart" : "fa-regular fa-heart"
                        }
                        onClick={(id) => {
                          if (storedWholesellerId == null) {
                            toast.error("Please Login first");
                          } else {
                            addToWishlist(item.id);
                          }
                        }}
                      />

                      <Link to={`/product-details/${item.id}`}>
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
                          {/* <p>{item.description}</p> */}
                          <p
                            className={`truncate-text ${!expandedDescription[item.id]
                              ? "read-more-link"
                              : ""
                              }`}
                          >
                            {item.description}
                            {item.description.length > 100 &&
                              !expandedDescription[item.id] && (
                                <span
                                  className="read-more-link"
                                  onClick={() =>
                                    setExpandedDescription({
                                      ...expandedDescription,
                                      [item.id]: true,
                                    })
                                  }
                                >
                                  Read More
                                </span>
                              )}
                          </p>
                        </div>
                        <div className="product-bag">
                          <Row>
                            <Col lg={6} sm={6} xs={6}>
                              <p>₹{item.price}</p>
                            </Col>
                            <Col lg={6} sm={6} xs={6}>
                              <h5>Save {parseFloat(item.discount)}%</h5>
                            </Col>
                          </Row>
                          <Row>
                            <Col
                              lg={6}
                              sm={6}
                              xs={6}
                              className="align-self-center"
                            >
                              <h6>
                                {/* {`₹${(item.price * item.discount) / 100}`} */}
                                {`₹${item.price -
                                  (item.price * item.discount) / 100
                                  }`}
                              </h6>
                            </Col>
                            <Col lg={6} sm={6} xs={6}>
                              <Link
                                to={`/add-cart/${id}`}
                                onClick={handleAddToCart}
                              >
                                <img src={bag} />
                              </Link>
                            </Col>
                          </Row>
                        </div>
                      </Link>
                    </div>
                  </Col>
                ))}
            </Row>
          </div>
        </Container>
      </section>

      <Petshopfooter />
    </>
  );
}

export default PetshopBlogdetails;
