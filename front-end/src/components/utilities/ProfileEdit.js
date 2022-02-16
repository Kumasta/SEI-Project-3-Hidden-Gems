import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import { getLocalToken } from '../../enviroment/auth'

const ProfileEdit = () => {
  const { userId } = useParams()
  const [formData, setFormData] = useState({
    bio: '',
    name: '',
    profilePicURL: '',
  })

  const [formErrors, setFormErrors] = useState({
    bio: '',
    name: '',
    profilePicURL: '',
  })

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`/api/profile/${userId}`)
        console.log(data.profile)
        setFormData(data.profile)
      } catch (error) {
        console.log(error)
      }
    }
    getData()
  }, [userId])

  const uploadAPI = 'https://api.cloudinary.com/v1_1/dv2dfzekf/image/upload'
  const uploadPreset = 'ip80rysk'

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
    console.log(formData)
  }


  const handleImageUrl = (url) => {
    setFormData({ ...formData, profilePicURL: url })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // console.log(getLocalToken())
    try {
      const { data } = await axios.put(`/api/profile/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${getLocalToken()}`
          }
        })
      console.log(data)
      setFormData({
        bio: '',
        name: '',
        profilePicURL: '',
      })
      navigate(`/profile/${userId}`)
    } catch (error) {
      console.log(error)
      const errorObj = {}
      Object.keys(error.response.data.errors).forEach((key) => {
        errorObj[key] = error.response.data.errors[key].message
      })
      setFormErrors(errorObj)
    }
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit} className='mt-4'>
        <h2>Update Profile</h2>
        <hr />
        <Form.Group className='mb-2'>
          <Form.Label htmlFor='name'>Edit Name<span className='text-danger'>*</span></Form.Label>
          <Form.Control onChange={handleChange} type='text' placeholder='Name of place' name='name' defaultValue={formData.name} />
          {formErrors.name && <Form.Text className='text-danger'>{formErrors.name}</Form.Text>}
        </Form.Group>
        <Form.Group className='mb-2'>
          <Form.Label htmlFor='bio'>Edit Bio<span className='text-danger'>*</span></Form.Label>
          <Form.Control onChange={handleChange} as='textarea' rows={3} placeholder='Name of place' name='bio' defaultValue={formData.bio} />
          {formErrors.bio && <Form.Text className='text-danger'>{formErrors.bio}</Form.Text>}
        </Form.Group>
        <Form.Group className='mb-2'>
          <Form.Label htmlFor='profilePicURL'>Upload Profile Picture<span className='text-danger'>*</span></Form.Label>
          <Form.Control onChange={handleUpload} type='file' placeholder='profilePicURL' name='profilePicURL' defaultValue={formData.profilePicURL} />
          {formErrors.profilePicURL && <Form.Text className='text-danger'>{formErrors.profilePicURL}</Form.Text>}
        </Form.Group>
        {formData.profilePicURL &&
          <div id='form-pin-image'>
            <img src={formData.profilePicURL} alt="Uploaded pic of place to add" />
          </div>
        }
        <Form.Group className='text-center mt-4'>
          <Button type='submit' className='btn btn-red'>Submit</ Button>
        </Form.Group>
      </Form>
    </Container>
  )
}

export default ProfileEdit

// { label: 2002, value: 2002 }