import React, { useEffect, useState } from 'react'
import { getPayload, getLocalToken } from '../../enviroment/auth'
import axios from 'axios'
import diamond from '../../images/black-diamond.png'
import halfDiamond from '../../images/half-diamond.png'
import hollowDiamond from '../../images/hollow-diamond.png'

const Rating = ({ avgRating, id, pin }) => { 

  const [ hasRating, setHasRating ] = useState(avgRating)
  const [ averageRating, setAverageRating ] = useState([])

  //Calculate diamond display
  useEffect(() => {
      const rating = hasRating
      const ratingRemainder = rating - (Math.floor(rating))
      const diamonds = []
      for (let i = 0; i < Math.floor(rating); i++){
        diamonds.push(diamond)
      }
      if (ratingRemainder > 0.25 && ratingRemainder < 0.75){
        diamonds.push(halfDiamond)
      }
      for (let i = diamonds.length; i < 5; i++){
        diamonds.push(hollowDiamond)
      }
      setAverageRating(diamonds)
      setHasRating(avgRating)
      console.log('Diamonds array', diamonds)
  }, [avgRating, hasRating])
  

  //Submit rating
  const [ selectRating, setSelectRating ] = useState({
    // rating: null
  })

  const clickRating = (e) => {
    const rating = { rating: e.target.name }
    setSelectRating(rating)
  }

  const [ pinRating, setPinRating ] = useState([])
  const [ ownedRating, setOwnedRating ] = useState([])

  //Check if logged in user has already posted rating
  useEffect(() => {
    if (!pin) return
    if (!pin.ratings) return
    // console.log(hasRating)
    const checkOwnerRating = () => {
      const payload = getPayload()
      const ratingArray = [ ...pin.ratings ]
      setPinRating(pin.ratings)
      console.log(pin)
      console.log(ratingArray)
      console.log(payload.sub)
      // console.log(pinRating.findIndex(i => i.owner.equals(payload.sub)))
      const returnedRating = pinRating.findIndex(i => i.owner === payload.sub)
      console.log(returnedRating)
      const filteredRating = pinRating.slice(returnedRating, 1)

      console.log(filteredRating.i)
      setOwnedRating(returnedRating)
    }
    checkOwnerRating()
  }, [pin, pinRating])
  
  //Post request to add rating
  useEffect(() => {
    if (ownedRating === -1){
    const userPostRating = async () => {
      const headers = {'Authorization': `${getLocalToken()}`}
      console.log(headers)
      try {
        await axios.post(`/api/pins/${id}/rating`, selectRating, { headers })
      } catch (error) {
        console.log({ message: error.message})
      }
    }
    userPostRating()
  } 
  //PUT request to change rating
  else {
    const userPostRating = async () => {
      const headers = {'Authorization': `${getLocalToken()}`}
      console.log(headers)
      try {
        await axios.put(`/api/pins/${id}/rating/`, selectRating, { headers })
      } catch (error) {
        console.log({ message: error.message})
      }
    }
    userPostRating()
  }
  }, [selectRating, id, ownedRating])

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