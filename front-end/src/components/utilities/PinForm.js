import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
// import CreatableSelect from 'react-select/creatable';
// import { ActionMeta, OnChangeValue } from 'react-select';

const PinForm = ({ newPin }) => {

  console.log(newPin)
  useEffect(() => {
    setFormData({ ...formData, latitude: newPin.latitude, longitude: newPin.longitude })
  }, [newPin])

  // const option = [{ option: 1 }]
  const uploadAPI = 'https://api.cloudinary.com/v1_1/dv2dfzekf/image/upload'
  const uploadPreset = 'ip80rysk'

  const [formData, setFormData] = useState({
    title: '',
    typeOfPlace: '',
    description: '',
    imageUrl: '',
    status: true,
    tags: '',
    latitude: null,
    longitude: null,
  })

  const [formErrors, setFormErrors] = useState({
    title: '',
    typeOfPlace: '',
    description: '',
    imageUrl: '',
    status: true,
    tags: '',
    latitude: null,
    longitude: null,
  })

  const navigate = useNavigate()

  const handleUpload = async (e) => {
    const data = new FormData()
    data.append('file', e.target.files[0])
    data.append('upload_preset', uploadPreset)
    const res = await axios.post(uploadAPI, data)
    console.log(res)
    handleImageUrl(res.data.url)
  }

  const handleChange = (e) => {
    const newObj = { ...formData, [e.target.name]: e.target.value }
    setFormData(newObj)
    setFormErrors({ ...formErrors, [e.target.name]: '' })
  }

  const handleImageUrl = (url) => {
    setFormData({ ...formData, imageUrl: url })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('/api/register', formData)
      navigate('/login')
    } catch (error) {
      setFormErrors({ ...formErrors, ...error.response.data.errors })
    }
  }

  return (
    <div className='form-page' >
      <Container>
        <Form onSubmit={handleSubmit} className='mt-4'>
          <h2>Create a new pin</h2>
          <hr />

          <Form.Group className='mb-2'>
            <Form.Label htmlFor='title'>Name of place</Form.Label>
            <Form.Control onChange={handleChange} type='text' placeholder='Name of place' name='title' defaultValue={formData.title} />
            {formErrors.title && <Form.Text>{formErrors.title}</Form.Text>}
          </Form.Group>

          <Form.Group className='mb-2'>
            <Form.Label htmlFor='typeOfPlace'>Type of Place</Form.Label>
            <Form.Select onChange={handleChange} placeholder='typeOfPlace' name='typeOfPlace' defaultValue={formData.typeOfPlace}>
              <option>Great View</option>
              <option>Place of Interest</option>
              <option>Restaurant</option>
              <option>Landmark</option>
              <option>Walk</option>
            </Form.Select>
            {formErrors.typeOfPlace && <Form.Text>{formErrors.typeOfPlace}</Form.Text>}
          </Form.Group>

          <Form.Group className='mb-2'>
            <Form.Label htmlFor='description'>Name of place</Form.Label>
            <Form.Control onChange={handleChange} as='textarea' rows={3} placeholder='Name of place' name='description' defaultValue={formData.description} />
            {formErrors.description && <Form.Text>{formErrors.description}</Form.Text>}
          </Form.Group>

          <Form.Group className='mb-2'>
            <Form.Label htmlFor='imageUrl'>Picture</Form.Label>
            <Form.Control onChange={handleUpload} type='file' placeholder='imageUrl' name='imageUrl' defaultValue={formData.imageUrl} />
            {formErrors.imageUrl && <Form.Text>{formErrors.imageUrl}</Form.Text>}
          </Form.Group>

          {formData.imageUrl &&
            <div id='form-pin-image'>
              <img src={formData.imageUrl} alt="Uploaded pic of place to add" />
            </div>
          }

          <Form.Group className='text-center mt-4'>
            <Button type='submit' className='btn btn-red'>Submit</ Button>
          </Form.Group>
        </Form>
      </Container>
    </div >
  )
}

export default PinForm