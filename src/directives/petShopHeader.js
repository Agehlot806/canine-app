import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";
import pro from "../assets/images/icon/pro.png";
import { BASE_URL } from "../Constant/Index";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import "../assets/css/style.css";
import { useCartContext } from "../component/context/addToCartContext";
import { useNotificationContext } from "../component/context/notificationContext";
import loicon1 from "../assets/images/img/loicon1.png";
import { Col, Row } from "react-bootstrap";
import { BiSolidOffer } from "react-icons/bi";
import "../assets/css/menus.css";
import { useCartWithoutLogin } from "../component/context/AddToCardWithoutLogin";

function Petshopheader(props) {
  const navigate = useNavigate();
  const [notification, setNotification] = useState([]);
  const [allproduct, setAllProduct] = useState([]);
  const [dogsubcategories, setdogsubcategories] = useState("");
  const [storedWholesellerId, setStoredWholesellerId] = useState(null);
  console.log("storedWholesellerId", storedWholesellerId);
  const [categories, setcategories] = useState([]);
  const { cartData, dataLengthpetshop, addToCartData } = useCartContext();
  const [loginTypee, setLoginTypee] = useState("");
  const loginType = localStorage.getItem("loginType");
  const { notificationLength, dataLengthpetnotification } =
    useNotificationContext();

  useEffect(() => {
    // fetchBrands();
    allProductdata();
    AllDogsubcategories();
    categoriesProduct();
    addToCartData();
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
    const storedWholesellerId = Number(
      localStorage.getItem(
        loginType === "salesman" ? "salesmanId" : "UserWholesellerId"
      )
    );
    if (storedWholesellerId) {
      try {
        localStorage.removeItem("userInfo");
        localStorage.removeItem("salesmanId");
        localStorage.removeItem("salesmanPhone");
        localStorage.removeItem("UserWholesellerId");
        localStorage.removeItem("wholeSellerId");
        localStorage.removeItem("wallet_balance");
        localStorage.removeItem("wishlist_undefined");
        localStorage.removeItem("WholesellerEmail");
        localStorage.removeItem("WholesellerPassword");
        localStorage.removeItem("verifiedId");
        localStorage.removeItem("loginType");
        // localStorage.clear('')
        console.log("Logged out Wholeseller with ID: ", storedWholesellerId);
        setStoredWholesellerId(null); // Reset the storedWholesellerId state
        toast.success("Your user ID logout has been successful.");
        navigate(
          loginType === "salesman" ? "/salesman-login" : "/petshop-login",
          { replace: true }
        );
      } catch (error) {
        console.error("Error parsing stored user ID: ", error);
      }
    } else {
      console.log("No user ID found in localStorage.");
    }
  };

  const [profileData, setProfileData] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState({ image: "" } || null);
  console.log("===========>>>>>> ", profileData);
  useEffect(() => {
    const storedWholesellerId = localStorage.getItem("UserWholesellerId");
    // Fetch profile data from the API
    axios
      .get(`${BASE_URL}/auth/my_profile/${storedWholesellerId}`)
      .then((response) => {
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

  const [salesmanProfile, setSalesmanProfile] = useState([]);
  const [salesmanUrl, setSalesmanUrl] = useState({ image: "" } || null);
  const salesmanId = localStorage.getItem("salesmanId");
  useEffect(() => {
    axios
      .get(`${BASE_URL}/auth/delivery-man/deliveryman_profile/${salesmanId}`)
      .then((response) => {
        if (response.data.status === "200" && response.data.data.length > 0) {
          const profile = response.data.data[0];
          setSalesmanProfile(profile);
          if (profile.image) {
            setSalesmanUrl({ image: profile.image });
          }
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    const storedWholesellerId = Number(
      localStorage.getItem(
        loginType === "salesman" ? "salesmanId" : "UserWholesellerId"
      )
    );
    setStoredWholesellerId(storedWholesellerId);
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

  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [notify, setNotify] = useState([]);
  const [dataZero, setDataZero] = useState([]);
  const [allnotification, setAllnotification] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    Notifynotification();
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
      .get(`${BASE_URL}/items/notify_list/${storedWholesellerId}`)
      .then((response) => {
        // setNotify(response.data.data);
        setDataZero(response.data.notification);
        console.log("Notify-Notificationnnnnnnnnnnnn", response.data.data);
        console.log("Data Zero", response.data.notification);
        setAllnotification(response.data.all_notification);
        console.log("allenSolly", response.data.all_notification);
      })
      .catch((error) => {
        console.log("EEEEEEEEEErrrrorrrrrrr", error);
      });
  };

  const DeleteNotification = (id) => {
    axios
      .delete(`${BASE_URL}/items/notify_delete/${id}`)
      .then((response) => {
        if (response.status === 200 || response.status === 204) {
          toast.success("Notification deleted successfully");
          setDataZero((prevData) => prevData.filter((item) => item.id !== id));
        } else {
          console.error("Unexpected response status:", response.status);
        }
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

  const DeleteNotificationone = (id) => {
    axios
      .delete(`${BASE_URL}/items/notify_delete/${id}`)
      .then((response) => {
        if (response.status === 200 || response.status === 204) {
          toast.success("Notification deleted successfully");
          setDataZero((prevDataZero) => {
            const updatedDataZero = prevDataZero.filter((ob) => ob.id !== id);
            return updatedDataZero;
          });
        } else {
          console.error("Unexpected response status:", response.status);
        }
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
  const { totalLength } = useNotificationContext();
  // const { notificationLength, dataLengthpetnotification} =
  //   useNotificationContext();
  const [isTotalLengthVisible, setTotalLengthVisible] = useState(true);
  // ...
  // useEffect(() => {
  // Check if the visibility state is stored in localStorage
  //   const storedVisibility = localStorage.getItem("totalLengthVisibility");
  //   if (storedVisibility) {
  //     setTotalLengthVisible(JSON.parse(storedVisibility));
  //   }
  // }, []);
  // The click handler for the bell icon
  // const handleBellClick = () => {
  //   setTotalLengthVisible(false);
  // Store the visibility state in localStorage
  // localStorage.setItem("totalLengthVisibility", JSON.stringify(false));
  // Set a timeout to make the span visible again after 30 minutes (30 minutes = 30 * 60 * 1000 milliseconds)
  //   setTimeout(() => {
  //     setTotalLengthVisible(true);
  //     localStorage.setItem("totalLengthVisibility", JSON.stringify(true));
  //   }, 30 * 60 * 1000);
  // };
  // const [customCount, setCustomCount] = useState(0);
  // console.log("lllll", customCount);
  // const prevTotalLength = useRef(totalLength);

  // const handleBellClick = () => {
  //   setCustomCount(0);
  //   localStorage.setItem("customCount", 0);
  //   setTotalLengthVisible(false);
  // };

  // useEffect(() => {
  //   const storedVisibility = localStorage.getItem("totalLengthVisibility");
  //   if (storedVisibility) {
  //     setTotalLengthVisible(JSON.parse(storedVisibility));
  //   }
  // }, []);

  // useEffect(() => {
  //   if (prevTotalLength.current < totalLength) {
  //     setTotalLengthVisible(true);
  //     setCustomCount(totalLength);
  //     localStorage.setItem("customCount", totalLength.toString());
  //   }
  //   prevTotalLength.current = totalLength;
  // }, [totalLength]);

  return (
    <>
      <div className="sticky-newheader">
        <nav className="navbar navbar-expand-lg navbar-light newnavv">
          <div className="wrapper container wrappertwo">
            <div className="logo">
              <Link
                // to={
                //   loginType == "salesman"
                //     ? "/salesman-dashboad"
                //     : "/petshop-home"
                // }
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
                    {filteredProducts.map((product, index, id) => (
                      <li key={index}>
                        <Link to={`/petshop-productDetails/${product.id}`}>
                          {product.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </Link>
              </li>
              <li>
                <Link
                  to="/petShop-add-cart"
                  className="profiledes notification-btn"
                >
                  <i class="fa fa-shopping-cart" />{" "}
                  <span className="cart-countpetshop">{dataLengthpetshop}</span>{" "}
                </Link>
              </li>
            </div>
            <input type="radio" name="slider" id="menu-btn" />
            <input type="radio" name="slider" id="close-btn" />
            <ul className="nav-links wrappertwo">
              <label htmlFor="close-btn" className="btn close-btn">
                <i className="fas fa-times" />
              </label>
              <div className="web-icon">
                <li className="webhide">
                  <a href="#" className="profiledes desktop-item">
                    <img
                      src={
                        profileData?.image
                          ? "https://canine.hirectjob.in/storage/app/public/profile/" +
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
                          ? "https://canine.hirectjob.in/storage/app/public/profile/" +
                            profileData.image
                          : loicon1
                      }
                      alt="Profile Image"
                    />
                  </label>
                  <ul className="drop-menu">
                    <li>
                      <Link className="dropdown-item" to={`/pet-profile/`}>
                        Pet Profile
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/all-veterinary">
                        All Veterinary
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/all-service-booking">
                        All Service Booking
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/petshop-my-orders">
                        My Orders
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/wishlist-products">
                        Wishlist Products
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/update-profile">
                        Profile
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
                    )} */}
                    <span>
                      {isNaN(notificationLength) ? 0 : notificationLength}
                    </span>
                  </a>
                </li>
              </div>
              {/* <li>
                <a href="#" className="desktop-item">
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
                      <Col lg={4} sm={6}>
                        <header>Dog Food</header>
                        <ul className="mega-links">
                          {dogsubcategories ? (
                            dogsubcategories.map(
                              (item) =>
                                item.heading == "Food" && (
                                  <li key={item.id}>
                                    <Link
                                      to={`/petShop-subcategoriesProduct/${item.name}`}
                                    >
                                      {item.name}
                                    </Link>
                                  </li>
                                )
                            )
                          ) : (
                            <p className="emptyMSG">
                              No Dog Food Sub Categories.
                            </p>
                          )}
                        </ul>
                      </Col>
                      <Col lg={4} sm={6}>
                        <header>Treats & Chews</header>
                        <ul className="mega-links">
                          {dogsubcategories ? (
                            dogsubcategories.map(
                              (item) =>
                                item.heading == "Treats" && (
                                  <li>
                                    <Link
                                      to={`/petShop-subcategoriesProduct/${item.name}`}
                                    >
                                      {item.name}
                                    </Link>
                                  </li>
                                )
                            )
                          ) : (
                            <p className="emptyMSG">
                              No Treats Sub Categories.
                            </p>
                          )}
                        </ul>
                      </Col>
                      <Col lg={4} sm={6}>
                        <header>Toys</header>
                        <ul className="mega-links">
                          {dogsubcategories ? (
                            dogsubcategories.map(
                              (item) =>
                                item.heading == "Toys" && (
                                  <li>
                                    <Link
                                      to={`/petShop-subcategoriesProduct/${item.name}`}
                                    >
                                      {item.name}
                                    </Link>
                                  </li>
                                )
                            )
                          ) : (
                            <p className="emptyMSG">
                              No Supplies Sub Categories.
                            </p>
                          )}
                        </ul>
                      </Col>
                      <Col lg={4} sm={6}>
                        <header>Collar Leashes & More</header>
                        <ul className="mega-links">
                          {dogsubcategories ? (
                            dogsubcategories.map(
                              (item) =>
                                item.heading == "Collar Leashes & More" && (
                                  <li>
                                    <Link
                                      to={`/petShop-subcategoriesProduct/${item.name}`}
                                    >
                                      {item.name}
                                    </Link>
                                  </li>
                                )
                            )
                          ) : (
                            <p className="emptyMSG">
                              No Health Care Sub Categories.
                            </p>
                          )}
                        </ul>
                      </Col>
                      <Col lg={4} sm={6}>
                        <header>Shampoo & Perfumes</header>
                        <ul className="mega-links">
                          {dogsubcategories ? (
                            dogsubcategories.map(
                              (item) =>
                                item.heading == "Shampoo & Perfumes" && (
                                  <li>
                                    <Link
                                      to={`/petShop-subcategoriesProduct/${item.name}`}
                                    >
                                      {item.name}
                                    </Link>
                                  </li>
                                )
                            )
                          ) : (
                            <p className="emptyMSG">
                              No Health Care Sub Categories.
                            </p>
                          )}
                        </ul>
                      </Col>
                      <Col lg={4} sm={6}>
                        <header>Beds Cages & Carriers</header>
                        <ul className="mega-links">
                          {dogsubcategories ? (
                            dogsubcategories.map(
                              (item) =>
                                item.heading == "Beds Cages, Scratcher & Crates" && (
                                  <li>
                                    <Link
                                      to={`/petShop-subcategoriesProduct/${item.name}`}
                                    >
                                      {item.name}
                                    </Link>
                                  </li>
                                )
                            )
                          ) : (
                            <p className="emptyMSG">
                              No Health Care Sub Categories.
                            </p>
                          )}
                        </ul>
                      </Col>
                      <Col lg={4} sm={6}>
                        <header>Training & Accessories</header>
                        <ul className="mega-links">
                          {dogsubcategories ? (
                            dogsubcategories.map(
                              (item) =>
                                item.heading == "Training & Accessories" && (
                                  <li>
                                    <Link
                                      to={`/petShop-subcategoriesProduct/${item.name}`}
                                    >
                                      {item.name}
                                    </Link>
                                  </li>
                                )
                            )
                          ) : (
                            <p className="emptyMSG">
                              No Accessories Sub Categories.
                            </p>
                          )}
                        </ul>
                      </Col>
                      <Col lg={4} sm={6}>
                        <header>Bowls & Feeders</header>
                        <ul className="mega-links">
                          {dogsubcategories ? (
                            dogsubcategories.map(
                              (item) =>
                                item.heading == "Bowls & Feeders" && (
                                  <li>
                                    <Link
                                      to={`/petShop-subcategoriesProduct/${item.name}`}
                                    >
                                      {item.name}
                                    </Link>
                                  </li>
                                )
                            )
                          ) : (
                            <p className="emptyMSG">
                              No Health Care Sub Categories.
                            </p>
                          )}
                        </ul>
                      </Col>
                      <Col lg={4} sm={6}>
                        <header>Grooming</header>
                        <ul className="mega-links">
                          {dogsubcategories ? (
                            dogsubcategories.map(
                              (item) =>
                                item.heading == "Grooming" && (
                                  <li>
                                    <Link
                                      to={`/petShop-subcategoriesProduct/${item.name}`}
                                    >
                                      {item.name}
                                    </Link>
                                  </li>
                                )
                            )
                          ) : (
                            <p className="emptyMSG">
                              No Health Care Sub Categories.
                            </p>
                          )}
                        </ul>
                      </Col>
                      <Col lg={4} sm={6}>
                        <header>Health Care</header>
                        <ul className="mega-links">
                          {dogsubcategories ? (
                            dogsubcategories.map(
                              (item) =>
                                item.heading == "Health Care" && (
                                  <li>
                                    <Link
                                      to={`/petShop-subcategoriesProduct/${item.name}`}
                                    >
                                      {item.name}
                                    </Link>
                                  </li>
                                )
                            )
                          ) : (
                            <p className="emptyMSG">
                              No Health Care Sub Categories.
                            </p>
                          )}
                        </ul>
                      </Col>
                    </Row>
                  </div>
                </div>
              </li>
              <li>
                <a href="#" className="desktop-item">
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
                      <Col lg={4} sm={6}>
                        <header>Cat Food</header>
                        <ul className="mega-links">
                          {dogsubcategories ? (
                            dogsubcategories.map(
                              (item) =>
                                item.heading == "Food" && (
                                  <li key={item.id}>
                                    <Link
                                      to={`/petShop-subcategoriesProduct/${item.name}`}
                                    >
                                      {item.name}
                                    </Link>
                                  </li>
                                )
                            )
                          ) : (
                            <p className="emptyMSG">
                              No Dog Food Sub Categories.
                            </p>
                          )}
                        </ul>
                      </Col>
                      <Col lg={4} sm={6}>
                        <header>Treats</header>
                        <ul className="mega-links">
                          {dogsubcategories ? (
                            dogsubcategories.map(
                              (item) =>
                                item.heading == "Treats" && (
                                  <li key={item.id}>
                                    <Link
                                      to={`/petShop-subcategoriesProduct/${item.name}`}
                                    >
                                      {item.name}
                                    </Link>
                                  </li>
                                )
                            )
                          ) : (
                            <p className="emptyMSG">
                              No Dog Food Sub Categories.
                            </p>
                          )}
                        </ul>
                      </Col>
                     
                      <Col lg={4} sm={6}>
                        <header>Toys</header>
                        <ul className="mega-links">
                          {dogsubcategories ? (
                            dogsubcategories.map(
                              (item) =>
                                item.heading == "Toys" && (
                                  <li>
                                    <Link
                                      to={`/petShop-subcategoriesProduct/${item.name}`}
                                    >
                                      {item.name}
                                    </Link>
                                  </li>
                                )
                            )
                          ) : (
                            <p className="emptyMSG">
                              No Supplies Sub Categories.
                            </p>
                          )}
                        </ul>
                      </Col>
                      <Col lg={4} sm={6}>
                        <header>Collar Leashes & More</header>
                        <ul className="mega-links">
                          {dogsubcategories ? (
                            dogsubcategories.map(
                              (item) =>
                                item.heading == "Collar Leashes & More" && (
                                  <li>
                                    <Link
                                      to={`/petShop-subcategoriesProduct/${item.name}`}
                                    >
                                      {item.name}
                                    </Link>
                                  </li>
                                )
                            )
                          ) : (
                            <p className="emptyMSG">
                              No Supplies Sub Categories.
                            </p>
                          )}
                        </ul>
                      </Col>
                      <Col lg={4} sm={6}>
                        <header>Shampoo & Perfumes</header>
                        <ul className="mega-links">
                          {dogsubcategories ? (
                            dogsubcategories.map(
                              (item) =>
                                item.heading == "Shampoo & Perfumes" && (
                                  <li>
                                    <Link
                                      to={`/petShop-subcategoriesProduct/${item.name}`}
                                    >
                                      {item.name}
                                    </Link>
                                  </li>
                                )
                            )
                          ) : (
                            <p className="emptyMSG">
                              No Supplies Sub Categories.
                            </p>
                          )}
                        </ul>
                      </Col>
                      <Col lg={4} sm={6}>
                        <header>Beds Cages, Scratcher & Crates</header>
                        <ul className="mega-links">
                          {dogsubcategories ? (
                            dogsubcategories.map(
                              (item) =>
                                item.heading ==
                                  "Beds Cages, Scratcher & Crates" && (
                                  <li>
                                    <Link
                                      to={`/petShop-subcategoriesProduct/${item.name}`}
                                    >
                                      {item.name}
                                    </Link>
                                  </li>
                                )
                            )
                          ) : (
                            <p className="emptyMSG">
                              No Supplies Sub Categories.
                            </p>
                          )}
                        </ul>
                      </Col>
                      <Col lg={4} sm={6}>
                        <header>Clothing & Accessories</header>
                        <ul className="mega-links">
                          {dogsubcategories ? (
                            dogsubcategories.map(
                              (item) =>
                                item.heading == "Clothing & Accessories" && (
                                  <li>
                                    <Link
                                      to={`/petShop-subcategoriesProduct/${item.name}`}
                                    >
                                      {item.name}
                                    </Link>
                                  </li>
                                )
                            )
                          ) : (
                            <p className="emptyMSG">
                              No Accessories Sub Categories.
                            </p>
                          )}
                        </ul>
                      </Col>
                      <Col lg={4} sm={6}>
                        <header>Bowls & Feeders</header>
                        <ul className="mega-links">
                          {dogsubcategories ? (
                            dogsubcategories.map(
                              (item) =>
                                item.heading == "Bowls & Feeders" && (
                                  <li>
                                    <Link
                                      to={`/petShop-subcategoriesProduct/${item.name}`}
                                    >
                                      {item.name}
                                    </Link>
                                  </li>
                                )
                            )
                          ) : (
                            <p className="emptyMSG">
                              No Accessories Sub Categories.
                            </p>
                          )}
                        </ul>
                      </Col>
                      <Col lg={4} sm={6}>
                        <header>Grooming</header>
                        <ul className="mega-links">
                          {dogsubcategories ? (
                            dogsubcategories.map(
                              (item) =>
                                item.heading == "Grooming" && (
                                  <li>
                                    <Link
                                      to={`/petShop-subcategoriesProduct/${item.name}`}
                                    >
                                      {item.name}
                                    </Link>
                                  </li>
                                )
                            )
                          ) : (
                            <p className="emptyMSG">
                              No Accessories Sub Categories.
                            </p>
                          )}
                        </ul>
                      </Col>
                      <Col lg={4} sm={6}>
                        <header>Cat Litter & Scooper</header>
                        <ul className="mega-links">
                          {dogsubcategories ? (
                            dogsubcategories.map(
                              (item) =>
                                item.heading == "Cat Litter & Scooper" && (
                                  <li>
                                    <Link
                                      to={`/petShop-subcategoriesProduct/${item.name}`}
                                    >
                                      {item.name}
                                    </Link>
                                  </li>
                                )
                            )
                          ) : (
                            <p className="emptyMSG">
                              No Accessories Sub Categories.
                            </p>
                          )}
                        </ul>
                      </Col>
                      <Col lg={4} sm={6}>
                        <header>Health Care</header>
                        <ul className="mega-links">
                          {dogsubcategories ? (
                            dogsubcategories.map(
                              (item) =>
                                item.heading == "Health Care" && (
                                  <li>
                                    <Link
                                      to={`/petShop-subcategoriesProduct/${item.name}`}
                                    >
                                      {item.name}
                                    </Link>
                                  </li>
                                )
                            )
                          ) : (
                            <p className="emptyMSG">
                              No Health Care Sub Categories.
                            </p>
                          )}
                        </ul>
                      </Col>
                    </Row>
                  </div>
                </div>
              </li>
              <li>
                <a href="#" className="desktop-item">
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
                    <Link className="dropdown-item" to="/petshop-product">
                      All Product
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/petshop-canine-product">
                      Canine Product
                    </Link>
                  </li>
                </ul>
              </li> */}
              <li>
                <Link to="/petshop-contact">Contact</Link>
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
                    {filteredProducts.map((product, index, id) => (
                      <li key={index}>
                        <Link to={`/petshop-productDetails/${product.id}`}>
                          {product.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </Link>
              </li>

              <li className="nonhide">
                <Link
                  to="/petShop-add-cart"
                  className="profiledes notification-btn"
                >
                  <i class="fa fa-shopping-cart" />{" "}
                  <span className="cart-countpetshop">{dataLengthpetshop}</span>{" "}
                </Link>
              </li>
              {storedWholesellerId ? (
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
                    <Link
                      to={loginType == "salesman" ? "/salesman-dashboad" : ""}
                      className="profiledes desktop-item"
                    >
                      <img
                        src={
                          loginType == "salesman"
                            ? salesmanProfile?.image
                              ? "https://canine.hirectjob.in/storage/app/public/delivery-man/" +
                                salesmanProfile?.image
                              : loicon1
                            : profileData?.image
                            ? "https://canine.hirectjob.in/storage/app/public/profile/" +
                              profileData?.image
                            : loicon1
                        }
                      />
                    </Link>
                    <input type="checkbox" id="showDropProfile" />
                    <label htmlFor="showDropProfile" className="mobile-item">
                      <img
                        src={
                          loginType == "salesman"
                            ? salesmanProfile?.image
                              ? "https://canine.hirectjob.in/storage/app/public/delivery-man/" +
                                salesmanProfile?.image
                              : loicon1
                            : profileData?.image
                            ? "https://canine.hirectjob.in/storage/app/public/profile/" +
                              profileData?.image
                            : loicon1
                        }
                      />
                    </label>
                    <ul className="drop-menu">
                      <li>
                        <Link
                          className="dropdown-item"
                          to={
                            loginType === "salesman"
                              ? "/salesman-dashboad/"
                              : "/petshop-dashboard"
                          }
                        >
                          Dashboard
                        </Link>
                      </li>
                      {loginType !== "salesman" && (
                        <>
                          <li>
                            <Link
                              className="dropdown-item"
                              to={
                                loginType === "salesman"
                                  ? "/salesman-dashboad/"
                                  : "/petshop-transition-history"
                              }
                            >
                              Transitions History
                            </Link>
                          </li>
                          <li>
                            <Link
                              className="dropdown-item"
                              to={
                                loginType === "salesman"
                                  ? "/salesman-dashboad/"
                                  : "/petshop-my-orders"
                              }
                            >
                              My Orders
                            </Link>
                          </li>
                        </>
                      )}
                      <li>
                        <Link
                          className="dropdown-item"
                          to={
                            loginType === "salesman"
                              ? "/salesman-dashboad/"
                              : "/petshop-wishlist-product"
                          }
                        >
                          Wishlist Products
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item"
                          to={
                            loginType == "salesman"
                              ? "/petshop-update-profile"
                              : "/petshop-update-profile"
                          }
                        >
                          Profile
                        </Link>
                      </li>
                    </ul>
                  </li>
                </>
              ) : (
                <li className="">
                  <Link
                    to={
                      loginType === "salesman"
                        ? "/salesman-login"
                        : "/petshop-login"
                    }
                  >
                    Login/Sign Up
                  </Link>
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
                                  to={`/petshop-my-orders`}
                                  onClick={() => Modaloff()}
                                >
                                  <i className="fa fa-info-circle" />
                                </Link>
                              </Col>
                              <Col lg={8}>
                                <Link
                                  to={`/petshop-my-orders`}
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
                                  src={`https://canine.hirectjob.in/storage/app/public/notification/${ob.image}`}
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
                                src={`https://canine.hirectjob.in/storage/app/public/notification/${ob.image}`}
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
                              to={`/petshop-productDetails/${ob.item_id}`}
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
                            <Link
                              to={`/petshop-my-orders`}
                              onClick={() => Modaloff()}
                            >
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
    </>
  );
}

export default Petshopheader;
