import React, { useEffect, useState } from "react";
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

function PetShopHeader(props) {
  const navigate = useNavigate();
  const [notification, setNotification] = useState([]);
  const [allproduct, setAllProduct] = useState([]);
  console.log("allproduct: ", allproduct);
  const [dogsubcategories, setdogsubcategories] = useState("");
  console.log("dogsubcategories: ", dogsubcategories);
  const [storedWholesellerId, setStoredWholesellerId] = useState(null);
  const [categories, setcategories] = useState([]);
  const { cartData, dataLengthpetshop, addToCartData } = useCartContext();
  const loginType = localStorage.getItem("loginType");
  const { notificationLength, dataLengthpetnotification } =
    useNotificationContext();

  useEffect(() => {
    fetchBrands();
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

  const fetchBrands = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/customer/notifications?tergat=customer`
      );
      setNotification(response.data);
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
        localStorage.removeItem("WholesellerEmail");
        localStorage.removeItem("WholesellerPassword");
        localStorage.removeItem("verifiedId");
        localStorage.removeItem("loginType");
        // localStorage.clear('')
        console.log("Logged out Wholeseller with ID: ", storedWholesellerId);
        setStoredWholesellerId(null); // Reset the storedUserId state
        toast.success("Your user ID logout has been successful.");
        navigate("/login");
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

  return (
    <>
      <Toaster />
      <div className="sticky-newheader">
        <nav className="navbar navbar-expand-lg navbar-light newheader">
          <div className="container">
            <a className="navbar-brand" href="#">
              {" "}
              <Link
                to={
                  loginType == "salesman"
                    ? "/salesman-dashboad"
                    : "/petshop-home"
                }
                className="logoBG"
              >
                <img src={logo} />
              </Link>
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#megaMenu"
              aria-controls="megaMenu"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="megaMenu">
              <ul className="navbar-nav m-auto">
                {/* <li className="nav-item">
                <Link className="nav-link" to="/petshop-dashboard">
                  Dashboard
                </Link>
              </li> */}
                {/* <li className="nav-item">
                <Link
                  className="nav-link"
                  to={
                    loginType === "salesman"
                      ? "/salesman-dashboad"
                      : "/petshop-home"
                  }
                >
                  {loginType === "salesman" ? "Dashboard" : "Home"}
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/petshop-product">
                  New
                </Link>
              </li> */}
                <li className="nav-item dropdown new-mega-drop">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    // data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Dogs
                  </a>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <div className="row">
                      <div className="col-md-4">
                        <>
                          <h5 className="mega-title">Dog Food</h5>
                          <ul className="list-unstyled">
                            {dogsubcategories ? (
                              dogsubcategories.map(
                                (item) =>
                                  item.name == "food" && (
                                    <li key={item.id}>
                                      <Link
                                        to={`/petshop-pet-category/${item.name}/${item.id}`}
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
                        </>
                      </div>

                      <div className="col-md-4">
                        <h5 className="mega-title">Treats</h5>
                        <ul className="list-unstyled">
                          {dogsubcategories ? (
                            dogsubcategories.map(
                              (item) =>
                                item.name == "treats" && (
                                  <li>
                                    <Link to="">{item.name}</Link>
                                  </li>
                                )
                            )
                          ) : (
                            <p className="emptyMSG">
                              No Treats Sub Categories.
                            </p>
                          )}
                        </ul>
                      </div>
                      <div className="col-md-4">
                        <h5 className="mega-title">Supplies</h5>
                        <ul className="list-unstyled">
                          {dogsubcategories ? (
                            dogsubcategories.map(
                              (item) =>
                                item.name == "toys" && (
                                  <li>
                                    <Link to="">{item.name}</Link>
                                  </li>
                                )
                            )
                          ) : (
                            <p className="emptyMSG">
                              No Supplies Sub Categories.
                            </p>
                          )}
                        </ul>
                      </div>
                      <div className="col-md-4">
                        <h5 className="mega-title">Accessories</h5>
                        <ul className="list-unstyled">
                          {dogsubcategories ? (
                            dogsubcategories.map(
                              (item) =>
                                item.name == "accessories" && (
                                  <li>
                                    <Link to="">{item.name}</Link>
                                  </li>
                                )
                            )
                          ) : (
                            <p className="emptyMSG">
                              No Accessories Sub Categories.
                            </p>
                          )}
                        </ul>
                      </div>
                      <div className="col-md-4">
                        <h5 className="mega-title">Health Care</h5>
                        <ul className="list-unstyled">
                          {dogsubcategories ? (
                            dogsubcategories.map(
                              (item) =>
                                item.name == "medicine" && (
                                  <li>
                                    <Link to="">{item.name}</Link>
                                  </li>
                                )
                            )
                          ) : (
                            <p className="emptyMSG">
                              No Health Care Sub Categories.
                            </p>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="nav-item dropdown new-mega-drop">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    // data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Cats
                  </a>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <div className="row">
                      <div className="col-md-4">
                        <>
                          <h5 className="mega-title">Cat Food & Treats</h5>
                          <ul className="list-unstyled">
                            {dogsubcategories ? (
                              dogsubcategories.map(
                                (item) =>
                                  item.name == "food" && (
                                    <li key={item.id}>
                                      <Link
                                        to={`/petshop-pet-category/${item.name}`}
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
                        </>
                      </div>

                      <div className="col-md-4">
                        <h5 className="mega-title">Cat Litter & Accessories</h5>
                        <ul className="list-unstyled">
                          {dogsubcategories ? (
                            dogsubcategories.map(
                              (item) =>
                                item.name == "treats" && (
                                  <li>
                                    <Link to="">{item.name}</Link>
                                  </li>
                                )
                            )
                          ) : (
                            <p className="emptyMSG">
                              No Treats Sub Categories.
                            </p>
                          )}
                        </ul>
                      </div>
                      <div className="col-md-4">
                        <h5 className="mega-title">Cat Supplies</h5>
                        <ul className="list-unstyled">
                          {dogsubcategories ? (
                            dogsubcategories.map(
                              (item) =>
                                item.name == "toys" && (
                                  <li>
                                    <Link to="">{item.name}</Link>
                                  </li>
                                )
                            )
                          ) : (
                            <p className="emptyMSG">
                              No Supplies Sub Categories.
                            </p>
                          )}
                        </ul>
                      </div>
                      <div className="col-md-4">
                        <h5 className="mega-title">Cat Accessories</h5>
                        <ul className="list-unstyled">
                          {dogsubcategories ? (
                            dogsubcategories.map(
                              (item) =>
                                item.name == "accessories" && (
                                  <li>
                                    <Link to="">{item.name}</Link>
                                  </li>
                                )
                            )
                          ) : (
                            <p className="emptyMSG">
                              No Accessories Sub Categories.
                            </p>
                          )}
                        </ul>
                      </div>
                      <div className="col-md-4">
                        <h5 className="mega-title">Health Care</h5>
                        <ul className="list-unstyled">
                          {dogsubcategories ? (
                            dogsubcategories.map(
                              (item) =>
                                item.name == "medicine" && (
                                  <li>
                                    <Link to="">{item.name}</Link>
                                  </li>
                                )
                            )
                          ) : (
                            <p className="emptyMSG">
                              No Health Care Sub Categories.
                            </p>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Products
                  </a>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <Link className="dropdown-item" to="/petshop-product">
                      All Product
                    </Link>
                    <Link
                      className="dropdown-item"
                      to="/petshop-canine-product"
                    >
                      Canine Product
                    </Link>
                    <Link className="dropdown-item" to="">
                      Patners Product
                    </Link>
                  </div>
                </li>
                {/* <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Petcare
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <Link className="dropdown-item" to="/veterinary-service">Veterinary Service</Link>
                                </div>
                            </li> */}
                {/* <li className="nav-item">
                <Link className="nav-link" to="/service">
                  Petcare
                </Link>
              </li> */}
                <li className="nav-item">
                  <Link className="nav-link" to="/petshop-contact">
                    Contact
                  </Link>
                </li>
                <li className="nav-item">
                  <a className="nav-link">
                    <div className="header-inner-addon input-container">
                      <i className="fa fa-search" />
                      <input
                        type="text"
                        placeholder="What are you looking for?"
                        value={searchQuery}
                        onChange={handleSearchInputChange}
                      />
                    </div>

                    <div className="search-results">
                      {filteredProducts.map((product, index, id) => (
                        <li key={index}>
                          <Link to={`/product-details/${product.id}`}>
                            {product.name}
                          </Link>
                        </li>
                      ))}
                    </div>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="notification-btn"
                    data-toggle="modal"
                    data-target="#exampleModal"
                  >
                    <i class="fa fa-bell-o" />
                    <span>{notificationLength}</span>
                  </a>
                </li>
                {storedWholesellerId ? (
                  // Display Logout button if user is logged in
                  <>
                    <li className="nav-item">
                      <button
                        className="yellow-btn"
                        data-toggle="modal"
                        data-target="#logout-model"
                      >
                        Logout
                      </button>
                    </li>

                    <li className="nav-item">
                      <Link to="/petShop-add-cart" className="notification-btn">
                        <i class="fa fa-shopping-cart" />{" "}
                        <span className="cart-countpetshop">
                          {dataLengthpetshop}
                        </span>{" "}
                      </Link>
                    </li>
                    <li className="nav-item dropdown">
                      {/* <a
                      className="nav-link dropdown-toggle profile-icon"
                      href="#"
                      id="navbarDropdown"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    > */}
                      <Link
                        className="nav-link profile-icon"
                        to={loginType == "salesman" ? "/salesman-dashboad" : ""}
                      >
                        {/* {loginType === "salesman" ? "Dashboard" : "Home"} */}

                        {/* <img src={pro} /> */}
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
                        {/* <img
                          src={
                            loginType === "salesman" && salesmanProfile?.image
                              ? "https://canine.hirectjob.in/storage/app/public/delivery-man/" + salesmanProfile.image
                              : "https://canine.hirectjob.in/storage/app/public/profile/" + (profileData?.image || "default-image-url")
                          }
                          alt="Profile Image"
                        /> */}
                      </Link>
                      <div
                        className="dropdown-menu"
                        aria-labelledby="navbarDropdown"
                      >
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
                        {loginType !== "salesman" && (
                          <>
                            <Link
                              className="dropdown-item"
                              to={
                                loginType === "salesman"
                                  ? "/salesman-dashboad/"
                                  : "/petshop-transition-history"
                              }
                            >
                              Transition History
                            </Link>
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
                          </>
                        )}
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
                        {/* //  <Link className="dropdown-item" onClick={logoutUser}>
                                        // Logout
                                    // </Link>  */}
                      </div>
                    </li>
                  </>
                ) : (
                  // Display Sign In button if user is not logged in
                  <li className="nav-item">
                    <button className="yellow-btn">
                      <Link
                        to={
                          loginType === "salesman"
                            ? "/salesman-login"
                            : "/petshop-login"
                        }
                      >
                        Sign In
                      </Link>
                    </button>
                  </li>
                )}
              </ul>
            </div>
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
              {notification && notification.length > 0 ? (
                notification.map((item, index) => (
                  <div className="notification">
                    <Row>
                      <Col lg={2}>
                        <img src={pro} />
                      </Col>
                      <Col lg={10} className="align-self-center">
                        <h6>{item.tergat}</h6>
                      </Col>
                    </Row>
                  </div>
                ))
              ) : (
                <p className="emptyMSG">No Notification</p>
              )}

              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
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

export default PetShopHeader;
