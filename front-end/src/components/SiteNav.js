import React from 'react'
import { Link } from 'react-router-dom'

// React bootstap components
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'


const SiteNav = () => {
  return (

    <>
      <Navbar expand='sm'>
        <Container>
          <Navbar.Brand href='/'>Hidden Gems</Navbar.Brand>
          <Nav.Item>
            <Link to='/AboutUs'>About Us</Link>
          </Nav.Item>
          <Nav.Item>
            <Link to='/Map'>Map</Link>
          </Nav.Item>
          <Navbar.Toggle aria-controls='basic-navbar-nav'/>
          <Navbar.Collapse className='justify-content-end'>
            <Nav.Item>
              <Link to='/Login'>Login</Link>
            </Nav.Item>
            <Nav.Item>
              <Link className='btn-dark btn' to='/Register'>Register</Link>
            </Nav.Item>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default SiteNav
