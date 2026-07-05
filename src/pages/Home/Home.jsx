import React from 'react'
import Banner from './Banner/Banner'
import Choose from './Choose/Choose'
import ProductsGrid from './Products/ProductsGrid'
import HowItWorks from './HowItWorks/HowItWorks'
import Feedback from './Feedback/Feedback'
import Ready from './Ready/Ready'
import Stats from './Stats/Stats'
import Newsletter from './Newsletter/Newsletter'
import FAQ from './FAQ/FAQ'

const Home = () => {
  return (
    <main className="min-h-screen bg-base-100">

       <Banner />

      <Choose />

      <ProductsGrid />

      <HowItWorks />

      <Stats />

      <Feedback />

      <Newsletter />

      <FAQ />

      <Ready />

    </main>
  )
}

export default Home