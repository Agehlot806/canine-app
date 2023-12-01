import React, { useEffect, useState, useRef } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";
import pro from "../assets/images/icon/pro.png";
import { BASE_URL } from "../Constant/Index";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { useCartContext } from "../component/context/addToCartContext";
import { useNotificationContext } from "../component/context/notificationContext";
import { Col, Row } from "react-bootstrap";
import loicon1 from "../assets/images/img/loicon1.png";
import { BiSolidOffer } from "react-icons/bi";
import "../assets/css/menus.css";
import { useCartWithoutLogin } from "../component/context/AddToCardWithoutLogin";
// import DocumentMeta from "react-document-meta";

function Newheader(props) {
  const navigate = useNavigate();
  // const { dataLength } = props;
  const [notification, setNotification] = useState([]);
  const [allnotification, setAllnotification] = useState([]);
  const [allproduct, setAllProduct] = useState([]);
  const [dogsubcategories, setdogsubcategories] = useState("");
  const [storedUserId, setStoredUserId] = useState(null);
  const [notify, setNotify] = useState([]);
  const [dataZero, setDataZero] = useState([]);
  console.log("dataZero", dataZero);
  const [categories, setcategories] = useState([]);
  const salesmanId = localStorage.getItem("salesmanId");
  const { cartData, dataLength, dataLengthpetshop, addToCartData } =
    useCartContext();
  // const { totalLength } = useNotificationContext();
  const { notificationLength } = useNotificationContext();

  const { cart, dispatch } = useCartWithoutLogin();
  const loginType = localStorage.getItem("loginType");
  const customerLoginId =
    loginType === "wholeseller"
      ? Number(localStorage.getItem("UserWholesellerId"))
      : localStorage.getItem("userInfo");
  console.log("customerLoginId", customerLoginId);
  // const [isTotalLengthVisible, setTotalLengthVisible] = useState(true);
  // Seo Keywords start
  
  // const DogFoodmeta = {
  //   title: 'Canine Culinary Excellence with Fresh, Raw, and Top Dog Food Brands',
  //   description: 'Discover the top dog food brands that prioritize your pets health and happiness',
  //   canonical: 'http://caninedemo.caninetest.xyz/',
  //   meta: {
  //     charset: 'utf-8',
  //     name: {
  //       keywords: 'canin dog food,fresh dog food,best dog food,raw dog food,best dog food brands,dog food brands'
  //     }
  //   }
  // }
  // const TrainingAccessoriesmeta = {
  //   title: 'Essential Dog Training Equipment, Treats, and Accessories',
  //   description: 'Electronic dog collars for effective communication, indulge your pup with the best dog treats for training success',
  //   canonical: 'http://caninedemo.caninetest.xyz/',
  //   meta: {
  //     charset: 'utf-8',
  //     name: {
  //       keywords: 'dog training equipment,electronic dog collars,dog training treats,puppy training treats,custom dog bandanas,best dog treats for training,best puppy training treats,personalized dog bandanas,puppy bandanas,dog mufflers,dog shoes,dog socks,dog boots,puppy shoes,waterproof dog shoes,pet shoes'
  //     }
  //   }
  // }
  // const Collarmeta = {
    
  //   title: 'Collar leashes and more Premium Dog Collar Leashes, Harnesses, and Chains for Every Adventure',
  //   description: 'Explore the best dog harness options, including no-pull designs for a comfortable and controlled walking experience',
  //   canonical: 'http://caninedemo.caninetest.xyz/',
  //   meta: {
  //     charset: 'utf-8',
  //     name: {
  //       keywords: 'dog collar leashes,dog harness,dog chains,no pull dog harness,best dog harness,ruffwear harness,tactical dog harness,small dog harness'
  //     }
  //   }
  // }
  // const ShampooPerfumesmeta = {
  //   title: 'Pamper Your Pooch with Premium Dog Shampoo and Perfumes',
  //   description: 'Find the best dog shampoo for various needs, including flea control, dry shampooing, medicated formulas, and soothing options for itchy skin.',
  //   canonical: 'http://caninedemo.caninetest.xyz/',
  //   meta: {
  //     charset: 'utf-8',
  //     name: {
  //       keywords: 'dog shampoo,dog perfumes,best dog shampoo,flea shampoo for dogs,dry shampoo for dogs,medicated dog shampoo,best dog shampoo for itchy skin,puppy shampoo,dog perfume spray,puppy perfume,dog fragrance spray,dog body spray,canine perfume,dog fragrance spray'
  //     }
  //   }
  // }
  // const Toysmeta = {

  //   title: 'Engaging Dog Toys for Playful Pups | Interactive, Chew Toys & More',
  //   description: 'Discover a range of dog toys, including chew toys, interactive options, squeaker toys, and engaging choices for puppies.',
  //   canonical: 'http://caninedemo.caninetest.xyz/',
  //   meta: {
  //     charset: 'utf-8',
  //     name: {
  //       keywords: 'dog toys,dog chew toys,puppy toys,toys for puppies,squeaker toys,dog interactive toys'
  //     }
  //   }
  // }
  // const TreatsChewsmeta = {

  //   title: 'Irresistible Dog Treats & Biscuits for Training ',
  //   description: 'Variety of dog biscuits and treats, perfect for rewarding your furry friend during training.',
  //   canonical: 'http://caninedemo.caninetest.xyz/',
  //   meta: {
  //     charset: 'utf-8',
  //     name: {
  //       keywords: 'dog biscuits,dog treat biscuits,dog treats,best treats for puppies,dog training treats,healthy dog treats,best dog treats for training'
  //     }
  //   }
  // }
  // const BedsCagesmeta = {
  // title: 'Premium Dog Beds, Crates, and Carriers',
  //   description: 'Provide your furry friend with the ultimate in comfort and security with our range of top-quality dog beds, cages, carriers, and kennels',
  //   canonical: 'http://caninedemo.caninetest.xyz/',
  //   meta: {
  //     charset: 'utf-8',
  //     name: {
  //       keywords: 'dog beds,dog cages,dog carriers,large dog crate,pet crate,dog kennel,large dog bed,best dog beds,orthopedic dog bed,xxl dog crate,outdoor dog kennel,puppy cage'
  //     }
  //   }
  // }

  // const BowlsFeedersmeta = {

  //   title: 'Premium Dog Bowls, Feeders, and Dishes for Every Pup Palate',
  //   description: 'pups dining experience with our exquisite collection of dog bowls, feeders, and dishes designed for both style and functionality',
  //   canonical: 'http://caninedemo.caninetest.xyz/',
  //   meta: {
  //     charset: 'utf-8',
  //     name: {
  //       keywords: 'dog bowls,dog feeders,dog dishes,automatic dog feeder,slow feeder dog bowl,elevated dog bowls,ceramic dog bowls,dog water bowl,dog feeder,dog food dispenser,stainless steel dog bowls,dog food bowls'
  //     }
  //   }
  // }
  // const Groomingmeta = {

  //   title: 'Premium Dog Grooming Tools | Brushes, Nail Clippers, Combs & More',
  //   description: 'Explore top-quality dog grooming essentials like brushes, nail clippers, slicker brushes, combs, and more.',
  //   canonical: 'http://caninedemo.caninetest.xyz/',
  //   meta: {
  //     charset: 'utf-8',
  //     name: {
  //       keywords: 'dog brush,dog nail cutter,dog combs,dog slicker brush,dog gloves,dog nail clippers,dog toothbrush,slicker brush,deshedding brush,flea comb for dogs,dog brush for shedding'
  //     }
  //   }
  // }
  // const HealthCaremeta = {
    
  //   title: 'Solutions for Dog Flea and Tick Control, Diapers, and Treatment',
  //   description: 'Discover reliable products for dog flea and tick control, including treatments, medications, and preventive measures.',
  //   canonical: 'http://caninedemo.caninetest.xyz/',
  //   meta: {
  //     charset: 'utf-8',
  //     name: {
  //       keywords: 'dog flea,dog tick,dog diapers,tick treatment for dogs,tick med for dogs,dogs and fleas,canine diapers'
  //     }
  //   }
  // }
  // seo Keywords end

  // Seo cat Keywords start
  
  // const CatFoodmeta = {
  //   title: 'Choosing the Best Cat Food: A Guide to Raw, Fresh, and Dry Options Including Royal Canin Wet Cat Food',
  //   description: 'Discover the optimal nutrition for your feline friend with our comprehensive guide to cat food options. Explore the benefits of raw, fresh, and dry cat food, and learn about the excellence of Royal Canins wet cat food.',
  //   canonical: 'http://caninedemo.caninetest.xyz/',
  //   meta: {
  //     charset: 'utf-8',
  //     name: {
  //       keywords: 'best cat food,raw cat food,fresh cat food,dry cat food,Best dry cat food,royal cani wet cat food'
  //     }
  //   }
  // }
  // const CatCollarLeashesMoremeta= {
  //   title: 'Purr-fect Companions: Exploring Cat Collars, Leashes, and Harness Sets for Safe Adventures',
  //   description: 'Explore the outdoors with our collection of cat collars, leashes, and harness sets, providing comfort and security for your feline friend.',
  //   canonical: 'http://caninedemo.caninetest.xyz/',
  //   meta: {
  //     charset: 'utf-8',
  //     name: {
  //       keywords: 'cat collar and leash,cat leashes and harness,cat harness and collar,leash and collar for cats'
  //     }
  //   }
  // }
  // const CatLitterScoopermeta= {
    
  //   title: 'Simplify Cat Care with Scoop Away Litter, ScoopFree Trays, and Convenient Cat Litter Scoops',
  //   description: 'Our top-quality products, including Scoop Away and ScoopFree litter boxes, streamline cat litter routines, keep spaces clean, and make cat care a breeze.',
  //   canonical: 'http://caninedemo.caninetest.xyz/',
  //   meta: {
  //     charset: 'utf-8',
  //     name: {
  //       keywords: 'scoop away cat litter,scoop free litter box tray,cat litter scoop'
  //     }
  //   }
  // }
  // const CatToysmeta= {
  //   title: 'Engage and Entertain: Interactive Cat Toys for Indoor Fun!',
  //   description: 'Our interactive cat toys, including a remote control mouse, provide endless entertainment for indoor cats, eliminating boredom and providing a perfect playmate.',
  //   canonical: 'http://caninedemo.caninetest.xyz/',
  //   meta: {
  //     charset: 'utf-8',
  //     name: {
  //       keywords: 'interactive cat toys for indoor cats,fun cat toys,toys for bored cats,remote control mouse for cats'
  //     }
  //   }
  // }
  // const CatTreatsmeta= {

  //   title: 'Spoil Your Feline Friend with Delightful Treats: Crunchy, Creamy, and Wellness Kittles Cat Treats, Plus Raw Meaty Bones',
  //   description: 'Our cat treats range from crunchy and creamy to health-conscious Wellness Kittles, offering natural, wholesome options like raw meaty bones, ensuring your cats optimal snack experience.',
  //   canonical: 'http://caninedemo.caninetest.xyz/',
  //   meta: {
  //     charset: 'utf-8',
  //     name: {
  //       keywords: 'crunchy cat treats,creamy cat treats,wellness kittles cat treats,raw meaty bones'
  //     }
  //   }
  // }
  // const CatShampooPerfumesmeta= {

  //   title: 'Pamper Your Purr-fect Companion: Cat Deodorants, Perfumes, Shampoos, and Wild Stone Fragrances',
  //   description: 'Our collection of cat deodorants, perfumes, and shampoos, including Wild Stones luxurious scents, offers a luxurious grooming experience for the discerning cat owner.',
  //   canonical: 'http://caninedemo.caninetest.xyz/',
  //   meta: {
  //     charset: 'utf-8',
  //     name: {
  //       keywords: 'Cat deodrant & perfumes,Cat shampoo & perfumes,wild stone deodorants'
  //     }
  //   }
  // }
  const CatClothingAccessoriesmeta= {
  title: 'Purr-fectly Chic: Cat in the Hat Inspired Dress for Feline Fashionistas',
    description: 'Our Cat in the Hat dress is a whimsical pet-inspired fashion piece that combines feline charm with stylish flair, and comes with a pet odor eliminator for a fresh home.',
    canonical: 'http://caninedemo.caninetest.xyz/',
    meta: {
      charset: 'utf-8',
      name: {
        keywords: 'Clothing & Accessories,cat and the hat dress,best pet odor eliminator,tain & odor remover'
      }
    }
  }
  // const CatBowlsFeedersmeta= {

  //   title: 'Elevate Mealtime: Stylish and Functional Cat Bowls for Fast Eaters',
  //   description: 'Elevated ceramic cat bowls, designed for fast eaters, offer a chic and practical dining solution for your cats meals.',
  //   canonical: 'http://caninedemo.caninetest.xyz/',
  //   meta: {
  //     charset: 'utf-8',
  //     name: {
  //       keywords: 'elevated cat bowls,Cat bowls for fast eaters,elevated cat food bowl,Water feeder for cat,elevated ceramic cat bowls'
  //     }
  //   }
  // }
  // const CatGroomingmeta= {

  //   title: 'Feline Fabulous: Top Cat Brushes for Shedding and Grooming',
  //   description: 'Explore our collection of cat combs and brushes for effective shedding control and pampered grooming, keeping your cats coat sleek and shiny.',
  //   canonical: 'http://caninedemo.caninetest.xyz/',
  //   meta: {
  //     charset: 'utf-8',
  //     name: {
  //       keywords: 'cat hair brush for shedding,grooming brush for cats,cat combs and brushes,hair brush for cats'
  //     }
  //   }
  // }
  // const CatHealthCaremeta= {
    
  //   title: 'Top Cat Nutrition: Best Feline Supplements for Health and Vitality',
  //   description: 'Our selection of healthy cat supplements includes essential vitamins and comprehensive feline nutrition, ensuring your cats well-being and a happy and thriving companion.',
  //   canonical: 'http://caninedemo.caninetest.xyz/',
  //   meta: {
  //     charset: 'utf-8',
  //     name: {
  //       keywords: 'best nutritional supplement for cats,healthy supplements for cats,feline vitamin supplement,cat vitamins & supplements'
  //     }
  //   }
  // }

// const CatBedsCagesScratcherCratesmeta= {
    
//     title: 'Cozy Cat Comfort: Heated Bed, Large Litter Mat, and Warming Pad Essentials',
//     description: 'Our heated cat bed, spacious litter mat, and warming pad provide your feline friend with comfort, warmth, and cleanliness, ensuring a happy and content cat.',
//     canonical: 'http://caninedemo.caninetest.xyz/',
//     meta: {
//       charset: 'utf-8',
//       name: {
//         keywords: 'heated cat bed,cat litter mat large,cat litter box mat,litter catching mat,modern cat bed'
//       }
//     }
//   }
  // seo cat Keywords end

  useEffect(() => {
    // fetchBrands();
    allProductdata();
    AllDogsubcategories();
    categoriesProduct();
    addToCartData();
    // fetchNotifications();
  }, []);
  useEffect(() => {
    Notifynotification();
  }, []);
  if (dataZero?.length > 0 && dataZero[0] && dataZero[0]?.id !== undefined) {
    const dataZeroid = dataZero[0]?.id; // Access the first element's "id" property
    console.log(dataZeroid);
  } else {
    console.log(
      "The 'id' property is missing or undefined in the first object."
    );
  }
  const categoriesProduct = async () => {
    try {
      const response = await fetch(`${BASE_URL}/categories`);
      const jsonData = await response.json();
      const ids = jsonData.data.map((categories) => categories.id);

      // Now you have an array of IDs
      console.log(ids);
      setcategories(jsonData.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/customer/notifications?tergat=customer`
      );
      setNotification(response.data.state);
    } catch (error) {
      console.error(error);
    }
  };

  const allProductdata = async () => {
    axios
      .get(`${BASE_URL}/items/latest`)
      .then((response) => {
        console.log(response);
        console.log("Delete Successful");
        setAllProduct(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const logoutUser = () => {
    const customer_id = localStorage.getItem("userInfo");
    if (customer_id) {
      try {
        dispatch({
          type: "CLEAR_CART",
        });
        navigate("/", { replace: true });
        localStorage.removeItem("userInfo");
        localStorage.removeItem("loginType");
        localStorage.removeItem("wallet_balance");
        localStorage.removeItem("wishlist_undefined");
        localStorage.removeItem("phone");
        localStorage.removeItem("otp");
        localStorage.removeItem("zoneId");
        console.log("Logged out user with ID: ", customer_id);
        setStoredUserId(null); // Reset the storedUserId state
        toast.success("Your user ID logout has been successful.");
        // window.location.reload(false);
      } catch (error) {
        console.error("Error parsing stored user ID: ", error);
      }
    } else {
      console.log("No user ID found in localStorage.");
    }
  };

  useEffect(() => {
    const customer_id = localStorage.getItem("userInfo");
    setStoredUserId(JSON.parse(customer_id));
  }, []);

  const [profileData, setProfileData] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState({ image: "" } || null);
  useEffect(() => {
    const customer_id = localStorage.getItem("userInfo");
    // Fetch profile data from the API
    axios
      .get(`${BASE_URL}/auth/my_profile/${customer_id}`)
      .then((response) => {
        console.log("imageupdate", response.data);
        if (response.data.status === "200" && response.data.data.length > 0) {
          const profile = response.data.data[0];
          console.log("response.data: ", response.data);
          setProfileData(profile);
          // Update the profileData state
          if (profile.image) {
            setImageUrl({ image: profile.image });
          }
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const AllDogsubcategories = async () => {
    axios
      .get(`${BASE_URL}/categories/subcategories`)
      .then((response) => {
        console.log(response);
        console.log("Delete Successful");

        setdogsubcategories(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // storedUserId
  const customer_id = localStorage.getItem("userInfo");
  // let storedUserId = JSON.parse(customer_id);
  // =----------------------------

  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (searchQuery.length > 0) {
      // Filter products when the search query changes
      const filteredProducts = products.filter((product) => {
        const lowerSearchQuery = searchQuery.toLowerCase();
        return (
          (product.name &&
            product.name.toLowerCase().includes(lowerSearchQuery)) ||
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
  }, [searchQuery, products]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/items/latest`
      );
      setProducts(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const Notifynotification = () => {
    axios
      .get(`${BASE_URL}/items/notify_list/${customer_id}`)
      .then((response) => {
        setNotify(response.data.data);
        // console.log("Notify-Notificationnnnnnnnnnnnn", response.data.data);
        setDataZero(response.data.notification);
        console.log("Data Zero", response.data.notification);
        setAllnotification(response.data.all_notification);
        console.log("allnotificationnnnnn", response.data.all_notification);
      })
      .catch((error) => {
        console.log("EEEEEEEEEErrrrorrrrrrr", error);
      });
  };
  console.log("------------->id", dataZero);

  const DeleteNotification = (id) => {
    console.log("Deleting Notification with ID:", id);
    axios
      .delete(`${BASE_URL}/items/notify_delete/${id}`)
      .then((response) => {
        toast.success("Notification deleted successfully");
        setDataZero((prevData) => prevData.filter((item) => item.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting Notification:", error);
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

  // const DeleteNotificationone = (id) => {
  //   axios
  //     .delete(`${BASE_URL}/items/notify_delete/${id}`)
  //     .then((response) => {
  //       if (response.status === 200 || response.status === 204) {
  //         toast.success("Notification deleted successfully");
  //         setDataZero((prevDataZero) => {
  //           const updatedDataZero = prevDataZero.filter((ob) => ob.id !== id);
  //           return updatedDataZero;
  //         });
  //       } else {
  //         console.error("Unexpected response status:", response.status);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error deleting Notification:", error);
  //     });
  //   const modal = document.querySelector(".modal");
  //   if (modal) {
  //     modal.classList.remove("show");
  //     modal.style.display = "none";
  //     document.body.classList.remove("modal-open");
  //     const modalBackdrop = document.querySelector(".modal-backdrop");
  //     if (modalBackdrop) {
  //       modalBackdrop.remove();
  //     }
  //   }
  // };

  const [apiResponse, setApiResponse] = useState(null);
  const [apiError, setApiError] = useState(null);

  const handleLinkClick = async (dataZeroid) => {
    try {
      const formData = new FormData();
      formData.append("dataZeroid", dataZeroid);

      const response = await fetch(
        `${BASE_URL}/items/notify_view/${dataZeroid}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.status === 200) {
        const responseData = await response.json();
        setApiResponse(responseData);
      }
    } catch (error) {
      setApiError("Network error");
      console.error(error);
    }
  };

  const Modaloff = () => {
    const modal = document.getElementById("exampleModal");
    $(modal).modal("hide"); // Toggle the modal using Bootstrap's modal method
  };

  return (
    <>
      <div className="sticky-newheader">
        <nav className="navbar navbar-expand-lg navbar-light newnavv">
          <div className="wrapper">
            <div className="logo">
              <Link
                to={props.type == "salesman" ? "/salesman-dashboad" : "/"}
                className="logoBG"
              >
                <img src={logo} />
              </Link>
            </div>

            <div className="hide-icons">
              <li>
                <Link className="profiledes searneee">
                  <i className="fa fa-search" />
                  <input
                    type="text"
                    placeholder="What are you looking for"
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                    className="homesea"
                  />
                  <ul className="drop-menu search-results">
                    {/* {filteredProducts.map((product, index, id) => (
                      <li key={index}>
                        <Link to={`/product-details/${product.id}`}>
                          {product.name}
                        </Link>
                      </li>
                    ))} */}
                    {filteredProducts.map((product, index, id) => (
                      <li key={index}>
                        <Link to={`/product-details/${product.id}`}>
                          {product.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </Link>
              </li>
              <li>
                <Link to="/add-cart" className="notification-btn">
                  <i class="fa fa-shopping-cart" />{" "}
                  <span className="cart-count">
                    {customerLoginId === null
                      ? cart?.length
                      : dataLengthpetshop}
                  </span>{" "}
                </Link>
              </li>
            </div>
            <input type="radio" name="slider" id="menu-btn" />
            <input type="radio" name="slider" id="close-btn" />
            <ul className="nav-links">
              <label htmlFor="close-btn" className="btn close-btn">
                <i className="fas fa-times" />
              </label>
              <div className="web-icon">
                {storedUserId ? (
                  <>
                    <li className="webhide">
                      <a href="#" className="profiledes desktop-item">
                        <img
                          src={
                            profileData?.image
                              ? "http://caninedemo.caninetest.xyz/storage/app/public/profile/" +
                                profileData.image
                              : loicon1
                          }
                          alt="Profile Image"
                        />
                      </a>
                      <input type="checkbox" id="showDropProfile" />
                      <label
                        htmlFor="showDropProfile"
                        className="mobile-item proihg"
                      >
                        <img
                          src={
                            profileData?.image
                              ? "http://caninedemo.caninetest.xyz/storage/app/public/profile/" +
                                profileData.image
                              : loicon1
                          }
                          alt="Profile Image"
                        />
                      </label>
                      <ul className="drop-menu">
                        <li>
                          <Link className="dropdown-item" to="/update-profile">
                            Profile
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" to="/all-veterinary">
                            All Veterinary
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="dropdown-item"
                            to="/transition-history"
                          >
                            Transaction History
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="dropdown-item"
                            to="/all-service-booking"
                          >
                            All Service Booking
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" to="/my-orders">
                            My Orders
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="dropdown-item"
                            to="/wishlist-products"
                          >
                            Wishlist Products
                          </Link>
                        </li>

                        <li>
                          <Link
                            className="dropdown-item"
                            to={`/my-pet-profile/`}
                          >
                            Pet Profile
                          </Link>
                        </li>
                      </ul>
                    </li>
                    <li className="webhide">
                      <a
                        className="profiledes notification-btn notimob"
                        data-toggle="modal"
                        data-target="#exampleModal"
                        // onClick={handleBellClick}
                      >
                        <i class="fa fa-bell-o" />
                        {/* {isTotalLengthVisible && <span>{isNaN(totalLength) ? 0 : totalLength}</span>} */}
                        {/* {isTotalLengthVisible && (
                      <span>{isNaN(customCount) ? 0 : customCount}</span>
                    )}
                    {console.log("custommmmmm", customCount)} */}
                        {isNaN(notificationLength) ? 0 : notificationLength}
                      </a>
                    </li>
                  </>
                ) : null}
              </div>
              <li>
                <a className="desktop-item">
                  Dogs
                  <i class="fa fa-angle-down arrr" />
                </a>
                <input type="checkbox" id="showMega" />
                <label htmlFor="showMega" className="mobile-item">
                  Dogs
                  <i class="fa fa-angle-down arrr" />
                </label>

                <div className="mega-box">
                  <div className="content">
                    <Row>
                      {/* <Col lg={6} className="p-0">
                        <Row> */}
                      <Col lg={2} sm={12} className="mga-he">
                      {/* <DocumentMeta {...DogFoodmeta}> */}
                        <header>
                          <Link to={`/DogFood/${`Food`}/${1}`}>
                            Dog Food
                          </Link>
                        </header>
                          {/* </DocumentMeta> */}
                        <ul className="mega-links">
                          {dogsubcategories ? (
                            dogsubcategories.map((item) => {
                              if (
                                item.heading === "Food" &&
                                item.category === "1"
                              ) {
                                return (
                                  <li key={item.id}>
                                    <Link
                                      to={`/sub-categoriesProduct/${item.name}/${item.category}`}
                                    >
                                      {item.name}
                                    </Link>
                                  </li>
                                );
                              }
                              return null;
                            })
                          ) : (
                            <p className="emptyMSG">
                              No Dog Food Sub Categories.
                            </p>
                          )}
                        </ul>
                      </Col>
                      <Col lg={2} sm={12} className="mga-he">
                      {/* <DocumentMeta {...BedsCagesmeta}> */}
                        <header>
                          <Link
                            to={`/Bedscagescarriers/${`Beds Cages, Scratcher & Crates`}/${1}`}
                          >
                            Beds Cages & Carriers
                          </Link>
                        </header>
                        {/* </DocumentMeta> */}
                        <ul className="mega-links">
                          {dogsubcategories ? (
                            dogsubcategories.map((item) => {
                              if (
                                item.heading ===
                                  "Beds Cages, Scratcher & Crates" &&
                                item.category === "1"
                              ) {
                                return (
                                  <li>
                                    <Link
                                      to={`/sub-categoriesProduct/${item.name}/${item.category}`}
                                    >
                                      {item.name}
                                    </Link>
                                  </li>
                                );
                              }
                              return null;
                            })
                          ) : (
                            <p className="emptyMSG">
                              No Beds Cages, Scratcher & Crates Sub Categories.
                            </p>
                          )}
                        </ul>
                      </Col>
                      <Col lg={2} sm={12} className="mga-he">
                      {/* <DocumentMeta {...Collarmeta}> */}
                        <header>
                          <Link
                            to={`/CollarLeashesMore/${`Collar Leashes & More`}/${1}`}
                          >
                            Collar Leashes & More
                          </Link>
                        </header>
                        {/* </DocumentMeta> */}
                        <ul className="mega-links">
                          {dogsubcategories ? (
                            dogsubcategories.map((item) => {
                              if (
                                item.heading === "Collar Leashes & More" &&
                                item.category === "1"
                              ) {
                                return (
                                  <li>
                                    <Link
                                      to={`/sub-categoriesProduct/${item.name}/${item.category}`}
                                    >
                                      {item.name}
                                    </Link>
                                  </li>
                                );
                              }
                              return null;
                            })
                          ) : (
                            <p className="emptyMSG">
                              No Collar Leashes & More Sub Categories.
                            </p>
                          )}
                        </ul>
                      </Col>
                      <Col lg={2} sm={12} className="mga-he">
                        {/* <DocumentMeta {...ShampooPerfumesmeta}> */}
                        <header>
                          <Link
                            to={`/ShampooPerfumes/${`Shampoo & Perfumes`}/${1}`}
                          >
                            Shampoo & Perfumes
                          </Link>
                        </header>
                        {/* </DocumentMeta> */}
                        <ul className="mega-links">
                          {dogsubcategories ? (
                            dogsubcategories.map((item) => {
                              if (
                                item.heading === "Shampoo & Perfumes" &&
                                item.category === "1"
                              ) {
                                return (
                                  <li>
                                    <Link
                                      to={`/sub-categoriesProduct/${item.name}/${item.category}`}
                                    >
                                      {item.name}
                                    </Link>
                                  </li>
                                );
                              }
                              return null;
                            })
                          ) : (
                            <p className="emptyMSG">
                              No Shampoo & Perfumes Sub Categories.
                            </p>
                          )}
                        </ul>
                      </Col>
                      <Col lg={2} sm={12} className="mga-he">
                      {/* <DocumentMeta {...TreatsChewsmeta}> */}
                        <header>
                          <Link to={`/TreatsChews/${`Treats`}/${1}`}>
                            Treats & Chews
                          </Link>
                        </header>
                        {/* </DocumentMeta> */}
                        <ul className="mega-links">
                          {dogsubcategories ? (
                            dogsubcategories.map((item) => {
                              if (
                                item.heading === "Treats" &&
                                item.category === "1"
                              ) {
                                return (
                                  <li>
                                    <Link
                                      to={`/sub-categoriesProduct/${item.name}/${item.category}`}
                                    >
                                      {item.name}
                                    </Link>
                                  </li>
                                );
                              }
                              return null;
                            })
                          ) : (
                            <p className="emptyMSG">
                              No Treats Sub Categories.
                            </p>
                          )}
                        </ul>
                      </Col>
                      <Col lg={2} sm={12} className="mga-he">
                      {/* <DocumentMeta {...Toysmeta}> */}
                        <header>
                          <Link to={`/Toys/${`Toys`}/${1}`}>
                            Toys
                          </Link>
                        </header>
                        {/* </DocumentMeta> */}
                        <ul className="mega-links">
                          {dogsubcategories ? (
                            dogsubcategories.map((item) => {
                              if (
                                item.heading === "Toys" &&
                                item.category === "1"
                              ) {
                                return (
                                  <li>
                                    <Link
                                      to={`/sub-categoriesProduct/${item.name}/${item.category}`}
                                    >
                                      {item.name}
                                    </Link>
                                  </li>
                                );
                              }
                              return null;
                            })
                          ) : (
                            <p className="emptyMSG">No Toys Sub Categories.</p>
                          )}
                        </ul>
                      </Col>
                      {/* </Row>
                      </Col> */}
                      {/* <Col lg={6} className="p-0">
                        <Row> */}

                      <Col lg={2} sm={12} className="mga-he">
                      {/* <DocumentMeta {...TrainingAccessoriesmeta}> */}
                        <header>
                          <Link
                            to={`/TrainingAccessories/${`Training & Accessories`}/${1}`}
                          >
                            Training & Accessories
                          </Link>
                        </header>
                        {/* </DocumentMeta> */}
                        <ul className="mega-links">
                          {dogsubcategories ? (
                            dogsubcategories.map((item) => {
                              if (
                                item.heading === "Training & Accessories" &&
                                item.category === "1"
                              ) {
                                return (
                                  <li>
                                    <Link
                                      to={`/sub-categoriesProduct/${item.name}/${item.category}`}
                                    >
                                      {item.name}
                                    </Link>
                                  </li>
                                );
                              }
                              return null;
                            })
                          ) : (
                            <p className="emptyMSG">
                              No Training & Accessories Sub Categories.
                            </p>
                          )}
                        </ul>
                      </Col>
                      <Col lg={2} sm={12} className="mga-he">
                      {/* <DocumentMeta {...BowlsFeedersmeta}> */}
                        <header>
                          <Link
                            to={`/BowlsFeeders/${`Bowls & Feeders`}/${1}`}
                          >
                            Bowls & Feeders
                          </Link>
                        </header>
                        {/* </DocumentMeta> */}
                        <ul className="mega-links">
                          {dogsubcategories ? (
                            dogsubcategories.map((item) => {
                              if (
                                item.heading === "Bowls & Feeders" &&
                                item.category === "1"
                              ) {
                                return (
                                  <li>
                                    <Link
                                      to={`/sub-categoriesProduct/${item.name}/${item.category}`}
                                    >
                                      {item.name}
                                    </Link>
                                  </li>
                                );
                              }
                              return null;
                            })
                          ) : (
                            <p className="emptyMSG">
                              No Bowls & Feeders Sub Categories.
                            </p>
                          )}
                        </ul>
                      </Col>
                      <Col lg={2} sm={12} className="mga-he">
                      {/* <DocumentMeta {...Groomingmeta}> */}
                        <header>
                          <Link
                            to={`/Grooming/${`Grooming`}/${1}`}
                          >
                            Grooming
                          </Link>
                        </header>
                        {/* </DocumentMeta> */}
                        <ul className="mega-links">
                          {dogsubcategories ? (
                            dogsubcategories.map((item) => {
                              if (
                                item.heading === "Grooming" &&
                                item.category === "1"
                              ) {
                                return (
                                  <li>
                                    <Link
                                      to={`/sub-categoriesProduct/${item.name}/${item.category}`}
                                    >
                                      {item.name}
                                    </Link>
                                  </li>
                                );
                              }
                              return null;
                            })
                          ) : (
                            <p className="emptyMSG">
                              No Grooming Sub Categories.
                            </p>
                          )}
                        </ul>
                      </Col>
                      <Col lg={2} sm={12} className="mga-he">
                      {/* <DocumentMeta {...HealthCaremeta}> */}
                        <header>
                          <Link
                            to={`/HealthCare/${`Health Care`}/${1}`}
                          >
                            Health Care
                          </Link>
                        </header>
                        {/* </DocumentMeta> */}
                        <ul className="mega-links">
                          {dogsubcategories ? (
                            dogsubcategories.map((item) => {
                              if (
                                item.heading === "Health Care" &&
                                item.category === "1"
                              ) {
                                return (
                                  <li>
                                    <Link
                                      to={`/sub-categoriesProduct/${item.name}/${item.category}`}
                                    >
                                      {item.name}
                                    </Link>
                                  </li>
                                );
                              }
                              return null;
                            })
                          ) : (
                            <p className="emptyMSG">
                              No Health Care Sub Categories.
                            </p>
                          )}
                        </ul>
                      </Col>
                      {/* </Row>
                      </Col> */}
                    </Row>
                  </div>
                </div>
              </li>
              <li>
                <a className="desktop-item">
                  Cats
                  <i class="fa fa-angle-down arrr" />
                </a>
                <input type="checkbox" id="showMegaCat" />
                <label htmlFor="showMegaCat" className="mobile-item">
                  Cats
                  <i class="fa fa-angle-down arrr" />
                </label>
                <div className="mega-box">
                  <div className="content">
                    <Row>
                      {/* <Col lg={6} className="p-0">
                        <Row> */}
                      <Col lg={2} sm={12} className="mga-he">
                      {/* <DocumentMeta {...CatFoodmeta}> */}
                        <header>
                          <Link to={`/CatFood/${`Food`}/${2}`}>
                            Cat Food
                          </Link>
                        </header>
                        {/* </DocumentMeta> */}
                        <ul className="mega-links">
                          {dogsubcategories ? (
                            dogsubcategories.map((item) => {
                              if (
                                item.heading === "Food" &&
                                item.category === "2"
                              ) {
                                return (
                                  <li key={item.id}>
                                    <Link
                                      to={`/sub-categoriesProduct/${item.name}/${item.category}`}
                                    >
                                      {item.name}
                                    </Link>
                                  </li>
                                );
                              }
                              return null;
                            })
                          ) : (
                            <p className="emptyMSG">
                              No Cat Food Sub Categories.
                            </p>
                          )}
                        </ul>
                      </Col>
                      <Col lg={2} sm={12} className="mga-he">
                      {/* <DocumentMeta {...CatCollarLeashesMoremeta}> */}
                        <header>
                          <Link
                            to={`/CatCollarLeashesMore/${`Collar Leashes & More`}/${2}`}
                          >
                            Collar Leashes & More
                          </Link>
                        </header>
                        {/* </DocumentMeta> */}
                        <ul className="mega-links">
                          {dogsubcategories ? (
                            dogsubcategories.map((item) => {
                              if (
                                item.heading === "Collar Leashes & More" &&
                                item.category === "2"
                              ) {
                                return (
                                  <li>
                                    <Link
                                      to={`/sub-categoriesProduct/${item.name}/${item.category}`}
                                    >
                                      {item.name}
                                    </Link>
                                  </li>
                                );
                              }
                              return null;
                            })
                          ) : (
                            <p className="emptyMSG">
                              No Collar Leashes & More Sub Categories.
                            </p>
                          )}
                        </ul>
                      </Col>

                      <Col lg={2} sm={12} className="mga-he">
                      {/* <DocumentMeta {...CatLitterScoopermeta}> */}
                        <header>
                          <Link
                            to={`/CatLitterScooper/${`Cat Litter & Scooper`}/${2}`}
                          >
                            Cat Litter & Scooper
                          </Link>
                        </header>
                        {/* </DocumentMeta> */}
                        <ul className="mega-links">
                          {dogsubcategories ? (
                            dogsubcategories.map((item) => {
                              if (
                                item.heading === "Cat Litter & Scooper" &&
                                item.category === "2"
                              ) {
                                return (
                                  <li>
                                    <Link
                                      to={`/sub-categoriesProduct/${item.name}/${item.category}`}
                                    >
                                      {item.name}
                                    </Link>
                                  </li>
                                );
                              }
                              return null;
                            })
                          ) : (
                            <p className="emptyMSG">
                              No Cat Litter & Scooper Sub Categories.
                            </p>
                          )}
                        </ul>
                      </Col>
                      <Col lg={2} sm={12} className="mga-he">
                      {/* <DocumentMeta {...CatToysmeta}> */}
                        <header>
                          <Link to={`/CatToys/${`Toys`}/${2}`}>
                            Toys
                          </Link>
                        </header>
                        {/* </DocumentMeta> */}
                        <ul className="mega-links">
                          {dogsubcategories ? (
                            dogsubcategories.map((item) => {
                              if (
                                item.heading === "Toys" &&
                                item.category === "2"
                              ) {
                                return (
                                  <li>
                                    <Link
                                      to={`/sub-categoriesProduct/${item.name}/${item.category}`}
                                    >
                                      {item.name}
                                    </Link>
                                  </li>
                                );
                              }
                              return null;
                            })
                          ) : (
                            <p className="emptyMSG">No Toys Sub Categories.</p>
                          )}
                        </ul>
                      </Col>
                      {/* </Row>
                      </Col>
                      <Col lg={6} className="p-0">
                        <Row> */}
                      <Col lg={2} sm={12} className="mga-he">
                      {/* <DocumentMeta {...CatTreatsmeta}> */}
                        <header>
                          <Link to={`/CatTreats/${`Treats`}/${2}`}>
                            Treats
                          </Link>
                        </header>
                        {/* </DocumentMeta> */}
                        <ul className="mega-links">
                          {dogsubcategories ? (
                            dogsubcategories.map((item) => {
                              if (
                                item.heading === "Treats" &&
                                item.category === "2"
                              ) {
                                return (
                                  <li key={item.id}>
                                    <Link
                                      to={`/sub-categoriesProduct/${item.name}/${item.category}`}
                                    >
                                      {item.name}
                                    </Link>
                                  </li>
                                );
                              }
                              return null;
                            })
                          ) : (
                            <p className="emptyMSG">
                              No Treats Sub Categories.
                            </p>
                          )}
                        </ul>
                      </Col>
                      <Col lg={2} sm={12} className="mga-he">
                      {/* <DocumentMeta {...CatShampooPerfumesmeta}> */}
                        <header>
                          <Link
                            to={`/CatShampooPerfumes/${`Shampoo & Perfumes`}/${2}`}
                          >
                            Shampoo & Perfumes
                          </Link>
                        </header>
                        {/* </DocumentMeta> */}
                        <ul className="mega-links">
                          {dogsubcategories ? (
                            dogsubcategories.map((item) => {
                              if (
                                item.heading === "Shampoo & Perfumes" &&
                                item.category === "2"
                              ) {
                                return (
                                  <li>
                                    <Link
                                      to={`/sub-categoriesProduct/${item.name}/${item.category}`}
                                    >
                                      {item.name}
                                    </Link>
                                  </li>
                                );
                              }
                              return null;
                            })
                          ) : (
                            <p className="emptyMSG">
                              No Shampoo & Perfumes Sub Categories.
                            </p>
                          )}
                        </ul>
                      </Col>
                      <Col lg={2} sm={12} className="mga-he">
                      {/* <DocumentMeta {...CatClothingAccessoriesmeta}> */}
                        <header>
                          <Link
                            to={`/ClothingAccessories/${`Clothing & Accessories`}/${2}`}
                          >
                            Clothing & Accessories
                          </Link>
                        </header>
                        {/* </DocumentMeta> */}
                        <ul className="mega-links">
                          {dogsubcategories ? (
                            dogsubcategories.map((item) => {
                              if (
                                item.heading === "Clothing & Accessories" &&
                                item.category === "2"
                              ) {
                                return (
                                  <li>
                                    <Link
                                      to={`/sub-categoriesProduct/${item.name}/${item.category}`}
                                    >
                                      {item.name}
                                    </Link>
                                  </li>
                                );
                              }
                              return null;
                            })
                          ) : (
                            <p className="emptyMSG">
                              No Clothing & Accessories Sub Categories.
                            </p>
                          )}
                        </ul>
                      </Col>
                      <Col lg={2} sm={12} className="mga-he">
                      {/* <DocumentMeta {...CatBowlsFeedersmeta}> */}
                        <header>
                          <Link
                            to={`/CatBowlsFeeders/${`Bowls & Feeders`}/${2}`}
                          >
                            Bowls & Feeders
                          </Link>
                        </header>
                        {/* </DocumentMeta> */}
                        <ul className="mega-links">
                          {dogsubcategories ? (
                            dogsubcategories.map((item) => {
                              if (
                                item.heading === "Bowls & Feeders" &&
                                item.category === "2"
                              ) {
                                return (
                                  <li>
                                    <Link
                                      to={`/sub-categoriesProduct/${item.name}/${item.category}`}
                                    >
                                      {item.name}
                                    </Link>
                                  </li>
                                );
                              }
                              return null;
                            })
                          ) : (
                            <p className="emptyMSG">
                              No Bowls & Feeders Sub Categories.
                            </p>
                          )}
                        </ul>
                      </Col>
                      <Col lg={2} sm={12} className="mga-he">
                      {/* <DocumentMeta {...CatGroomingmeta}> */}
                        <header>
                          <Link
                            to={`/CatGrooming/${`Grooming`}/${2}`}
                          >
                            Grooming
                          </Link>
                        </header>
                        {/* </DocumentMeta> */}
                        <ul className="mega-links">
                          {dogsubcategories ? (
                            dogsubcategories.map((item) => {
                              if (
                                item.heading === "Grooming" &&
                                item.category === "2"
                              ) {
                                return (
                                  <li>
                                    <Link
                                      to={`/sub-categoriesProduct/${item.name}/${item.category}`}
                                    >
                                      {item.name}
                                    </Link>
                                  </li>
                                );
                              }
                              return null;
                            })
                          ) : (
                            <p className="emptyMSG">
                              No Grooming Sub Categories.
                            </p>
                          )}
                        </ul>
                      </Col>
                      <Col lg={2} sm={12} className="mga-he">
                      {/* <DocumentMeta {...CatHealthCaremeta}> */}
                        <header>
                          <Link
                            to={`/CatHealthCare/${`Health Care`}/${2}`}
                          >
                            Health Care
                          </Link>
                        </header>
                        {/* </DocumentMeta> */}
                        <ul className="mega-links">
                          {dogsubcategories ? (
                            dogsubcategories.map((item) => {
                              if (
                                item.heading === "Health Care" &&
                                item.category === "2"
                              ) {
                                return (
                                  <li>
                                    <Link
                                      to={`/sub-categoriesProduct/${item.name}/${item.category}`}
                                    >
                                      {item.name}
                                    </Link>
                                  </li>
                                );
                              }
                              return null;
                            })
                          ) : (
                            <p className="emptyMSG">
                              No Health Care Sub Categories.
                            </p>
                          )}
                        </ul>
                      </Col>
                      <Col lg={3} sm={12} className="mga-he">
                      {/* <DocumentMeta {...CatBedsCagesScratcherCratesmeta}> */}
                        <header>
                          <Link
                            to={`/CatBedsCagesScratcherCrates/${`Beds Cages, Scratcher & Crates`}/${2}`}
                          >
                            Beds Cages, Scratcher & Crates
                          </Link>
                        </header>
                        {/* </DocumentMeta> */}
                        <ul className="mega-links">
                          {dogsubcategories ? (
                            dogsubcategories.map((item) => {
                              if (
                                item.heading ===
                                  "Beds Cages, Scratcher & Crates" &&
                                item.category === "2"
                              ) {
                                return (
                                  <li>
                                    <Link
                                      to={`/sub-categoriesProduct/${item.name}/${item.category}`}
                                    >
                                      {item.name}
                                    </Link>
                                  </li>
                                );
                              }
                              return null;
                            })
                          ) : (
                            <p className="emptyMSG">
                              No Beds Cages, Scratcher & Crates Sub Categories.
                            </p>
                          )}
                        </ul>
                      </Col>
                      {/* </Row>
                      </Col> */}
                    </Row>
                  </div>
                </div>
              </li>
              <li>
                <a className="desktop-item">
                  Products
                  <i class="fa fa-angle-down arrr" />
                </a>
                <input type="checkbox" id="showDrop" />
                <label htmlFor="showDrop" className="mobile-item">
                  Products
                  <i class="fa fa-angle-down arrr" />
                </label>
                <ul className="drop-menu">
                  <li>
                    <Link className="dropdown-item" to="/product">
                      All Product
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/canine-product">
                      Canine Product
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link to="/service">Services</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
              <li className="nonhide">
                <Link className="profiledes searneee">
                  <i className="fa fa-search" />
                  <input
                    type="text"
                    placeholder="What are you looking for"
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                    className="homesea"
                  />
                  <ul className="drop-menu search-results">
                    {/* {filteredProducts.map((product, index, id) => (
                      <li key={index}>
                        <Link to={`/product-details/${product.id}`}>
                          {product.name}
                        </Link>
                      </li>
                    ))} */}
                    {filteredProducts.map((product, index, id) => (
                      <li key={index}>
                        <Link to={`/product-details/${product.id}`}>
                          {product.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </Link>
              </li>

              <li className="nonhide">
                <Link to="/add-cart" className="profiledes notification-btn">
                  <i class="fa fa-shopping-cart" />{" "}
                  <span className="cart-count">
                    {customerLoginId === null
                      ? cart?.length
                      : dataLengthpetshop}
                  </span>{" "}
                </Link>
              </li>
              {storedUserId ? (
                <>
                  <li className="nonhide">
                    <a
                      className="profiledes notification-btn"
                      data-toggle="modal"
                      data-target="#exampleModal"
                      // onClick={handleBellClick}
                    >
                      <i class="fa fa-bell-o" />
                      {/* {isTotalLengthVisible && <span>{isNaN(totalLength) ? 0 : totalLength}</span>} */}
                      {/* {isTotalLengthVisible && (
                        <span>{isNaN(customCount) ? 0 : customCount}</span>
                      )} */}
                      <span>
                        {isNaN(notificationLength) ? 0 : notificationLength}
                      </span>
                    </a>
                  </li>
                  <li className="">
                    <Link
                      className=""
                      data-toggle="modal"
                      data-target="#logout-model"
                    >
                      Logout
                    </Link>
                  </li>

                  <li className="nonhide">
                    <a href="#" className="profiledes desktop-item p-0">
                      <img
                        src={
                          // profileData?.image
                          //   ? "http://caninedemo.caninetest.xyz/storage/app/public/profile/" +
                          //     profileData.image
                          //   : loicon1
                          profileData.image
                            ? `http://caninedemo.caninetest.xyz/storage/app/public/profile/${profileData.image}`
                            : loicon1
                        }
                        alt="Profile Image"
                      />
                    </a>
                    <input type="checkbox" id="showDropProfile" />
                    <label htmlFor="showDropProfile" className="mobile-item">
                      <img
                        src={
                          // profileData?.image
                          //   ? "http://caninedemo.caninetest.xyz/storage/app/public/profile/" +
                          //   profileData.image
                          //   : loicon1
                          profileData.image
                            ? `http://caninedemo.caninetest.xyz/storage/app/public/profile/${profileData.image}`
                            : loicon1
                        }
                        alt="Profile Image"
                      />
                    </label>
                    <ul className="drop-menu">
                      <li>
                        <Link className="dropdown-item" to="/update-profile">
                          Profile
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/all-veterinary">
                          All Veterinary
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item"
                          to="/transition-history"
                        >
                          Transaction History
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item"
                          to="/all-service-booking"
                        >
                          All Service Booking
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/my-orders">
                          My Orders
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/wishlist-products">
                          Wishlist Products
                        </Link>
                      </li>

                      <li>
                        <Link className="dropdown-item" to={`/my-pet-profile/`}>
                          Pet Profile
                        </Link>
                      </li>
                    </ul>
                  </li>
                </>
              ) : (
                <li className="">
                  <Link to="/login">Login/Sign Up</Link>
                </li>
              )}
            </ul>
            <label htmlFor="menu-btn" className="btn menu-btn">
              <i className="fas fa-bars" />
            </label>
          </div>
        </nav>
      </div>

      {/* Modal */}
      <div
        className="modal fade"
        id="logout-model"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-body logout-area">
              <h4>Confirm Logout</h4>
              <p>Are You Sure You Want To Logout</p>
              <button
                type="button"
                className="btn"
                data-dismiss="modal"
                onClick={logoutUser}
              >
                Yes
              </button>
              <button type="button" className="btn" data-dismiss="modal">
                No
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <div
        className="modal fade notification-area"
        id="exampleModal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <h5>Notification</h5>
              {/* Tabs Code By Sohel */}
              <div className="Notifi-tab-area">
                <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                  <li class="nav-item">
                    <a
                      class="nav-link active"
                      id="pills-home-tab"
                      data-toggle="pill"
                      href="#pills-home"
                      role="tab"
                      aria-controls="pills-home"
                      aria-selected="true"
                    >
                      All
                    </a>
                  </li>
                  <li class="nav-item">
                    <a
                      class="nav-link"
                      id="pills-profile-tab"
                      data-toggle="pill"
                      href="#pills-profile"
                      role="tab"
                      aria-controls="pills-profile"
                      aria-selected="false"
                    >
                      <span>
                        <BiSolidOffer />
                      </span>
                      Offers
                    </a>
                  </li>
                  <li class="nav-item">
                    <a
                      class="nav-link"
                      id="pills-contact-tab"
                      data-toggle="pill"
                      href="#pills-contact"
                      role="tab"
                      aria-controls="pills-contact"
                      aria-selected="false"
                    >
                      <span>
                        <i class="fa fa-gift" aria-hidden="true"></i>
                      </span>
                      Order info
                    </a>
                  </li>
                </ul>
                <div class="tab-content" id="pills-tabContent">
                  <div
                    class="tab-pane fade show active"
                    id="pills-home"
                    role="tabpanel"
                    aria-labelledby="pills-home-tab"
                  >
                    <div>
                      {notify && notify.length > 0 ? (
                        notify.map((ob, index) => (
                          <div className="notification" key={index}>
                            <Row>
                              <Col lg={2}>
                                <h6>{ob.item_id}</h6>
                              </Col>
                              <Col lg={8}>
                                <h6>{ob.stock}</h6>
                                <p>{ob.variation}</p>
                              </Col>
                            </Row>
                          </div>
                        ))
                      ) : (
                        <p className="emptyMSG">No Notification</p>
                      )}
                      {dataZero && dataZero.length > 0 ? (
                        dataZero.map((ob, index) => (
                          <div
                            className={`notification ${
                              ob.status === "unread" ? "unread" : "read"
                            }`}
                            key={index}
                          >
                            <Row>
                              <Col lg={2} className="align-self-center">
                                <Link
                                  to={`/my-orders`}
                                  onClick={() => Modaloff()}
                                >
                                  <i className="fa fa-info-circle" />
                                </Link>
                              </Col>
                              <Col lg={8}>
                                <Link
                                  to={`/my-orders`}
                                  onClick={() => {
                                    handleLinkClick(ob.id), Modaloff();
                                  }}
                                >
                                  <h6
                                    className={
                                      ob.status === "unread" ? "unread" : "read"
                                    }
                                  >
                                    Order ID : {ob.order_id}
                                  </h6>
                                  <p
                                    className={
                                      ob.status === "unread" ? "unread" : "read"
                                    }
                                  >
                                    Status : {ob.order_status}
                                  </p>
                                </Link>
                              </Col>
                              <Col lg={2}>
                                <a onClick={() => DeleteNotification(ob.id)}>
                                  {" "}
                                  <i
                                    class="fa fa-trash-o"
                                    aria-hidden="true"
                                  ></i>
                                </a>
                              </Col>
                            </Row>
                          </div>
                        ))
                      ) : (
                        <p className="emptyMSG">No Data Zero</p>
                      )}
                      {allnotification && allnotification.length > 0 ? (
                        allnotification.map((ob, index) => (
                          <div className="notification" key={index}>
                            <Row>
                              <Col lg={2}>
                                <img
                                  src={`http://caninedemo.caninetest.xyz/storage/app/public/notification/${ob.image}`}
                                />
                                {console.log("emage", ob.image)}
                              </Col>
                              <Col lg={8}>
                                <h6>{ob.title}</h6>
                                <p>{ob.description}</p>
                              </Col>
                            </Row>
                          </div>
                        ))
                      ) : (
                        <p className="emptyMSG">No Data Zero</p>
                      )}
                    </div>
                  </div>
                  <div
                    class="tab-pane fade"
                    id="pills-profile"
                    role="tabpanel"
                    aria-labelledby="pills-profile-tab"
                  >
                    {allnotification && allnotification.length > 0 ? (
                      allnotification.map((ob, index) => (
                        <div className="notification" key={index}>
                          <Row>
                            <Col lg={2}>
                              <img
                                src={`http://caninedemo.caninetest.xyz/storage/app/public/notification/${ob.image}`}
                              />
                              {console.log("emage", ob.image)}
                            </Col>
                            <Col lg={8}>
                              <h6>{ob.title}</h6>
                              <p>{ob.description}</p>
                            </Col>
                          </Row>
                        </div>
                      ))
                    ) : (
                      <p className="emptyMSG">No Data Zero</p>
                    )}
                  </div>
                  <div
                    class="tab-pane fade"
                    id="pills-contact"
                    role="tabpanel"
                    aria-labelledby="pills-contact-tab"
                  >
                    <div>
                      {notify && notify.length > 0 ? (
                        notify.map((ob, index) => (
                          <div className="notification" key={index}>
                            <Link
                              to={`/product-details/${ob.item_id}`}
                              onClick={() => Modaloff()}
                            >
                              <Row>
                                <Col
                                  lg={2}
                                  className="align-self-center text-center"
                                >
                                  <i className="fa fa-info-circle" />
                                </Col>
                                <Col lg={8}>
                                  <h6>Item ID : {ob.item_id}</h6>
                                  <p>Stock : {ob.stock}</p>
                                  <p>Variation : {ob.variation}</p>
                                  <p>Status : {ob.order_status}</p>
                                </Col>
                              </Row>
                            </Link>
                          </div>
                        ))
                      ) : (
                        <p className="emptyMSG">No Notification</p>
                      )}
                      {dataZero && dataZero.length > 0 ? (
                        dataZero.map((ob, index) => (
                          <div className="notification" key={index}>
                            <Link to={`/my-orders`} onClick={() => Modaloff()}>
                              <Row>
                                <Col
                                  lg={2}
                                  className="align-self-center text-center"
                                >
                                  <i className="fa fa-info-circle" />
                                </Col>
                                <Col lg={10}>
                                  <h6>Order ID : {ob.order_id}</h6>
                                  <p>Status : {ob.order_status}</p>
                                </Col>
                              </Row>
                            </Link>
                          </div>
                        ))
                      ) : (
                        <p className="emptyMSG">No Data Zero</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-end">
                <button type="button" className="btn" data-dismiss="modal">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Newheader;
