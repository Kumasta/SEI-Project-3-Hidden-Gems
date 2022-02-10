import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const Register = () => {

  const [ formData, setFormData ] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  })

  const [ formErrors, setFormErrors ] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  })

  const navigate = useNavigate()

  const handleChange = (e) => {
    const newObj = { ...formData, [e.target.name]: e.target.value }
    setFormData(newObj)
    setFormErrors({ ...formErrors, [e.target.name]: '' })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('https://localhost:4000/register', formData)
      navigate('/login')
    } catch (error) {
      setFormErrors({ ...formErrors, ...error.response.data.errors })
    }
  }

  return (
    <div  className='form-page'>
      <Container>
        <Form onSubmit={handleSubmit} className='mt-4'>
          <h2>Register to Hidden Gems</h2>
          <hr />
          <Form.Group className='mb-2'>
            <Form.Label htmlFor='username'>Username</Form.Label>
            <Form.Control onChange={handleChange} type='text' placeholder='Username' name='username' defaultValue={formData.username} />
            {formErrors.username && <Form.Text>{formErrors.username}</Form.Text>}
          </Form.Group>
          <Form.Group className='mb-2'>
            <Form.Label htmlFor='email'>Email Address</Form.Label>
            <Form.Control onChange={handleChange} type='email' placeholder='Email' name='email' defaultValue={formData.email} />
            {formErrors.email && <Form.Text>{formErrors.email}</Form.Text>}
          </Form.Group>
          <Form.Group className='mb-2'>
            <Form.Label htmlFor='password'>Password</Form.Label>
            <Form.Control onChange={handleChange} type='password' placeholder='Password' name='password' defaultValue={formData.password} />
            {formErrors.password && <Form.Text>{formErrors.password}</Form.Text>}
          </Form.Group>
          <Form.Group className='mb-2'>
            <Form.Label htmlFor='passwordConfirmation'>Confirm Password</Form.Label>
            <Form.Control onChange={handleChange} type='password' placeholder='Confirm Password' name='passwordConfirmation' defaultValue={formData.passwordConfirmation} />
            {formErrors.passwordConfirmation && <Form.Text>{formErrors.passwordConfirmation}</Form.Text>}
          </Form.Group>
          <Form.Group className='text-center mt-4'>
            <Button type='submit' className='btn btn-red'>Submit</ Button>
          </Form.Group>
        </Form>
      </Container>
    </div>
  )
}

export default Register
