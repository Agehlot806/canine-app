import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Table, Form } from "react-bootstrap";
import Carousel from "react-multi-carousel";
import product from "../../assets/images/banner/product.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../../Constant/Index";
import axios from "axios";
import bag from "../../assets/images/icon/bag.png";
import { Toaster, toast } from "react-hot-toast";
import { async } from "q";
import PetShopHeader from "../../directives/petShopHeader";
import Petshopfooter from "../../directives/petShop-Footer";
import { styled } from "styled-components";
import paydone from "../../assets/images/icon/paydone.png";
import { Fade } from "react-reveal";
import ReactPaginate from "react-paginate";
import { usePagination } from "../../Context/PaginationContext";
import loadinggif from "../../assets/images/video/loading.gif";

function PetshopPetcategory() {
  const [brandDropdownVisible, setBrandDropdownVisible] = useState(false);
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
  const [petitemproduct, setpetitemproduct] = useState([]);
  const [subcategories, setsubcategories] = useState([]);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    Promise.all([
      allPetitemproduct(),
      Allsubcategories(),
      fetchBrands(),
      fetchBreed(),
      fetchHealthcondition(),
      fetchLifestage(),
      allProduct(),
      fetchWishlistData(),
      allAddressList(),
      GetdataAll(),
      fetchAllProducts(),
    ])
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
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
  const salesmanId = localStorage.getItem("salesmanId");
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
          item_name: productDetails?.name,
          variant: selectedVariant, // You may need to update this based on your data
          image: productDetails?.image,
          quantity: quantity,
          price: formattedAmount,
          min_order: productDetails.min_order,
          user_id: storedWholesellerId,
          item_id: productDetails?.id,
          seller_id: salesmanId ? Number(salesmanId) : "",
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
    const modal = document.querySelector(".modal");
    if (modal) {
      modal.classList.remove("show");
      modal.style.display = "none";
      document.body.classList.remove("modal-open");
      const modalBackdrop = document.querySelector(".modal-backdrop");
      if (modalBackdrop) {
        modalBackdrop.remove();
      }
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
          localStorage.setItem(`wishlist_${productDetails.id}`, "true");
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

    if (filterData.length > 0) {
      for (let index = 0; index < filterData.length; index++) {
        const element = filterData[index];
        const indexData = allproduct.map((ele) => ele.id).indexOf(element.id);
        newArr[indexData].isFav = true;
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
      const filterData = response.data.data;
      const filterDatashow = filterData.filter(
        (item) => item.category_id == id
      );
      console.log("responsDataesponsData", filterDatashow);
      setallproduct(filterDatashow);
      setallproduct(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

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
  const [quantity, setQuantity] = useState(0);
  const [minOrder, setMinOrder] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState([]);
  const [selectedVariantPrice, setSelectedVariantPrice] = useState([]);

  useEffect(() => {
    if (productDetails?.variations && productDetails?.variations?.length > 0) {
      const defaultVariant = productDetails.variations[0];
      setSelectedVariant(defaultVariant?.type);
      setSelectedVariantPrice(defaultVariant?.wholeprice);
    }
  }, [productDetails]);

  // useEffect(() => {
  //   productData();
  // }, []);

  const productData = async (selctId) => {
    axios
      .get(`${BASE_URL}/items/product_details/${selctId}`)
      .then((response) => {
        console.log("=======> ", response);
        console.log("Delete Successful");
        setProductDetails(response.data.data);
        // Perform any additional actions after successful deletion
        const fetchedProductDetails = response.data.data;

        if (
          fetchedProductDetails?.min_order !== null &&
          fetchedProductDetails?.min_order > 0
        ) {
          setMinOrder(fetchedProductDetails.min_order);
          setQuantity(fetchedProductDetails.min_order); // Set initial quantity to min_order
        }

        // Perform any additional actions after successful fetch
        setProductDetails(fetchedProductDetails);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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

  let wholesellervariationprice = 0;

  if (selectedVariantPrice !== null) {
    wholesellervariationprice = selectedVariantPrice;
  }
  const verifiredIdaccess = Number(localStorage.getItem("verifiedId"));

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
  // uservariationprice = uservariationprice * (quantity > 1 ? quantity : 1);

  const Amount = (uservariationprice * (quantity > 1 ? quantity : 1)).toFixed(
    2
  );
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
        "https://canine.hirectjob.in//storage/app/public/product/" +
          productDetails.image
      );
    }
  }, [productDetails]);

  const handleThumbnailClick = (index) => {
    setMainImage(
      "https://canine.hirectjob.in//storage/app/public/product/" +
        productDetails.images[index]
    );
  };

  const handleMainImageClick = () => {
    setLightboxIsOpen(true);
    setLightboxImageIndex(productDetails.images.indexOf(mainImage));
  };
  const handeldataId = (id) => {
    productData(id);
  };
  // ===============================================================
  // =================================================================
  // Buy Now ------------------------
  // ==================================================================
  // ===============================================================
  const shippingpage = useNavigate("");

  const [quantitybuynow, setQuantitybuynow] = useState(1);
  // const handleIncrementbuynow = () => {
  //   setQuantitybuynow(quantitybuynow + 1);
  // };
  // const handleDecrementbuynow = () => {
  //   if (quantitybuynow > 1) {
  //     setQuantitybuynow(quantitybuynow - 1);
  //   }
  // };

  const handleQuantityChangebuynow = (event) => {
    const newQuantity = parseInt(event.target.value, 10);
    if (!isNaN(newQuantity)) {
      setQuantity(newQuantity);
    }
  };

  const [addresslist, setAddressList] = useState([]);
  const allAddressList = async () => {
    console.log("storedWholesellerId", typeof storedWholesellerId);
    await axios
      .get(`${BASE_URL}/customer/address/list/${storedWholesellerId}`)
      .then((response) => {
        console.log("address list Successful", response);
        setAddressList(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [addressContentVisible, setAddressContentVisible] = useState(false);

  const handleAddressClick = (index) => {
    setSelectedAddress(addresslist[index]);
    setAddressContentVisible(false); // Hide the address content after selecting an address
  };

  const toggleAddressContent = () => {
    setAddressContentVisible(!addressContentVisible);
  };

  const [stateall, setStateall] = useState([]);
  const [stateallCity, setStateallCity] = useState([]);
  const [first_name, setfirst_name] = useState("");
  const [last_name, setlast_name] = useState("");
  const [mobile, setmobile] = useState("");
  const [house_no, sethouse_no] = useState("");
  const [area, setarea] = useState("");
  const [landmark, setlandmark] = useState("");
  const [pincode, setpincode] = useState("");
  const [state, setstate] = useState("");
  const [city, setcity] = useState("");
  const [profileData, setProfileData] = useState({});
  const [responseMessage, setResponseMessage] = useState("");

  const handleAddAddress = async (event) => {
    event.preventDefault();
    const data = {
      user_id: storedWholesellerId,
      first_name: first_name,
      last_name: last_name,
      mobile: mobile,
      house_no: house_no,
      area: area,
      landmark: landmark,
      state: state,
      city: city,
      pincode: pincode,
    };

    try {
      const response = await axios.post(
        `${BASE_URL}/customer/address/add`,
        data
      );
      setResponseMessage(response.data.message);
      toast.success("Successfully added!");

      // Call allAddressList to update the address list
      await allAddressList();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const [first_nameError, setFirst_nameError] = useState("");

  const [last_nameError, setLast_nameError] = useState("");

  const [mobileError, setMobileError] = useState("");

  const [house_noError, setHouse_noError] = useState("");

  const [areaError, setAreaError] = useState("");

  const [landmarkError, setLandmarkError] = useState("");

  const [pincodeError, setPincodeError] = useState("");

  const [stateError, setStateError] = useState("");

  const [cityError, setCityError] = useState("");

  const [isFormValid, setIsFormValid] = useState(false);

  const validateForm = () => {
    if (
      first_name.trim() === "" ||
      last_name.trim() === "" ||
      mobile.trim() === "" ||
      house_no.trim() === "" ||
      area.trim() === "" ||
      landmark.trim() === "" ||
      state.trim() === "" ||
      selectedCity.trim() === "" ||
      pincode.trim() === ""
    ) {
      setIsFormValid(false);
    } else {
      setIsFormValid(true);
    }
  };

  const [selectedCity, setSelectedCity] = useState("");
  const GetdataAll = async (e) => {
    var headers = {
      Accept: "application/json",
      "Content-Data": "application/json",
    };
    await fetch(`${BASE_URL}/auth/state`, {
      method: "GET",
      headers: headers,
    })
      .then((Response) => Response.json())
      .then((Response) => {
        setStateall(Response?.data ? Response?.data : []);
      })
      .catch((error) => {
        console.error("ERROR FOUND---->>>>" + error);
      });
  };

  const Getdatacity = (state) => {
    axios
      .post(`${BASE_URL}/auth/city?state=${state}`, {
        headers: { "Content-Data": "multipart/form-data" },
      })
      .then((response) => {
        setStateallCity(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const Subscription = (event) => {
    if (event.target.value) {
      setstate(event.target.value);

      Getdatacity(event.target.value);
    }
  };

  const handleDeleteAddress = (id) => {
    axios
      .delete(
        `https://canine.hirectjob.in/api/v1/customer/address/delete/${id}`
      )
      .then((response) => {
        toast.success("Address deleted successfully");
        setAddressList((prevAddressList) =>
          prevAddressList.filter((item) => item.id !== id)
        );
      })
      .catch((error) => {
        console.error("Error deleting address:", error);
      });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://canine.hirectjob.in/api/v1/customer/address/update",
        profileData // Send the updated profileData in the request body
      );
      if (response.data.status === 200) {
        console.log("Profile updated successfully!");
        setAddressList((prevAddressList) =>
          prevAddressList.filter((item) => item.id !== id)
        );
        fieldpagerefresh(); // Call fieldpagerefresh here
      }
    } catch (error) {
      console.error(error);
    }
  };

  const [selectedInput, setSelectedInput] = useState("");
  function formatAddress(selectedAddress) {
    return `${selectedAddress.first_name} ${selectedAddress.last_name}, ${selectedAddress.house_no} ${selectedAddress.area} ${selectedAddress.landmark}, ${selectedAddress.city}, ${selectedAddress.state} ${selectedAddress.pincode}, Mobile: ${selectedAddress.mobile}`;
  }
  // ...

  // Use the formatAddress function to get the selected address as a single string
  const deliveryAddress = selectedAddress
    ? formatAddress(selectedAddress)
    : "No address selected";
  // Buy now checkout code
  const handleSendRequest = async () => {
    // const cartData = sendcartdata.map((item) => ({
    //   product_id: item.item_id,
    //   variation: item.variant,
    //   price: item.price,
    //   quantity: item.quantity,
    //   tax_amount: taxamound,
    //   discount_on_item: disscountvalue?.discount || "",
    // }));
    const cartData = {
      product_id: productDetails.id,
      variation: selectedVariant,
      price: Amount,
      quantity: quantity,
      tax_amount: Math.floor(Amount * 0.05),
      discount_on_item: "",
    };
    // Calculate the order_amount
    const orderAmount = parseInt(Amount) * 0.05 + parseInt(Amount) ?? 0;

    const requestData = {
      user_id: storedWholesellerId,
      coupon_discount_amount: "",
      coupon_discount_title: "",
      payment_status: "paid",
      order_status: "pending",
      total_tax_amount: Math.floor(Amount * 0.05),
      payment_method: selectedInput ? "offline" : "online",
      transaction_reference: selectedInput ? "" : "sadgash23asds",
      delivery_address_id: 2,
      coupon_code: "",
      order_type: "delivery",
      checked: selectedInput,
      store_id: 1,
      zone_id: 2,
      delivered_status: "undelivered",
      delivery_address: deliveryAddress,
      item_campaign_id: "",
      order_amount: orderAmount,
      cart: [cartData],
    };
    fetch(`https://canine.hirectjob.in/api/v1/customer/order/place`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        console.log("responseData???>>>>", responseData);
        shippingpage("/petShop-shipping/" + responseData.data.order_id);
        // shippingpage(
        //   `/shipping/${responseData.data.order_id}?gowithbuynow=true`
        // );
        console.log("order_id", responseData);
      })
      .catch((error) => {
        console.error("Error sending request:", error);
      });
    const modal = document.querySelector(".modal");
    if (modal) {
      modal.classList.remove("show");
      modal.style.display = "none";
      document.body.classList.remove("modal-open");
      const modalBackdrop = document.querySelector(".modal-backdrop");
      if (modalBackdrop) {
        modalBackdrop.remove();
      }
    }
  };

  const handleRadioChange = (event) => {
    setSelectedInput(event.target.checked);
  };
  const [reviewlist, setreviewlist] = useState([]);
  const allReview = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/customer/order/list?id=${storedWholesellerId}`
      );
      const data = await response.json();
      const latestPosts = data.data.slice(0, 3);
      setreviewlist(latestPosts);
    } catch (error) {
      console.log(error);
    }
  };
  const quickViewClear = () => {
    setSelectedVariantPrice(null);
    setSelectedVariant(null);
    setSelectedVariantStock(null);
  };
  const handleResetClick = () => {
    setfirst_name(null);
    setlast_name(null);
    setmobile(null);
    sethouse_no(null);
    setarea(null);
    setlandmark(null);
    setpincode(null);
    setstate(null);
    setcity(null);
    setFirst_nameError(null);
    setLast_nameError(null);
    setMobileError(null);
    setHouse_noError(null);
    setAreaError(null);
    setLandmarkError(null);
    setPincodeError(null);
    setStateError(null);
    setCityError(null);
    setIsFormValid(null);
    setSelectedCity(null);
    setcoupenCode(null);
    setAppliedCoupon(null);
    setSelectedInput(null);
    setAddressContentVisible(null);
    setSelectedAddress(null);
    setQuantity(1);
  };

  // ****************notifyme
  const [email, setEmail] = useState("");
  const [variation, setVariation] = useState("");
  const [variationError, setVariationError] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const isEmailFormatValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    setIsEmailValid(isEmailFormatValid(emailValue));
  };
  const handleNotifymeSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Prepare form data
    const notifymeData = new FormData();
    notifymeData.append("email", email);
    notifymeData.append("variation", variation);
    notifymeData.append("stock", productDetails.stock);
    notifymeData.append("user_id", storedWholesellerId);
    notifymeData.append("item_id", productDetails.id);


    // Send a request
    axios
      .post(`https://canine.hirectjob.in/api/v1/items/notify`, notifymeData)
      .then((response) => {
        toast.success("Your data was successfully added");
      })
      .catch((error) => {
        toast.error("An error occurred. Please try again.");
      });
  };

  const [banner, setBanner] = useState("");
  useEffect(() => {
    const apiUrl = "https://canine.hirectjob.in/api/v1/categories";
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        const category = data.data.find(
          (category) => category.id == parseInt(id)
        );
        if (category) {
          setBanner(category.banner);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [id]);

  const [sortOption, setSortOption] = useState("default");
  const [paginatedCategories, setPaginatedCategories] = useState([]);
  const { currentPage5, setCurrentPage5 } = usePagination();

  const pageSize = 24;

  useEffect(() => {
    pagination(currentPage5);
  }, [allproduct, currentPage5, sortOption]);
  const sortedProducts = () => {
    let sortedItems = [...allproduct];
    switch (sortOption) {
      case "A-Z":
        sortedItems.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Z-A":
        sortedItems.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "PriceLowToHigh":
        sortedItems.sort((a, b) => a.price - b.price);
        break;
      case "PriceHighToLow":
        sortedItems.sort((a, b) => b.price - a.price);
        break;
      case "DateOldToNew":
        sortedItems.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case "DateNewToOld":
        sortedItems.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      default:
        // Default sorting (as per API response)
        break;
    }
    if (sortOption === "DateNewToOld") {
      sortedItems.reverse();
    }
    return sortedItems;
  };
  const pagination = (pageNo) => {
    setCurrentPage5(pageNo);
    const startIndex = (pageNo - 1) * pageSize;
    const paginated = sortedProducts().slice(startIndex, startIndex + pageSize);
    setPaginatedCategories(paginated);
  };
  const goToPage = (page) => {
    if (page >= 1 && page <= pageCount) {
      pagination(page);
    }
  };
  const pageCount = allproduct ? Math.ceil(allproduct.length / pageSize) : 0;
  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);

  const renderProductDescription = (description) => {
    const maxCharacters = 35; // Number of characters to show initially

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

  const demousercheck = () => {
    toast.error("Profile is not verified");
  };

  const renderProducthead = (name) => {
    const maxCharacters = 20;

    if (name?.length <= maxCharacters) {
      return <h6>{name}</h6>;
    }

    const truncatedDescription = name?.slice(0, maxCharacters);

    return (
      <>
        <h6>{truncatedDescription}..</h6>
      </>
    );
  };

  return (
    <>
      <Toaster />
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
              {banner && (
                <img
                  src={
                    "https://canine.hirectjob.in//storage/app/public/category/" +
                    banner
                  }
                />
              )}
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
                <div className="sort-by">
                  <Row className="justify-content-right">
                    <Col lg={2}>Sort By</Col>
                    <Col lg={3}>
                      <select
                        className="form-control"
                        onChange={(e) => setSortOption(e.target.value)}
                        value={sortOption}
                      >
                        <option value="default">Choose...</option>
                        <option value="A-Z">Alphabetically, A-Z</option>
                        <option value="Z-A">Alphabetically, Z-A</option>
                        <option value="PriceLowToHigh">
                          Price, Low to High
                        </option>
                        <option value="PriceHighToLow">
                          Price, High to Low
                        </option>
                        <option value="DateOldToNew">Date, Old to New</option>
                        <option value="DateNewToOld">Date, New to Old</option>
                      </select>
                    </Col>
                  </Row>
                </div>
                <section className="section-padding food">
                  <Container>
                    <Row>
                      {(selectedBrand !== null
                        ? dataList
                        : paginatedCategories
                      ).map((item, index) => (
                        // item.category_id == id && (
                        <Col
                          lg={4}
                          sm={6}
                          xs={6}
                          className="mb-4"
                          key={item.id}
                        >
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
                                item.isFav
                                  ? "fa-solid fa-heart"
                                  : "fa-regular fa-heart"
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
                                    "https://canine.hirectjob.in///storage/app/public/product/" +
                                    item.image
                                  }
                                />
                              </div>
                              <div>
                                <h6>{renderProducthead(item.name)}</h6>
                                <p>
                                  {renderProductDescription(item.description)}
                                </p>
                              </div>
                              <div className="product-bag">
                                <Row>
                                  <Col className="align-self-center">
                                    <h4>₹{item.whole_price}</h4>
                                  </Col>
                                  {/* <Col>
                                  <Link
                                    to={`/petshop-add-cart/${item.id}`}
                                    onClick={handleAddToCart}
                                  >
                                    <img src={bag} />
                                  </Link>
                                </Col> */}
                                </Row>
                              </div>
                            </Link>
                            {buttonVisibility[item.id] && (
                              <Fade top>
                                <div className="button-container">
                                  <button
                                    data-toggle="modal"
                                    data-target=".bd-example-modal-lg"
                                    onClick={(e) => handeldataId(item.id)}
                                  >
                                    Quick View
                                  </button>
                                  <button
                                    data-toggle="modal"
                                    data-target=".buynow"
                                    onClick={(e) => handeldataId(item.id)}
                                  >
                                    Buy Now
                                  </button>
                                </div>
                              </Fade>
                            )}
                          </div>
                        </Col>
                        // )
                      ))}
                      {dataList.length === 0 && selectedBrand !== null && (
                        <div>No data available for the selected brand.</div>
                      )}
                    </Row>

                    <div className="pagination-area">
                      <ul className="pagination">
                        <li className="page-item">
                          {paginatedCategories?.length > 0 && (
                            <button
                              className="page-link"
                              onClick={() => goToPage(currentPage5 - 1)}
                              disabled={currentPage5 === 1}
                            >
                              Previous
                            </button>
                          )}
                        </li>
                        {pages
                          .slice(currentPage5 - 1, currentPage5 + 4)
                          .map((page) => (
                            <li
                              key={page}
                              className={
                                page === currentPage5
                                  ? "page-item active"
                                  : "page-item"
                              }
                            >
                              <button
                                className="page-link"
                                onClick={() => goToPage(page)}
                              >
                                {page}
                              </button>
                            </li>
                          ))}
                        <li className="page-item">
                          {paginatedCategories?.length > 0 && (
                            <button
                              className="page-link"
                              onClick={() => goToPage(currentPage5 + 1)}
                              disabled={currentPage5 === pageCount}
                            >
                              Next
                            </button>
                          )}
                        </li>
                      </ul>
                    </div>
                  </Container>
                </section>
              </Col>
            </Row>
          </Container>
        </>
      )}
      <Petshopfooter />

      {/* Product details Modal */}
      <div
        className="modal fade bd-example-modal-lg"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="myLargeModalLabel"
        aria-hidden="true"
        data-backdrop="static"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-body">
              <i class="quickarea fa fa-times" data-dismiss="modal"  onClick={quickViewClear}/>
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
                                        "https://canine.hirectjob.in//storage/app/public/product/" +
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
                            <p>
                              ({productDetails.rating_count} customer reviews)
                            </p>
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
                                    productDetails?.variations.map(
                                      (item, index) => (
                                        <Col lg={5} className="p-0" key={index}>
                                          {item.stock !== 0 ? (
                                            <div
                                              className={`tab-variations ${
                                                selectedVariant === item.type
                                                  ? "active"
                                                  : ""
                                              }`}
                                              onClick={() => {
                                                setSelectedVariant(item.type);
                                                setSelectedVariantPrice(
                                                  item.price
                                                ); // Store the price in state
                                              }}
                                            >
                                              {item.type}
                                            </div>
                                          ) : (
                                            <div
                                              className="tab-variations disabledvariation"
                                              title="Stock unavailable"
                                            >
                                              {/* <span className="blurred-text"> */}
                                              {item.type}
                                              {/* </span> */}
                                            </div>
                                          )}
                                        </Col>
                                      )
                                    )}
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
                              <Col lg={4}>
                                <h5>{`₹${
                                  isNaN(formattedAmount) ? 0 : formattedAmount
                                }`}</h5>
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
                      {verifiredIdaccess === 1 ? (
                        <Button>
                          <Link
                            to={`/petshop-add-cart/${productDetails.id}`}
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
                      <Button
                        data-toggle="modal"
                        data-target="#soldoutModel"
                        data-dismiss="modal"
                      >
                        Notify Me When Available
                      </Button>
                    </div>
                  )}
                  {/* </Row> */}
                </Container>
              </section>
            </div>
          </div>
        </div>
      </div>
      {/* // ============================== */}
      {/* all modals */}

      {/* Modal */}
      <div
        className="modal fade editAddress"
        id="changeadress-model"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                New Address Add
              </h5>
            </div>
            <div className="modal-body">
              <div class="form-group">
                <label>First Name</label>
                <input
                  class="form-control"
                  type="text"
                  value={first_name}
                  onChange={(e) => {
                    setfirst_name(e.target.value);
                    validateForm();
                  }}
                  onBlur={() => {
                    if (first_name.trim() === "") {
                      setFirst_nameError("First Name is required");
                    } else {
                      setFirst_nameError("");
                    }
                  }}
                />
                <span style={{ color: "red" }}>{first_nameError}</span>
              </div>
              <div class="form-group">
                <label>Last Name</label>
                <input
                  class="form-control"
                  type="text"
                  value={last_name}
                  onChange={(e) => {
                    setlast_name(e.target.value);
                    validateForm();
                  }}
                  onBlur={() => {
                    if (last_name.trim() === "") {
                      setLast_nameError("Last Name is required");
                    } else {
                      setLast_nameError("");
                    }
                  }}
                />
                <span style={{ color: "red" }}>{last_nameError}</span>
              </div>
              <div class="form-group">
                <label>Mobile</label>
                <input
                  type="tel"
                  name="mobile"
                  class="form-control"
                  maxLength={10}
                  value={mobile}
                  onChange={(e) => {
                    setmobile(e.target.value);
                    validateForm();
                    const numericValue = e.target.value.replace(/[^0-9+]/g, ""); // Remove non-numeric character
                    if (numericValue.length <= 10) {
                      setmobile(numericValue);
                    }
                  }}
                  onBlur={() => {
                    if (mobile.trim() === "") {
                      setMobileError("Mobile Number is required");
                    } else {
                      setMobileError("");
                    }
                  }}
                />
                <span style={{ color: "red" }}>{mobileError}</span>
              </div>
              <div class="form-group">
                <label>flat,House no,Building,Company</label>
                <input
                  class="form-control"
                  type="text"
                  value={house_no}
                  onChange={(e) => {
                    sethouse_no(e.target.value);
                    validateForm();
                  }}
                  onBlur={() => {
                    if (house_no.trim() === "") {
                      setHouse_noError(
                        "House no, flat, Building, Company Number is required"
                      );
                    } else {
                      setHouse_noError("");
                    }
                  }}
                />
                <span style={{ color: "red" }}>{house_noError}</span>
              </div>
              <div class="form-group">
                <label>Area, Street,Sector,Village</label>
                <input
                  class="form-control"
                  type="text"
                  value={area}
                  onChange={(e) => {
                    setarea(e.target.value);
                    validateForm();
                  }}
                  onBlur={() => {
                    if (area.trim() === "") {
                      setAreaError("Area, Street, Sector, Village is required");
                    } else {
                      setAreaError("");
                    }
                  }}
                />
                <span style={{ color: "red" }}>{areaError}</span>
              </div>
              <div class="form-group">
                <label>Landmark</label>
                <input
                  class="form-control"
                  type="text"
                  value={landmark}
                  onChange={(e) => {
                    setlandmark(e.target.value);
                    validateForm();
                  }}
                  onBlur={() => {
                    if (landmark.trim() === "") {
                      setLandmarkError("Landmark is required");
                    } else {
                      setLandmarkError("");
                    }
                  }}
                />
                <span style={{ color: "red" }}>{landmarkError}</span>
              </div>
              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <label>State</label>
                    <select
                      className="form-control"
                      onChange={Subscription}
                      value={state}
                      onInput={(e) => {
                        setstate(e.target.value);
                        validateForm();
                      }}
                      onBlur={() => {
                        if (state.trim() === "") {
                          setStateError("State is required");
                        } else {
                          setStateError("");
                        }
                      }}
                    >
                      <option>State Choose...</option>
                      {stateall.map((items) => (
                        <option value={items.id} key={items.id}>
                          {items.state_name}
                        </option>
                      ))}
                    </select>
                    <span style={{ color: "red" }}>{stateError}</span>
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <label>City</label>
                    <select
                      className="form-control"
                      onInput={(e) => setSelectedCity(e.target.value)}
                      value={selectedCity}
                      onChange={(e) => {
                        setcity(e.target.value);
                        validateForm();
                      }}
                      onBlur={() => {
                        if (city.trim() === "") {
                          setCityError("City is required");
                        } else {
                          setCityError("");
                        }
                      }}
                    >
                      <option>City Choose...</option>
                      {stateallCity.map((items) => (
                        <option>{items.city_name}</option>
                      ))}
                    </select>
                    <span style={{ color: "red" }}>{cityError}</span>
                  </div>
                </div>
              </div>
              <div class="form-group">
                <label for="exampleFormControlInput1">Pincode</label>
                <input
                  class="form-control"
                  type="text"
                  value={pincode}
                  onChange={(e) => {
                    setpincode(e.target.value);
                    validateForm();
                  }}
                  onBlur={() => {
                    if (pincode.trim() === "") {
                      setPincodeError("Pincode is required");
                    } else {
                      setPincodeError("");
                    }
                  }}
                />
                <span style={{ color: "red" }}>{pincodeError}</span>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleAddAddress}
                data-dismiss="modal"
                disabled={
                  !isFormValid ||
                  first_name.trim() === "" || // Add this condition
                  last_name.trim() === "" || // Add similar conditions for other fields
                  mobile.trim() === "" ||
                  house_no.trim() === "" ||
                  area.trim() === "" ||
                  landmark.trim() === "" ||
                  state.trim() === "" ||
                  selectedCity.trim() === "" ||
                  pincode.trim() === ""
                }
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* update-model */}

      <div
        className="modal fade buynow"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="myLargeModalLabel"
        aria-hidden="true"
        data-backdrop="static"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-body">
              <>
                <Container>
                  <div className="needplace">
                    <div className="address">
                      <h3>Address</h3>
                      <div className="address-card">
                        {addresslist && addresslist.length > 1 ? (
                          addresslist.map(
                            (item, index) =>
                              index == 0 && (
                                <p key={item.id}>
                                  {item.house_no} {item.area} {item.landmark}{" "}
                                  {item.city} {item.state} {item.pincode}
                                </p>
                              )
                          )
                        ) : (
                          <p>No data to display</p>
                        )}
                      </div>
                    </div>
                  </div>
                </Container>
                <Container>
                  <div className="needplace">
                    <div className="address">
                      <h3>Shipping Address</h3>
                      <div className="address-card">
                        <Row>
                          <Col lg={10} sm={9}>
                            {selectedAddress ? (
                              <div className="selectedAddress-area">
                                <p>
                                  {selectedAddress.first_name}{" "}
                                  {selectedAddress.last_name}
                                </p>
                                <p>
                                  {selectedAddress.house_no}{" "}
                                  {selectedAddress.area}{" "}
                                  {selectedAddress.landmark}{" "}
                                  {selectedAddress.city} {selectedAddress.state}{" "}
                                  {selectedAddress.pincode}
                                </p>
                                <p>Mobile: {selectedAddress.mobile}</p>
                              </div>
                            ) : (
                              <p>No address selected</p>
                            )}
                          </Col>
                          <Col lg={2} sm={3}>
                            <Button
                              data-toggle="modal"
                              data-target="#changeadress-model"
                              data-dismiss="modal"
                            >
                              Add
                            </Button>
                          </Col>
                          <Col lg={12} sm={12}>
                            <div className="address-arrow">
                              <button onClick={toggleAddressContent}>
                                Select Address{" "}
                                <i
                                  className={`fa ${
                                    addressContentVisible
                                      ? "fa-arrow-up"
                                      : "fa-arrow-down"
                                  }`}
                                  aria-hidden="true"
                                ></i>
                              </button>
                            </div>
                            <br />
                            <Row>
                              {addressContentVisible && (
                                <Col lg={12}>
                                  <div className="address-Content">
                                    {addresslist && addresslist.length > 0 ? (
                                      addresslist.map((item, index) => (
                                        <div
                                          className="chk-address"
                                          key={item.id}
                                        >
                                          <div className="chk-center">
                                            <input
                                              className="form-check-input"
                                              type="radio"
                                              name="exampleRadios"
                                              onClick={() =>
                                                handleAddressClick(index)
                                              }
                                            />
                                          </div>
                                          <div className="Daynamic-address">
                                            <table>
                                              <tr>
                                                <th>Name:&nbsp;</th>
                                                <td>
                                                  {item.first_name}&nbsp;
                                                  {item.last_name}
                                                </td>
                                              </tr>
                                              <tr>
                                                <th>Address:&nbsp;</th>
                                                <td>
                                                  {item.house_no} {item.area}{" "}
                                                  {item.landmark} {item.city}{" "}
                                                  {item.state} {item.pincode}
                                                </td>
                                              </tr>
                                              <tr>
                                                <th>Mobile:&nbsp;</th>
                                                <td>{item.mobile}</td>
                                              </tr>
                                            </table>
                                            <div className="address-delete">
                                              <i
                                                className="fa fa-trash"
                                                onClick={() =>
                                                  handleDeleteAddress(item.id)
                                                }
                                              />
                                              &nbsp; &nbsp;
                                              <i
                                                className="fa fa-edit"
                                                data-toggle="modal"
                                                onClick={() => {
                                                  setProfileData(item);
                                                }}
                                                data-target="#update-model"
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      ))
                                    ) : (
                                      <p>No Addresses Available</p>
                                    )}
                                  </div>
                                </Col>
                              )}
                            </Row>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </div>
                </Container>
                {/* {productDetails && productDetails.length > 0 ? ( */}
                <section className="section-padding">
                  <Container>
                    <Row>
                      <Col lg={3}>
                        <img
                          src={
                            "https://canine.hirectjob.in//storage/app/public/product/" +
                            productDetails?.image
                          }
                        />
                      </Col>
                      <Col lg={7} sm={10}>
                        <h2>{productDetails?.name}</h2>
                        <div className="tab-container">
                          <h6>Variations</h6>
                          <Row>
                            {productDetails?.variations &&
                              productDetails?.variations.length > 0 &&
                              productDetails?.variations.map((item, index) => (
                                <Col lg={3} key={index}>
                                  {item.stock !== 0 ? (
                                    <div
                                      className={`tab-variations ${
                                        selectedVariant === item.type
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
                                  ) : (
                                    <div
                                      className="tab-variations disabledvariation"
                                      title="Stock unavailable"
                                    >
                                      {/* <span className="blurred-text"> */}
                                      {item.type}
                                      {/* </span> */}
                                    </div>
                                  )}
                                </Col>
                              ))}
                          </Row>
                        </div>
                      
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

                        <div className="needplaceProduct">
                          <div className="product-deatils-price">
                            <Row>
                              <Col lg={4} sm={4} xs={3}>
                                <h5>{`₹${
                                  isNaN(formattedAmount) ? 0 : formattedAmount
                                }`}</h5>
                              </Col>
                           
                            </Row>
                          </div>
                        </div>
                      </Col>
                    
                    </Row>
                    <hr />
                  </Container>
                </section>
                

                <Container>
                  <div className="needplace">
                    <Row className="justify-content-center">
                      <Col lg={10}>
                        <div className="add-cart-total">
                          <Row>
                            <Col>
                              <h5>Sub Total</h5>
                            </Col>
                            <Col>
                              <h5>₹{parseInt(Amount)}</h5>
                            </Col>
                          </Row>
                          <hr />
                          
                          <Row>
                            <Col>
                              <h5>Tax(5%)</h5>
                            </Col>
                            <Col>
                              <h5>{`₹${Math.floor(Amount * 0.05)}`}</h5>
                            </Col>
                          </Row>
                          <hr />

                          <Row>
                            <Col>
                              <h5>Rounding Adjust</h5>
                            </Col>
                            <Col>
                              <h5>
                                ₹
                                {parseInt(Amount) * 0.05 + parseInt(Amount) ??
                                  0}
                              </h5>
                            </Col>
                          </Row>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Container>
                <div className="homecheckout">
                  {productDetails?.stock &&
                  productDetails?.stock?.length !== 10 ? (
                    <button data-toggle="modal" data-target="#cod">
                      Checkout
                    </button>
                  ) : (
                    <div className="sold-out-btn soldbtn-new mt-3">
                      <Link className="mb-4">Sold Out</Link>
                      <br />
                      <Button data-toggle="modal" data-target="#soldoutModel">
                        Notify Me When Available
                      </Button>
                      <br />
                    </div>
                  )}
                  <button
                    className="mt-3"
                    data-dismiss="modal"
                    onClick={handleResetClick}
                  >
                    Close
                  </button>
                </div>
              </>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade editAddress"
        id="update-model"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Update Address
              </h5>
            </div>
            <div className="modal-body">
              <div class="form-group">
                <label>First Name</label>
                {/* <input
                  class="form-control"
                  type="text"
                  name="first_name"
                  value={profileData.first_name || ""}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      first_name: e.target.value.replace(/[^A-Za-z]/, ""),
                    })
                  }
                /> */}
                <input
                  className="form-control"
                  type="text"
                  name="first_name"
                  value={profileData.first_name || ""}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      first_name: e.target.value,
                    })
                  }
                />
              </div>
              <div class="form-group">
                <label>Last Name</label>
                <input
                  class="form-control"
                  type="text"
                  placeholder="Enter last name"
                  name="last_name"
                  value={profileData.last_name || ""}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      last_name: e.target.value,
                    })
                  }
                />
              </div>
              <div class="form-group">
                <label>Mobile</label>
                <input
                  type="tel"
                  name="mobile"
                  class="form-control"
                  maxLength={10}
                  value={profileData.mobile || ""}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      mobile: e.target.value
                        .replace(/\D/g, "")
                        .substring(0, 10),
                    })
                  }
                />
              </div>
              <div class="form-group">
                <label>flat,House no,Building,Company</label>
                <input
                  class="form-control"
                  type="text"
                  name="house_no"
                  value={profileData.house_no || ""}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      house_no: e.target.value,
                    })
                  }
                />
              </div>
              <div class="form-group">
                <label>Area, Street,Sector,Village</label>
                <input
                  class="form-control"
                  type="text"
                  name="area"
                  value={profileData.area || ""}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      area: e.target.value,
                    })
                  }
                />
              </div>
              <div class="form-group">
                <label>Landmark</label>
                <input
                  class="form-control"
                  type="text"
                  name="landmark"
                  value={profileData.landmark || ""}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      landmark: e.target.value,
                    })
                  }
                />
              </div>
              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <label>State</label>
                    <select
                      className="form-control"
                      onChange={Subscription}
                      value={profileData.state || ""}
                      // onChange={(e) =>
                      // setProfileData ({
                      //   ...profileData,
                      //   state: e.target.value,
                      // })}
                    >
                      <option value="">State Choose...</option>
                      {stateall.map((items) => (
                        <option value={items.state_name} key={items.id}>
                          {items.state_name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <label>City</label>
                    <select
                      className="form-control"
                      onInput={(e) => setSelectedCity(e.target.value)}
                      value={profileData.city || ""}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          city: e.target.value,
                        })
                      }
                    >
                      <option value="">City Choose...</option>
                      {stateallCity.map((items) => (
                        <option value={items.city_name} key={items.id}>
                          {items.city_name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div class="form-group">
                <label for="exampleFormControlInput1">Pincode</label>
                <input
                  class="form-control"
                  type="text"
                  value={profileData.pincode || ""}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      pincode: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleFormSubmit}
                data-dismiss="modal"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="cod"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <div className="payment-done">
                <div className="select-card select-card3">
                  <div className="selct-card-text">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="exampleRadios"
                      data-dismiss="modal"
                      onClick={() => handlePayment()}
                    />
                    <p>Online Payment</p>
                  </div>
                </div>
                <div className="select-card select-card3">
                  <div className="selct-card-text">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="exampleRadios"
                      value="second"
                      checked={selectedInput}
                      onChange={handleRadioChange}
                    />
                    <p>Cash On Delivery</p>
                  </div>
                </div>
                <Button
                  disabled={!selectedInput}
                  data-toggle="modal"
                  data-target="#paysubmit"
                  data-dismiss="modal"
                >
                  <Link>pay</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="paysubmit"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <div className="payment-done">
                <img src={paydone} />
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesettingLorem Ipsum is simply dummy text of the printing
                  and typesetting
                </p>
                <Button
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={handleSendRequest}
                >
                  <Link to="/petShop-shipping">Done</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

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
             
              <Form onSubmit={handleNotifymeSubmit}>
               
                <Form.Group controlId="formVariations" className="mb-3">
                  <Form.Label>Variations</Form.Label>
                  <Form.Control
                    as="select"
                    value={variation}
                    onChange={(e) => {
                      setVariation(e.target.value);
                      setVariationError(""); // Clear previous error when the value changes
                    }}
                    required
                    isInvalid={!!variationError}
                  >
                    <option value="" disabled>
                      Choose an option...
                    </option>
                    {productDetails?.variations &&
                      productDetails?.variations?.length > 0 &&
                      productDetails?.variations.map((item, index) => (
                        <option key={index}>{item.type}</option>
                      ))}
                  </Form.Control>
                  {variationError && (
                    <div className="error-message">{variationError}</div>
                  )}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupEmail">
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Email ID"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setIsEmailValid(isEmailFormatValid(e.target.value));
                    }}
                    isInvalid={!isEmailValid}
                  />
                  {!isEmailValid && (
                    <Form.Control.Feedback
                      type="invalid"
                      className="custom-form-control-feedback"
                    >
                      {/[A-Z]/.test(email) && !email.includes("@")
                        ? "Email should not contain capital letters and must include '@'."
                        : "Please enter a valid email address."}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>

                <Button variant="primary mt-3" type="submit">
                  Notify Me When Available
                </Button>
              </Form>
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
export default PetshopPetcategory;
