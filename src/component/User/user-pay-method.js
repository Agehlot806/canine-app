import React from "react";
import Newheader from "../../directives/newheader";
import { Col, Row, Container, Form, Button } from "react-bootstrap";
import CreditCardwholeseller from "../../assets/images/img/Credit CardWholeseller.png";
import paydone from "../../assets/images/icon/paydone.png";
import card1 from "../../assets/images/img/card1.png";
import card2 from "../../assets/images/img/card2.png";
import card3 from "../../assets/images/img/card3.png";
import Footer from "../../directives/footer";
import { Link, Navigate, useNavigate } from "react-router-dom";
import GooglePayButton from "@google-pay/button-react";

function Userpaymethod() {
  const Navigate = useNavigate();
  const handlePressClose = () => {
    setTimeout(() => {
      Navigate("/shipping");
    }, 250);
  };
  return (
    <>
      <Newheader />
      <section className="section-padding ">
        <Container>
          <Row className="justify-content-center">
            <Col lg={6}>
              <div className="payment-area">
                <GooglePayButton
                  environment="TEST"
                  paymentRequest={{
                    apiVersion: 2,
                    apiVersionMinor: 0,
                    allowedPaymentMethods: [
                      {
                        type: "CARD",
                        parameters: {
                          allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
                          allowedCardNetworks: ["MASTERCARD", "VISA"],
                        },
                        tokenizationSpecification: {
                          type: "PAYMENT_GATEWAY",
                          parameters: {
                            gateway: "example",
                            gatewayMerchantId: "exampleGatewayMerchantId",
                          },
                        },
                      },
                    ],
                    merchantInfo: {
                      merchantId: "123456796533",
                      merchantName: "Demo Merchant",
                    },
                    transactionInfo: {
                      totalPriceStatus: "FINAL",
                      totalPriceLabel: "Total",
                      totalPrice: "1",
                      currencyCode: "USD",
                      countryCode: "US",
                    },
                    shippingAddressRequired: true,
                    callbackIntents: ["PAYMENT_AUTHORIZATION"],
                  }}
                  onLoadPaymentData={(paymentRequest) => {
                    console.log(paymentRequest);
                  }}
                  onPaymentAuthorized={(paymentData) => {
                    console.log("paymentData " + paymentData);
                    return { transactionState: "SUCCESS" };
                  }}
                  existingPaymentMethodRequired="false"
                  buttonColor="black"
                  buttonType="buy"
                  className="payment-btnNew"
                ></GooglePayButton>
                <div className="select-card select-card3">
                  <div className="selct-card-text">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="exampleRadios"
                    />
                    <p>Cash On Delivery</p>
                  </div>
                </div>
              </div>
             
              <div className="pay-btn">
                <Button data-toggle="modal" data-target="#paysubmit">
                  Pay
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <Footer />

      {/* Modal */}
      <div
        className="modal fade"
        id="paysubmit"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <div className="payment-done">
                <img src={paydone} />
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesettingLorem Ipsum is simply dummy text of the printing
                  and typesetting
                </p>
                <Button
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={() => handlePressClose()}
                >
                  Done
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Userpaymethod;
