import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Navigation from './Navigation'
import SignIn from './SignIn'
import Home from './Home'
import NoPath from './NoPath'

function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    fetch("/me").then((response) => {
      if (response.ok) {
        response.json().then((user) => setUser(user))
      }
    })
  }, [])

  function handleLogin(user) {
    setUser(user)
  }

  return (
    <div>
      <Navigation user={user} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn handleLogin={handleLogin} />} />
        <Route path="*" element={<NoPath />} />
      </Routes>
    </div>
  )
}

export default App