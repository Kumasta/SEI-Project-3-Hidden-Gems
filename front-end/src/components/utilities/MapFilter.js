import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
// import Dropdown from 'react-bootstrap/Dropdown'

const MapFilter = ({ pinData, filterList, setFilterList }) => {
  const [selectedType, setSelectedType] = useState('')
  const [selectedTag, setSelectedTag] = useState('')
  const [options, setOptions] = useState([])
  const [tagList, setTagList] = useState([])
  const [allTags, setAllTags] = useState([])
  const [pinsbyType, setPinsBytype] = useState([])
  // const tagDropDown = document.querySelector('#tag-select')
  // tagDropDown

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
    setAllTags([uniqueTagArray])
    console.log(allTags)
  }, [pinData])

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
    setSelectedType(typeSelected)
    setSelectedTag('')
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
  }, [selectedType])

  useEffect(() => {
    let listToFilter = [...filterList]
    if (!selectedTag) return console.log(listToFilter)
    if (selectedTag && !selectedType) setTagList(allTags)
    listToFilter = listToFilter.filter(pin => pin.tags.includes(selectedTag))
    setFilterList(listToFilter)
    console.log(selectedTag)
  }, [selectedTag])


  return (
    <Container>
      <>
        <Form >
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
  )
}

export default MapFilter



// < Dropdown onSelect={handelDropdown} >
// <Dropdown.Toggle variant='success' id='dropdown-basic'>
//   {selectedOption ? <>{selectedOption}</> : <>All Types</>}
// </Dropdown.Toggle>
// <Dropdown.Menu id='genres-dropdown'>
//   <Dropdown.Item eventKey=''>All Types</Dropdown.Item>
//   {options?.map((item) => {
//     return (
//       <Dropdown.Item key={item} eventKey={item}>
//         {item}
//       </Dropdown.Item>
//     )
//   })}
// </Dropdown.Menu>
// </Dropdown >