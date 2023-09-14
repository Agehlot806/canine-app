import React, { useEffect, useState } from "react";
import Newheader from '../../directives/newheader'
import shop from '../../assets/images/banner/shop.png'
import { Container, Table, Row, Col, Button } from 'react-bootstrap'
import bag from "../../assets/images/icon/bag.png";
import { Link, useLocation } from 'react-router-dom';
import product1 from "../../assets/images/img/product1.png";
import Footer from '../../directives/footer';
import axios from "axios";
import { BASE_URL } from "../../Constant/Index";
import { styled } from "styled-components";
import toast, { Toaster } from "react-hot-toast";

function Partneroneshop() {

    const { state } = useLocation()
    // console.log('state', state)
    const [vendorItemList, setVendorItemList] = useState([]);
    const [allproduct, setallproduct] = useState([]);

    useEffect(() => {
        VendorItems();
        fetchWishlistData();
    }, []);

    // vendor item 
    const VendorItems = async () => {
        try {
            const response = await fetch(`${BASE_URL}/vendor/get-items-list/${state.item.id}`);
            const data = await response.json();
            const latestPosts = data.data.slice(0, 8);
            setVendorItemList(latestPosts);
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

    // const vendorID = state.item.id
    // console.log("vendorIDvendorIDvendorID",vendorID);
    const customer_id = localStorage.getItem("userInfo");
    let storedUserId = JSON.parse(customer_id);
    const [buttonVisibility, setButtonVisibility] = useState({});
    const [addToCartStatus, setAddToCartStatus] = useState("");

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
    const [isFavCheck, setisFavCheck] = useState(false);
    const [wishlistData, setWishlistData] = useState([]);
    // =============================================================================
    // ================================================================================
    // Product details code with modal
    // ================================================================================
    // =============================================================================

    const [productDetails, setProductDetails] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [selectedVariant, setSelectedVariant] = useState([]);
    const [selectedVariantPrice, setSelectedVariantPrice] = useState([]);
    console.log("productDetails---->", productDetails);
    const handleIncrementone = () => {
        setQuantity(quantity + 1);
    };
    const handleDecrementone = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };
    useEffect(() => {
        if (productDetails?.variations && productDetails.variations.length > 0) {
            const defaultVariant = productDetails.variations[0];
            setSelectedVariant(defaultVariant.type);
            setSelectedVariantPrice(defaultVariant.price);
        }
    }, [productDetails]);

    // useEffect(() => {
    //   productData();
    // }, []);

    useEffect(() => {
        if (allproduct.length > 0) {
            handleWishlist();
        }

        return () => {
            setisFavCheck(false);
        };
    }, [isFavCheck]);


    const fetchWishlistData = async () => {
        try {
            await axios
                .get(`${BASE_URL}/customer/wish-list/${storedUserId}`)
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
        if (!storedUserId) {
            // If the user is not logged in, navigate to the login page
            navigate("/login");
            return; // Exit the function without adding to wishlist
        }

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


    const productData = async (selctId) => {
        axios
            .get(`${BASE_URL}/items/product_details/${selctId}`)
            .then((response) => {
                console.log("=======>", response);
                console.log("product details Successful");
                setProductDetails(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
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
                {productDetails.rating_count >= index + 1 ? (
                    <i className="fa fa-star" />
                ) : productDetails.rating_count >= number ? (
                    <i className="fa fa-star-half-o" />
                ) : (
                    <i className="fa fa-star-o" />
                )}
            </span>
        );
    });

    let uservariationprice = 0;

    if (selectedVariantPrice !== null) {
        uservariationprice = selectedVariantPrice;
    }
    uservariationprice = uservariationprice * (quantity > 1 ? quantity : 1);

    const Amount = Math.floor(
        uservariationprice - (uservariationprice * productDetails.discount) / 100
    ).toFixed(2);

    const formattedAmount = Number(Amount).toString();

    const savedAmount = Math.floor(
        productDetails.price * quantity - Amount
    ).toFixed(2);
    const formattedSavedAmount = Number(savedAmount).toString();


    // Lightbox product =====
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
            "https://canine.hirectjob.in/storage/app/public/product/" +
            productDetails.images[index]
        );
    };

    const handleMainImageClick = () => {
        setLightboxIsOpen(true);
        setLightboxImageIndex(productDetails.images.indexOf(mainImage));
    };
    const handeldataId = (id) => {
        productData(id);
    }

    return (
        <>
            <Toaster />
            <Newheader />
            <Container fluid className='p-0'>
                <div className='all-bg'>
                    <img src={shop} />
                </div>
            </Container>

            <section className='section-padding'>
                <Container>
                    <div className='partner-oneshop'>
                        <Table>
                            <tbody>
                                <tr>
                                    <th>Partner Name :</th>
                                    <td>{state.item.name}</td>
                                </tr>
                                <tr>
                                    <th>Address :</th>
                                    <td>{state.item.address}</td>
                                </tr>
                                <tr>
                                    <th>Mobile :</th>
                                    <td>{state.item.phone}</td>
                                </tr>
                                <tr>
                                    <th>Email ID :</th>
                                    <td>{state.item.email}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                </Container>
            </section>
            <section className='section-padding'>
                <Container>
                    <Row>
                        {vendorItemList && vendorItemList.length > 0 ? (
                            vendorItemList.map((item, index) => (
                                <Col lg={3} sm={6} xs={6} className="mb-4">
                                    <div className="food-product"
                                        onMouseEnter={() => handleMouseEnter(item.id)}
                                        onMouseLeave={() => handleMouseLeave(item.id)}
                                        style={{ background: gradientColors[index % gradientColors.length], }}>
                                        <i
                                            class={
                                                item.isFav ? "fa-solid fa-heart" : "fa-regular fa-heart"
                                            }
                                            onClick={(id) => {
                                                if (storedUserId == null) {
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
                                                <p>{item.description}</p>
                                            </div>
                                            <div className="product-bag">
                                                <Row>
                                                    <Col>
                                                        <p>₹{item.price}</p>
                                                    </Col>
                                                    <Col>
                                                        <h5>{item.discount}</h5>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col className="align-self-center">
                                                        <h6>{`₹${item.price -
                                                            (item.price * item.discount) / 100
                                                            }`}</h6>
                                                    </Col>
                                                    <Col>
                                                        <Link to="">
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
                            ))
                        ) : (
                            <p className="emptyMSG">No Product By Partner Data.</p>
                        )}
                    </Row>
                    <div className="allblogbtn">
                        <Button key={state.item.id}>
                            <Link to={`/product-partner-shop/${state.item.id}`}>View All</Link>
                        </Button>
                    </div>
                </Container>
            </section>

            <Footer />
            {/* Product details Modal */}
            <div className="modal fade bd-example-modal-lg" tabIndex={-1} role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-body">
                            <i class="quickarea fa fa-times" data-dismiss="modal" />
                            <section className="section-padding">
                                <Container>
                                    <Row>
                                        <Col lg={6} sm={6}>
                                            <>
                                                <div>
                                                    <div className="product-item quickviewimg">
                                                        <img
                                                            src={mainImage}
                                                            alt="Product Image"
                                                            onClick={handleMainImageClick}
                                                        />
                                                    </div>
                                                    <div className="needplace">
                                                        <Row>
                                                            {productDetails?.images &&
                                                                productDetails?.images.length > 0 ? (
                                                                productDetails.images.map((item, index) => (
                                                                    <Col
                                                                        lg={3}
                                                                        sm={3}
                                                                        xs={3}
                                                                        className="mb-3"
                                                                        key={index}
                                                                    >
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

                                                {lightboxIsOpen && (
                                                    <Lightbox
                                                        mainSrc={
                                                            "https://canine.hirectjob.in/storage/app/public/product/" +
                                                            productDetails.images[lightboxImageIndex]
                                                        }
                                                        nextSrc={
                                                            "https://canine.hirectjob.in/storage/app/public/product/" +
                                                            productDetails.images[
                                                            (lightboxImageIndex + 1) % productDetails.images.length
                                                            ]
                                                        }
                                                        prevSrc={
                                                            "https://canine.hirectjob.in/storage/app/public/product/" +
                                                            productDetails.images[
                                                            (lightboxImageIndex +
                                                                productDetails.images.length -
                                                                1) %
                                                            productDetails.images.length
                                                            ]
                                                        }
                                                        onCloseRequest={() => setLightboxIsOpen(false)}
                                                        onMovePrevRequest={() =>
                                                            setLightboxImageIndex(
                                                                (lightboxImageIndex +
                                                                    productDetails.images.length -
                                                                    1) %
                                                                productDetails.images.length
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
                                                        <p>({productDetails.rating_count} customer reviews)</p>
                                                    </div>
                                                </Wrapper>

                                                <div className="needplaceProduct">
                                                    <Row>
                                                        <Col sm={6} xs={6}>
                                                            <div>
                                                                <div>
                                                                    <div className="tab-container">
                                                                        <h6>Variations</h6>
                                                                        <Row>
                                                                            {productDetails?.variations &&
                                                                                productDetails?.variations.length > 0 &&
                                                                                productDetails.variations.map((item, index) => (
                                                                                    <Col lg={4} key={index}>
                                                                                        <div
                                                                                            className={`tab-variations ${selectedVariant === item.type
                                                                                                ? "active"
                                                                                                : ""
                                                                                                }`}
                                                                                            onClick={() => {
                                                                                                setSelectedVariant(item.type);
                                                                                                setSelectedVariantPrice(item.price);
                                                                                            }}
                                                                                        >
                                                                                            {item.type}
                                                                                        </div>
                                                                                    </Col>
                                                                                ))}
                                                                        </Row>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Col>
                                                        <Col sm={6} xs={6}>
                                                            <div className="quantity-btn quickbtn">
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
                                                                <p>{`₹${uservariationprice}`}</p>
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
                                            <Button>
                                                <Link to={`/add-cart/${productDetails.id}`} onClick={handleAddToCart}>
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
                                </Container>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
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
export default Partneroneshop