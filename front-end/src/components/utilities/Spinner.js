import React from 'react'
import spinner from '../../images/spinner.gif'

const Spinner = () => {
  return (
    <div className='spinner-wrapper'>
      <img className="spinner" src={spinner} alt="spinner" />
    </div>
  )
}

export default Spinner