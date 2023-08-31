import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";
import pro from "../assets/images/icon/pro.png";
import { BASE_URL } from "../Constant/Index";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";

function Wholeheader(props) {
  const navigate = useNavigate()
  const [notification, setNotification] = useState([]);
  const [allproduct, setAllProduct] = useState([]);
  console.log("allproduct: ", allproduct);
  const [dogsubcategories, setdogsubcategories] = useState("");
  console.log("dogsubcategories: ", dogsubcategories);
  const [storedWholesellerId, setStoredWholesellerId] = useState(null);
  console.log('storedWholesellerId', storedWholesellerId)
  const [categories, setcategories] = useState([]);
  const loginType = localStorage.getItem('loginType')

  useEffect(() => {
    fetchBrands();
    allProductdata();
    AllDogsubcategories();
    categoriesProduct();
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
      localStorage.getItem(loginType === 'salesman' ? "salesmanId" : "UserWholesellerId")
    );
    if (storedWholesellerId) {
      try {
        localStorage.removeItem("userInfo");
        localStorage.removeItem('salesmanId')
        console.log("Logged out Wholeseller with ID: ", storedWholesellerId);
        setStoredWholesellerId(null); // Reset the storedUserId state
        toast.success("Your user ID logout has been successful.");
        if(loginType === 'salesman'){
          navigate('/salesman-login',{replace: true})
        }
      } catch (error) {
        console.error("Error parsing stored user ID: ", error);
      }
    } else {
      console.log("No user ID found in localStorage.");
    }
  };

  useEffect(() => {
    const storedWholesellerId = Number(
      localStorage.getItem(loginType === 'salesman' ? "salesmanId" : "UserWholesellerId")
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

  return (
    <>
      <Toaster />
      <nav className="navbar navbar-expand-lg navbar-light newheader">
        <div className="container">
          <a className="navbar-brand" href="#">
            {" "}
            <Link to="/" className="logoBG">
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
            <ul className="navbar-nav mr-auto">
              {/* <li className="nav-item">
                <Link className="nav-link" to="/wholeseller-dashboard">
                  Dashboard
                </Link>
              </li> */}
              <li className="nav-item">
                <Link className="nav-link" to={loginType === 'salesman' ? '/salesman-dashboad' : "/wholeseller-home"}>
                  {loginType === 'salesman' ? 'Dashboard' : 'Home'}
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/wholeseller-product">
                  New
                </Link>
              </li>
              <li className="nav-item dropdown mega-dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to=""
                  id="megaDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Dog
                </Link>
                <div
                  className="dropdown-menu mega-menu"
                  aria-labelledby="megaDropdown"
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
                                      to={`/wholeseller-pet-category/${item.name}/${item.id}`}
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
                          <p className="emptyMSG">No Treats Sub Categories.</p>
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
              <li className="nav-item dropdown mega-dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="megaDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Cats
                </a>
                <div
                  className="dropdown-menu mega-menu"
                  aria-labelledby="megaDropdown"
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
                                      to={`/wholeseller-pet-category/${item.name}`}
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
                          <p className="emptyMSG">No Treats Sub Categories.</p>
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
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <Link className="dropdown-item" to="/wholeseller-product">
                    All Product
                  </Link>
                  <Link className="dropdown-item" to="">
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
                <Link className="nav-link" to="/wholeseller-contact">
                  Contact
                </Link>
              </li>
              <li className="nav-item">
                <a className="nav-link">
                  <div className="header-inner-addon input-container">
                    <i className="fa fa-search" />
                    <input
                      type="text"
                      placeholder="Search by name"
                      // value={searchTerm}
                      // onChange={handleSearch}
                    />
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
                </a>
              </li>
              {storedWholesellerId ? (
                // Display Logout button if user is logged in
                <>
                  <li className="nav-item">
                    <button className="yellow-btn" onClick={logoutUser}>
                      Logout
                    </button>
                  </li>
                  {/* <li className="nav-item">
                    <a
                      className="nav-link dropdown-toggle profile-icon"
                      href="#"
                      id="navbarDropdown"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <img src={pro} />
                    </a>
                  </li> */}
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle profile-icon"
                      href="#"
                      id="navbarDropdown"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <img src={pro} />
                    </a>
                    <div
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdown"
                    >
                      <Link
                        className="dropdown-item"
                        to={loginType === 'salesman' ? '/salesman-dashboad/' : "/wholeseller-dashboard"}
                      >
                        Dashboard
                      </Link>
                      <Link
                        className="dropdown-item"
                        to={loginType === 'salesman' ? '/salesman-dashboad/' :"/wholeseller-transition-history"}
                      >
                        Transition History
                      </Link>
                      <Link
                        className="dropdown-item"
                        to={loginType === 'salesman' ? '/salesman-dashboad/' :"/wholeseller-my-orders"}
                      >
                        My Orders
                      </Link>
                      <Link
                        className="dropdown-item"
                        to={loginType === 'salesman' ? '/salesman-dashboad/' :"/wholeseller-wishlist-product"}
                      >
                        Wishlist Products
                      </Link>
                      <Link
                        className="dropdown-item"
                        to={loginType === 'salesman' ? '/salesman-dashboad/' :"/wholeseller-update-profile"}
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
                    <Link to={loginType === 'salesman' ? "/salesman-login" : "/wholeseller-login"}>Sign In</Link>
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>

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
    </>
  );
}

export default Wholeheader;