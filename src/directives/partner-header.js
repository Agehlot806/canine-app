import React from 'react'
import {Container,Navbar} from 'react-bootstrap';
import Logo from '../assets/images/logo.png'
function Partnerheader() {
  return (
    <div>
       <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/partner-dashboad">
            <img
              src={Logo}
              width="60"
              height="60"
              className="d-inline-block align-top"
              alt="logo"
            />
          </Navbar.Brand>
        </Container>
      </Navbar>
    </div>
  )
}

export default Partnerheader
