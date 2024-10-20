import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomeScreen from './screens/Home'
import ProvidersWrapper from './components/ProvidersWrapper'

const App = () => {
  return (
    <ProvidersWrapper>
      <Routes>
        <Route path='/' element={<HomeScreen />} />
      </Routes>
    </ProvidersWrapper>
  )
}

export default App