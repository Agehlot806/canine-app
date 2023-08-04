import React, { useState, useEffect } from 'react'
import Header from '../../directives/header'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { BASE_URL } from "../../Constant/Index";
import axios from "axios";
import Footer from '../../directives/footer';

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
            <Header />
            <section className='section-padding'>
                <Container>
                    <h1 className="main-head">All Veterinary</h1>
                    <div className="needplace">
                        <Row>
                            {veterinaryget &&
                                veterinaryget.map((item) => (
                                    <Col lg={4} className='mb-4'>
                                        <div className='veterinary-card veterinary-bg1' key={item.id}>
                                            <div className='wholeseller-status'>
                                                <h6>{item.date}</h6>
                                            </div>
                                            <div className='wholeseller-head-text'>
                                                <div className='wholeseller-detail'>
                                                    <h5>Name: {item.user_name}</h5>
                                                    <h6>Address: {item.address}</h6>
                                                    <a>State: {item.state}</a>
                                                    <a>City: {item.city}</a>
                                                    <p>Email: {item.email}</p>
                                                    <p>Phone: {item.phone}</p>
                                                </div>
                                                <div className='veterinary-btn'>
                                                    <Button><p>{item.pet_problem}</p></Button>
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
    )
}

export default Allveterinary