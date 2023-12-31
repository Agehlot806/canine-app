import React from "react";
import '../../assets/css/order-tracker.css'
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardFooter,
    MDBCardHeader,
    MDBCardImage,
    MDBCol,
    MDBContainer,
    MDBIcon,
    MDBRow,
    MDBTypography,
} from "mdb-react-ui-kit";
import Header from "../../directives/header";
import Footer from "../../directives/footer";
import { Button } from "react-bootstrap";

export default function Map() {
    return (
        <>
            <Header />
            <section className="vh-100" style={{ backgroundColor: "#eee" }}>
                <MDBContainer className="py-5 h-100">
                    <MDBRow className="justify-content-center align-items-center h-100">
                        <MDBCol>
                            <MDBCard
                                className="card-stepper"
                                style={{ borderRadius: "10px" }}
                            >
                                <MDBCardBody className="p-4">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="d-flex flex-column">
                                            <span className="lead fw-normal">
                                                Your order has been delivered
                                            </span>
                                            <span className="text-muted small">
                                                by DHFL on 21 Jan, 2020
                                            </span>
                                        </div>
                                        <div>
                                            <MDBBtn className="cancel-btn" data-toggle="modal" data-target="#cancle-order-Modal">Cancel Order</MDBBtn>
                                        </div>
                                    </div>

                                    <hr className="my-4" />

                                    <div className="d-flex flex-row justify-content-between align-items-center align-content-center">
                                        <span className="dot"></span>
                                        <hr className="flex-fill track-line" />
                                        <span className="dot"></span>
                                        <hr className="flex-fill track-line" />
                                        <span className="dot"></span>
                                        <hr className="flex-fill track-line" />
                                        <span className="dot"></span>
                                        <hr className="flex-fill track-line" />
                                        <span className="d-flex justify-content-center align-items-center big-dot dot">
                                            <MDBIcon icon="check text-white" />
                                        </span>
                                    </div>

                                    <div className="d-flex flex-row justify-content-between align-items-center">
                                        <div className="d-flex flex-column align-items-start">
                                            <span>15 Mar</span>
                                            <span>Order placed</span>
                                        </div>
                                        <div className="d-flex flex-column justify-content-center">
                                            <span>15 Mar</span>
                                            <span>Order placed</span>
                                        </div>
                                        <div className="d-flex flex-column justify-content-center align-items-center">
                                            <span>15 Mar</span>
                                            <span>Order Dispatched</span>
                                        </div>
                                        <div className="d-flex flex-column align-items-center">
                                            <span>15 Mar</span>
                                            <span>Out for delivery</span>
                                        </div>
                                        <div className="d-flex flex-column align-items-end">
                                            <span>15 Mar</span>
                                            <span>Delivered</span>
                                        </div>
                                    </div>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </section>
            <Footer />


            {/* Modal */}
            {/* Cancel Order */}
            <div className="cancle-orderModal modal fade" id="cancle-order-Modal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">

                        <div className="modal-body">
                            <h3>Cancel Order</h3>
                            <p>Are you sure you want to cancel this order?</p>
                            <MDBBtn className="bordercancle">Cancel</MDBBtn>
                            <MDBBtn data-toggle="modal" data-dismiss="modal" data-target="#cancleconfirmModal">Confirm</MDBBtn>
                        </div>
                    </div>
                </div>
            </div>


            {/* Modal */}
            {/* Select a reason for order cancellation */}
            <div className="cancle-orderModal modal fade" id="cancleconfirmModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-body">
                            <h2>Cancel Order</h2>
                            <p>Select a reason for order cancellation:</p>

                            <div className="selct-cancle">
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" defaultValue="option1" />
                                    <label className="form-check-label" htmlFor="exampleRadios1">
                                        Damaged Product
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" defaultValue="option2" />
                                    <label className="form-check-label" htmlFor="exampleRadios2">
                                        Late Delivery
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" defaultValue="option2" />
                                    <label className="form-check-label" htmlFor="exampleRadios2">
                                        Changed My Mind
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="exampleRadios"
                                        id="exampleRadios2" defaultValue="option2" data-toggle="modal" data-dismiss="modal" data-target="#exampleModalCenter" />
                                    <label className="form-check-label" htmlFor="exampleRadios2">
                                        Other
                                    </label>
                                </div>
                            </div>
                            <MDBBtn className="bordercancle">Cancel</MDBBtn>
                            <MDBBtn data-toggle="modal" data-dismiss="modal" data-target="#cancleconfirmModal">Confirm</MDBBtn>
                        </div>
                    </div>
                </div>
            </div>


            {/* Modal */}
            {/* Enter Other Reason */}
            <div className="cancle-orderModal modal fade" id="exampleModalCenter" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">

                        <div className="modal-body">
                            <h2>Enter Other Reason</h2>
                            <div className="selct-cancle">
                                <div className="form-group mt-3 mb-3">
                                    <input type="text" className="form-control" placeholder="Enter reason" />
                                </div>
                            </div>
                            <MDBBtn className="bordercancle" data-dismiss="modal">Cancel</MDBBtn>
                            <MDBBtn>Ok</MDBBtn>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}