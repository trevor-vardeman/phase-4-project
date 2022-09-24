import { useNavigate } from "react-router-dom"
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

function Navigation( {currentUser} ) {
  const navigate = useNavigate()

  function handleLogout() {
    console.log(currentUser)
    navigate("/")
  }

  return (
    <Navbar sticky="top" bg="dark" variant="dark">
      <Container fluid>
        <Navbar.Brand>Brand Name</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="all">All</Nav.Link>
          <Nav.Link href="my-communities">My Communities</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link href="new-community">New Community</Nav.Link>
          <Nav.Link href="new-post">New Post</Nav.Link>
          {currentUser ? <Nav.Link onClick={handleLogout}>Sign Out</Nav.Link> : <Nav.Link href="signup">Sign Up</Nav.Link>}
        </Nav>
      </Container>
    </Navbar>
  )
}

export default Navigation