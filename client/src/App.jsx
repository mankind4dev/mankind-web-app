import { useState } from 'react'
import {Routes, Route} from "react-router-dom"
import Home from './pages/Home'
import About from './pages/About'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'
import Header from './components/Header'
import Footer from './components/Footer'


function App() {
 

   return (
    <>
        <Header />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/about' element={<About />} />
        <Route exact path='/sign-in' element={<Signin />} />
        <Route exact path='/sign-up' element={<Signup />} />
        <Route exact path='/projects' element={<Projects />} />
        <Route exact path='/dashboard' element={<Dashboard />} />
    </Routes>
    <Footer />
    </>
  )
}

export default App
