import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import axios from "axios";
import { BASE_URL } from "../../Constant/Index";
import bag from "../../assets/images/icon/bag.png";
import { Toaster, toast } from "react-hot-toast";
import PetShopHeader from "../../directives/petShopHeader";
import Petshopfooter from "../../directives/petShop-Footer";
import loadinggif from "../../assets/images/video/loading.gif";

function PetshopWishlistproduct() {
  const [wishlistData, setWishlistData] = useState([]);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    Promise.all([fetchWishlistData(), fetchWishlistDataId()])
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  // storedWholesellerId
  const storedWholesellerId = Number(localStorage.getItem("UserWholesellerId"));
  // ----------------------------------------
  const [itemIds, setItemIds] = useState([]);

  const fetchWishlistDataId = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/customer/wish-list/${storedWholesellerId}`
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
        `${BASE_URL}/customer/wish-list/${storedWholesellerId}`
      );
      setWishlistData(response.data.data);
    } catch (error) {
      console.error("Error fetching wishlist data:", error);
    }
  };
  const handleRemoveFromWishlist = async (id) => {
    try {
      await axios.delete(
        `${BASE_URL}/customer/wish-list/remove/${itemIds}/${storedWholesellerId}`
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

  const renderProductDescription = (description) => {
    const maxCharacters = 35; 

    if (description?.length <= maxCharacters) {
      return <p>{description}</p>; 
    }

    const truncatedDescription = description?.slice(0, maxCharacters);

    return (
      <>
        <p>{truncatedDescription}.......</p>
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
                            onClick={() => handleRemoveFromWishlist(item?.id)}
                          />
                          <Link
                            to={`/petshop-productDetails/${item.store_id[0]?.id}`}
                          >
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
                                  <h6>
                                    {renderProducthead(item.store_id[0].name)}
                                  </h6>
                                  <p>{renderProductDescription(item.store_id[0].description)}</p>
                                </>
                              ) : (
                                <p>No Product Data</p>
                              )}
                            </div>
                            {item.store_id && item.store_id[0] ? (
                              <div className="product-bag">
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
        </>
      )}
      <Petshopfooter />
    </>
  );
}

export default PetshopWishlistproduct;
