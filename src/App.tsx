import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router'

//components
import PrivateRoute from './UI/components/PrivateRoute'

//pages
import Login from './UI/pages/Login'
import Dashboard from './UI/pages/Dashboard'
import Register from './UI/pages/Register'

//stores
import { useAuthStore } from './UI/stores/authStore'
import { useEffect } from 'react'

function App() {

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const logout = useAuthStore((state) => state.logout)
  const init = useAuthStore((state) => state.init)

  useEffect(() => {
    init()
  }, [])

  const mainRoute = isAuthenticated ? '/dashboard' : '/login'

  return (
    <Router>
      <Routes>
        <Route path="/login" element={
          !isAuthenticated ?
          <Login /> :
          <Navigate to="/dashboard" />
        } />
        <Route path="/register" element={
          !isAuthenticated ?
          <Register /> :
          <Navigate to="/dashboard" />
        } />
        <Route path="/dashboard" element={
          <PrivateRoute isAuthenticated={isAuthenticated}>
            <Dashboard onLogout={logout} />
          </PrivateRoute>
        } />
        <Route path="/" element={<Navigate to={mainRoute} />} />
      </Routes>
    </Router>
  )
}

export default App
