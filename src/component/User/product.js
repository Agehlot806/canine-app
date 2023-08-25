import React, { useEffect, useState } from "react";
import Newheader from "../../directives/newheader";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import Carousel from "react-multi-carousel";
import product from "../../assets/images/banner/product.png";
import { Link } from "react-router-dom";
import product1 from "../../assets/images/img/product1.png";
import product2 from "../../assets/images/img/product2.png";
import product3 from "../../assets/images/img/product3.png";
import Footer from "../../directives/footer";
import productdetail from "../../assets/images/banner/productdetail.png";
import bannerone from "../../assets/images/banner/banner.png";
import { BASE_URL } from "../../Constant/Index";
import axios from "axios";
import bag from "../../assets/images/icon/bag.png";
import { Toaster, toast } from "react-hot-toast";
import _ from "lodash";

const clinetreview = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    slidesToSlide: 2, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 1, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};
function Product(props) {
  const [categories, setcategories] = useState([]);
  const [allproduct, setallproduct] = useState([]);
  const [itembannerdata, setitembannerdata] = useState([]);

  useEffect(() => {
    categoriesProduct();
    allProduct();
    itemBanner();
    allBrandshow()
    allLifesageshow()
    allBreedshow()
    allHealthconditionshow();
   
  }, []);

  const categoriesProduct = async () => {
    try {
      const response = await fetch(`${BASE_URL}/categories`);
      const jsonData = await response.json();
      setcategories(jsonData.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const allProduct = async () => {
    axios
      .get(`${BASE_URL}/items/latest`)
      .then((response) => {
        console.log(response);
        console.log("Delete Successful");
        setallproduct(response.data.data);
        // Perform any additional actions after successful deletion
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const itemBanner = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/banners/`);
      setitembannerdata(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };



  const [brandDropdownVisible, setBrandDropdownVisible] = useState(false);
  const [productTypeDropdownVisible, setProductTypeDropdownVisible] =
    useState(false);
  const [priceDropdownVisible, setPriceDropdownVisible] = useState(false);
  const [lifestageDropdownVisible, setLifestageDropdownVisible] =
    useState(false);
  const [breedTypeDropdownVisible, setBreedTypeDropdownVisible] =
    useState(false);
  const [healthDropdownVisible, setHealthDropdownVisible] = useState(false);
  const [specialDietDropdownVisible, setSpecialDietDropdownVisible] =
    useState(false);
  const [vegNonvegDropdownVisible, setVegNonvegDropdownVisible] =
    useState(false);
  const [groomingFeatureDropdownVisible, setGroomingFeatureDropdownVisible] =
    useState(false);
  const [groomingToolsDropdownVisible, setGroomingToolsDropdownVisible] =
    useState(false);
  const [accessoryTypeDropdownVisible, setAccessoryTypeDropdownVisible] =
    useState(false);
  const handleParentClick = (dropdownName) => {
    switch (dropdownName) {
      case "brand":
        setBrandDropdownVisible(!brandDropdownVisible);
        break;
      case "productType":
        setProductTypeDropdownVisible(!productTypeDropdownVisible);
        break;
      case "price":
        setPriceDropdownVisible(!priceDropdownVisible);
        break;
      case "lifestage":
        setLifestageDropdownVisible(!lifestageDropdownVisible);
        break;
      case "breedType":
        setBreedTypeDropdownVisible(!breedTypeDropdownVisible);
        break;
      case "health":
        setHealthDropdownVisible(!healthDropdownVisible);
        break;
      case "specialDiet":
        setSpecialDietDropdownVisible(!specialDietDropdownVisible);
        break;
      case "veg-Non-veg":
        setVegNonvegDropdownVisible(!vegNonvegDropdownVisible);
        break;
      case "groomingFeature":
        setGroomingFeatureDropdownVisible(!groomingFeatureDropdownVisible);
        break;
      case "groomingTools":
        setGroomingToolsDropdownVisible(!groomingToolsDropdownVisible);
        break;
      case "accessoryType":
        setAccessoryTypeDropdownVisible(!accessoryTypeDropdownVisible);
      default:
        break;
    }
  };
  const handleCheckboxClick = (event) => {
    event.stopPropagation();
  };

  // storedUserId
  const customer_id = localStorage.getItem("userInfo");
  let storedUserId = JSON.parse(customer_id);
  console.log("storedUserId: ", storedUserId);
  console.log("customer_id: ", customer_id);
  // ----------------------------------------

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

  const gradientColors = [
    "linear-gradient(180deg, #FFF0BA 0%, rgba(251.81, 233.11, 165.78, 0) 100%)",
    "linear-gradient(180deg, #C7EBFF 0%, rgba(199, 235, 255, 0) 100%)",
    "linear-gradient(180deg, #FECBF0 0%, rgba(254, 203, 240, 0) 100%)",
    "linear-gradient(180deg, #C8FFBA 0%, rgba(200, 255, 186, 0) 100%)",
    // Add more gradient colors as needed
  ];

  // const [paginatedCategories, setPaginatedCategories] = useState([]);
  // const [currentPage, setCurrentPage] = useState(1);
  // const pageSize = 3;
  // useEffect(() => {
  //   // Update the paginated categories whenever brandcategories or currentPage changes
  //   pagination(currentPage);
  // }, [allproduct, currentPage]);

  // const pageCount = allproduct ? Math.ceil(allproduct.length / pageSize) : 0;
  // const pages = _.range(1, pageCount + 1);

  // const pagination = (pageNo) => {
  //   setCurrentPage(pageNo);
  //   const startIndex = (pageNo - 1) * pageSize;
  //   const paginated = _(allproduct).slice(startIndex).take(pageSize).value();
  //   setPaginatedCategories(paginated);
  // };

  /////tarunbirla////

  const [allbrand, setAllBrand] = useState("")
  const [alllifesage, setAlllifesage] = useState("")
  const [allbreed, setAllBreed] = useState("")
  const [allhealth, setAllHealth] = useState("")
  const allBrandshow = async () => {
    axios
      .get(`https://canine.hirectjob.in/api/v1/auth/brand`)
      .then((response) => {
        // console.log("responseresponse?????",response);
        setAllBrand(response.data.data);
        // Perform any additional actions after successful deletion
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const allLifesageshow = async () => {
    axios
      .get(`https://canine.hirectjob.in/api/v1/auth/all_life_stage/`)
      .then((response) => {
        console.log("responseresponse?????", response);
        setAlllifesage(response.data.data);
        // Perform any additional actions after successful deletion
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const allBreedshow = async () => {
    axios
      .get(`https://canine.hirectjob.in/api/v1/auth/all_pets_breed/`)
      .then((response) => {
        console.log("responseresponse?????", response);
        setAllBreed(response.data.data);
        // Perform any additional actions after successful deletion
      })
      .catch((error) => {
        console.log(error);
      });
  };



  const allHealthconditionshow = async () => {
    axios
      .get(`https://canine.hirectjob.in/api/v1/auth/health_condition/`)
      .then((response) => {
        console.log("responseresponse?????", response);
        setAllHealth(response.data.data);
        // Perform any additional actions after successful deletion
      })
      .catch((error) => {
        console.log(error);
      });
  };



  const [selectedBrandIds, setSelectedBrandIds] = useState([]);
  const [selectedlifeIds, setSelectedLifeIds] = useState([]);
  const [selectedbreedIds, setSelectedbreedIds] = useState([]);
  const [selectedhealthIds, setSelectedhealthIds] = useState([]);
  const handleDataListBrand = (brand_id) => {
    setSelectedBrandIds((prevSelectedBrandIds) => 
     prevSelectedBrandIds.includes(brand_id)
        ? prevSelectedBrandIds.filter((id) => id !== brand_id)
        : [...prevSelectedBrandIds, brand_id]

      );
      filterProducts(); // Pass the updated brand IDs to filter function
  };

  const Lifesatedataselect = (name) => {
    setSelectedLifeIds((prevSelectedLifedIds) =>
      prevSelectedLifedIds.includes(name)
        ? prevSelectedLifedIds.filter((id) => id !== name)
        : [...prevSelectedLifedIds, name]
    );
    filterProducts();
  };

  const allbreedselect = (name) => {
    setSelectedbreedIds((prevSelectedBreedIds) =>
      prevSelectedBreedIds.includes(name)
        ? prevSelectedBreedIds.filter((id) => id !== name)
        : [...prevSelectedBreedIds, name]
    );
    filterProducts();
  };

  const healthcoditionselect = (name) => {
    setSelectedhealthIds((prevSelectedBreedIds) =>
      prevSelectedBreedIds.includes(name)
        ? prevSelectedBreedIds.filter((id) => id !== name)
        : [...prevSelectedBreedIds, name]
    );
    filterProducts();
  };

  const filterProducts = async () => {

    try {
      const response = await axios.get("https://canine.hirectjob.in/api/v1/items/latest");
      const products = response.data.data; // Make sure to adapt this according to your API response
      const filteredProducts = applyFilters({
        selectedBrands: selectedBrandIds.length ===0 ? null:selectedBrandIds,
        selectLifeStageFilterList: selectedlifeIds.length === 0 ? null : selectedlifeIds,
        selectBreedFilterList: selectedbreedIds.length === 0 ? null : selectedbreedIds,
        selectHealthConditionFilterList:selectedhealthIds.length === 0 ? null :selectedhealthIds,
        products: products,
      });
      console.log("/////", filteredProducts);
      console.log("======", products);
      setallproduct(filteredProducts)
    } catch (error) {
      console.error('Error:', error);
    }

  };
  const applyFilters = ({
    selectedBrands,
    selectLifeStageFilterList,
    selectBreedFilterList,
    selectHealthConditionFilterList,
    products,

  }) => {
    return products.filter(product => {
      const brandFilter = !selectedBrands || selectedBrands.includes(product.brand_id);
      const lifeStageFilter = !selectLifeStageFilterList || selectLifeStageFilterList.includes(product.lifeStage_id);
      const breedFilter = !selectBreedFilterList || selectBreedFilterList.includes(product.Petsbreeds_id);
      const healthConditionFilter = !selectHealthConditionFilterList || selectHealthConditionFilterList.includes(product.helthCondition_id);
      return (
        brandFilter &&
        lifeStageFilter &&
        healthConditionFilter &&
        breedFilter
      );
    });
  };
  return (
    <>
      <Toaster />
      <Newheader />
      <Container fluid className="p-0">
        <div className="all-bg">
          <img src={product} />
        </div>
      </Container>

      <Container>
        <Row>
          <Col lg={3}>
            <section className="section-padding">
              <div className="filter-product">
                <h3>Filters</h3>
                <hr />
                <div
                  onClick={() => handleParentClick("brand")}
                  className="main-chk"
                >
                  Brand
                  <div className="i-con">
                    <span>
                      <i class="fa fa-angle-down" aria-hidden="true"></i>
                    </span>
                  </div>
                  {brandDropdownVisible && (
                    <>
                      <div>
                        {allbrand ? (
                          allbrand.map((items) => (
                            <div
                              className="form-check"
                              onClick={handleCheckboxClick}
                            >
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="defaultCheck1"
                                onChange={(e) => handleDataListBrand(items.title)}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="defaultCheck1"
                              >
                                {items.title}
                              </label>
                            </div>

                          ))
                        ) : ""}
                      </div>
                    </>
                  )}
                </div>
                <hr />

                <div
                  onClick={() => handleParentClick("price")}
                  className="main-chk"
                >
                  Price
                  <div className="i-con">
                    <span>
                      <i class="fa fa-angle-down" aria-hidden="true"></i>
                    </span>
                  </div>
                  {priceDropdownVisible && (
                    <>
                      <div>

                        <div className="form-range" onClick={handleCheckboxClick}>
                          <span>₹</span>
                          <input type="number" 
                          placeholder="From" />
                        </div>
                        <div className="form-range" onClick={handleCheckboxClick}>
                          <span>₹</span>
                          <input type="number"
                             placeholder="From" />
                        </div>
                      </div>

                    </>
                  )}
                </div>
                <hr />
                <div
                  onClick={() => handleParentClick("lifestage")}
                  className="main-chk"
                >
                  Lifestage
                  <div className="i-con">
                    <span>
                      <i class="fa fa-angle-down" aria-hidden="true"></i>
                    </span>
                  </div>
                  {lifestageDropdownVisible && (
                    <>
                      <div>
                        {alllifesage ? (
                          alllifesage.map((items) => (


                            <div
                              className="form-check"
                              onClick={handleCheckboxClick}
                            >
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="defaultCheck1"
                                onChange={(e) => Lifesatedataselect(items.name)}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="defaultCheck1"
                              >
                                {items.name}
                              </label>
                            </div>
                          ))
                        ) : ""}
                      </div>
                    </>
                  )}
                </div>
                <hr />
                <div
                  onClick={() => handleParentClick("breedType")}
                  className="main-chk"
                >
                  Breed Type
                  <div className="i-con">
                    <span>
                      <i class="fa fa-angle-down" aria-hidden="true"></i>
                    </span>
                  </div>
                  {breedTypeDropdownVisible && (
                    <>
                      <div>
                        {allbreed ? (
                          allbreed.map((items) => (


                            <div
                              className="form-check"
                              onClick={handleCheckboxClick}
                            >
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="defaultCheck1"
                                onChange={(e) => allbreedselect(items.name)}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="defaultCheck1"
                              >
                                {items.name}
                              </label>
                            </div>
                          ))
                        ) : ""}
                      </div>
                    </>
                  )}
                </div>
                <hr />
                <div
                  onClick={() => handleParentClick("health")}
                  className="main-chk"
                >
                  Health Condition
                  <div className="i-con">
                    <span>
                      <i class="fa fa-angle-down" aria-hidden="true"></i>
                    </span>
                  </div>
                  {healthDropdownVisible && (
                    <>
                      <div>
                        {allhealth ? (
                          allhealth.map((items) => (

                            <div
                              className="form-check"
                              onClick={handleCheckboxClick}
                            >
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="defaultCheck1"
                                onClick={(e) => healthcoditionselect(items.title)}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="defaultCheck1"
                              >
                                {items.title}
                              </label>
                            </div>
                          ))
                        ) : ""}

                      </div>
                    </>
                  )}
                </div>
                <hr />

                <div
                  onClick={() => handleParentClick("veg-Non-veg")}
                  className="main-chk"
                >
                  Veg/Non-veg
                  <div className="i-con">
                    <span>
                      <i class="fa fa-angle-down" aria-hidden="true"></i>
                    </span>
                  </div>
                  {vegNonvegDropdownVisible && (
                    <>
                      <div>
                        <div
                          className="form-check"
                          onClick={handleCheckboxClick}
                        >
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="defaultCheck1"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="defaultCheck1"
                          >
                            Non-Veg (219)
                          </label>
                        </div>
                        <div
                          className="form-check"
                          onClick={handleCheckboxClick}
                        >
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="defaultCheck1"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="defaultCheck1"
                          >
                            Veg (73)
                          </label>
                        </div>
                      </div>
                    </>
                  )}
                </div>
                <hr />



              </div>
            </section>
          </Col>
          <Col lg={9}>
            <section className="section-padding">
              <Container>
                <h1 className="main-head">Shop Deals For Your Best Buddy</h1>
              </Container>
              <Container fluid>
                <Carousel
                  swipeable={true}
                  draggable={true}
                  showDots={true}
                  responsive={clinetreview}
                  ssr={true} // means to render carousel on server-side.
                  infinite={true}
                  autoPlay={props.deviceType !== "mobile" ? true : false}
                  autoPlaySpeed={2000}
                  keyBoardControl={true}
                  customTransition="all 1s"
                  transitionDuration={1000}
                  containerClass="carousel-container"
                  removeArrowOnDeviceType={["tablet", "mobile"]}
                  deviceType={props.deviceType}
                  dotListClass="custom-dot-list-style"
                  itemClass="carousel-item-padding-40-px"
                >
                  {categories.map((item) => (
                    <div className="product-Deals" key={item.id}>
                      <Link to={`/pet-category/${item.id}`}>
                        <img
                          src={
                            "https://canine.hirectjob.in/storage/app/public/category/" +
                            item.image
                          }
                        />
                        <h1>{item.name}</h1>
                      </Link>
                    </div>
                  ))}
                </Carousel>
              </Container>
            </section>

            <section className="section-padding food">
              <Container>
                <Row>
                  {/* {allproduct &&
                    allproduct.map((item,index) => (
                      <Col lg={4} sm={6} xs={6} className="mb-4">
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
                                  <Link to="">
                                    <img src={bag} />
                                  </Link>
                                </Col>
                              </Row>
                            </div>
                          </Link>
                        </div>
                      </Col>
                    ))} */}
                  {allproduct.map((item, index) => (
                    <Col lg={4} sm={6} xs={6} className="mb-4">
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
                                <Link to="">
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

                {/* <div className="pagination-area">
                  <ul className="pagination">
                    {pages.map((page) => (
                      <li
                        key={page}
                        className={
                          page === currentPage
                            ? "page-item active"
                            : "page-item"
                        }
                      >
                        <button
                          className="page-link"
                          onClick={() => pagination(page)}
                        >
                          {page}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div> */}
              </Container>
            </section>

            <Container fluid className="p-0">
              <div className="all-bg">
                {itembannerdata ? (
                  itembannerdata.map(
                    (item, index) =>
                      item.type === "item_wise" && (
                        <Col sm={12} className="mb-4">
                          <img
                            src={
                              "https://canine.hirectjob.in/storage/app/public/banner/" +
                              item.image
                            }
                          />
                        </Col>
                      )
                  )
                ) : (
                  <p className="emptyMSG">No Items Banner.</p>
                )}
              </div>
            </Container>
          </Col>
        </Row>
      </Container>

      <Footer />
    </>
  );
}

export default Product;
