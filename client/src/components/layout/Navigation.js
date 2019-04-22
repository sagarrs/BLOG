import React from 'react'
import {Nav, Navbar, Badge} from 'react-bootstrap'

class Navigation extends React.Component{
  render(){
    return(
      <div>
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
          <Navbar.Brand href="/">Medium Clone</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              {/* <Nav.Link href="">Features</Nav.Link>
              <Nav.Link href="">Pricing</Nav.Link> */}

            </Nav>
            <Nav>
              <Nav.Link href="">Admin</Nav.Link>
              <Nav.Link eventKey={2} href="">Login
              <Badge pill variant="dark">1</Badge></Nav.Link>
            </Nav>
        </Navbar.Collapse>
      </Navbar>
      </div>
    )
  }
}

export default Navigation