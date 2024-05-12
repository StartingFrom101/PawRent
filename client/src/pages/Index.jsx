import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Index() {
  const [places, setPlaces] = useState([])

  useEffect(() => {
    axios.get('/places').then(res => {
      setPlaces([...res.data, ...res.data, ...res.data])
    })

  }, [])
  return (
<div className="container mx-auto mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 xl:grid-cols-3">
      {places.length > 0 && places.map(place => (
        <Link to={'/place/'+place._id} className='bg-gray-200 rounded-2xl p-2'>
          <div className="bg-gray-500 mb-2 rounded-2xl flex h-[600px] justify-center ">
            {place.photos?.[0] && (
              <img className="rounded-2xl object-cover aspect-square" src={'http://localhost:4000/uploads/'+place.photos?.[0]} alt=""/>
            )}
          </div>
          <h2 className="font-bold">{place.address}</h2>
          <h3 className="text-3xl  truncate text-gray-500">{place.title}</h3>
          <div className="mt-1 text-2xl">
            <span className="font-bold">${place.price}</span> per night
          </div>
        </Link>
      ))}
    </div>
  )
}
