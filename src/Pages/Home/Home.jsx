import React from 'react'
import Hero from './Components/Hero'
import Tours from './Components/Tours'
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'

const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Tours />
      <Footer />
    </div>
  )
}

export default Home
