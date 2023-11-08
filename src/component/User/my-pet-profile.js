import React from "react";
import Newheader from "../../directives/newheader";
import { Col, Container, Row } from "react-bootstrap";
import banner from "../../assets/images/banner/banner.png";
import cat from "../../assets/images/banner/cat.png";
import dog1 from "../../assets/images/img/dog1.svg";
import cat1 from "../../assets/images/img/cat1.png";
import Footer from "../../directives/footer";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../Constant/Index";

function Mypetprofile() {
  const [allpetprofiles, setpetprofiles] = useState([]);

  const customer_id = localStorage.getItem("userInfo");
  let storedUserId = JSON.parse(customer_id);

  useEffect(() => {
    allPetProfiles();
  }, []);
  const allPetProfiles = async () => {
    axios
      .get(`${BASE_URL}/auth/get_pet/${storedUserId}`)
      .then((response) => {
        console.log(response);
        setpetprofiles(response.data.data);
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
          <img src={banner} />
        </div>
      </Container>
      {/* <section className='section-padding'>
                <Container>
                    <div className='all-bg'>
                        <img src={cat} />
                    </div>
                </Container>
            </section> */}

      <section className="section-padding">
        <Container>
          <Row className="justify-content-center">
            {allpetprofiles.map((item) => (
              <Col lg={8}>
                <div className="service-pet-card">
                  <Row>
                    <Col sm={6} className="align-self-center">
                      <div className="pet-img-ser">
                        <img
                          src={
                            "https://canine.hirectjob.in//public/" + item.image
                          }
                        />
                      </div>
                    </Col>
                    <Col sm={6}>
                      <div className="pet-status">
                        <h6>{item.age}</h6>
                      </div>
                      <div className="pet-text-ser">
                        <div>
                          <h4>Pet Name : {item.pet_name}</h4>
                          <h4>Gender : {item.gender}</h4>
                          <h4>DOB : {item.dob}</h4>
                          <h4>Breeds : {item.breeds}</h4>
                        </div>
                        {/* <div className="pet-icon-ser">
                          <a>
                            <i class="fa fa-pencil" />
                          </a>
                          <a>
                            <i class="fa fa-trash-o" />
                          </a>
                        </div> */}
                      </div>
                    </Col>
                  </Row>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <Footer />
    </>
  );
}

export default Mypetprofile;
