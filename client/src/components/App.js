import { Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Navigation from './Navigation'
import SignIn from './SignIn'

function App() {
  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
      </Routes>
    </div>
  )
}

export default App