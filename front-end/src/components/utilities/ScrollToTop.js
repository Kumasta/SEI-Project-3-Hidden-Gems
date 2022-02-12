import React from 'react'
import Button from 'react-bootstrap/Button'

const ScrollToTop = () => {
  const componentDidMount = () => {
    window.scrollTo(0, 0)
  }

return(
  <Button id='scroll-to-top' onClick={componentDidMount}/>
)
}

export default ScrollToTop