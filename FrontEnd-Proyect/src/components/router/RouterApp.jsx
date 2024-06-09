import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { AdminPage } from '../pages/AdminPage'
import { LandingPage } from '../pages/LandingPage'

export const RouterApp = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Navigate to="/client" />} />
          <Route path="/client/*" element={<LandingPage />} />
          <Route path="/admin/*"  element={<AdminPage />} />

        </Routes>

      </Router>


    </>
  )
}
