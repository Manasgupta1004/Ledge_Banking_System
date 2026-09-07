import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/login'
import { Toaster } from 'react-hot-toast'

const App = () => {
  return (

    <div>
      <Toaster />
      <Routes>
        <Route path='/signup' element={<Login />} />
      </Routes>
    </div>
  )
}

export default App