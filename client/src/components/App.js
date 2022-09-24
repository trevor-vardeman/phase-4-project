import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Navigation from './Navigation'
import Auth from './Auth'
import Home from './Home'
import NoPath from './NoPath'

function App() {
  const [currentUser, setCurrentUser] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    fetch("/me")
    .then((r) => {
      if (r.ok) {
        r.json().then(user => setCurrentUser(user))
      }
    })
  }, [])

  function handleLogin(user) {
    setCurrentUser(user.username)
    navigate("/")
  }

  return (
    <div>
      <Navigation currentUser={currentUser} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth onLogin={handleLogin} />} />
        <Route path="*" element={<NoPath />} />
      </Routes>
    </div>
  )
}

export default App