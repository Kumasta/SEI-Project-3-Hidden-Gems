// import React, { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'


// //React Bootstrap Components
// import Card from 'react-bootstrap/Card'

// const About = ( {pinData} ) => {


//   const [filteredPins, setFilteredPins] = useState([])
//   const [filterList, setFilterList] = useState([])

//   useEffect(() => {

//     let tagsList = []
//     const filteredTagsList = []

//     pinData.forEach((pin) => {
//       tagsList = [...tagsList, ...pin.tags]
//     })
//     tagsList.forEach((item) => {
//       filteredTagsList.indexOf(item) === -1 && filteredTagsList.push(item)
//     })
//     setFilterList(filteredTagsList.sort())
//   }, [pinData])

//   const handleSearch = (e) => {
//     const search = e.target.value
//     console.log('user search', search)
//     const tagSearched = pinData.filter(pin => pin.tags.includes(search))
//     setFilteredPins(tagSearched)
//   }


//   return (

//     <>
//       <section className='search-container container-sm'>
//         <form>
//           <label className='search-label'>Not sure what you fancy?</label>
//           <select onChange={handleSearch}>
//             <option value='' defaultValue disabled>Select a tag</option>
//             {filterList.map((tag, id) => <option key={id} value={tag}>{tag}</option>
//             )}
//           </select>
//         </form>
//       </section>
//       <section className='search-result-container container-sm'>
//         {filteredPins &&
//           filteredPins.map((pin, i) => {
//             return (
//               <Card className='card-container' key={i} style={{ width: '18rem', height: '18rem'}}>
//                 <Link className='pins-link' to={`/pins/${pin._id}`}>
//                   <Card.Img className='card-img' variant='top' src={pin.imageUrl} />
//                   <Card.Body>
//                     <Card.Title>{pin.title}</Card.Title>
//                     <Card.Text>Rating: {pin.avgRating}</Card.Text>
//                     <Card.Text>Rating: {pin.averageRating}</Card.Text>
//                   </Card.Body>
//                 </Link>
//               </Card>
//             )
//           })
//         }
//       </section>

//     </>
//   )
// }


// export default About
