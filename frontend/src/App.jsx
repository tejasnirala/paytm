import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { Dashboard } from './pages/Dashboard'
import { SendMoney } from './pages/SendMoney'
import { ForgotPassword } from './pages/ForgotPassword'
import { ResetPassword } from './pages/ResetPassword'


import { Testing } from './pages/Test'


function App() {
  return (
    <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/signin" />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/send" element={<SendMoney />} />
            <Route path="/password/forgot" element={<ForgotPassword />} />
            <Route path="/password/reset/:token" element={<ResetPassword />} /> 
            <Route path="/test" element={<Testing />} /> 
          </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App
