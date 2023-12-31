import React, { useEffect, useState } from 'react'
import { Navbar, Nav, Form, NavDropdown, Container, Button, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import logo from '../assets/images/logo.png'
import pro from '../assets/images/icon/pro.png'
import { BASE_URL } from '../Constant/Index'

function Header() {
  const [notification, setnotification] = useState([]);

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/customer/notifications?tergat=customer`);
      setnotification(response.data.data);
    }
    catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <Navbar expand="lg" className="navbar-area">
        <Container fluid>
          <Navbar.Brand><Link to='/' className='logoBG'><img src={logo} /></Link></Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll" className="menu-mobile">
            <Row>
              <Col>
                <Nav
                  className="ml-auto my-2 my-lg-0 "
                // style={{ maxHeight: '100px' }}
                // navbarScroll
                >
                  {/* <Nav.Link><Link to='/dashboad'>Dashboard</Link></Nav.Link> */}
                  <Nav.Link><Link to='/'>Home</Link></Nav.Link>
                  <Nav.Link><Link to=''>New</Link></Nav.Link>
                  <NavDropdown title="Dogs" id="navbarScrollingDropdown" >
                    <div className='scroll-bar'>
                      <Row className='longdrop'>
                        <Col lg={6}>

                          <NavDropdown.Item>
                            <h3>Dog Food</h3>
                            <Link to=''>Dry Food</Link>
                          </NavDropdown.Item>
                          <NavDropdown.Item>
                            <Link to=''>Wet Food</Link>
                          </NavDropdown.Item>
                          <NavDropdown.Item>
                            <Link to=''>Premium Food</Link>
                          </NavDropdown.Item>
                          <NavDropdown.Item>
                            <Link to=''>Fresh Meals</Link>
                          </NavDropdown.Item>
                          <NavDropdown.Item>
                            <Link to=''>Vegetarian Food</Link>
                          </NavDropdown.Item>
                        </Col>
                        <Col lg={6}>
                          <NavDropdown.Item>
                            <h3>Treats</h3>
                            <Link to=''>Biscuits & Cookies</Link>
                          </NavDropdown.Item>
                          <NavDropdown.Item>
                            <Link to=''>Dental treats</Link>
                          </NavDropdown.Item>
                          <NavDropdown.Item>
                            <Link to=''>Freeze-Dried Treats</Link>
                          </NavDropdown.Item>
                          <NavDropdown.Item>
                            <Link to=''>Functional & Training Treats</Link>
                          </NavDropdown.Item>
                          <NavDropdown.Item>
                            <Link to=''>Jerkies</Link>
                          </NavDropdown.Item>
                          <NavDropdown.Item>
                            <Link to=''>Natural Treats</Link>
                          </NavDropdown.Item>
                          <NavDropdown.Item>
                            <Link to=''>Soft & Chewy Treats</Link>
                          </NavDropdown.Item>
                        </Col>
                      </Row>
                      <div className="needplace">
                        <Row className='longdrop'>
                          <Col lg={6}>
                            <NavDropdown.Item>
                              <h3>Supplies</h3>
                              <Link to=''>Toys</Link>
                            </NavDropdown.Item>
                            <NavDropdown.Item>
                              <Link to=''>Bedding</Link>
                            </NavDropdown.Item>
                            <NavDropdown.Item>
                              <Link to=''>Bowls & Feeders</Link>
                            </NavDropdown.Item>
                            <NavDropdown.Item>
                              <Link to=''>Cleaning & Potty</Link>
                            </NavDropdown.Item>
                            <NavDropdown.Item>
                              <Link to=''>Training & Behaviour</Link>
                            </NavDropdown.Item>
                            <NavDropdown.Item>
                              <Link to=''>Carriers & Travel</Link>
                            </NavDropdown.Item>
                            <NavDropdown.Item>
                              <Link to=''>Grooming</Link>
                            </NavDropdown.Item>
                            <NavDropdown.Item>
                              <Link to=''>Gates, Crates & Pens</Link>
                            </NavDropdown.Item>
                          </Col>
                          <Col lg={6}>
                            <NavDropdown.Item>
                              <h3>Accessories</h3>
                              <Link to=''>Bows & Bandanas</Link>
                            </NavDropdown.Item>
                            <NavDropdown.Item>
                              <Link to=''>Collars & Leashes</Link>
                            </NavDropdown.Item>
                            <NavDropdown.Item>
                              <Link to=''>Harnesses</Link>
                            </NavDropdown.Item>
                            <NavDropdown.Item>
                              <Link to=''>Personalised Tags</Link>
                            </NavDropdown.Item>
                            <NavDropdown.Item>
                              <Link to=''>Sweaters, Raincoats & Shoes</Link>
                            </NavDropdown.Item>
                            <NavDropdown.Item>
                              <Link to=''>Harry Potter Limited Edition</Link>
                            </NavDropdown.Item>
                            <NavDropdown.Item>
                              <Link to=''>Tom & Jerry Limited Edition</Link>
                            </NavDropdown.Item>
                          </Col>
                        </Row>
                      </div>
                      <div className="needplace">
                        <Row className='longdrop'>
                          <Col lg={6}>
                            <NavDropdown.Item>
                              <h3>Health Care</h3>
                              <Link to=''>Health Care Aids</Link>
                            </NavDropdown.Item>
                            <NavDropdown.Item>
                              <Link to=''>Vitamins & Supplements</Link>
                            </NavDropdown.Item>
                            <NavDropdown.Item>
                              <Link to=''>Flea & Tick</Link>
                            </NavDropdown.Item>
                          </Col>

                        </Row>
                      </div>
                    </div>
                  </NavDropdown>
                  <NavDropdown title="Cats" id="navbarScrollingDropdown">
                    <div className='scroll-bar'>
                      <Row className='longdrop'>
                        <Col lg={6}>
                          <NavDropdown.Item>
                            <h3>Cat Food & Treats</h3>
                            <Link to=''>Wet Food</Link>
                          </NavDropdown.Item>
                          <NavDropdown.Item>
                            <Link to=''>Treats</Link>
                          </NavDropdown.Item>
                        </Col>
                        <Col lg={6}>
                          <NavDropdown.Item>
                            <h3>Cat Litter & Accessories</h3>
                            <Link to=''>Cat Litter</Link>
                          </NavDropdown.Item>
                          <NavDropdown.Item>
                            <Link to=''>Cat Litter trays</Link>
                          </NavDropdown.Item>
                          <NavDropdown.Item>
                            <Link to=''>Cat Litter Scoops</Link>
                          </NavDropdown.Item>
                          <NavDropdown.Item>
                            <Link to=''>Cleaners & Deordorisers</Link>
                          </NavDropdown.Item>
                        </Col>
                      </Row>
                      <div className="needplace">
                        <Row className='longdrop'>
                          <Col lg={6}>
                            <NavDropdown.Item>
                              <h3>Cat Supplies</h3>
                              <Link to=''>Toys</Link>
                            </NavDropdown.Item>
                            <NavDropdown.Item>
                              <Link to=''>Dinning Accessories</Link>
                            </NavDropdown.Item>
                            <NavDropdown.Item>
                              <Link to=''>Cat Grooming</Link>
                            </NavDropdown.Item>
                            <NavDropdown.Item>
                              <Link to=''>Carriers & Travel</Link>
                            </NavDropdown.Item>
                            <NavDropdown.Item>
                              <Link to=''>Furniture & Scratchers</Link>
                            </NavDropdown.Item>
                            <NavDropdown.Item>
                              <Link to=''>Cat Bedding</Link>
                            </NavDropdown.Item>
                          </Col>
                          <Col lg={6}>
                            <NavDropdown.Item>
                              <h3>Cat Accessories</h3>
                              <Link to=''>Cat Collars</Link>
                            </NavDropdown.Item>
                            <NavDropdown.Item>
                              <Link to=''>Cat Harness & Leash</Link>
                            </NavDropdown.Item>
                            <NavDropdown.Item>
                              <Link to=''>Personalised Tags</Link>
                            </NavDropdown.Item>
                          </Col>
                        </Row>
                      </div>
                      <div className="needplace">
                        <Row className='longdrop'>
                          <Col lg={6}>
                            <NavDropdown.Item>
                              <h3>Health Care</h3>
                              <Link to=''>Vitamins & Supplements</Link>
                            </NavDropdown.Item>
                            <NavDropdown.Item>
                              <Link to=''>Flea & Tick</Link>
                            </NavDropdown.Item>
                          </Col>

                        </Row>
                      </div>
                    </div>
                  </NavDropdown>
                  <Nav.Link><Link to='/about-us'>about us</Link></Nav.Link>
                  <Nav.Link><Link to='/service'>our services</Link></Nav.Link>

                  <NavDropdown title="Products" id="navbarScrollingDropdown">
                    <NavDropdown.Item><Link to='/product'>All Product</Link></NavDropdown.Item>
                    <NavDropdown.Item>
                      <Link to='/canine-product'>Canine Product</Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                      <Link to='/patners-product'>Patners Product</Link>
                    </NavDropdown.Item>
                  </NavDropdown>


                  <NavDropdown title="PetCare" id="navbarScrollingDropdown">
                    <NavDropdown.Item>
                      <Link to='/veterinary-service'>Veterinary Service</Link></NavDropdown.Item>
                    {/* <NavDropdown.Item>
                  Carering Service
                </NavDropdown.Item> */}
                  </NavDropdown>
                  <Nav.Link><Link to='/contact'>contact</Link></Nav.Link>

                </Nav>
              </Col>
            </Row>
            <Form className="d-flex nav-btn">
              {/* <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              /> */}
              <div className="header-inner-addon input-container">
                <i className="fa fa-search" />
                <input placeholder="Search" type="search" className="form-control" aria-label="Search" />
              </div>
              <Button className="blue-btn" data-toggle="modal" data-target="#exampleModal"><i class="fa fa-bell-o" /></Button>

              {/* <Button className="yellow-btn"><Link to='/login' >Sign In</Link></Button> */}
              <Button className="blue-btn"><Link to='/signup' >Register</Link></Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>



      {/* Modal */}
      <div className="modal fade notification-area" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            {/* <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Notification</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div> */}
            <div className="modal-body">
              <h5>Notification</h5>
              {notification && notification.length > 0 ? (
                notification.map((item, index) => (
                  <div className='notification'>
                    <Row>
                      <Col lg={2}>
                        <img src={pro} />
                      </Col>
                      <Col lg={10} className='align-self-center'>
                        <h6>{item.tergat}</h6>
                      </Col>
                    </Row>
                  </div>
                ))
              ) : (
                <p className="emptyMSG">No Notification</p>
              )}
              {/* <div className='notification'>
                <Row>
                  <Col lg={2}>
                    <img src={pro} />
                  </Col>
                  <Col lg={10} className='align-self-center'>
                    <h6>Comment on your announce Alpina B12-Alpina...</h6>
                  </Col>
                </Row>
              </div>
              <div className='notification'>
                <Row>
                  <Col lg={2}>
                    <img src={pro} />
                  </Col>
                  <Col lg={10} className='align-self-center'>
                    <h6>Comment on your announce Alpina B12-Alpina...</h6>
                  </Col>
                </Row>
              </div>
              <div className='notification'>
                <Row>
                  <Col lg={2}>
                    <img src={pro} />
                  </Col>
                  <Col lg={10} className='align-self-center'>
                    <h6>Comment on your announce Alpina B12-Alpina...</h6>
                  </Col>
                </Row>
              </div> */}
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
            {/* <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary">Save changes</button>
            </div> */}
          </div>
        </div>
      </div>
    </>
  )
}

export default Header