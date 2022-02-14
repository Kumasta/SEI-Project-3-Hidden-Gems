import React, { useEffect, useState } from 'react'
import axios from 'axios'
import diamond from '../../images/black-diamond.png'
import halfDiamond from '../../images/half-diamond.png'
import hollowDiamond from '../../images/hollow-diamond.png'

const Rating = ({ avgRating, id }) => { 

  const [ hasRating, setHasRating ] = useState(avgRating)
  const [ averageRating, setAverageRating ] = useState([])

  //Calculate diamond display
  useEffect(() => {
    console.log('pin', avgRating)
    const rating = avgRating
    const ratingRemainder = rating - (Math.floor(rating))
    const diamonds = []
    for (let i = 0; i < Math.floor(rating); i++){
      diamonds.push(diamond)
    }
    if (ratingRemainder > 0.25 && ratingRemainder < 0.75){
      return diamonds.push(halfDiamond)
    }
    for (let i = diamonds.length; i < 5; i++){
      diamonds.push(hollowDiamond)
    }
    setAverageRating(diamonds)
    setHasRating(avgRating)
    console.log('Diamonds array', diamonds)
  }, [avgRating])

  //Submit rating
  const [ selectRating, setSelectRating ] = useState({
    rating: 1
  })

  const getLocalToken = `${window.localStorage.getItem('hidden-gems-token')}`

  const clickRating = (e) => {
    const rating = { rating: e.target.name }
    setSelectRating(rating)
  }

  useEffect(() => {
    const userSelectRating = async (e) => {
      const headers = {'Authorization': getLocalToken}
      console.log(headers)
      try {
        await axios.post(`/api/pins/${id}/rating`, selectRating, { headers })
        // console.log('e.target.value', e.target.name)
        console.log('selectRating', selectRating)
      } catch (error) {
        console.log({ message: error.message})
      }
    }
    userSelectRating()
  }, [selectRating, getLocalToken, id])

  return (
    <div className='rating-container'>
      {hasRating ?
        averageRating?.map((diamond, i) => {
          return (
            <div key={i}>
              <img onClick={clickRating} className={`diamond ${i+1}`} name={i+1} src={diamond} alt={diamond} />
            </div>
          )
        })
        :
        <p>Not rated</p>
      }
    </div>
  )
}

export default Rating