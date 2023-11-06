import React, { useEffect, useState } from "react";
import cart from "../../assets/images/icon/cart.png";
import { Col, Container, Row } from "react-bootstrap";
import { BASE_URL } from "../../Constant/Index";
import axios from "axios";
import productdetail from "../../assets/images/banner/productdetail.png";
import PetShopHeader from "../../directives/petShopHeader";
import Petshopfooter from "../../directives/petShop-Footer";
import loadinggif from "../../assets/images/video/loading.gif";


const Petshopdeliverydetails = () => {
  const [addresslist, setAddressList] = useState([]);
// storedUserId
const customer_id = localStorage.getItem("userInfo");
console.log("=======>>>>>> id", customer_id);
let storedUserId = JSON.parse(customer_id);
console.log("customer_id: ", customer_id);
// ----------------------------------------

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    Promise.all([allAddressList()])
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const allAddressList = async () => {
    axios
      .get(`${BASE_URL}/customer/address/list/${storedUserId}`)
      .then((response) => {
        console.log(response);
        console.log("address list Successful");
        setAddressList(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
 

  return (
    <>
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
        </>
      )}
      
      <Petshopfooter />
    </>
  );
};

export default Petshopdeliverydetails;