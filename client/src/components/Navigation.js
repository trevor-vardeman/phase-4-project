import { useNavigate } from "react-router-dom"
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

function Navigation( { currentUser, onLogout } ) {
  const navigate = useNavigate()

  function handleLogout() {
    fetch("/logout", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ currentUser }),
    })
    onLogout(null)
    navigate("/")
  }

  return (
    <Navbar sticky="top" bg="dark" variant="dark">
      <Container fluid>
        <Navbar.Brand>Brand Name</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="all">All</Nav.Link>
          {currentUser ? <Nav.Link href="my-communities">My Communities</Nav.Link> : null}
        </Nav>
        <Nav>
          <Nav.Link href="new">New</Nav.Link>
          {currentUser ? <Nav.Link style={{color: "orange"}}>{currentUser}</Nav.Link> : null}
          {currentUser ? <Nav.Link onClick={handleLogout}>Sign Out</Nav.Link> : <Nav.Link href="auth">Sign In</Nav.Link>}
        </Nav>
      </Container>
    </Navbar>
  )
}

export default Navigation