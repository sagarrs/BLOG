import React from 'react'
import {Nav, Navbar, Badge} from 'react-bootstrap'

class Navigation extends React.Component{
  render(){
    // console.log("nav")
    // console.log(this.props.handleAuth)
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
              <div>
                {
                  this.props.handleAuth && <Nav.Link eventKey={2} href="/logout">Logout
                                            <Badge pill variant="dark">1</Badge></Nav.Link>
                }
                {
                  !this.props.handleAuth && (
                    <div>
                      <Nav.Link href="/register">Register</Nav.Link>
                      <Nav.Link href="/login">Login</Nav.Link>
                    </div>
                  )
                }
              </div>
            </Nav>
        </Navbar.Collapse>
      </Navbar>
      </div>
    )
  }
}

export default Navigation