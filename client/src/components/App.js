import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Navigation from './Navigation'
import Auth from './Auth'
import NoPath from './NoPath'
import New from './New'
import Post from './Post'
import PostList from './PostList'
import EditPost from './EditPost'

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
    setCurrentUserId(user.id)
    navigate(-1)
  }

  function handleLogout() {
    setCurrentUsername(null)
    setCurrentUserId(null)
    window.location.reload()
  }

  return (
    <div>
      <Navigation currentUsername={currentUsername} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<PostList currentUserId={currentUserId} />} />
        <Route path="/auth" element={<Auth onLogin={handleLogin} />} />
        <Route path="/new" element={<New currentUserId={currentUserId} />} />
        <Route path="/posts/:id" element={<Post currentUserId={currentUserId} />} />
        <Route path="/edit/:id" element={<EditPost />} />
        <Route path="*" element={<NoPath />} />
      </Routes>
    </div>
  )
}

export default App