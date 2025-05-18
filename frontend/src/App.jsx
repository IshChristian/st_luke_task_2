import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Dashboard from './layout/dashboard'
import Home from './pages/home'
import Appointment from './pages/appointment'
import Register from './pages/register'
import Login from './pages/login'


function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Dashboard />}>
          <Route path='/' element={<Home />} />
          <Route path='/appointment' element={<Appointment />} />
        </Route>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App
