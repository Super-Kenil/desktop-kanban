import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomeScreen from './screens/Home'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<HomeScreen />} />
    </Routes>
  )
}

export default App