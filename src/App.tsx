import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router'

//components
import PrivateRoute from './UI/components/PrivateRoute'

//pages
import Login from './UI/pages/Login'
import Home from './UI/pages/Home'
import Register from './UI/pages/Register'

//stores
import { useAuthStore } from './UI/stores/authStore'
import { useEffect } from 'react'

function App() {

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const init = useAuthStore((state) => state.init)

  useEffect(() => {
    init()
  }, [])

  const mainRoute = isAuthenticated ? '/home' : '/login'

  return (
    <Router>
      <Routes>
        <Route path="/login" element={
          !isAuthenticated ?
          <Login /> :
          <Navigate to="/home" />
        } />
        <Route path="/register" element={
          !isAuthenticated ?
          <Register /> :
          <Navigate to="/home" />
        } />
        <Route path="/home" element={
          <PrivateRoute isAuthenticated={isAuthenticated}>
            <Home />
          </PrivateRoute>
        } />
        <Route path="/" element={<Navigate to={mainRoute} />} />
      </Routes>
    </Router>
  )
}

export default App
