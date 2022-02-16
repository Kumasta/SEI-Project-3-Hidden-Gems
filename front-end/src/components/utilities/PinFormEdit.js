import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
// import Select from 'react-select'
import CreatableSelect from 'react-select/creatable'

import { getLocalToken } from '../../enviroment/auth'

const PinFormEdit = () => {
  const [allPins, setAllPins] = useState([])
  const { id } = useParams()

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

  const [allType, setAllTypes] = useState([])
  const [allTags, setAllTags] = useState([])
  const [allTagsStructured, setAllTagsStructured] = useState([])

  useEffect(() => {
    const typeOfPlaceList = []
    let allTag = []
    allPins.forEach(pin => {
      typeOfPlaceList.push(pin.typeOfPlace)
      allTag = [...allTag, ...pin.tags]
    })
    const uniqueOptions = [...new Set(typeOfPlaceList)]
    const uniqueTagArray = [...new Set(allTag)]
    setAllTypes(uniqueOptions)
    setAllTags(uniqueTagArray)
  }, [allPins])



  useEffect(() => {
    const selectOptions = []
    allTags.map(tag => {
      const obj = {}
      obj.label = tag
      obj.value = tag
      return selectOptions.push(obj)
    })
    setAllTagsStructured(selectOptions)
    console.log(allTagsStructured)
  }, [allTags])



  const uploadAPI = 'https://api.cloudinary.com/v1_1/dv2dfzekf/image/upload'
  const uploadPreset = 'ip80rysk'

  const [tags, setsTags] = useState(null)

  const [latLng, setLatLng] = useState()
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

  const [defaultMultiSelect, setDefaultMultiSelect] = useState([])
  const [defaultTypeSelect, setDefaultTypeSelect] = useState([])

  const [formErrors, setFormErrors] = useState({
    title: '',
    typeOfPlace: '',
    description: '',
    imageUrl: '',
  })


  useEffect(() => {
    const getData = async () => {
      console.log(id)
      try {
        const { data } = await axios.get(`/api/pins/${id}`)
        console.log(data)
        setFormData(data)
        handleIncomingtags(data.tags)
        handleIncomingType(data.typeOfPlace)
      } catch (error) {
        console.log(error)
      }
    }
    getData()
  }, [id])

  const handleIncomingtags = (tags) => {
    const selectOptions = []
    tags.map(tag => {
      const obj = {}
      obj.label = tag
      obj.value = tag
      return selectOptions.push(obj)
    })
    setDefaultMultiSelect(selectOptions)
    console.log(selectOptions)
    console.log(defaultMultiSelect)
  }

  const handleIncomingType = (type) => {
    const selectOptions = []
    type.map(oneType => {
      const obj = {}
      obj.label = oneType
      obj.value = oneType
      return selectOptions.push(obj)
    })
    setDefaultTypeSelect(selectOptions)
    console.log(defaultTypeSelect)
  }



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

  const handleMultiCreateChange = (field, value) => {
    console.log(value)
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
      const { data } = await axios.put(`/api/pins/${id}`,
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
    <Container>
      <Form onSubmit={handleSubmit} className='mt-4'>
        <h2>Create a new pin</h2>
        {/* <div className='mini-map'>
          I will add a mini map that will allow us see where the pin is. 
        </div> */}
        <hr />
        <Form.Group className='mb-2'>
          <Form.Label htmlFor='title'>Update name of place?<span className='text-danger'>*</span></Form.Label>
          <Form.Control onChange={handleChange} type='text' placeholder='Name of place' name='title' defaultValue={formData.title} />
          {formErrors.title && <Form.Text className='text-danger'>{formErrors.title}</Form.Text>}
        </Form.Group>
        <Form.Group className='mb-2'>
          <Form.Label htmlFor='typeOfPlace'>Change type of place?<span className='text-danger'>*</span></Form.Label>
          <Form.Select  onChange={handleChange} placeholder={defaultTypeSelect} name='typeOfPlace' defaultValue={defaultTypeSelect}>
            <option value={''}>-Select Type of place-</option>
            {allType?.map((item, i) => {
              return (
                <option key={i} value={item}>{item}</option>
              )
            })}
          </Form.Select>
          <p>Pre-edit Type of place: {defaultTypeSelect}</p>
          {formErrors.typeOfPlace && <Form.Text className='text-danger'>{formErrors.typeOfPlace}</Form.Text>}
        </Form.Group>
        <Form.Group className='mb-2'>
          <Form.Label htmlFor='description'>Edit description?<span className='text-danger'>*</span></Form.Label>
          <Form.Control onChange={handleChange} as='textarea' rows={3} placeholder='Name of place' name='description' defaultValue={formData.description} />
          {formErrors.description && <Form.Text className='text-danger'>{formErrors.description}</Form.Text>}
        </Form.Group>
        <Form.Group className='mb-2'>
          <Form.Label htmlFor='imageUrl'>Upload new picture?<span className='text-danger'>*</span></Form.Label>
          <Form.Control onChange={handleUpload} type='file' placeholder='imageUrl' name='imageUrl' defaultValue={formData.imageUrl} />
          {formErrors.imageUrl && <Form.Text className='text-danger'>{formErrors.imageUrl}</Form.Text>}
        </Form.Group>
        <Form.Group className='mb-2'>
          <Form.Label htmlFor='tags'>Edit/Add Tags?</Form.Label>
          {defaultMultiSelect && <CreatableSelect
            isClearable
            isMulti
            options={allTagsStructured}
            onChange={(value) => handleMultiCreateChange('tags', value)}
            defaultValue={[{label: 'sculpture', value: 'sculpture'}, {label: 'offbeat', value: 'offbeat'}]}
          />}
          <Form.Label htmlFor='tags'>Current Tags: {defaultMultiSelect.map(tag => tag.label + ', ')} {'(Add them again if wanted)'}</Form.Label>
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
  )
}

export default PinFormEdit

// { label: 2002, value: 2002 }