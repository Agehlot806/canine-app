import React, { useEffect, useState } from "react";
import Header from "../../directives/header";
import productdetail from "../../assets/images/banner/productdetail.png";
import product from "../../assets/images/banner/product.png";
import productItem from "../../assets/images/img/brandPro1.png";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Footer from "../../directives/footer";
import product1 from "../../assets/images/img/product1.png";
import product2 from "../../assets/images/img/product2.png";
import product3 from "../../assets/images/img/product3.png";
import bag from "../../assets/images/icon/bag.png";
import axios from "axios";
import { BASE_URL } from "../../Constant/Index";

function Productdetail() {
  const { id } = useParams();
  console.log("id: ", id);
  const [productDetails, setProductDetails] = useState([]);
  console.log("productDetails?.variations: ", productDetails.variations);
  const [quantity, setQuantity] = useState(1);
  const handleIncrementone = () => {
    setQuantity(quantity + 1);
  };
  const handleDecrementone = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  useEffect(() => {
    productData();
  }, []);

  const productData = async () => {
    axios
      .get(`${BASE_URL}/items/details/${id}`)
      .then((response) => {
        console.log(response);
        console.log("Delete Successful");
        setProductDetails(response.data.data);
        // Perform any additional actions after successful deletion
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Header />
      <Container fluid className="p-0">
        <div className="all-bg">
          <img src={productdetail} />
        </div>
      </Container>

      <section className="section-padding">
        <Container>
          <Row>
            <Col lg={6}>
              <div className="product-item">
                <img
                  src={
                    "https://canine.hirectjob.in//storage/app/public/product/" +
                    productDetails.image
                  }
                />
              </div>
              <div className="needplace">
                <Row>
                  <Col sm={2} className="mb-3">
                    <div className="product-item-inner">
                      <img src={productItem} />
                    </div>
                  </Col>
                  <Col sm={2} className="mb-3">
                    <div className="product-item-inner">
                      <img src={productItem} />
                    </div>
                  </Col>
                  <Col sm={2} className="mb-3">
                    <div className="product-item-inner">
                      <img src={productItem} />
                    </div>
                  </Col>
                  <Col sm={2} className="mb-3">
                    <div className="product-item-inner">
                      <img src={productItem} />
                    </div>
                  </Col>
                  <Col sm={2} className="mb-3">
                    <div className="product-item-inner">
                      <img src={productItem} />
                    </div>
                  </Col>
                  <Col sm={2} className="mb-3">
                    <div className="product-item-inner">
                      <img src={productItem} />
                    </div>
                  </Col>
                  <Col sm={2} className="mb-3">
                    <div className="product-item-inner">
                      <img src={productItem} />
                    </div>
                  </Col>
                  <Col sm={2} className="mb-3">
                    <div className="product-item-inner">
                      <img src={productItem} />
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col lg={6}>
              <div className="productDetail-content">
                <Row>
                  <Col lg={10}>
                    <h4>{productDetails.name}</h4>
                  </Col>
                  <Col lg={2}>
                    <i className="fa fa-star" />
                  </Col>
                </Row>
                <p>
                  By <span>{productDetails.store_name}</span>
                </p>
                <span>
                  <i className="fa fa-star" /> 4.5
                </span>
                <div className="needplaceProduct">
                  <Row>
                    <Col sm={6}>
                      <div className="form-group">
                        <select
                          className="form-control"
                          // value={pet_id}
                          // onChange={(e) => setpet_id(e.target.value)}
                        >
                          <option>Choose....</option>
                          {productDetails?.variations &&
                            productDetails?.variations.map((item) => (
                              // <a onClick={(e) => setpet_id(item)}>
                              <option>{item.type}</option>
                            ))}
                        </select>
                        {/* <label >Size</label> */}
                        {/* <select className="form-control"> */}
                        {/* <option>Select size</option>
                          <option>5KG</option>
                          <option>10KG</option>
                          <option>15KG</option>
                          <option>20KG</option>
                          <option>30KG</option>
                        </select> */}
                      </div>
                    </Col>
                    <Col sm={2}>
                      <div className="quantity-btn">
                        <form>
                          <div className="form-group">
                            <input
                              type="number"
                              className="form-control"
                              id="exampleInputEmail1"
                              aria-describedby="emailHelp"
                              placeholder="Enter Quantity"
                            />
                          </div>
                        </form>
                      </div>
                    </Col>
                  </Row>
                </div>
                <div className="needplaceProduct">
                  <div className="product-deatils-price">
                    <Row>
                      <Col lg={3}>
                        <p>{`₹${productDetails.price}`}</p>
                        {/* {`₹${item.price - (item.price * item.discount / 100)}` */}
                      </Col>
                      <Col lg={4}>
                        <h5>
                          {" "}
                          {`₹${
                            productDetails.price -
                            (productDetails.price * productDetails.discount) /
                              100
                          }`}
                        </h5>
                      </Col>
                      <Col lg={5}>
                        <h6>Your save 100 RS</h6>
                      </Col>
                    </Row>
                  </div>
                </div>
                <h5>About Us</h5>
                <Table responsive>
                  <tbody>
                    <tr>
                      <th>Brand</th>
                      <td>Mars Petcare Inc</td>
                    </tr>
                    <tr>
                      <th>Flavour</th>
                      <td>Chicken</td>
                    </tr>
                    <tr>
                      <th>Diet type</th>
                      {/* <td>Non Vegetarian</td> */}
                      <td>
                        {productDetails.Veg === "0"
                          ? "Vegetarian"
                          : "Non Vegetarian"}
                      </td>
                    </tr>
                    <tr>
                      <th>Age Range</th>
                      <td>Adult</td>
                    </tr>
                    <tr>
                      <th>Traget Species</th>
                      <td>Dog</td>
                    </tr>
                    <tr>
                      <th>Item From</th>
                      <td>Pellet</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </Col>
          </Row>
          <div className="productBTNaddcard">
            <Button>
              <Link to="/add-cart">
                <i className="fa fa-shopping-bag" /> Add to cart
              </Link>
            </Button>
          </div>
          <h1 className="main-head mt-4">Product details</h1>
          <p>{productDetails.description}</p>
        </Container>
      </section>
      <Container fluid className="p-0">
        <div className="product-innerBanner">
          <img src={product} />
        </div>
      </Container>

      <section className="section-padding food">
        <Container>
          <div className="text-left">
            <h1 className="main-head">Related products</h1>
          </div>
          <div className="needplace">
            <Row>
              <Col lg={3} sm={6} xs={6} className="mb-4">
                <div className="food-product">
                  <i class="fa fa-heart-o" />
                  <Link to="/product-details">
                    <div className="text-center">
                      <img src={product1} />
                    </div>
                    <div>
                      <h6>Farmina</h6>
                      <p>asdsdsdadwe sdseded sded</p>
                    </div>
                    <div className="product-bag">
                      <Row>
                        <Col className="align-self-center">
                          <h6>₹100.00</h6>
                        </Col>
                        <Col>
                          <Link to="">
                            <img src={bag} />
                          </Link>
                        </Col>
                      </Row>
                    </div>
                  </Link>
                </div>
              </Col>
              <Col lg={3} sm={6} xs={6} className="mb-4">
                <div className="food-product">
                  <i class="fa fa-heart-o" />
                  <Link to="/product-details">
                    <div className="text-center">
                      <img src={product1} />
                    </div>
                    <div>
                      <h6>Farmina</h6>
                      <p>asdsdsdadwe sdseded sded</p>
                    </div>
                    <div className="product-bag">
                      <Row>
                        <Col>
                          <p>₹999.00</p>
                        </Col>
                        <Col>
                          <h5>20%</h5>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="align-self-center">
                          <h6>₹100.00</h6>
                        </Col>
                        <Col>
                          <Link to="">
                            <img src={bag} />
                          </Link>
                        </Col>
                      </Row>
                    </div>
                  </Link>
                </div>
              </Col>
              <Col lg={3} sm={6} xs={6} className="mb-4">
                <div className="food-product">
                  <i class="fa fa-heart-o" />
                  <Link to="/product-details">
                    <div className="text-center">
                      <img src={product1} />
                    </div>
                    <div>
                      <h6>Farmina</h6>
                      <p>asdsdsdadwe sdseded sded</p>
                    </div>
                    <div className="product-bag">
                      <Row>
                        <Col>
                          <p>₹999.00</p>
                        </Col>
                        <Col>
                          <h5>20%</h5>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="align-self-center">
                          <h6>₹100.00</h6>
                        </Col>
                        <Col>
                          <Link to="">
                            <img src={bag} />
                          </Link>
                        </Col>
                      </Row>
                    </div>
                  </Link>
                </div>
              </Col>
              <Col lg={3} sm={6} xs={6} className="mb-4">
                <div className="food-product">
                  <i class="fa fa-heart-o" />
                  <Link to="/product-details">
                    <div className="text-center">
                      <img src={product1} />
                    </div>
                    <div>
                      <h6>Farmina</h6>
                      <p>asdsdsdadwe sdseded sded</p>
                    </div>
                    <div className="product-bag">
                      <Row>
                        <Col>
                          <p>₹999.00</p>
                        </Col>
                        <Col>
                          <h5>20%</h5>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="align-self-center">
                          <h6>₹100.00</h6>
                        </Col>
                        <Col>
                          <Link to="">
                            <img src={bag} />
                          </Link>
                        </Col>
                      </Row>
                    </div>
                  </Link>
                </div>
              </Col>
              <Col lg={3} sm={6} xs={6} className="mb-4">
                <div className="food-product">
                  <i class="fa fa-heart-o" />
                  <Link to="/product-details">
                    <div className="text-center">
                      <img src={product1} />
                    </div>
                    <div>
                      <h6>Farmina</h6>
                      <p>asdsdsdadwe sdseded sded</p>
                    </div>
                    <div className="product-bag">
                      <Row>
                        <Col>
                          <p>₹999.00</p>
                        </Col>
                        <Col>
                          <h5>20%</h5>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="align-self-center">
                          <h6>₹100.00</h6>
                        </Col>
                        <Col>
                          <Link to="">
                            <img src={bag} />
                          </Link>
                        </Col>
                      </Row>
                    </div>
                  </Link>
                </div>
              </Col>
              <Col lg={3} sm={6} xs={6} className="mb-4">
                <div className="food-product">
                  <i class="fa fa-heart-o" />
                  <Link to="/product-details">
                    <div className="text-center">
                      <img src={product1} />
                    </div>
                    <div>
                      <h6>Farmina</h6>
                      <p>asdsdsdadwe sdseded sded</p>
                    </div>
                    <div className="product-bag">
                      <Row>
                        <Col>
                          <p>₹999.00</p>
                        </Col>
                        <Col>
                          <h5>20%</h5>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="align-self-center">
                          <h6>₹100.00</h6>
                        </Col>
                        <Col>
                          <Link to="">
                            <img src={bag} />
                          </Link>
                        </Col>
                      </Row>
                    </div>
                  </Link>
                </div>
              </Col>
              <Col lg={3} sm={6} xs={6} className="mb-4">
                <div className="food-product">
                  <i class="fa fa-heart-o" />
                  <Link to="/product-details">
                    <div className="text-center">
                      <img src={product1} />
                    </div>
                    <div>
                      <h6>Farmina</h6>
                      <p>asdsdsdadwe sdseded sded</p>
                    </div>
                    <div className="product-bag">
                      <Row>
                        <Col>
                          <p>₹999.00</p>
                        </Col>
                        <Col>
                          <h5>20%</h5>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="align-self-center">
                          <h6>₹100.00</h6>
                        </Col>
                        <Col>
                          <Link to="">
                            <img src={bag} />
                          </Link>
                        </Col>
                      </Row>
                    </div>
                  </Link>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </section>
      <Footer />
    </>
  );
}

export default Productdetail;
