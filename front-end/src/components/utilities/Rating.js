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
  const [ filteredRating, setFilteredRating ] = useState({
    owner: '',
    rating: null,
    _id: ''
  })

  //Check if logged in user has already posted rating
  useEffect(() => {
    if (!pin) return
    if (!pin.ratings) return
    // console.log(hasRating)
    const checkOwnerRating = () => {
      const payload = getPayload()
      // const ratingArray = [ ...pin.ratings ]
      setPinRating(pin.ratings)
      // console.log(pinRating.findIndex(i => i.owner.equals(payload.sub)))
      const returnedRating = pinRating.findIndex(i => i.owner === payload.sub)
      const filteredRating = pinRating[returnedRating]
      setFilteredRating(filteredRating)
      setOwnedRating(returnedRating)
      if (!filteredRating) return
      console.log(filteredRating._id)
    }
    checkOwnerRating()
  }, [pin, pinRating])
  
  // //Post request to add rating
  // useEffect(() => {
  //   if (ownedRating === -1){
  //   const userPostRating = async () => {
  //     const headers = {'Authorization': `${getLocalToken()}`}
  //     console.log(headers)
  //     try {
  //       await axios.post(`/api/pins/${id}/rating`, selectRating, { headers })
  //     } catch (error) {
  //       console.log({ message: error.message})
  //     }
  //   }
  //   userPostRating()
  // } 
  // //PUT request to change rating
  // else {
  //   const userPostRating = async () => {
  //     const headers = {'Authorization': `${getLocalToken()}`}
  //     // console.log(headers)
  //     try {
  //       const { data } = await axios.put(`/api/pins/${id}/rating/${filteredRating._id}`, selectRating, { headers })
  //       console.log(data.res)
  //     } catch (error) {
  //       console.log({ message: error.message})
  //     }
  //   }
  //   userPostRating()
  // }
  // }, [selectRating, id, ownedRating])

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