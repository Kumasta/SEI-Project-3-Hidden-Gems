import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

// React bootstap components
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav, { } from 'react-bootstrap/Nav'

// Authorisation file
// import { userIsAuthorised } from '../enviroment/auth'


const SiteNav = () => {

  const navigate = useNavigate()

  const handleLogout = () => {
    window.localStorage.removeItem('hidden-gems-token')
    navigate('/')
  }

  return (
      <Navbar expand='sm' className='w-100'>
        <Container>
          <Navbar.Brand href='/'>Hidden Gems</Navbar.Brand>
          <Nav.Item>
            <Link to='/About'>About</Link>
          </Nav.Item>
          <Nav.Item>
            <Link to='/Map'>Map</Link>
          </Nav.Item>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse className='justify-content-end'>
            {/* {userIsAuthorised() ? */}
              <>
                <Nav.Item onClick={handleLogout}>
                  <span>Logout</span>
                </Nav.Item>
              </>
              :
              <>
                <Nav.Item>
                  <Link to='/Login'>Login</Link>
                </Nav.Item>
                <Nav.Item>
                  <Link className='btn-dark btn' to='/Register'>Register now</Link>
                </Nav.Item>
              </>
            {/* } */}
          </Navbar.Collapse>
        </Container>
      </Navbar>
  )
}

export default SiteNav
