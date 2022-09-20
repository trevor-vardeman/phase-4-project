import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

function Navigation() {
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
          <Nav.Link href="sign-in">Sign In</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  )
}

export default Navigation