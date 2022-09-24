import { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'

function Auth( {handleSignup} ) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirmation, setPasswordConfirmation] = useState("")
  const [signIn, setSignIn] = useState(true)

  // function handleLogin(e) {
  //   e.preventDefault()
  //   const user = {
  //     username,
  //     password
  //   }
  //   fetch("/login", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ username }),
  //   })
  //     .then((r) => r.json())
  //     .then((user) => handleLogin(user))
  // }

  function handleSignUp(e) {
    e.preventDefault()
    const user = {
      username,
      password,
      password_confirmation: passwordConfirmation
    }
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then(response => {
        if (response.ok) {
          response.json().then(console.log(response))
        } else {
          response.json().then(e => {
            console.log(e)
            const removeValidation = e.exception.split("failed: ")[1]
            const error = removeValidation.split(">")[0]
            alert(error)
          })
        }
      })
  }

  return (
    <div>
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

          <Button variant="dark" type="submit" onClick={handleSignUp}>Sign Up</Button>
        </Form>
        <p>New to [app name]? <Alert.Link onClick={() => setSignIn(false)}>Register</Alert.Link></p>
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
            <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPasswordConfirmation(e.target.value)} />
          </Form.Group>

          <Button variant="dark" type="submit" onClick={handleSignUp}>Sign Up</Button>
        </Form>
        <p>Already have an account? <Alert.Link onClick={() => setSignIn(true)}>Login</Alert.Link></p>
      </div>}
    </div>
  )
}

export default Auth