import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Navigation from './Navigation'
import Auth from './Auth'
import Home from './Home'
import NoPath from './NoPath'

function App() {
  const [currentUser, setCurrentUser] = useState()

  // useEffect(() => {
  //   fetch("/me")
  //   .then((response) => {
  //     if (response.ok) {
  //       response.json().then(user => setUser(user))
  //     }
  //   })
  // }, [])

  function handleSignup(user) {
    setCurrentUser(user)
    console.log(user)
  }

  return (
    <div>
      <Navigation currentUser={currentUser} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth handleSignup={handleSignup} />} />
        <Route path="*" element={<NoPath />} />
      </Routes>
    </div>
  )
}

export default App