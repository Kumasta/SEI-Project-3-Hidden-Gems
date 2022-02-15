import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'

//Utility Components
import HeroCarousel from './home/HeroCarousel'
import Spinner from './utilities/Spinner'
import MostRated from './home/MostRated'
import SearchFilter from './home/SearchFilter'




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
      <section className='hero-container container-sm'>
        {pinData ?
          <HeroCarousel pinData={pinData} />
          :
          hasError.error ?
            <p>{hasError.message}</p>
            :
            <Spinner />
        }
      </section>
      <main>
        <section className='most-rated-container container-sm'>
          {pinData ?
            <MostRated pinData={pinData} />
            :
            <Spinner />
          }

        </section>
        <section className='search-section'>
          <SearchFilter pinData={pinData} />
        </section>
      </main>
      <footer>
        <hr />
        © Made by Mayur, Tom &amp; Marilyn
      </footer>
    </>
  )
}


export default Home
