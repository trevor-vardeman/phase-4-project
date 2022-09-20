import { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

function SignIn( {handleLogin} ) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

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
      password
    }
    fetch("/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        if (response.ok) {
          response.json().then(console.log(response))
        } else {
          response.json().then(e => {
            const removeValidation = e.exception.split("failed: ")[1]
            const error = removeValidation.split(">")[0]
            alert(error)
          })
        }
      })
  }

  return (
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

        <Button variant="dark" type="submit" onClick={handleLogin}>Log In</Button>
        <Button variant="dark" type="submit" onClick={handleSignUp}>Sign Up</Button>
      </Form>
    </div>
  )
}

export default SignIn