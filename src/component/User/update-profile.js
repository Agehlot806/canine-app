import React from "react";
import Newheader from '../../directives/newheader';;
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Footer from "../../directives/footer";

function Updateprofile() {
  return (
    <>
      <Newheader />
      <section className="section-padding">
        <Container>
          <Row className="justify-content-center mt-3">
            <Col lg={10}>
              <h1 className="main-head text-center">Profile</h1>
              <div className="contact-form">
                <Form>
                  <Form.Group className="mb-3" controlId="formGridAddress1">
                    <Form.Label>
                      Email<span style={{ color: "#008efd" }}>*</span>
                    </Form.Label>
                    <Form.Control placeholder="Enter email" type="email" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formGridAddress1">
                    <Form.Label>
                      Phone<span style={{ color: "#008efd" }}>*</span>
                    </Form.Label>
                    <Form.Control
                      placeholder="Enter phone"
                      type="number"
                      maxLength={10}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formGridAddress1">
                    <Form.Label>
                      Profile Upload
                      <span style={{ color: "#008efd" }}>*</span>
                    </Form.Label>
                    <Form.Control input type="file" />
                  </Form.Group>

                  <Button className="mt-4">Submit</Button>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <Footer />
    </>
  );
}

export default Updateprofile;
