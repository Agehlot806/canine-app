import React, { useEffect, useState } from "react";
import Wholeheader from "../../directives/wholesalesheader";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import Carousel from "react-multi-carousel";
import product from "../../assets/images/banner/product.png";
import { Link, useParams } from "react-router-dom";
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
import { async } from "q";

function WholeSellerPetcategory() {
  //     const { id } = useParams();
  //   console.log("id", id);
  const [brandDropdownVisible, setBrandDropdownVisible] = useState(false);
  const [brands, setBrands] = useState([]);
  console.log("brands: ", brands);
  const [productTypeDropdownVisible, setProductTypeDropdownVisible] =
    useState(false);
  const [priceDropdownVisible, setPriceDropdownVisible] = useState(false);
  const [lifestageDropdownVisible, setLifestageDropdownVisible] =
    useState(false);
  const [breedTypeDropdownVisible, setBreedTypeDropdownVisible] =
    useState(false);
  const [breed, setBreed] = useState([]);
  const [healthcondition, setHealthcondition] = useState([]);
  const [lifestage, setlifestage] = useState([]);
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
    if (brands) {
    }
    event.stopPropagation();
  };

  const { id, name } = useParams();
  console.log("name: ", name);
  console.log("id", id);

  const [petitemproduct, setpetitemproduct] = useState([]);
  const [subcategories, setsubcategories] = useState([]);

  useEffect(() => {
    allPetitemproduct();
    Allsubcategories();
    fetchBrands();
    fetchBreed();
    fetchHealthcondition();
    fetchLifestage();
    allProduct();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      subcatid(id);
    }, 1000);
  }, [id]);
  const allPetitemproduct = async () => {
    axios
      .get(`${BASE_URL}/items/product/${id}/${subid}`)
      .then((response) => {
        console.log(response);
        console.log("Delete Successful");
        setpetitemproduct(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const Allsubcategories = async () => {
    axios
      .get(`${BASE_URL}/categories/subcategories`)
      .then((response) => {
        console.log(response);
        console.log("Delete Successful");
        setsubcategories(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // storedWholesellerId
  const storedWholesellerId = Number(localStorage.getItem("UserWholesellerId"));
  console.log("storedWholesellerId: ", storedWholesellerId);
  // ----------------------------------------

  const addToWishlist = async (item_id) => {
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
          toast.success("Added successfully");
        }
      })
      .catch((error) => {
        toast.error("Already in your wishlist");
      });
  };

  const [subid, setsubid] = useState("");
  const subcatid = async (id) => {
    setsubid(id);
    console.log("subcategoriesID", subid);
    await axios
      .get(`${BASE_URL}/items/product/${id}/${subid}`)
      .then((response) => {
        console.log(response);
        setpetitemproduct(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const fetchBrands = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/auth/brand`);
      setBrands(response.data.data);

      // Handle response as needed
    } catch (error) {
      console.error(error);
      // Handle error as needed
    }
  };
  const fetchBreed = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/auth/breed/1`);
      setBreed(response.data.data);

      // Handle response as needed
    } catch (error) {
      console.error(error);
      // Handle error as needed
    }
  };

  const fetchHealthcondition = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/auth/health_condition`);
      setHealthcondition(response.data.data);

      // Handle response as needed
    } catch (error) {
      console.error(error);
      // Handle error as needed
    }
  };

  const fetchLifestage = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/auth/life_stage/1`);
      setlifestage(response.data.data);

      // Handle response as needed
    } catch (error) {
      console.error(error);
      // Handle error as needed
    }
  };

  // filter code ==========================
  const [allproduct, setallproduct] = useState([]);
  const [dataList, setDataList] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedlifeStage, setSelectedlifeStage] = useState(null);

  const fetchAllProducts = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/items/latest`);
      setallproduct(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const handleDataListBrand = (brand_id) => {
    const filteredData = allproduct.filter(
      (item) => item.brand_id === brand_id
    );
    setDataList(filteredData);
    setSelectedBrand(brand_id);
  };

  const handleClearFilter = () => {
    setDataList([]);
    setSelectedBrand(null);
  };

  const handleSelectedlifeStage = (lifeStage_id) => {
    const filteredData = allproduct.filter(
      (item) => item.lifeStage_id === lifeStage_id
    );
    setDataList(filteredData);
    setSelectedlifeStage(lifeStage_id);
  };

  const handleClearFilterlifeStage = () => {
    setDataList([]);
    setSelectedlifeStage(null);
  };

  const allProduct = async () => {
    axios
      .get(`${BASE_URL}/items/latest`)
      .then((response) => {
        console.log(response);
        console.log("All Product Successful");
        setallproduct(response.data.data);
        // Perform any additional actions after successful deletion
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [filter, setFilter] = useState(false);

  const handleDataList = async (brand_id) => {
    try {
      const response = await fetch(`${BASE_URL}/items/latest`);
      const jsonData = await response.json();
      // Access nested data
      const nestedData = jsonData.data;
      // Filter the nested data based on brand
      const filteredData = nestedData.filter(
        (item) => item.brand_id == brand_id
      );
      setDataList(filteredData);
      setFilter(true);
    } catch (error) {
      // console.log("Errorr", error);
    }
  };

  const applyFilters = ({
    selectedBrands,
    lifeStage,
    productType,
    breed,
    healthCondition,
    specialDiet,
    selectedVegOptions,
    minPrice,
    maxPrice,
    products,
  }) => {
    return products.filter((product) => {
      const brandFilter =
        !selectedBrands || selectedBrands.includes(product["brand"]);
      const vegFilter =
        !selectedVegOptions || selectedVegOptions.includes(product["veg"]);
      const maxPriceFilter = maxPrice === null || product["price"] < maxPrice;
      const minPriceFilter = minPrice === null || product["price"] > minPrice;
      const lifeStageFilter =
        !lifeStage || lifeStage.includes(product["life-stage"]);
      const breedFilter = !breed || breed.includes(product["breed"]);
      const healthConditionFilter =
        !healthCondition ||
        healthCondition.includes(product["health-condition"]);
      const specialDietFilter =
        !specialDiet || specialDiet.includes(product["special-diet"]);
      return (
        brandFilter &&
        vegFilter &&
        maxPriceFilter &&
        minPriceFilter &&
        lifeStageFilter &&
        breedFilter &&
        healthConditionFilter &&
        specialDietFilter
      );
    });
  };
  const products = [
    {
      name: "Product 1",
      brand: "Brand A",
      veg: true,
      price: 4999,
      "life-stage": "adult",
      "product-type": "dry-dog-food",
      breed: "boxer",
      "health-condition": "sensitive",
      "special-diet": "low-gain",
    },
    {
      name: "Product 2",
      brand: "Brand B",
      veg: false,
      price: 2999,
      "life-stage": "puppy",
      "product-type": "greavy-dog-food",
      breed: "boxer",
      "health-condition": "weaning",
      "special-diet": "gain-free",
    },
    {
      name: "Product 3",
      brand: "Brand C",
      veg: true,
      price: 3999,
      "life-stage": "adult",
      "product-type": "dry-dog-food",
      breed: "pug",
      "health-condition": "weaning",
      "special-diet": "low-gain",
    },
    {
      name: "Product 4",
      brand: "Brand B",
      veg: false,
      price: 5999,
      "life-stage": "puppy",
      "product-type": "greavy-dog-food",
      breed: "pug",
      "health-condition": "sensitive",
      "special-diet": "gain-free",
    },
    {
      name: "Product 5",
      brand: "Brand A",
      veg: true,
      price: 6999,
      "life-stage": "adult",
      "product-type": "dry-dog-food",
      breed: "boxer",
      "health-condition": "weaning",
      "special-diet": "low-gain",
    },
    {
      name: "Product 6",
      brand: "Brand C",
      veg: false,
      price: 2999,
      "life-stage": "adult",
      "product-type": "dry-dog-food",
      breed: "boxer",
      "health-condition": "weaning",
      "special-diet": "low-gain",
    },
    {
      name: "Product 7",
      brand: "Brand C",
      veg: false,
      price: 3999,
      "life-stage": "puppy",
      "product-type": "dry-dog-food",
      breed: "pug",
      "health-condition": "weaning",
      "special-diet": "gain-free",
    },
    // More products...
  ];
  const [filteredProducts, setFilteredProducts] = useState([]);
  const handleFilterClick = () => {
    const filtered = applyFilters({
      // selectedBrands: ["Brand A", "Brand B", "Brand C"],
      // selectedVegOptions: [true, false],
      lifeStage: ["puppy", "adult"],
      products: allproduct,
      maxPrice: 5000,
      minPrice: 0,
      productType: ["dry-dog-food", "greavy-dog-food"],
      breed: ["boxer", "pug"],
      healthCondition: ["weaning", "sensitive"],
      specialDiet: ["low-gain", "gain-free"],
    });
    setFilteredProducts(filtered);
  };
  console.log("Filtered Products:");
  filteredProducts.forEach((product, index) => {
    console.log(`${index + 1}: Name: ${product["name"]}`);
    printAdditionalInfo(product);
    console.log(""); // Add an empty line for separation
  });
  function printAdditionalInfo(product) {
    console.log(`   Brand: ${product["brand"]}`);
    console.log(`   Veg: ${product["veg"]}`);
    console.log(`   Price: ${product["price"]}`);
    console.log(`   Life Stage: ${product["life-stage"]}`);
    console.log(`   Product Type: ${product["product-type"]}`);
    console.log(`   Breed: ${product["breed"]}`);
    console.log(`   Health Condition: ${product["health-condition"]}`);
    console.log(`   Special Diet: ${product["special-diet"]}`);
  }

  const gradientColors = [
    "linear-gradient(180deg, #FFF0BA 0%, rgba(251.81, 233.11, 165.78, 0) 100%)",
    "linear-gradient(180deg, #C7EBFF 0%, rgba(199, 235, 255, 0) 100%)",
    "linear-gradient(180deg, #FECBF0 0%, rgba(254, 203, 240, 0) 100%)",
    "linear-gradient(180deg, #C8FFBA 0%, rgba(200, 255, 186, 0) 100%)",
    // Add more gradient colors as needed
  ];

  const [addToCartStatus, setAddToCartStatus] = useState("");

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
    } catch (error) {
      console.error("Error adding to cart:", error);
      setAddToCartStatus("Error adding to cart");
    }
  };
  return (
    <>
      <Toaster />
      <Wholeheader />
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
                      {brands
                        ? brands.map(
                            (item) =>
                              item.canine == "1" && (
                                <div>
                                  <div
                                    className="form-check"
                                    onClick={handleCheckboxClick}
                                  >
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      id="defaultCheck1"
                                      checked={selectedBrand !== null}
                                      onChange={() => {
                                        if (selectedBrand === null) {
                                          handleDataListBrand(
                                            allproduct[0].brand_id
                                          ); // Set initial brand ID
                                        } else {
                                          handleClearFilter();
                                        }
                                      }}
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor="defaultCheck1"
                                    >
                                      {item.title}
                                    </label>
                                  </div>
                                </div>
                              )
                          )
                        : null}
                    </>
                  )}
                </div>
                <hr />
                <div
                  onClick={() => handleParentClick("productType")}
                  className="main-chk"
                >
                  Product Type
                  <div className="i-con">
                    <span>
                      <i class="fa fa-angle-down" aria-hidden="true"></i>
                    </span>
                  </div>
                  {productTypeDropdownVisible && (
                    <>
                      {subcategories && subcategories.length > 0
                        ? subcategories.map((item) => (
                            <div>
                              <div
                                className="form-check"
                                onClick={handleCheckboxClick}
                              >
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="defaultCheck1"
                                  onClick={handleFilterClick}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="defaultCheck1"
                                >
                                  {item.name}
                                </label>
                              </div>
                            </div>
                          ))
                        : null}
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
                      <div
                        className="form-range"
                        onClick={handleFilterClick}
                        // onClick={handleCheckboxClick}
                      >
                        <span>₹</span>
                        <input type="number" placeholder="From" />
                      </div>
                      <div
                        className="form-range"
                        onClick={handleFilterClick}
                        // onClick={handleCheckboxClick}
                      >
                        <span>₹</span>
                        <input type="number" placeholder="From" />
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
                      {lifestage && lifestage.length > 0
                        ? lifestage.map((item) => (
                            <div>
                              <div
                                className="form-check"
                                onClick={handleCheckboxClick}
                              >
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="defaultCheck1"
                                  checked={selectedBrand !== null}
                                  onChange={() => {
                                    if (selectedBrand === null) {
                                      handleSelectedlifeStage(
                                        allproduct[0].lifeStage_id
                                      ); // Set initial brand ID
                                    } else {
                                      handleClearFilterlifeStage();
                                    }
                                  }}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="defaultCheck1"
                                >
                                  {item.name}
                                </label>
                              </div>
                            </div>
                          ))
                        : null}
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
                      {breed &&
                        breed.map((item) => (
                          <div>
                            <div
                              className="form-check"
                              onClick={handleCheckboxClick}
                            >
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="defaultCheck1"
                                onClick={handleFilterClick}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="defaultCheck1"
                              >
                                {item.name}
                              </label>
                            </div>
                          </div>
                        ))}
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
                      {healthcondition &&
                        healthcondition.map((item) => (
                          <div>
                            <div
                              className="form-check"
                              onClick={handleCheckboxClick}
                            >
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="defaultCheck1"
                                onClick={handleFilterClick}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="defaultCheck1"
                              >
                                {item.title}
                              </label>
                            </div>
                          </div>
                        ))}
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
                            onClick={handleFilterClick}
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
                            onClick={handleFilterClick}
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
            <section className="section-padding food">
              <Container>
                <div className="needplace">
                  <div className="dog-categorys-area">
                    <ul
                      className="nav nav-pills mb-3"
                      id="pills-tab"
                      role="tablist"
                    >
                      {subcategories && subcategories.length > 0 ? (
                        subcategories.map((item, index) => (
                          <li className="nav-item" key={item.id}>
                            <a
                              className={`nav-link ${
                                item.id == id ? "active" : ""
                              }`}
                              id="pills-home-tab"
                              data-toggle="pill"
                              onClick={(id) => subcatid(item.id, item.name)}
                              href="#pills-home"
                              role="tab"
                              aria-controls="pills-home"
                              aria-selected="true"
                            >
                              <img
                                src={
                                  "https://canine.hirectjob.in//storage/app/public/category/" +
                                  item.image
                                }
                              />
                              <h6>{item.name}</h6>
                            </a>
                          </li>
                        ))
                      ) : (
                        <p className="emptyMSG">No Sub Categories.</p>
                      )}
                    </ul>
                    <div className="tab-content" id="pills-tabContent">
                      <div
                        className="tab-pane fade"
                        id="pills-home"
                        role="tabpanel"
                        aria-labelledby="pills-home-tab"
                      >
                        <Row>
                          {petitemproduct && petitemproduct.length > 0 ? (
                            petitemproduct.map((item, index) => (
                              <Col lg={4} sm={6} xs={6} className="mb-4">
                                <div className="food-product" key={item.id}>
                                  <i
                                    class="fa fa-heart-o"
                                    onClick={(id) => addToWishlist(item.id)}
                                  />
                                  <Link
                                    to={`/wholeseller-productDetails/${item.id}`}
                                  >
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
                                          <h5>{item.discount}%</h5>
                                        </Col>
                                      </Row>
                                      <Row>
                                        <Col className="align-self-center">
                                          <h6>{`₹${
                                            item.price -
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
                                </div>
                              </Col>
                            ))
                          ) : (
                            <p className="emptyMSG">
                              No Sub Categories Product.
                            </p>
                          )}
                        </Row>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <Row>
                    {filteredProducts.map((item, index) => (
                      <Col lg={4} sm={6} xs={6} className="mb-4">
                        <div
                          className="food-product"
                          key={index}
                          style={{
                            background:
                              gradientColors[index % gradientColors.length],
                          }}
                        >
                          <i
                            class="fa fa-heart-o"
                            onClick={(id) => addToWishlist(item.id)}
                          />
                          {/* <Link to={`/wholeseller-productDetails/${item.id}`}> */}
                          <div className="text-center">
                            {/* <img
                                        src={
                                          "https://canine.hirectjob.in//storage/app/public/product/" +
                                          item.image
                                        }
                                      /> */}
                          </div>
                          <div>
                            <h6>{item.name}</h6>
                            <p>{item.brand}</p>
                            <p>{item.veg.toString()}</p>
                          </div>
                          <div className="product-bag">
                            <Row>
                              <Col>{/* <p>₹{product.price}</p> */}</Col>
                              <Col>
                                <h5>₹{item.price}</h5>
                              </Col>
                            </Row>
                            <Row>
                              <Col className="align-self-center">
                                {/* <h6>{`₹${item.price -
                                            (item.price * item.discount) / 100
                                            }`}</h6> */}
                              </Col>
                              <Col>
                                <Link to="">
                                  <img src={bag} />
                                </Link>
                              </Col>
                            </Row>
                          </div>
                          {/* </Link> */}
                        </div>
                      </Col>
                    ))}
                  </Row>
                </div>

                <Row>
                  {(selectedBrand !== null ? dataList : allproduct).map(
                    (item, index) => (
                      <Col lg={4} sm={6} xs={6} className="mb-4" key={item.id}>
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
                            onClick={() => addToWishlist(item.id)}
                          />
                          <Link to={`/wholeseller-productDetails/${item.id}`}>
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
                                  <h5>{item.discount}%</h5>
                                </Col>
                              </Row>
                              <Row>
                                <Col className="align-self-center">
                                  <h6>
                                    {/* {`₹${(item.price * item.discount) / 100}`} */}
                                    {`₹${
                                      item.price -
                                      (item.price * item.discount) / 100
                                    }`}
                                  </h6>
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
                        </div>
                      </Col>
                    )
                  )}
                  {dataList.length === 0 && selectedBrand !== null && (
                    <div>No data available for the selected brand.</div>
                  )}
                </Row>
              </Container>
            </section>
          </Col>
        </Row>
      </Container>

      <Footer />
    </>
  );
}

export default WholeSellerPetcategory;
