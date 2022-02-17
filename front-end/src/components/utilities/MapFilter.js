import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Collapse from 'react-bootstrap/Collapse'
// import Dropdown from 'react-bootstrap/Dropdown'

const MapFilter = ({ pinData, filterList, setFilterList }) => {
  const [selectedType, setSelectedType] = useState('')
  const [selectedTag, setSelectedTag] = useState('')
  const [options, setOptions] = useState([])
  const [tagList, setTagList] = useState([])
  const [allTags, setAllTags] = useState([])
  const [pinsbyType, setPinsBytype] = useState([])
  const [open, setOpen] = useState(false);


  //Generate type and all tags list
  useEffect(() => {
    const typeOfPlaceList = []
    let allTag = []
    setPinsBytype([...pinData])
    pinData.forEach(pin => {
      typeOfPlaceList.push(pin.typeOfPlace)
      allTag = [...allTag, ...pin.tags]
    })
    const uniqueOptions = [...new Set(typeOfPlaceList)]
    const uniqueTagArray = [...new Set(allTag)]
    setOptions(uniqueOptions)
    setAllTags(uniqueTagArray)
    // console.log(allTags)
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


  return (
    <>
      <Button
        onClick={() => setOpen(!open)}
        aria-controls="example-collapse-text"
        aria-expanded={open}
        style={{width:100, position:'absolute'}}
        className='btn-light btn'
        id='map-filter-button'
      >
        Fliter
      </Button >
      <div style={{ minHeight: '150px' }}>
        <Collapse in={open} dimension="height">
          <Container>
            <>
              <Form >
                <h2>Filter by:</h2>
                <Form.Group className='mb-2'>
                  <Form.Label htmlFor='typeOfPlace'>Type of Place</Form.Label>
                  <Form.Select onChange={handelTypeDropdown} name='typeOfPlace' defaultValue={'Type of place'}>
                    <option value={''}>-None-</option>
                    {options?.map((item, i) => {
                      return (
                        <option key={i} value={item}>{item}</option>
                      )
                    })}
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
                </Form.Group>
              </Form>
            </>
          </Container >
        </Collapse>
      </div>
    </>
  )
}

export default MapFilter