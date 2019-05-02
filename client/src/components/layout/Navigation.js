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
        <Navbar className="shadow p-3 mb-5 bg-white rounded" collapseOnSelect expand="lg" bg="" variant="light">
          <Navbar.Brand href="/" style={heroTab}>Blogge-R-etard</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              {/* <Nav.Link href="">Features</Nav.Link>
              <Nav.Link href="">Pricing</Nav.Link> */}

            </Nav>
            
            <Nav>
              {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                  <div className="container-fluid well span6">
                    <div className="row-fluid">
                          <div className="span2" >
                          <img src="https://secure.gravatar.com/avatar/de9b11d0f9c0569ba917393ed5e5b3ab?s=140&r=g&d=mm" className="img-circle"/>
                          </div>
                          
                          <div className="span8">
                            <NavDropdown.Item>Sagar</NavDropdown.Item>
                            <NavDropdown.Item>sagar@servidor.com</NavDropdown.Item>
                            <NavDropdown.Item>software engineer</NavDropdown.Item>
                            <NavDropdown.Item>bangalore</NavDropdown.Item>
                          </div>
                    </div>
                  </div>
              </NavDropdown> */}

              <div style={linkTab}>
                {
                  this.props.handleAuth && <Nav.Link eventKey={2} href="/logout" className="text-success">Logout</Nav.Link>
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
            </Nav>
        </Navbar.Collapse>
      </Navbar>
      </div>
    )
  }
}

export default Navigation