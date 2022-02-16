import React from 'react'
import spinner from '../../images/diamond-animation.gif'

const Spinner = () => {
  return (
    <div className='spinner-wrapper'>
      <img className="spinner" src={spinner} alt="spinner" />
    </div>
  )
}

export default Spinner