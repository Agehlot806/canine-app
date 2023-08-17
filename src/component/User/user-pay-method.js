import React from "react";
import Newheader from "../../directives/newheader";
import { Col, Row, Container, Form, Button } from "react-bootstrap";
import CreditCardwholeseller from "../../assets/images/img/Credit CardWholeseller.png";
import card from "../../assets/images/img/cards.png";
import card1 from "../../assets/images/img/card1.png";
import card2 from "../../assets/images/img/card2.png";
import card3 from "../../assets/images/img/card3.png";
import Footer from "../../directives/footer";
import { Link } from "react-router-dom";
import GooglePayButton from "@google-pay/button-react";

function Userpaymethod() {
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
                              allowedAuthMethods: [
                                "PAN_ONLY",
                                "CRYPTOGRAM_3DS",
                              ],
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
                          merchantId: "12345678901234567890",
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
              </div>
              {/* <div className='credit-card'>
                                <img src={CreditCardwholeseller} />
                            </div> */}
              {/* <div className='select-card select-card1'>
                                <Link to="/user-upi">
                                    <div className='selct-card-text'>
                                        <input className="form-check-input" type="radio" name="exampleRadios" />
                                        <img src={card3} />
                                    </div>
                                </Link>
                            </div>
                            <div className='select-card select-card1'>
                                <div className='selct-card-text'>
                                    <input className="form-check-input" type="radio" name="exampleRadios" />
                                    <img src={card} /><p>Cradit / Debit Card</p>
                                </div>
                            </div>
                            <div className='select-card select-card2'>
                                <div className='selct-card-text'>
                                    <input className="form-check-input" type="radio" name="exampleRadios" />
                                    <img src={card1} />
                                </div>
                            </div>
                            <div className='select-card select-card3'>
                                <div className='selct-card-text'>
                                    <input className="form-check-input" type="radio" name="exampleRadios" />
                                    <img src={card2} />
                                </div>
                            </div> */}
              <div className="pay-btn">
                <Button>
                  <Link to="/user-pay">Pay</Link>
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <Footer />
    </>
  );
}

export default Userpaymethod;
