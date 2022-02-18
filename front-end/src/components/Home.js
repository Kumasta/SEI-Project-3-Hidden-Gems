import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'

//Utility Components
import HeroCarousel from './home/HeroCarousel'
import Spinner from './utilities/Spinner'
import MostRated from './home/MostRated'
import SearchFilter from './home/SearchFilter'
import Footer from './utilities/Footer'

const Home = () => {

  const [pinData, setPindata] = useState(null)
  const [hasError, setHasError] = useState({ error: false, message: '' })
  const [randomHeroImages, setRandomHeroImages] = useState([])

  useEffect(() => {
    const getPinsData = async () => {
      try {
        const { data } = await axios.get('/api/pins')
        let randomCarouselImgs = []
        while (randomCarouselImgs.length < 5) {
          randomCarouselImgs.push(data[Math.floor(Math.random() * data.length)])
          randomCarouselImgs = [...new Set(randomCarouselImgs)]
        }
        setRandomHeroImages(randomCarouselImgs)
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
          <HeroCarousel randomHeroImages={randomHeroImages} />
        :
        <>
          <h2 className='text-center'>
            {hasError.error ? 'Something went wrong!' 
            : 
            <Spinner />}
          </h2>
        </>
      }
      <main>
        {pinData ?
            <MostRated pinData={pinData} />
          :
          <>
          <h2 className='text-center'>
            {hasError.error ? 'Something went wrong!' 
            : 
            <Spinner />}
          </h2>
        </>
        }
        {pinData ?
            <SearchFilter pinData={pinData} />
          :
          <>
          <h2 className='text-center'>
            {hasError.error ? 'Something went wrong!' 
            : 
            <Spinner />}
          </h2>
        </>
        }
      </main>
      <Footer />
    </>
  )
}


export default Home
