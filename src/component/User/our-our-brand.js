import React, { useEffect, useState } from "react";
import Newheader from '../../directives/newheader';;
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import ourbrand from "../../assets/images/banner/ourbrand.png";
import { Link, useParams } from "react-router-dom";
import filter from "../../assets/images/icon/filter.png";
import product1 from "../../assets/images/img/product1.png";
import bag from "../../assets/images/icon/bag.png";
import axios from "axios";
import { BASE_URL } from "../../Constant/Index";
import Footer from "../../directives/footer";
import catpng from "../../assets/images/img/catpng.png";
import bannerPro from "../../assets/images/img/bannerPro.png";
import Carousel from "react-multi-carousel";
import brandPro2 from "../../assets/images/img/brandPro2.png";
import product3 from "../../assets/images/img/product3.png";
import { Toaster, toast } from "react-hot-toast";

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

function Ourourbrand(props) {
  // filter tabs
  const [brandDropdownVisible, setBrandDropdownVisible] = useState(false);
  const [cateDropdownVisible, setCateDropdownVisible] = useState(false);
  const [brands, setBrands] = useState([]);
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
      case "cate":
        setCateDropdownVisible(!cateDropdownVisible);
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

  const { id } = useParams();
  console.log("brand id", id);

  const [petitemproduct, setpetitemproduct] = useState([]);
  const [subcategories, setsubcategories] = useState([]);

  useEffect(() => {
    Allsubcategories();
    allProduct();
    fetchBrands();
  }, []);

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

  useEffect(() => {
    fetchWishlistData();
    allBrandshow();
    allLifesageshow();
    allBreedshow();
    allsubcategary();
    allHealthconditionshow();
    Allsubcategoriessecond();
  }, []);
  const customer_id = localStorage.getItem("userInfo");
  let storedUserId = JSON.parse(customer_id);
  const [allproduct, setallproduct] = useState([]);
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
          user_id: storedUserId,
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

  const [subid, setsubid] = useState("");
  const subcatid = () => {
    // console.log("categories id ", id);
    setsubid(id);
    axios
      .get(`${BASE_URL}/banners/brand_product_filter/${id}/${subid}`)
      .then((response) => {
        console.log("responseresponseresponsetarun", response);
        setpetitemproduct(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [allproductbrand, setallproductbrand] = useState([]);
  // const [brands, setBrands] = useState([]);
  const [brandIdsToFilter, setBrandIdsToFilter] = useState([]);
  const [brandCanineToFilter, setBrandCanineToFilter] = useState([]);

  console.log("brandIdsToFilter", brandIdsToFilter);
  console.log("brandCanineToFilter", brandCanineToFilter);

  const allProduct = async () => {
    axios
      .get(`${BASE_URL}/items/latest`)
      .then((response) => {
        console.log(response);
        console.log("all product brand Successful");
        const AllData = response.data.data
        const data = AllData.filter((el) => el.module_id === 1)
        const data1 = data.filter((item) => item.brand_id === id)  
        console.log('data in fetch',data)
        console.log('data1 in fetch',data1)
        setallproductbrand(data1);
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

  const fetchBrands = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/auth/brand`);
      setBrands(response.data.data);
      const titles = response?.data?.data.map((brand) => brand?.title);
      const ourbrand = response?.data?.data.filter((brand) => brand?.canine === 0);
      setBrandIdsToFilter(ourbrand);
      setBrandCanineToFilter(ourbrand);
    } catch (error) {
      console.error(error);
    }
  };

  ///filter////
  const [allbrand, setAllBrand] = useState("");
  const [alllifesage, setAlllifesage] = useState("");
  const [allbreed, setAllBreed] = useState("");
  const [allsubcate, setAllSubcate] = useState("");
  const [allhealth, setAllHealth] = useState("");
  const [subcategoriesecond, setsubcategoriesecond] = useState([]);

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
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const allsubcategary = async () => {
    axios
      .get(`https://canine.hirectjob.in/api/v1/categories`)
      .then((response) => {
        console.log("responseresponse?????", response);
        setAllSubcate(response.data.data);
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

  const Allsubcategoriessecond = async () => {
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

  const [selectedBrandIds, setSelectedBrandIds] = useState([]);
  const [selectedlifeIds, setSelectedLifeIds] = useState([]);
  const [selectedbreedIds, setSelectedbreedIds] = useState([]);
  const [selectedcateIds, setSelectedcateIds] = useState([]);
  const [selectedhealthIds, setSelectedhealthIds] = useState([]);
  const [selectedvegIds, setSelectedvegIds] = useState([]);
  const [selectedsubcateIds, setSelectedsubcateIds] = useState([]);

  const [minpricevalue, setMinpricevalue] = useState([]);
  const [maxpricevalue, setMaxpricevalue] = useState([]);
  const minprice = (e) => {
    setMinpricevalue(e.target.value);
  };
  const maxprice = (e) => {
    setMaxpricevalue(e.target.value);
  };

  const handleDataListBrand = (brand_id) => {
    setSelectedBrandIds((prevSelectedBrandIds) => {
      const updatedBrandIds = prevSelectedBrandIds.includes(brand_id)
        ? prevSelectedBrandIds.filter((id) => id !== brand_id)
        : [...prevSelectedBrandIds, brand_id];
      filterProducts(updatedBrandIds); // Pass the updated brand IDs to filter function
      return updatedBrandIds;
    });
  };

  const Lifesatedataselect = (name) => {
    setSelectedLifeIds((prevSelectedLifeIds) => {
      const updatedLifeIds = prevSelectedLifeIds.includes(name)
        ? prevSelectedLifeIds.filter((id) => id !== name)
        : [...prevSelectedLifeIds, name];
      filterProducts(undefined, updatedLifeIds);
      return updatedLifeIds;
    });
  };

  const allbreedselect = (name) => {
    setSelectedbreedIds((prevSelectedBreedIds) => {
      const updatedBreedIds = prevSelectedBreedIds.includes(name)
        ? prevSelectedBreedIds.filter((id) => id !== name)
        : [...prevSelectedBreedIds, name];
      filterProducts(undefined, undefined, updatedBreedIds);
      return updatedBreedIds;
    });
  };
  const allcateselect = (name) => {
    setSelectedcateIds((prevSelectedBreedIds) => {
      const updatedcateIds = prevSelectedBreedIds.includes(name)
        ? prevSelectedBreedIds.filter((id) => id !== name)
        : [...prevSelectedBreedIds, name];
      filterProducts(undefined, undefined, undefined, updatedcateIds);
      return updatedcateIds;
    });
  };

  const allhealthselect = (name) => {
    setSelectedhealthIds((prevSelectedhealthIds) => {
      const updatedhealthIds = prevSelectedhealthIds.includes(name)
        ? prevSelectedhealthIds.filter((id) => id !== name)
        : [...prevSelectedhealthIds, name];
      filterProducts(
        undefined,
        undefined,
        undefined,
        undefined,
        updatedhealthIds
      );
      return updatedhealthIds;
    });
  };
  const allsubcateselect = (name) => {
    setSelectedsubcateIds((prevSelectedhealthIds) => {
      const updatesubcateIds = prevSelectedhealthIds.includes(name)
        ? prevSelectedhealthIds.filter((id) => id !== name)
        : [...prevSelectedhealthIds, name];
      filterProducts(
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        updatesubcateIds
      );
      return updatesubcateIds;
    });
  };

  const vegnonveghandler = (value) => {
    setSelectedvegIds((prevSelectedvegIds) => {
      const updatedvegIds = prevSelectedvegIds.includes(value)
        ? prevSelectedvegIds.filter((id) => id !== value)
        : [...prevSelectedvegIds, value];
      filterProducts(
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        updatedvegIds
      );
      return updatedvegIds;
    });
  };
  const applyprice = () => {
    filterProducts();
  };

  console.log("/////", selectedsubcateIds);
  const filterProducts = async (
    updatedBrandIds,
    updatedLifeIds,
    updatedBreedIds,
    updatedcateIds,
    updatedhealthIds,
    updatedvegIds,
    updatesubcateIds
  ) => {
    try {
      const response = await axios.get(
        "https://canine.hirectjob.in/api/v1/items/latest"
      );
      const products = response.data.data;
      const filteredProducts = applyFilters({
        selectedBrands: updatedBrandIds || selectedBrandIds,
        selectLifeStageFilterList: updatedLifeIds || selectedlifeIds,
        selectBreedFilterList: updatedBreedIds || selectedbreedIds,
        selectcate: updatedcateIds || selectedcateIds,
        selecthealth: updatedhealthIds || selectedhealthIds,
        selectedVegOptions: updatedvegIds || selectedvegIds,
        selectedsubcate: updatesubcateIds || selectedsubcateIds,
        minPrice: minpricevalue !== "" ? parseFloat(minpricevalue) : null,
        maxPrice: maxpricevalue !== "" ? parseFloat(maxpricevalue) : null,
        // selectedVegOptions: updatedvegIds.map((e) => (e === 0 ? "veg" : "non-veg")),
        // minPrice:  minpricevalue !== [] ? minpricevalue : null,
        // maxPrice: maxpricevalue !== [] ? maxpricevalue : null,
        products: products,
      });
      console.log("/////", filteredProducts);
      console.log("======", products);
      setallproductbrand(filteredProducts);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const applyFilters = ({
    selectedBrands,
    selectLifeStageFilterList,
    selectBreedFilterList,
    selectcate,
    selecthealth,
    selectedVegOptions,
    selectedsubcate,
    minPrice,
    maxPrice,
    products,
  }) => {
    const selectedBrandSet = new Set(selectedBrands);
    const selectedLifeStageSet = new Set(selectLifeStageFilterList);
    const selectedBreedSet = new Set(selectBreedFilterList);
    const selectedcateSet = new Set(selectcate);
    const selectedhealthSet = new Set(selecthealth);
    const selectedvegSet = new Set(selectedVegOptions);
    const selectedsubcateSet = new Set(selectedsubcate);

    return products.filter((product) => {
      const brandFilter =
        selectedBrands.length === 0 ||
        selectedBrandSet.has(product.brand_id.toString());
      const lifeStageFilter =
        selectLifeStageFilterList.length === 0 ||
        selectedLifeStageSet.has(product.lifeStage_id.toString());
      const breedFilter =
        selectBreedFilterList.length === 0 ||
        selectedBreedSet.has(product.Petsbreeds_id.toString());
      const cateFilter =
        selectcate.length === 0 ||
        selectedcateSet.has(product.category_ids.toString());
      const healthFilter =
        selecthealth.length === 0 ||
        selectedhealthSet.has(product.helthCondition_id.toString());
      const subcateFilter =
        selectedsubcate.length === 0 ||
        selectedsubcateSet.has(product.sub_category.toString());
      const Filterveg =
        selectedVegOptions.length === 0 ||
        selectedvegSet.has(product.veg === 0 ? "0" : "1");
      const price = parseFloat(product.price); // Parse the price to a number
      const minPriceFilter = isNaN(minPrice) || price >= minPrice; // Check if price is NaN or greater than minPrice
      const maxPriceFilter = isNaN(maxPrice) || price <= maxPrice;
      // const price = parseFloat(product.price);  // Parse the price to a number
      // const minPriceFilter = isNaN(minPrice) || price >= minPrice;  // Check if price is NaN or greater than minPrice
      // const maxPriceFilter = isNaN(maxPrice) || price <= maxPrice;
      // const Filterveg =selectedVegOptions.length === 0 || selectedvegSet.has(product.veg === 0 ? "veg" : "non-veg");
      return (
        brandFilter &&
        lifeStageFilter &&
        breedFilter &&
        cateFilter &&
        healthFilter &&
        Filterveg &&
        minPriceFilter &&
        maxPriceFilter &&
        subcateFilter
      );
    });
  };

  

  return (
    <>
      <Toaster />
      <Newheader />
      <Container fluid className="p-0">
        <div className="all-bg">
          <img src={ourbrand} />
        </div>
      </Container>
      <Container>
        <Row>
        <Col lg={3}>
            <section className="section-padding">
              <div className="filter-product">
                <h3>Filters</h3>

                <hr />
                {/* <div
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
                        {allbrand
                          ? allbrand.map((items) => (
                              <div
                                className="form-check"
                                onClick={handleCheckboxClick}
                              >
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  onClick={(e) =>
                                    handleDataListBrand(items.title)
                                  }
                                />
                                <label className="form-check-label">
                                  {items.title}
                                </label>
                              </div>
                            ))
                          : ""}
                      </div>
                    </>
                  )}
                </div>
                <hr /> */}
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
                      <div>
                        {subcategories
                          ? subcategories.map((items) => (
                              <div
                                className="form-check"
                                onClick={handleCheckboxClick}
                              >
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  onClick={(e) => allsubcateselect(items.name)}
                                />
                                <label className="form-check-label">
                                  {items.name}
                                </label>
                              </div>
                            ))
                          : ""}
                      </div>
                    </>
                  )}
                </div>
                <hr />
                <div
                  onClick={() => handleParentClick("cate")}
                  className="main-chk"
                >
                  Category
                  <div className="i-con">
                    <span>
                      <i class="fa fa-angle-down" aria-hidden="true"></i>
                    </span>
                  </div>
                  {cateDropdownVisible && (
                    <>
                      <div>
                        {allsubcate
                          ? allsubcate.map((items) => (
                              <div
                                className="form-check"
                                onClick={handleCheckboxClick}
                              >
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  onClick={(e) => allcateselect(items.name)}
                                />
                                <label className="form-check-label">
                                  {items.name}
                                </label>
                              </div>
                            ))
                          : ""}
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
                        <div
                          className="form-range"
                          onClick={handleCheckboxClick}
                        >
                          <span>₹</span>
                          <input
                            type="number"
                            placeholder="From"
                            onChange={minprice}
                          />
                        </div>
                        <div
                          className="form-range"
                          onClick={handleCheckboxClick}
                        >
                          <span>₹</span>
                          <input
                            type="number"
                            placeholder="From"
                            onChange={maxprice}
                          />
                        </div>
                        <div className="form-range">
                          {/* <span>₹</span> */}
                          <button onClick={applyprice}>Apply</button>
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
                        {alllifesage
                          ? alllifesage.map((items) => (
                              <div
                                className="form-check"
                                onClick={handleCheckboxClick}
                              >
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  onChange={(e) =>
                                    Lifesatedataselect(items.name)
                                  }
                                />
                                <label className="form-check-label">
                                  {items.name}
                                </label>
                              </div>
                            ))
                          : ""}
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
                        {allbreed
                          ? allbreed.map((items) => (
                              <div
                                className="form-check"
                                onClick={handleCheckboxClick}
                              >
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  onChange={(e) => allbreedselect(items.name)}
                                />
                                <label className="form-check-label">
                                  {items.name}
                                </label>
                              </div>
                            ))
                          : ""}
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
                        {allhealth
                          ? allhealth.map((items) => (
                              <div
                                className="form-check"
                                onClick={handleCheckboxClick}
                              >
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  onClick={(e) => allhealthselect(items.title)}
                                />
                                <label className="form-check-label">
                                  {items.title}
                                </label>
                              </div>
                            ))
                          : ""}
                      </div>
                    </>
                  )}
                </div>
                <hr />

                <div
                  onClick={() => handleParentClick("veg-Non-veg")}
                  className="main-chk"
                >
                  Veg/Nonveg
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
                            onClick={(e) => vegnonveghandler("1")}
                          />
                          <label className="form-check-label">
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
                            onClick={(e) => vegnonveghandler("0")}
                          />
                          <label className="form-check-label">Veg (73)</label>
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
                {/* <Row> */}
                {brands.length > 0 ? (
                  <Row>
                    {allproductbrand
                      ? allproductbrand.map((item, index) => {
                        return (
                          <Col lg={4} sm={6} xs={6} className="mb-4">
                            <div className="food-product" key={item.id} style={{
                              background:
                                gradientColors[index % gradientColors.length],
                            }}>
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
                              <Link to="/product-details">
                                <div className="text-center">
                                  <img src={
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
                                      <h6>{`₹${item.price -
                                        (item.price * item.discount) / 100
                                        }`}</h6>
                                    </Col>
                                    {/* <Col>
                                      <Link to="">
                                        <img src={bag} />
                                      </Link>
                                    </Col> */}
                                  </Row>
                                </div>
                              </Link>
                            </div>
                          </Col>
                        );

                      }
                      )
                      : <p className="emptyMSG">No Brands Product.</p>}
                  </Row>
                ) : (
                  <p>429 Error...</p>
                )}
              </Container>








              {/* <Container>
                <Row>
                  <Col lg={6}>
                    <h1 className="main-head">Our Brand</h1>
                  </Col>
                  <Col lg={6}>
                    <div className="side-filter">
                      <form className="form-inline my-2 my-lg-0">
                        <div className="left-inner-addon input-container">
                          <i className="fa fa-search" />
                          <input
                            placeholder="Search"
                            type="search"
                            className="form-control"
                            aria-label="Search"
                          />
                        </div>
                      </form>
                    </div>
                  </Col>
                </Row>
              </Container> */}
              {/* <div className="needplace">
                <div className="dog-categorys-area">
                  <ul
                    className="nav nav-pills mb-3"
                    id="pills-tab"
                    role="tablist"
                  >
                    {subcategories ? (
                      subcategories.map(
                        (item) =>
                          item.parent_id == "1" && (
                            <li className="nav-item">
                              <a
                                className="nav-link"
                                id="pills-home-tab"
                                data-toggle="pill"
                                onClick={(id) => subcatid(item.id)}
                                href="#pills-home"
                                role="tab"
                                aria-controls="pills-home"
                                aria-selected="true"
                              >
                                <img src={
                                  "https://canine.hirectjob.in//storage/app/public/category/"
                                  + item.image}
                                />
                                <h6>{item.name}</h6>
                              </a>
                            </li>
                          )
                      )
                    ) : (
                      <p className="emptyMSG">No Sub Categories.</p>
                    )}
                  </ul>
                  <div className="tab-content" id="pills-tabContent">
                    <div
                      className="tab-pane fade show"
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
                                <Link to="/product-details">
                                  <div className="text-center">
                                    <img src={
                                      "https://canine.hirectjob.in//storage/app/public/category/"
                                      + item.image}
                                    />
                                  </div>
                                  <div>
                                    <h6>{item.title}</h6>
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
                          <p className="emptyMSG">No Sub Categories Product.</p>
                        )}
                      </Row>
                    </div>
                  </div>
                </div>
              </div> */}
            </section>
          </Col>
        </Row>
      </Container>

      <Footer />
    </>
  );
}

export default Ourourbrand;
