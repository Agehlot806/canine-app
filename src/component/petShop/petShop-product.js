import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Button, Table } from 'react-bootstrap'
import Carousel from "react-multi-carousel";
import product from '../../assets/images/banner/product.png'
import { Link } from 'react-router-dom'
import product1 from '../../assets/images/img/product1.png'
import product2 from '../../assets/images/img/product2.png'
import product3 from '../../assets/images/img/product3.png'
import productdetail from '../../assets/images/banner/productdetail.png'
import bannerone from '../../assets/images/banner/banner.png'
import { BASE_URL } from '../../Constant/Index';
import axios from 'axios';
import bag from '../../assets/images/icon/bag.png'
import PetShopHeader from '../../directives/petShopHeader';
import { Toaster, toast } from 'react-hot-toast';
import Petshopfooter from '../../directives/petShop-Footer';
import { styled } from "styled-components";

const clinetreview = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 2 // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 1 // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  }
};
function Petshopproduct(props) {
  const [categories, setcategories] = useState([]);
  const [allproduct, setallproduct] = useState([]);


  useEffect(() => {
    categoriesProduct();
    allProduct();
    allBrandshow()
    allLifesageshow()
    allBreedshow()
    allsubcategary()
    allHealthconditionshow()
    Allsubcategories()
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
        setallproduct(response.data.data)
        // Perform any additional actions after successful deletion
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const [brandDropdownVisible, setBrandDropdownVisible] = useState(false);
  const [cateDropdownVisible, setCateDropdownVisible] = useState(false);
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


  ///tarun filter code//
  const [allbrand, setAllBrand] = useState("")
  const [alllifesage, setAlllifesage] = useState("")
  const [allbreed, setAllBreed] = useState("")
  const [allsubcate, setAllSubcate] = useState("")
  const [allhealth, setAllHealth] = useState("")
  const [subcategories, setsubcategories] = useState([]);


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

  const [selectedBrandIds, setSelectedBrandIds] = useState([]);
  const [selectedlifeIds, setSelectedLifeIds] = useState([]);
  const [selectedbreedIds, setSelectedbreedIds] = useState([]);
  const [selectedcateIds, setSelectedcateIds] = useState([]);
  const [selectedhealthIds, setSelectedhealthIds] = useState([]);
  const [selectedvegIds, setSelectedvegIds] = useState([]);
  const [selectedsubcateIds, setSelectedsubcateIds] = useState([]);

  const [minpricevalue, setMinpricevalue] = useState([])
  const [maxpricevalue, setMaxpricevalue] = useState([])
  const minprice = (e) => {
    setMinpricevalue(e.target.value)
  }
  const maxprice = (e) => {
    setMaxpricevalue(e.target.value)
  }

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
    } catch (error) {
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


  const allhealthselect = (name) => {
    setSelectedhealthIds((prevSelectedhealthIds) => {
      const updatedhealthIds = prevSelectedhealthIds.includes(name)
        ? prevSelectedhealthIds.filter((id) => id !== name)
        : [...prevSelectedhealthIds, name];
      filterProducts(undefined, undefined, undefined, undefined, updatedhealthIds);
      return updatedhealthIds;
    });
  };
  const allsubcateselect = (name) => {
    setSelectedsubcateIds((prevSelectedhealthIds) => {
      const updatesubcateIds = prevSelectedhealthIds.includes(name)
        ? prevSelectedhealthIds.filter((id) => id !== name)
        : [...prevSelectedhealthIds, name];
      filterProducts(undefined, undefined, undefined, undefined, undefined, undefined, updatesubcateIds);
      return updatesubcateIds;
    });
  };

  const vegnonveghandler = (value) => {
    setSelectedvegIds((prevSelectedvegIds) => {
      const updatedvegIds = prevSelectedvegIds.includes(value)
        ? prevSelectedvegIds.filter((id) => id !== value)
        : [...prevSelectedvegIds, value];
      filterProducts(undefined, undefined, undefined, undefined, undefined, updatedvegIds);
      return updatedvegIds;
    });
  };
  const applyprice = () => {
    filterProducts();
  }

  console.log("/////", selectedsubcateIds);
  const filterProducts = async (updatedBrandIds, updatedLifeIds, updatedBreedIds, updatedcateIds, updatedhealthIds, updatedvegIds, updatesubcateIds) => {
    try {
      const response = await axios.get("https://canine.hirectjob.in/api/v1/items/latest");
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
      setallproduct(filteredProducts)
    } catch (error) {
      console.error('Error:', error);
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

    return products.filter(product => {
      const brandFilter = selectedBrands.length === 0 || selectedBrandSet.has(product.brand_id.toString());
      const lifeStageFilter = selectLifeStageFilterList.length === 0 || selectedLifeStageSet.has(product.lifeStage_id.toString());
      const breedFilter = selectBreedFilterList.length === 0 || selectedBreedSet.has(product.Petsbreeds_id.toString());
      const cateFilter = selectcate.length === 0 || selectedcateSet.has(product.category_ids.toString());
      const healthFilter = selecthealth.length === 0 || selectedhealthSet.has(product.helthCondition_id.toString());
      const subcateFilter = selectedsubcate.length === 0 || selectedsubcateSet.has(product.sub_category.toString());
      const Filterveg = selectedVegOptions.length === 0 || selectedvegSet.has(product.veg === 0 ? "0" : "1");
      const price = parseFloat(product.price);  // Parse the price to a number
      const minPriceFilter = isNaN(minPrice) || price >= minPrice;  // Check if price is NaN or greater than minPrice
      const maxPriceFilter = isNaN(maxPrice) || price <= maxPrice;
      // const price = parseFloat(product.price);  // Parse the price to a number
      // const minPriceFilter = isNaN(minPrice) || price >= minPrice;  // Check if price is NaN or greater than minPrice
      // const maxPriceFilter = isNaN(maxPrice) || price <= maxPrice;
      // const Filterveg =selectedVegOptions.length === 0 || selectedvegSet.has(product.veg === 0 ? "veg" : "non-veg");
      return brandFilter && lifeStageFilter && breedFilter && cateFilter && healthFilter && Filterveg && minPriceFilter && maxPriceFilter && subcateFilter;
    });
  };


  const [paginatedCategories, setPaginatedCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 24;
  useEffect(() => {
    // Update the paginated categories whenever brandcategories or currentPage changes
    pagination(currentPage);
  }, [allproduct, currentPage]);

  const pageCount = allproduct ? Math.ceil(allproduct.length / pageSize) : 0;
  const pages = _.range(1, pageCount + 1);

  const pagination = (pageNo) => {
    setCurrentPage(pageNo);
    const startIndex = (pageNo - 1) * pageSize;
    const paginated = _(allproduct).slice(startIndex).take(pageSize).value();
    setPaginatedCategories(paginated);
  };
  const gradientColors = [
    "linear-gradient(180deg, #FFF0BA 0%, rgba(251.81, 233.11, 165.78, 0) 100%)",
    "linear-gradient(180deg, #C7EBFF 0%, rgba(199, 235, 255, 0) 100%)",
    "linear-gradient(180deg, #FECBF0 0%, rgba(254, 203, 240, 0) 100%)",
    "linear-gradient(180deg, #C8FFBA 0%, rgba(200, 255, 186, 0) 100%)",
    // Add more gradient colors as needed
  ];


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
      <PetShopHeader />
      <Container fluid className='p-0'>
        <div className='all-bg'>
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
                            items.canine == 1 && (
                              <div
                                className="form-check"
                                onClick={handleCheckboxClick}
                              >
                                <input
                                  className="form-check-input"
                                  type="checkbox"



                                  onClick={(e) => handleDataListBrand(items.title)}
                                />
                                <label
                                  className="form-check-label"

                                >
                                  {items.title}
                                </label>
                              </div>
                            )
                          ))
                        ) : ""}
                      </div>
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
                      <div>
                        {subcategories ? (
                          subcategories.map((items) => (
                            <div
                              className="form-check"
                              onClick={handleCheckboxClick}
                            >
                              <input
                                className="form-check-input"
                                type="checkbox"
                                onClick={(e) => allsubcateselect(items.name)}
                              />
                              <label
                                className="form-check-label"

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
                        {allsubcate ? (
                          allsubcate.map((items) => (
                            <div
                              className="form-check"
                              onClick={handleCheckboxClick}
                            >
                              <input
                                className="form-check-input"
                                type="checkbox"



                                onClick={(e) => allcateselect(items.name)}
                              />
                              <label
                                className="form-check-label"

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
                            placeholder="From" onChange={minprice} />
                        </div>
                        <div className="form-range" onClick={handleCheckboxClick}>
                          <span>₹</span>
                          <input type="number"
                            placeholder="From" onChange={maxprice} />
                        </div>
                        <div className="form-range" >
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
                        {alllifesage ? (
                          alllifesage.map((items) => (


                            <div
                              className="form-check"
                              onClick={handleCheckboxClick}
                            >
                              <input
                                className="form-check-input"
                                type="checkbox"

                                onChange={(e) => Lifesatedataselect(items.name)}
                              />
                              <label
                                className="form-check-label"

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

                                onChange={(e) => allbreedselect(items.name)}
                              />
                              <label
                                className="form-check-label"

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

                                onClick={(e) => allhealthselect(items.title)}
                              />
                              <label
                                className="form-check-label"

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
                          <label
                            className="form-check-label"

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

                            onClick={(e) => vegnonveghandler("0")}

                          />
                          <label
                            className="form-check-label"

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
                <h1 className="main-head">
                  Shop Deals For Your Best Buddy
                </h1>
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
                    <div className="Shop-Deals" key={item.id}>
                      <img src={"https://canine.hirectjob.in/storage/app/public/category/" + item.image} onClick={(e) => allcateselect(item.name)} />
                      <h1>{item.name}</h1>
                    </div>
                  ))}

                </Carousel>
              </Container>
            </section>


            <section className="section-padding food">
              <Container>
                <Row>
                  {paginatedCategories && paginatedCategories.map((item, index) => (
                    <Col lg={4} sm={6} xs={6} className="mb-4">
                      <div className="food-product" key={item.id}
                      onMouseEnter={() => handleMouseEnter(item.id)}
                      onMouseLeave={() => handleMouseLeave(item.id)}
                        style={{
                          background:
                            gradientColors[index % gradientColors.length],
                        }}>
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
                          <div className='text-center'>
                            <img src={"https://canine.hirectjob.in//storage/app/public/product/" + item.image} />
                          </div>
                          <div>
                            <h6>{item.name}</h6>
                            <p>{item.description}</p>
                          </div>
                          <div className="product-bag">
                           
                            <Row>
                              <Col className='align-self-center'><h6>₹{item.whole_price}</h6></Col>
                              <Col><Link to=''><img src={bag} /></Link></Col>
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
                <div className="pagination-area">
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
                </div>
              </Container>
            </section>


          </Col>
        </Row>
      </Container >



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
                        <Link to={`/petshop-add-cart/${productDetails.id}`} onClick={handleAddToCart}>
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
export default Petshopproduct