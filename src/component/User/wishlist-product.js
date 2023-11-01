import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import axios from "axios";
import Newheader from "../../directives/newheader";
import { BASE_URL } from "../../Constant/Index";
import bag from "../../assets/images/icon/bag.png";
import { Toaster, toast } from "react-hot-toast";
import Footer from "../../directives/footer";

function Wishlistproduct() {
  const [wishlistData, setWishlistData] = useState([]);

  useEffect(() => {
    fetchWishlistData();
    fetchWishlistDataId();
  }, []);

  // const { id } = useParams();
  // console.log("wishlistid-------", id);

  // storedUserId
  const customer_id = localStorage.getItem("userInfo");
  let storedUserId = JSON.parse(customer_id);
  console.log("storedUserId: ", storedUserId);
  console.log("customer_id: ", customer_id);
  // ----------------------------------------
  const [itemIds, setItemIds] = useState([]);

  const fetchWishlistDataId = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/customer/wish-list/${storedUserId}`
      );
      const itemIdsArray = response.data.data.map((item) => item.item_id);
      setItemIds(itemIdsArray);
    } catch (error) {
      console.error("Error fetching wishlist data:", error);
    }
  };
  const fetchWishlistData = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/customer/wish-list/${storedUserId}`
      );
      setWishlistData(response.data.data);
    } catch (error) {
      console.error("Error fetching wishlist data:", error);
    }
  };
  const handleRemoveFromWishlist = async (id) => {
    try {
      await axios.delete(
        `${BASE_URL}/customer/wish-list/remove/${itemIds}/${storedUserId}`
      );
      setWishlistData((prevData) => prevData.filter((item) => item.id !== id));
      fetchWishlistDataId(); // Fetch updated itemIds after deletion

      toast.success("Your Product deleted successfully");
    } catch (error) {
      console.error("Error removing item from wishlist:", error);
      if (error.response) {
        console.log("Response status:", error.response.status);
        console.log("Response data:", error.response.data);
      }
    }
  };

  const gradientColors = [
    "linear-gradient(180deg, #FFF0BA 0%, rgba(251.81, 233.11, 165.78, 0) 100%)",
    "linear-gradient(180deg, #C7EBFF 0%, rgba(199, 235, 255, 0) 100%)",
    "linear-gradient(180deg, #FECBF0 0%, rgba(254, 203, 240, 0) 100%)",
    "linear-gradient(180deg, #C8FFBA 0%, rgba(200, 255, 186, 0) 100%)",
    // Add more gradient colors as needed
  ];

  return (
    <>
      <Toaster />
      <Newheader />
      <section className="section-padding">
        <Container>
          <h1 className="main-head">Wishlist Products</h1>
          <div className="needplace">
            <Row>
              {wishlistData && wishlistData.length > 0 ? (
                wishlistData.map((item, index) => (
                  <Col key={item.id} lg={3} sm={6} xs={6} className="mb-4">
                    <div
                      className="food-product"
                      style={{
                        background:
                          gradientColors[index % gradientColors.length],
                      }}
                    >
                      <i
                        className="fa fa-trash"
                        onClick={() => handleRemoveFromWishlist(item.id)}
                      />
                      <Link to="">
                        <div className="text-center">
                          {item.store_id &&
                          item.store_id[0] &&
                          item.store_id[0].image ? (
                            <img
                              src={
                                "https://canine.hirectjob.in///storage/app/public/product/" +
                                item.store_id[0].image
                              }
                              alt="Product"
                            />
                          ) : (
                            <p>No Image</p>
                          )}
                        </div>
                        <div>
                          {item.store_id && item.store_id[0] ? (
                            <>
                              <h6>{item.store_id[0].name}</h6>
                              <p>{item.store_id[0].description}</p>
                            </>
                          ) : (
                            <p>No Product Data</p>
                          )}
                        </div>
                        {item.store_id && item.store_id[0] ? (
                          <div className="product-bag">
                            <Row>
                              <Col>
                                <p>₹800.00</p>
                              </Col>
                              <Col>
                                <h5>Save {item.store_id[0].discount}%</h5>
                              </Col>
                            </Row>
                            <Row>
                              <Col className="align-self-center">
                                <h4>₹{item.store_id[0].price}</h4>
                              </Col>
                            </Row>
                          </div>
                        ) : null}
                      </Link>
                    </div>
                  </Col>
                ))
              ) : (
                <p className="emptyMSG">No Wishlist Products</p>
              )}
            </Row>
          </div>
        </Container>
      </section>

      <Footer />
    </>
  );
}

export default Wishlistproduct;
