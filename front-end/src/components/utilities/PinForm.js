import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
// import Select from 'react-select'
import CreatableSelect from 'react-select/creatable'

import MiniMap from './MiniMap'

import { getLocalToken } from '../../enviroment/auth'
import { typeList } from '../../enviroment/typeList'

const PinForm = ({ newPin }) => {
  const allTypes = typeList()
  const [allPins, setAllPins] = useState([])
  const [tags, setsTags] = useState(null)
  const [latLng, setLatLng] = useState()
  const [allTags, setAllTags] = useState([])
  const [allTagsStructured, setAllTagsStructured] = useState([])

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
  })

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('/api/pins')
        setAllPins(data)
      } catch (error) {
        console.log(error)
      }
    }
    getData()
  }, [])

  useEffect(() => {
    let allTag = []
    allPins.forEach(pin => {
      allTag = [...allTag, ...pin.tags]
    })
    const uniqueTagArray = [...new Set(allTag)]
    setAllTags(uniqueTagArray)
  }, [allPins])

  useEffect(() => {
    let storedLocation = {}
    if (!newPin) {
      storedLocation = JSON.parse(window.localStorage.getItem('lngLat'))
      setFormData({ ...formData, latitude: storedLocation.latitude, longitude: storedLocation.longitude })
    }
    if (newPin) {
      window.localStorage.setItem('lngLat', JSON.stringify(newPin))
      storedLocation = JSON.parse(window.localStorage.getItem('lngLat'))
      setFormData({ ...formData, latitude: newPin.latitude, longitude: newPin.longitude })
      return
    }
    if (!storedLocation) return
    console.log(storedLocation)
    setFormData({ ...formData, latitude: storedLocation.latitude, longitude: storedLocation.longitude })
    console.log(latLng)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newPin])


  useEffect(() => {
    const selectOptions = []
    console.log(allTags)
    allTags.map(tag => {
      const obj = {}
      obj.label = tag
      obj.value = tag
      return selectOptions.push(obj)
    })
    setAllTagsStructured(selectOptions)
    console.log(selectOptions)
  }, [allTags])

  useEffect(() => {
    setLatLng({ latitude: formData.latitude, longitude: formData.longitude })
  }, [formData])

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
    setFormData({ ...formData, tags: [...values] })
  }

  const handleImageUrl = (url) => {
    setFormData({ ...formData, imageUrl: url })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // console.log(getLocalToken())
    try {
      const { data } = await axios.post('/api/pins',
        formData,
        {
          headers: {
            Authorization: `Bearer ${getLocalToken()}`
          }
        })
      console.log(data)
      setFormData({
        title: '',
        typeOfPlace: '',
        description: '',
        imageUrl: '',
        status: true,
        tags: '',
        latitude: null,
        longitude: null,
      })
      window.localStorage.removeItem('lngLat')
      navigate(`/pins/${data.id}`)
    } catch (error) {
      const errorObj = {}
      Object.keys(error.response.data.errors).forEach((key) => {
        errorObj[key] = error.response.data.errors[key].message
      })
      setFormErrors(errorObj)
    }
  }

  return (
    <Container className='form'>
      <h2>Create a new Gem</h2>
      <Form onSubmit={handleSubmit} className='mt-4'>
      {latLng && <MiniMap latLng={latLng} setFormData={setFormData} formData={formData} />}
      <Form.Text>Drag pin to adjust Gem Location</Form.Text>
        <hr />
        <Form.Group className='mb-2'>
          <Form.Label htmlFor='title'>Name of place<span className='text-danger'>*</span></Form.Label>
          <Form.Control onChange={handleChange} type='text' placeholder='Name of place' name='title' defaultValue={formData.title} />
          {formErrors.title && <Form.Text className='text-danger'>{formErrors.title}</Form.Text>}
        </Form.Group>
        <Form.Group className='mb-2'>
          <Form.Label htmlFor='typeOfPlace'>Type of Place<span className='text-danger'>*</span></Form.Label>
          <Form.Select onChange={handleChange} placeholder='typeOfPlace' name='typeOfPlace' defaultValue={formData.typeOfPlace}>
            <option value={''}>-Select Type of place-</option>
            {allTypes?.map((item, i) => {
              return (
                <option key={i} value={item}>{item}</option>
              )
            })}
          </Form.Select>
          {formErrors.typeOfPlace && <Form.Text className='text-danger'>{formErrors.typeOfPlace}</Form.Text>}
        </Form.Group>
        <Form.Group className='mb-2'>
          <Form.Label htmlFor='description'>Description<span className='text-danger'>*</span></Form.Label>
          <Form.Control onChange={handleChange} as='textarea' rows={3} placeholder='Name of place' name='description' defaultValue={formData.description} />
          {formErrors.description && <Form.Text className='text-danger'>{formErrors.description}</Form.Text>}
        </Form.Group>
        <Form.Group className='mb-2'>
          <Form.Label htmlFor='imageUrl'>Picture<span className='text-danger'>*</span></Form.Label>
          <Form.Control onChange={handleUpload} type='file' placeholder='imageUrl' name='imageUrl' defaultValue={formData.imageUrl} />
          {formErrors.imageUrl && <Form.Text className='text-danger'>{formErrors.imageUrl}</Form.Text>}
        </Form.Group>
        <Form.Group className='mb-2'>
          <Form.Label htmlFor='tags'>Add Tags</Form.Label>
          <CreatableSelect
            isClearable
            isMulti
            options={allTagsStructured}
            onChange={(value) => handleMultiCreateChange('tags', value)}
            defaultValue={formData.tags}
          />
        </Form.Group>
        {formData.imageUrl &&
          <div id='form-pin-image'>
            <img src={formData.imageUrl} alt="Uploaded pic of place to add" />
          </div>
        }
        <Form.Group className='text-center mt-4'>
          <Button type='submit' className='btn-dark btn'>Submit</ Button>
        </Form.Group>
      </Form>
    </Container>
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
