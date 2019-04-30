import React from 'react'
import {Nav, Navbar, Badge, NavDropdown} from 'react-bootstrap'
import '../../App.css'

class Navigation extends React.Component{
  render(){
    // console.log("nav")
    // console.log(this.props.handleAuth)
    const navStyle = {
      display:"inline-block"
    };
    const heroTab = {
      paddingLeft: 100,
      paddingTop: 25,
      paddingBottom: 30,
      fontFamily: "Verdana, Geneva, sans-serif"
    };
    const linkTab = {
      paddingRight: 100,
    };

    return(
      <div>
        <Navbar collapseOnSelect expand="lg" bg="" variant="light">
          <Navbar.Brand href="/" style={heroTab}>Blogge-R-etard</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              {/* <Nav.Link href="">Features</Nav.Link>
              <Nav.Link href="">Pricing</Nav.Link> */}

            </Nav>
            
            <Nav>
              <div style={linkTab}>
                {
                  this.props.handleAuth && <Nav.Link eventKey={2} href="/logout" className="text-success">Logout
                                            <Badge pill variant="dark">1</Badge></Nav.Link>
                }
                {
                  !this.props.handleAuth && (
                    <div>
                      <Nav.Link style={navStyle} href="/login" className="text-success">Login</Nav.Link>&nbsp;&nbsp;
                      <Nav.Link className="btn btn-outline-success text-success" style={navStyle} href="/register">Get Bloggin</Nav.Link>
                    </div>
                  )
                }
              </div>
              {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                <NavDropdown.Item href="">Action</NavDropdown.Item>
                <NavDropdown.Item href="">Another action</NavDropdown.Item>
                <NavDropdown.Item href="">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="">Separated link</NavDropdown.Item>
              </NavDropdown> */}
            </Nav>
        </Navbar.Collapse>
      </Navbar>
      </div>
    )
  }
}

export default Navigation