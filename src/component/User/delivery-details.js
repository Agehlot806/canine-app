import React, { useEffect, useState } from "react";
import Newheader from "../../directives/newheader";
import Footer from "../../directives/footer";
import cart from "../../assets/images/icon/cart.png";
import { Col, Container, Row } from "react-bootstrap";
import { BASE_URL } from "../../Constant/Index";
import axios from "axios";
import productdetail from "../../assets/images/banner/productdetail.png";


const Deliverydetails = () => {
  const [addresslist, setaddresslist] = useState([]);
// storedUserId
const customer_id = localStorage.getItem("userInfo");
console.log("=======>>>>>> id", customer_id);
let storedUserId = JSON.parse(customer_id);
console.log("customer_id: ", customer_id);
// ----------------------------------------
  useEffect(() => {
    allAddressList();
  }, []);

  const allAddressList = async () => {
    axios
      .get(`${BASE_URL}/customer/address/list/${storedUserId}`)
      .then((response) => {
        console.log(response);
        console.log("address list Successful");
        setaddresslist(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Newheader />
      <Container fluid className="p-0">
        <div className="all-bg">
          <img src={productdetail} />
        </div>
      </Container>
      <section className="section-padding">
        <Container>
          <Row>
            <Col lg={12}>

            
        <h1 className="main-head">Delivery Details</h1>
          <div className="address-Content">
            {addresslist && addresslist.length > 0 ? (
              addresslist.map((item, index) => (
                <div className="chk-address" key={item.id}>
                  <div className="Daynamic-address">
                    <table>
                      <tr>
                        <th>Name:&nbsp;</th>
                        <td>
                          {item.first_name}&nbsp;
                          {item.last_name}
                        </td>
                      </tr>
                      <tr>
                        <th>Address:&nbsp;</th>
                        <td>
                          {item.house_no} {item.area}{" "}
                          {item.landmark} {item.city}{" "}
                          {item.state} {item.pincode}
                        </td>
                      </tr>
                      <tr>
                        <th>Mobile:&nbsp;</th>
                        <td>{item.mobile}</td>
                      </tr>
                    </table>
                    
                  </div>
                </div>
              ))
            ) : (
              <p>No Addresses Available</p>
            )}
          </div>

          </Col>
          </Row>
        </Container>
      </section>
      <Footer />
    </>
  );
};

export default Deliverydetails;
