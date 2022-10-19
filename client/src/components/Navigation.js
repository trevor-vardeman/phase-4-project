import { Link } from "react-router-dom"
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

function Navigation( { currentUsername, onLogout } ) {

  function handleLogout() {
    fetch("/logout", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ currentUsername }),
    })
    onLogout()
  }

  return (
    <Navbar sticky="top" bg="dark" variant="dark">
      <Container fluid>
        <Navbar.Brand>App Name</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link as={Link} to="new">New</Nav.Link>
          {currentUsername ? <Nav.Link style={{color: "orange"}}>{currentUsername}</Nav.Link> : null}
          {currentUsername ? <Nav.Link onClick={handleLogout}>Sign Out</Nav.Link> : <Nav.Link as={Link} to="auth">Sign In</Nav.Link>}
        </Nav>
      </Container>
    </Navbar>
  )
}

export default Navigation