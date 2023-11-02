import React, { useEffect, useState } from "react";
import Newheader from "../../directives/newheader";
import Footer from "../../directives/footer";
import cart from "../../assets/images/icon/cart.png";
import { Col, Container, Row } from "react-bootstrap";
import axios from "axios";
import { BASE_URL } from "../../Constant/Index";
import loadinggif from "../../assets/images/video/loading.gif";

const Offersdetails = () => {
  const [couponlist, setcouponlist] = useState([]);

  
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    Promise.all([couponlistdata()])
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);
  const couponlistdata = async () => {
    axios
      .get(`${BASE_URL}/coupon/list`)
      .then((response) => {
        console.log(response);
        setcouponlist(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const gradientColors = [
    "linear-gradient(180deg, #FFF0BA 0%, rgba(251.81, 233.11, 165.78, 0) 100%)",
    "linear-gradient(180deg, #C7EBFF 0%, rgba(199, 235, 255, 0) 100%)",
    "linear-gradient(180deg, #FECBF0 0%, rgba(254, 203, 240, 0) 100%)",
    "linear-gradient(180deg, #C8FFBA 0%, rgba(200, 255, 186, 0) 100%)",
  ];
  // const gradientColorsText = [
  //   "linear-gradient(180deg, #FECBF0 0%, rgba(254, 203, 240, 0) 100%)",
  //   "linear-gradient(180deg, #C8FFBA 0%, rgba(200, 255, 186, 0) 100%)",
  //   "linear-gradient(180deg, #FFF0BA 0%, rgba(251.81, 233.11, 165.78, 0) 100%)",
  //   "linear-gradient(180deg, #C7EBFF 0%, rgba(199, 235, 255, 0) 100%)",
  // ];
  return (
    <>
      {" "}
      <Newheader />
      {loading ? (
        <div className="text-center text-black mb-4">
        <img src={loadinggif} alt=""/>
        <h5>Please Wait.......</h5>
      </div>
      ) : (<>
      <section className="section-padding">
        <Container>
          {/* <Row> */}
          {/* {couponlist && couponlist.length > 0 ? (
              couponlist.map((item, index) => (
                <Col lg={3}>
                  <div
                    className="coupenCard"
                    style={{
                      background:
                        gradientColors[index % gradientColors.length],
                    }}
                  >

                    <div className="" key={index}>
                      <table>
                        <tbody>
                          <tr>
                            <th>Title : </th>
                            <td>{item.title}</td>
                          </tr>
                          <tr>
                            <th>Code : </th>
                            <td>{item.code}</td>
                          </tr>
                          <tr>
                            <th>Discount Type : </th>
                            <td>{item.discount_type}</td>
                          </tr>
                          <tr>
                            <th>Discount : </th>
                            <td>{item.discount}</td>
                          </tr>
                          <tr>
                            <th>Min Purchase : </th>
                            <td>{item.min_purchase}</td>
                          </tr>
                          <tr>
                            <th>Max Discount : </th>
                            <td>{item.max_discount}</td>
                          </tr>
                          <tr>
                            <th>Start Date : </th>
                            <td>{item.start_date}</td>
                          </tr>
                          <tr>
                            <th>Expire Date : </th>
                            <td>{item.expire_date}</td>
                          </tr>
                        </tbody>
                      </table>

                    </div>

                  </div>
                </Col>
              ))
            ) : (
              <p className="emptyMSG">No Coupon List.</p>
            )} */}
          <div className="text-center mb-4">
            <h1>Top Offers</h1>
            <h6>You Can't Miss!</h6>
          </div>
          <Row>

            {couponlist && couponlist.length > 0 ? (
              couponlist.map((item, index) => (
                <Col lg={3} sm={4} className="mb-4">
                  <div className="flip-card" >
                    <div className="flip-card-inner">
                      <div className="flip-card-front" style={{
                        background:
                          gradientColors[index % gradientColors.length],
                      }}>
                        <h1 >{item.title}</h1>
                        <h3><b>Flat</b> <br />{item.discount} % OFF</h3>
                      </div>
                      <div className="flip-card-back" style={{
                        background:
                          gradientColors[index % gradientColors.length],
                      }}>
                        <table>
                          <tbody>
                            <tr>
                              <th>Min Purchase : </th>
                              <td>{item.min_purchase}</td>
                            </tr>
                            <tr>
                              <th>Max Discount : </th>
                              <td>{item.max_discount}</td>
                            </tr>
                            <tr>
                              <th>Start Date  : </th>
                              <td>{item.start_date}</td>
                            </tr>
                            <tr>
                              <th>Expire Date : </th>
                              <td>{item.expire_date}</td>
                            </tr>
                          </tbody>
                        </table>

                      </div>
                    </div>
                  </div>
                </Col>
              ))
            ) : (
              <p className="emptyMSG">No Offer Deatils.</p>
            )}
          </Row>
        </Container>
      </section>
      </>)}
      
      <Footer />
    </>
  );
};

export default Offersdetails;
