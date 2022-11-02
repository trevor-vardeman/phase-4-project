import { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'

function Auth( { onLogin } ) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirmation, setPasswordConfirmation] = useState("")
  const [signIn, setSignIn] = useState(true)

  const handleLogin = e => {
    e.preventDefault();
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password
      }),
    })
      .then((r) => {
        if (r.ok) {
          r.json().then(user => onLogin(user))
        } else {
          r.json().then(data => alert(data.error))
        }
      })
      .catch(e => alert(e))
  }

  const handleSignUp = e => {
    e.preventDefault()
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        password_confirmation: passwordConfirmation,
        admin: false
      }),
    })
      .then((r) => {
        if (r.ok) {
          r.json().then(user => onLogin(user))
        } else {
          r.json().then(data => alert(`${Object.keys(data.error)[0]} ${Object.values(data.error)[0][0]}`))
        }
      })
      .catch(e => alert(e))
  }

  return (
    <div className="centered">
      {signIn
      ? 
      <div>
        <Form>
          <Form.Group controlId="usernameForm">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          </Form.Group>

          <Form.Group controlId="passwordForm">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </Form.Group>

          <Button variant="dark" type="submit" onClick={handleLogin}>Sign In</Button>
        </Form>
        <p>New to seenit? <Alert.Link onClick={() => setSignIn(false)}>Register</Alert.Link></p>
      </div>
      : 
      <div>
        <Form>
          <Form.Group controlId="usernameForm">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          </Form.Group>

          <Form.Group controlId="passwordForm">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </Form.Group>

          <Form.Group controlId="passwordConfirmationForm">
            <Form.Label>Password Confirmation</Form.Label>
            <Form.Control type="password" placeholder="Password" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} />
          </Form.Group>

          <Button variant="dark" type="submit" onClick={handleSignUp}>Sign Up</Button>
        </Form>
        <p>Already have an account? <Alert.Link onClick={() => setSignIn(true)}>Login</Alert.Link></p>
      </div>}
    </div>
  )
}

export default Auth