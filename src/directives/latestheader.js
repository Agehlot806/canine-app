import React, { useEffect, useState } from "react";
import { Link, Navigate, history } from "react-router-dom";
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

function Latestheader(props) {
  // const { dataLength } = props;
  const [notification, setNotification] = useState([]);
  const [allproduct, setAllProduct] = useState([]);
  const [dogsubcategories, setdogsubcategories] = useState("");
  const [storedUserId, setStoredUserId] = useState(null);
  const [notify, setNotify] = useState([]);
  const [dataZero, setDataZero] = useState([]);
  console.log("dataZero", dataZero);
  const [categories, setcategories] = useState([]);
  const salesmanId = localStorage.getItem("salesmanId");
  const { cartData, dataLength, addToCartData } = useCartContext();
  const { totalLength } = useNotificationContext();
  const { notificationLength, dataLengthpetnotification } =
    useNotificationContext();

  const [isTotalLengthVisible, setTotalLengthVisible] = useState(true);
  // ...
  useEffect(() => {
    // Check if the visibility state is stored in localStorage
    const storedVisibility = localStorage.getItem("totalLengthVisibility");
    if (storedVisibility) {
      setTotalLengthVisible(JSON.parse(storedVisibility));
    }
  }, []);
  // The click handler for the bell icon
  const handleBellClick = () => {
    setTotalLengthVisible(false);
    // Store the visibility state in localStorage
    localStorage.setItem("totalLengthVisibility", JSON.stringify(false));
    // Set a timeout to make the span visible again after 30 minutes (30 minutes = 30 * 60 * 1000 milliseconds)
    setTimeout(() => {
      setTotalLengthVisible(true);
      localStorage.setItem("totalLengthVisibility", JSON.stringify(true));
    }, 30 * 60 * 1000);
  };

  useEffect(() => {
    // fetchBrands();
    allProductdata();
    AllDogsubcategories();
    categoriesProduct();
    addToCartData();
    fetchNotifications();
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
        localStorage.removeItem("userInfo");
        localStorage.removeItem("loginType");
        localStorage.removeItem("phone");
        localStorage.removeItem("otp");
        console.log("Logged out user with ID: ", customer_id);
        setStoredUserId(null); // Reset the storedUserId state
        toast.success("Your user ID logout has been successful.");
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
      .get(`https://canine.hirectjob.in/api/v1/auth/my_profile/${customer_id}`)
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
        "https://canine.hirectjob.in/api/v1/items/latest"
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
        setDataZero(response.data.notification);
        console.log("Notify-Notificationnnnnnnnnnnnn", response.data.data);
        console.log("Data Zero", response.data.notification);
      })
      .catch((error) => {
        console.log("EEEEEEEEEErrrrorrrrrrr", error);
      });
  };
  console.log("------------->id", dataZero);

  const DeleteNotification = (id) => {
    axios
      .delete(`${BASE_URL}/items/notify_delete/${id}`)
      .then((response) => {
        if (response.status === 200 || response.status === 204) {
          toast.success("Notification deleted successfully");
          setNotify((prevNotify) => {
            const updatedNotify = prevNotify.filter((ob) => ob.id !== id);
            return updatedNotify;
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
      <nav>
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
              <a
                className="notification-btn"
                data-toggle="modal"
                data-target="#exampleModal"
                onClick={handleBellClick}
              >
                <i class="fa fa-bell-o" />
                {isTotalLengthVisible && <span>{totalLength}</span>}
              </a>
            </li>

            {storedUserId ? (
              <>
                <li>
                  <Link
                    className=""
                    data-toggle="modal"
                    data-target="#logout-model"
                  >
                    Logout
                  </Link>
                </li>
                <li>
                  <Link to="/add-cart" className="notification-btn">
                    <i class="fa fa-shopping-cart" />{" "}
                    <span className="cart-count">{dataLength}</span>{" "}
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <Link to="/login">Sign In</Link>
              </li>
            )}
          </div>
          <input type="radio" name="slider" id="menu-btn" />
          <input type="radio" name="slider" id="close-btn" />
          <ul className="nav-links">
            <label htmlFor="close-btn" className="btn close-btn">
              <i className="fas fa-times" />
            </label>
            <li>
              <a href="#" className="desktop-item">
                Dogs
              </a>
              <input type="checkbox" id="showMega" />
              <label htmlFor="showMega" className="mobile-item">
                Dogs
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
                              item.name == "food" && (
                                <li key={item.id}>
                                  <Link
                                    to={`/pet-category/${item.name}/${item.id}`}
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
                              item.name == "treats" && (
                                <li>
                                  <Link
                                    to={`/pet-category/${item.name}/${item.id}`}
                                  >
                                    {item.name}
                                  </Link>
                                </li>
                              )
                          )
                        ) : (
                          <p className="emptyMSG">No Treats Sub Categories.</p>
                        )}
                      </ul>
                    </Col>
                    <Col lg={4} sm={6}>
                      <header>Toys</header>
                      <ul className="mega-links">
                        {dogsubcategories ? (
                          dogsubcategories.map(
                            (item) =>
                              item.name == "toys" && (
                                <li>
                                  <Link
                                    to={`/pet-category/${item.name}/${item.id}`}
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
                              item.name == "Collar Leashes & More" && (
                                <li>
                                  <Link
                                    to={`/pet-category/${item.name}/${item.id}`}
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
                              item.name == "Shampoo & Perfumes" && (
                                <li>
                                  <Link
                                    to={`/pet-category/${item.name}/${item.id}`}
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
                              item.name == "Beds Cages & Carriers" && (
                                <li>
                                  <Link
                                    to={`/pet-category/${item.name}/${item.id}`}
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
                              item.name == "Training & Accessories" && (
                                <li>
                                  <Link
                                    to={`/pet-category/${item.name}/${item.id}`}
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
                              item.name == "Bowls & Feeders" && (
                                <li>
                                  <Link
                                    to={`/pet-category/${item.name}/${item.id}`}
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
                              item.name == "Grooming" && (
                                <li>
                                  <Link
                                    to={`/pet-category/${item.name}/${item.id}`}
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
                              item.name == "medicine" && (
                                <li>
                                  <Link
                                    to={`/pet-category/${item.name}/${item.id}`}
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
              </a>
              <input type="checkbox" id="showMegaCat" />
              <label htmlFor="showMegaCat" className="mobile-item">
                Cats
              </label>
              <div className="mega-box">
                <div className="content">
                  <Row>
                    <Col lg={4} sm={6}>
                      <header>Cat Food & Treats</header>
                      <ul className="mega-links">
                        {dogsubcategories ? (
                          dogsubcategories.map(
                            (item) =>
                              item.name == "food" && (
                                <li key={item.id}>
                                  <Link
                                    to={`/pet-category/${item.name}/${item.id}`}
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
                              item.name == "food" && (
                                <li key={item.id}>
                                  <Link
                                    to={`/pet-category/${item.name}/${item.id}`}
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
                      <header>Cat Litter & Accessories</header>
                      <ul className="mega-links">
                        {dogsubcategories ? (
                          dogsubcategories.map(
                            (item) =>
                              item.name == "treats" && (
                                <li>
                                  <Link
                                    to={`/pet-category/${item.name}/${item.id}`}
                                  >
                                    {item.name}
                                  </Link>
                                </li>
                              )
                          )
                        ) : (
                          <p className="emptyMSG">No Treats Sub Categories.</p>
                        )}
                      </ul>
                    </Col>
                    <Col lg={4} sm={6}>
                      <header>Toys</header>
                      <ul className="mega-links">
                        {dogsubcategories ? (
                          dogsubcategories.map(
                            (item) =>
                              item.name == "toys" && (
                                <li>
                                  <Link
                                    to={`/pet-category/${item.name}/${item.id}`}
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
                              item.name == "Collar Leashes & More" && (
                                <li>
                                  <Link
                                    to={`/pet-category/${item.name}/${item.id}`}
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
                              item.name == "Shampoo & Perfumes" && (
                                <li>
                                  <Link
                                    to={`/pet-category/${item.name}/${item.id}`}
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
                              item.name == "Beds Cages, Scratcher & Crates" && (
                                <li>
                                  <Link
                                    to={`/pet-category/${item.name}/${item.id}`}
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
                              item.name == "Clothing & Accessories" && (
                                <li>
                                  <Link
                                    to={`/pet-category/${item.name}/${item.id}`}
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
                              item.name == "Bowls & Feeders" && (
                                <li>
                                  <Link
                                    to={`/pet-category/${item.name}/${item.id}`}
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
                              item.name == "Grooming" && (
                                <li>
                                  <Link
                                    to={`/pet-category/${item.name}/${item.id}`}
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
                              item.name == "Cat Litter & Scooper" && (
                                <li>
                                  <Link
                                    to={`/pet-category/${item.name}/${item.id}`}
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
                              item.name == "medicine" && (
                                <li>
                                  <Link
                                    to={`/pet-category/${item.name}/${item.id}`}
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
              </a>
              <input type="checkbox" id="showDrop" />
              <label htmlFor="showDrop" className="mobile-item">
                Products
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
            <li>
              <Link className="profiledes searneee">
                <i className="fa fa-search" />
                <input
                  type="text"
                  placeholder="What are you looking for ?"
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                  className="homesea"
                />
                <ul className="drop-menu search-results">
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
              <a
                className="profiledes notification-btn"
                data-toggle="modal"
                data-target="#exampleModal"
                onClick={handleBellClick}
              >
                <i class="fa fa-bell-o" />
                {isTotalLengthVisible && <span>{totalLength}</span>}
              </a>
            </li>

            {storedUserId ? (
              <>
                <li className="nonhide">
                  <Link to="/add-cart" className="profiledes notification-btn">
                    <i class="fa fa-shopping-cart" />{" "}
                    <span className="cart-count">{dataLength}</span>{" "}
                  </Link>
                </li>
                <li className="nonhide">
                  <Link
                    className=""
                    data-toggle="modal"
                    data-target="#logout-model"
                  >
                    Logout
                  </Link>
                </li>

                <li>
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
                  <label htmlFor="showDropProfile" className="mobile-item">
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
                      <Link className="dropdown-item" to="/update-profile">
                        Profile
                      </Link>
                    </li>
                  </ul>
                </li>
              </>
            ) : (
              <li>
                <Link to="/login">Sign In</Link>
              </li>
            )}
          </ul>
          <label htmlFor="menu-btn" className="btn menu-btn">
            <i className="fas fa-bars" />
          </label>
        </div>
      </nav>

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
              <p>
                <i class="fa fa-bell-o" />
                <span className="total-count">{totalLength}</span>
              </p>
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
                    {notification && notification.length > 0 ? (
                      notification.map((item, index) => (
                        <div className="notification">
                          <Row>
                            <Col lg={2}>
                              <img src={item.image} />
                            </Col>
                            <Col lg={9} className="align-self-center">
                              <h6>{item.title}</h6>
                              <p>{item.description}</p>
                            </Col>
                          </Row>
                        </div>
                      ))
                    ) : (
                      <p className="emptyMSG">No Notification</p>
                    )}
                    <div>
                      {notify && notify.length > 0 ? (
                        notify.map((ob, index) => (
                          <div className="notification" key={index}>
                            <Link to="">
                              <Row>
                                <Col
                                  lg={2}
                                  className="align-self-center text-center"
                                >
                                  <Link
                                    to={`/product-details/${ob.item_id}`}
                                    onClick={() => handleLinkClick(ob.item_id)}
                                  >
                                    <i className="fa fa-info-circle" />
                                  </Link>
                                </Col>
                                <Col lg={8}>
                                  <Link
                                    to={`/product-details/${ob.item_id}`}
                                    onClick={() => handleLinkClick(ob.item_id)}
                                  >
                                    <h6
                                      className={
                                        ob.status === "unread"
                                          ? "unread"
                                          : "read"
                                      }
                                    >
                                      Item ID : {ob.item_id}
                                    </h6>
                                    <p
                                      className={
                                        ob.status === "unread"
                                          ? "unread"
                                          : "read"
                                      }
                                    >
                                      Stock : {ob.stock}
                                    </p>
                                    <p
                                      className={
                                        ob.status === "unread"
                                          ? "unread"
                                          : "read"
                                      }
                                    >
                                      Variation : {ob.variation}
                                    </p>
                                    <p
                                      className={
                                        ob.status === "unread"
                                          ? "unread"
                                          : "read"
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
                            </Link>
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
                              <Col
                                lg={2}
                                className="align-self-center text-center"
                              >
                                <Link to={`/my-orders`} data-dismiss="modal">
                                  <i className="fa fa-info-circle" />
                                </Link>
                              </Col>
                              <Col lg={8}>
                                <Link
                                  to={`/my-orders`}
                                  onClick={() => handleLinkClick(ob.id)}
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
                    </div>
                  </div>
                  <div
                    class="tab-pane fade"
                    id="pills-profile"
                    role="tabpanel"
                    aria-labelledby="pills-profile-tab"
                  >
                    {notification && notification.length > 0 ? (
                      notification.map((item, index) => (
                        <div className="notification">
                          <Row>
                            <Col lg={2}>
                              <img src={item.image} />
                            </Col>
                            <Col lg={9} className="align-self-center">
                              <h6>{item.title}</h6>
                              <p>{item.description}</p>
                            </Col>
                          </Row>
                        </div>
                      ))
                    ) : (
                      <p className="emptyMSG">No Notification</p>
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

export default Latestheader;
