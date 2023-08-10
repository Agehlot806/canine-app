import React, { useState, useEffect } from "react";
import Newheader from '../../directives/newheader';;
import { Container, Row, Col, Button, Table } from "react-bootstrap";
import { BASE_URL } from "../../Constant/Index";
import axios from "axios";
import Footer from "../../directives/footer";

function Allveterinary() {
  const [veterinaryget, setveterinaryget] = useState([]);

  useEffect(() => {
    fetchVeterinaryget();
  }, []);

  const fetchVeterinaryget = async () => {
    try {
      const response = await fetch(`${BASE_URL}/banners/get_veterinary`);
      const jsonData = await response.json();
      setveterinaryget(jsonData.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <>
      <Newheader />
      <section className="section-padding">
        <Container>
          <h1 className="main-head">All Veterinary</h1>
          <div className="needplace">
            <Row>
              {veterinaryget &&
                veterinaryget.map((item) => (
                  <Col lg={4} className="mb-4">
                    <div
                      className="veterinary-card veterinary-bg1"
                      key={item.id}
                    >
                      <div className="veterinary-status">
                        <h6>{item.date}</h6>
                      </div>
                      <div className="veterinary-head-text">
                        <div className="veterinary-detail">
                          <Table>
                            <tbody>
                              <tr>
                                <th>Name:</th>
                                <td>{item.user_name}</td>
                              </tr>
                              <tr>
                                <th>Address:</th>
                                <td>{item.address}</td>
                              </tr>
                              <tr>
                                <th>State:</th>
                                <td>{item.state}</td>
                              </tr>
                              <tr>
                                <th>Email:</th>
                                <td>{item.email}</td>
                              </tr>
                              <tr>
                                <th>Phone:</th>
                                <td>{item.phone}</td>
                              </tr>
                              <tr>
                                <th>Pet Problem :</th>
                                <td>{item.pet_problem}</td>
                              </tr>
                            </tbody>
                          </Table>
                        </div>
                      </div>
                    </div>
                  </Col>
                ))}
            </Row>
          </div>
        </Container>
      </section>
      <Footer />
    </>
  );
}

export default Allveterinary;
