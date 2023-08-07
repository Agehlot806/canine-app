import React, { useState, useEffect } from 'react'
import Header from '../../directives/header'
import { Container, Row, Col, Button, Table } from 'react-bootstrap'
import { BASE_URL } from "../../Constant/Index";
import axios from "axios";
import Footer from '../../directives/footer';

function Allservicebooking() {
    const [allservicebooking, setallservicebooking] = useState([]);

    useEffect(() => {
        fetchAllservicebooking();
    }, []);

    const fetchAllservicebooking = async () => {
        try {
            const response = await fetch(`${BASE_URL}/banners/get_allservicebooking`);
            const jsonData = await response.json();
            setallservicebooking(jsonData.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    return (
        <>
            <Header />
            <section className='section-padding'>
                <Container>
                    <h1 className="main-head">All Service Booking</h1>
                    <div className="needplace">
                        <Row>
                            {allservicebooking &&
                                allservicebooking.map((item) => (
                                    <Col lg={4} className='mb-4'>
                                        <div className='veterinary-card veterinary-bg1' key={item.id}>
                                            <div className='veterinary-status'>
                                                <h6>{item.date}</h6>
                                            </div>
                                            <div className='veterinary-head-text'>
                                                <div className='veterinary-detail'>
                                                    <Table>
                                                        <tbody>
                                                            <tr>
                                                                <th>Pet :</th>
                                                                <td>{item.pet}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>City :</th>
                                                                <td>{item.city}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>Mobile :</th>
                                                                <td>{item.mobile}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>Slot Timing :</th>
                                                                <td>{item.slot}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>Status :</th>
                                                                <td>{item.status}</td>
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
    )
}

export default Allservicebooking