import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import pro from "../assets/images/icon/pro.png";
import { BASE_URL } from "../Constant/Index";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";

function Newheader() {
  const [notification, setNotification] = useState([]);
  const [allproduct, setAllProduct] = useState([]);
  const [searchTerm3, setSearchTerm3] = useState("");
  const [searchapi3, setSearchApi3] = useState([]);

  useEffect(() => {
    fetchBrands();
    allProductdata();
  }, []);

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

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchTerm(searchValue);

    if (searchValue === "") {
      setAllProduct(allproduct);
    } else {
      const filteredProducts = allproduct.filter(
        (product) =>
          product.name && product.name.toLowerCase().includes(searchValue)
      );
      setAllProduct(filteredProducts);
    }
  };
  const [searchTerm, setSearchTerm] = useState("");

  const logoutUser = () => {
    const customer_id = localStorage.getItem("userInfo");
    if (customer_id) {
      try {
        localStorage.removeItem("userInfo");
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

  const [storedUserId, setStoredUserId] = useState(null);

  useEffect(() => {
    const customer_id = localStorage.getItem("userInfo");
    setStoredUserId(JSON.parse(customer_id));
  }, []);

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
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/product">
                  New
                </Link>
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
                  Dog
                </a>
                <div
                  className="dropdown-menu mega-menu"
                  aria-labelledby="megaDropdown"
                >
                  <div className="row">
                    <div className="col-md-4">
                      <h5 className="mega-title">Dog Food</h5>
                      <ul className="list-unstyled">
                        <li>
                          <Link to="">Dry Food</Link>
                        </li>
                        <li>
                          <Link to="">Submenu Item 2</Link>
                        </li>
                        <li>
                          <Link to="">Wet Food</Link>
                        </li>
                        <li>
                          <Link to="">Premium Food</Link>
                        </li>
                        <li>
                          <Link to="">Fresh Meals</Link>
                        </li>
                        <li>
                          <Link to="">Vegetarian Food</Link>
                        </li>
                      </ul>
                    </div>
                    <div className="col-md-4">
                      <h5 className="mega-title">Treats</h5>
                      <ul className="list-unstyled">
                        <li>
                          {" "}
                          <Link to="">Biscuits & Cookies</Link>
                        </li>
                        <li>
                          {" "}
                          <Link to="">Dental treats</Link>
                        </li>
                        <li>
                          <Link to="">Freeze-Dried Treats</Link>
                        </li>
                        <li>
                          <Link to="">Functional & Training Treats</Link>
                        </li>
                        <li>
                          <Link to="">Jerkies</Link>
                        </li>
                        <li>
                          <Link to="">Natural Treats</Link>
                        </li>
                        <li>
                          <Link to="">Soft & Chewy Treats</Link>
                        </li>
                      </ul>
                    </div>
                    <div className="col-md-4">
                      <h5 className="mega-title">Supplies</h5>
                      <ul className="list-unstyled">
                        <li>
                          {" "}
                          <Link to="">Toys</Link>
                        </li>
                        <li>
                          <Link to="">Bedding</Link>
                        </li>
                        <li>
                          {" "}
                          <Link to="">Bowls & Feeders</Link>
                        </li>
                        <li>
                          {" "}
                          <Link to="">Cleaning & Potty</Link>
                        </li>
                        <li>
                          <Link to="">Training & Behaviour</Link>
                        </li>
                        <li>
                          <Link to="">Carriers & Travel</Link>
                        </li>
                        <li>
                          <Link to="">Grooming</Link>
                        </li>
                        <li>
                          <Link to="">Gates, Crates & Pens</Link>
                        </li>
                      </ul>
                    </div>
                    <div className="col-md-4">
                      <h5 className="mega-title">Accessories</h5>
                      <ul className="list-unstyled">
                        <li>
                          {" "}
                          <Link to="">Bows & Bandanas</Link>
                        </li>
                        <li>
                          <Link to="">Collars & Leashes</Link>
                        </li>
                        <li>
                          <Link to="">Harnesses</Link>
                        </li>
                        <li>
                          {" "}
                          <Link to="">Personalised Tags</Link>
                        </li>
                        <li>
                          {" "}
                          <Link to="">Sweaters, Raincoats & Shoes</Link>
                        </li>
                        <li>
                          <Link to="">Harry Potter Limited Edition</Link>
                        </li>
                        <li>
                          <Link to="">Tom & Jerry Limited Edition</Link>
                        </li>
                      </ul>
                    </div>
                    <div className="col-md-4">
                      <h5 className="mega-title">Health Care</h5>
                      <ul className="list-unstyled">
                        <li>
                          <Link to="">Health Care Aids</Link>
                        </li>
                        <li>
                          <Link to="">Vitamins & Supplements</Link>
                        </li>
                        <li>
                          <Link to="">Flea & Tick</Link>
                        </li>
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
                      <h5 className="mega-title">Cat Food & Treats</h5>
                      <ul className="list-unstyled">
                        <li>
                          <Link to="/">Wet Food</Link>
                        </li>
                        <li>
                          <Link to="">Treats</Link>
                        </li>
                      </ul>
                    </div>
                    <div className="col-md-4">
                      <h5 className="mega-title">Cat Litter & Accessories</h5>
                      <ul className="list-unstyled">
                        <li>
                          <Link to="">Cat Litter</Link>
                        </li>
                        <li>
                          <Link to="">Cat Litter trays</Link>
                        </li>
                        <li>
                          <Link to="">Cat Litter Scoops</Link>
                        </li>
                        <li>
                          <Link to="">Cleaners & Deordorisers</Link>
                        </li>
                      </ul>
                    </div>
                    <div className="col-md-4">
                      <h5 className="mega-title">Cat Supplies</h5>
                      <ul className="list-unstyled">
                        <li>
                          <Link to="">Toys</Link>
                        </li>
                        <li>
                          <Link to="">Dinning Accessories</Link>
                        </li>
                        <li>
                          <Link to="">Cat Grooming</Link>
                        </li>
                        <li>
                          <Link to="">Carriers & Travel</Link>
                        </li>
                        <li>
                          {" "}
                          <Link to="">Furniture & Scratchers</Link>
                        </li>
                        <li>
                          <Link to="">Cat Bedding</Link>
                        </li>
                      </ul>
                    </div>
                    <div className="col-md-4">
                      <h5 className="mega-title">Cat Accessories</h5>
                      <ul className="list-unstyled">
                        <li>
                          <Link to="">Cat Collars</Link>
                        </li>
                        <li>
                          <Link to="">Cat Harness & Leash</Link>
                        </li>
                        <li>
                          <Link to="">Personalised Tags</Link>
                        </li>
                      </ul>
                    </div>
                    <div className="col-md-4">
                      <h5 className="mega-title">Health Care</h5>
                      <ul className="list-unstyled">
                        <li>
                          <Link to="">Vitamins & Supplements</Link>
                        </li>
                        <li>
                          <Link to="">Flea & Tick</Link>
                        </li>
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
                  <Link className="dropdown-item" to="/product">
                    All Product
                  </Link>
                  <Link className="dropdown-item" to="/canine-product">
                    Canine Product
                  </Link>
                  <Link className="dropdown-item" to="/patners-product">
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
              <li className="nav-item">
                <Link className="nav-link" to="/service">
                  Petcare
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">
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
              {storedUserId ? (
                // Display Logout button if user is logged in
                <>
                <li className="nav-item">
                  <button className="yellow-btn" onClick={logoutUser}>
                    Logout
                  </button>
                </li>
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
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <Link className="dropdown-item" to={`/pet-profile/`}>
                    Pet Profile
                  </Link>
                  <Link className="dropdown-item" to="/all-veterinary">
                    All Veterinary
                  </Link>
                  <Link className="dropdown-item" to="/all-service-booking">
                    All Service Booking
                  </Link>
                  <Link className="dropdown-item" to="/wishlist-products">
                    Wishlist Products
                  </Link>
                  <Link className="dropdown-item" to="/update-profile">
                    Profile
                  </Link>
                  {/* <Link className="dropdown-item" onClick={logoutUser}>
                                        Logout
                                    </Link> */}
                </div>
              </li>
                </>
              ) : (
                // Display Sign In button if user is not logged in
                <li className="nav-item">
                  <button className="yellow-btn">
                    <Link to="/login">Sign In</Link>
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

export default Newheader;
