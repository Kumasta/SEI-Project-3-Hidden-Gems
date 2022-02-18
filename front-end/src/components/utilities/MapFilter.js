import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Collapse from 'react-bootstrap/Collapse'
import axios from 'axios'

import { typeList } from '../../enviroment/typeList'

const MapFilter = ({ pinData, filterList, setFilterList, setViewPort, viewPort, setAddressPin }) => {
  const allTypes = typeList()
  const [selectedType, setSelectedType] = useState('')
  const [selectedTag, setSelectedTag] = useState('')
  const [tagList, setTagList] = useState([])
  const [allTags, setAllTags] = useState([])
  const [pinsbyType, setPinsBytype] = useState([])
  const [open, setOpen] = useState(false)
  const [addressSearch, setAddressSearch] = useState('')
  const [addressFound, setAddressFound] = useState([])


  //Generate type and all tags list
  useEffect(() => {
    let allTag = []
    setPinsBytype([...pinData])
    pinData.forEach(pin => {
      allTag = [...allTag, ...pin.tags]
    })
    const uniqueTagArray = [...new Set(allTag)]
    setAllTags(uniqueTagArray)
  }, [pinData])

  //Shown Tags list
  useEffect(() => {
    const allTags = []
    pinsbyType.forEach(pin => {
      pin.tags.forEach(tag => allTags.push(tag))
    })
    const uniqueTags = [...new Set(allTags)]
    setTagList(uniqueTags)
  }, [pinsbyType])

  const handelTypeDropdown = (e) => {
    const typeSelected = e.target.value
    setSelectedTag('')
    setSelectedType(typeSelected)
  }
  const handelTagdownTag = (e) => {
    const tagSelected = e.target.value
    setSelectedTag(tagSelected)
  }

  useEffect(() => {
    let listToFilter = [...pinData]
    if (!selectedType) {
      setFilterList(listToFilter)
      setPinsBytype(listToFilter)
      return
    }
    listToFilter = listToFilter.filter(pin => pin.typeOfPlace === selectedType)
    setFilterList(listToFilter)
    setPinsBytype(listToFilter)
    let listToFilterBytag = [...filterList]
    if (!selectedTag) return
    listToFilter = [...pinData]
    listToFilter = listToFilter.filter(pin => pin.typeOfPlace === selectedType)
    listToFilterBytag = [...listToFilter]
    listToFilterBytag = listToFilterBytag.filter(pin => pin.tags.includes(selectedTag))
    setFilterList(listToFilterBytag)
  }, [selectedType, selectedTag])

  const handleSearch = (e) => {
    setAddressSearch(e.target.value)
    setAddressFound([])
  }

  useEffect(() => {
    const findAddress = async () => {
      try {
        const { data } = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${addressSearch}.json?country=gb,ie&fuzzyMatch=true&access_token=pk.eyJ1IjoibWF5dXJyYWprdW1hciIsImEiOiJja3plNnRmbGswZjA4MnZvY24weGdhNmhhIn0.98MAuzBpjQkKuGouobKz5Q`)
        setAddressFound(data.features)
        console.log(data.features)
      } catch (error) {
        console.log(error)
      }
    }
    findAddress()
  }, [addressSearch])

  const handleAddressClick = (e) => {
    console.log(e.center)
    // setViewPort({...viewPort, zoom: 16})
    setViewPort({ ...viewPort, latitude: e.center[1], longitude: e.center[0] })
    setAddressPin({latitude: e.center[1], longitude: e.center[0]})
  }

  return (
    <>
      <Button
        onClick={() => setOpen(!open)}
        aria-controls="example-collapse-text"
        aria-expanded={open}
        style={{ width: 100, position: 'absolute' }}
        className='btn-light btn'
        id='map-filter-button'
      >
        Fliter/Search Address
      </Button >
      <div style={{ minHeight: '150px' }}>
        <Collapse in={open} dimension="height">
          <Container>
            <>
              <Form id='map-filter-box'>
                <h4>Filter by:</h4>
                <Form.Group className='mb-2'>
                  <Form.Label htmlFor='typeOfPlace'>Type of Place</Form.Label>
                  <Form.Select onChange={handelTypeDropdown} name='typeOfPlace' defaultValue={'Type of place'}>
                    <option value={''}>-None-</option>
                    {allTypes?.map((item, i) => {
                      return (
                        <option key={i} value={item}>{item}</option>
                      )
                    })}
                    <option value={'Other'}>Other</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className='mb-2'>
                  <Form.Label htmlFor='typeOfPlace'>Tags</Form.Label>
                  {selectedType ?
                    <Form.Select id='tag-select' onChange={handelTagdownTag} name='tags' defaultValue={'Tags'}>
                      <option value={''}>-None-</option>
                      {tagList?.map((item, i) => {
                        return (
                          <option key={i} value={item}>{item}</option>
                        )
                      })}
                    </Form.Select>
                    :
                    <p>Selet a Type</p>
                  }
                  {filterList && <Form.Text>{`Found: ${filterList.length} pins`}</Form.Text>}
                </Form.Group>
                <hr />
                <Form.Group className='mb-2'>
                  <Form.Label htmlFor='title'>Address</Form.Label>
                  <Form.Control onChange={handleSearch} type='text' placeholder='Seach by Address' name='title' />
                </Form.Group>
                {addressFound.length > 0 ? addressFound?.map(address => {
                  return (
                    <div className='address-box' key={address.id} onClick={() => handleAddressClick(address)}>{address.place_name}</div>
                  )
                })
                  :
                  null}
                {addressSearch && addressFound.length === 0 ? <div>Address not found</div> : null}
              </Form>
            </>
          </Container >
        </Collapse>
      </div>
    </>
  )
}

export default MapFilter

// `https://api.mapbox.com/geocoding/v5/mapbox.places/London.json?access_token=pk.eyJ1IjoibWF5dXJyYWprdW1hciIsImEiOiJja3plNnRmbGswZjA4MnZvY24weGdhNmhhIn0.98MAuzBpjQkKuGouobKz5Q`