import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Navigation from './Navigation'
import Auth from './Auth'
import Front from './Front'
import NoPath from './NoPath'
import New from './New'

function App() {
  const [currentUsername, setCurrentUsername] = useState(null)
  const [currentUserId, setCurrentUserId] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    fetch("/me")
    .then((r) => {
      if (r.ok) {
        r.json().then(user => {
          setCurrentUsername(user.username)
          setCurrentUserId(user.id)
        })
      }
    })
  }, [])

  function handleLogin(user) {
    setCurrentUsername(user.username)
    navigate("/")
  }

  function handleLogout() {
    setCurrentUsername(null)
    setCurrentUserId(null)
  }

  return (
    <div>
      <Navigation currentUsername={currentUsername} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Front />} />
        <Route path="/auth" element={<Auth onLogin={handleLogin} />} />
        <Route path="/new" element={<New currentUserId={currentUserId} />} />
        <Route path="*" element={<NoPath />} />
      </Routes>
    </div>
  )
}

export default App