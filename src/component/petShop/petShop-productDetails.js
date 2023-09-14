import React, { useEffect, useState } from "react";
import productdetail from "../../assets/images/banner/productdetail.png";
import product from "../../assets/images/banner/product.png";
import productItem from "../../assets/images/img/brandPro1.png";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import product1 from "../../assets/images/img/product1.png";
import product2 from "../../assets/images/img/product2.png";
import product3 from "../../assets/images/img/product3.png";
import bag from "../../assets/images/icon/bag.png";
import { AiOutlineStar } from "react-icons/ai";
import axios from "axios";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { BASE_URL } from "../../Constant/Index";
import { styled } from "styled-components";
import toast from "react-hot-toast";
import PetShopHeader from "../../directives/petShopHeader";
import Petshopfooter from "../../directives/petShop-Footer";

function PetshopproductDetails() {
  const { id } = useParams();
  console.log("id: ", id);
  // *************************
  const storedWholesellerId = Number(localStorage.getItem("UserWholesellerId"));
  const salesmanId = localStorage.getItem("salesmanId");
  console.log("storedWholesellerId: ", storedWholesellerId);
  // **********************

  const verifiredIdaccess = Number(localStorage.getItem("verifiedId"));
  console.log("vrifiredIdaccessvrifiredIdaccess", verifiredIdaccess);
  const [productDetails, setProductDetails] = useState([]);
  // console.log("productDetailss: ", productDetails?.variations[0]?.type);
  const categoryid = productDetails.category_id;
  const itemsid = productDetails.id;
  console.log("categoryiddd: ", categoryid);
  // console.log("productDetailsssssssssss: ", productDetails);
  console.log(
    "productDetails.variations[0].type: ",
    productDetails?.variations?.type
  );
  const demousercheck = () => {
    toast.error("Profile is not verified");
  };
  const [itemwiseonebanner, setitemwiseonebanner] = useState([]);
  const [homebanner, sethomebanner] = useState([]);
  // const { stars, reviews } = Productdetail;
  const [quantity, setQuantity] = useState(100);
  const [minOrder, setMinOrder] = useState(100);
  console.log("quantity: ", quantity);
  const [selectedVariant, setSelectedVariant] = useState([]);
  const [selectedVariantPrice, setSelectedVariantPrice] = useState([]);
  console.log("selectedVariant: ", selectedVariant);

  // const handleIncrementone = () => {
  //   if (verifiredIdaccess === 1) {
  //     setQuantity(quantity + 1);
  //   }
  // };
  // const handleDecrementone = () => {
  //   if (quantity > 1) {
  //     setQuantity(quantity - 1);
  //   }
  // };
  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value, 10);
    if (!isNaN(newQuantity) && newQuantity >= minOrder) {
      setQuantity(newQuantity);
    }
  };

  const handleIncrementOne = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrementOne = () => {
    if (quantity > minOrder) {
      setQuantity(quantity - 1);
    }
  };
  useEffect(() => {
    const fetchedProductDetails = {
      // Your fetched product details here
      min_order: 105, // Simulated min_order for example
      categoryid: productDetails.category_id,
    };

    setProductDetails(fetchedProductDetails);

    if (
      fetchedProductDetails?.min_order !== null &&
      fetchedProductDetails?.min_order > 0
    ) {
      setMinOrder(fetchedProductDetails.min_order);
      setQuantity(fetchedProductDetails.min_order);
    }
  }, []);
  useEffect(() => {
    if (productDetails?.variations && productDetails.variations.length > 0) {
      const defaultVariant = productDetails.variations[0];
      setSelectedVariant(defaultVariant.type);
      setSelectedVariantPrice(defaultVariant.price);
    }
  }, [productDetails]);

  useEffect(() => {
    productData();
    itemWiseBanner();
    fetchrelatedproduct();
    fetchBreed();
    AllBanner();
    AllOrderList();
    fetchWishlistData();
  }, []);

  const productData = async () => {
    axios
      .get(`${BASE_URL}/items/product_details/${id}`)
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

  // const handleQuantityChange = (event) => {
  //   const newQuantity = parseInt(event.target.value, 10);
  //   if (!isNaN(newQuantity)) {
  //     setQuantity(newQuantity);
  //   }
  // };
  const ratingStar = Array.from({ length: 5 }, (item, index) => {
    let number = index + 0.5;
    return (
      <span key={index}>
        {productDetails.rating_count >= index + 1 ? (
          <FaStar className="icon" />
        ) : productDetails.rating_count >= number ? (
          <FaStarHalfAlt className="icon" />
        ) : (
          <AiOutlineStar className="icon" />
        )}
      </span>
    );
  });

  // Lightbox product =====
  const [mainImage, setMainImage] = useState("");
  useEffect(() => {
    if (productDetails.image) {
      setMainImage(
        "https://canine.hirectjob.in/storage/app/public/product/" +
        productDetails.image
      );
    }
  }, [productDetails]);
  console.log("Main Image URL:", mainImage);
  const [singleImage, setsingleImage] = useState("");

  useEffect(() => {
    if (productDetails.image) {
      setsingleImage(
        "https://canine.hirectjob.in/storage/app/public/product/" +
        productDetails.image
      );
    }
  }, [productDetails]);

  const handleThumbnailClick = (index) => {
    const clickedImage = productDetails.images[index];
    setMainImage(
      "https://canine.hirectjob.in/storage/app/public/product/" + clickedImage
    );
  };
  const AllBanner = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/banners/`);
      sethomebanner(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };
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
  console.log("allrelatedproduct: ", allrelatedproduct);
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
  const [allproduct, setallproduct] = useState([]);
  const [tragetSpecies, setTragetSpecies] = useState([]);
  const fetchBreed = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/auth/breed/1`);
      const names = response.data.data.map((item) => item.name);
      setTragetSpecies(names);

      // Handle response as needed
    } catch (error) {
      console.error(error);
      // Handle error as needed
    }
  };

  const gradientColors = [
    "linear-gradient(180deg, #FFF0BA 0%, rgba(251.81, 233.11, 165.78, 0) 100%)",
    "linear-gradient(180deg, #C7EBFF 0%, rgba(199, 235, 255, 0) 100%)",
    "linear-gradient(180deg, #FECBF0 0%, rgba(254, 203, 240, 0) 100%)",
    "linear-gradient(180deg, #C8FFBA 0%, rgba(200, 255, 186, 0) 100%)",
    // Add more gradient colors as needed
  ];
  let wholesellervariationprice = 0;
  console.log("wholesellervariationprice: ", wholesellervariationprice);

  if (selectedVariantPrice !== null) {
    wholesellervariationprice = selectedVariantPrice;
  }
  const Amount = (wholesellervariationprice * quantity).toFixed(2);
  const formattedAmount = Number(Amount).toString();
  console.log("formattedAmount: ", formattedAmount);
  // const savedAmount = (
  //   wholesellervariationprice * quantity -
  //   (wholesellervariationprice * quantity * productDetails.discount) / 100
  // ).toFixed(2);

  // const savedAmount = Math.floor(
  //   wholesellervariationprice * quantity - Amount
  // ).toFixed(2);
  // const formattedSavedAmount = Number(savedAmount).toString();

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

  const [totalreview, setTotalreview] = useState(false);
  const [orderlist, setorderlist] = useState([]);
  const AllOrderList = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/customer/order/list?id=${storedWholesellerId}`);
      setorderlist(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const toggleReview = (e) => {
    e.preventDefault();
    setTotalreview(!totalreview);
  };

  const [buttonVisibility, setButtonVisibility] = useState({});

  const handleMouseEnter = (productId) => {
    setButtonVisibility((prevVisibility) => ({
      ...prevVisibility,
      [productId]: true,
    }));
  };

  const handleMouseLeave = (productId) => {
    setButtonVisibility((prevVisibility) => ({
      ...prevVisibility,
      [productId]: false,
    }));
  };

  const productDatatwo = async (selctId) => {
    axios
      .get(`${BASE_URL}/items/product_details/${selctId}`)
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

  const handeldataId = (id) => {
    productDatatwo(id);
  }

  return (
    <>
      <PetShopHeader />
      <div className="home-section">
        <Container fluid className="p-0">
          <div>
            {homebanner
              ? homebanner.map(
                (item, index) =>
                  item.type === "default" && (
                    <div className="home-img">
                      <div className="">
                        <img
                          src={
                            "https://canine.hirectjob.in/storage/app/" +
                            item.image
                          }
                        />
                      </div>
                      <Row>
                        <Col lg={7}>
                          <div className="home-content">
                            <h1>{item.title}</h1>
                            <p>{item.description}</p>
                            <Button>
                              Explore More <i className="fa fa-angle-right" />
                            </Button>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  )
              )
              : null}
          </div>
        </Container>
      </div>
      <section className="section-padding">
        <Container>
          <Row>
            <Col lg={6}>
              <div>
                <div className="product-item">
                  <img src={mainImage} alt="Product Image" />
                </div>
                <div className="needplace">
                  <Row>
                    {/* <Col sm={2} className="mb-3">
                      <div
                        className="product-item-inner" onClick={() => handleThumbnailClick(index)}>
                        <img src={singleImage} />
                      </div></Col> */}
                    {productDetails?.images &&
                      productDetails?.images.length > 0 ? (
                      productDetails?.images.map((item, index) => (
                        <Col sm={2} className="mb-3" key={index}>
                          <div
                            className="product-item-inner"
                            onClick={() => handleThumbnailClick(index)}
                          >
                            <img
                              src={
                                "https://canine.hirectjob.in/storage/app/public/product/" +
                                item
                              }
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
            </Col>
            <Col lg={6}>
              <div className="productDetail-content">
                <Row>
                  <Col lg={10}>
                    <h4>{productDetails.name}</h4>
                  </Col>
                </Row>
                <p>
                  By <span>{productDetails.store_name}</span>
                </p>

                <Wrapper>
                  <div className="icon-style">
                    {ratingStar}
                    <p>({productDetails.rating_count} customer reviews)</p>
                  </div>
                </Wrapper>

                <div className="needplaceProduct">
                  <Row>
                    <Col sm={6}>
                      <div className="tab-container">
                        <h6>Variations</h6>
                        <Row>
                          {productDetails?.variations &&
                            productDetails?.variations.length > 0 &&
                            productDetails.variations.map((item, index) => (
                              <Col lg={3} sm={3} xs={3} key={index}>
                                <div
                                  className={`tab-variations ${selectedVariant === item.type
                                    ? "active"
                                    : ""
                                    }`}
                                  onClick={() => {
                                    setSelectedVariant(item.type);
                                    setSelectedVariantPrice(item.price); // Store the price in state
                                  }}
                                >
                                  {item.type}
                                </div>
                              </Col>
                            ))}
                        </Row>
                      </div>
                    </Col>
                    <Col sm={6}>
                      <div className="quantity-btn">
                        <button onClick={handleDecrementOne}>
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
                        <button onClick={handleIncrementOne}>
                          <i className="fa fa-plus" />
                        </button>
                      </div>
                    </Col>
                  </Row>
                </div>
                <div className="needplaceProduct">
                  <div className="product-deatils-price">
                    <Row>
                      {/* <Col lg={3}> */}
                      {/* <p>{`₹${productDetails.whole_price}`}</p> */}
                      {/* <p>{`₹${wholesellervariationprice}`}</p> */}
                      {/* {console.log(
                          "productDetails?.variations?.price: ",
                          productDetails?.variations?.price
                        )} */}
                      {/* </Col> */}
                      <Col lg={4}>
                        <h5>{`₹${wholesellervariationprice}`}</h5>
                      </Col>
                      {/* <Col lg={5}>
                        <h6>
                          Your save
                          {formattedSavedAmount >= 0
                            ? "₹" + formattedSavedAmount
                            : "No savings"}
                        </h6>
                      </Col> */}
                    </Row>
                  </div>
                </div>
                <h5>About Us</h5>
                {console.log(
                  "productDetails.brand_id: ",
                  productDetails.brand_id
                )}

                {productDetails ? (
                  <Table responsive>
                    <tbody>
                      <tr>
                        <th>Brand</th>
                        <td>{productDetails?.brand_id}</td>
                      </tr>
                      <tr>
                        <th>Age Range</th>
                        <td>{productDetails?.lifeStage_id}</td>
                      </tr>
                      <tr>
                        <th>Health Condition</th>
                        <td>{productDetails?.helthCondition_id}</td>
                      </tr>
                      <tr>
                        <th>Target Species</th>
                        <td>{productDetails?.Petsbreeds_id}</td>
                      </tr>
                      {/* <tr>
                          <th>Item From</th>
                          <td>Pellet</td>
                        </tr> */}
                    </tbody>
                  </Table>
                ) : (
                  <p>No data available for this product.</p>
                )}
              </div>
            </Col>
          </Row>
          {productDetails.stock && productDetails.stock.length !== 0 ? (
            <div className="productBTNaddcard">
              {verifiredIdaccess === 1 ? (
                <Button>
                  <Link
                    to={`/petshop-add-cart/${id}`}
                    onClick={handleAddToCart}
                  >
                    <i className="fa fa-shopping-bag" /> Add to cart
                  </Link>
                </Button>
              ) : (
                <Button onClick={demousercheck}>
                  <Link>
                    <i className="fa fa-shopping-bag" /> Add to cart
                  </Link>
                </Button>
              )}
              <p>{addToCartStatus}</p>
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
          {/* </Row> */}
          <div className="productBTNaddcard">
            {/* <Button>
              <Link to="/petshop-add-cart">
                <i className="fa fa-shopping-bag" /> Add to cart
              </Link>
            </Button> */}
          </div>
          <h1 className="main-head mt-4">Product details</h1>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s,
          </p>
          <hr />
          <div className="Product-Review">
            <h1 className="main-head mt-4">Product Review</h1>
            {orderlist && orderlist.length > 1 ? (
              orderlist.map(
                (order, index) =>
                  index === 0 && (
                    <div key={order.id}>
                      {order.callback[0].user_profile && (
                        <div className="Product-img">
                          <img
                            src={
                              "https://canine.hirectjob.in/storage/app/public/profile/" +
                              order.callback[0].user_profile[0].image
                            } />
                          <span>{order.callback[0].user_profile[0].f_name}</span>
                        </div>
                      )}
                      {order.callback[0].user_details && (
                        <>
                          <p>
                            {order.callback[0].user_details.comment}
                          </p>
                          <Wrapper>
                            <div className="icon-style">
                              {Array.from({ length: order.callback[0].user_details.rating }).map((_, index) => (
                                <i className="fa-solid fa-star" key={index} />
                              ))}
                            </div>
                          </Wrapper>
                        </>
                      )}
                      <hr />
                    </div>
                  )
              )
            ) : (
              <p>No Review</p>
            )}
            <div className="reviewMore">
              <a href="#" onClick={toggleReview}>
                Read more
                {totalreview ? (
                  <i className="fa fa-angle-up" aria-hidden="true"></i>
                ) : (
                  <i className="fa fa-angle-down" aria-hidden="true"></i>
                )}
              </a>
              {totalreview &&
                <>
                  {orderlist.map((order) => (
                    <div key={order.id}>
                      {order.callback[0].user_profile && (
                        <div className="Product-img">
                          <img
                            src={
                              "https://canine.hirectjob.in/storage/app/public/profile/" +
                              order.callback[0].user_profile[0].image
                            } />
                          <span>{order.callback[0].user_profile[0].f_name}</span>
                        </div>
                      )}
                      {order.callback[0].user_details && (
                        <>
                          <p>
                            {order.callback[0].user_details.comment}
                          </p>
                          <Wrapper>
                            <div className="icon-style">
                              {Array.from({ length: order.callback[0].user_details.rating }).map((_, index) => (
                                <i className="fa-solid fa-star" key={index} />
                              ))}
                            </div>
                          </Wrapper>
                        </>
                      )}
                      <hr />
                    </div>
                  ))}
                </>
              }
            </div>
          </div>

        </Container>
      </section>
      <Container fluid className="p-0">
        <div className="product-innerBanner">
          <div>
            {homebanner
              ? homebanner.map(
                (item, index) =>
                  item.type === "item_wise" && (
                    <div className="home-img">
                      <div className="">
                        <img
                          src={
                            "https://canine.hirectjob.in/storage/app/" +
                            item.image
                          }
                        />
                      </div>
                      <Row>
                        <Col lg={7}>
                          <div className="home-content">
                            <h1>{item.title}</h1>
                            <p>{item.description}</p>
                            <Button>
                              Explore More <i className="fa fa-angle-right" />
                            </Button>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  )
              )
              : null}
          </div>
        </div>
      </Container>

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
                      onMouseEnter={() => handleMouseEnter(item.id)}
                      onMouseLeave={() => handleMouseLeave(item.id)}
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
                      <Link to={`/petshop-productDetails/${item.id}`}>
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
                            <Col>
                              <p>₹999.00</p>
                            </Col>
                            <Col>
                              <h5>{item.discount}%</h5>
                            </Col>
                          </Row>
                          <Row>
                            <Col className="align-self-center">
                              <h6>₹{item.price}</h6>
                            </Col>
                            <Col>
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
                      {buttonVisibility[item.id] && (
                        <div className="button-container">
                          <button data-toggle="modal" data-target=".bd-example-modal-lg" onClick={(e) => handeldataId(item.id)}>Quick View</button>
                          <button>Buy Now</button>
                        </div>
                      )}
                    </div>
                  </Col>
                ))}
            </Row>
          </div>
        </Container>
      </section>
      <Petshopfooter />

      {/* Product details Modal */}
      <div className="modal fade bd-example-modal-lg" tabIndex={-1} role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-body">
              <i class="quickarea fa fa-times" data-dismiss="modal" />
              <section className="section-padding">
                <Container>
                  <Row>
                    <Col lg={6}>
                      <div>
                        <div className="product-item quickviewimg">
                          <img src={mainImage} alt="Product Image" />
                        </div>
                        <div className="needplace">
                          <Row>
                            {/* <Col sm={2} className="mb-3">
                      <div
                        className="product-item-inner" onClick={() => handleThumbnailClick(index)}>
                        <img src={singleImage} />
                      </div></Col> */}
                            {productDetails?.images &&
                              productDetails?.images.length > 0 ? (
                              productDetails?.images.map((item, index) => (
                                <Col sm={3} className="mb-3" key={index}>
                                  <div
                                    className="product-item-inner"
                                    onClick={() => handleThumbnailClick(index)}
                                  >
                                    <img
                                      src={
                                        "https://canine.hirectjob.in/storage/app/public/product/" +
                                        item
                                      }
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
                    </Col>
                    <Col lg={6}>
                      <div className="productDetail-content">
                        <Row>
                          <Col lg={10}>
                            <h4>{productDetails.name}</h4>
                          </Col>
                        </Row>
                        <p>
                          By <span>{productDetails.store_name}</span>
                        </p>

                        <Wrapper>
                          <div className="icon-style">
                            {ratingStar}
                            <p>({productDetails.rating_count} customer reviews)</p>
                          </div>
                        </Wrapper>

                        <div className="needplaceProduct">
                          <Row>
                            <Col sm={6}>
                              <div className="tab-container">
                                <h6>Variations</h6>
                                <Row>
                                  {productDetails?.variations &&
                                    productDetails?.variations.length > 0 &&
                                    productDetails.variations.map((item, index) => (
                                      <Col lg={4} sm={3} xs={3} key={index}>
                                        <div
                                          className={`tab-variations ${selectedVariant === item.type
                                            ? "active"
                                            : ""
                                            }`}
                                          onClick={() => {
                                            setSelectedVariant(item.type);
                                            setSelectedVariantPrice(item.price); // Store the price in state
                                          }}
                                        >
                                          {item.type}
                                        </div>
                                      </Col>
                                    ))}
                                </Row>
                              </div>
                            </Col>
                            <Col sm={6}>
                              <div className="quantity-btn quickbtn">
                                <button onClick={handleDecrementOne}>
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
                                <button onClick={handleIncrementOne}>
                                  <i className="fa fa-plus" />
                                </button>
                              </div>
                            </Col>
                          </Row>
                        </div>
                        <div className="needplaceProduct">
                          <div className="product-deatils-price">
                            <Row>
                              {/* <Col lg={3}> */}
                              {/* <p>{`₹${productDetails.whole_price}`}</p> */}
                              {/* <p>{`₹${wholesellervariationprice}`}</p> */}
                              {/* {console.log(
                          "productDetails?.variations?.price: ",
                          productDetails?.variations?.price
                        )} */}
                              {/* </Col> */}
                              <Col lg={4}>
                                <h5>{`₹${wholesellervariationprice}`}</h5>
                              </Col>
                              {/* <Col lg={5}>
                        <h6>
                          Your save
                          {formattedSavedAmount >= 0
                            ? "₹" + formattedSavedAmount
                            : "No savings"}
                        </h6>
                      </Col> */}
                            </Row>
                          </div>
                        </div>
                        <h5>About Us</h5>
                        {console.log(
                          "productDetails.brand_id: ",
                          productDetails.brand_id
                        )}

                        {productDetails ? (
                          <Table responsive>
                            <tbody>
                              <tr>
                                <th>Brand</th>
                                <td>{productDetails?.brand_id}</td>
                              </tr>
                              <tr>
                                <th>Age Range</th>
                                <td>{productDetails?.lifeStage_id}</td>
                              </tr>
                              <tr>
                                <th>Health Condition</th>
                                <td>{productDetails?.helthCondition_id}</td>
                              </tr>
                              <tr>
                                <th>Target Species</th>
                                <td>{productDetails?.Petsbreeds_id}</td>
                              </tr>
                              {/* <tr>
                          <th>Item From</th>
                          <td>Pellet</td>
                        </tr> */}
                            </tbody>
                          </Table>
                        ) : (
                          <p>No data available for this product.</p>
                        )}
                      </div>
                    </Col>
                  </Row>
                  {productDetails.stock && productDetails.stock.length !== 0 ? (
                    <div className="productBTNaddcard">
                      {verifiredIdaccess === 1 ? (
                        <Button>
                          <Link
                            to={`/petshop-add-cart/${id}`}
                            onClick={handleAddToCart}
                          >
                            <i className="fa fa-shopping-bag" /> Add to cart
                          </Link>
                        </Button>
                      ) : (
                        <Button onClick={demousercheck}>
                          <Link>
                            <i className="fa fa-shopping-bag" /> Add to cart
                          </Link>
                        </Button>
                      )}
                      <p>{addToCartStatus}</p>
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
                  {/* </Row> */}
                  <div className="productBTNaddcard">
                    {/* <Button>
              <Link to="/petshop-add-cart">
                <i className="fa fa-shopping-bag" /> Add to cart
              </Link>
            </Button> */}
                  </div>
                  <h1 className="main-head mt-4">Product details</h1>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting
                    industry. Lorem Ipsum has been the industry's standard dummy text
                    ever since the 1500s,
                  </p>
                  <hr />
                  <div className="Product-Review">
                    <h1 className="main-head mt-4">Product Review</h1>
                    {orderlist && orderlist.length > 1 ? (
                      orderlist.map(
                        (order, index) =>
                          index === 0 && (
                            <div key={order.id}>
                              {order.callback[0].user_profile && (
                                <div className="Product-img">
                                  <img
                                    src={
                                      "https://canine.hirectjob.in/storage/app/public/profile/" +
                                      order.callback[0].user_profile[0].image
                                    } />
                                  <span>{order.callback[0].user_profile[0].f_name}</span>
                                </div>
                              )}
                              {order.callback[0].user_details && (
                                <>
                                  <p>
                                    {order.callback[0].user_details.comment}
                                  </p>
                                  <Wrapper>
                                    <div className="icon-style">
                                      {Array.from({ length: order.callback[0].user_details.rating }).map((_, index) => (
                                        <i className="fa-solid fa-star" key={index} />
                                      ))}
                                    </div>
                                  </Wrapper>
                                </>
                              )}
                              <hr />
                            </div>
                          )
                      )
                    ) : (
                      <p>No Review</p>
                    )}
                    <div className="reviewMore">
                      <a href="#" onClick={toggleReview}>
                        Read more
                        {totalreview ? (
                          <i className="fa fa-angle-up" aria-hidden="true"></i>
                        ) : (
                          <i className="fa fa-angle-down" aria-hidden="true"></i>
                        )}
                      </a>
                      {totalreview &&
                        <>
                          {orderlist.map((order) => (
                            <div key={order.id}>
                              {order.callback[0].user_profile && (
                                <div className="Product-img">
                                  <img
                                    src={
                                      "https://canine.hirectjob.in/storage/app/public/profile/" +
                                      order.callback[0].user_profile[0].image
                                    } />
                                  <span>{order.callback[0].user_profile[0].f_name}</span>
                                </div>
                              )}
                              {order.callback[0].user_details && (
                                <>
                                  <p>
                                    {order.callback[0].user_details.comment}
                                  </p>
                                  <Wrapper>
                                    <div className="icon-style">
                                      {Array.from({ length: order.callback[0].user_details.rating }).map((_, index) => (
                                        <i className="fa-solid fa-star" key={index} />
                                      ))}
                                    </div>
                                  </Wrapper>
                                </>
                              )}
                              <hr />
                            </div>
                          ))}
                        </>
                      }
                    </div>
                  </div>

                </Container>
              </section>
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

export default PetshopproductDetails;
