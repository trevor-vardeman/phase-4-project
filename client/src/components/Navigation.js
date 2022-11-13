import { Link, useNavigate } from "react-router-dom"
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

function Navigation( { user, onLogout } ) {
  const navigate = useNavigate()
  const handleOpenUser = () => navigate(`/user/${user.id}`)

  return (
    <Navbar sticky="top" bg="dark" variant="dark">
      <Container fluid>
        <Navbar.Brand>seenit</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link as={Link} to="new">New</Nav.Link>
          {user ? <Nav.Link style={{color: "orange"}} onClick={handleOpenUser}>{user.username}</Nav.Link> : null}
          {user ? <Nav.Link onClick={onLogout}>Sign Out</Nav.Link> : <Nav.Link as={Link} to="auth">Sign In</Nav.Link>}
        </Nav>
      </Container>
    </Navbar>
  )
}

export default Navigation