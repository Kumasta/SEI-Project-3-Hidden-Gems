import React, { useState } from 'react' 
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const Login = () => {

  const navigate = useNavigate()

  const [ formData, setFormData ] = useState({
    email: '',
    password: ''
  })

  const [ formError, setFormError ] = useState('')

  const handleChange = (e) => {
    const newObj = { ...formData, [e.target.name]: e.target.value }
    setFormData(newObj)
    setFormError('')
  }

  const setLocalToken = (token) => {
    window.localStorage.setItem('hidden-gems-token', token)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post('/api/login', formData)
      setLocalToken(data.token)
      navigate('/')
    } catch (error) {
      setFormError(error.response.data.message)
    }
  }

  return (
    <div className='form-page'>
      <Container>
        <Form onSubmit={handleSubmit} className='mt-4'>
          <h2>Login</h2>
          <Form.Group className='mb-2'>
            <Form.Label htmlFor='email'>Email Address</Form.Label>
            <Form.Control onChange={handleChange} type='email' name='email' placeholder='email' defaultValue={formData.email}></Form.Control>
          </Form.Group>
          <Form.Group className='mb-2'>
            <Form.Label htmlFor='password'>Password</Form.Label>
            <Form.Control onChange={handleChange} type='password' name='password' placeholder='Password' defaultValue={formData.password}/> 
          </Form.Group>
          {formError && <Form.Text>{formError}</Form.Text>}
          <Form.Group className='text-center mt-4'>
            <Button type='submit' className='btn btn-red'>Submit</ Button>
          </Form.Group>
        </Form>
      </Container>
    </div>
  )
}

export default Login
