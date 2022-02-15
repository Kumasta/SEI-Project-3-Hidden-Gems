import React, { useEffect, useState } from 'react'
import { getPayload, getLocalToken } from '../../enviroment/auth'
import axios from 'axios'
import diamond from '../../images/black-diamond.png'
import halfDiamond from '../../images/half-diamond.png'
import hollowDiamond from '../../images/hollow-diamond.png'

const Rating = ({ avgRating, id, pin, setRatingUpdated }) => { 

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
  }, [avgRating, hasRating])
  

  //Submit rating
  const [ selectRating, setSelectRating ] = useState({})
  const [ pinRating, setPinRating ] = useState([])
  const [ ownedRating, setOwnedRating ] = useState([])
  const [ filteredRating, setFilteredRating ] = useState({})
  
  //Set rating on click
  const clickRating = (e) => {
    const rating = { rating: e.target.name }
    setSelectRating(rating)
    setRatingUpdated(true)
  }

  //Check if logged in user has already posted rating
  useEffect(() => {
    if (!pin) return
    if (!pin.ratings) return
    const checkOwnerRating = () => {
      const payload = getPayload()
      if (!payload) return
      setPinRating(pin.ratings)
      const returnedRating = pinRating.findIndex(i => i.owner === payload.sub)
      const filteredRating = pinRating[returnedRating]
      setFilteredRating(filteredRating)
      setOwnedRating(returnedRating)
    }
    checkOwnerRating()
  }, [pin, pinRating])
  
  //Post request to add rating
  useEffect(() => {
    if (ownedRating === -1){
      if (!selectRating) return
      const userPostRating = async () => {
      const headers = {'Authorization': `${getLocalToken()}`}
      try {
        await axios.post(`/api/pins/${id}/rating`, selectRating, { headers })
        setOwnedRating(40)
      } catch (error) {
        console.log({ message: error.message})
      }
    }
    userPostRating()
    }
  }, [selectRating, id, ownedRating])

  //PUT request to change rating
  useEffect(() => {
  if (selectRating){
    if (!id) return
    if (!filteredRating) return
    const userPostRating = async () => {
      const headers = {'Authorization': `${getLocalToken()}`}
      try {
        const { data } = await axios.put(`/api/pins/${id}/rating/${filteredRating._id}`, selectRating, { headers })
        console.log(data)
      } catch (error) {
        console.log({ message: error.message})
      }
    }
    userPostRating()
    }
  }, [selectRating, filteredRating, id])

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