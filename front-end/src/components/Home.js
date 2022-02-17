import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'

//Utility Components
import HeroCarousel from './home/HeroCarousel'
import Spinner from './utilities/Spinner'
import MostRated from './home/MostRated'
import SearchFilter from './home/SearchFilter'
import Footer from './utilities/Footer'

const Home = ({ pinData, setPindata }) => {

  const [hasError, setHasError] = useState({ error: false, message: '' })

  useEffect(() => {
    const getPinsData = async () => {
      try {
        const { data } = await axios.get('/api/pins')
        console.log('Get data request', data)
        setPindata(data)
      } catch (error) {
        setHasError({ error: true, message: error.message })
      }
    }
    getPinsData()
  }, [])

  return (
    <>
    {pinData ?   
      <>
        <section className='hero-container container-sm'>
          <HeroCarousel pinData={pinData} />
        </section>
        <main>
          <section className='most-rated-container container-sm'>
            <MostRated pinData={pinData} />
          </section>
          <section className='search-section'>
            <SearchFilter pinData={pinData} />
          </section>
        </main>
        <Footer />
      </>
      :
      <h2 className='text-center'>
        {hasError.error ? 'Page loading...' 
        : <Spinner />
        }
      </h2>
      }
    </>
  )
}


export default Home
