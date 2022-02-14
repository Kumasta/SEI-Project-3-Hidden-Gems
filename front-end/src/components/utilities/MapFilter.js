import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
// import Dropdown from 'react-bootstrap/Dropdown'

const MapFilter = ({ pinData, filterList, setFilterList }) => {
  const [selectedOption, setSelectedOtions] = useState('')
  const [options, setOptions] = useState([])
  const [tagList, setTagList] = useState([])

  useEffect(() => {
    const typeOfPlaceList = []
    const allTags = []
    pinData.forEach(pin => {
      typeOfPlaceList.push(pin.typeOfPlace)
      pin.tags.forEach(tag => allTags.push(tag))
    });
    const uniqueOptions = [...new Set(typeOfPlaceList)]
    setOptions(uniqueOptions)
    const uniqueTags = [...new Set(allTags)]
    setTagList(uniqueTags)
  }, [pinData])


  const handelDropdown = (e) => {
    const dropDownSelected = e.target.value
    setSelectedOtions(dropDownSelected)
    const filterByList = [...pinData]
    console.log(filterByList)
    filterByList.filter(item => {
      console.log(dropDownSelected)
      return item.typeOfPlace !== dropDownSelected
    })
    console.log(filterByList)
  }

  const handelDropdownTag = () => {
    console.log('Tags')
  }

  return (
    <Container>
      <>
        <Form>
          <Form.Group className='mb-2'>
            <Form.Label htmlFor='typeOfPlace'>Type of Place</Form.Label>
            <Form.Select onChange={handelDropdown} name='typeOfPlace' defaultValue={'Type of place'}>
              <option value={''}>Search by type</option>
              {options?.map((item, i) => {
                return (
                  <option key={i} value={item}>{item}</option>
                )
              })}

            </Form.Select>
          </Form.Group>
          <Form.Group className='mb-2'>
            <Form.Label htmlFor='typeOfPlace'>Tags</Form.Label>
            <Form.Select onChange={handelDropdownTag} name='tags' defaultValue={'Tags'}>
              <option value={''}>Tags</option>
              {tagList?.map((item, i) => {
                return (
                  <option key={i} value={item}>{item}</option>
                )
              })}

            </Form.Select>
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