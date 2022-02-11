import React, { useEffect, useState } from 'react'
import diamond from '../../images/black-diamond.png'
import halfDiamond from '../../images/half-diamond.png'
import hollowDiamond from '../../images/hollow-diamond.png'

const Rating = ({ avgRating, id }) => { 

  const [ averageRating, setAverageRating ] = useState([])
  const [ rating, setRating ] = useState(avgRating)

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
    setRating(avgRating)
    console.log('Diamonds array', diamonds)
  }, [avgRating])

  return (
    <div className='rating-container'>
      {rating ?
        averageRating?.map((diamond, i) => {
          return (
            <div key={i} className='diamond'>
              <img src={diamond} alt={diamond} />
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