import React, { useEffect, useState } from "react";
import Newheader from "../../directives/newheader";
import productdetail from "../../assets/images/banner/productdetail.png";
import product from "../../assets/images/banner/product.png";
import productItem from "../../assets/images/img/brandPro1.png";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import { Link, Navigate, useParams } from "react-router-dom";
import Footer from "../../directives/footer";
import product1 from "../../assets/images/img/product1.png";
import product2 from "../../assets/images/img/product2.png";
import product3 from "../../assets/images/img/product3.png";
import bag from "../../assets/images/icon/bag.png";
import axios from "axios";
import star from "../star";
import { BASE_URL } from "../../Constant/Index";
import { Toaster, toast } from "react-hot-toast";
import brandPro1 from "../../assets/images/img/brandPro1.png";
import brandPro2 from "../../assets/images/img/brandPro2.png";
import brandpro3 from "../../assets/images/img/brandPro3.png";
import bannerPro from "../../assets/images/img/bannerPro.png";
import pro from "../../assets/images/icon/pro.png";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";
import { styled } from "styled-components";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // Import the CSS for the lightbox styles

function Productdetail() {
  const { id } = useParams();
  console.log("id: ", id);
  const [productDetails, setProductDetails] = useState([]);
  console.log(
    "productDetails.variations[0].type: ",
    productDetails?.variations?.type
  );
  const [itemwiseonebanner, setitemwiseonebanner] = useState([]);
  const [addToCartStatus, setAddToCartStatus] = useState("");
  console.log("productDetails--- ", productDetails);
  const { stars, reviews } = Productdetail;
  const [quantity, setQuantity] = useState(1);
  console.log("quantity: ", quantity);
  const [selectedVariant, setSelectedVariant] = useState([]);
  console.log("selectedVariant: ", selectedVariant);

  const handleIncrementone = () => {
    setQuantity(quantity + 1);
  };
  const handleDecrementone = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };


  useEffect(() => {
    productData();
    itemWiseBanner();
    fetchrelatedproduct();
  }, []);

  const productData = async () => {
    axios
      .get(`${BASE_URL}/items/details/${id}`)
      .then((response) => {
        console.log("=======> ", response);
        console.log("Delete Successful");
        setProductDetails(response.data.data);
        // Perform any additional actions after successful deletion
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const customer_id = localStorage.getItem("userInfo");
  let storedUserId = JSON.parse(customer_id);
  console.log("customer_id: ", customer_id);

  const handleAddToCart = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/customer/wish-list/add_product`,
        {
          item_name: productDetails?.name,
          variant: selectedVariant, // You may need to update this based on your data
          image: productDetails?.image,
          quantity: quantity,
          price: formattedAmount,
          user_id: storedUserId,
          item_id: productDetails?.id,
        }
      );

      if (response.data.success) {
        const updatedCart = [...addToCartStatus, productDetails];
        setAddToCartStatus(updatedCart);
        // setAddToCartStatus("Added to cart!");
        toast.success("Added to cart!");
        // Navigate("/addcart")
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      setAddToCartStatus("Error adding to cart");
    }
  };

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value, 10);
    if (!isNaN(newQuantity)) {
      setQuantity(newQuantity);
    }
  };
  const ratingStar = Array.from({ length: 5 }, (item, index) => {
    let number = index + 0.5;
    return (
      <span key={index}>
        {productDetails?.rating_count ||
          productDetails?.status + 0.5 >= index + 1 ? (
          <FaStar className="icon" />
        ) : productDetails?.rating_count ||
          productDetails?.status + 0.5 >= number ? (
          <FaStarHalfAlt className="icon" />
        ) : (
          <AiOutlineStar className="icon" />
        )}
      </span>
    );
  });



  const itemWiseBanner = async () => {
    try {
      const response = await fetch(`${BASE_URL}/banners/`);
      const data = await response.json();
      const latestPosts = data.data.slice(0, 2);
      setitemwiseonebanner(latestPosts);
    } catch (error) {
      console.log(error);
    }
  };
  const [allrelatedproduct, setallrelatedproduct] = useState([]);

  const fetchrelatedproduct = async () => {
    axios
      .get(`${BASE_URL}/items/product/2/8`)
      .then((response) => {
        console.log(response);
        console.log("Delete Successful");
        setallrelatedproduct(response.data.data);
        // Perform any additional actions after successful deletion
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const gradientColors = [
    "linear-gradient(180deg, #FFF0BA 0%, rgba(251.81, 233.11, 165.78, 0) 100%)",
    "linear-gradient(180deg, #C7EBFF 0%, rgba(199, 235, 255, 0) 100%)",
    "linear-gradient(180deg, #FECBF0 0%, rgba(254, 203, 240, 0) 100%)",
    "linear-gradient(180deg, #C8FFBA 0%, rgba(200, 255, 186, 0) 100%)",
    // Add more gradient colors as needed
  ];
  const Amount = Math.floor(
    productDetails.price * quantity -
    (productDetails.price * quantity * productDetails.discount) / 100
  ).toFixed(2);
  const formattedAmount = Number(Amount).toString();
  // const savedAmount = (
  //   productDetails.price * quantity -
  //   (productDetails.price * quantity * productDetails.discount) / 100
  // ).toFixed(2);
  const savedAmount = Math.floor(
    productDetails.price * quantity - Amount
  ).toFixed(2);
  const formattedSavedAmount = Number(savedAmount).toString();

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



  // Lightbox product =====
  // const [mainImage, setMainImage] = useState("");
  // useEffect(() => {
  //   if (productDetails.image) {
  //     setMainImage(
  //       "https://canine.hirectjob.in/storage/app/public/product/" +
  //       productDetails.image
  //     );
  //   }
  // }, [productDetails]);
  // console.log("Main Image URL:", mainImage);

  // const handleThumbnailClick = (index) => {
  //   const clickedImage = productDetails.images[index];
  //   setMainImage(
  //     "https://canine.hirectjob.in/storage/app/public/product/" + clickedImage
  //   );
  // };


  const [mainImage, setMainImage] = useState("");
  const [lightboxIsOpen, setLightboxIsOpen] = useState(false);
  const [lightboxImageIndex, setLightboxImageIndex] = useState(0);

  useEffect(() => {
    if (productDetails.image) {
      setMainImage(
        "https://canine.hirectjob.in/storage/app/public/product/" +
        productDetails.image
      );
    }
  }, [productDetails]);

  const handleThumbnailClick = (index) => {
    setMainImage(
      "https://canine.hirectjob.in/storage/app/public/product/" + productDetails.images[index]
    );
  };

  const handleMainImageClick = () => {
    setLightboxIsOpen(true);
    setLightboxImageIndex(productDetails.images.indexOf(mainImage));
  };

  return (
    <>
      <Toaster />

      <Newheader />
      <Container fluid className="p-0">
        <div className="all-bg">
          <img src={productdetail} />
        </div>
      </Container>

      <section className="section-padding">
        <Container>
          <Row>
            <Col lg={6} sm={6}>
              <>
                <div>
                  <div className="product-item" >
                    <img src={mainImage} alt="Product Image" onClick={handleMainImageClick} />
                  </div>
                  <div className="needplace">
                    <Row>
                      {productDetails?.images && productDetails?.images.length > 0 ? (
                        productDetails.images.map((item, index) => (
                          <Col lg={2} sm={3} xs={3} className="mb-3" key={index}>
                            <div
                              className="product-item-inner"
                              onClick={() => handleThumbnailClick(index)}
                            >
                              <img
                                src={"https://canine.hirectjob.in/storage/app/public/product/" + item}
                                alt={`Image ${index}`}
                              />
                            </div>
                          </Col>
                        ))
                      ) : (
                        <p className="emptyMSG">No Related Image.</p>
                      )}
                    </Row>
                  </div>
                </div>

                {lightboxIsOpen && (
                  <Lightbox
                    mainSrc={
                      "https://canine.hirectjob.in/storage/app/public/product/" +
                      productDetails.images[lightboxImageIndex]
                    }
                    nextSrc={
                      "https://canine.hirectjob.in/storage/app/public/product/" +
                      productDetails.images[(lightboxImageIndex + 1) % productDetails.images.length]
                    }
                    prevSrc={
                      "https://canine.hirectjob.in/storage/app/public/product/" +
                      productDetails.images[(lightboxImageIndex + productDetails.images.length - 1) % productDetails.images.length]
                    }
                    onCloseRequest={() => setLightboxIsOpen(false)}
                    onMovePrevRequest={() =>
                      setLightboxImageIndex(
                        (lightboxImageIndex + productDetails.images.length - 1) % productDetails.images.length
                      )
                    }
                    onMoveNextRequest={() =>
                      setLightboxImageIndex(
                        (lightboxImageIndex + 1) % productDetails.images.length
                      )
                    }
                  />
                )}
              </>
            </Col>
            <Col lg={6} sm={6}>
              <div className="productDetail-content">
                <Row>
                  <Col lg={9} sm={9} xs={9}>
                    <h4>{productDetails.name}</h4>
                  </Col>
                  <Col lg={3} sm={3} xs={3}>
                    <p>
                      {productDetails.veg == 0 ? (
                        <span>
                          <span className="non-vegetarian">●</span>
                        </span>
                      ) : (
                        <span>
                          <span className="vegetarian">●</span>
                        </span>
                      )}
                    </p>
                  </Col>
                </Row>
                <p>
                  By <span>{productDetails.store_name}</span>
                </p>

                <Wrapper>
                  <div className="icon-style">
                    {ratingStar}
                    <p>({productDetails.reviews || 60} customer reviews)</p>
                  </div>
                </Wrapper>

                <div className="needplaceProduct">
                  <Row>
                    <Col sm={6} xs={6}>
                      <div className="form-group">
                        {/* <p>{`₹${productDetails.choice_options.name}`}</p> */}
                        <select
                          className="form-control"
                          value={selectedVariant}
                          onChange={(e) => setSelectedVariant(e.target.value)}
                        >
                          <option>Choose....</option>
                          {productDetails?.variations &&
                            productDetails?.variations.map((item) => (
                              // <a onClick={(e) => setpet_id(item)}>
                              <option>{item.type}</option>
                            ))}
                        </select>
                        {/* {productDetails?.variations &&
    productDetails?.variations.map((variation) => (
      <option key={variation.type} value={variation.type}>
        {variation.type} - ₹{variation.price} (Stock: {variation.stock})
      </option>
    ))} */}
                      </div>
                    </Col>
                    <Col sm={6} xs={6}>
                      <div className="quantity-btn">
                        <button onClick={handleDecrementone}>
                          <i className="fa fa-minus" />
                        </button>
                        <form>
                          <div className="form-group">
                            <input
                              type="tel"
                              className="form-control"
                              placeholder="Quantity"
                              value={quantity}
                              onChange={handleQuantityChange}
                              autoComplete="new-number"
                            />
                          </div>
                        </form>
                        <button onClick={handleIncrementone}>
                          <i className="fa fa-plus" />
                        </button>
                      </div>
                    </Col>
                  </Row>
                </div>
                <div className="needplaceProduct">
                  <div className="product-deatils-price">
                    <Row>
                      <Col lg={3} sm={3} xs={3}>
                        <p>{`₹${productDetails.price}`}</p>
                        {/* {`₹${item.price - (item.price * item.discount / 100)}` */}
                      </Col>
                      <Col lg={4} sm={4} xs={3}>
                        <h5>{`₹${formattedAmount}`}</h5>
                      </Col>
                      <Col lg={5} sm={5} xs={3}>
                        <h6>
                          Your save
                          {formattedSavedAmount >= 0
                            ? "₹" + formattedSavedAmount
                            : "No savings"}
                        </h6>
                      </Col>
                    </Row>
                  </div>
                </div>
                <h5>About Us</h5>
                <Table responsive>
                  <tbody>
                    <tr>
                      <th>Brand</th>
                      <td>{productDetails.store_name}</td>
                    </tr>
                    {/* <tr>
                      <th>Flavour</th>
                      <td>Chicken</td>
                    </tr> */}
                    <tr>
                      <th>Age Range</th>
                      <td>Adult</td>
                    </tr>
                    <tr>
                      <th>Traget Species</th>
                      <td>Dog</td>
                    </tr>
                    <tr>
                      <th>Item From</th>
                      <td>Pellet</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </Col>
          </Row>
          {productDetails.stock && productDetails.stock.length !== 0 ? (
            <div className="productBTNaddcard">
              <Button>
                <Link to={`/add-cart/${id}`} onClick={handleAddToCart}>
                  <i className="fa fa-shopping-bag" /> Add to cart
                </Link>
                <p>{addToCartStatus}</p>
              </Button>
            </div>
          ) : (
            <div className="sold-out-btn mt-3">
              <Link>Sold Out</Link>
              <br />
              <Button data-toggle="modal" data-target="#soldoutModel">
                Notify Me When Available
              </Button>
            </div>
          )}
          <div>
            <h1 className="main-head mt-4">Product details</h1>
            <p>{productDetails.description}</p>
          </div>
          <hr />
          <div className="Product-Review">
            <h1 className="main-head mt-4">Product Review</h1>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s,
            </p>
            <div className="row">
              <div className="col-sm-3 col">
                <Wrapper>
                  <div className="icon-style">
                    {ratingStar}
                    {/* {productDetails.reviews || 60} */}
                    {/* <p>({productDetails.reviews || 60} customer reviews)</p> */}
                  </div>
                </Wrapper>
              </div>
              <div className="col-sm-5 col">
                <div className="Product-img">
                  <img src={pro} />
                  <span>Wade Warren</span>
                  <div className="user-icon">
                    <i class="fa fa-user" aria-hidden="true"></i>
                    <span> 1 2 3 4 5</span>
                  </div>
                </div>
              </div>
            </div>
            <hr />
          </div>
        </Container>
      </section >

      <Container fluid className="p-0">
        <div className="product-innerBanner">{/* <img src={product} /> */}</div>
      </Container>

      {
        itemwiseonebanner
          ? itemwiseonebanner.map(
            (item, index) =>
              item.type === "item_wise" && (
                <div className="product-innerBanner">
                  <img
                    src={
                      "https://canine.hirectjob.in/storage/app/public/banner/" +
                      item.image
                    }
                  />
                  <div className="home-content">
                    <h1>{item.title}</h1>
                    <p>{item.description}</p>
                    <Button>
                      Explore More <i className="fa fa-angle-right" />
                    </Button>
                  </div>
                </div>
              )
          )
          : null
      }

      <section className="section-padding food">
        <Container>
          <div className="text-left">
            <h1 className="main-head">Related products</h1>
          </div>
          <div className="needplace">
            <Row>
              {allrelatedproduct &&
                allrelatedproduct.map((item, index) => (
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
                        class="fa fa-heart-o"
                        onClick={(id) => addToWishlist(item.id)}
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
                          <p>{item.description}</p>
                        </div>
                        <div className="product-bag">
                          <Row>
                            <Col lg={6} sm={6} xs={6}>
                              <p>₹999.00</p>
                            </Col>
                            <Col lg={6} sm={6} xs={6}>
                              <h5>{item.discount}%</h5>
                            </Col>
                          </Row>
                          <Row>
                            <Col lg={6} sm={6} xs={6} className="align-self-center">
                              <h6>₹{item.price}</h6>
                            </Col>
                            <Col lg={6} sm={6} xs={6}>
                              <Link to={`/add-cart/${id}`} onClick={handleAddToCart}>
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
      <Footer />

      {/* Modal */}
      <div
        className="modal fade"
        id="soldoutModel"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <h4>{productDetails.name}</h4>
              <p>{productDetails.description}</p>
              <form>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Variations</label>
                  <select className="form-control">
                    <option>Choose....</option>
                    {productDetails?.variations &&
                      productDetails?.variations.map((item) => (
                        <option>{item.type}</option>
                      ))}
                  </select>{" "}
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter Email"
                  />
                </div>
                <div className="Notify-Me">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    data-dismiss="modal"
                  >
                    Notify Me When Available
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
const Wrapper = styled.section`
  justify-content: flex-start;

  icon {
    font-size: 2rem;
    color: orange;
  }
  .emty-icon {
    font-size: 2.6rem;
  }
  p {
    margin: 0;
    padding-left: 1.2rem;
  }
`;

export default Productdetail;
