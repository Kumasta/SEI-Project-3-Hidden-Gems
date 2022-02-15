import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
// import Select from 'react-select'
import CreatableSelect from 'react-select/creatable'

const PinForm = () => {

  const selectOptions = [
    { value: 'Chill', label: 'Chill' },
    { value: 'Outdoors', label: 'Outdoors' },
    { value: 'Art', label: 'Art' },
    { value: 'Food', label: 'Food' },
    { value: 'Drink', label: 'Drink' },
    { value: 'Food & Drink', label: 'Food & Drink' },
    { value: 'Nightlife', label: 'Nightlife' },
    { value: 'Coutryside', label: 'Coutryside' },
    { value: 'Offbeat', label: 'Offbeat' },
    { value: 'Date-spot', label: 'Date-Spot' }
  ]

  const uploadAPI = 'https://api.cloudinary.com/v1_1/dv2dfzekf/image/upload'
  const uploadPreset = 'ip80rysk'

  const [tags, setsTags] = useState('')

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

  // const handleMultiChange = (selected, name) => {
  //   console.log(selected)
  //   console.log(name)
  //   const values = selected ? selected.map(item => item.value) : []
  //   setFormData({ ...formData, [name]: [...values] })
  // }

  const handleMultiCreateChange = (field, value) => {
    switch (field) {
      case 'tags':
        setsTags(value)
        break;
      default:
        break;
    }
    const values = tags ? value.map(item => item.value) : []
    setFormData({ ...formData, [value.label]: [...values] })
  }

  const handleImageUrl = (url) => {
    setFormData({ ...formData, imageUrl: url })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('/api/pins', formData)
      navigate('/pins/')
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
            <Form.Label htmlFor='title'>Name of place<span className='text-danger'>*</span></Form.Label>
            <Form.Control onChange={handleChange} type='text' placeholder='Name of place' name='title' defaultValue={formData.title} />
            {formErrors.title && <Form.Text>{formErrors.title}</Form.Text>}
          </Form.Group>
          <Form.Group className='mb-2'>
            <Form.Label htmlFor='typeOfPlace'>Type of Place<span className='text-danger'>*</span></Form.Label>
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
            <Form.Label htmlFor='description'>Description<span className='text-danger'>*</span></Form.Label>
            <Form.Control onChange={handleChange} as='textarea' rows={3} placeholder='Name of place' name='description' defaultValue={formData.description} />
            {formErrors.description && <Form.Text>{formErrors.description}</Form.Text>}
          </Form.Group>
          <Form.Group className='mb-2'>
            <Form.Label htmlFor='imageUrl'>Picture<span className='text-danger'>*</span></Form.Label>
            <Form.Control onChange={handleUpload} type='file' placeholder='imageUrl' name='imageUrl' defaultValue={formData.imageUrl} />
            {formErrors.imageUrl && <Form.Text>{formErrors.imageUrl}</Form.Text>}
          </Form.Group>
          <Form.Group className='mb-2'>
            <Form.Label htmlFor='tags'>Add Tags</Form.Label>
            <CreatableSelect
              isClearable
              isMulti
              onChange={(value) => handleMultiCreateChange('tags', value)}
              options={selectOptions}
              defaultValue={formData.tags}
            />
            {console.log(tags)}
          </Form.Group>
          {formData.imageUrl &&
            <div id='form-pin-image'>
              <img src={formData.imageUrl} alt='Uploaded pic of place to add' />
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


  // < Form.Group className = 'mb-2' >
  //   <Form.Label htmlFor='tags'>Add Tags</Form.Label>
  //      <Select
  //         options={selectOptions}
  //         isMulti
  //         name='tags'
  //         defaultValue={formData.tags}
  //         onChange={(selected) => handleMultiChange(selected, 'tags')}
  //       />
  // </Form.Group >
