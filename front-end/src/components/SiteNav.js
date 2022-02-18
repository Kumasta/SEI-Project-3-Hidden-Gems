import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import { HashLink } from 'react-router-hash-link';

// React bootstap components
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav, { } from 'react-bootstrap/Nav'

// Authorisation file
import { userIsAuthenticated } from '../enviroment/auth'
import diamond from '../images/black-diamond.png'


const SiteNav = () => {
  const navigate = useNavigate()


  const handleLogout = () => {
    window.localStorage.removeItem('hidden-gems-token')
    window.localStorage.removeItem('hidden-gems-userId')
    navigate('/')
  }

  const getUserId = () => {
    const userId = window.localStorage.getItem('hidden-gems-userId')
    navigate(`/profile/${userId}`)
  }

  return (
    <Navbar expand='sm' className='w-100'>
      <Container>
        <Navbar.Brand href='/'><img src={diamond} alt='Brand' />Hidden Gems</Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse className='justify-content-end'>
          <Nav.Item>
            <Link to='/Map'>Map</Link>
          </Nav.Item>
          <Nav.Item>
            <HashLink smooth to={'/#search'}>
            Search
            </HashLink>
          </Nav.Item>
          <Nav.Item>
            <Link to='/About'>About</Link>
          </Nav.Item>
          {userIsAuthenticated() ?
            <>
              <Nav.Item>
                <Button className='btn-dark btn' onClick={getUserId}>Profile</Button>
                {/* <Link to={getUserId}>Profile</Link> */}
              </Nav.Item>
              <Nav.Item>
              <Button className='btn-dark btn' onClick={handleLogout}>Logout</Button>
              </Nav.Item>
            </>
            :
            <>
              <Nav.Item>
                <Link className='btn-dark btn' to='/Login'>Login</Link>
              </Nav.Item>
              <Nav.Item>
                <Link className='btn-dark btn' to='/Register'>Register now</Link>
              </Nav.Item>
            </>
          }
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default SiteNav
